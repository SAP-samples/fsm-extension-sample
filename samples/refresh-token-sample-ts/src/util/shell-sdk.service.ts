import { ShellSdk, SHELL_EVENTS, AuthResponse } from 'fsm-shell';
import { BehaviorSubject } from './util';

export interface ShellContext {
  authToken?: string;
  cloudHost: string;
  accountId: string;
  account: string;
  userId: string;
  user: string;
  userAccountFeatureFlagsEnabled: boolean;
  userAccountFeatureFlagsUserId: string;
  company: string;
  companyId: string;
  isInsideShellModal: boolean;
  selectedThemeId: string;
  selectedLocale: string;
  erpType: string;
  erpUserId: string;
  auth?: {
    access_token: string,
    token_type: string,
    expires_in: number
  }
}

export class ShellSdkService {
  private static instance: ShellSdkService;
  private shellSdk: ShellSdk;
  private authSubject: BehaviorSubject<AuthResponse> = new BehaviorSubject<AuthResponse>(undefined as unknown as AuthResponse);;
  private refreshTimeoutId: NodeJS.Timeout | null = null;
  // Never hardcode credentials in production code! This is for demo purposes only.
  // Use secure storage mechanisms in productive applications, such as backend services.
  private clientCredentials = {
    clientIdentifier: 'refresh-token-sample-ui5-client-identifier',
    clientSecret: 'refresh-token-sample-ui5-client-secret'
  };

  private constructor(shellSdk: ShellSdk) {
    this.shellSdk = shellSdk;
  }

  public static getInstance(): ShellSdkService {
    if (!ShellSdkService.instance) {
      // For simplicity and testing, * is being used here. In production,
      // the real origin of the FSM Shell should be used, i.e. https://de.fsm.cloud.sap
      const shellSdk = ShellSdk.init(parent, '*');
      ShellSdkService.instance = new ShellSdkService(shellSdk);
      ShellSdkService.instance.init();
    }
    return ShellSdkService.instance;
  }

  private init(): void {
    if (!ShellSdk.isInsideShell()) {
      throw new Error('Extension is not running inside FSM Shell');
    }

    this.getContext(this.clientCredentials).then((context) => {      
      // Initialize refresh token strategy with the first token
      this.setupTokenAutoRefresh(context.auth!);
    }).catch((error) => {
      console.error('Error obtaining initial context:', error);
    })
  }

  public getVersion(): string {
    return ShellSdk.VERSION || 'Unknown';
  }

  public isInsideShell(): boolean {
    return ShellSdk.isInsideShell();
  }

  public getContext({clientIdentifier, clientSecret}: {clientIdentifier: string, clientSecret: string}): Promise<ShellContext> {
    return new Promise((resolve, reject) => {
      if (!this.isInsideShell()) {
        reject(new Error('Extension is not running inside FSM Shell'));
        return;
      }

      const contextHandler = (event: string) => {
        const context = JSON.parse(event);
        resolve(context);

        // Unsubscribe after first response
        this.shellSdk.off(SHELL_EVENTS.Version1.REQUIRE_CONTEXT, contextHandler);
      };

      this.shellSdk.on(SHELL_EVENTS.Version1.REQUIRE_CONTEXT, contextHandler);

      // Request the fsm context
      this.shellSdk.emit(SHELL_EVENTS.Version1.REQUIRE_CONTEXT, {
        clientIdentifier,
        clientSecret,
        auth: {
          response_type: 'token'  // request a user token within the context
        }
      })
    })
  }

  public subscribeToAuth(callback: (auth: AuthResponse) => void): () => void {
    return this.authSubject.subscribe(callback);
  }

  private scheduleTokenRefresh(expiresIn: number): void {
    // This is a defensive approach, just in case this method is called multiple times
    if (this.refreshTimeoutId) { // Cancel any existing timeout to prevent multiple timers
      clearTimeout(this.refreshTimeoutId);
    }

    // Schedule a token refresh 5 seconds before the current one expires
    const delayMs = (expiresIn * 1000) - 5000;
    this.refreshTimeoutId = setTimeout(() => {
      // Request a new token:        
      // IMPORTANT: You only receive a new token in case the current token's validation period
      // is less than one minute. If a new token is requested and the validation period is one
      // minute or more, you receive the current token again with an updated validation period.
      // A token's validation period is provided via the property expires_in, which contains
      // the time left in seconds.
      this.shellSdk.emit(SHELL_EVENTS.Version1.REQUIRE_AUTHENTICATION, {
        response_type: 'token'
      });
    }, delayMs);
  }

  private setupTokenAutoRefresh(auth: AuthResponse): void {
    this.shellSdk.on(SHELL_EVENTS.Version1.REQUIRE_AUTHENTICATION, (event: AuthResponse) => {
      this.authSubject.next(event); // Emit new token to the stream
      
      // Schedule next refresh
      this.scheduleTokenRefresh(event.expires_in);
    });

    this.authSubject.next(auth); // Emit initial token to the stream
    this.scheduleTokenRefresh(auth.expires_in); // Schedule first refresh based on initial token
  }
}

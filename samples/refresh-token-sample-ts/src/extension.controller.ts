
import { ShellSdk, SHELL_EVENTS, AuthResponse } from 'fsm-shell';
import { BehaviorSubject } from './util/util';


export class ExtensionController {
  private static instance: ExtensionController;
  private shellSdk: ShellSdk;
  private authSubject: BehaviorSubject<AuthResponse | null> | null = null;
  private refreshTimeoutId: NodeJS.Timeout | null = null;

  private constructor(shellSdk: ShellSdk) {
    this.shellSdk = shellSdk;
  }

  public static getInstance(): ExtensionController {
    if (!ExtensionController.instance) {
      // For simplicity and testing, * is being used here. In production,
      // the real origin of the FSM Shell should be used, i.e. https://de.fsm.cloud.sap
      const shellSdk = ShellSdk.init(parent, '*');
      ExtensionController.instance = new ExtensionController(shellSdk);
      ExtensionController.instance.init();
    }

    return ExtensionController.instance;
  }

  public getShellSdkVersion(): string {
    return ShellSdk.VERSION || 'Unknown';
  }

  public isInsideShell(): boolean {
    return ShellSdk.isInsideShell();
  }

  private init(): void {
    if (!ShellSdk.isInsideShell()) {
      throw new Error('Extension is not running inside FSM Shell');
    }

    // Setup listener for context response
    const contextHandler = (event: string) => {
      const context = JSON.parse(event);

      // Emit auth to the BehaviorSubject stream
      if (context.auth && this.authSubject) {
        this.authSubject.next(context.auth);
        
        // Initialize refresh token strategy with the first token
        this.setupTokenAutoRefresh(context.auth);
      }

      // Unsubscribe after first response
      this.shellSdk.off(SHELL_EVENTS.Version1.REQUIRE_CONTEXT, contextHandler);
    };

    this.shellSdk.on(SHELL_EVENTS.Version1.REQUIRE_CONTEXT, contextHandler);

    // Request the fsm context
    this.shellSdk.emit(SHELL_EVENTS.Version1.REQUIRE_CONTEXT, {
      auth: {
        response_type: 'token'  // request a user token within the context
      }
    });
  }

  public subscribeToAuth(callback: (auth: AuthResponse | null) => void): (() => void) | null {
    if (!this.authSubject) {
      this.authSubject = new BehaviorSubject<AuthResponse | null>(null);
    }
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
      if (this.authSubject) {
        this.authSubject.next(event); // Emit new token to the stream
      }
      
      // Schedule next refresh
      this.scheduleTokenRefresh(event.expires_in);
    });

    // Schedule first refresh based on initial token
    this.scheduleTokenRefresh(auth.expires_in);
  }
}

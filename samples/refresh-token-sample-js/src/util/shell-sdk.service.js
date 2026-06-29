import { ShellSdk, SHELL_EVENTS } from 'fsm-shell';
import { BehaviorSubject } from './util.js';

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 5000;

export class ShellSdkService {
  static instance = null;

  constructor(shellSdk) {
    this.shellSdk = shellSdk;
    this.authSubject = new BehaviorSubject(undefined);
    this.errorSubject = new BehaviorSubject(null);
    this.refreshTimeoutId = null;
    this.retryCount = 0;
    this.retryTimeoutId = null;
    // Never hardcode credentials in production code! This is for demo purposes only.
    // Use secure storage mechanisms in productive applications, such as backend services.
    this.clientCredentials = {
      clientIdentifier: 'refresh-token-sample-ui5-client-identifier',
      clientSecret: 'refresh-token-sample-ui5-client-secret'
    };
  }

  static getInstance() {
    if (!ShellSdkService.instance) {
      // For simplicity and testing, * is being used here. In production,
      // the real origin of the FSM Shell should be used, i.e. https://de.fsm.cloud.sap
      const shellSdk = ShellSdk.init(parent, '*');
      ShellSdkService.instance = new ShellSdkService(shellSdk);
      ShellSdkService.instance.init();
    }
    return ShellSdkService.instance;
  }

  init() {
    if (!ShellSdk.isInsideShell()) {
      throw new Error('Extension is not running inside FSM Shell');
    }

    this.shellSdk.on(SHELL_EVENTS.ERROR, (error) => {
      console.error('Shell error received:', error);

      if (this.retryCount >= MAX_RETRIES) {
        // Stop retrying after MAX_RETRIES attempts to avoid excessive API calls.
        // Continued retrying on persistent errors can result in deactivation of the extension.
        this.errorSubject.next(`Shell error: ${error}. Maximum retries (${MAX_RETRIES}) reached. Please reload the extension.`);
        return;
      }

      this.retryCount++;
      this.errorSubject.next(`Shell error: ${error}. Retrying (${this.retryCount}/${MAX_RETRIES})...`);

      // Wait before retrying to avoid hammering the Shell with requests
      if (this.retryTimeoutId) {
        clearTimeout(this.retryTimeoutId);
      }
      this.retryTimeoutId = setTimeout(() => {
        this.shellSdk.emit(SHELL_EVENTS.Version1.REQUIRE_AUTHENTICATION, {
          response_type: 'token'
        });
      }, RETRY_DELAY_MS);
    });

    this.getContext(this.clientCredentials).then((context) => {
      this.retryCount = 0; // Reset retry counter on successful context retrieval
      // Initialize refresh token strategy with the first token
      this.setupTokenAutoRefresh(context.auth);
    }).catch((error) => {
      console.error('Error obtaining initial context:', error);
    });
  }

  getVersion() {
    return ShellSdk.VERSION || 'Unknown';
  }

  isInsideShell() {
    return ShellSdk.isInsideShell();
  }

  getContext({clientIdentifier, clientSecret}) {
    return new Promise((resolve, reject) => {
      if (!this.isInsideShell()) {
        reject(new Error('Extension is not running inside FSM Shell'));
        return;
      }

      const contextHandler = (event) => {
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
      });
    });
  }

  subscribeToAuth(callback) {
    return this.authSubject.subscribe(callback);
  }

  subscribeToError(callback) {
    return this.errorSubject.subscribe(callback);
  }

  scheduleTokenRefresh(expiresIn) {
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

  setupTokenAutoRefresh(auth) {
    this.shellSdk.on(SHELL_EVENTS.Version1.REQUIRE_AUTHENTICATION, (event) => {
      this.authSubject.next(event); // Emit new token to the stream
      
      // Schedule next refresh
      this.scheduleTokenRefresh(event.expires_in);
    });

    this.authSubject.next(auth); // Emit initial token to the stream
    this.scheduleTokenRefresh(auth.expires_in); // Schedule first refresh based on initial token
  }
}

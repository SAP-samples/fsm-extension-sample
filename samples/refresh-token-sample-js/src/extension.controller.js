import { ShellSdk, SHELL_EVENTS } from 'fsm-shell';
import { BehaviorSubject } from './util/util.js';

export class ExtensionController {
  static instance = null;

  constructor(shellSdk) {
    this.shellSdk = shellSdk;
    this.authSubject = null;
    this.refreshTimeoutId = null;
  }

  static getInstance() {
    if (!ExtensionController.instance) {
      // For simplicity and testing, * is being used here. In production,
      // the real origin of the FSM Shell should be used, i.e. https://de.fsm.cloud.sap
      const shellSdk = ShellSdk.init(parent, '*');
      ExtensionController.instance = new ExtensionController(shellSdk);
      ExtensionController.instance.init();
    }

    return ExtensionController.instance;
  }

  getShellSdkVersion() {
    return ShellSdk.VERSION || 'Unknown';
  }

  isInsideShell() {
    return ShellSdk.isInsideShell();
  }

  init() {
    if (!ShellSdk.isInsideShell()) {
      throw new Error('Extension is not running inside FSM Shell');
    }

    // Setup listener for context response
    const contextHandler = (event) => {
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

  subscribeToAuth(callback) {
    if (!this.authSubject) {
      this.authSubject = new BehaviorSubject(null);
    }
    return this.authSubject.subscribe(callback);
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

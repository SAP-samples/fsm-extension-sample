
import { ShellSdk, SHELL_EVENTS, AuthResponse } from 'fsm-shell';
import { EventEmitter } from 'events';


export class ShellSdkHelper {
  private static instance: ShellSdkHelper;
  private shellSdk: ShellSdk;
  private newTokenEmitter = new EventEmitter();

  private constructor(shellSdk: ShellSdk) {
    this.shellSdk = shellSdk;
  }

  public static getInstance(shellSdk: ShellSdk): ShellSdkHelper {
    if (!ShellSdkHelper.instance) {
      ShellSdkHelper.instance = new ShellSdkHelper(shellSdk);
    }

    return ShellSdkHelper.instance;
  }

  public getContext = () => new Promise<{[x: string]: any}>((resolve, reject) => {

    // Initialize the extension by requesting the fsm context
    this.shellSdk.emit(SHELL_EVENTS.Version1.REQUIRE_CONTEXT, {
      auth: {
        response_type: 'token'  // request a user token within the context
      }
    });
  
    // Callback on fsm context response
    this.shellSdk.on(SHELL_EVENTS.Version1.REQUIRE_CONTEXT, (event: string) => {
      const context = JSON.parse(event);

      // Access_token has a short life span and needs to be refreshed before expiring
      // Each extension needs to implement its own strategy to fresh it.
      this.initializeRefreshTokenStrategy(context.auth);

      resolve(context);
    });
  
  });

  public getNewTokenEmitter() {
    return this.newTokenEmitter;
  }

  private fetchToken() {  
    this.shellSdk.emit(SHELL_EVENTS.Version1.REQUIRE_AUTHENTICATION, {
      response_type: 'token'  // request a user token within the context
    });
  }

  // Loop before a token expire to fetch a new one
  private initializeRefreshTokenStrategy = (auth: AuthResponse) => {
    this.shellSdk.on(SHELL_EVENTS.Version1.REQUIRE_AUTHENTICATION, (event: AuthResponse) => {
      this.newTokenEmitter.emit('newToken', event);
      setTimeout(() => this.fetchToken(), (event.expires_in * 1000) - 5000);
    });

    setTimeout(() => this.fetchToken(), (auth.expires_in * 1000) - 5000);
  }
}

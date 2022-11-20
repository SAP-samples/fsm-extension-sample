
import { ShellSdk, SHELL_EVENTS } from 'fsm-shell';


// Initialize ShellSDK to connect with parent shell library
let shellSdk: ShellSdk | undefined = undefined;
if (ShellSdk.isInsideShell()) {
  shellSdk = ShellSdk.init(parent, '*');
}


export const isInsideShell = !!shellSdk;

export const getContext = () => new Promise<{[x:string]: any}>((resolve, reject) => {

  if (!shellSdk) { reject('App is not running inside Shell'); return; }

  // Initialize the extension by requesting the fsm context
  shellSdk.emit(SHELL_EVENTS.Version1.REQUIRE_CONTEXT, {
    auth: {
      response_type: 'token'  // request a user token within the context
    }
  });

  // Callback on fsm context response
  shellSdk.on(SHELL_EVENTS.Version1.REQUIRE_CONTEXT, (event: string) => {
    resolve(JSON.parse(event));
  });

});
import { ShellSdkHelper } from './shell-sdk-helper';
import { AuthResponse, ShellSdk } from 'fsm-shell';


const updateUI = (text: string) => {
  (document.querySelectorAll('#info')[0] as any).innerHTML = text;
};

const createUIContextList = (context: any) => {
  let UIContextList = '<ul>';
  for (const [key, value] of Object.entries(context)) {
      UIContextList = UIContextList + (typeof value === 'object' ?
          '<li>' + `${key}: ${JSON.stringify(value)}` + '</li>' :
          '<li>' + `${key}: ${value}` + '</li>');
  }
  UIContextList = UIContextList + '</ul>';

  return UIContextList;
}

window.addEventListener('load', async () => {

  let UIContextList: string = '';
  let currentContext: any;

  if (ShellSdk.isInsideShell()) {
    // Initialize ShellSDK to connect with parent shell library
    let shellSdk = ShellSdk.init(parent, '*');

    let shellSdkHelper = ShellSdkHelper.getInstance(shellSdk);
    const initialContext = await shellSdkHelper.getContext();
    currentContext = initialContext;
    UIContextList = createUIContextList(initialContext);

    /**
     * Update context in case new token is received. A token is only valid for five minutes.
     * With the help of shell-sdk-helper.ts a new token is fetched, before the current token
     * becomes invalid.
     * 
     * IMPORTANT: You only receive a new token in case the current token's validation period
     * is less than one minute. If a new token is requested and the validation period is one
     * minute or more, you receive the current token again with an updated validation period.
     * A token's validation period is provided via the property expires_in, which contains
     * the time left in seconds.
     */
    shellSdkHelper.getNewTokenEmitter().on('newToken', (event: AuthResponse) => {
      let updatedContext = {
        ...currentContext,
        auth: event
      };

      let updatedUIContextList = createUIContextList(updatedContext);

      updateUI(updatedUIContextList);
    });
  }

  updateUI(UIContextList);
});

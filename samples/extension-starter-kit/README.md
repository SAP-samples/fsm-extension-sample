# SAP Field Service Management Extension Starter Kit

This is an SAP Field Service Management extension project configured for quick-start development with contemporary tooling. The setup utilizes TypeScript and Node.js, enabling TypeScript-based development with npm package management. Pre-configured npm scripts handle the TypeScript compilation process and serve the resulting application files (HTML, CSS, and JavaScript) through a secure tunnel, making them publicly accessible via HTTPS.

## Working with the Starter Kit

### Prerequisite

You have an ngrok account and configured ngrok with an "Authtoken". For more information, see the official [ngrok documentation](https://ngrok.com/docs).

### Ste by step

1. In the corresponding folder in the command line of your terminal, install the project's dependencies by running `npm install`.
2. Built and serve the project by running `npm run start:dev`. It will be served at <http://localhost:3003>. Hot reload will trigger automatically after code changes.
3. In a new command line run `npm run tunnel` to tunnel localhost, and make it publicly accessible from the internet.

### Outcome

The Ngrok publicly accessible URL should be displayed. This is an example how it looks like:

![Picture 1](https://user-images.githubusercontent.com/26272656/145995859-7ed82fad-4c92-4935-80b1-ac1b2f74c185.png)

### Next Steps

Now you copy the URL, and install it as an extension in the FSM Extension Management app. Anytime you change and save the content in the index.html, it will be automatically reflected in the UI. For more information about the manual installation and the placement of an extension application, please see the following references:

- [Manual Installation of an Extension](https://help.sap.com/viewer/fsm_extensions/Cloud/en-US/install-manually.html)
- [Placing an Extension App](https://help.sap.com/viewer/fsm_extensions/Cloud/en-US/place-an-extension-app.html)

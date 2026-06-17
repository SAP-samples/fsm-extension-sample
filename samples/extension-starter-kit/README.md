# SAP Field Service and Asset Management Extension Starter Kit

This is an SAP Field Service and Asset Management extension project configured for quick-start development with contemporary tooling. The setup utilizes TypeScript and Node.js, enabling TypeScript-based development with npm package management. Pre-configured npm scripts handle the TypeScript compilation process and serve the resulting application files (HTML, CSS, and JavaScript) through a secure tunnel, making them publicly accessible via HTTPS.

**Use this sample or parts of it in production environments at your own risk**. It should be used only as a reference, since it does not follow any particular security, performance, or quality standards.

## Working with the Starter Kit

### Prerequisite

You have an ngrok account and configured ngrok with an "Authtoken". For more information, see the official [ngrok documentation](https://ngrok.com/docs).

### Step by Step

1. In the corresponding folder in the command line of your terminal, install the project's dependencies by running `npm install`.
2. Built and serve the project by running `npm run start:dev`. It will be served at <http://localhost:3003>. Hot reload will trigger automatically after code changes.
3. In a new command line run `npm run tunnel` to tunnel localhost, and make it publicly accessible from the internet.

### Outcome

The Ngrok publicly accessible URL should be displayed. This is an example how it looks like:

![Picture 1](https://user-images.githubusercontent.com/26272656/145995859-7ed82fad-4c92-4935-80b1-ac1b2f74c185.png)

### Next Steps

Now you copy the URL, and install it as an extension in the SAP Field Service and Asset Management Extension Management app. Anytime you change and save the content in the index.html, it will be automatically reflected in the UI. For more information about the manual installation and the placement of an extension application, please see the following references:

- [Manual Installation of an Extension](https://help.sap.com/docs/SAP_FIELD_SERVICE_MANAGEMENT/fsm_extensions/install-manually.html)
- [Placing an Extension App](https://help.sap.com/docs/SAP_FIELD_SERVICE_MANAGEMENT/fsm_extensions/place-an-extension-app.html)

## Deploying to SAP BTP Cloud Foundry

If you have a SAP BTP CF account, this sample can be deployed to a CF space:

- Install the CF CLI if not yet installed <https://github.com/cloudfoundry/cli>
- In a terminal session, go to the root folder of this extension
- If not already done in a previous step, install the project's dependencies by running `npm install`.
- Build the project by running `npm run build`.
- Login to the corresponding space and org using `cf login -a <API_ENDPOINT> -o <ORG> -s <SPACE>`. You can find these values in the BTP cockpit under "Subaccount > Overview > Cloud Foundry Environment".
- Run `cf push` and `cf apps` to get the url where the sample is served.

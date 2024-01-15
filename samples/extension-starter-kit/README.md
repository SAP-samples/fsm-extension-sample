# SAP Field Service Management Extension Starter Kit

This project is an SAP Field Service Management extension project with a setup that has the aim to start quickly with some modern tools. In this setup, TypeScript and Node are used, so you can write your code in TypeScript format and import dependencies from npm. Additionally, there are ready to use npm scripts to build the ts code to a js file and make it together with the html and css files accessible from outside via a https URL through a tunnel tool.

## Working with the Starter Kit

### Prerequisite 

You have an ngrok account and configured ngrok with an authtoken. For more information, see the official [ngrok documentation](https://ngrok.com/docs).

### Procedure 

1. Open a command line tool and execute the following command: `npm install`<br>
The starter kit is installed on your local machine.
2. Execute the following command: `npm run start:dev`<br>
The ts files are built and the extension application is served via a localhost URL. The hot reload is running and the command watches for code changes and automatically triggers updates.
3. Open a second command line tool window and execute the following command: `npm run tunnel` <br>
The localhost URL is tunneled, and the publicly accessible URL is generated. 

### Results
The publicly accessible URL is displayed. Here is an example where the URL is displayed under **Forwarding**:<br>

<img width="720" alt="Picture 1" src="https://user-images.githubusercontent.com/26272656/145995859-7ed82fad-4c92-4935-80b1-ac1b2f74c185.png">
 

### Next Steps
You can now copy the URL to manually install and place the extension application, and then work with the extension application. If you later change the content in the index.html and save the file, the changes are directly reflected on the UI. For more information about the manual installation and the placement of an extension application, see the following links:

-	[Manual Installation of an Extension](https://help.sap.com/viewer/fsm_extensions/Cloud/en-US/install-manually.html)<br><br>
-	[Placing an Extension App](https://help.sap.com/viewer/fsm_extensions/Cloud/en-US/place-an-extension-app.html)


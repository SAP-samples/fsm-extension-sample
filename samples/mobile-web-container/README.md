# Mobile Web Container Extension

This extension is a minimalist extension sample, which runs inside a mobile web container. The necessary steps to run this extension inside a mobile web container are described in the “Running the Extension” section. If you are not familiar with the mobile web container concept, please read the respective [documentation](https://help.sap.com/docs/SAP_FIELD_SERVICE_MANAGEMENT/fsm_mobile/web-containers.html) in advance.

**Note:** This extension is only targeted to run inside a web container, and not in a browser window. 

## Running the Extension

To run the extension, perform the following steps: 
1. Run the extension locally. 
2. Get the public URL to allow the extension running inside the web container. 
3. Create the web container.
4. Access the web container with the extension.

**Tip:** As an alternative to step 1 and step 2, you can also run the extension on any node server. 

### Running Locally
- Run `npm install`.
- Set an environment variable `SECRET_KEY` with a random string to randomize your backend authentication, or add a `.env` file with `SECRET_KEY=<random_key>`. Note that when you add this file, the file needs to be on the same level as the package.json so not in a subfolder or similar.
- Start the server using `npm start`.

### Get the Publicly Accessible URL

To receive the access URL for the extension, you can use an external solution like [ngrok](https://ngrok.com/) or [localtunnel](https://github.com/localtunnel/localtunnel). These solutions provide a publicly accessible URL that will proxy all requests to your locally running web server.

### Creating a Web Container
1. Open the Admin application and login with your account.
2. From the side menu, choose **Companies** and select the desired company. 
3. From the side menu, choose **Web Containers**.
4. On the screen, create a new web container with the following data:
    1. **Name:** Enter any name (for example, `Web Container Extension Demo`)
    2. **Title:** Enter any title. This title is then displayed in the mobile application. (for example, `Web Container Extension Demo`)
    3. **Object Types:** Select any object type that supports web containers (for example, `Equipement`. For more information, see  [Supported Object Types](https://help.sap.com/docs/SAP_FIELD_SERVICE_MANAGEMENT/fsm_mobile/web-containers.html))
    4. **URL:** <Publicly_accessible_URL>/web-container-access-point (for ngrok the URL will, for example, look like this: https://87df-ed1a-6118-11e-d9b-6a02-42ac-1200-02bc.ngrok.io/web-container-access-point)

### Accessing the Web Container with the Extension
1. On your mobile phone, open the SAP Field Service Management mobile application proceed with the login.
2. From the burger menu, access the side menu. 
3. From the side menu, select the object type that you have chosen during the web container creation, for example, Equipment. A list of the respective object type is displayed. 
4. From the list, select an entry. 
The details of the entry are displayed. 
5. Choose the three dots menu. The title of the web container is displayed at the bottom.
6. Click on the web container title to access the web container with the extension.

## How to Get Support
If you find a bug or need support, please open an issue [here](https://github.com/SAP-samples/fsm-extension-sample/issues/new).

## License
Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](./LICENSE) file.

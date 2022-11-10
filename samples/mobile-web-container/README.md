# Mobile Web Container Extension

This extension is a minimalist extension sample, which runs inside a mobile web container. The necessary steps to run this extension inside a mobile web container are described in the “How to run” section. In case you are not familiar with the mobile web container concept, please read the respective [documenation](https://help.sap.com/docs/SAP_FIELD_SERVICE_MANAGEMENT/fsm_mobile/web-containers.html) in advanced.


## How to run

### Run locally
- Run `npm install`.
- Set an environment variable `SECRET_KEY` with a random string to randomize your backend authentication, or add a `.env` file with `SECRET_KEY=<random_key>` next to package.json.
- Start the server using `npm start`.

### Publicly accessible URL

For testing purpose, an external solution like [ngrok](https://ngrok.com/) or [localtunnel](https://github.com/localtunnel/localtunnel) can provide a publicly accessible url that will proxy all requests to your locally running webserver.

### Create a new Web Container
- Go the admin app and login with your account
- Choose the desired company and afterwards select "Web containers" from the side navigation
- Create a new web container with the following data:
  - Name: Provide any name (e. g. Web Container Extension Demo)
  - Object Types: Select any object type, who supports web containers (e. g. Equipement - see [Supported Object Types](https://help.sap.com/docs/SAP_FIELD_SERVICE_MANAGEMENT/fsm_mobile/web-containers.html))
  - URL: <publicly_accessible_url>/web-container-access-point (in case of ngrok the URL will e. g. look like this: https://87df-ed1a-6118-11e-d9b-6a02-42ac-1200-02bc.ngrok.io/web-container-access-point)


### Deployment

You can run this extension on **any node server**.

## How to obtain support
In case you find a bug or need support, please open an issue [here](https://github.com/SAP-samples/fsm-extension-sample/issues/new).

## License
Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](./LICENSE) file.

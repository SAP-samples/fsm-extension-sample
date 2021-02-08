# fsm-extension-sample OpenID Connect OAuth code flow example

## How to run

You need to define environment variable to configure your instance with the following values :

```
IDP_CLIENT_ID=<IDP_CLIENT_ID_PROVIDED_BY_SAP_FSM>
IDP_CLIENT_SECRET=<IDP_CLIENT_SECRET_PROVIDED_BY_SAP_FSM>
IDP_URL_AUTHORIZE=https://accounts.sap.com/oauth2/authorize
IDP_URL_TOKEN=https://accounts.sap.com/oauth2/token
IDP_URL_CALLBACK=https://<DOMAIN_OF_APP>/forward.html

# Used to generate bearer token, write any random string here
SESSION_SECRET=<CREATE_A_NEW_SECRET_KEY>

# To create credentials on start, you need to use the following variables
FSM_CLOUD_HOST=<cluster>.dev.coresuite.com
FSM_ACCOUNT=<account_name>
FSM_CLIENT_ID=<CLIENT_ID_PROVIDED_BY_ADMINISTRATOR>
FSM_CLIENT_SECRET=<CLIENT_SECRET_PROVIDED_BY_ADMINISTRATOR>
```

Variables can be defined directly in Dockerfile, or within a `/src/backend/.env` file.

`IDP_CLIENT_ID` and `IDP_CLIENT_SECRET` will be provided by SAP based on your cluster.

`FSM_CLIENT_ID` and `FSM_CLIENT_SECRET` will be used related to a cloud hose and account name to allow a specific user to access your extension and then defined per client case. See [FSM Help portal - Generating Client ID & Secret](https://docs.coresystems.net/admin/generating-client-id.html) for more details how to.

### Run using docker

Build your docker container

```
docker build -t <MY_CONTAINER_NAME> .
```

Run locally with exposed port 80

```
docker run -p 80:80 <MY_CONTAINER_NAME>
```

It is recommanded for development purpose to use a service like [ngrok.com](https://ngrok.com/) to expose your API to public services like Identity Providers.

## How to obtain support
In case you find a bug or need support, please open an issue [here](https://github.com/SAP-samples/fsm-extension-sample/issues/new).

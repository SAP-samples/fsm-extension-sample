# fsm-extension-sample OpenID Connect OAuth code flow example

## How to run

You need to define environment variable to configure your instance with the following values :

```
IDP_CLIENT_ID=<IDP_CLIENT_ID_PROVIDED_BY_SAP_FSM>
IDP_CLIENT_SECRET=<IDP_CLIENT_SECRET_PROVIDED_BY_SAP_FSM>
IDP_URL_AUTHORIZE=https://accounts.sap.com/oauth2/authorize
IDP_URL_TOKEN=https://accounts.sap.com/oauth2/token
IDP_URL_CALLBACK=https://<MY_DOMAIN>/forward.html
SESSION_SECRET=<CREATE_A_NEW_SECRET_KEY>

# To create credentials on install, you can use the following variables
FSM_CLOUD_HOST=<cluster>.dev.coresuite.com
FSM_ACCOUNT=<account_name>
FSM_CLIENT_ID=<CLIENT_ID_PROVIDED_BY_ADMINISTRATOR>
FSM_CLIENT_SECRET=<CLIENT_SECRET_PROVIDED_BY_ADMINISTRATOR>
```

Variables can be defined directly in Dockerfile, or within a `/src/backend/.env` file.

`IDP_CLIENT_ID` and `IDP_CLIENT_SECRET` will be provided by SAP based on your cluster.

`FSM_CLIENT_ID` and `FSM_CLIENT_SECRET` will be used related to a cloud hose and account name to allow a specific user to access your extension and then defined per client case. 


### Run using docker

Build local image

```
docker build -t <MY_CONTAINER_NAME> .
```

Run locally

```
docker run -p 80:80 <MY_CONTAINER_NAME>
```

### Run locally

Build local image

```
ln -s 
```

Run locally

```
docker run -p 80:80 <MY_CONTAINER_NAME>
```


## How to obtain support
In case you find a bug or need support, please open an issue [here](https://github.com/SAP-samples/fsm-extension-sample/issues/new).

## License
Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](./LICENSE) file.
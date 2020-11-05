# Authentication within an extension

This documentation page explains how to secure your SAP FSM extension using authentication. 
It only describes one possible implementation which is the recommanded **OpenID Connect OAuth code flow**, but can be adjusted to fit specific needs.

The **OpenID Connect OAuth code flow** require an extension to run a backend server which will provide secure APIs to fetch the SAP FSM objects. This backend will:

- Store client credentials to access the SAP FSM APIs and manage the SAP FSM OAuth access token
- Receive the OpenID Connect credential from an Identify Provider (IdP)
- Insure that the connected SSO user is the same as the one running the extension within shell
- Provide a token mechanism to identify a user inside the extension
- Perform request on behalf of a user to the SAP FSM APIs with the extension OAuth access token.

## 1. OAuth 2.0 Client credentials

Backend need to securly store client credentials to identify itself withn FSM as descibe in the [SAP FSM OAuth API documentation](https://docs.coresystems.net/api/oauth.html). 

Such credentials can be created by a SUPERUSER role at **Admin > Account > Clients**. It can also define APIs authorization to limit access with specific permissions. See [FSM Help portal - Generating Client ID & Secret](https://docs.coresystems.net/admin/generating-client-id.html) for more details how to.

```
FSM_CLIENT_ID=<CLIENT_ID_PROVIDED_BY_ADMINISTRATOR>
FSM_CLIENT_SECRET=<CLIENT_SECRET_PROVIDED_BY_ADMINISTRATOR>
```

Credentials are attached to a unique cluster and account name. An extension might need to handle multiple accounts, so then credentials for each of those accounts. 

To fetch protected data, it will be needed to exchange those credentials with an OAuth access_token which will be used for all users. Extensions needs to logs all requests for identification as FSM will only identify the extension and not the user.

## 2. OpenID Connect for users

Authentication within an extension require to implement a communication protocol with an identity provider (IdP). This example use the **OAuth 2.0 OpenID Connect protocol** with the **SAP Identify provider**.

Both SAP FSM and the IdP will use the **email** as `NAMEID` to identify a user.

An extension need to be registered to the IdP and identified using **IdP client credentials**

```
IDP_CLIENT_ID=<IDP_CLIENT_ID_PROVIDED_BY_SAP_FSM>
IDP_CLIENT_SECRET=<IDP_CLIENT_SECRET_PROVIDED_BY_SAP_FSM>
```

To maange an Identity Provide, an extension need to store an **authorize url**, a **token url**, and a **callback url** to return the authorization code.

```
IDP_URL_AUTHORIZE=https://accounts.sap.com/oauth2/authorize
IDP_URL_TOKEN=https://accounts.sap.com/oauth2/token
IDP_URL_CALLBACK=https://<DOMAIN_OF_APP>/forward.html
```

Multiple libaries offer high level implementation of the OAuth OpenID protocol. Code sample use the [passportjs openid](http://www.passportjs.org/) library.

On login, the extension will redirect the user to the IdP for identification, then redirect to the `IDP_URL_CALLBACK` with the authorization code. 
Passport will exchange this code on the backend side with the IdP to return the **user jwttoken** containing the user email.

## 3. Connect user accounts between IdP and FSM

To identify a user request, FSM provide in context the **cluster url, account name, and user id**. 
Those values can be fetch with the [ShellSDK](https://github.com/SAP/fsm-shell) library, using the **require_context** event.

Using the client credentials to get an access token, an extension can fetch the FSM user profile as describe in [USER ID](https://docs.coresystems.net/api/user-api.html) to **verify if the FSM user email match the IdP email value**.

When both profile match, a **session token can be assign to the user** to access the extension API and insure authentication.

## 4. Session token

**FSM Client credentials and OAuth access token must never be communicated to the front-end application** and only be stored within the backend.

You are free to use any authentication mechanism to protect your APIs. Passportjs provide a simple **bearer token authentication** mechanism which can be easily use for demo purpose.

## 5. Fetch FSM APIs using the OAuth token

FSM APIs require **headers context** when fetching data. Those headers provided by the [ShellSDK](https://github.com/SAP/fsm-shell) should then be required at the extension API level too.

More details regarding FSM APIs within the [SAP FSM Help portal - API documentation](https://docs.coresystems.net/api/introduction.html).




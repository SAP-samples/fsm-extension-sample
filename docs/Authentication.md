# Authentication within an extension

This documentation page explains how to secure your SAP FSM extension using authentication. 
It only describes one possible implementation which is the recommanded **OpenID Connect OAuth code flow**, but can be adjusted to fit specific needs.

The **OpenID Connect OAuth code flow** require an extension to run a backend server which will provide secure APIs to fetch the SAP FSM objects. This backend will:

- Store client credentials to access the SAP FSM APIs and manage the SAP FSM OAuth access token
- Receive the OpenID Connect credential from an Identify Provider (IdP)
- Insure that the connected SSO user is the same as the one running the extension within shell
- Provide a token mechanism to identify a user inside the extension
- Store and assign to a user a SAP FSM OAuth access token to fetch APIs

## 1. OAuth 2.0 Client credentials 

Backend need to securly be configured with client credentials to identify itself as descibe in the [SAP FSM OAuth API documentation](https://docs.coresystems.net/api/oauth.html). 

```
FSM_CLIENT_ID=<CLIENT_ID_PROVIDED_BY_ADMINISTRATOR>
FSM_CLIENT_SECRET=<CLIENT_SECRET_PROVIDED_BY_ADMINISTRATOR>
```

Such credentials can be created by any user with the SUPERUSER role at **Admin > Account > Clients**. They also define APIs authorisation to limit access to specific permissions

Credentials are attached to a unique cluster and account name. An extension might need to handle multiple accounts, so then credentials for each of those accounts. 
To fetch protected data, it will be needed to exchance those credentials with an OAuth access_token which will be used for all users. **Extensions needs to logs all requests with user details as the FSM only identify the extension and not the user**.

## 2. OpenID Connect

Authentication within an extension require to implement a communication protocol with an identity provider (IdP). This example use the **OAuth 2.0 OpenID Connect protocol** and recommanded **SAP IdP**.

Both SAP FSM and the IdP will use the **email** as `NAMEID` to identify a user.

Your extension need to be registered to the IdP and identified using **client credentials**
```
IDP_CLIENT_ID=<IDP_CLIENT_ID_PROVIDED_BY_SAP_FSM>
IDP_CLIENT_SECRET=<IDP_CLIENT_SECRET_PROVIDED_BY_SAP_FSM>
```

You will also need to provide OpenID with an **authorize url**, a **token url**, and a **callback url** to return the authorization code to your extension

```
IDP_URL_AUTHORIZE=https://accounts.sap.com/oauth2/authorize
IDP_URL_TOKEN=https://accounts.sap.com/oauth2/token
IDP_URL_CALLBACK=https://<MY_DOMAIN>/forward.html
```

Multiple libaries offer automatic handling of the OAuth OpenID protocol. Code sample will be using the [node passport-openid](http://www.passportjs.org/) library.

On login, the extension will be redirected to the IdP when user will login then redirect to a passport url with the authorisation code. 
Passport will exchange this code on the backend side with the IdP to access the user jwt token containing the user email.

A single user can be part of **multiple accounts on multiple cluster**, and so have **multiple credential** which is why login need to know from FSM the exact current used account. 
This need to be handle at the backend level.

## 3. Connect a user between IdP and FSM

To identify a user on login request, you need an IdP profile, but also the FSM context containing the **cluster url, account name, company id, and user id**. 
Those values can be fetch using the [ShellSDK](https://github.com/SAP/fsm-shell) require_context message.

Use the client credentials to get an access token and fetch the FSM user profile as describe in [USER ID](https://docs.coresystems.net/api/user-api.html) to **ensure on login the FSM user email match the IdP email value**.

When both profile match, you can **assign to the user a session token** to access the extension API and insure authenticatio within your own APIs.

## 4. Session token

**FSM Client credentials and OAuth access token must never be communicated to the front-end application** and only be stored within the backend.

You are free to use any authentication mechanism to protect your APIs. Passportjs provide a conveniant **bearer token authentication** which can be easily use for demo purpose.

## 5. Fetch FSM APIs using the OAuth token

FSM APIs require headers context when fetching data like the cluster, account, and company details. Permissions might also be assign to your client credentiels to restrict access.




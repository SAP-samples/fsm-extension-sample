# Authentication within an extension

This documentation page explains how to secure your SAP Field Service and Asset Management extension using authentication.
It only describes one possible implementation which is the recommended **OpenID Connect OAuth code flow**, but can be adjusted to fit specific needs.

The **OpenID Connect OAuth code flow** requires an extension to run a backend server which will provide secure APIs to fetch the SAP Field Service and Asset Management objects. This backend will:

- Store client credentials to access the SAP Field Service and Asset Management APIs and manage the OAuth2 access token
- Receive the OpenID Connect credential from an Identity Provider (IdP)
- Ensure that the connected SSO user is the same as the one running the extension within shell
- Provide a token mechanism to identify a user inside the extension
- Perform requests on behalf of a user to the SAP Field Service and Asset Management APIs with the extension OAuth access token.

## 1. OAuth 2.0 Client credentials

The backend needs to securely store client credentials to identify itself with SAP Field Service and Asset Management as described in the [OAuth2 API documentation](https://help.sap.com/docs/SAP_FIELD_SERVICE_MANAGEMENT/fsm_access_api/oauth-intro.html).

Such credentials can be created by a SUPERUSER role at **Admin > Account > Clients**. It can also define API authorizations to limit access with specific permissions. See [SAP Field Service and Asset Management Help portal - Generating Client ID & Secret](https://help.sap.com/docs/SAP_FIELD_SERVICE_MANAGEMENT/fsm_admin/generating-client-id.html) for more details on how to.

```bash
FSM_CLIENT_ID=<CLIENT_ID_PROVIDED_BY_ADMINISTRATOR>
FSM_CLIENT_SECRET=<CLIENT_SECRET_PROVIDED_BY_ADMINISTRATOR>
```

Credentials are attached to a unique cluster and account name. An extension might need to handle multiple accounts, so it needs credentials for each of those accounts.

To fetch protected data, it will be needed to exchange those credentials with an OAuth access_token which will be used for all users. Extensions need to log all requests for identification as SAP Field Service and Asset Management will only identify the extension and not the user.

## 2. OpenID Connect for users

Authentication within an extension requires implementing a communication protocol with an identity provider (IdP). This example uses the **OAuth 2.0 OpenID Connect protocol** with the **SAP Identity provider**.

Both SAP Field Service and Asset Management and the IdP will use the **email** as `NAMEID` to identify a user.

An extension needs to be registered to the IdP and identified using **IdP client credentials**

```bash
IDP_CLIENT_ID=<IDP_CLIENT_ID_PROVIDED_BY_SAP_FSM>
IDP_CLIENT_SECRET=<IDP_CLIENT_SECRET_PROVIDED_BY_SAP_FSM>
```

To manage an Identity Provider, an extension needs to store an **authorize url**, a **token url**, and a **callback url** to return the authorization code.

```bash
IDP_URL_AUTHORIZE=https://accounts.sap.com/oauth2/authorize
IDP_URL_TOKEN=https://accounts.sap.com/oauth2/token
IDP_URL_CALLBACK=https://<DOMAIN_OF_APP>/forward.html
```

Multiple libraries offer high level implementation of the OAuth OpenID protocol. The code sample uses the [passportjs openid](http://www.passportjs.org/) library.

On login, the extension will redirect the user to the IdP for identification, then redirect to the `IDP_URL_CALLBACK` with the authorization code.
Passport will exchange this code on the backend side with the IdP to return the **user jwttoken** containing the user email.

## 3. Connect user accounts between IdP and SAP Field Service and Asset Management

To identify a user request, SAP Field Service and Asset Management provides in context the **cluster url, account name, and user id**.
Those values can be fetched with the [ShellSDK](https://github.com/SAP/fsm-shell) library, using the **require_context** event.

Using the client credentials to get an access token, an extension can fetch the SAP Field Service and Asset Management user profile as described in [USER ID](https://help.sap.com/docs/SAP_FIELD_SERVICE_MANAGEMENT/fsm_user_api/user-api-overview.html) to **verify if the SAP Field Service and Asset Management user email matches the IdP email value**.

When both profiles match, a **session token can be assigned to the user** to access the extension API and ensure authentication.

## 4. Session token

**SAP Field Service and Asset Management Client credentials and OAuth access token must never be communicated to the front-end application** and only be stored within the backend.

You are free to use any authentication mechanism to protect your APIs. Passportjs provides a simple **bearer token authentication** mechanism which can be easily used for demo purposes.

## 5. Fetch SAP Field Service and Asset Management APIs using the OAuth2 token

SAP Field Service and Asset Management APIs require **context headers** when fetching data. Those headers provided by the [ShellSDK](https://github.com/SAP/fsm-shell) should then be required at the extension API level too.

More details regarding SAP Field Service and Asset Management APIs within the [API documentation](https://help.sap.com/docs/SAP_FIELD_SERVICE_MANAGEMENT#discover_task-development).

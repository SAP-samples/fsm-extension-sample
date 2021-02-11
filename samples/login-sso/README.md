# Login SSO extension sample

Login SSO extension is a minimalist sample of a login extension performed using SSO as authentication mechanism. 

## How to run

### Configuration

Define environment variables a following:

```
IDP_CLIENT_ID=9f62d73e-a750-4a65-9317-0a0bca095fd6
IDP_CLIENT_SECRET=Q6P]=qdxDN]1wIAR81e?ha8[?QyFvi

IDP_URL_AUTHORIZE=https://fsmsapxf.accounts400.ondemand.com/oauth2/authorize
IDP_URL_TOKEN=https://fsmsapxf.accounts400.ondemand.com/oauth2/token
IDP_URL_CALLBACK=https://6ac864f8e47d.ngrok.io/forward.html
```

### Run locally

Install dependency `npm install` then run server with `npm start`.

#### Publicly accessible

For testing purpose, an external solution like [ngrok](https://ngrok.com/) or [localtunnel](https://github.com/localtunnel/localtunnel) can provide a publicly accessible url that will proxy all requests to your locally running webserver.

## Deployment

...

## How to obtain support
In case you find a bug or need support, please open an issue [here](https://github.com/SAP-samples/fsm-extension-sample/issues/new).

## License
Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](./LICENSE) file.

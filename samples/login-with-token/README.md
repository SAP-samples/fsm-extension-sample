# Login with token extension sample

Login with token extension is a minimalist sample of a login extension performed with a backend authentication mechanism.

## How to run

### Run locally
- Run `npm install`.
- Set an environment variable `SECRET_KEY` with a random string to randomize your backend authentication, or add a `.env` file with `SECRET_KEY=<random_key>` next to package.json.
- Start the server using `npm start`.

#### Publicly accessible
For testing purpose, an external solution like [ngrok](https://ngrok.com/) or [localtunnel](https://github.com/localtunnel/localtunnel) can provide a publicly accessible url that will proxy all requests to your locally running webserver.

## Deploy

You can run this extension on **any node server**, or use the following installation script:

<a href="https://heroku.com/deploy?env[SAMPLE]=login-with-token">
  <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy">
</a>

## How to obtain support
In case you find a bug or need support, please open an issue [here](https://github.com/SAP-samples/fsm-extension-sample/issues/new).

## License
Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](./LICENSE) file.

# Without Shell navigation extension sample

This extension is a minimalist sample of a front-end extension, which runs inside Shell as a full custom app without making use of the Shell side navigation. While running inside Shell, the extension hides its top bar and shows its side navigation meanwhile running standalone, the extension shows its top bar and its side navigation. The extension should be assigned to the Shell Home Screen and should not be assigned to an outlet.


## How to run

Front-end extension only requires a static storage with a web server to be running.

### Run locally

You can run a local web server using the [http-server](https://www.npmjs.com/package/http-server) node package
```
npm install --global http-server
http-server [path] [options]
```

An alternative solution might already be available on your machine using python3
```
python3 -m http.server 8080
```

#### Publicly accessible

For testing purpose, an external solution like [ngrok](https://ngrok.com/) or [localtunnel](https://github.com/localtunnel/localtunnel) can provide a publicly accessible URL that will proxy all requests to your locally running webserver.

### GitHub Pages

GitHub offers static hosting as part of the [GitHub pages](https://pages.github.com/) functionality. Each GitHub repository can host static files and then be used with some limits to host your front-end application.

## How to obtain support
In case you find a bug or need support, please open an issue [here](https://github.com/SAP-samples/fsm-extension-sample/issues/new).

## License
Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](./LICENSES/Apache-2.0.txt) file.

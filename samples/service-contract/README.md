# Service contract extension sample

Service contract extension is a minimalist sample of a front-end extension fetching the data API using the authentication mechanism. 
It is designed to run within the [dispatching board](https://help.sap.com/viewer/fsm_extensions/Cloud/en-US/dispatching-board.html).

## How to run

Front-end extension only require a static storage with a web server to be running.

### Run locally

You can run a local web server using the [http-server](https://www.npmjs.com/package/http-server) node package
```
npm install --global http-server
http-server [path] [options]
```

An alternative solution might already been available on your machine using python3
```
python3 -m http.server 8080
```

#### Publicly accessible

For testing purpose, an external solution like [ngrok](https://ngrok.com/) or [localtunnel](https://github.com/localtunnel/localtunnel) can provide a publicly accessible url that will proxy all requests to your locally running webserver.

### Github Pages

Github offers static hosting as part of the [Github pages](https://pages.github.com/) functionnality. Each github repository can host static files and then be used with some limits to host your front-end application.

## How to obtain support
In case you find a bug or need support, please open an issue [here](https://github.com/SAP-samples/fsm-extension-sample/issues/new).

## License
Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](./LICENSES/Apache-2.0.txt) file.

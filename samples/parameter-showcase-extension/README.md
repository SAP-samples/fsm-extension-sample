# Parameter Showcase Extension

The Parameter Showcase Extension is a minimalist sample of a front-end extension that showcases the capability of FSM Extensions to ask the user for parameter when installing.
The data provided by the user during the installation is encrypted and stored within SAP FSM. The extension can access those values during runtime.

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

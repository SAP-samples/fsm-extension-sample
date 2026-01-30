# Parameter Showcase Extension

The Parameter Showcase Extension is a minimalist sample of a front-end extension that showcases the capability of FSM Extensions to ask the user for parameter when installing.
The data provided by the user during the installation is encrypted and stored within SAP FSM. The extension can access those values during runtime.

It is designed to run within the [dispatching board](https://help.sap.com/docs/SAP_FIELD_SERVICE_MANAGEMENT/fsm_extensions/dispatching-board.html).

## How to run

Front-end extension only require a static storage with a web server to be running.

### Run locally

You can run a local web server using the [http-server](https://www.npmjs.com/package/http-server) node package

```bash
npm install --global http-server
http-server [path] [options]
```

An alternative solution might already been available on your machine using python3

```bash
python3 -m http.server 8080
```

#### Publicly accessible

For testing purpose, an external solution like [ngrok](https://ngrok.com/) or [localtunnel](https://github.com/localtunnel/localtunnel) can provide a publicly accessible url that will proxy all requests to your locally running webserver.

### Github Pages

Github offers static hosting as part of the [Github pages](https://pages.github.com/) functionality. Each github repository can host static files and then be used with some limits to host your front-end application.

### Deploying to SAP BTP Cloud Foundry

If you have a SAP BTP CF account, this sample can be deployed to a CF space:

- Install the CF CLI if not yet installed <https://github.com/cloudfoundry/cli>
- In a terminal session, go to the root folder of this extension
- Login to the corresponding space and org using `cf login -a <API_ENDPOINT> -o <ORG> -s <SPACE>`. You can find these values in the BTP cockpit under "Subaccount > Overview > Cloud Foundry Environment".
- Run `cf push` and `cf apps` to get the url where the sample is served.
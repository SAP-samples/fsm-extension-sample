# SAP Field Service Management - Extension samples

[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/fsm-extension-sample)](https://api.reuse.software/info/github.com/SAP-samples/fsm-extension-sample)

This repo contains the samples that demonstrate the API usage patterns for extensions within the [SAP FSM (Field Service Management)](https://www.sap.com/products/field-service-management.html) application. These code samples were created to help developpers start buidling extensions, and are designed to run on any platforms.

> Note: If you are unfamiliar with the SAP FSM API, or the extensibility program, details can be found within the [SAP Field Service Management Help Portal](https://help.sap.com/viewer/product/SAP_FIELD_SERVICE_MANAGEMENT/Cloud/en-US).

## SAP FSM Extension development

These samples require access to the SAP FSM application to run.  
All details regarding how to get such access are available within our [Help Portal](https://help.sap.com/viewer/product/SAP_FIELD_SERVICE_MANAGEMENT/Cloud/en-US).

## Using the samples

The easiest way to use these samples without using Git is to download the zip file containing the current version (using the following link or by clicking the "Download ZIP" button on the repo page). You can then unzip the entire archive and use the samples locally on your machine.

[Download the samples ZIP](../../archive/master.zip)

Each sample provide a README file with instruction regarding how to setup and run locally. It might also include recommanded deployment strategy based on technical specificity. For testing purpose, an external solution like [ngrok](https://ngrok.com/) or [localtunnel](https://github.com/localtunnel/localtunnel) can provide a publicly accessible url that will proxy all requests to your locally running webserver.

## Contributions

These samples are direct from the feature teams and we welcome your input on issues and suggestions for new samples. At this time we are not accepting new samples from the public, but check back here as we evolve our contribution model.

## Samples by architecture

### Front-end

<table>
 <tr>
  <td><a href="samples/service-contract/">Service contract</a></td>
 </tr>
 <tr>
  <td><a href="samples/with-shell-navigation/">Inside Shell with Shell navigation</a></td>
 </tr>
 <tr>
  <td><a href="samples/without-shell-navigation/">Inside Shell without Shell navigation</a></td>
 </tr>
</table>

### Front-end and Backend

<table>
 <tr>
  <td><a href="samples/login-with-token/">Login with token</a></td>
 </tr>
</table>

### Front-end and Backend using SSO

<table>
 <tr>
  <td><a href="samples/login-with-sso/">Login with SSO</a></td>
 </tr>
</table>

## How to obtain support

In case you find a bug or need support, please open an issue [here](https://github.com/SAP-samples/fsm-extension-sample/issues/new).

## License
Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](./LICENSES/Apache-2.0.txt) file.

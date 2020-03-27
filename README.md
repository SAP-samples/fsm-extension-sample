# SAP Field Service Management Extension Sample Repository
This sample provides a template that helps configure deployment information that can be uploaded and then integrated into SAP Field Service Management.

# Description
In an SAP Field Service Management system, customers can deploy an application to a Kyma cluster; this UI app can then be embedded into the SAP FSM UI by iframe mode.

This extension sample can facilitate this scenario by helping the customer automatically deploy his application to his Kyma cluster. The customer can download this template, fill in the necessary information (e.g. Docker image public address for this app), and upload the template to his public hub (e.g. public Docker hub, etc.).

Finally, the SAP FSM extension catalog will use the uploaded template to deploy this UI app to the Kyma cluster.

# Requirements / Download and Installation
* Install Node.js version 10.x or 12.x on your development machine
  ```
  https://nodejs.org/en/download/
  ```
* Add the SAP Registry to your NPM configuration
  ```
  npm config set @sap:registry=https://npm.sap.com
  ```
* Run NPM install from the root of the hana-developer-cli-tool-example project you just cloned to download dependencies
  ```
  npm install
  ```
* Modify image.registry value to your public image registry in values.yaml, Kyma cluster can quickly find this image and 
  successfuly deploy your app to cluster.

# Limitations
Your docker image must be uploaded to public image registry, otherwise the deployment will fail.

# Known Issues
There are no known issues at this time.

# How to obtain support
If you need support, please contact SAP FSM Extension-Catalog Team via below Email address:
```$xslt
DL CX Service Cloud SCAD Chengdu Team 2 <DL_56306F8C7BCF84F8D800027C@exchange.sap.corp>
```

# License
Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. This file is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](./LICENSE) file.

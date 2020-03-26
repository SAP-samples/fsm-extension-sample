# SAP Field Service Management Extension-Sample Repository
This sample provides a template that helps configure deployment information that can be uploaded and then integrated into SAP Field Service Management.

# Description
In FSM system, the customer is allowed to deploy himself an application to his Kyma Cluster, then this UI app can be embedded to FSM’s UI by iframe mode.
The extension-catalog solution to help customer automatically complete above requirement.
Since the Extension-Sample can help the customer to deploy his application to his Kyma cluster.
The customer can download this template and fill some necessary information (Docker image public address for this app) and upload this template to his public hub (Public docker hub etc).
Finally, the FSM extension-catalog will use uploaded template to deploy this UI app to his Kyma cluster.

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
If you need support, please contact SAP FSM Support Team.

# License
Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. This file is licensed under the “SAP Sample Code License” except as noted otherwise in the LICENSE file.

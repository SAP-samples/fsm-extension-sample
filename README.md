# SAP Field Service Management Extension Sample Repository
This sample provides a template that helps generate skeleton of the fsm extension application project.

# Description
In SAP Field Service Management, customers can deploy an extension application to Kyma or any Kubernetes-based cluster, which can then be integrated into the SAP Field Service Management.

This extension sample facilitates such scenario by helping the extension developer to generate the skeleton of the extension application project automatically. The extension developer can then modify the generated project according to the specific business requirements, and finally generate helm charts automatically and upload to the Git repository.

# Preliminaries
Make sure that the following prerequisites are met before you use this repository for your extension application:
* Have an account in Git-based version control system, such as GitHub
* Install Git CLI locally via https://git-scm.com/downloads
* Have an account in public docker registry, such as Docker Hub
* Install Docker Desktop locally via https://www.docker.com/get-started, and sign in the docker registry
* [Optional] If you want to deploy the extension application to Kyma manually, you need to install helm CLI locally and configure it via https://kyma-project.io/docs/#installation-use-helm

# Workflow
Follow these steps to set up your extension application project by using this sample repository:
* Execute the script [generator.sh](./generator.sh) to generate the extension application project from scaffolds.
* Change shell's current directory into the generated project, which is now the workspace under your control.
* Modify the source code of the generated project according to the specific business requirements.
* Check the **appconfig** file, and change *application_version* or *helm_chart_version* if you want to publish with new versions.
* Execute the script **build-charts.sh** in the generated project to build helm charts.
* [Optional] Try to deploy the extension application to Kyma manually. Example:
```
helm install ./helm/<application_name> --name <application_name> --namespace <kyma_namespace> --set kyma.apiv1.enabled=true --tls
```
* Upload the generated project to Git repository.

# Limitations
Private docker registry is not supported by the scaffolds.

*application_icon* and *application_description* can only be written to charts by scripts one time. If update is needed after then, you should update them in **Chart.yaml** manually.

# Known Issues
There are no known issues for the moment.

# How to obtain support
In case you find a bug or need support, please open an issue [here](https://github.com/SAP-samples/fsm-extension-sample/issues/new).

# License
Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. This file is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](./LICENSE) file.

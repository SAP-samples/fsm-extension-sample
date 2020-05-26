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
* Install Docker Desktop locally via https://www.docker.com/get-started, and sign in the docker registry from Docker Desktop GUI or Docker Desktop CLI
* [Optional] If you want to deploy the extension application to Kyma manually, you need to install helm CLI locally and configure it via https://kyma-project.io/docs/#installation-use-helm

# Workflow
Follow these steps to set up your extension application project by using this sample repository:
* Clone the extension sample to local machine.
* Open a shell command tool and go to root folder of the local extension sample project.
* Execute the script [generator.sh](./generator.sh) to generate the extension application project from scaffolds, and configure following information:
    * application name
    * application version: the docker image tags, it should be incremented each time you make changes to the application.
    * description
    * icon
    * helm chart version: the chart version, which follows semver 2.x specification https://semver.org/, and it should be incremented each time you make changes to the chart and its templates, including the application version.
    * docker registry: the repository where the generated docker image is stored.
* Change shell's current directory into the generated project, which is now the workspace under your control.
* Modify the source code of the generated project according to the specific business requirements.
* Check the **appconfig** file in the generated project, and change *application_version* or *helm_chart_version* if you want to publish with new versions.
* Execute the script **build-charts.sh** in the generated project to build helm charts.
* Check if the new version was pushed to docker hub via https://hub.docker.com/u/{your docker ID}/tags
* Upload the generated project to your Git repository and make sure it is public.
If you want to deploy the extension application to Kyma manually.
Example:
```
helm install ./helm/<application_name> --name <application_name> --namespace <kyma_namespace> --set kyma.apiv1.enabled=true --tls
```
If you want to automatically deploy the extension application to Kyma via our extension installer, please refer to https://github.com/SAP-samples/fsm-extension-installer-kyma and make sure your deployment artifacts are on the master branch.

# Limitations
Private docker registry is not supported by the scaffolds.

*application_icon* and *application_description* can only be written to charts by scripts one time. If update is needed after then, you should update them in **Chart.yaml** manually.

# Known Issues
There are no known issues for the moment.

# How to obtain support
In case you find a bug or need support, please open an issue [here](https://github.com/SAP-samples/fsm-extension-sample/issues/new).

# License
Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. This file is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](./LICENSE) file.

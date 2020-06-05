# SAP Field Service Management Extension Sample Repository
This sample provides a template that helps generate skeleton of the FSM extension application project.

# Description
In SAP Field Service Management, customers can deploy an extension application to Kyma or any Kubernetes-based cluster, which can then be integrated into the SAP Field Service Management.

This extension sample facilitates such scenario by helping the extension developer to generate the skeleton of the extension application project automatically. The extension developer can then modify the generated project according to the specific business requirements, and finally generate helm charts automatically and upload to the Git repository.

# Preliminaries
Make sure that the following prerequisites are met before you use this repository for your extension application:
* Have an account in Git-based version control system, such as GitHub
* Install Git CLI locally via https://git-scm.com/downloads
* Have an account in public docker registry, such as Docker Hub
* Install Docker Desktop locally via https://www.docker.com/get-started, and sign in the docker registry from Docker Desktop GUI or Docker Desktop CLI
* Install jq locally via https://stedolan.github.io/jq/download/
* [Optional] If you want to deploy the extension application to Kyma manually, you need to install helm CLI locally and configure it via https://kyma-project.io/docs/#installation-use-helm

# Workflow
Follow these steps to set up your extension application project by using this sample repository:
* Clone the extension sample to local machine.
* Open a shell command tool, like bash, zsh, etc and change shell's current directory to root folder of the local extension sample project.
* Execute the script [generator.sh](./generator.sh) to generate the extension application project from scaffolds.
* Change shell's current directory into the generated project, which is now the workspace under your control.
* Modify the source code of the generated project according to the specific business requirements.
* Check the **appconfig.json** file in the generated project, if you ship the extension application with helm chart, you can configure extension details and define additional parameters needed from customer during installation. See [appconfig.json file](#appconfig.json-file) for more details.
* Execute the script **build-artifacts.sh** in the generated project to build docker image and helm charts.
* Check if the new version was pushed to docker hub via `https://hub.docker.com/repository/docker/{your docker ID}/{application name}/tags`.
* [Optional] If you want to deploy the extension application to Kyma manually.
Example:
```
helm install ./artifacts/helm/{application name} --name {application name} --namespace {kyma namespace} --set kyma.api.enabled=true --set kyma.version={kyma version} --tls
```

- Upload the generated project to your Git repository and make sure it is public.

```
>**NOTE:** If you don't want to upload the source code for any reason, you can upload only the "artifacts" folder of the generated project.
```

# Folder Structure

The generated extension application project must follow folder structure as below:

```
generated-project/
   ├── src/                                  # A directory which contains all business logic source code
   │    └── frontend/                        # A directory for UI soure code
   │    └── backend/                         # A directory for backend (nodejs, java) source code
   ├── test/                                 # A directory which contains all test cases
   ├── artifacts/                            # [REQUIRED] A directory which contains deployment artifacts
   │    ├── appconfig.json                   # [REQUIRED] A file which contains metadata for this extension
   │    ├── helm/{chart-name}/               # A Helm chart directory
   │    └── ....
   └── docs/                                 # A directory which contains documentation for this extension
```

## appconfig.json file

The appconfig.json file contains metadata about the extension application. The structure of the appconfig.json file must follow the definition as below:

| Field Name                         | Required | Description                                                  |
| :--------------------------------- | -------- | :----------------------------------------------------------- |
| name                               | Yes      | The name of the extension.                                   |
| provider                           | No       | The name of the upstream entity providing the extension.     |
| description                        | No       | The description of the extension.                            |
| version                            | Yes      | The version of the extension, it should be incremented each time you make changes to the extension application. |
| icon                               | No       | The URL to an icon. You must provide the image in the `SVG` or `PNG` format. |
| dockerRegistry                     | No       | The registry where the generated docker image is hosted. (Only for shipping with Helm Chart) |
| helmChartVersion                   | No       | The chart version of the extension, which follows semver 2.x specification https://semver.org/, and it should be incremented each time you make changes to the chart and its templates, including the application version. (Only for shipping with Helm Chart) |
| parameters[].name                  | No       | Defines an unique name of a given parameter.      |
| parameters[].description           | No       | Defines the description of a given parameter.     |
| parameters[].required              | No       | Defines if a given parameter must be provided during extension installation. |

This is an example of appconfig.json:

```
{
  "name": "My Extension App",
  "provider": "Partner A",
  "description": "This is My Extension App",   
  "version": "1.0.0", 
  "icon": "https://zh.wikipedia.org/wiki/File:User_Circle.png",  
  "parameters": [
    {
      "name": "token",      
      "description":"",      
      "required":"false"    
    },    
    {     
      "name": "targetsystemurl",     
      "description":"",     
      "required":"true"    
    }  
  ]
}
```

# Limitations

* Private docker registry is not supported by the scaffolds.
* The field "parameters" of appconfig.json doesn't support nested structure.

# Known Issues
There are no known issues for the moment.

# How to obtain support
In case you find a bug or need support, please open an issue [here](https://github.com/SAP-samples/fsm-extension-sample/issues/new).

# License
Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. This file is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](./LICENSE) file.

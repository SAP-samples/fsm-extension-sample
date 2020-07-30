# SAP Field Service Management Extension Sample Repository
This sample provides a template that helps generate skeleton of the FSM extension application project.

# Description
In SAP Field Service Management, customers can deploy an extension application to Kyma or any Kubernetes-based cluster, which can then be integrated into the SAP Field Service Management.

This extension sample facilitates such scenario by helping the extension developer to generate the skeleton of the extension application project automatically. The extension developer can then modify the generated project according to the specific business requirements and finally upload the project to the Git repository.

>**NOTE:** For the sake of demo all sources and artifacts will be publicly available.

# Preliminaries
Make sure that the following prerequisites are met before you use this repository for your extension application:

* Have an account in Git-based version control system which is exposed to the public internet, such as GitHub
* Install Git CLI locally via https://git-scm.com/downloads
* Have an account in public docker registry, such as Docker Hub
* Install Docker Desktop locally via https://www.docker.com/get-started, and sign in the docker registry from Docker Desktop GUI or Docker Desktop CLI
* Install jq locally via https://stedolan.github.io/jq/download/

>**NOTE:** We recommend using unix based systems to follow this guide. Note that for OSX and Windows tools might be installed differently.

# Workflow
Follow these steps to set up your extension application project by using this sample repository:

* Clone the extension sample to local machine.
* Open a shell command tool, like bash, zsh, etc and change shell's current directory to root folder of the local extension sample project.
* Execute the script [generator.sh](./generator.sh) to generate the extension application project from scaffolds.

>**Note:** If something fails (e.g. due to missing preliminaries) and you want to get back to the original status you can `git reset` to clean up your local repo and start the script again.

* Change shell's current directory into the generated project, which is now the workspace under your control.
* Modify the source code of the generated project according to the specific business requirements.
* Check the `appconfig.json` file in the generated project
* Execute the script `build-artifacts.sh` in the generated project to build docker image
* Check if the new version was pushed to docker hub via `https://hub.docker.com/repository/docker/{your docker ID}/{application name}/tags`.

* Upload the generated project to your Git repository and make sure it is public.

>**NOTE:** If you don't want to upload the source code for any reason, you can upload only the "artifacts" folder of the generated project.

# Folder Structure

The generated extension application project follows folder structure as below:

```
generated-project/
   ├── src/                                  # A directory which contains all business logic source code
   │    └── frontend/                        # A directory for UI source code
   │    └── backend/                         # A directory for backend (nodejs, java) source code
   ├── test/                                 # A directory which contains all test cases
   ├── artifacts/                            # [REQUIRED] A directory which contains deployment artifacts
   │    ├── appconfig.json                   # [REQUIRED] A file which contains metadata for this extension
   │    └── ....
   └── docs/                                 # A directory which contains documentation for this extension
```

## appconfig.json file

If you generate the extension application project via [generator.sh](./generator.sh), the `appconfig.json` is initial created automatically. Else if you create the extension application as a freestyle project and install it manually on arbitrary platform, there must be an endpoint `/appconfig.json` under the extension application root URL.

The `appconfig.json` file contains metadata about the extension application. The structure of the `appconfig.json` file must follow the definition as below:

| Field Name                         | Required | Description                                                  |
| :--------------------------------- | -------- | :----------------------------------------------------------- |
| name                               | Yes      | The name of the extension, which follows [RFC 1123 specification](https://tools.ietf.org/html/rfc1123), section "Host Names and Numbers". Even more, the uppercase characters are not supported.                                 |
| provider                           | No       | The name of the upstream entity providing the extension.     |
| description                        | No       | The description of the extension.                            |
| version                            | Yes      | The version of the extension, it should be incremented each time you make changes to the extension application. |
| icon                               | No       | The URL to an icon. You must provide the image in the `SVG` or `PNG` format. |
| parameters[].name                  | No       | Defines an unique name of a given parameter.      |
| parameters[].description           | No       | Defines the description of a given parameter.     |
| parameters[].required              | No       | Defines if a given parameter must be provided during extension installation. |

This is an example of `appconfig.json`:

```
{
  "name": "my-extension-app",
  "provider": "Partner A",
  "description": "This is My Extension App",   
  "version": "1.0.0", 
  "icon": "https://zh.wikipedia.org/wiki/File:User_Circle.png",  
  "parameters": [
    {
      "name": "token",      
      "description": "",      
      "required": false    
    },    
    {     
      "name": "targetsystemurl",     
      "description": "",     
      "required": true 
    }  
  ]
}
```

# Next Steps
There are two ways to deploy your extension to Kyma:

* Automatic deployment via the "Extension App" UI inside "Foundational Services" in SAP Field Service <https://docs.coresystems.net/shell/extension-apps-management.html>
* Automatic deployment via FSM API <https://github.com/SAP-samples/fsm-extension-sample/blob/master/docs/APIGuide.md>

# Limitations

* Private docker registry is not supported by the scaffolds.
* The field `parameters` of `appconfig.json` doesn't support nested structure.

# Known Issues
There are no known issues for the moment.

# How to obtain support
In case you find a bug or need support, please open an issue [here](https://github.com/SAP-samples/fsm-extension-sample/issues/new).

# License
Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. This file is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](./LICENSE) file.

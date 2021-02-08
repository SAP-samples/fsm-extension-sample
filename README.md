# SAP Field Service Management - Extension samples

[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/fsm-extension-sample)](https://api.reuse.software/info/github.com/SAP-samples/fsm-extension-sample)

This repo contains the samples that demonstrate the API usage patterns for the [SAP FSM (Field Service Management)](https://www.sap.com/products/field-service-management.html) extensions feature. These code samples were created to help developpers start buidling extensions, and are designed to run on any platforms.

> Note: If you are unfamiliar with the SAP FSM or the extensibility program, details can be found within the [SAP Field Service Management Help Portal](https://help.sap.com/viewer/product/SAP_FIELD_SERVICE_MANAGEMENT/Cloud/en-US)..

# Samples

No sample yet

# appconfig.json file

If you generate the extension application project via [generator.sh](./generator.sh), the `appconfig.json` is initial created automatically. Else if you create the extension application as a freestyle project and install it manually on arbitrary platform, there must be an endpoint `/appconfig.json` under the extension application root URL.

The `appconfig.json` file contains metadata about the extension application. The structure of the `appconfig.json` file must follow the definition as below:

| Field Name                         | Required | Description                                                  |
| :--------------------------------- | -------- | :----------------------------------------------------------- |
| name                               | Yes      | The name of the extension, which follows [RFC 1123 specification](https://tools.ietf.org/html/rfc1123), section "Host Names and Numbers". Even more, the uppercase characters are not supported.                                 |
| provider                           | No       | The name of the upstream entity providing the extension.     |
| description                        | No       | The description of the extension.                            |
| version                            | Yes      | The version of the extension, it should be incremented each time you make changes to the extension application. |
| icon                               | No       | The URL to an icon. You must provide the image in the `SVG` or `PNG` format. |
| useShellSDK                        | No       | If the extension uses the Shell SDK or not (default: true) |
| dockerRegistry                     | No (Yes for shipping with Helm Chart)  | The registry where the generated docker image is hosted. |
| helmChartVersion                   | No       | The chart version of the extension, which follows [semver 2.x specification](https://semver.org/), and it should be incremented each time you make changes to the chart and its templates, including the application version. (Only for shipping with Helm Chart) |
| parameters[].name                  | No       | Defines an unique name of a given parameter.      |
| parameters[].description           | No       | Defines the description of a given parameter.     |
| parameters[].required              | No       | Defines if a given parameter must be provided during extension installation. |
| outletPositions[]                  | No       | Possible to define in which outlets this extension can selected. An empty array means this extension is available in all outlets. Possible values are ["WFM_ACTIVITY_SIDEBAR", "SHELL_HOME_SCREEN"]  |

This is an example of `appconfig.json`:

```javascript
{
  "name": "my-extension-app",
  "provider": "Partner A",
  "description": "This is My Extension App",   
  "version": "1.0.0", 
  "icon": "https://zh.wikipedia.org/wiki/File:User_Circle.png",
  "dockerRegistry": "docker.io/ironman",
  "helmChartVersion": "1.0.0",
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

# How to obtain support
In case you find a bug or need support, please open an issue [here](https://github.com/SAP-samples/fsm-extension-sample/issues/new).

# License
Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](./LICENSE) file.

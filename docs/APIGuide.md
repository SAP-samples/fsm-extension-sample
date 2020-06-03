# How to Develop, Add, Use, and Manage Extensions
## How to develop an extension app?
Follow extension development guide https://github.com/SAP-samples/fsm-extension-sample.
## How to add an extension app into FSM system via API calls
### 1. Prepare Postman collection.
1. Import [FSM-Extension-Catalog.postman_collection.json](../postman/FSM-Extension-Catalog.postman_collection.json) into your Postman app. 
2. Import [cloud-extension-catalog-service.postman_environment.json](../postman/cloud-extension-catalog-service.postman_environment.json) into your Postman app.  Update the following variables:  
    - serviceUrl  
    - token  
    - account: the id of your account    
    - company: the id of your company  
3. You can fetch token via **get token** API in the postman collection just like below screenshot.  
![token](./token.png)
### 2. Add extension app.
#### Option 1 Automatic Deployment: Host your extension app in Kyma and Deploy your extension app via our extension installer.  
1. Provision Kyma via following options:
    - Option 1: Install Kubernetes cluster and Kyma via [gardener](https://gardener.cloud/documentation/050-tutorials/content/howto/gardener_gcp/).  (Verified)
    - Option 2: Install via [SAP Cloud Platform Extension Factory, Kyma Runtime](https://jam4.sapjam.com/groups/mYaTDaPrTFfwSbtvLnKjox/content?folder_id=vQPDbF2tshMpsFQWBhLeGZ).  (To be verified)
2. Setup connection between FSM and Kyma.
    1. Configuration in Kyma  
        From Applications page of Kyma console, clicking **+ Create Application** button. Enter the Name for this application and then click **Create** button to create. After the application was created successfully, then navigate to this application and click **Connect Application** to get an URL and copy it.
    2. Configuration in SAP Field Service  
        You could refer to Configuration in SAP Field Service section of [SAP Cloud Platform Extension Factory Integration](https://docs.coresystems.net/extensions-ui-plugins/cloud-platform-extension-factory-integration.html) guide.  
        **Noted**: Replace the key in step 4 of [Configuration in SAP Field Service](https://docs.coresystems.net/extensions-ui-plugins/cloud-platform-extension-factory-integration.html) section with the value you copied in step 1.

3. Setup extension-installer for kyma, please refer to [https://github.com/SAP-samples/fsm-extension-installer-kyma](https://github.com/SAP-samples/fsm-extension-installer-kyma). 
4. Open the POST **extensions** API request. Change the following information in the request body:
    1. name, description, version as you want.
    2. repository under artifactConfig/chart. The repository should be the root url of your repository which stored your deployment artifacts of your extension (make sure it is public and git based and your deployment artifacts are on the master branch). 
    3. set deployType to "HELM_CHART". 
    4. set hostingType to "KYMA". 
5. Execute the request.  
    **Request body example**
```
    {
        "lang": "en",
        "name": "demo-extension-app",
        "isActive": true,
        "description": "Demo Extension Application",
        "version": "0.0.1",
        "deploymentType": "HELM_CHART",
        "artifactConfig": {
            "chart": {
                "repository": "https://github.com/KakaWangSAP/kaka507"
            }
        },
        "icon": "https://zh.wikipedia.org/wiki/File:User_Circle.png",
        "hostingType": "KYMA"
    }
```
6. Copy the extension id from the response body.
7. Open POST **extensions deploy** API request. Replace {id} in the url with the copied extension id. Execute the request. Normally you do not need to enter request body, the extension will be installed into default namespace of KYMA. If you want to install into other namespace, enter it in request body like below:  
    **Request body example**
```
    {
        "deploymentConfig": {
            "namespace": "test-space"
        }
    }
```
8. Copy extension deployment id value from response body.
#### Option 2 Manual Deployment: Host your extension app in any place by yourself and make sure it is accessible publicly.  
1. Open the POST **extensions** API request. Change the following information in the request body and then execute the request:  
    1. name, description, version as you want.  
    2. set deployType to "MANUAL_DEPLOYMENT".  
    3. set hostingType to "CUSTOM_HOSTING".  
    **Request body example**
```
    {
        "lang": "en",
        "name": "demo-extension-app",
        "isActive": true,
        "description": "Demo Extension Application",
        "version": "0.0.1",
        "deploymentType": "MANUAL_DEPLOYMENT",
        "icon": "https://zh.wikipedia.org/wiki/File:User_Circle.png",
        "hostingType": "CUSTOM_HOSTING"
    }
```
2. Copy the extension id from the response body.
3. Open the POST **extension-deployments** API request. Replace {id} in the url with the copied extension id. Change accessUrl to the one which can access your extension app. Execute the request.  
    **Request body example**
```
    {
    	"version": "0.0.1",
    	"state": "INSTALLED",
        "accessUrl": "https://www.yourApp.com"
    }
```
4. Copy extension deployment id value from response body.
### 3. Assign and use extension.
1. Open the POST **extension-assignments** API request. Replace extensionDeploymentId value with the one you get from above step. Update target to the value where you want to use the extension. Execute the request.  
    **Request body example**
```
    {
        "targetType": "OUTLET_POSITION",
        "target": "planning-3",
        "extensionDeploymentId": "10bc2af7-27b6-4864-bf8b-282ef30a838b"
    }
```
2. Now you can login into FSM system and try to use it.
## How to manage an extension app via API calls
### Update extension app
1. Open the PUT **extensions** API request to update the artifact information of an extension. Replace {id} in the url with your extension id, and update other fields in request body. Execute the request.  
    **Request body example**
```
    {
        "lang": "en",
        "name": "demo-extension-app",
        "isActive": true,
        "description": "Demo Extension Application",
        "version": "0.0.1",
        "deploymentType": "HELM_CHART",
        "artifactConfig": {
            "chart": {
                "repository": "https://github.com/KakaWangSAP/kaka507"
            }
        },
        "icon": "https://zh.wikipedia.org/wiki/File:User_Circle.png",
        "hostingType": "KYMA"
    }
```
2. Open the PATCH **extension-deployments** API request to partial update deployment information of an extension. Replace {id} in the url with your extension deployment id, and update other fields(only version, state, accessUrl, deploymentConfig can be updated) in request body. Execute the request.  
    **Request body example**
```
    {
        "version": "0.0.2",
        "state": "UPDATED"
    }
```
### Delete extension app
1. Open DELETE **extension-assignments** API to delete the assignment information of an extension. Replace {id} in the url with your extension assignment id. Execute the request.
2. Open DELETE **extension-deployments** API to delete the deploy information of an extension. Replace {id} in the url with your extension deployment id. Execute the request.
3. Open DELETE  **extensions** API to delete an extension. Replace {id} in the url with your extension id. Execute the request.

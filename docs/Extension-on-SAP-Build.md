# Developing an Extension on SAP Build

## Prerequisites

- **You have an account on SAP Business Technology Platform (BTP):** If you don’t have an account, follow this **[tutorial](https://developers.sap.com/tutorials/hcp-create-trial-account.html)**.

- **You have a subscription to SAP Build Apps in your SAP BTP Sub-account:** If you don't have a subscription, check out this **[tutorial](https://developers.sap.com/tutorials/appgyver-subscribe-service.html)**.

## Step 1: Create a new SAP Build Project

- Start **SAP Build Apps** from the list of subscriptions in your SAP BTP sub-account:

![Create new project 1](./assets/ExtensionOnSapBuild/create-project-step1.png)

- For simplicity, we are not going to create a new project from scratch. In instead, we are providing a FSM-Extension sample template that covers some of the fundaments when developing an FSM extension. Please download it from [here](https://github.com/SAP-samples/fsm-extension-sample/blob/main/docs/assets/ExtensionOnSapBuild/FSM-Extension.zip.gpg) and save it on your computer.

- In the SAP build lobby, choose **import**:

![Create new project 2](./assets/ExtensionOnSapBuild/create-project-step2.png)

- Browse the FSM-Extension sample template from your computer and open it:

![Create new project 3](./assets/ExtensionOnSapBuild/create-project-step3.png)

- Once it has been uploaded, select it from the list and choose **import**:

![Create new project 3](./assets/ExtensionOnSapBuild/create-project-step4.png)

- It should appear in your list of projects:

![Create new project 4](./assets/ExtensionOnSapBuild/create-project-step5.png)

- Click on it to open the SAP Build editor and display the details:

![Create new project 5](./assets/ExtensionOnSapBuild/create-project-step6.png)

## Step 2: Build the project

- The FSM-Extension sample template is packed ready to be build. Choose the **launch tool** and select **Open build service**:

![Build project 1](./assets/ExtensionOnSapBuild/build-project-step1.png)

- Choose **build** for the option **Web App**:

![Build project 2](./assets/ExtensionOnSapBuild/build-project-step2.png)

- Choose File type ZIP, the available Client runtime version, enter a version, and choose **build**:

![Build project 3](./assets/ExtensionOnSapBuild/build-project-step3.png)

- Wait until the build is delivered and download the file to your computer:

![Build project 4](./assets/ExtensionOnSapBuild/build-project-step4.png)

## Step 3: Deploy and test the project

- In this tutorial, the FSM-Extension sample template is hosted locally from your computer, however, it can be deployed in SAP BTP. If you like to do so, please check this [reference](https://developers.sap.com/tutorials/cp-cf-dev-02-deploy-app.html)

- To host the FSM-Extension sample template locally, you can use [ngrok](https://ngrok.com/), [tunnelmole](https://tunnelmole.com/), or any other similar tool. For the purpose of this tutorial, we use **tunnelmole**.

- Unzip the build file you've saved in your computer and serve it. For this, we are using an extension called **Live server** in VSCode, but you can use any tool of your choice:

![Deploy and test 1](./assets/ExtensionOnSapBuild/deploy-and-test-project-step1.png)

![Deploy and test 2](./assets/ExtensionOnSapBuild/deploy-and-test-project-step2.png)

- Make the FSM-Extension sample template publicly available in the internet:

![Deploy and test 3](./assets/ExtensionOnSapBuild/deploy-and-test-project-step3.png)

![Deploy and test 4](./assets/ExtensionOnSapBuild/deploy-and-test-project-step4.png)

## Step 4: Register the FSM Extension in SAP Field Service Management

- Login to SAP Field Service Management and open the **Foundational Services** application, then navigate to **Extensions** > **Installed**, and choose **Add Extension**:

![Register extension 1](./assets/ExtensionOnSapBuild/register-extension-step1.png)

- Enter the URL of the FSM-Extension sample template and choose **Next Step**:

![Register extension 2](./assets/ExtensionOnSapBuild/register-extension-step2.png)

- Enter name, description, provider, and a version for the extension. Then, choose **Next Step**:

![Register extension 3](./assets/ExtensionOnSapBuild/register-extension-step3.png)

- Agree to the **Terms & conditions**. Then, choose **Next Step**:

![Register extension 4](./assets/ExtensionOnSapBuild/register-extension-step4.png)

- Mark the **Automatic assignments** for the extension. Then, choose **Finish**:

![Register extension 5](./assets/ExtensionOnSapBuild/register-extension-step5.png)

- While in **Extension Configuration** mode, navigate to **Planning and Dispatching > Dispatching Board** and choose **Add Extension**:

![Register extension 6](./assets/ExtensionOnSapBuild/register-extension-step6.png)

- Select the FSM-Extension sample template and choose **Add**:

![Register extension 7](./assets/ExtensionOnSapBuild/register-extension-step7.png)

- The FSM-Extension sample template should be loaded and displaying information from SAP Field Service Management:

![Register extension 8](./assets/ExtensionOnSapBuild/register-extension-step8.png)

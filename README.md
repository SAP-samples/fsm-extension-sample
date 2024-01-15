# SAP Field Service Management - Sample Extensions

[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/fsm-extension-sample)](https://api.reuse.software/info/github.com/SAP-samples/fsm-extension-sample)

This repository contains samples that demonstrate the API usage patterns for SAP Field Service Management extensions. These code samples are created to help developers start building extensions and are designed to run on any platform.

You can find more information about the SAP Field Service Management API and the extensions concept in the [SAP Field Service Management Help Portal](https://help.sap.com/viewer/product/SAP_FIELD_SERVICE_MANAGEMENT/Cloud/en-US).

## Disclaimer

Do not use the samples or parts of them in your productive code. The samples are minimal viable products that do not follow any security, performance, or quality standards. If you develop your own extension, please make sure that your extension follows security, performance, and quality standards. There will be no support if you use code from the samples in your productive environment.


## Prerequisite for Using the Samples

To run the sample extensions, you need access to SAP Field Service Management. You can find more information about getting access in the [SAP Field Service Management – SAP Help Portal](https://help.sap.com/viewer/product/SAP_FIELD_SERVICE_MANAGEMENT/Cloud/en-US).
.

## Using the Samples

### Using the Samples Locally 

The easiest way to use the samples without using Git is to download the ZIP file containing the current version. You can download the ZIP file either by using the link below or by choosing **Download ZIP** on the repository page.

[Download Samples ZIP](../../archive/master.zip)

Once you have downloaded the file, you can then unzip the entire archive and use the samples locally on your machine. Each sample also contains a README file with instruction how to setup the sample and run it locally. The README file might also include a recommended deployment strategy based on technical specificity.

### Using the Samples in the Browser or Within an Outlet

To run the extension in an outlet or browser window, you need the public URL. To receive the public URL, you can use an external solution like [ngrok](https://ngrok.com/) or [localtunnel](https://github.com/localtunnel/localtunnel). Once you have received the URL, you can manually install the extension and then run it. For more information about the installation, see [Manually Installing an Extension](https://help.sap.com/docs/SAP_FIELD_SERVICE_MANAGEMENT/fsm_extensions/install-manually.html).

## Contributions

The samples are developed by the development teams, and we welcome your input on issues and suggestions for new samples. Currently, we do not plan additional samples, but we check back as we evolve our contribution model.

## Samples by Architecture

Here is an overview of the extension samples sorted by architecture:

### Front-end

<table>
 <tr>
  <td><a href="samples/download-test-extension/">Download Test (extension attributes example)</a></td>
 </tr>
 <tr>
  <td><a href="samples/extension-starter-kit/">Extension Starter Kit</a></td>
 </tr>
 <tr>
  <td><a href="samples/parameter-showcase-extension/">Parameter Showcase</a></td>
 </tr>
 <tr>
  <td><a href="samples/service-contract/">Service Contract</a></td>
 </tr>
 <tr>
  <td><a href="samples/with-shell-navigation/">Inside Shell with Shell Navigation</a></td>
 </tr>
 <tr>
  <td><a href="samples/without-shell-navigation/">Inside Shell Without Shell Navigation</a></td>
 </tr>
 <tr>
  <td><a href="samples/outside-shell/">Outside Shell in a New Tab</a></td>
 </tr>
</table>

### Front-end and Backend

<table>
 <tr>
  <td><a href="samples/login-with-token/">Login with Token</a></td>
 </tr>
 <tr>
  <td><a href="samples/mobile-web-container/">Extension Inside Mobile Web Container </a></td>
 </tr>
</table>

### Front-end and Backend using SSO

<table>
 <tr>
  <td><a href="samples/login-with-sso/">Login with SSO</a></td>
 </tr>
</table>

## How to Get Support

If you find a bug or need support, please open an issue [here](https://github.com/SAP-samples/fsm-extension-sample/issues/new).

## License
Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](./LICENSES/Apache-2.0.txt) file.

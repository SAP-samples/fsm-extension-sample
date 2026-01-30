# test-download

Extension for testing allow-downloads sandbox policy

# Deploying to SAP BTP Cloud Foundry

If you have a SAP BTP CF account, this sample can be deployed to a CF space:

- Install the CF CLI if not yet installed <https://github.com/cloudfoundry/cli>
- In a terminal session, go to the root folder of this extension
- If not already done in a previous step, install the project's dependencies by running `npm install`.
- Build the project by running `npm run build`.
- Login to the corresponding space and org using `cf login -a <API_ENDPOINT> -o <ORG> -s <SPACE>`. You can find these values in the BTP cockpit under "Subaccount > Overview > Cloud Foundry Environment".
- Run `cf push` and `cf apps` to get the url where the sample is served.
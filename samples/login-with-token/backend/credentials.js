/**
* client_credentials will store client_id and client_secret credentials per account per cluster
* Those credentials are used to access FSM oauth API and fetch a FSM access token.
*/
const client_credentials = {};

// Load credentials from process.env defined
const {
  FSM_CLOUD_HOST, 
  FSM_ACCOUNT, 
  FSM_CLIENT_ID, 
  FSM_CLIENT_SECRET
} = process.env;

function add_configuration(cloudhost, account, configuration) {
  client_credentials[cloudhost] = {};
  client_credentials[cloudhost][account] = {
    'client_id': configuration.client_id,
    'client_secret': configuration.client_secret
  };
}

if (FSM_CLOUD_HOST && FSM_ACCOUNT && FSM_CLIENT_ID && FSM_CLIENT_SECRET) {
  add_configuration(FSM_CLOUD_HOST, FSM_ACCOUNT, {
    'client_id': FSM_CLIENT_ID,
    'client_secret': FSM_CLIENT_SECRET
  });
}

exports.add_configuration = add_configuration;
exports.client_credentials = client_credentials;
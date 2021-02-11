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

if (FSM_CLOUD_HOST && FSM_ACCOUNT && FSM_CLIENT_ID && FSM_CLIENT_SECRET) {
  client_credentials[FSM_CLOUD_HOST] = {};
  client_credentials[FSM_CLOUD_HOST][FSM_ACCOUNT] = {
    'client_id': FSM_CLIENT_ID,
    'client_secret': FSM_CLIENT_SECRET
  };
} else {
  throw new Error('Missing FSM credentials configuration (FSM_CLOUD_HOST, FSM_ACCOUNT, FSM_CLIENT_ID, or FSM_CLIENT_SECRET)');
}

exports.client_credentials = client_credentials;
/**
* client_credentials will store client_id and client_secret credentials per account per cluster
* Those credentials are used to access FSM oauth API and fetch a FSM access token.
*/
const client_credentials = {};

function add_configuration(cloudhost, account, configuration) {
  client_credentials[cloudhost] = {};
  client_credentials[cloudhost][account] = {
    'client_id': configuration.client_id,
    'client_secret': configuration.client_secret,
    'idp': {
      'clientID': configuration.idp.clientID,
      'clientSecret': configuration.idp.clientSecret,
      'authorizationURL': configuration.idp.authorizationURL,
      'tokenURL': configuration.idp.tokenURL,
      'callbackURL': configuration.idp.callbackURL
    }
  };
}

exports.add_configuration = add_configuration;
exports.client_credentials = client_credentials;
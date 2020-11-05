const Credentials = require('./credentials');
const fetch = require('node-fetch');

// Cache token per cloudhost then account to avoid fetching if not expired 
// Index tokens using the key `${cloudhost}:${account}` and store:
// {
//   access_token: string,
//   expires_in: Date,
// }
const tokens = {};

/**
 * fetchToken will request a FSM access_token to fetch the FSM api
 * Current implementation cache tokens for each `${cloudhost}:${account}` value
 * until reaching expiration date.
 **/
const fetchToken = async (cloudhost, account) => {
  const { client_credentials } = Credentials;
  if (client_credentials[cloudhost] && client_credentials[cloudhost][account]) {

    const key = `${cloudhost}:${account}`;
    if (tokens[key] && new Date() < tokens[key].expires_in) return tokens[key].access_token;

    // Fetch FSM oauth2 api to get a fsm access_token from client_credentials user
    const { client_id, client_secret } = client_credentials[cloudhost][account]; 
    const token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');
    const response = await fetch(`https://${cloudhost}/api/oauth2/v1/token`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Authorization': `Basic ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });
    const json = await response.json();

    tokens[key] = {
      access_token: json.access_token,
      expires_in: new Date(new Date().getTime() + json.expires_in * 1000)
    };
    return json.access_token;
  }
  throw new Error('Host/account is not configured. Please verify your licence and contact the extension administrator');
}

exports.fetch = fetchToken;
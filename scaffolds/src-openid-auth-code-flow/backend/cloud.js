const oauth = require('./oauth');
const fetch = require('node-fetch');

// Call FSM data api to fetch the user object based on cloudhose, account, and userid.
const queryUserObject = async (cloudhost, account, userid) => {
  const access_token = await oauth.fetch(cloudhost, account);
  const response = await fetch(`https://${cloudhost}/api/user/v1/users/${userid}?account=${account}`, {
    headers: {
      'accept': 'application/json',
      'X-Client-ID': 'fsm-extension-sample',
      'X-Client-Version': '1.0.0',
      'Authorization': `bearer ${access_token}`
    }
  });
  return await response.json();
}

exports.queryUserObject = queryUserObject;
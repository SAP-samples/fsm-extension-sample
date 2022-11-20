//
// Loop before a token expire to fetch a new one
//
function initializeRefreshTokenStrategy(shellSdk, auth) {

  shellSdk.on(SHELL_EVENTS.Version1.REQUIRE_AUTHENTICATION, (event) => {
    sessionStorage.setItem('token', event.access_token);
    setTimeout(() => fetchToken(), (event.expires_in * 1000) - 5000);
  });

  function fetchToken() {
    shellSdk.emit(SHELL_EVENTS.Version1.REQUIRE_AUTHENTICATION, {
      response_type: 'token'  // request a user token within the context
    });
  }

  sessionStorage.setItem('token', auth.access_token);
  setTimeout(() => fetchToken(), (auth.expires_in * 1000) - 5000);
}

//
// Fetch parameters for extension
//
function fetchParameters(cloudHost, accountId, companyId, extensionDeploymentId) {
  const headers = {
    'Content-Type': 'application/json',
    'X-Account-Id': `${accountId}`,
    'X-Company-Id': `${companyId}`,
    'Authorization': `bearer ${sessionStorage.getItem('token')}`,
    'access-control-request-method': 'GET',
  }

  const cluster = cloudHost.substr(0, 2);
  const parameterRequestUrl = `https://${cluster}.coresystems.net/cloud-extension-catalog-service/api/extension-catalog/v1/extension-deployments/${extensionDeploymentId}/deployment-parameters`;

  return new Promise(resolve => {
    fetch(parameterRequestUrl, { headers, cache: 'no-cache' })
      .then(async (response) => {
        const result = await response.json();
        console.log('RESULT FROM FETCH:');
        console.log(result);
        resolve(result);
      });
  });
}

// 
// Update info with provided text
//
const showInfoText = (text) => (document.querySelectorAll('#info')[0].innerText = text);

//
// Display Table with loaded parameters
//
const showLoadedParameters = (parameters) => {
  const tbody = document.getElementById('tableBody');
  let tableRows = '';

  parameters.forEach(param => {
    tableRows += `
      <tr class="fd-table__row">
        <td class="fd-table__cell">${param.name}</td>
        <td class="fd-table__cell">${param.value}</td>
      </tr>
    `;
  });

  tbody.innerHTML = tableRows;
}

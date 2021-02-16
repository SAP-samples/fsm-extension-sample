// 
// Update html dom with provided string value
//
const updateUI = (text) =>
  (document.querySelectorAll('#info')[0].innerText = text);

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
// Request context with activity ID to return serviceContract assigned
//
function getServiceContract(cloudHost, account, company, activity_id) {
  
  const headers = {
    'Content-Type': 'application/json',
    'X-Client-ID': 'fsm-extension-sample',
    'X-Client-Version': '1.0.0',
    'Authorization': `bearer ${sessionStorage.getItem('token')}`,
  };

  return new Promise(resolve => {

    // Fetch Activity object
    fetch(`https://${cloudHost}/api/data/v4/Activity/${activity_id}?dtos=Activity.37&account=${account}&company=${company}`, {
      headers
      })
        .then(response => response.json())
        .then(function(json) {

          const activity = json.data[0].activity;
          // Fetch all ServiceContractEquipment
          fetch(`https://${cloudHost}/api/data/v4/ServiceContractEquipment?dtos=ServiceContractEquipment.12&account=${account}&company=${company}`, {
            headers
            })
              .then(response => response.json())
              .then(function(json) {

                const serviceContractEquipment = json.data.find(contract => contract.serviceContractEquipment.equipment === activity.equipment);
                if (!serviceContractEquipment) {
                  resolve(null);
                } else {
                  fetch(`https://${cloudHost}/api/data/v4/ServiceContract/${serviceContractEquipment.serviceContractEquipment.serviceContract}?dtos=ServiceContract.13&account=${account}&company=${company}`, {
                    headers
                    })
                      .then(response => response.json())
                      .then(function(json) {
                        resolve(json.data[0].serviceContract);
                      });
                }

              });

        });

  });
}


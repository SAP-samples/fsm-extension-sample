import { ExtensionController } from './extension.controller';

const updateUI = (text: string) => {
  const element = document.getElementById("info");
  if (element) {
    element.innerHTML = text;
  }
};

const appendTokenToUI = (token: string) => {
  const element = document.getElementById("info");
  if (element) {
    const currentContent = element.innerHTML;
    const separator = currentContent ? '<hr>' : '';
    const timestamp = new Date().toLocaleString();
    element.innerHTML = currentContent + separator + 
      `<div><strong>${timestamp}</strong></div><pre class="token-display">${token}</pre>`;
  }
};

window.addEventListener('load', () => {
  const extensionController = ExtensionController.getInstance();
  
  // Display Shell SDK version
  const versionElement = document.getElementById('shell-version');
  if (versionElement) {
    versionElement.textContent = extensionController.getShellSdkVersion();
  }

  // Check if running inside FSM Shell
  if (!extensionController.isInsideShell()) {
    updateUI('This extension is supposed to be run inside the FSM Shell.');
    return;
  }  
  
  // Subscribe to auth stream and display token accumulation
  const authTokenStream = extensionController.subscribeToAuth((auth) => {
    if (auth) {
      const tokenInfo = JSON.stringify(auth, null, 2);
      appendTokenToUI(tokenInfo);
    }
  });

  window.addEventListener('pagehide', () => {
    if (authTokenStream) {
      authTokenStream(); // Unsubscribe from auth stream on page hide
    }
  });
});

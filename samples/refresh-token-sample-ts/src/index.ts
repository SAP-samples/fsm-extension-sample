import { ShellSdkService } from './util/shell-sdk.service';

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

const updateErrorUI = (message: string | null) => {
  const element = document.getElementById("error-info");
  if (element) {
    element.innerHTML = message ? `<strong>Error:</strong> ${message}` : '';
  }
};

window.addEventListener('load', () => {
  const shellSdkService = ShellSdkService.getInstance();

  // Display Shell SDK version
  const versionElement = document.getElementById('shell-version');
  if (versionElement) {
    versionElement.textContent = shellSdkService.getVersion();
  }

  // Check if running inside FSM Shell
  if (!shellSdkService.isInsideShell()) {
    updateUI('This extension is supposed to be run inside the FSM Shell.');
    return;
  }

  // Subscribe to error stream and display error messages to the user
  const errorStream = shellSdkService.subscribeToError((message) => {
    updateErrorUI(message);
  });

  // Subscribe to auth stream and display token accumulation
  const authTokenStream = shellSdkService.subscribeToAuth((auth) => {
    if (auth) {
      const tokenInfo = JSON.stringify(auth, null, 2);
      appendTokenToUI(tokenInfo);
    }
  });

  window.addEventListener('pagehide', () => {
    if (authTokenStream) {
      authTokenStream(); // Unsubscribe from auth stream on page hide
    }
    if (errorStream) {
      errorStream(); // Unsubscribe from error stream on page hide
    }
  });
});

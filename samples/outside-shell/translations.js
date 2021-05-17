// Return translations based on the provided language key
function getTranslation(lang) {
  const TRANSLATIONS = {
    en: {
      'header-title': 'Extension outside Shell',
      'content-text': 'This is the extension\'s content.',
      'content-title': 'Sample extension outside Shell in a new tab',
    },
    de: {
      'header-title': 'Erweiterung außerhalb der Shell',
      'content-text': 'Das ist der Inhalt der Erweiterung.',
      'content-title': 'Beispielerweiterung außerhalb der Shell in einem neuen Tab',
    }
  }
  if (Object.keys(TRANSLATIONS).indexOf(lang) !== -1) {
    return TRANSLATIONS[lang];
  } else {
    return TRANSLATIONS[en];
  }
}

// Translate based on translations for the provided language key 
function translate(lang) {
  const I18N = getTranslation(lang);

  for (const [key, value] of Object.entries(I18N)) {
    document.getElementById(`${key}`).innerHTML = `${value}`;
  }
}


// Update translations in case a different language has been selected from the language drop-down list
function newLanguageSelected() {
  const NEW_SELECTED_LANG = document.getElementById('language-select').value;
  translate(NEW_SELECTED_LANG);
}

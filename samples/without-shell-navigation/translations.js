// Supported languages besides English
const SUPPORTED_LOCALES = [
  {
    code: 'de'
  },
  {
    code: 'de-ch',
    language: 'de'
  }
];

// Default language
const DEFAULT_LOCALE = {
  code: 'en'
};

// Return translations based on the provided language key
function getTranslation(lang) {
  const TRANSLATIONS = {
    en: {
      'extension-title': 'Extension without Shell navigation',
      'first-level-1-text': 'This is the page from the side navigation entry "First Level 1".',
      'first-level-1-title': 'First Level 1',
      'first-level-2-second-level-1-text': 'This is the page from the side navigation entry "Second Level 1".',
      'first-level-2-second-level-1-title': 'Second Level 1',
      'first-level-2-second-level-2-third-level-1-text': 'This is the page from the side navigation entry "Third Level 1".',
      'first-level-2-second-level-2-third-level-1-title': 'Third Level 1',
      'not-found-text': 'Page has not been found.',
      'not-found-title': 'Not Found',
      'side-first-level-1-title': 'First Level 1',
      'side-first-level-2-title': 'First Level 2',
      'side-first-level-2-side-second-level-1-title': 'Second Level 1',
      'side-first-level-2-side-second-level-2-title': 'Second Level 2',
      'side-first-level-2-side-second-level-2-side-third-level-1-title': 'Third Level 1',
    },
    de: {
      'extension-title': 'Erweiterung ohne Shell Navigation',
      'first-level-1-text': 'Das ist die Seite von dem Navigationseintrag "Erstes Level 1".',
      'first-level-1-title': 'Erstes Level 1',
      'first-level-2-second-level-1-text': 'Das ist die Seite von dem Navigationseintrag "Zweites Level 1".',
      'first-level-2-second-level-1-title': 'Zweites Level 1',
      'first-level-2-second-level-2-third-level-1-text': 'Das ist die Seite von dem Navigationseintrag "Drittes Level 1".',
      'first-level-2-second-level-2-third-level-1-title': 'Dittes Level 1',
      'not-found-text': 'Die Seite konnte nicht gefunden werden.',
      'not-found-title': 'Nicht gefunden',
      'side-first-level-1-title': 'Erstes Level 1',
      'side-first-level-2-title': 'Erstes Level 2',
      'side-first-level-2-side-second-level-1-title': 'Zweites Level 1',
      'side-first-level-2-side-second-level-2-title': 'Zweites Level 2',
      'side-first-level-2-side-second-level-2-side-third-level-1-title': 'Dittes Level 1'
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

// Determine language based on Shell locale
function getLanguageByLocale(currentLocale) {
  const LANGUAGE = SUPPORTED_LOCALES.find(supportedLocale => {
    try {
      return supportedLocale.code === currentLocale.toLowerCase();
    } catch {
      return false;
    }
  });

  if (LANGUAGE !== undefined) {
    return LANGUAGE;
  }

  // In case the current Shell language is not supported by the extension, return default language.
  return DEFAULT_LOCALE;
}

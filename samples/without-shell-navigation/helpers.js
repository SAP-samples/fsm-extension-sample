// Available routes 
const ROUTES = [
  { path: '/first-level-1', id: 'first-level-1' },
  { path: '/first-level-2/second-level-1', id: 'first-level-2-second-level-1' },
  { path: '/first-level-2/second-level-2/third-level-1', id: 'first-level-2-second-level-2-third-level-1' }
];

// Convert relative path stored inside location to a relative path stored inside ROUTES
// Convert "" to "/", convert "#/" to "/", convert "#/first-level-1" to "/first-level-1", ...
const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';

// Determine ID of the section, which should be visible
function determineSectionID(path, routes) {
  const CURRENT_ROUTE = routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

  if (CURRENT_ROUTE !== undefined) {
    return CURRENT_ROUTE.id;
  }

  // In case route is unknown, ID for the "Not Found" section is returned
  return 'section-not-found';
}   

// Router function, which makes sure that based on the new route the respective section is shown and the old section is hidden
// Router function also takes care of selecting the new respective side navigation entry and deselecting the old side navigation entry  
const router = () => {
  const PATH = parseLocation();

  if (PATH === '/') {
    // Rerouting in case of "/" to /#/first-level-1
    window.location.href = window.location.origin + '/#/first-level-1';
  } else {
    const SECTION_ID = determineSectionID(PATH, ROUTES); // Determine ID of the section, which belongs to the new route
    const MAIN_SECTION = document.getElementById('extension-main');
    const SHOWN_SECTIONS = MAIN_SECTION.getElementsByClassName('section-shown'); // Determine current (old) visible sections (0 or 1)

    // Hide current visible sections 
    for (i = 0; i < SHOWN_SECTIONS.length; i++) {
      SHOWN_SECTIONS[i].classList.add('section-hidden');
      SHOWN_SECTIONS[i].classList.remove('section-shown');
    }

    // Show section, which belongs to the new route
    document.getElementById(SECTION_ID).classList.add('section-shown');
    document.getElementById(SECTION_ID).classList.remove('section-hidden');

    // Deselect side navigation entry, which belongs to the old visible section
    deselectAllSideNavEntries(); 

    // Select side navigation entry, which belongs to the new visible section
    if (SECTION_ID == 'first-level-1') {
      document.getElementById('side-first-level-1').classList.add('is-selected');
    } else if (SECTION_ID == 'first-level-2-second-level-1') {
      document.getElementById('side-first-level-2-side-second-level-1').classList.add('is-selected');

      // In case of the second level side navigation entry 'side-first-level-2-side-second-level-1',
      // in addition open the respective sub menu SUB1
      openSubMenu('SUB1', 'side-first-level-2-button');
    } else if (SECTION_ID == 'first-level-2-second-level-2-third-level-1') {
      document.getElementById('side-first-level-2-side-second-level-2-side-third-level-1').classList.add('is-selected');

      // In case of the third level side navigation entry 'side-first-level-2-side-second-level-2-side-third-level-1',
      // in addition open the respective sub menus SUB1 and SUB1-1
      openSubMenu('SUB1', 'side-first-level-2-button');
      openSubMenu('SUB1-1', 'side-first-level-2-side-second-level-2-button');
    }
  }
};

// Open sub menu from a side navigation entry
function openSubMenu(subMenuId, buttonId) {
  document.getElementById(subMenuId).setAttribute('aria-hidden', 'false');
  const BUTTON = document.getElementById(buttonId);
  BUTTON.setAttribute('aria-expanded', 'true');
  BUTTON.querySelector('i[role]').setAttribute('class', 'sap-icon--navigation-down-arrow');
}

// Register router function for route change events
window.addEventListener('hashchange', router);
window.addEventListener('load', router);

// Expande/Collapse sub menu of structural navigation entries like 'Actions'
function toggleNestedListSubMenu(event){
  const BUTTON = event.currentTarget;
  const SUBLIST_ID = BUTTON.getAttribute('aria-controls');
  const IS_EXPANDED = BUTTON.getAttribute('aria-expanded');

  if (IS_EXPANDED === 'true') {
    document.getElementById(SUBLIST_ID).setAttribute('aria-hidden', 'true');
    BUTTON.setAttribute('aria-expanded', 'false');
    BUTTON.querySelector('i[role]').setAttribute('class', 'sap-icon--navigation-right-arrow');
  } else {
    document.getElementById(SUBLIST_ID).setAttribute('aria-hidden', 'false');
    BUTTON.setAttribute('aria-expanded', 'true');
    BUTTON.querySelector('i[role]').setAttribute('class', 'sap-icon--navigation-down-arrow');
  }
}

// Deselect current selected side navigation entry (0 or 1)
function deselectAllSideNavEntries() {
  const SIDE_NAV = document.getElementById('side-nav');
  const SELECTED_ENTRIES = SIDE_NAV.getElementsByClassName('is-selected');
  
  for (i = 0; i < SELECTED_ENTRIES.length; i++) {
    SELECTED_ENTRIES[i].classList.remove('is-selected');
  }
}

// Return translations based on the provided language key
function getTranslation(lang) {
  const TRANSLATIONS = {
    en: {
      'EXTENSION_TITLE': 'Extension without Shell navigation',
      'FIRST_LEVEL_1_TEXT': 'This is the page from the side navigation entry "First Level 1".',
      'FIRST_LEVEL_1_TITLE': 'First Level 1',
      'NOT_FOUND_TITLE': 'Not Found',
      'NOT_FOUND_TEXT': 'Page has not been found.',
      'FIRST_LEVEL_2_SECOND_LEVEL_1_TEXT': 'This is the page from the side navigation entry "Second Level 1".',
      'FIRST_LEVEL_2_SECOND_LEVEL_1_TITLE': 'Second Level 1',
      'SIDE_FIRST_LEVEL_1_TITLE': 'First Level 1',
      'SIDE_FIRST_LEVEL_2_TITLE': 'First Level 2',
      'SIDE_FIRST_LEVEL_2_SIDE_SECOND_LEVEL_1_TITLE': 'Second Level 1',
      'SIDE_FIRST_LEVEL_2_SIDE_SECOND_LEVEL_2_TITLE': 'Second Level 2',
      'SIDE_FIRST_LEVEL_2_SIDE_SECOND_LEVEL_2_SIDE_THIRD_LEVEL_1_TITLE': 'Third Level 1',
      'SECOND_LEVEL_2_FIRST_LEVEL_2_THIRD_LEVEL_1_TITLE': 'Third Level 1',
      'SECOND_LEVEL_2_FIRST_LEVEL_2_THIRD_LEVEL_1_TEXT': 'This is the page from the side navigation entry "Third Level 1".'
    },
    de: {
      'EXTENSION_TITLE': 'Erweiterung ohne Shell Navigation',
      'FIRST_LEVEL_1_TEXT': 'Das ist die Seite von dem Navigationseintrag "Erstes Level 1".',
      'FIRST_LEVEL_1_TITLE': 'Erstes Level 1',
      'NOT_FOUND_TEXT': 'Die Seite konnte nicht gefunden werden.',
      'NOT_FOUND_TITLE': 'Nicht gefunden',
      'FIRST_LEVEL_2_SECOND_LEVEL_1_TEXT': 'Das ist die Seite von dem Navigationseintrag "Zweites Level 1".',
      'FIRST_LEVEL_2_SECOND_LEVEL_1_TITLE': 'Zweites Level 1',
      'SIDE_FIRST_LEVEL_1_TITLE': 'Erstes Level 1',
      'SIDE_FIRST_LEVEL_2_TITLE': 'Erstes Level 2',
      'SIDE_FIRST_LEVEL_2_SIDE_SECOND_LEVEL_1_TITLE': 'Zweites Level 1',
      'SIDE_FIRST_LEVEL_2_SIDE_SECOND_LEVEL_2_TITLE': 'Zweites Level 2',
      'SIDE_FIRST_LEVEL_2_SIDE_SECOND_LEVEL_2_SIDE_THIRD_LEVEL_1_TITLE': 'Dittes Level 1',
      'SECOND_LEVEL_2_FIRST_LEVEL_2_THIRD_LEVEL_1_TITLE': 'Dittes Level 1',
      'SECOND_LEVEL_2_FIRST_LEVEL_2_THIRD_LEVEL_1_TEXT': 'Das ist die Seite von dem Navigationseintrag "Drittes Level 1".'
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

  document.getElementById('extension-title').innerHTML = I18N.EXTENSION_TITLE;
  document.getElementById('first-level-1-text').innerHTML = I18N.FIRST_LEVEL_1_TEXT;
  document.getElementById('first-level-1-title').innerHTML = I18N.FIRST_LEVEL_1_TITLE;
  document.getElementById('not-found-title').innerHTML = I18N.NOT_FOUND_TITLE;
  document.getElementById('not-found-text').innerHTML = I18N.NOT_FOUND_TEXT;
  document.getElementById('first-level-2-second-level-1-text').innerHTML = I18N.FIRST_LEVEL_2_SECOND_LEVEL_1_TEXT;
  document.getElementById('first-level-2-second-level-1-title').innerHTML = I18N.FIRST_LEVEL_2_SECOND_LEVEL_1_TITLE;
  document.getElementById('side-first-level-1-title').innerHTML = I18N.SIDE_FIRST_LEVEL_1_TITLE;
  document.getElementById('side-first-level-2-title').innerHTML = I18N.SIDE_FIRST_LEVEL_2_TITLE;
  document.getElementById('side-first-level-2-side-second-level-1-title').innerHTML = I18N.SIDE_FIRST_LEVEL_2_SIDE_SECOND_LEVEL_1_TITLE;
  document.getElementById('side-first-level-2-side-second-level-2-title').innerHTML = I18N.SIDE_FIRST_LEVEL_2_SIDE_SECOND_LEVEL_2_TITLE;
  document.getElementById('side-first-level-2-side-second-level-2-side-third-level-1-title').innerHTML = I18N.SIDE_FIRST_LEVEL_2_SIDE_SECOND_LEVEL_2_SIDE_THIRD_LEVEL_1_TITLE;
  document.getElementById('first-level-2-second-level-2-third-level-1-text').innerHTML = I18N.SECOND_LEVEL_2_FIRST_LEVEL_2_THIRD_LEVEL_1_TEXT;
  document.getElementById('first-level-2-second-level-2-third-level-1-title').innerHTML = I18N.SECOND_LEVEL_2_FIRST_LEVEL_2_THIRD_LEVEL_1_TITLE;
}


// Update translations in case a different language has been selected from the language drop-down list
function newLanguageSelected() {
  const NEW_SELECTED_LANG = document.getElementById('language-select').value;
  translate(NEW_SELECTED_LANG);
}

// Hide top bar from the extension (required in case extension runs inside the Shell)
function hideTopBar() {
  document.getElementById('top-bar').style.display = 'none';
}


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

// Available routes 
const ROUTES = [
  { path: '/', id: 'section-home' },
  { path: '/actions/edit', id: 'section-actions-edit' }
];

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

const router = () => {
  const PATH = parseLocation();
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
  if (SECTION_ID == 'section-home') {
    document.getElementById('side-home').classList.add('is-selected');
  } else if (SECTION_ID == 'section-actions-edit') {
    document.getElementById('side-edit').classList.add('is-selected');

    // In case of the second level side navigation entry 'edit', in addition open the respective sub menu 
    document.getElementById('SUB1').setAttribute('aria-hidden', 'false');
    const BUTTON = document.getElementById('side-actions-button');
    BUTTON.setAttribute('aria-expanded', 'true');
    BUTTON.querySelector('i[role]').setAttribute('class', 'sap-icon--navigation-down-arrow');
  }
};

// Register router function for route change events
window.addEventListener('hashchange', router);
window.addEventListener('load', router);

// Expande/Collapse sub menu of structural navigation entries like 'Actions'
function toggleNestedListSubmenu(event){
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
      'EDIT_TITLE': 'Actions - Edit',
      'EDIT_TEXT': 'This is the page for editing actions.',
      'EXTENSION_TITLE': 'Extension with Shell navigation',
      'HOME_TITLE': 'Home',
      'HOME_TEXT': 'This is the starting page.',
      'LINK_TO_EDIT_TEXT': 'Internal link to page "Actions - Edit"',
      'LINK_TO_HOME_TEXT': 'Internal link to page "Home"',
      'NOT_FOUND_TITLE': 'Not Found',
      'NOT_FOUND_TEXT': 'Page has not been found.',
      'SIDE_HOME_TITLE': 'Home',
      'SIDE_ACTIONS_TITLE': 'Actions',
      'SIDE_EDIT_TITLE': 'Edit'
    },
    de: {
      'EDIT_TITLE': 'Aktionen - Editieren',
      'EDIT_TEXT': 'Das ist die Seite zum Editieren von Aktionen.',
      'EXTENSION_TITLE': 'Erweiterung mit Shell Navigation',
      'HOME_TITLE': 'Startseite',
      'HOME_TEXT': 'Das ist die Startseite.',
      'LINK_TO_EDIT_TEXT': 'Interner Link zur Seite "Aktionen - Editieren"',
      'LINK_TO_HOME_TEXT': 'Interner Link zur "Startseite"',
      'NOT_FOUND_TITLE': 'Nicht gefunden',
      'NOT_FOUND_TEXT': 'Die Seite konnte nicht gefunden werden.',
      'SIDE_HOME_TITLE': 'Startseite',
      'SIDE_ACTIONS_TITLE': 'Aktionen',
      'SIDE_EDIT_TITLE': 'Editieren'
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

  document.getElementById('actions-edit-title').innerHTML = I18N.EDIT_TITLE;
  document.getElementById('actions-edit-text').innerHTML = I18N.EDIT_TEXT;
  document.getElementById('extension-title').innerHTML = I18N.EXTENSION_TITLE;
  document.getElementById('home-title').innerHTML = I18N.HOME_TITLE;
  document.getElementById('home-text').innerHTML = I18N.HOME_TEXT;
  document.getElementById('link-to-edit-text').innerHTML = I18N.LINK_TO_EDIT_TEXT;
  document.getElementById('link-to-home-text').innerHTML = I18N.LINK_TO_HOME_TEXT;
  document.getElementById('not-found-title').innerHTML = I18N.NOT_FOUND_TITLE;
  document.getElementById('not-found-text').innerHTML = I18N.NOT_FOUND_TEXT;
  document.getElementById('side-home-title').innerHTML = I18N.SIDE_HOME_TITLE;
  document.getElementById('side-actions-title').innerHTML = I18N.SIDE_ACTIONS_TITLE;
  document.getElementById('side-edit-title').innerHTML = I18N.SIDE_EDIT_TITLE;
}


function newLanguageSelected() {
  const NEW_SELECTED_LANG = document.getElementById('language-select').value;
  translate(NEW_SELECTED_LANG);
}

// Hide side navigation and top bar from the extension (required in case extension runs inside the Shell)
function hideSideNavAndTopBar() {
  document.getElementById('top-bar').style.display = 'none';
  document.getElementById('side-nav').style.display = 'none';
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

// In case extension runs inside Shell and there is an internal navigation, update Luigi inside Shell
function syncWithLuigi(path) {
  if (ShellSdk.isInsideShell()) {
    LuigiClient.linkManager().withoutSync().fromClosestContext().navigate(path);
  }
}
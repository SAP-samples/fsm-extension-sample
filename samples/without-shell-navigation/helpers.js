// Open sub menu from a side navigation entry
function openSubMenu(subMenuId, buttonId) {
  document.getElementById(subMenuId).setAttribute('aria-hidden', 'false');
  const BUTTON = document.getElementById(buttonId);
  BUTTON.setAttribute('aria-expanded', 'true');
  BUTTON.querySelector('i[role]').setAttribute('class', 'sap-icon--navigation-down-arrow');
}

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

// Hide top bar from the extension (required in case extension runs inside the Shell)
function hideTopBar() {
  document.getElementById('top-bar').style.display = 'none';
}

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
    window.location.href = window.location.origin + window.location.pathname + '#/first-level-1';
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

// Register router function for route change events
window.addEventListener('hashchange', router);
window.addEventListener('load', router);

const PRIMARY_HEADER = document.getElementById('primary_header');
const MENU_BTN = document.getElementById('menu_btn');
const PRIMARY_NAV = document.getElementById('primary_nav');
const NAV_LIST = document.getElementById('nav_list');
const NAV_SOCIAL = document.getElementById('nav_social');
const TAB_LIST = document.querySelector('.tablist');
const TABS = document.querySelectorAll('.tab');

// stop annoying animation during resize
(function () {
  const classes = document.body.classList;
  let timer = 0;
  window.addEventListener('resize', function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    } else classes.add('stop-transitions');

    timer = setTimeout(() => {
      classes.remove('stop-transitions');
      timer = null;
    }, 100);
  });
})();

const ACCORDION_BTN = document.querySelectorAll('.accordion-btn');
const ACCORDION_PANEL = document.querySelectorAll('.accordion__panel');
ACCORDION_PANEL.forEach((panel) => {
  panel.classList.remove('default-open');
});
ACCORDION_BTN.forEach((accButton) => {
  accButton.addEventListener('click', () => {
    togglePanel(accButton, false);
  });
  accButton.addEventListener('keyup', ({ key }) => {
    key === 'Enter' || key === ' ' ? togglePanel(accButton, false) : '';
  });
});

function togglePanel(accButton, closeCurrentOpen) {
  let currentOpenPanel = document.getElementsByClassName('open')[0];
  const targetPanelId = accButton.getAttribute('aria-controls');
  const targetPanel = document.getElementById(targetPanelId);
  const isOpen = targetPanel.classList.contains('open');
  const panelContent = targetPanel.children[1];
  // if true close last opened panel if one is open
  currentOpenPanel && closeCurrentOpen ? currentOpenPanel.classList.remove('open') : '';
  targetPanel.classList.toggle('open');
  accButton.setAttribute('aria-expanded', !isOpen);
  panelContent.setAttribute('aria-hidden', isOpen);
}

// set up tabs
TABS.forEach((tab, index) => {
  let tabPanelID = tab.getAttribute('href').split('#')[1];
  let tabPanel = document.getElementById(tabPanelID);
  tabPanel.setAttribute('role', 'tabpanel');
  tab.setAttribute('aria-controls', tabPanelID);
  if (index === 0) {
    toggleTab(tab, true);
    animateIndicator(tab);
  } else {
    toggleTab(tab, false);
  }
});

TAB_LIST.addEventListener('keydown', (e) => {
  const allowedKeys = ['ArrowRight', 'ArrowLeft', 'End', 'Home'];
  if (allowedKeys.includes(e.key)) {
    let currentActiveTab = e.target;
    let { nextTabName, outOfRangeValue } = getOptions(e);
    let nextTab = e.target.parentElement[nextTabName]?.firstElementChild;
    toggleTab(currentActiveTab, false);
    nextTab ? (currentActiveTab = nextTab) : (currentActiveTab = TABS[outOfRangeValue]);
    currentActiveTab.focus();
    toggleTab(currentActiveTab, true);
    animateIndicator(currentActiveTab);
  }
});

TAB_LIST.addEventListener('click', (e) => {
  let tabClicked = e.target;
  if (tabClicked.tagName != 'A') return;
  e.preventDefault();
  animateIndicator(tabClicked);
  TAB_LIST.querySelectorAll('li > a').forEach((tab) => {
    if (tabClicked === tab) {
      toggleTab(tab, true);
    } else {
      toggleTab(tab, false);
    }
  });
});

/**
 * @param  {string} key key pressed
 */
function getOptions(e) {
  switch (e.key) {
    case 'ArrowRight':
      return { nextTabName: 'nextElementSibling', outOfRangeValue: 0 };
    case 'ArrowLeft':
      return { nextTabName: 'previousElementSibling', outOfRangeValue: TABS.length - 1 };
    case 'End':
      e.preventDefault();
      return { nextTabName: undefined, outOfRangeValue: TABS.length - 1 };
    case 'Home':
      e.preventDefault();
      return { nextTabName: undefined, outOfRangeValue: 0 };
  }
}

/**
 * @param  {object} tab the tab element
 * @param  {boolean} toggle false deactivates tab, true activates tab
 */
function toggleTab(tab, toggle) {
  let tabPanelID = tab.getAttribute('href').split('#')[1];
  let targetPanel = document.getElementById(tabPanelID);
  tab.setAttribute('aria-selected', toggle);
  targetPanel.setAttribute('aria-hidden', !toggle);
  tab.setAttribute('tabindex', toggle ? 0 : -1);
  targetPanel.setAttribute('tabindex', toggle ? 0 : -1);
  // get that see more button
  targetPanel.querySelector('a').setAttribute('tabindex', toggle ? 0 : -1);
}

function animateIndicator(targetedTab) {
  let targetedTabWidth = getComputedStyle(targetedTab).width;
  let targetedTabHeight = getComputedStyle(targetedTab).height;
  let elementDistanceFromLeft = targetedTab.offsetLeft;
  let elementDistanceFromTop = targetedTab.offsetTop;
  console.log(elementDistanceFromTop + Number(targetedTabHeight.split('px')[0]));
  TAB_LIST.style = `--_indicator-width: ${targetedTabWidth}; --_left-pos: ${elementDistanceFromLeft}px; --_top-pos: ${elementDistanceFromTop + Number(targetedTabHeight.split('px')[0])}px;`;
}

MENU_BTN.addEventListener('click', () => {
  PRIMARY_NAV.classList.toggle('nav--open');
  let open = !PRIMARY_NAV.classList.contains('nav--open');
  NAV_LIST.setAttribute('aria-hidden', open);
  NAV_SOCIAL.setAttribute('aria-hidden', open);
});

// adding shadow on header when scrolling
const scrollObserverDiv = document.createElement('div');
scrollObserverDiv.setAttribute('data-scroll-observer', '');
// insert scroll observer div after primary header
document.body.insertBefore(scrollObserverDiv, PRIMARY_HEADER);
//
const options = {
  root: null,
  rootMargin: '100px 0px',
  threshold: 1.0,
};

let observer = new IntersectionObserver((entries, observer) => {
  let isIntersecting = entries[0].isIntersecting;
  PRIMARY_HEADER.classList.toggle('scroll-is-triggered', !isIntersecting);
}, options);

observer.observe(scrollObserverDiv);

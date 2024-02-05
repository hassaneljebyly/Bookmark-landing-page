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
// set up tabs
TABS.forEach((tab, index) => {
  let tabPanelID = tab.getAttribute('href').split('#')[1];
  tab.setAttribute('aria-controls', tabPanelID);
  if (index === 0) {
    toggleTab(tab, true);
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
    if (nextTab) {
      nextTab.focus();
      toggleTab(nextTab, true);
    } else {
      TABS[outOfRangeValue].focus();
      toggleTab(TABS[outOfRangeValue], true);
    }
  }
});

TAB_LIST.addEventListener('click', (e) => {
  let tabClicked = e.target;
  if (tabClicked.tagName != 'A') return;
  e.preventDefault();
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

MENU_BTN.addEventListener('click', () => {
  PRIMARY_NAV.classList.toggle('nav--open');
  let open = !PRIMARY_NAV.classList.contains('nav--open');
  console.log(open);
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

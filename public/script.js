const PRIMARY_HEADER = document.getElementById('primary_header');
const MENU_BTN = document.getElementById('menu_btn');
const PRIMARY_NAV = document.getElementById('primary_nav');
const NAV_LIST = document.getElementById('nav_list');
const NAV_SOCIAL = document.getElementById('nav_social');

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

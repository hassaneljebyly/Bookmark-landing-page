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

const MENU_BTN = document.getElementById('menu_btn');
const PRIMARY_NAV = document.getElementById('primary_nav');
const NAV_LIST = document.getElementById('nav_list');
const NAV_SOCIAL = document.getElementById('nav_social');

MENU_BTN.addEventListener('click', () => {
  PRIMARY_NAV.classList.toggle('nav--open');
  let open = !PRIMARY_NAV.classList.contains('nav--open');
  console.log(open);
  NAV_LIST.setAttribute('aria-hidden', open);
  NAV_SOCIAL.setAttribute('aria-hidden', open);
});

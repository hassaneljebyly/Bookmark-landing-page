const toggleMenuBtn = document.getElementById('toggle-menu-btn');
const mainNav = document.getElementsByClassName('main-nav')[0];

toggleMenuBtn.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

const buttons = Array.from(document.getElementsByClassName('button'));

const toggleMenuBtn = document.getElementById('toggle-menu-btn');
const mainNav = document.getElementsByClassName('main-nav')[0];

toggleMenuBtn.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);
    const targetedButton = window.getComputedStyle(e.target);
    const clickAnimationDuration = Number(targetedButton.getPropertyValue('--click-animation-duration').replace('ms', ''));
    e.target.classList.add('button--clicked');
    button.style = `--top:${y}px;--left:${x}px;`;
    setTimeout(() => {
      e.target.classList.remove('button--clicked');
    }, clickAnimationDuration);
  });
});

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); }
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
nav.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); toggle.focus(); } });

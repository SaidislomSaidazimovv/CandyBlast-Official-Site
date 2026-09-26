const menuButton = document.querySelector('[data-menu-button]');
const navigation = document.querySelector('[data-nav]');

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  navigation.classList.remove('is-open');
}

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  navigation.classList.toggle('is-open', open);
});
navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => {
  if (!navigation?.contains(event.target) && !menuButton?.contains(event.target)) closeMenu();
});

const worlds = {
  berry: { image: 'images/worlds/berry-meadow.webp', title: 'Berry Meadow', chapter: 'CHAPTER 01', alt: 'Berry Meadow with fruit trees, candy hills and a winding path' },
  mint: { image: 'images/worlds/mintwood.webp', title: 'Mintwood', chapter: 'CHAPTER 02', alt: 'Mintwood forest with glowing trees and waterfalls' },
  caramel: { image: 'images/worlds/caramel-peaks.webp', title: 'Caramel Peaks', chapter: 'CHAPTER 03', alt: 'Caramel Peaks with golden cliffs and waterfalls' },
  sundae: { image: 'images/worlds/sundae-harbour.webp', title: 'Sundae Harbour', chapter: 'CHAPTER 04', alt: 'Sundae Harbour with turquoise water and candy islands' }
};
const worldTabs = [...document.querySelectorAll('[data-world]')];
const worldPanel = document.querySelector('#world-panel');
const worldImage = document.querySelector('[data-world-image]');
const worldTitle = document.querySelector('[data-world-title]');
const worldChapter = document.querySelector('[data-world-chapter]');

function selectWorld(tab, focus = false) {
  const world = worlds[tab.dataset.world];
  if (!world || !worldPanel || !worldImage) return;
  worldTabs.forEach(item => {
    const active = item === tab;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
  });
  worldImage.src = world.image;
  worldImage.alt = world.alt;
  worldTitle.textContent = world.title;
  worldChapter.textContent = world.chapter;
  worldPanel.setAttribute('aria-labelledby', tab.id);
  if (focus) tab.focus();
}

worldTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectWorld(tab));
  tab.addEventListener('keydown', event => {
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % worldTabs.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + worldTabs.length) % worldTabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = worldTabs.length - 1;
    else return;
    event.preventDefault();
    selectWorld(worldTabs[next], true);
  });
});

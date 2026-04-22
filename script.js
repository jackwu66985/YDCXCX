const app = document.getElementById('appContent');
const pageTitle = document.getElementById('pageTitle');
const backBtn = document.getElementById('backBtn');
const tabs = [...document.querySelectorAll('.tab')];

const routes = {
  home: { title: '首页', tpl: 'homeTpl', tab: 'home' },
  portfolio: { title: '作品档案', tpl: 'portfolioTpl', tab: 'portfolio' },
  detail: { title: '垂直阅读舱', tpl: 'detailTpl', tab: 'portfolio' },
  'smart-home-board': { title: '智能家居中心展板', tpl: 'smartHomeBoardTpl', tab: 'portfolio' },
  'furniture-board': { title: '可持续家具展板', tpl: 'furnitureBoardTpl', tab: 'portfolio' },
  about: { title: '关于设计师', tpl: 'aboutTpl', tab: 'about' }
};

function render(route) {
  const config = routes[route] || routes.home;
  const tpl = document.getElementById(config.tpl);
  app.innerHTML = '';
  app.appendChild(tpl.content.cloneNode(true));
  pageTitle.textContent = config.title;
  tabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.route === config.tab));
  backBtn.style.visibility = route === 'home' ? 'hidden' : 'visible';

  app.querySelectorAll('[data-route]').forEach((el) => {
    el.addEventListener('click', () => {
      location.hash = el.dataset.route;
    });
  });
}

function currentRoute() {
  return location.hash.replace('#', '') || 'home';
}

window.addEventListener('hashchange', () => render(currentRoute()));

backBtn.addEventListener('click', () => {
  if (currentRoute() === 'home') return;
  history.back();
});

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    location.hash = tab.dataset.route;
  });
});

if (!location.hash) location.hash = 'home';
render(currentRoute());

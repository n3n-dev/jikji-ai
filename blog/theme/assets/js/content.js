// Enhance server-rendered previous/next links with up to five page numbers.
document.querySelectorAll('.pagination[data-pages]').forEach((nav) => {
  const page = Number(nav.dataset.page);
  const pages = Number(nav.dataset.pages);
  if (!Number.isInteger(page) || !Number.isInteger(pages) || pages < 1) return;
  const base = nav.dataset.base.replace(/\/?$/, '/');
  const start = Math.max(1, Math.min(page - 2, pages - 4));
  const end = Math.min(pages, start + 4);
  const numbers = document.createDocumentFragment();
  for (let n = start; n <= end; n++) {
    const link = document.createElement('a');
    link.href = n === 1 ? base : base + 'page/' + n + '/';
    link.textContent = String(n);
    link.setAttribute('aria-label', n + '페이지');
    if (n === page) link.setAttribute('aria-current', 'page');
    numbers.append(link);
  }
  nav.querySelector('.pagination-numbers').replaceChildren(numbers);
});

// Company navigation disclosures support touch, keyboard and outside dismissal.
const companyMenus = document.querySelectorAll('.company-dropdown');
const companyMenuToggle = document.querySelector('.company-menu-toggle');
const companyNavigation = document.querySelector('.company-nav');
companyMenuToggle?.addEventListener('click', () => {
  const open = companyNavigation.classList.toggle('is-open');
  companyMenuToggle.setAttribute('aria-expanded', String(open));
  companyMenuToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
});
companyMenus.forEach((menu) => {
  menu.addEventListener('toggle', () => {
    if (menu.open) companyMenus.forEach((other) => { if (other !== menu) other.open = false; });
  });
  menu.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
});
document.addEventListener('click', (event) => {
  companyMenus.forEach((menu) => { if (!menu.contains(event.target)) menu.open = false; });
});

// Build an in-page table of contents from the published article headings.
const toc = document.querySelector('.article-toc');
const headings = document.querySelectorAll('.article-main .gh-content h2, .article-main .gh-content h3');
if (toc && headings.length) {
  const list = document.createElement('ul');
  headings.forEach((heading, index) => {
    if (!heading.id) {
      let candidate = `section-${index + 1}`;
      while (document.getElementById(candidate)) candidate += '-heading';
      heading.id = candidate;
    }
    const item = document.createElement('li');
    item.className = heading.tagName === 'H3' ? 'toc-subheading' : 'toc-heading';
    const link = document.createElement('a');
    link.href = `#${encodeURIComponent(heading.id)}`;
    link.textContent = heading.textContent;
    item.append(link);
    list.append(item);
  });
  toc.append(list);
  toc.closest('.toc-rail').hidden = false;
}
// Keep wide tables readable and keyboard-scrollable without moving the page.
document.querySelectorAll('.gh-content table').forEach((table) => {
  if (table.parentElement.classList.contains('table-scroll')) return;
  const region = document.createElement('div');
  region.className = 'table-scroll';
  region.tabIndex = 0;
  region.setAttribute('role', 'region');
  region.setAttribute('aria-label', table.caption?.textContent || '표 — 좌우로 스크롤할 수 있습니다');
  table.before(region);
  region.append(table);
});
document.querySelectorAll('.gh-content pre').forEach((block) => {
  block.tabIndex = 0;
  block.setAttribute('aria-label', '코드 블록');
});

// Ghost search removes its iframe on close. Restore keyboard focus when the
// upstream widget leaves it on the document body (verified with Ghost 6.62).
let searchOpener;
let searchWasOpen = false;
document.addEventListener('click', (event) => {
  const trigger = event.target.closest?.('[data-ghost-search]');
  if (trigger) searchOpener = trigger;
}, true);
document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    searchOpener = document.activeElement instanceof HTMLElement && document.activeElement !== document.body
      ? document.activeElement : document.querySelector('[data-ghost-search]');
  }
}, true);
new MutationObserver(() => {
  const isOpen = Boolean(document.querySelector('#sodo-search-root iframe'));
  if (searchWasOpen && !isOpen && document.activeElement === document.body) {
    searchOpener?.focus({preventScroll: true});
  }
  searchWasOpen = isOpen;
}).observe(document.body, {childList: true, subtree: true});

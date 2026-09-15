(() => {
  const footer = document.querySelector('.company-footer');
  if (!footer) return;
  const languageButton = footer.querySelector('[data-footer-language]');
  const family = footer.querySelector('.company-footer-family');
  const familyButton = footer.querySelector('#family-sites-button');
  const familyMenu = footer.querySelector('#family-sites-menu');
  const familyLink = familyMenu.querySelector('a');
  let locale = 'ko';
  try { if (localStorage.getItem('locale') === 'en') locale = 'en'; } catch {}

  function applyLocale() {
    footer.lang = locale;
    footer.querySelectorAll('[data-footer-ko]').forEach((element) => {
      element.textContent = element.dataset[locale === 'ko' ? 'footerKo' : 'footerEn'];
    });
    footer.querySelector('[data-footer-language-label]').textContent = locale === 'ko' ? 'English' : '한국어';
    familyButton.setAttribute('aria-label', locale === 'ko' ? '패밀리 사이트 메뉴' : 'Family sites menu');
    familyLink.setAttribute('aria-label', locale === 'ko'
      ? 'N3N: 엔쓰리엔 공식 사이트 새 창에서 열기'
      : 'N3N: N3N official site opens in a new tab');
  }
  function closeFamily(restoreFocus = false) {
    familyMenu.hidden = true;
    familyButton.setAttribute('aria-expanded', 'false');
    if (restoreFocus) familyButton.focus();
  }
  function openFamily() {
    familyMenu.hidden = false;
    familyButton.setAttribute('aria-expanded', 'true');
    familyLink.focus();
  }
  languageButton.addEventListener('click', () => {
    locale = locale === 'ko' ? 'en' : 'ko';
    try { localStorage.setItem('locale', locale); } catch {}
    applyLocale();
    document.dispatchEvent(new CustomEvent('jikji:localechange', {detail: {locale}}));
  });
  familyButton.addEventListener('click', () => familyMenu.hidden ? openFamily() : closeFamily());
  familyButton.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      openFamily();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !familyMenu.hidden) closeFamily(true);
  });
  document.addEventListener('mousedown', (event) => {
    if (!family.contains(event.target)) closeFamily();
  });
  family.addEventListener('focusout', (event) => {
    if (!family.contains(event.relatedTarget)) closeFamily();
  });
  familyLink.addEventListener('click', () => closeFamily());
  applyLocale();
})();

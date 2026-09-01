export function scrollToSection(href: string) {
  if (!href.startsWith('#')) return;

  const id = href.slice(1);

  if (id === 'gpucloud' || id === 'platform') {
    window.dispatchEvent(new CustomEvent('products-tab-switch', { detail: id }));
  }

  const el = document.getElementById(id);
  if (el) {
    const top =
      el.getBoundingClientRect().top +
      window.scrollY -
      (window.innerHeight - el.offsetHeight) / 2;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

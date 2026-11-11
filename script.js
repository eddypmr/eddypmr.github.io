(() => {
  const body = document.body;
  const toggle = document.getElementById('theme-toggle');
  const menu = document.getElementById('menu-toggle');
  const nav = document.getElementById('navigation');
  const saved = (() => { try { return localStorage.getItem('portfolio-theme'); } catch { return null; } })();
  const setTheme = (dark) => {
    body.classList.toggle('dark', dark);
    toggle.textContent = dark ? '☀' : '◐';
    toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  };
  setTheme(saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches));
  toggle.addEventListener('click', () => {
    const dark = !body.classList.contains('dark');
    setTheme(dark);
    try { localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light'); } catch {}
  });
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
  }));
  document.getElementById('year').textContent = String(new Date().getFullYear());
  if ('IntersectionObserver' in window) {
    const sections = [...document.querySelectorAll('main section[id]')];
    const links = [...nav.querySelectorAll('a')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => link.classList.toggle('active', link.hash === '#' + entry.target.id));
      });
    }, { rootMargin: '-20% 0px -65% 0px' });
    sections.forEach(section => observer.observe(section));
  }
})();
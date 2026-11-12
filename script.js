(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const menu = document.getElementById('menu-toggle');
  const nav = document.getElementById('navigation');
  const header = document.querySelector('.site-header');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const mobileNavigation = window.matchMedia('(max-width: 740px)');
  let preference;

  try { preference = localStorage.getItem('portfolio-theme'); } catch {}
  if (preference !== 'dark' && preference !== 'light') preference = null;

  const setTheme = (dark) => {
    root.classList.toggle('dark', dark);
    const label = dark ? 'Switch to light mode' : 'Switch to dark mode';
    toggle.textContent = dark ? '☀' : '◐';
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.title = label;
    document.querySelector('meta[name="theme-color"]').content = dark ? '#14202b' : '#ffffff';
  };

  setTheme(preference ? preference === 'dark' : systemTheme.matches);
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    preference = root.classList.contains('dark') ? 'light' : 'dark';
    setTheme(preference === 'dark');
    try { localStorage.setItem('portfolio-theme', preference); } catch {}
  });
  systemTheme.addEventListener('change', (event) => {
    if (!preference) setTheme(event.matches);
  });

  const setMenu = (open) => {
    nav.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (open) nav.querySelector('a').focus();
  };

  menu.hidden = false;
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      setMenu(false);
      menu.focus();
    }
  });
  document.addEventListener('pointerdown', (event) => {
    if (!header.contains(event.target)) setMenu(false);
  });
  header.addEventListener('focusout', (event) => {
    if (!header.contains(event.relatedTarget)) setMenu(false);
  });
  mobileNavigation.addEventListener('change', () => setMenu(false));

  const links = [...nav.querySelectorAll('a')];
  links.forEach((link) => link.addEventListener('click', () => {
    const wasOpen = nav.classList.contains('open');
    setMenu(false);
    if (wasOpen) {
      const section = document.getElementById(link.hash.slice(1));
      section.setAttribute('tabindex', '-1');
      section.focus({ preventScroll: true });
    }
  }));
  root.classList.add('js');

  const contactDialog = document.getElementById('contact-dialog');
  const contactEmail = document.getElementById('contact-email');
  const copyStatus = document.getElementById('contact-copy-status');
  if (typeof contactDialog.showModal === 'function') {
    document.querySelectorAll('a[data-contact]').forEach((link) => {
      link.setAttribute('aria-haspopup', 'dialog');
      link.setAttribute('aria-controls', contactDialog.id);
      link.addEventListener('click', (event) => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        copyStatus.textContent = '';
        contactDialog.showModal();
        event.preventDefault();
      });
    });
    contactDialog.addEventListener('click', (event) => {
      const bounds = contactDialog.getBoundingClientRect();
      const outside = event.clientX < bounds.left || event.clientX > bounds.right
        || event.clientY < bounds.top || event.clientY > bounds.bottom;
      if (event.target === contactDialog && outside) contactDialog.close();
    });
    contactDialog.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab') return;
      const controls = [...contactDialog.querySelectorAll('button, input, a[href]')];
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
    document.getElementById('copy-email').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(contactEmail.value);
        copyStatus.textContent = 'Email copied.';
      } catch {
        contactEmail.focus();
        contactEmail.select();
        copyStatus.textContent = 'Select and copy the email address above.';
      }
    });
  }

  document.getElementById('year').textContent = String(new Date().getFullYear());

  const sections = [...document.querySelectorAll('main section[id]')];
  let updatePending = false;
  const updateNavigation = () => {
    const threshold = header.getBoundingClientRect().bottom + 32;
    let current = sections[0].id;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= threshold) current = section.id;
    }
    // The last section may be too short to reach the header at the page bottom.
    if (Math.ceil(window.scrollY + window.innerHeight) >= root.scrollHeight - 2) {
      current = sections[sections.length - 1].id;
    }
    for (const link of links) {
      const active = link.hash === '#' + current;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    updatePending = false;
  };
  const scheduleNavigationUpdate = () => {
    if (updatePending) return;
    updatePending = true;
    window.requestAnimationFrame(updateNavigation);
  };

  window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true });
  window.addEventListener('resize', scheduleNavigationUpdate);
  window.addEventListener('load', scheduleNavigationUpdate);
  updateNavigation();
})();

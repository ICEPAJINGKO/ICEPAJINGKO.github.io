(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Preloader */
  const preloader = document.getElementById('preloader');
  const preloaderCount = document.getElementById('preloaderCount');

  const finishPreload = () => {
    preloader.classList.add('hidden');
    document.body.classList.add('loaded');
    setTimeout(() => preloader.remove(), 700);
  };

  if (prefersReducedMotion) {
    finishPreload();
  } else {
    let count = 0;
    const tick = () => {
      count += Math.ceil(Math.random() * 18);
      if (count >= 100) {
        count = 100;
        preloaderCount.textContent = count;
        setTimeout(finishPreload, 250);
        return;
      }
      preloaderCount.textContent = count;
      setTimeout(tick, 90);
    };
    tick();
  }

  /* Scroll progress bar */
  const progressBar = document.getElementById('progressBar');
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* Nav scrolled state */
  const nav = document.getElementById('nav');
  const updateNav = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* Mobile nav toggle */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* Active nav link on scroll */
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach((a) => {
            a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  /* Reveal on scroll */
  const revealEls = document.querySelectorAll('.reveal');
  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* Custom cursor (fine pointers only) */
  if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    const cursorDot = document.getElementById('cursorDot');
    cursorDot.classList.add('active');
    document.documentElement.classList.add('has-custom-cursor');
    window.addEventListener('mousemove', (e) => {
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', () => cursorDot.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorDot.classList.remove('hover'));
    });
  }

  /* Hero word typewriter */
  const typewriterEl = document.getElementById('typewriter');
  const heroWord = 'ICEPAJINGKO';

  if (typewriterEl) {
    if (prefersReducedMotion) {
      typewriterEl.textContent = heroWord;
    } else {
      let i = 0;
      const type = () => {
        if (i <= heroWord.length) {
          typewriterEl.textContent = heroWord.slice(0, i);
          i++;
          setTimeout(type, 110);
        }
      };
      setTimeout(type, 700);
    }
  }

  /* Footer year */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

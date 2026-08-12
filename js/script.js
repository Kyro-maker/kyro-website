/* =========================================================================
   KYRO — js/script.js
   Vanilla JS: nav, loader, particles, reveal, counters, FAQ, downloads,
   contact form, back-to-top.
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  initSignalCanvas();
  initRevealOnScroll();
  initCounters();
  initFaqAccordion();
  initDownloadsFilter();
  initBackToTop();
  initActiveNavLink();
  initRipple();
  initHeroParallax();
  initNewsletterForm();
  initPageTransitions();
  initTimelineDraw();
  initFooterReveal();
  initMagneticButtons();
  initCursorGlow();
});

/* -------------------------------------------------------------------------
   Loading screen
   ------------------------------------------------------------------------- */
function initLoader() {
  const loader = document.querySelector('.loader');
  if (!loader) return;

  const hide = () => loader.classList.add('loaded');

  // Hide once everything is ready, with a small minimum so it doesn't flash.
  const minDelay = new Promise((resolve) => setTimeout(resolve, 500));
  const ready = new Promise((resolve) => {
    if (document.readyState === 'complete') resolve();
    else window.addEventListener('load', resolve);
  });

  Promise.all([minDelay, ready]).then(hide);
}

/* -------------------------------------------------------------------------
   Sticky navbar + mobile menu
   ------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    links.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }
}

/* Highlight the current page in the nav */
function initActiveNavLink() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* -------------------------------------------------------------------------
   Signal grid canvas — glowing connected particles behind the hero
   ------------------------------------------------------------------------- */
function initSignalCanvas() {
  const canvas = document.querySelector('.signal-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, particles;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const COUNT = 46;
  const LINK_DIST = 130;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function makeParticles() {
    particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.6,
    }));
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          ctx.strokeStyle = `rgba(0, 229, 255, ${0.16 * (1 - dist / LINK_DIST)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 229, 255, 0.55)';
      ctx.shadowColor = 'rgba(0, 229, 255, 0.8)';
      ctx.shadowBlur = 6;
      ctx.fill();
    });

    if (!prefersReducedMotion) requestAnimationFrame(step);
  }

  resize();
  makeParticles();
  step();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      makeParticles();
      if (prefersReducedMotion) step();
    }, 200);
  });
}

/* -------------------------------------------------------------------------
   Scroll reveal via IntersectionObserver
   ------------------------------------------------------------------------- */
function initRevealOnScroll() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  items.forEach((el) => observer.observe(el));
}

/* -------------------------------------------------------------------------
   Animated counters (About page statistics)
   ------------------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = (target % 1 === 0 ? Math.round(value) : value.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

/* -------------------------------------------------------------------------
   FAQ accordion
   ------------------------------------------------------------------------- */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      items.forEach((other) => {
        other.classList.remove('open');
        other.querySelector('.faq-answer').style.maxHeight = null;
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* -------------------------------------------------------------------------
   Downloads page — search + category filter
   ------------------------------------------------------------------------- */
function initDownloadsFilter() {
  const grid = document.querySelector('.downloads-grid');
  if (!grid) return;

  const searchInput = document.querySelector('.search-bar input');
  const chips = document.querySelectorAll('.chip');
  const cards = Array.from(grid.querySelectorAll('.download-card'));
  const noResults = document.querySelector('.no-results');

  let activeCategory = 'all';

  function applyFilters() {
    const query = (searchInput?.value || '').trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
      const name = card.dataset.name.toLowerCase();
      const category = card.dataset.category;
      const matchesQuery = name.includes(query);
      const matchesCategory = activeCategory === 'all' || category === activeCategory;
      const show = matchesQuery && matchesCategory;
      card.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    if (noResults) noResults.classList.toggle('visible', visibleCount === 0);
  }

  searchInput?.addEventListener('input', applyFilters);

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.dataset.filter;
      applyFilters();
    });
  });

  applyFilters();
}

/* -------------------------------------------------------------------------
   Button ripple — a soft circle expands from the click point
   ------------------------------------------------------------------------- */
function initRipple() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.8;
    const dot = document.createElement('span');
    dot.className = 'ripple-dot';
    dot.style.width = dot.style.height = `${size}px`;
    dot.style.left = `${e.clientX - rect.left - size / 2}px`;
    dot.style.top = `${e.clientY - rect.top - size / 2}px`;

    btn.appendChild(dot);
    dot.addEventListener('animationend', () => dot.remove());
  });
}

/* -------------------------------------------------------------------------
   Hero mouse parallax — floating glass cards drift toward the cursor
   ------------------------------------------------------------------------- */
function initHeroParallax() {
  const hero = document.querySelector('.hero');
  const cards = document.querySelectorAll('.mockup-card');
  if (!hero || !cards.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip on touch devices

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    cards.forEach((card, i) => {
      const depth = (i % 2 === 0 ? 1 : -1) * (10 + i * 4);
      card.style.transform = `translate3d(${relX * depth}px, ${relY * depth}px, 0)`;
    });
  });

  hero.addEventListener('mouseleave', () => {
    cards.forEach((card) => {
      card.style.transform = 'translate3d(0, 0, 0)';
    });
  });
}

/* -------------------------------------------------------------------------
   Footer newsletter — lightweight front-end confirmation
   ------------------------------------------------------------------------- */
function initNewsletterForm() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    if (!input.value.trim()) return;

    const button = form.querySelector('button');
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fa-solid fa-check"></i>';
    input.value = '';

    setTimeout(() => {
      button.innerHTML = originalHTML;
    }, 2200);
  });
}

/* -------------------------------------------------------------------------
   Back to top button
   ------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener(
    'scroll',
    () => {
      btn.classList.toggle('visible', window.scrollY > 500);
    },
    { passive: true }
  );

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* -------------------------------------------------------------------------
   Page transitions — brief fade when navigating to another KYRO page.
   Only intercepts same-site .html links (nav, footer, in-page CTAs);
   external links, mailto:, and #anchors behave normally.
   ------------------------------------------------------------------------- */
function initPageTransitions() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('http')) return;
    if (link.target === '_blank') return;
    if (!href.endsWith('.html')) return;

    e.preventDefault();
    document.body.classList.add('page-exit');
    window.setTimeout(() => {
      window.location.href = href;
    }, 260);
  });
}

/* -------------------------------------------------------------------------
   About page — draw the timeline connector in once it scrolls into view
   ------------------------------------------------------------------------- */
function initTimelineDraw() {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;

  if (!('IntersectionObserver' in window)) {
    timeline.classList.add('in-view');
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          timeline.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(timeline);
}

/* -------------------------------------------------------------------------
   Footer — fade up into view the first time it's scrolled to, on any page
   ------------------------------------------------------------------------- */
function initFooterReveal() {
  const blocks = document.querySelectorAll('.footer-newsletter, .footer-grid, .footer-bottom');
  if (!blocks.length) return;

  if (!('IntersectionObserver' in window)) {
    blocks.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  blocks.forEach((el) => observer.observe(el));
}

/* -------------------------------------------------------------------------
   Magnetic buttons — primary CTAs drift toward the cursor on approach.
   Desktop / fine-pointer only, and off entirely for reduced motion.
   ------------------------------------------------------------------------- */
function initMagneticButtons() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const targets = document.querySelectorAll('.hero-actions .btn, .cta-actions .btn, .channel-cta');

  targets.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.3}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

/* -------------------------------------------------------------------------
   Cursor glow — a soft blue light that follows the pointer across the page.
   Desktop / fine-pointer only, and off entirely for reduced motion.
   ------------------------------------------------------------------------- */
function initCursorGlow() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  glow.setAttribute('aria-hidden', 'true');
  document.body.appendChild(glow);

  let active = false;

  window.addEventListener('mousemove', (e) => {
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    if (!active) {
      glow.classList.add('active');
      active = true;
    }
  });

  document.addEventListener('mouseleave', () => {
    glow.classList.remove('active');
    active = false;
  });
}

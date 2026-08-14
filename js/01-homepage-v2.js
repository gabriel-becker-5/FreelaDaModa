// Freela da Moda v2 — Homepage interactivity
// Theme toggle, FAQ accordion, mobile menu, scroll reveal.

(function () {
  'use strict';

  // ── TEMA CLARO / ESCURO ──
  var themeToggle = document.getElementById('themeToggle');
  var html = document.documentElement;

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    try { localStorage.setItem('fdlm-theme', theme); } catch (e) {}
    if (themeToggle) {
      var icon = themeToggle.querySelector('i');
      if (icon) {
        icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars';
      }
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = html.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // Load saved or system preference
  try {
    var saved = localStorage.getItem('fdlm-theme');
    if (saved) {
      setTheme(saved);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  } catch (e) {}

  // ── FAQ ACCORDION ──
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      // Close all others
      faqItems.forEach(function (other) { other.classList.remove('open'); });
      // Toggle clicked
      if (!isOpen) {
        item.classList.add('open');
      }
      // Update aria-expanded
      btn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
    });
  });

  // ── MOBILE MENU ──
  var mobileToggle = document.getElementById('mobileMenuToggle');
  var navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function () {
      var isOpen = navLinks.style.display === 'flex';
      navLinks.style.display = isOpen ? '' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '64px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'var(--surface)';
      navLinks.style.padding = '16px 24px';
      navLinks.style.borderBottom = '1px solid var(--border)';
      navLinks.style.boxShadow = 'var(--shadow-lg)';
      navLinks.style.zIndex = '49';

      var icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'bi bi-list' : 'bi bi-x-lg';
      }
    });

    // Close mobile menu on window resize to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 992) {
        navLinks.style.display = '';
        navLinks.style.flexDirection = '';
        navLinks.style.position = '';
        navLinks.style.top = '';
        navLinks.style.left = '';
        navLinks.style.right = '';
        navLinks.style.background = '';
        navLinks.style.padding = '';
        navLinks.style.borderBottom = '';
        navLinks.style.boxShadow = '';
        navLinks.style.zIndex = '';
        var icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'bi bi-list';
      }
    });
  }

  // ── SMOOTH SCROLL para links internos ──
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── SCROLL REVEAL (Intersection Observer) ──
  if ('IntersectionObserver' in window) {
    var revealItems = document.querySelectorAll(
      '.feature-card, .pricing-card, .step-item, .faq-item, .stat-item'
    );
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealItems.forEach(function (item) {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(item);
    });
  }
})();

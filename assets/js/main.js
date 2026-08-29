/* Lady Ikeya — site behaviour. No dependencies. */
(function () {
  'use strict';

  /* ---- Theme -------------------------------------------------------- */
  var STORE_KEY = 'li-theme';

  function applyTheme(theme) {
    if (theme === 'light' || theme === 'dark') {
      document.documentElement.setAttribute('data-theme', theme);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  function currentTheme() {
    var set = document.documentElement.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(STORE_KEY, next); } catch (e) { /* private mode */ }
      toggle.setAttribute('aria-label', 'Switch to ' + (next === 'dark' ? 'light' : 'dark') + ' theme');
    });
  }

  /* ---- Mobile navigation -------------------------------------------- */
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    var closeNav = function () {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    };

    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });

    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) closeNav();
    });
  }

  /* ---- Sticky header shadow ------------------------------------------ */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Scroll reveal -------------------------------------------------- */
  var revealables = document.querySelectorAll('.reveal');
  if (revealables.length) {
    if (!('IntersectionObserver' in window)) {
      revealables.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

      revealables.forEach(function (el, i) {
        el.style.transitionDelay = Math.min(i % 6, 5) * 60 + 'ms';
        observer.observe(el);
      });
    }
  }

  /* ---- Abstract toggles -------------------------------------------------- */
  document.querySelectorAll('.abstract-toggle').forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
    });
  });

  /* ---- CV viewer ------------------------------------------------------- */
  var viewer = document.getElementById('cv-viewer');

  if (viewer) {
    var panel = viewer.querySelector('.cv-viewer-panel');
    var lastFocused = null;
    var loaded = false;

    var loadPages = function () {
      if (loaded) return;
      loaded = true;
      viewer.querySelectorAll('.cv-page[data-src]').forEach(function (img) {
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
      });
    };

    var focusable = function () {
      return Array.prototype.filter.call(
        panel.querySelectorAll('a[href], button:not([disabled])'),
        function (el) { return el.offsetParent !== null; }
      );
    };

    var openViewer = function (trigger) {
      lastFocused = trigger || document.activeElement;
      loadPages();
      viewer.hidden = false;
      document.body.classList.add('cv-open');
      var close = viewer.querySelector('.cv-viewer-close');
      if (close) close.focus();
      viewer.querySelector('.cv-viewer-pages').scrollTop = 0;
    };

    var closeViewer = function () {
      viewer.hidden = true;
      document.body.classList.remove('cv-open');
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    };

    document.querySelectorAll('[data-cv-open]').forEach(function (el) {
      el.addEventListener('click', function () { openViewer(el); });
    });

    viewer.addEventListener('click', function (e) {
      if (e.target.closest('[data-cv-close]')) closeViewer();
    });

    document.addEventListener('keydown', function (e) {
      if (viewer.hidden) return;
      if (e.key === 'Escape') { closeViewer(); return; }
      if (e.key !== 'Tab') return;
      // keep focus inside the dialog
      var f = focusable();
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ---- Current year --------------------------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();

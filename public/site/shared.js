(function () {
  function initFadeIn() {
    var targets = document.querySelectorAll('.fade-in');
    if (!targets.length || typeof IntersectionObserver === 'undefined') {
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  function initNavScroll() {
    var nav = document.querySelector('nav');
    if (!nav) {
      return;
    }

    var base = 'rgba(7,8,26,.88)';
    var scrolled = 'rgba(7,8,26,.97)';

    function setNav() {
      nav.style.background = window.scrollY > 40 ? scrolled : base;
    }

    setNav();
    window.addEventListener('scroll', setNav);
  }

  function initResponsiveNavLinks(navListId) {
    var list = document.getElementById(navListId || 'navLinks');
    if (!list) {
      return;
    }

    function setDisplay() {
      list.style.display = window.innerWidth >= 640 ? 'flex' : 'none';
    }

    setDisplay();
    window.addEventListener('resize', setDisplay);
  }

  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (event) {
        var href = anchor.getAttribute('href');
        if (!href || href === '#') {
          return;
        }

        var target = document.querySelector(href);
        if (!target) {
          return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function initCommon() {
    initFadeIn();
    initNavScroll();
  }

  window.SignmonsSite = {
    initCommon: initCommon,
    initFadeIn: initFadeIn,
    initNavScroll: initNavScroll,
    initResponsiveNavLinks: initResponsiveNavLinks,
    initSmoothAnchors: initSmoothAnchors,
  };
})();

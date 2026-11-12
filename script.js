(function () {
  document.documentElement.classList.add('js');
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');

  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 24);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  // Mark the current page in the nav
  var path = location.pathname.replace(/index\.html$/, '');
  document.querySelectorAll('.nav a[href]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === '/' ? path === '/' : path.indexOf(href) === 0) a.setAttribute('aria-current', 'page');
  });

  // Reveal on scroll
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }
})();

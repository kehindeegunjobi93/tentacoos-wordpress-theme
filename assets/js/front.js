// Front-end enhancements for Tentacoos theme
// Keep most styling in theme.json and CSS. Use JS sparingly.

(function () {
  // Set current year in footer if .year span exists
  var yearSpan = document.querySelector('footer .year');
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }

  // FAQ accordion
  var faqButtons = document.querySelectorAll('.faq-q');
  faqButtons.forEach(function(btn){
    btn.addEventListener('click', function(){
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      var answer = btn.parentElement.querySelector('.faq-a');
      if (answer) {
        if (expanded) {
          answer.hidden = true;
        } else {
          answer.hidden = false;
        }
      }
    });
  });

  // Mobile menu toggle
  var menuToggle = document.querySelector('.mobile-menu-toggle');
  var siteMenu = document.querySelector('.site-menu');
  var backdrop = document.querySelector('.menu-backdrop');
  var mobilePanel = document.querySelector('.mobile-menu-panel');
  var desktopCta = document.querySelector('.topbar-cta');
  if (menuToggle && siteMenu) {
    menuToggle.addEventListener('click', function(){
      var expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      // Toggle WP nav if present
      siteMenu.classList.toggle('is-open', !expanded);
      // Toggle custom panel as fallback/primary on mobile
      if (mobilePanel) mobilePanel.classList.toggle('open', !expanded);
      if (!expanded) {
        // Force dark colors on all links/spans inside menu regardless of theme styles
        siteMenu.classList.add('force-dark');
        var scope = mobilePanel || siteMenu;
        var links = scope.querySelectorAll('a, .wp-block-navigation-item__content, span');
        links.forEach(function(el){
          try { el.style.color = '#0f172a'; el.style.fill = '#0f172a'; } catch(e) {}
        });
      }
      if (backdrop) { backdrop.hidden = expanded; backdrop.classList.toggle('active', !expanded); }
      document.body.classList.toggle('menu-open', !expanded);
      if (desktopCta) desktopCta.style.display = !expanded ? 'none' : '';
    });
    // Close menu on link click (mobile UX)
    var closeOnClick = function(e){
      var target = e.target;
      if (target && target.closest('a')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        siteMenu.classList.remove('is-open');
        if (mobilePanel) mobilePanel.classList.remove('open');
        if (backdrop) { backdrop.hidden = true; backdrop.classList.remove('active'); }
        document.body.classList.remove('menu-open');
        if (desktopCta) desktopCta.style.display = '';
      }
    };
    siteMenu.addEventListener('click', closeOnClick);
    if (mobilePanel) mobilePanel.addEventListener('click', closeOnClick);
    if (backdrop) {
      backdrop.addEventListener('click', function(){
        menuToggle.setAttribute('aria-expanded', 'false');
        siteMenu.classList.remove('is-open');
        if (mobilePanel) mobilePanel.classList.remove('open');
        backdrop.hidden = true;
        backdrop.classList.remove('active');
        document.body.classList.remove('menu-open');
        if (desktopCta) desktopCta.style.display = '';
      });
    }
  }
})();

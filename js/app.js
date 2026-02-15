(function () {
  'use strict';

  // Hero Slider
  var slides = document.querySelectorAll('.hero__slide');
  var dotsContainer = document.getElementById('heroDots');
  var currentSlide = 0;
  var autoplayInterval;

  function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach(function (slide, i) {
      slide.classList.toggle('hero__slide_active', i === currentSlide);
    });

    var dots = dotsContainer.querySelectorAll('.hero__dot');
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function createDots() {
    if (!dotsContainer) return;
    for (var i = 0; i < slides.length; i++) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'hero__dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Слайд ' + (i + 1));
      dot.addEventListener('click', function (j) {
        return function () {
          showSlide(j);
          resetAutoplay();
        };
      }(i));
      dotsContainer.appendChild(dot);
    }
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, 5000);
  }

  if (slides.length) {
    createDots();
    autoplayInterval = setInterval(nextSlide, 5000);
  }

  // Mobile Menu
  var menuToggle = document.getElementById('menuToggle');
  var mobileNav = document.getElementById('mobileNav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
    });

    mobileNav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
      });
    });
  }

  // Scroll Reveal
  var revealEls = document.querySelectorAll('.reveal');
  var observerOptions = {
    root: null,
    rootMargin: '-100px 0px 0px 0px',
    threshold: 0
  };

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });

  // Geography Markers
  var markers = document.querySelectorAll('.marker');
  var geographyItems = document.querySelectorAll('.geography-item');

  function setActiveCity(cityId) {
    var id = cityId != null ? String(cityId) : null;
    markers.forEach(function (m) {
      m.classList.toggle('active', id && m.getAttribute('data-city') === id);
    });
    geographyItems.forEach(function (item) {
      item.classList.toggle('active', id && item.getAttribute('data-city') === id);
    });
  }

  markers.forEach(function (marker) {
    marker.addEventListener('mouseenter', function () {
      setActiveCity(marker.getAttribute('data-city'));
    });
    marker.addEventListener('mouseleave', function () {
      setActiveCity(null);
    });
  });

  geographyItems.forEach(function (item) {
    item.addEventListener('mouseenter', function () {
      setActiveCity(item.getAttribute('data-city'));
    });
    item.addEventListener('mouseleave', function () {
      setActiveCity(null);
    });
  });

  function clearActiveCity() {
    markers.forEach(function (m) { m.classList.remove('active'); });
    geographyItems.forEach(function (item) { item.classList.remove('active'); });
  }

  document.querySelector('.geography-map') && document.querySelector('.geography-map').addEventListener('mouseleave', clearActiveCity);
  document.querySelector('.geography-list') && document.querySelector('.geography-list').addEventListener('mouseleave', clearActiveCity);

  // Current Year
  var yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Contact Form Submit
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
      contactForm.reset();
    });
  }
})();

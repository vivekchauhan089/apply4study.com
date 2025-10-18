document.addEventListener('DOMContentLoaded', function () {
  "use strict";

  const select = (el) => document.querySelector(el);
  const selectAll = (el) => document.querySelectorAll(el);

  // Toggle .scrolled class
  function toggleScrolled() {
    const body = select('body');
    const header = select('#header');
    if (!header) return;
    if (!header.classList.contains('scroll-up-sticky') &&
        !header.classList.contains('sticky-top') &&
        !header.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? body.classList.add('scrolled') : body.classList.remove('scrolled');
  }

  window.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  // Mobile nav toggle
  const mobileNavToggleBtn = select('.mobile-nav-toggle');
  const body = select('body');

  function mobileNavToggle() {
    body.classList.toggle('mobile-nav-active');
    mobileNavToggleBtn?.classList.toggle('bi-list');
    mobileNavToggleBtn?.classList.toggle('bi-x');
  }

  mobileNavToggleBtn?.addEventListener('click', mobileNavToggle);

  selectAll('#navmenu a').forEach((link) => {
    link.addEventListener('click', () => {
      if (select('.mobile-nav-active')) {
        mobileNavToggle();
      }
    });
  });

  // Mobile dropdowns
  selectAll('.navmenu .toggle-dropdown').forEach((el) => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  // Preloader
  const preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => preloader.remove());
  }

  // Scroll top button
  const scrollTop = select('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  window.addEventListener('scroll', toggleScrollTop);

  // // AOS
  // function aosInit() {
  //   AOS.init({
  //     duration: 600,
  //     easing: 'ease-in-out',
  //     once: true,
  //     mirror: false
  //   });
  // }
  // window.addEventListener('load', aosInit);

  // Carousel indicators
  selectAll('.carousel-indicators').forEach((indicators) => {
    const items = indicators.closest('.carousel')?.querySelectorAll('.carousel-item');
    if (items) {
      items.forEach((item, i) => {
        indicators.innerHTML += `<li data-bs-target="#${indicators.closest('.carousel').id}" data-bs-slide-to="${i}" class="${i === 0 ? 'active' : ''}"></li>`;
      });
    }
  });

  // Lightbox
  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.glightbox' });
  }

  // Pure Counter
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  // Swiper
  function initSwiper() {
    selectAll(".init-swiper").forEach((swiperElement) => {
      const configEl = swiperElement.querySelector(".swiper-config");
      if (configEl) {
        const config = JSON.parse(configEl.innerHTML.trim());
        if (swiperElement.classList.contains("swiper-tab")) {
          initSwiperWithCustomPagination(swiperElement, config);
        } else {
          new Swiper(swiperElement, config);
        }
      }
    });
  }

  window.addEventListener("load", initSwiper);

  // Skills animation
  selectAll('.skills-animation').forEach((el) => {
    new Waypoint({
      element: el,
      offset: '80%',
      handler: () => {
        el.querySelectorAll('.progress .progress-bar').forEach(bar => {
          bar.style.width = bar.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  // Isotope
  // selectAll('.isotope-layout').forEach((el) => {
  //   const layout = el.getAttribute('data-layout') ?? 'masonry';
  //   const filter = el.getAttribute('data-default-filter') ?? '*';
  //   const sort = el.getAttribute('data-sort') ?? 'original-order';

  //   imagesLoaded(el.querySelector('.isotope-container'), function () {
  //     const iso = new Isotope(el.querySelector('.isotope-container'), {
  //       itemSelector: '.isotope-item',
  //       layoutMode: layout,
  //       filter: filter,
  //       sortBy: sort
  //     });

  //     el.querySelectorAll('.isotope-filters li').forEach((filterBtn) => {
  //       filterBtn.addEventListener('click', function () {
  //         el.querySelector('.isotope-filters .filter-active')?.classList.remove('filter-active');
  //         this.classList.add('filter-active');
  //         iso.arrange({ filter: this.getAttribute('data-filter') });
  //         aosInit();
  //       });
  //     });
  //   });
  // });

});

'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelectorAll('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const tabContainer = document.querySelectorAll('.operations__tab-container');
const tabContent = document.querySelector('.operations__content');
const tab = document.querySelectorAll('.operations__tab');
const operationsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section = document.querySelector('#section--1');

const headerTitle = document.querySelector('.header__title');

const header = document.querySelector('.header');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btnOpen => {
  btnOpen.addEventListener('click', openModal);
});

btnCloseModal.forEach(btnClose => {
  btnClose.addEventListener('click', closeModal);
});
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// scrolling
btnScrollTo.addEventListener('click', function (e) {
  if (e.target) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
});
//tabbled component

tabContainer.forEach(t =>
  t.addEventListener('click', e => {
    const clicked = e.target.closest('.operations__tab');
    if (!clicked) return;
    //remove the tab effect
    tab.forEach(c => c.classList.remove('operations__tab--active'));
    operationsContent.forEach(operate =>
      operate.classList.remove('operations__content--active')
    );
    clicked.classList.add('operations__tab--active');

    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add('operations__content--active');
  })
);
// modal fadd animation
const handleEvent = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;

    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleEvent.bind(0.5));
nav.addEventListener('mouseout', handleEvent.bind(1));

// // adding sticky to header
// const navHeight = nav.getBoundingClientRect().height;
// const observeCallback = function (entries) {
//   const [entry] = entries;
//   console.log(entry);
//   if (!entry.isIntersecting) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// };
// const observerOption = {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${navHeight}px`,
// };
// const headerObserver = new IntersectionObserver(
//   observeCallback,
//   observerOption
// );
// headerObserver.observe(Header);

// //staticky navigation

// const scroll = section.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   if (window.scrollY > scroll.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//interseting observer Api for stricky navigation
// const observeCallback = function (entrie) {
//   entrie.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obOption = {
//   root: null,
//   threshold: 0.1,
// };

// const observer = new IntersectionObserver(observeCallback, obOption);
// observer.observe(section);

// adding sticky to header
const navHeight = nav.getBoundingClientRect().height;
const observeCallback = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const observerOption = {
  root: null,
  thresholds: 0,
  rootMargin: `-${navHeight}px`,
};
const headerObserver = new IntersectionObserver(
  observeCallback,
  observerOption
);
headerObserver.observe(header);

// another way to work with intersection observer

//reveal section as we scroll
const sectionCallback = function (entries, observe) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observe.unobserve(entry.target);
};

const sectionOption = {
  root: null,
  threshold: 0.15,
};
const allSection = document.querySelectorAll('.section');
const sectionIntersection = new IntersectionObserver(
  sectionCallback,
  sectionOption
);
allSection.forEach(section => {
  sectionIntersection.observe(section);
  //section.classList.add('section--hidden');
});

//lazy loading
const imgTarget = document.querySelectorAll('img[data-src]');
const lazyCallback = function (entrie) {
  const [entry] = entrie;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
};
const lazyObserver = new IntersectionObserver(lazyCallback, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTarget.forEach(section => {
  lazyObserver.observe(section);
  section.classList.add('lazy-img');
});

//sideshow component
const silde = function () {
  const slider = document.querySelector('.slider');
  slider.style.overflow = 'hidden';

  const slides = document.querySelectorAll('.slide');
  const maxSlide = slides.length;

  const goToSlide = function (slide) {
    // to calculate the translateX with 100 *(currentSlide * index of iteration)
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };
  goToSlide(0);

  // 0% 100% 200% 300% 400%
  const nextSlide = function () {
    //-100% 0% 100% 200% 300% 400%;
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
  };
  let currentSlide = 0;

  const btnRight = document
    .querySelector('.slider__btn--right')
    .addEventListener('click', function () {
      nextSlide();
      activateDot(currentSlide);
    });

  const btnLeft = document
    .querySelector('.slider__btn--left')
    .addEventListener('click', function () {
      prevSlide();
      activateDot(currentSlide);
    });

  //adding keyboard arrowRight ana arrowLeft to the slide

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  const slideDot = document.querySelector('.dots');

  //adding dot indictor for the slide
  const createDot = function () {
    slides.forEach((_, i) => {
      slideDot.insertAdjacentHTML(
        'beforeend',
        `<div class="dots__dot "data-slide="${i}"></div>`
      );
    });
  };
  createDot();
  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(slides => {
      slides.classList.remove('dots__dot--active');
    });
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  activateDot(0);
  slideDot.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
silde();

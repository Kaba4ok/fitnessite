'use strict';

(function () {

  let coaches = document.querySelector('.coaches');
  let coachesSlides = coaches.querySelectorAll('.coach');
  let prevCoachesSlideBtn = coaches.querySelector('.coaches__btn-slide--prev');
  let nextCoachesSlideBtn = coaches.querySelector('.coaches__btn-slide--next');

  let reviews = document.querySelector('.reviews');
  let reviewsList = reviews.querySelector('.reviews__list');
  let reviewsSlides = reviews.querySelectorAll('.reviews__item');
  let prevReviewsSlideBtn = reviews.querySelector('.reviews__btn--prev');
  let nextReviewsSlideBtn = reviews.querySelector('.reviews__btn--next');

  let form = document.querySelector('.trial__form');
  let inputName = form.querySelector('.trial__input--user');
  let inputPhone = form.querySelector('.trial__input--phone');
  let btnSubmit = form.querySelector('.trial__btn');

  const SLIDES_COUNT_DESKTOP = 4;
  const SLIDES_COUNT_TABLET = 2;
  const SLIDES_COUNT_DEFAULT = 1;
  const DESKTOP_WIDTH = 1200;
  const TABLET_WIDTH = 768;
  const PHONE_NUMBER_COUNT = 14;
  const SLIDES_COUNT = 1;

  let reviewIndex = 0;
  let coachIndex = 0;

  let scrollToTicketsBtn = document.querySelector('.page-header__ticket-btn');
  let tickets = document.querySelector('.tickets');

  scrollToTicketsBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    tickets.scrollIntoView({block: "start", behavior: "smooth"});
  });

  let startSlideShow = function (slides) {

    if (window.innerWidth < DESKTOP_WIDTH) {
      coachIndex = 2;
    }

    slides.forEach(function(slide) {
      slide.style.display = 'none';
    });

    for (let i = coachIndex; i < slides.length; i++) {
      slides[i].style.display = 'block';
    }
  }

  let showSlide = function (slidesCount, slides, add) {
    if (add) {
      coachIndex += slidesCount;
    } else {
      coachIndex -= slidesCount;
    }

    if (coachIndex < 0) {
      coachIndex = 0;
    } else if (coachIndex > (slides.length - slidesCount)) {
      coachIndex = (slides.length - slidesCount);
    }

    slides.forEach(function(slide) {
      slide.style.display = 'none';
    });

    for (let i = coachIndex; i < slides.length; i++) {
      slides[i].style.display = 'block';
    }
  }

  let getSlidesCount = function () {
    let slidesCount = 0;

    if (window.innerWidth >= DESKTOP_WIDTH) {
      slidesCount = SLIDES_COUNT_DESKTOP;
    } else if (window.innerWidth >= TABLET_WIDTH) {
      slidesCount = SLIDES_COUNT_TABLET;
    } else {
      slidesCount = SLIDES_COUNT_DEFAULT;
    }

    return slidesCount;
  }

  let changeSlide = function (slides, add, screenWidth = false) {
    let slidesCount = SLIDES_COUNT_DEFAULT;

    if (screenWidth) {
      slidesCount = getSlidesCount();
    }

    showSlide(slidesCount, slides, add);
  }

  let showReview = function (slides, add) {
    if (add) {
      reviewIndex += SLIDES_COUNT;
    } else {
      reviewIndex -= SLIDES_COUNT;
    }

    if (reviewIndex < 0) {
      reviewIndex = 0;
    } else if (reviewIndex > (slides.length - SLIDES_COUNT)) {
      reviewIndex = (slides.length - SLIDES_COUNT);
    }

    slides.forEach(function(slide) {
      slide.style.display = 'none';
    });

    for (let i = reviewIndex; i < slides.length; i++) {
      slides[i].style.display = 'block';
    }
  }

  let setMask = function (element) {
    let maskOptions = {
      mask: '+{7(}000)000-00-00'
    };

    let mask = IMask(element, maskOptions);

    if (element.value.length === 0) {
      element.value = '+7(';
      element.setCustomValidity('Заполните это поле');
    }

    element.selectionStart = element.value.length;

    mask.updateValue();
  }

  let recordsStorage = function () {
    let isStorageSupport = true;
    let storage = '';

    try {
      storage = localStorage.getItem('test');
    } catch (err) {
      isStorageSupport = false;
    }

    if (isStorageSupport) {
      localStorage.setItem('userName', inputName.value);
      localStorage.setItem('userPhone', inputPhone.value);
    }
  }

  let onFormSubmit = function (evt) {
    recordsStorage();
  }

  inputPhone.addEventListener('blur', function () {
    if (inputPhone.value.length < PHONE_NUMBER_COUNT) {
      inputPhone.setCustomValidity('Номер телефона должен состоять из 10 цифр');
    } else {
      inputPhone.setCustomValidity('');
    }
  });

  let getSlidesWrapperHeight = function (elements) {
    let elementsHeights = [];

    elements.forEach(function(element) {
      elementsHeights.push(element.offsetHeight);
    });

    elementsHeights.sort(function(a, b) {
      return b - a;
    });

    return elementsHeights[0];
  }

  reviewsList.style.height = getSlidesWrapperHeight(reviewsSlides) + 'px';

  startSlideShow(coachesSlides);
  showReview(reviewsSlides, false);

  inputPhone.addEventListener('focus', function () {
    setMask(inputPhone);
  });

  form.addEventListener('submit', onFormSubmit);

  prevCoachesSlideBtn.addEventListener('click', function () {
    changeSlide(coachesSlides, false, true);
  });

  nextCoachesSlideBtn.addEventListener('click', function () {
    changeSlide(coachesSlides, true, true);
  });

  prevReviewsSlideBtn.addEventListener('click', function () {
    showReview(reviewsSlides, false);
  });

  nextReviewsSlideBtn.addEventListener('click', function () {
    showReview(reviewsSlides, true);
  });

})();

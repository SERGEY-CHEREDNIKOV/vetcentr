import Swiper from 'swiper/bundle';
import WOW from 'wow.js/dist/wow.js';
import "../../node_modules/just-validate/dist/js/just-validate.js"

import toSwitchTabs from "./modules/tabs";
import scrolling from './modules/scrolling';
import modals from './modules/modals';
import burger from './modules/burger';
import map from './modules/map';
import maskPhone from './modules/maskPhone';
import validateForms from './modules/validateForms';

window.addEventListener('load', function () {

    'use strict';

    const swiper = new Swiper('.slider__list', {
        touchRatio: 2,
        grabCursor: true,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
            pageUpDown: true,
        },
        loop: true,
        autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
        },
        speed: 1000,
        parallax: true,
    });

    new Swiper('.about__slider', {
        navigation: {
            nextEl: '.about__button-prev',
            prevEl: '.about__button-next',
        },
        touchRatio: 2,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
            pageUpDown: true,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
        },
        speed: 1000,
        loop: true,
        // autoHeight: true,
    });

    new WOW().init();
    toSwitchTabs('.tabs__triggers-item', '.tabs__content-item', 'tabs__triggers-item--active', 'tabs__content-item--active');
    scrolling();
    modals();
    burger();
    map();
    maskPhone();
    validateForms('.form__form', '');
    validateForms('.form__form--popup', '');

});
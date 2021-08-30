import Swiper from 'swiper/bundle';

import WOW from 'wow.js/dist/wow.js';
import toSwitchTabs from "./modules/tabs";
import a from "./modules/test";

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
        // autoplay: {
        //     delay: 3000,
        //     stopOnLastSlide: false,
        //     disableOnInteraction: false,
        // },
        speed: 1000,
        parallax: true,
    });

    toSwitchTabs('.tabs__triggers-item', '.tabs__content-item', 'tabs__triggers-item--active', 'tabs__content-item--active');

    new WOW().init();

    a();

    console.log('test main');
});
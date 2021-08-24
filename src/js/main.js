import Swiper from 'swiper/bundle';
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

    a();

    console.log('test main');
});
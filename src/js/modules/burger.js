const burger = () => {
    const burgerMenu = document.querySelector('.burger');
    const header = document.querySelector('.header');
    const navigationLink = document.querySelectorAll('.navigation__item-link');
    const headerLink = document.querySelector('.header__link');

    burgerMenu.addEventListener('click', () => {
        header.classList.toggle('menu--open');
        burgerMenu.classList.toggle('burger--active');
        document.body.classList.toggle('overflow');
    });

    headerLink.addEventListener('click', () => {
        header.classList.remove('menu--open');
        burgerMenu.classList.remove('burger--active');
        document.body.classList.remove('overflow');
    }); 

    navigationLink.forEach(item => {
        item.addEventListener('click', () => {
            header.classList.remove('menu--open');
            burgerMenu.classList.remove('burger--active');
            document.body.classList.remove('overflow');
        });
    }); 
};

export default burger;
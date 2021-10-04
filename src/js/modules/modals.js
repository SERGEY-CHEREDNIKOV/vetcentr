const modals = () => {

    function bindModal(triggerSelector, modalSelector, closeSelector) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            lockPadding = document.querySelectorAll('.lock-padding'),
            scroll = calcScroll();

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }
                document.body.style.overflow = "hidden";
                lockPadding.forEach(item => {
                    item.style.paddingRight = `${scroll}px`;
                });
                document.body.style.paddingRight = `${scroll}px`;
                modal.classList.add('popup--active');
            });
        });

        close.addEventListener('click', () => {
            document.body.style.overflow = "";


            lockPadding.forEach(item => {
                item.style.paddingRight = `0px`;
            });

            document.body.style.paddingRight = `0px`;
            modal.classList.remove('popup--active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.style.overflow = "";

                lockPadding.forEach(item => {
                    item.style.paddingRight = `0px`;
                });

                document.body.style.paddingRight = `0px`;
                modal.classList.remove('popup--active');
            }
        });
    }


    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);

        let scrollWidth = Math.max((window.innerWidth - document.body.clientWidth), (div.offsetWidth - div.clientWidth));

        div.remove();


        return scrollWidth;
    }

    bindModal('.popup--open', '.popup', '.popup .popup--close');
};

export default modals;
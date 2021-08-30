const toSwitchTabs = (triggerBtn, content, activeBtn, activeContent) => {
    const tabTrigger = document.querySelectorAll(triggerBtn);
    const tabContent = document.querySelectorAll(content);

    tabTrigger.forEach((item) => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const id = e.target.getAttribute('href').replace('#', '');

            tabTrigger.forEach((child) => child.classList.remove(activeBtn));
            tabContent.forEach((child) => child.classList.remove(activeContent));

            item.classList.add(activeBtn);
            document.getElementById(id).classList.add(activeContent);
        });
    });
};

export default toSwitchTabs;
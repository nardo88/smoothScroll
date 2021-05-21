const smoothScroll = (nav) => {
    'use strict';
    const SPEED = 0.5;
    const scrolled = e => {
        e.preventDefault();
        const target = e.target;
        if (target.matches('[href^="#"]')) {
            let start = 0;
            // получили текущий скролл
            const pageY = window.pageYOffset;
            // получили id блока до куда надо скролить
            const hash = target.getAttribute('href');
            // если в href указана только решеька ничего не делаем
            if (hash === '#') return
            // получаем элемент по id
            const elem = document.querySelector(hash);
            // получили растояние от начала документа до выбранного элемента
            const coordinateElem = elem.getBoundingClientRect().top;

            const step = time => {
                if (!start) start = time;
                const progress = time - start;
                const r = (coordinateElem < 0 ?
                    Math.max(pageY - progress / SPEED, pageY + coordinateElem) :
                    Math.min(pageY + progress / SPEED, pageY + coordinateElem))

                window.scrollTo(0, r);

                if (r !== pageY + coordinateElem) requestAnimationFrame(step);

            }

            requestAnimationFrame(step)

        }
    }

    nav.addEventListener('click', scrolled);
}
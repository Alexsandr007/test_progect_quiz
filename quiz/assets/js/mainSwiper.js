document.addEventListener('DOMContentLoaded', function() {
    if (typeof Swiper === 'undefined') {
        console.error('Swiper не загружен! Проверьте подключение библиотеки.');
        return;
    }

    const swiper = new Swiper('.cards__slider', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        speed: 600,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        breakpoints: {
            480: {
                slidesPerView: 1.2,
                spaceBetween: 16
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 2.5,
                spaceBetween: 24
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        },
        effect: 'slide',
        grabCursor: true,
        a11y: {
            prevSlideMessage: 'Предыдущий слайд',
            nextSlideMessage: 'Следующий слайд',
            firstSlideMessage: 'Это первый слайд',
            lastSlideMessage: 'Это последний слайд',
            paginationBulletMessage: 'Перейти к слайду {{index}}'
        }
    });

    const prevBtn = document.querySelector('.cards__nav-btn--prev');
    const nextBtn = document.querySelector('.cards__nav-btn--next');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            swiper.slidePrev();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            swiper.slideNext();
        });
    }
});
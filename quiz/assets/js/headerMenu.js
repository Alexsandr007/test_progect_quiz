document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const sections = [
        { id: 'quiz', navItem: document.querySelector('.nav__link[href="#quiz"]')?.closest('.nav__item') },
        { id: 'cards', navItem: document.querySelector('.nav__link[href="#cards"]')?.closest('.nav__item') }
    ].filter(section => section.navItem);

    const heroSection = document.querySelector('.hero');
    const homeNavItem = document.querySelector('.nav__item--active');

    function updateActiveNavItem() {
        let activeSection = null;
        const scrollPosition = window.scrollY + 200;

        if (heroSection && scrollPosition < heroSection.offsetHeight) {
            sections.forEach(section => {
                if (section.navItem) section.navItem.classList.remove('nav__item--active');
            });
            if (homeNavItem) homeNavItem.classList.add('nav__item--active');
            return;
        }

        sections.forEach(section => {
            const element = document.getElementById(section.id);
            if (element) {
                const offsetTop = element.offsetTop;
                const offsetBottom = offsetTop + element.offsetHeight;
                if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                    activeSection = section;
                }
            }
        });

        sections.forEach(section => {
            if (section.navItem) section.navItem.classList.remove('nav__item--active');
        });
        if (homeNavItem) homeNavItem.classList.remove('nav__item--active');

        if (activeSection && activeSection.navItem) {
            activeSection.navItem.classList.add('nav__item--active');
        }
    }

    window.addEventListener('scroll', updateActiveNavItem);
    setTimeout(updateActiveNavItem, 100);
});

document.addEventListener('DOMContentLoaded', function() {
    const mobileBtn = document.querySelector('.mobile-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    if (mobileBtn && mobileMenu) {
        function openMobileMenu() {
            mobileMenu.classList.add('mobile-menu--open');
            mobileBtn.classList.add('mobile-btn--active');
            body.style.overflow = 'hidden';
            mobileBtn.setAttribute('aria-label', 'Закрыть меню');
        }

        function closeMobileMenu() {
            mobileMenu.classList.remove('mobile-menu--open');
            mobileBtn.classList.remove('mobile-btn--active');
            body.style.overflow = '';
            mobileBtn.setAttribute('aria-label', 'Открыть меню');
        }

        function toggleMobileMenu() {
            if (mobileMenu.classList.contains('mobile-menu--open')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }

        mobileBtn.addEventListener('click', toggleMobileMenu);

        mobileMenu.addEventListener('click', function(e) {
            if (e.target.classList.contains('mobile-menu__link')) {
                closeMobileMenu();
            }
        });

        const closeBtn = document.querySelector('.mobile-menu__close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeMobileMenu);
        }

        const dropdownBtns = document.querySelectorAll('.mobile-menu__dropdown-btn');
        dropdownBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const dropdown = this.nextElementSibling;
                this.classList.toggle('mobile-menu__dropdown-btn--active');
                dropdown.classList.toggle('mobile-menu__dropdown--open');
            });
        });

        function checkWindowSize() {
            if (window.innerWidth > 1200) {
                closeMobileMenu();
            }
        }

        window.addEventListener('resize', checkWindowSize);
    }
});
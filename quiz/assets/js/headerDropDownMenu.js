document.addEventListener('DOMContentLoaded', function() {
    const dropdownButton = document.querySelector('[data-dropdown-button]');
    const dropdownMenu = document.querySelector('[data-dropdown-menu]');
    const dropdownItem = document.querySelector('.nav__item--dropdown');

    if (dropdownButton && dropdownMenu && dropdownItem) {
        let closeTimeout;

        function openDropdown() {
            clearTimeout(closeTimeout);
            dropdownMenu.classList.add('nav__dropdown--open');
            dropdownButton.classList.add('nav__button--active');
            dropdownButton.setAttribute('aria-expanded', 'true');
            dropdownMenu.setAttribute('aria-hidden', 'false');
        }

        function closeDropdown() {
            dropdownMenu.classList.remove('nav__dropdown--open');
            dropdownButton.classList.remove('nav__button--active');
            dropdownButton.setAttribute('aria-expanded', 'false');
            dropdownMenu.setAttribute('aria-hidden', 'true');
        }

        function closeDropdownWithDelay() {
            closeTimeout = setTimeout(closeDropdown, 100);
        }

        dropdownButton.addEventListener('mouseenter', openDropdown);
        dropdownButton.addEventListener('mouseleave', closeDropdownWithDelay);
        dropdownMenu.addEventListener('mouseenter', openDropdown);
        dropdownMenu.addEventListener('mouseleave', closeDropdownWithDelay);
        dropdownItem.addEventListener('mouseenter', openDropdown);
        dropdownItem.addEventListener('mouseleave', closeDropdownWithDelay);

        dropdownButton.setAttribute('aria-expanded', 'false');
        dropdownButton.setAttribute('aria-haspopup', 'true');
        dropdownMenu.setAttribute('aria-hidden', 'true');
    }

    const modal = document.querySelector('[data-modal]');
    const openModalBtn = document.querySelector('[data-modal-open]');
    const closeModalBtns = document.querySelectorAll('[data-modal-close]');

    if (modal && openModalBtn) {
        function openModal() {
            modal.classList.add('modal--open');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.classList.remove('modal--open');
            document.body.style.overflow = '';
        }

        openModalBtn.addEventListener('click', openModal);

        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', closeModal);
        });

        modal.addEventListener('click', function(event) {
            if (event.target.classList.contains('modal__overlay')) {
                closeModal();
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.classList.contains('modal--open')) {
                closeModal();
            }
        });
    }
});
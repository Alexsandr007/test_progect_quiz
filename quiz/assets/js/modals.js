// ===== MODAL CONTROLLER =====
document.addEventListener('DOMContentLoaded', function() {
    const contactModal = document.getElementById('contactModal');
    const successModal = document.getElementById('successModal');
    const openButtons = document.querySelectorAll('[data-modal-open]');
    const body = document.body;

    if (!contactModal || !successModal) return;

    function openModal(modal) {
        modal.classList.add('modal--open');
        body.style.overflow = 'hidden';
        body.style.height = '100vh';
    }

    function closeModal(modal) {
        modal.classList.remove('modal--open');
        body.style.overflow = '';
        body.style.height = '';
    }

    openButtons.forEach(btn => {
        btn.addEventListener('click', () => openModal(contactModal));
    });

    const contactCloseBtns = contactModal.querySelectorAll('[data-modal-close]');
    contactCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => closeModal(contactModal));
    });

    const successCloseBtns = successModal.querySelectorAll('[data-success-close]');
    successCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => closeModal(successModal));
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (contactModal.classList.contains('modal--open')) {
                closeModal(contactModal);
            } else if (successModal.classList.contains('modal--open')) {
                closeModal(successModal);
            }
        }
    });

    contactModal.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal__overlay')) {
            closeModal(contactModal);
        }
    });

    successModal.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal__overlay')) {
            closeModal(successModal);
        }
    });
});

// ===== MODAL VALIDATION & SUCCESS FLOW =====
document.addEventListener('DOMContentLoaded', function() {
    const contactModal = document.getElementById('contactModal');
    const successModal = document.getElementById('successModal');
    const body = document.body;

    if (!contactModal || !successModal) return;

    const submitBtn = contactModal.querySelector('.modal__submit');
    const commentField = contactModal.querySelector('.modal__comment-field .modal__input');
    const commentRow = contactModal.querySelector('.modal__comment-row');
    const fileWrapper = contactModal.querySelector('.modal__file-wrapper');
    const fileInput = contactModal.querySelector('.modal__file-input');
    const radioInputs = contactModal.querySelectorAll('.modal__radio-input');
    const contactCloseBtns = contactModal.querySelectorAll('[data-modal-close]');

    if (!submitBtn || !commentField || !commentRow || !fileWrapper) return;

    const errorAttachment = document.createElement('div');
    errorAttachment.className = 'modal__error-attachment';

    const clipIcon = document.createElement('img');
    clipIcon.src = 'assets/img/modals/error.png';
    clipIcon.alt = 'Обязательное поле';

    const tooltip = document.createElement('span');
    tooltip.className = 'modal__tooltip';
    tooltip.textContent = 'Обязательное поле';

    errorAttachment.appendChild(clipIcon);
    errorAttachment.appendChild(tooltip);
    commentRow.appendChild(errorAttachment);

    function resetForm() {
        commentField.classList.remove('modal__input--error');
        errorAttachment.classList.remove('active');
        fileWrapper.classList.remove('shift-right');
        commentField.placeholder = 'Ваш комментарий';
        commentField.value = '';

        radioInputs.forEach(radio => {
            radio.checked = false;
        });

        if (fileInput) fileInput.value = '';
    }

    function validateComment() {
        const commentValue = commentField.value.trim();

        if (!commentValue) {
            commentField.classList.add('modal__input--error');
            errorAttachment.classList.add('active');
            fileWrapper.classList.add('shift-right');
            commentField.placeholder = 'Обязательное поле';
            return false;
        } else {
            commentField.classList.remove('modal__input--error');
            errorAttachment.classList.remove('active');
            fileWrapper.classList.remove('shift-right');
            commentField.placeholder = 'Ваш комментарий';
            return true;
        }
    }

    function openSuccessModal() {
        contactModal.classList.remove('modal--open');
        successModal.classList.add('modal--open');
        body.style.overflow = 'hidden';
        body.style.height = '100vh';
        resetForm();
    }

    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();

        const isCommentValid = validateComment();
        const isRadioSelected = Array.from(radioInputs).some(radio => radio.checked);

        if (isCommentValid && isRadioSelected) {
            openSuccessModal();
        } else if (!isRadioSelected) {
            alert('Пожалуйста, выберите один из вариантов');
        }
    });

    commentField.addEventListener('input', function() {
        if (this.value.trim()) {
            this.classList.remove('modal__input--error');
            errorAttachment.classList.remove('active');
            fileWrapper.classList.remove('shift-right');
            this.placeholder = 'Ваш комментарий';
        }
    });

    commentField.addEventListener('focus', function() {
        if (this.classList.contains('modal__input--error')) {
            this.placeholder = 'Ваш комментарий';
        }
    });

    commentField.addEventListener('blur', function() {
        if (!this.value.trim() && this.classList.contains('modal__input--error')) {
            this.placeholder = 'Обязательное поле';
        }
    });

    contactCloseBtns.forEach(btn => {
        btn.addEventListener('click', resetForm);
    });
});
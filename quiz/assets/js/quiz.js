document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('.quiz__question');
    const cards = document.querySelectorAll('.quiz__card');
    const nextButtons = document.querySelectorAll('.quiz__submit[data-next]');
    const backButtons = document.querySelectorAll('.quiz__back[data-back]');

    let currentStep = 1;
    const totalSteps = questions.length;

    function initQuiz() {
        cards.forEach(card => {
            card.classList.remove('quiz__card--active');
        });

        const firstCard = document.querySelector('.quiz__card[data-card="1"]');
        if (firstCard) {
            firstCard.classList.add('quiz__card--active');
        }

        questions.forEach((question, index) => {
            question.classList.remove('quiz__question--active', 'quiz__question--locked');
            if (index === 0) {
                question.classList.add('quiz__question--active');
            } else {
                question.classList.add('quiz__question--locked');
            }
        });

        currentStep = 1;
        updateQuestionsRadius();
        initCheckboxHandlers();
        initRadioHandlers();
        initFeedbackCard();
    }

    function goToStep(step) {
        if (step < 1 || step > totalSteps) return;

        cards.forEach(card => {
            card.classList.remove('quiz__card--active');
        });

        const targetCard = document.querySelector(`.quiz__card[data-card="${step}"]`);
        if (targetCard) {
            targetCard.classList.add('quiz__card--active');
        }

        questions.forEach((question, index) => {
            question.classList.remove('quiz__question--active');
            if (index + 1 === step) {
                question.classList.add('quiz__question--active');
            }
            if (index + 1 <= step) {
                question.classList.remove('quiz__question--locked');
            } else {
                question.classList.add('quiz__question--locked');
            }
        });

        currentStep = step;
        updateQuestionsRadius();

        if (step === 3 && window.resetFeedbackForm) {
            window.resetFeedbackForm();
        }
    }

    questions.forEach((question) => {
        question.addEventListener('click', function() {
            const questionNumber = parseInt(this.dataset.question);
            if (questionNumber <= currentStep) {
                goToStep(questionNumber);
            }
        });
    });

    nextButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const nextStep = parseInt(this.dataset.next);
            const nextQuestion = document.querySelector(`.quiz__question[data-question="${nextStep}"]`);
            if (nextQuestion) {
                nextQuestion.classList.remove('quiz__question--locked');
            }
            goToStep(nextStep);
        });
    });

    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const backStep = parseInt(this.dataset.back);
            goToStep(backStep);
        });
    });

    function initCheckboxHandlers() {
        const checkboxes = document.querySelectorAll('.quiz__checkbox-input');
        checkboxes.forEach(checkbox => {
            checkbox.removeEventListener('change', handleCheckboxChange);
            checkbox.addEventListener('change', handleCheckboxChange);
        });
    }

    function handleCheckboxChange() {
        const card = this.closest('.quiz__card');
        if (!card) return;
        const submitBtn = card.querySelector('.quiz__submit');
        const checkedBoxes = card.querySelectorAll('.quiz__checkbox-input:checked');
        if (submitBtn) {
            submitBtn.disabled = !(checkedBoxes.length > 0);
        }
    }

    function initRadioHandlers() {
        const radioGroups = document.querySelectorAll('.quiz__options--radio');
        radioGroups.forEach(group => {
            const radios = group.querySelectorAll('.quiz__radio-input');
            radios.forEach(radio => {
                radio.removeEventListener('change', handleRadioChange);
                radio.addEventListener('change', handleRadioChange);
            });
        });
    }

    function handleRadioChange() {
        const card = this.closest('.quiz__card');
        if (!card) return;
        const submitBtn = card.querySelector('.quiz__submit');
        const radioGroup = this.closest('.quiz__options--radio');
        const checkedRadio = radioGroup.querySelector('.quiz__radio-input:checked');
        if (submitBtn) {
            submitBtn.disabled = !checkedRadio;
            if (checkedRadio) {
                const selectedLabel = checkedRadio.closest('.quiz__radio');
                if (selectedLabel) {
                    selectedLabel.style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        selectedLabel.style.transform = 'scale(1)';
                    }, 200);
                }
            }
        }
    }

    function initFeedbackCard() {
        const feedbackCard = document.querySelector('.quiz__card[data-card="3"]');
        if (!feedbackCard) return;

        const input = feedbackCard.querySelector('.quiz__feedback-input');
        const selector = feedbackCard.querySelector('.quiz__feedback-selector');
        const selectorLabel = feedbackCard.querySelector('.quiz__selector-label');
        const dropdownOptions = feedbackCard.querySelectorAll('.quiz__selector-option');
        const submitBtn = feedbackCard.querySelector('.quiz__submit');

        let isSelectorOpen = false;

        function validateFeedbackForm() {
            const hasComment = input && input.value.trim().length > 0;
            const hasSelection = selectorLabel && selectorLabel.textContent.trim() !== '';
            if (submitBtn) {
                submitBtn.disabled = !(hasComment && hasSelection);
            }
        }

        function toggleSelector(e) {
            e.stopPropagation();
            selector.classList.toggle('quiz__feedback-selector--open');
            isSelectorOpen = selector.classList.contains('quiz__feedback-selector--open');
        }

        function selectOption(option) {
            dropdownOptions.forEach(opt => {
                opt.classList.remove('quiz__selector-option--selected');
            });
            option.classList.add('quiz__selector-option--selected');
            selectorLabel.textContent = option.textContent;
            selector.classList.remove('quiz__feedback-selector--open');
            isSelectorOpen = false;
            validateFeedbackForm();
        }

        if (selector) {
            selector.removeEventListener('click', toggleSelector);
            selector.addEventListener('click', toggleSelector);
        }

        dropdownOptions.forEach(option => {
            option.removeEventListener('click', function(e) {
                e.stopPropagation();
                selectOption(this);
            });
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                selectOption(this);
            });
        });

        if (input) {
            input.removeEventListener('input', validateFeedbackForm);
            input.addEventListener('input', validateFeedbackForm);
            if (input.value.trim() === '') {
                input.value = 'Очень понравился';
            }
        }

        document.addEventListener('click', function(e) {
            if (selector && !selector.contains(e.target) && isSelectorOpen) {
                selector.classList.remove('quiz__feedback-selector--open');
                isSelectorOpen = false;
            }
        });

        function resetFeedbackForm() {
            if (input) {
                input.value = 'Очень понравился';
            }
            if (selectorLabel && dropdownOptions.length > 0) {
                dropdownOptions.forEach(opt => opt.classList.remove('quiz__selector-option--selected'));
                dropdownOptions[0].classList.add('quiz__selector-option--selected');
                selectorLabel.textContent = dropdownOptions[0].textContent;
            }
            if (submitBtn) {
                submitBtn.disabled = true;
            }
        }

        window.resetFeedbackForm = resetFeedbackForm;

        if (dropdownOptions.length > 0) {
            dropdownOptions[0].classList.add('quiz__selector-option--selected');
            selectorLabel.textContent = dropdownOptions[0].textContent;
        }

        setTimeout(validateFeedbackForm, 100);
    }

    function resetCardState(cardNumber) {
        const card = document.querySelector(`.quiz__card[data-card="${cardNumber}"]`);
        if (!card) return;
        const checkboxes = card.querySelectorAll('.quiz__checkbox-input');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        const radios = card.querySelectorAll('.quiz__radio-input');
        radios.forEach(radio => {
            radio.checked = false;
        });
        const submitBtn = card.querySelector('.quiz__submit');
        if (submitBtn && !submitBtn.hasAttribute('data-modal-open')) {
            submitBtn.disabled = true;
        }
    }

    initQuiz();

    window.addEventListener('resize', function() {
        goToStep(currentStep);
    });
});

function updateQuestionsRadius() {
    const questions = document.querySelectorAll('.quiz__question');
    const visibleQuestions = [];

    questions.forEach(question => {
        if (!question.classList.contains('quiz__question--locked') ||
            question.classList.contains('quiz__question--active')) {
            visibleQuestions.push(question);
        }
    });

    const count = visibleQuestions.length;

    questions.forEach(question => {
        question.classList.remove(
            'quiz__question--radius-right',
            'quiz__question--radius-top-right',
            'quiz__question--radius-bottom-right',
            'quiz__question--radius-right-full'
        );
    });

    if (count === 0) return;

    if (count === 1) {
        visibleQuestions[0].classList.add('quiz__question--radius-right');
    } else if (count === 2) {
        visibleQuestions[0].classList.add('quiz__question--radius-top-right');
        visibleQuestions[1].classList.add('quiz__question--radius-bottom-right');
    } else if (count >= 3) {
        visibleQuestions[0].classList.add('quiz__question--radius-top-right');
        for (let i = 1; i < count - 1; i++) {
            visibleQuestions[i].classList.add('quiz__question--radius-right-full');
        }
        visibleQuestions[count - 1].classList.add('quiz__question--radius-bottom-right');
    }
}
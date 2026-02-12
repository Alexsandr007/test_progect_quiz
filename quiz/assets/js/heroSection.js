document.addEventListener('DOMContentLoaded', function() {
    const scrollButton = document.querySelector('[data-scroll-to="quiz"]');
    
    if (scrollButton) {
        scrollButton.addEventListener('click', function() {
            const quizSection = document.getElementById('quiz');
            if (quizSection) {
                quizSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});
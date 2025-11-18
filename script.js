document.addEventListener('DOMContentLoaded', () => {

    // --- Intersection Observer for Scroll Animations ---
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a staggered delay for a nicer effect on grids
                const delay = entry.target.dataset.delay || index * 100;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                
                // Stop observing the element once it's visible
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Start animation a bit before it's fully in view
    });

    // Observe all elements with the 'slide-in' class
    const elementsToAnimate = document.querySelectorAll('.slide-in');
    elementsToAnimate.forEach(el => observer.observe(el));


    // --- "Notify Me" Form Handler ---
    const notifyForm = document.querySelector('.notify-form');
    if (notifyForm) {
        notifyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = notifyForm.querySelector('input[type="email"]');
            const submitButton = notifyForm.querySelector('button');
            const originalButtonText = submitButton.textContent;

            if (emailInput.value && !submitButton.disabled) {
                // Visual feedback for submission
                submitButton.textContent = 'Submitting...';
                submitButton.disabled = true;

                // Simulate a network request
                setTimeout(() => {
                    submitButton.textContent = 'Thank You!';
                    submitButton.style.backgroundColor = '#2ecc71'; // Success green
                    submitButton.style.boxShadow = '0 4px 15px rgba(46, 204, 113, 0.4)';
                    emailInput.disabled = true;

                    console.log(`Email submitted for notification: ${emailInput.value}`);
                }, 800);
            }
        });
    }

    // --- Smooth Scrolling for Nav Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});

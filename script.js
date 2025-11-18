document.addEventListener('DOMContentLoaded', () => {

    // --- Intersection Observer for Fade-in Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Observe all elements with the 'fade-in' class
    const elementsToFade = document.querySelectorAll('.fade-in');
    elementsToFade.forEach(el => observer.observe(el));


    // --- "Notify Me" Form Handler ---
    const notifyForm = document.querySelector('.notify-form');
    if (notifyForm) {
        notifyForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual form submission
            const emailInput = notifyForm.querySelector('input[type="email"]');
            const submitButton = notifyForm.querySelector('button');

            if (emailInput.value) {
                // Simulate a successful submission
                submitButton.textContent = 'Thank You!';
                submitButton.style.backgroundColor = '#2ecc71'; // Success green
                emailInput.disabled = true;
                submitButton.disabled = true;

                // You can add a real form submission here later
                console.log(`Email submitted for notification: ${emailInput.value}`);
                
                // Optional: Reset form after a few seconds
                setTimeout(() => {
                    submitButton.textContent = 'Notify Me';
                    submitButton.style.backgroundColor = ''; // Revert to original color
                    emailInput.value = '';
                    emailInput.disabled = false;
                    submitButton.disabled = false;
                }, 4000);
            }
        });
    }

});

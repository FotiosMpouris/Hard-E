document.addEventListener('DOMContentLoaded', () => {

    // --- INTERACTIVE CANVAS BACKGROUND ---
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, particles;
        const particleCount = 50;
        const mouse = { x: null, y: null };

        function init() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 1.5 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.color = 'rgba(0, 170, 255, 0.5)'; // Electric Blue
            }
            update() {
                if (this.x > width || this.x < 0) this.speedX *= -1;
                if (this.y > height || this.y < 0) this.speedY *= -1;
                this.x += this.speedX;
                this.y += this.speedY;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }

        function handleParticles() {
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 170, 255, ${1 - distance / 100})`; // Fade with distance
                        ctx.lineWidth = 0.2;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            handleParticles();
            requestAnimationFrame(animate);
        }

        init();
        animate();

        window.addEventListener('resize', () => {
            // Debounce resize
            clearTimeout(window.resizeLag);
            window.resizeLag = setTimeout(() => {
                init();
            }, 250);
        });
        
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });
    }

    // --- SCROLL-BASED ANIMATIONS (Intersection Observer) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.animate-in');
    elementsToAnimate.forEach(el => observer.observe(el));


    // --- SMOOTH SCROLLING FOR NAV LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // --- "Notify Me" Form Handler ---
    const notifyForm = document.querySelector('.notify-form');
    if (notifyForm) {
        notifyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = notifyForm.querySelector('input[type="email"]');
            const submitButton = notifyForm.querySelector('button');

            if (emailInput.value) {
                submitButton.textContent = 'Submitted!';
                submitButton.style.backgroundColor = '#4CAF50';
                emailInput.disabled = true;
                submitButton.disabled = true;

                // Reset after a few seconds
                setTimeout(() => {
                    submitButton.textContent = 'Get Notified';
                    submitButton.style.backgroundColor = '';
                    emailInput.value = '';
                    emailInput.disabled = false;
                    submitButton.disabled = false;
                }, 4000);
            }
        });
    }
});

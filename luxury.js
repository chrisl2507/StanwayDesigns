/* ============================================
   STANWAY DESIGNS — Simplified JS
   No GSAP, no parallax, no counter animations
   Just basic navigation + subtle fade-ins
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===== NAVIGATION =====

    const nav = document.querySelector('.luxury-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    // Add scrolled class for subtle shadow (nav always visible)
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // Mobile menu toggle
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Mobile dropdown toggle
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.closest('.mobile-dropdown').classList.toggle('active');
        });
    });


    // ===== SIMPLE FADE-IN ON SCROLL =====

    const fadeElements = document.querySelectorAll('section, .gallery-item, .service-card, .blog-post-card, .product-card, .collection-card');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });

        fadeElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }


    // ===== MATERIALS CAROUSEL (services/about pages) =====

    const carousel = document.querySelector('.materials-carousel');
    const prevBtn = document.querySelector('.material-nav-btn[data-dir="prev"]');
    const nextBtn = document.querySelector('.material-nav-btn[data-dir="next"]');
    const dots = document.querySelectorAll('.material-dot');

    if (carousel && prevBtn && nextBtn) {
        let currentSlide = 0;
        const slides = carousel.querySelectorAll('.material-slide');
        const totalSlides = slides.length;

        function getVisibleSlides() {
            if (window.innerWidth >= 1024) return 1;
            if (window.innerWidth >= 768) return 2;
            return 1;
        }

        function updateCarousel() {
            const visible = getVisibleSlides();
            const maxSlide = Math.max(0, totalSlides - visible);
            currentSlide = Math.min(currentSlide, maxSlide);

            const slideWidth = slides[0] ? slides[0].offsetWidth + 24 : 0;
            carousel.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

            prevBtn.disabled = currentSlide === 0;
            nextBtn.disabled = currentSlide >= maxSlide;

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        prevBtn.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateCarousel();
            }
        });

        nextBtn.addEventListener('click', () => {
            const visible = getVisibleSlides();
            const maxSlide = Math.max(0, totalSlides - visible);
            if (currentSlide < maxSlide) {
                currentSlide++;
                updateCarousel();
            }
        });

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                currentSlide = i;
                updateCarousel();
            });
        });

        window.addEventListener('resize', updateCarousel);
        updateCarousel();
    }


    // ===== CONTACT FORM =====

    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => { data[key] = value; });

            // Simple validation
            const name = form.querySelector('[name="name"]');
            const email = form.querySelector('[name="email"]');
            const message = form.querySelector('[name="message"]');

            if (name && !name.value.trim()) { name.focus(); return; }
            if (email && !email.value.trim()) { email.focus(); return; }
            if (message && !message.value.trim()) { message.focus(); return; }

            const submitBtn = form.querySelector('.btn-primary');
            if (submitBtn) {
                const btnText = submitBtn.querySelector('.btn-text');
                if (btnText) {
                    btnText.textContent = 'Message Sent';
                }
                submitBtn.style.opacity = '0.7';
                submitBtn.style.pointerEvents = 'none';
            }

            form.reset();
        });
    }


    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});

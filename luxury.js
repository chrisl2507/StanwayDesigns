/* ============================================
   STANWAY DESIGNS — Simplified JS
   No GSAP, no parallax, no counter animations
   Just basic navigation + subtle fade-ins
   ============================================ */

// Mark JS as running so CSS can hide sections for fade-in. Without this
// class, no-JS users see all content at full opacity.
if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('js-fade');
}

document.addEventListener('DOMContentLoaded', () => {

    // ===== NAVIGATION =====

    const nav = document.querySelector('.luxury-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    // Add scrolled class for subtle shadow (throttled to reduce repaints)
    if (nav) {
        let scrolled = false;
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const isScrolled = window.scrollY > 50;
                    if (isScrolled !== scrolled) {
                        nav.classList.toggle('scrolled', isScrolled);
                        scrolled = isScrolled;
                    }
                    ticking = false;
                });
                ticking = true;
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

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateCarousel, 150);
        });
        updateCarousel();
    }


    // ===== ANCHOR LINK SCROLL (CSS handles smooth behavior) =====

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ block: 'start' });
            }
        });
    });

});

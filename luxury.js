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

    // Mobile menu — open/close with full a11y wiring
    if (menuToggle && mobileMenu) {
        const closeBtn = mobileMenu.querySelector('.mobile-close');
        const focusable = () => mobileMenu.querySelectorAll('a, button');

        function openMenu() {
            menuToggle.classList.add('active');
            mobileMenu.classList.add('active');
            mobileMenu.removeAttribute('inert');
            menuToggle.setAttribute('aria-expanded', 'true');
            menuToggle.setAttribute('aria-label', 'Close menu');
            document.body.style.overflow = 'hidden';
            const first = focusable()[0];
            if (first) first.focus();
        }

        function closeMenu() {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenu.setAttribute('inert', '');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Open menu');
            document.body.style.overflow = '';
            menuToggle.focus();
        }

        menuToggle.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) closeMenu();
            else openMenu();
        });

        if (closeBtn) closeBtn.addEventListener('click', closeMenu);

        // Backdrop click — only when the click target IS the dialog itself
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) closeMenu();
        });

        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Escape to close + Tab focus trap while open
        document.addEventListener('keydown', (e) => {
            if (!mobileMenu.classList.contains('active')) return;
            if (e.key === 'Escape') {
                e.preventDefault();
                closeMenu();
                return;
            }
            if (e.key === 'Tab') {
                const items = focusable();
                if (!items.length) return;
                const first = items[0];
                const last = items[items.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
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
            // P2 — single-up at every breakpoint so each timber gets a moment
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

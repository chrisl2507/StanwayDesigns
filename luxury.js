// ============================================
// STANWAY DESIGNS — LUXURY EDITION
// Interactive JavaScript
// ============================================

// ============================================
// 1. NAVIGATION
// ============================================
const nav = document.querySelector('.luxury-nav');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        nav.classList.remove('hidden');
        return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        nav.classList.add('hidden');
    } else {
        // Scrolling up
        nav.classList.remove('hidden');
    }

    lastScroll = currentScroll;
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Mobile dropdown toggle
const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

mobileDropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        toggle.parentElement.classList.toggle('active');
    });
});

// Close mobile menu when clicking mobile dropdown links
const mobileDropdownLinks = document.querySelectorAll('.mobile-dropdown-items a');

mobileDropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scroll for navigation links
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');

        if (targetId === '#') return;

        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const navHeight = nav.offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// 2. GSAP SCROLL ANIMATIONS
// ============================================
gsap.registerPlugin(ScrollTrigger);

// Parallax effect for hero image
gsap.to('.hero-image', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero-luxury',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});

// Parallax effect for craftsmanship section
if (window.innerWidth > 768) {
    gsap.to('.craft-bg', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
            trigger: '.craftsmanship-feature',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
}

// Fade in sections on scroll
const fadeInElements = document.querySelectorAll('.philosophy-content, .collection-card, .gallery-item, .process-step');

fadeInElements.forEach((el, index) => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        delay: index * 0.05,
        ease: 'power3.out'
    });
});

// Animate section titles
const sectionTitles = document.querySelectorAll('.section-title');

sectionTitles.forEach(title => {
    const words = title.innerHTML.split(' ');
    title.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');

    const wordSpans = title.querySelectorAll('.word');

    gsap.from(wordSpans, {
        scrollTrigger: {
            trigger: title,
            start: 'top 85%',
        },
        opacity: 0,
        y: 10,
        duration: 0.3,
        stagger: 0.02,
        ease: 'power2.out'
    });
});

// Animate stats counter
const stats = document.querySelectorAll('.stat-number');

stats.forEach(stat => {
    const text = stat.textContent;
    const isInfinity = text === '∞';

    if (!isInfinity && !isNaN(text)) {
        const endValue = parseFloat(text);

        ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            onEnter: () => {
                gsap.from(stat, {
                    textContent: 0,
                    duration: 2,
                    snap: { textContent: 1 },
                    ease: 'power1.inOut',
                    onUpdate: function() {
                        stat.textContent = Math.ceil(this.targets()[0].textContent);
                    }
                });
            }
        });
    }
});

// Reveal animations for images
const revealImages = document.querySelectorAll('.philosophy-image, .collection-image img, .gallery-item img');

revealImages.forEach(img => {
    gsap.from(img, {
        scrollTrigger: {
            trigger: img,
            start: 'top 80%',
        },
        scale: 1.2,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
    });
});

// ============================================
// 4. FORM INTERACTIONS
// ============================================
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // Let Netlify handle the form submission
        console.log('Form submitted');
    });
}

// ============================================
// 5. IMAGE LAZY LOADING
// ============================================
const lazyImages = document.querySelectorAll('img[src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px'
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

// ============================================
// 6. SCROLL TO TOP ON LOAD
// ============================================
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// ============================================
// 7. HOVER EFFECTS FOR COLLECTION CARDS
// ============================================
const collectionCards = document.querySelectorAll('.collection-card');

collectionCards.forEach(card => {
    const overlay = card.querySelector('.collection-overlay');

    card.addEventListener('mouseenter', () => {
        gsap.to(overlay, {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(overlay, {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.out'
        });
    });
});

// ============================================
// 8. GALLERY HOVER EFFECTS
// ============================================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    const info = item.querySelector('.gallery-info');
    const img = item.querySelector('img');

    item.addEventListener('mouseenter', () => {
        gsap.to(info, {
            y: 0,
            duration: 0.5,
            ease: 'power3.out'
        });

        gsap.to(img, {
            scale: 1.05,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    item.addEventListener('mouseleave', () => {
        gsap.to(info, {
            y: '100%',
            duration: 0.5,
            ease: 'power3.in'
        });

        gsap.to(img, {
            scale: 1,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
});

// ============================================
// 9. BUTTON HOVER EFFECTS
// ============================================
const primaryButtons = document.querySelectorAll('.btn-primary');

primaryButtons.forEach(btn => {
    btn.addEventListener('mouseenter', (e) => {
        const arrow = btn.querySelector('.btn-arrow');
        if (arrow) {
            gsap.to(arrow, {
                x: 5,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });

    btn.addEventListener('mouseleave', () => {
        const arrow = btn.querySelector('.btn-arrow');
        if (arrow) {
            gsap.to(arrow, {
                x: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });
});

// ============================================
// 10. REVEAL ANIMATIONS
// ============================================
const revealElements = document.querySelectorAll('.reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// ============================================
// 11. PERFORMANCE OPTIMIZATIONS
// ============================================

// Disable animations on low-end devices
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable GSAP animations
    gsap.globalTimeline.clear();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}

// Debounce resize events
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

// ============================================
// 12. CONSOLE MESSAGE
// ============================================
console.log('%c Stanway Designs ', 'background: #EC9176; color: #0A0A0A; font-size: 20px; padding: 10px 20px; font-family: serif;');
console.log('%c Crafted with care ', 'background: #1A1A1A; color: #EC9176; font-size: 14px; padding: 5px 10px;');

// ============================================
// 13. MATERIALS CAROUSEL
// ============================================
const materialsCarousel = document.querySelector('.materials-carousel');
const materialSlides = document.querySelectorAll('.material-slide');
const materialPrevBtn = document.querySelector('.material-prev');
const materialNextBtn = document.querySelector('.material-next');
const materialDots = document.querySelectorAll('.material-dot');

if (materialsCarousel && materialSlides.length > 0) {
    let currentMaterialSlide = 0;
    const totalMaterialSlides = materialSlides.length;

    // Calculate slides per view based on screen size
    const getSlidesPerView = () => {
        if (window.innerWidth >= 768) {
            return 2;
        }
        return 1;
    };

    const updateMaterialCarousel = () => {
        const slidesPerView = getSlidesPerView();
        const slideWidth = materialSlides[0].offsetWidth;
        const gap = 24; // matches CSS gap
        const offset = currentMaterialSlide * (slideWidth + gap);

        materialsCarousel.style.transform = `translateX(-${offset}px)`;

        // Update dots
        materialDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentMaterialSlide);
        });

        // Update button states
        if (materialPrevBtn && materialNextBtn) {
            materialPrevBtn.disabled = currentMaterialSlide === 0;
            materialNextBtn.disabled = currentMaterialSlide >= totalMaterialSlides - slidesPerView;
        }
    };

    // Previous button
    if (materialPrevBtn) {
        materialPrevBtn.addEventListener('click', () => {
            if (currentMaterialSlide > 0) {
                currentMaterialSlide--;
                updateMaterialCarousel();
            }
        });
    }

    // Next button
    if (materialNextBtn) {
        materialNextBtn.addEventListener('click', () => {
            const slidesPerView = getSlidesPerView();
            if (currentMaterialSlide < totalMaterialSlides - slidesPerView) {
                currentMaterialSlide++;
                updateMaterialCarousel();
            }
        });
    }

    // Dot navigation
    materialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentMaterialSlide = index;
            updateMaterialCarousel();
        });
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    materialsCarousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    materialsCarousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        const slidesPerView = getSlidesPerView();

        if (diff > 50 && currentMaterialSlide < totalMaterialSlides - slidesPerView) {
            currentMaterialSlide++;
            updateMaterialCarousel();
        } else if (diff < -50 && currentMaterialSlide > 0) {
            currentMaterialSlide--;
            updateMaterialCarousel();
        }
    }, { passive: true });

    // Update on window resize
    let materialResizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(materialResizeTimer);
        materialResizeTimer = setTimeout(() => {
            updateMaterialCarousel();
        }, 250);
    });

    // Initialize
    updateMaterialCarousel();
}

// ============================================
// 14. INITIALIZE ON LOAD
// ============================================
window.addEventListener('load', () => {
    // Refresh ScrollTrigger after images load
    ScrollTrigger.refresh();

    // Remove loading class from body if you have one
    document.body.classList.add('loaded');
});

/* ============================================
   STANWAY DESIGNS — Main JavaScript
   Smooth scroll · GSAP animations · Custom cursor
   ============================================ */

// ============================================
// 1. LENIS SMOOTH SCROLL
// ============================================
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Prevent scroll during menu open
function stopScroll() {
    lenis.stop();
}

function startScroll() {
    lenis.start();
}


// ============================================
// 2. CUSTOM CURSOR
// ============================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

// Track mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot follows immediately
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

// Outline follows with delay (smooth motion)
function animateOutline() {
    const distX = mouseX - outlineX;
    const distY = mouseY - outlineY;
    
    outlineX += distX * 0.15;
    outlineY += distY * 0.15;
    
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';
    
    requestAnimationFrame(animateOutline);
}

animateOutline();

// Hover effects for interactive elements
const hoverElements = document.querySelectorAll('a, button, .service-item, .process-card');

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
    });
    
    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
    });
});


// ============================================
// 3. MENU TOGGLE
// ============================================
const menuToggle = document.querySelector('.nav-hamburger');
const menuOverlay = document.querySelector('.menu-overlay');
const menuLinks = document.querySelectorAll('.menu-links a');

let menuOpen = false;

menuToggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    
    if (menuOpen) {
        menuToggle.classList.add('active');
        menuOverlay.classList.add('active');
        stopScroll();
        
        // Animate menu links in
        gsap.from('.menu-links li', {
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.2
        });
        
        gsap.from('.menu-footer', {
            opacity: 0,
            duration: 0.6,
            delay: 0.8
        });
    } else {
        menuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
        startScroll();
    }
});

// Close menu when clicking a link
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuOpen) {
            menuToggle.classList.remove('active');
            menuOverlay.classList.remove('active');
            startScroll();
            menuOpen = false;
        }
    });
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) {
        menuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
        startScroll();
        menuOpen = false;
    }
});


// ============================================
// 4. GSAP SCROLL ANIMATIONS
// ============================================
gsap.registerPlugin(ScrollTrigger);

// Update ScrollTrigger on Lenis scroll
lenis.on('scroll', ScrollTrigger.update);

// Tell GSAP to use Lenis for smooth scrolling
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);


// Hero title reveal animation
const heroLines = document.querySelectorAll('.hero-title .line');

if (heroLines.length > 0) {
    gsap.from(heroLines, {
        y: 120,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.3
    });
}

// Hero location fade in
gsap.from('.hero-location', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.8
});

// Scroll indicator
gsap.from('.scroll-indicator', {
    opacity: 0,
    duration: 1,
    delay: 1.2
});


// Philosophy section — stagger reveal
gsap.from('.philosophy-heading-block', {
    scrollTrigger: {
        trigger: '.philosophy-v2',
        start: 'top 75%',
    },
    x: -60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.philosophy-text-block', {
    scrollTrigger: {
        trigger: '.philosophy-v2',
        start: 'top 75%',
    },
    x: 60,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: 'power3.out'
});

gsap.from('.philosophy-image-block', {
    scrollTrigger: {
        trigger: '.philosophy-image-block',
        start: 'top 80%',
    },
    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
});


// Statement section — parallax image
gsap.to('.statement-image-wrap img', {
    scrollTrigger: {
        trigger: '.statement-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
    },
    y: -100,
    ease: 'none'
});

gsap.from('.statement-text-overlay', {
    scrollTrigger: {
        trigger: '.statement-section',
        start: 'top 70%',
    },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power3.out'
});


// Services preview — stagger items
gsap.from('.service-item', {
    scrollTrigger: {
        trigger: '.services-list',
        start: 'top 75%',
    },
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out'
});


// Process cards — horizontal reveal
gsap.from('.process-card', {
    scrollTrigger: {
        trigger: '.process-v2',
        start: 'top 75%',
    },
    x: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out'
});


// Contact section — fade in
gsap.from('.contact-intro-block', {
    scrollTrigger: {
        trigger: '.contact-v2',
        start: 'top 75%',
    },
    x: -40,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.contact-form-v2', {
    scrollTrigger: {
        trigger: '.contact-v2',
        start: 'top 75%',
    },
    x: 40,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: 'power3.out'
});


// ============================================
// 5. HERO IMAGE PARALLAX
// ============================================
gsap.to('.hero-image-container img', {
    scrollTrigger: {
        trigger: '.hero-v2',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    },
    y: 200,
    scale: 1.1,
    ease: 'none'
});


// ============================================
// 6. NAV BLEND MODE SWITCH (optional)
// ============================================
// Switch nav blend mode when scrolling past hero
ScrollTrigger.create({
    trigger: '.philosophy-v2',
    start: 'top top',
    onEnter: () => {
        document.querySelector('.nav-minimal').style.mixBlendMode = 'normal';
        document.querySelectorAll('.nav-minimal *').forEach(el => {
            el.style.color = 'var(--charcoal)';
        });
    },
    onLeaveBack: () => {
        document.querySelector('.nav-minimal').style.mixBlendMode = 'difference';
        document.querySelectorAll('.nav-minimal *').forEach(el => {
            el.style.color = 'white';
        });
    }
});


// ============================================
// 7. FORM SUBMISSION (Netlify)
// ============================================
// No preventDefault — let Netlify handle it naturally
// Form will submit and redirect to success page

console.log('🪵 Stanway Designs — Loaded');

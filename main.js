/* ============================================
   STANWAY DESIGNS — Main JavaScript
   Simple & Functional
   ============================================ */

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navOverlay = document.querySelector('.nav-overlay');
const body = document.body;

if (navToggle && navOverlay) {
    const desktopMenu = document.querySelector('.nav-container .nav-menu');
    if (desktopMenu) {
        const mobileMenu = desktopMenu.cloneNode(true);
        navOverlay.appendChild(mobileMenu);
    }

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navOverlay.classList.toggle('active');
        body.style.overflow = navOverlay.classList.contains('active') ? 'hidden' : '';
    });

    navOverlay.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navOverlay.classList.remove('active');
            body.style.overflow = '';
        });
    });
}

// Close mobile menu on window resize (if open)
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth >= 768) {
            navToggle?.classList.remove('active');
            navOverlay?.classList.remove('active');
            body.style.overflow = '';
        }
    }, 250);
});

// Smooth scroll for anchor links (fallback for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

console.log('Stanway Designs loaded');

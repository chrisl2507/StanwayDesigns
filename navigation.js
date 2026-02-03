/* ============================================
   STANWAY DESIGNS — Navigation
   Mobile nav toggle · overlay · keyboard
   ============================================ */
document.addEventListener('DOMContentLoaded', function () {

    var toggle  = document.querySelector('.nav-toggle');
    var list    = document.querySelector('nav ul');
    var overlay = document.querySelector('.nav-overlay');

    /* ── Open ── */
    function openNav() {
        list.classList.add('nav-open');
        overlay.classList.add('overlay-visible');
        toggle.classList.add('nav-active');
        toggle.setAttribute('aria-expanded', 'true');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';   // prevent background scroll
    }

    /* ── Close ── */
    function closeNav() {
        list.classList.remove('nav-open');
        overlay.classList.remove('overlay-visible');
        toggle.classList.remove('nav-active');
        toggle.setAttribute('aria-expanded', 'false');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    /* ── Toggle button ── */
    toggle.addEventListener('click', function () {
        list.classList.contains('nav-open') ? closeNav() : openNav();
    });

    /* ── Overlay click closes nav ── */
    overlay.addEventListener('click', closeNav);

    /* ── Escape key closes nav ── */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && list.classList.contains('nav-open')) {
            closeNav();
        }
    });

    /* ── Nav link click closes nav on mobile ── */
    document.querySelectorAll('nav ul a').forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.innerWidth < 768) {
                closeNav();
            }
        });
    });

});

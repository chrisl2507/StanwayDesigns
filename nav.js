/* nav.js - shared navigation
   Root pages:    <script src="nav.js" data-root=""></script>
   Subdir pages:  <script src="../nav.js" data-root="../"></script>
*/
(function () {
    var s = document.currentScript;
    var r = s ? (s.getAttribute('data-root') || '') : '';

    var html =
        '<a href="#main" class="skip-link">Skip to content</a>' +
        '<nav class="luxury-nav">' +
        '<div class="nav-container">' +
        '<a href="' + r + 'index.html" class="logo">' +
        '<img src="' + r + 'includes/images/Logo/Logo.webp" alt="Stanway Designs" class="logo-img" decoding="async" width="531" height="484" srcset="' + r + 'includes/images/Logo/Logo.webp 531w" sizes="50px">' +
        '</a>' +
        '<ul class="nav-links">' +
        '<li><a href="' + r + 'furniture.html" class="nav-link" data-section="furniture">Furniture</a></li>' +
        '<li><a href="' + r + 'joinery.html" class="nav-link" data-section="joinery">Joinery</a></li>' +
        '<li><a href="' + r + 'woodturning.html" class="nav-link" data-section="woodturning">Woodturning &amp; Homeware</a></li>' +
        '<li><a href="' + r + 'restoration.html" class="nav-link" data-section="restoration">Restoration &amp; Repair</a></li>' +
        '<li><a href="' + r + 'gallery.html" class="nav-link" data-section="gallery">Gallery</a></li>' +
        '<li><a href="' + r + 'shop.html" class="nav-link" data-section="shop">Shop</a></li>' +
        '<li><a href="' + r + 'blog.html" class="nav-link" data-section="blog">Blog</a></li>' +
        '<li><a href="' + r + 'about.html" class="nav-link" data-section="about">About</a></li>' +
        '<li><a href="' + r + 'contact.html" class="nav-link nav-cta" data-section="contact">Contact</a></li>' +
        '</ul>' +
        '<button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">' +
        '<span></span><span></span><span></span>' +
        '</button>' +
        '</div>' +
        '</nav>' +
        '<div class="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Site navigation" inert>' +
        '<button class="mobile-close" type="button" aria-label="Close menu">&times;</button>' +
        '<nav class="mobile-nav">' +
        '<a href="' + r + 'furniture.html" class="mobile-link" data-section="furniture">Furniture</a>' +
        '<a href="' + r + 'joinery.html" class="mobile-link" data-section="joinery">Joinery</a>' +
        '<a href="' + r + 'woodturning.html" class="mobile-link" data-section="woodturning">Woodturning &amp; Homeware</a>' +
        '<a href="' + r + 'restoration.html" class="mobile-link" data-section="restoration">Restoration &amp; Repair</a>' +
        '<a href="' + r + 'gallery.html" class="mobile-link" data-section="gallery">Gallery</a>' +
        '<a href="' + r + 'shop.html" class="mobile-link" data-section="shop">Shop</a>' +
        '<a href="' + r + 'blog.html" class="mobile-link" data-section="blog">Blog</a>' +
        '<a href="' + r + 'about.html" class="mobile-link" data-section="about">About</a>' +
        '<a href="' + r + 'contact.html" class="mobile-link" data-section="contact">Contact</a>' +
        '</nav>' +
        '</div>';

    if (s) {
        s.insertAdjacentHTML('afterend', html);
    }

    // Mark current page in nav (T5). Subdirectories activate their parent
    // section via the URL's first path segment.
    var path = window.location.pathname.replace(/\/index\.html$/, '/');
    var seg = path.split('/').filter(Boolean)[0] || 'index';
    var section = seg.replace(/\.html$/, '');
    document.querySelectorAll('[data-section="' + section + '"]').forEach(function (el) {
        el.classList.add('nav-active');
        el.setAttribute('aria-current', 'page');
    });
}());

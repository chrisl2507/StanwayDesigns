/* nav.js — shared navigation
   Root pages:    <script src="nav.js" data-root=""></script>
   Subdir pages:  <script src="../nav.js" data-root="../"></script>
*/
(function () {
    var s = document.currentScript;
    var r = s ? (s.getAttribute('data-root') || '') : '';

    var html =
        '<nav class="luxury-nav">' +
        '<div class="nav-container">' +
        '<a href="' + r + 'index.html" class="logo">' +
        '<img src="' + r + 'includes/images/Logo/Logo.webp" alt="Stanway Designs" class="logo-img" decoding="async" width="531" height="484" srcset="' + r + 'includes/images/Logo/Logo.webp 531w" sizes="50px">' +
        '</a>' +
        '<ul class="nav-links">' +
        '<li><a href="' + r + 'furniture.html" class="nav-link">Furniture</a></li>' +
        '<li><a href="' + r + 'joinery.html" class="nav-link">Joinery</a></li>' +
        '<li><a href="' + r + 'woodturning.html" class="nav-link">Woodturning &amp; Homeware</a></li>' +
        '<li><a href="' + r + 'restoration.html" class="nav-link">Restoration &amp; Repair</a></li>' +
        '<li><a href="' + r + 'gallery.html" class="nav-link">Gallery</a></li>' +
        '<li><a href="' + r + 'shop.html" class="nav-link">Shop</a></li>' +
        '<li><a href="' + r + 'about.html" class="nav-link">About</a></li>' +
        '<li><a href="' + r + 'contact.html" class="nav-link nav-cta">Contact</a></li>' +
        '</ul>' +
        '<button class="menu-toggle" aria-label="Toggle menu"><span></span><span></span><span></span></button>' +
        '</div>' +
        '</nav>' +
        '<div class="mobile-menu">' +
        '<nav class="mobile-nav">' +
        '<a href="' + r + 'furniture.html" class="mobile-link">Furniture</a>' +
        '<a href="' + r + 'joinery.html" class="mobile-link">Joinery</a>' +
        '<a href="' + r + 'woodturning.html" class="mobile-link">Woodturning &amp; Homeware</a>' +
        '<a href="' + r + 'restoration.html" class="mobile-link">Restoration &amp; Repair</a>' +
        '<a href="' + r + 'gallery.html" class="mobile-link">Gallery</a>' +
        '<a href="' + r + 'shop.html" class="mobile-link">Shop</a>' +
        '<a href="' + r + 'about.html" class="mobile-link">About</a>' +
        '<a href="' + r + 'contact.html" class="mobile-link">Contact</a>' +
        '</nav>' +
        '</div>';

    if (s) {
        s.insertAdjacentHTML('afterend', html);
    }
}());

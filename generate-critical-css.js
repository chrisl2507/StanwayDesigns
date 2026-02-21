const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');

const BASE = '/home/user/StanwayDesigns';
const css = fs.readFileSync(path.join(BASE, 'styles-luxury.css'), 'utf8');

// Extract critical above-the-fold CSS:
// - Reset & variables (lines 1-100)
// - Containers (needed for layout)
// - Navigation (always visible)
// - Hero section (first thing visible)
// - Page hero (for subpages)
// - Fade-in base (prevents flash of unstyled content)
// - Mobile menu (z-index positioning)

// Build critical CSS by extracting specific sections
const critical = `
/* Critical CSS - inlined for first paint */
*{margin:0;padding:0;box-sizing:border-box}
:root{--coral:#EC9176;--coral-light:#F4A995;--coral-dark:#E17A5A;--warm-brown:#2C2420;--text-dark:#3D3530;--mid-gray:#6B5E56;--light-gray:#E0D8D0;--warm-white:#FAF8F4;--cream:#F5F0EB;--linen:#EDE8E1;--white:#FFFFFF;--black:#2C2420;--charcoal:#3D3530;--dark-gray:#6B5E56;--gold:#EC9176;--gold-light:#F4A995;--gold-dark:#E17A5A;--font-heading:'Cormorant',serif;--font-body:'Inter',sans-serif;--space-unit:8px;--space-xs:calc(var(--space-unit)*1);--space-sm:calc(var(--space-unit)*2);--space-md:calc(var(--space-unit)*3);--space-lg:calc(var(--space-unit)*6);--space-xl:calc(var(--space-unit)*7);--space-2xl:calc(var(--space-unit)*9);--space-3xl:calc(var(--space-unit)*12);--transition-fast:0.2s cubic-bezier(0.4,0,0.2,1);--transition-base:0.3s cubic-bezier(0.4,0,0.2,1);--transition-slow:0.6s cubic-bezier(0.4,0,0.2,1);--transition-smooth:0.8s cubic-bezier(0.65,0,0.35,1)}
html{overflow-x:hidden}
body{font-family:var(--font-body);font-size:16px;line-height:1.7;color:var(--text-dark);background:var(--warm-white);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;overflow-x:hidden}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}
ul{list-style:none}
button{font-family:inherit;cursor:pointer;border:none;background:none}
.container{max-width:1400px;margin:0 auto;padding:0 5%}
.container-full{padding:0 5%}
.luxury-nav{position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(250,248,244,0.95);border-bottom:1px solid var(--light-gray);transition:box-shadow var(--transition-base)}
.luxury-nav.scrolled{box-shadow:0 2px 20px rgba(44,36,32,0.08)}
.nav-container{max-width:1600px;margin:0 auto;padding:20px 5%;display:flex;align-items:center;justify-content:space-between}
.logo{display:flex;align-items:center}
.logo-img{height:50px;width:auto}
.nav-links{display:none;gap:40px;align-items:center}
.nav-link{font-size:14px;font-weight:400;letter-spacing:1.5px;text-transform:uppercase;color:var(--mid-gray);position:relative;padding:8px 0}
.menu-toggle{display:flex;flex-direction:column;gap:6px;padding:8px}
.menu-toggle span{width:28px;height:2px;background:var(--text-dark);transition:all var(--transition-base)}
@media(min-width:1024px){.nav-links{display:flex}.menu-toggle{display:none}}
.mobile-menu{position:fixed;top:0;left:0;right:0;bottom:0;background:var(--warm-brown);z-index:999;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity var(--transition-smooth)}
.mobile-menu.active{opacity:1;pointer-events:auto}
.hero-luxury{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden}
.hero-bg{position:absolute;inset:0;overflow:hidden}
.hero-image{width:100%;height:100%;object-fit:cover;object-position:center}
.hero-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(44,36,32,0.5) 0%,rgba(44,36,32,0.15) 50%,rgba(44,36,32,0.3) 100%)}
.hero-content{position:relative;z-index:1;text-align:center;max-width:1000px;padding:0 5%}
.hero-label{display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:40px}
.hero-label .line{width:40px;height:1px;background:var(--coral)}
.hero-label .text{font-size:12px;font-weight:400;letter-spacing:3px;text-transform:uppercase;color:var(--coral-light)}
.hero-title{font-family:var(--font-heading);font-size:clamp(48px,8vw,96px);font-weight:600;line-height:1.1;color:var(--white);letter-spacing:-1px;margin-bottom:32px}
.title-line{display:block}
.hero-subtitle{font-size:18px;font-weight:300;letter-spacing:1px;color:rgba(255,255,255,0.9);margin-bottom:48px}
.hero-buttons{display:flex;gap:24px;justify-content:center;flex-wrap:wrap}
.btn-primary,.btn-secondary,.btn-outline{display:inline-flex;align-items:center;gap:12px;padding:16px 32px;font-size:13px;font-weight:500;letter-spacing:2px;text-transform:uppercase;position:relative;overflow:hidden;border-radius:8px}
.btn-primary{background:var(--coral);color:var(--white)}
.btn-secondary{border:1px solid rgba(255,255,255,0.3);color:var(--white)}
.page-hero-luxury{position:relative;min-height:60vh;display:flex;align-items:center;justify-content:center;margin-top:72px;overflow:hidden}
.page-hero-content{position:relative;z-index:1;text-align:center;max-width:800px;padding:0 5%}
.page-hero-title{font-family:var(--font-heading);font-size:clamp(48px,8vw,84px);font-weight:600;line-height:1.1;color:var(--white);margin-bottom:24px;letter-spacing:-1px}
.page-hero-subtitle{font-size:18px;font-weight:300;letter-spacing:1px;color:rgba(255,255,255,0.8)}
.fade-in{opacity:0;transition:opacity 0.3s ease}
.fade-in.visible{opacity:1}
@media(max-width:768px){:root{--space-3xl:calc(var(--space-unit)*8);--space-2xl:calc(var(--space-unit)*6);--space-xl:calc(var(--space-unit)*5)}.hero-luxury{min-height:80vh}.hero-title{font-size:clamp(36px,10vw,56px)}.hero-subtitle{font-size:16px}.hero-buttons{flex-direction:column;width:100%}.btn-primary,.btn-secondary,.btn-outline{width:100%;justify-content:center;padding:16px 24px;min-height:48px}.nav-container{padding:16px 5%}.logo-img{height:40px}.page-hero-luxury{min-height:45vh}.page-hero-title{font-size:clamp(32px,9vw,56px)}.page-hero-subtitle{font-size:16px}}
`;

// Minify the critical CSS
const minified = new CleanCSS({ level: 2 }).minify(critical);
console.log(`Critical CSS size: ${minified.styles.length} bytes`);
fs.writeFileSync(path.join(BASE, 'critical.min.css'), minified.styles);

// Now update all HTML files to inline critical CSS and async-load the full stylesheet
const htmlFiles = [
  'index.html',
  'about.html',
  'gallery.html',
  'services.html',
  'products.html',
  'tabletop.html',
  'replicas.html',
  'blog.html',
  'privacy.html',
  'blog/choosing-timber.html',
  'blog/oil-vs-lacquer.html',
  'blog/why-joinery-matters.html',
  'products/film-props.html',
  'products/gaming-tables.html',
  'products/the-odyssey.html',
];

const criticalStyle = `<style>${minified.styles}</style>`;

for (const file of htmlFiles) {
  const filePath = path.join(BASE, file);
  let html = fs.readFileSync(filePath, 'utf8');

  const cssHref = file.includes('/') ? '../styles-luxury.min.css' : 'styles-luxury.min.css';

  // Replace the render-blocking stylesheet link with:
  // 1. Inline critical CSS
  // 2. Async-loaded full stylesheet
  const oldLink = `<link rel="stylesheet" href="${cssHref}">`;
  const newLink = `${criticalStyle}\n    <link rel="stylesheet" href="${cssHref}" media="print" onload="this.media='all'">\n    <noscript><link rel="stylesheet" href="${cssHref}"></noscript>`;

  if (html.includes(oldLink)) {
    html = html.replace(oldLink, newLink);
    fs.writeFileSync(filePath, html);
    console.log(`Updated: ${file}`);
  } else {
    console.log(`SKIPPED (no match): ${file}`);
  }
}

console.log('\nDone!');

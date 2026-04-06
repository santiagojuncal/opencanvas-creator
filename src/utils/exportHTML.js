const GOOGLE_FONTS_MAP = {
  'Playfair Display': 'Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400',
  'Source Sans 3': 'Source+Sans+3:wght@300;400;500;600',
  'Inter': 'Inter:wght@300;400;500;600;700',
  'Sora': 'Sora:wght@300;400;500;600;700',
  'DM Sans': 'DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700',
  'Fraunces': 'Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;1,9..144,400',
  'Cormorant Garamond': 'Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400',
  'Nunito': 'Nunito:wght@300;400;500;600;700',
  'Bebas Neue': 'Bebas+Neue',
  'Barlow': 'Barlow:wght@300;400;500;600;700',
  'Cabinet Grotesk': 'Cabinet+Grotesk:wght@400;500;700;800',
  'Plus Jakarta Sans': 'Plus+Jakarta+Sans:wght@300;400;500;600;700',
}

function googleFontsUrl(headingFont, bodyFont) {
  const fonts = new Set()
  if (GOOGLE_FONTS_MAP[headingFont]) fonts.add(GOOGLE_FONTS_MAP[headingFont])
  if (GOOGLE_FONTS_MAP[bodyFont]) fonts.add(GOOGLE_FONTS_MAP[bodyFont])
  if (fonts.size === 0) return ''
  return `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${[...fonts].join('&family=')}&display=swap" rel="stylesheet">`
}

function cssVariables(styles) {
  return `
  --color-primary: ${styles.primaryColor};
  --color-secondary: ${styles.secondaryColor};
  --color-accent: ${styles.accentColor};
  --color-bg: ${styles.backgroundColor};
  --color-surface: ${styles.surfaceColor};
  --color-text: ${styles.textColor};
  --color-text-secondary: ${styles.textSecondaryColor};
  --color-border: ${styles.borderColor};
  --font-heading: '${styles.headingFont}', Georgia, serif;
  --font-body: '${styles.bodyFont}', system-ui, sans-serif;
  --radius: ${styles.borderRadius};
  --max-width: ${styles.maxWidth};`
}

function renderNavbar(props, styles) {
  const links = (props.links || []).map(l =>
    `<a href="${escHtml(l.href)}">${escHtml(l.text)}</a>`
  ).join('\n        ')
  return `
  <header class="oc-navbar">
    <div class="oc-container oc-navbar__inner">
      <div class="oc-navbar__logo">${escHtml(props.logo)}</div>
      <nav class="oc-navbar__links">
        ${links}
      </nav>
      ${props.showCta ? `<a href="${escHtml(props.ctaLink)}" class="oc-btn oc-btn--primary oc-btn--sm">${escHtml(props.ctaText)}</a>` : ''}
      <button class="oc-navbar__toggle" aria-label="Menú" onclick="this.closest('.oc-navbar').classList.toggle('is-open')">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>`
}

function getBgStyle(bg) {
  if (!bg || bg.type === 'none' || !bg.type) return ''
  if (bg.type === 'color' && bg.color) return `background:${bg.color};`
  if (bg.type === 'gradient') {
    const s = bg.gradientStart || '#2563eb'
    const e = bg.gradientEnd || '#1e40af'
    const d = bg.gradientDir || '135deg'
    return `background:linear-gradient(${d},${s},${e});`
  }
  if (bg.type === 'image' && bg.imageUrl) {
    return `background-image:url('${bg.imageUrl}');background-size:cover;background-position:center;background-repeat:no-repeat;position:relative;`
  }
  return ''
}

function getBgOverlayHtml(bg) {
  if (!bg || bg.type !== 'image') return ''
  const opacity = Number(bg.overlayOpacity ?? 0.4)
  if (opacity <= 0) return ''
  const color = bg.overlayColor || '#000000'
  return `<div style="position:absolute;inset:0;background:${color};opacity:${opacity};pointer-events:none;z-index:0;"></div>`
}

function renderHero(props) {
  const headline = escHtml(props.headline).replace(/\n/g, '<br>')
  const bgStyle = getBgStyle(props.background)
  const overlay = getBgOverlayHtml(props.background)
  const isImgBg = props.background?.type === 'image'
  const textStyle = isImgBg ? 'color:#fff;' : ''
  const subStyle = isImgBg ? 'color:rgba(255,255,255,0.85);' : ''
  return `
  <section class="oc-hero oc-hero--${props.textAlign}" style="min-height:${props.minHeight || '85vh'};${bgStyle}">
    ${overlay}
    <div class="oc-container oc-hero__content" style="position:relative;z-index:1;">
      <h1 class="oc-hero__headline" style="${textStyle}">${headline}</h1>
      <p class="oc-hero__sub" style="${subStyle}">${escHtml(props.subheadline).replace(/\n/g, '<br>')}</p>
      <div class="oc-hero__actions">
        <a href="${escHtml(props.ctaLink)}" class="oc-btn oc-btn--primary oc-btn--lg">${escHtml(props.ctaText)}</a>
        ${props.showSecondary ? `<a href="${escHtml(props.secondaryCtaLink)}" class="oc-btn oc-btn--outline oc-btn--lg">${escHtml(props.secondaryCtaText)}</a>` : ''}
      </div>
    </div>
  </section>`
}

function renderTextSection(props) {
  const bgStyle = getBgStyle(props.background)
  const overlay = getBgOverlayHtml(props.background)
  const isImgBg = props.background?.type === 'image'
  const textStyle = isImgBg ? 'color:#fff;' : ''
  const subStyle = isImgBg ? 'color:rgba(255,255,255,0.85);' : ''
  return `
  <section class="oc-text-section" style="${bgStyle}">
    ${overlay}
    <div class="oc-container oc-text-section__inner oc-text-section--${props.textAlign}" style="position:relative;z-index:1;">
      ${props.showHeading !== false ? `<h2 class="oc-section-heading" style="${textStyle}">${escHtml(props.heading)}</h2>` : ''}
      <div class="oc-prose" style="${subStyle}">${escHtml(props.content).replace(/\n/g, '<br>')}</div>
    </div>
  </section>`
}

function renderImage(props) {
  return `
  <section class="oc-image-section">
    <div class="oc-container">
      <figure class="oc-image-wrap" style="border-radius:${props.borderRadius || '0'}">
        <img
          src="${escHtml(props.src)}"
          alt="${escHtml(props.alt)}"
          style="height:${props.height};object-fit:${props.objectFit || 'cover'};border-radius:${props.borderRadius || '0'}"
          loading="lazy"
        />
        ${props.caption ? `<figcaption>${escHtml(props.caption)}</figcaption>` : ''}
      </figure>
    </div>
  </section>`
}

function renderButton(props) {
  return `
  <section class="oc-button-section oc-button-section--${props.align || 'center'}">
    <div class="oc-container">
      <a href="${escHtml(props.link)}" class="oc-btn oc-btn--${props.variant || 'primary'} oc-btn--${props.size || 'large'}">${escHtml(props.text)}</a>
    </div>
  </section>`
}

function renderFeatures(props) {
  const bgStyle = getBgStyle(props.background)
  const overlay = getBgOverlayHtml(props.background)
  const isImgBg = props.background?.type === 'image'
  const textStyle = isImgBg ? 'color:#fff;' : ''
  const subStyle = isImgBg ? 'color:rgba(255,255,255,0.8);' : ''
  const items = (props.items || []).map(item => `
        <article class="oc-feature-card" style="${isImgBg ? 'background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);backdrop-filter:blur(8px);' : ''}">
          <div class="oc-feature-card__icon" aria-hidden="true">${item.icon}</div>
          <h3 class="oc-feature-card__title" style="${textStyle}">${escHtml(item.title)}</h3>
          <p class="oc-feature-card__desc" style="${subStyle}">${escHtml(item.description)}</p>
        </article>`).join('')
  return `
  <section class="oc-features" style="${bgStyle}">
    ${overlay}
    <div class="oc-container" style="position:relative;z-index:1;">
      ${props.heading ? `<h2 class="oc-section-heading oc-section-heading--center" style="${textStyle}">${escHtml(props.heading)}</h2>` : ''}
      ${props.subheading ? `<p class="oc-section-sub" style="${subStyle}">${escHtml(props.subheading)}</p>` : ''}
      <div class="oc-features__grid oc-features__grid--${props.columns || 3}">
        ${items}
      </div>
    </div>
  </section>`
}

function renderTestimonial(props) {
  const bgStyle = getBgStyle(props.background)
  const overlay = getBgOverlayHtml(props.background)
  const isImgBg = props.background?.type === 'image'
  const textStyle = isImgBg ? 'color:#fff;' : ''
  const subStyle = isImgBg ? 'color:rgba(255,255,255,0.75);' : ''
  return `
  <section class="oc-testimonial" style="${bgStyle}">
    ${overlay}
    <div class="oc-container oc-testimonial__inner" style="position:relative;z-index:1;">
      <blockquote class="oc-testimonial__quote" style="${textStyle}">${escHtml(props.quote)}</blockquote>
      <footer class="oc-testimonial__author">
        ${props.avatar ? `<img src="${escHtml(props.avatar)}" alt="${escHtml(props.author)}" class="oc-testimonial__avatar" loading="lazy" />` : `<div class="oc-testimonial__avatar-placeholder">${escHtml(props.author).charAt(0)}</div>`}
        <div>
          <cite class="oc-testimonial__name" style="${textStyle}">${escHtml(props.author)}</cite>
          <span class="oc-testimonial__role" style="${subStyle}">${escHtml(props.role)}</span>
        </div>
      </footer>
    </div>
  </section>`
}

function renderPricing(props) {
  const bgStyle = getBgStyle(props.background)
  const overlay = getBgOverlayHtml(props.background)
  const isImgBg = props.background?.type === 'image'
  const textStyle = isImgBg ? 'color:#fff;' : ''
  const subStyle = isImgBg ? 'color:rgba(255,255,255,0.75);' : ''
  const plans = (props.plans || []).map(plan => `
        <article class="oc-pricing-card${plan.highlighted ? ' oc-pricing-card--featured' : ''}" style="${isImgBg ? 'background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.2);backdrop-filter:blur(8px);' : ''}">
          ${plan.highlighted ? '<div class="oc-pricing-card__badge">Más Popular</div>' : ''}
          <h3 class="oc-pricing-card__name" style="${textStyle}">${escHtml(plan.name)}</h3>
          <div class="oc-pricing-card__price" style="${textStyle}">
            <span class="oc-pricing-card__amount">${escHtml(plan.price)}</span>
            ${plan.period ? `<span class="oc-pricing-card__period" style="${subStyle}">${escHtml(plan.period)}</span>` : ''}
          </div>
          <ul class="oc-pricing-card__features">
            ${(plan.features || []).map(f => `<li style="${subStyle}">✓ ${escHtml(f)}</li>`).join('\n            ')}
          </ul>
          <a href="#contacto" class="oc-btn oc-btn--${plan.highlighted ? 'primary' : 'outline'} oc-btn--full">${escHtml(plan.cta)}</a>
        </article>`).join('')
  return `
  <section class="oc-pricing" style="${bgStyle}">
    ${overlay}
    <div class="oc-container" style="position:relative;z-index:1;">
      ${props.heading ? `<h2 class="oc-section-heading oc-section-heading--center" style="${textStyle}">${escHtml(props.heading)}</h2>` : ''}
      ${props.subheading ? `<p class="oc-section-sub" style="${subStyle}">${escHtml(props.subheading)}</p>` : ''}
      <div class="oc-pricing__grid">
        ${plans}
      </div>
    </div>
  </section>`
}

function renderForm(props) {
  const formAction = props.submitEmail ? `mailto:${props.submitEmail}` : '#'
  const fields = (props.fields || []).map(field => {
    const labelHtml = `<label for="${field.id}">${escHtml(field.label)}${field.required ? ' <span aria-hidden="true">*</span>' : ''}</label>`
    if (field.type === 'textarea') {
      return `
          <div class="oc-form__field">
            ${labelHtml}
            <textarea id="${field.id}" name="${escHtml(field.label)}" placeholder="${escHtml(field.placeholder)}"${field.required ? ' required' : ''} rows="5"></textarea>
          </div>`
    }
    if (field.type === 'select') {
      const opts = (field.options || '').split('|').map(o => `<option value="${escHtml(o.trim())}">${escHtml(o.trim())}</option>`).join('')
      return `
          <div class="oc-form__field">
            ${labelHtml}
            <select id="${field.id}" name="${escHtml(field.label)}"${field.required ? ' required' : ''}>
              <option value="">Seleccioná una opción</option>
              ${opts}
            </select>
          </div>`
    }
    return `
          <div class="oc-form__field">
            ${labelHtml}
            <input type="${field.type}" id="${field.id}" name="${escHtml(field.label)}" placeholder="${escHtml(field.placeholder)}"${field.required ? ' required' : ''} />
          </div>`
  }).join('')

  const bgStyle = getBgStyle(props.background)
  const overlay = getBgOverlayHtml(props.background)
  const isImgBg = props.background?.type === 'image'
  const textStyle = isImgBg ? 'color:#fff;' : ''
  const subStyle = isImgBg ? 'color:rgba(255,255,255,0.8);' : ''
  return `
  <section class="oc-form-section" id="${props.formId || 'contacto'}" style="${bgStyle}">
    ${overlay}
    <div class="oc-container oc-form-section__inner" style="position:relative;z-index:1;">
      ${props.heading ? `<h2 class="oc-section-heading oc-section-heading--center" style="${textStyle}">${escHtml(props.heading)}</h2>` : ''}
      ${props.description ? `<p class="oc-section-sub" style="${subStyle}">${escHtml(props.description)}</p>` : ''}
      <form class="oc-form" action="${formAction}" method="POST" style="${isImgBg ? 'background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);backdrop-filter:blur(8px);' : ''}">
        ${fields}
        <button type="submit" class="oc-btn oc-btn--primary oc-btn--lg oc-btn--full">${escHtml(props.submitText)}</button>
      </form>
    </div>
  </section>`
}

function renderCarousel(props) {
  const slides = props.slides || []
  if (slides.length === 0) return ''
  const height = props.height || '520px'
  const align = props.textAlign || 'center'
  const overlayOpacity = Number(props.overlayOpacity ?? 0.45)
  const overlayColor = props.overlayColor || '#000000'
  const speed = props.speed || 4000
  const carouselId = `oc-car-${Math.random().toString(36).substr(2, 6)}`

  const slidesHtml = slides.map((s, i) => `
    <div class="oc-carousel__slide${i === 0 ? ' is-active' : ''}" data-index="${i}">
      <div class="oc-carousel__bg" style="background-image:url('${escHtml(s.image || '')}')"></div>
      <div class="oc-carousel__overlay" style="opacity:${overlayOpacity};background:${overlayColor}"></div>
      <div class="oc-carousel__content oc-carousel__content--${align}">
        <h2 class="oc-carousel__title">${escHtml(s.title)}</h2>
        ${s.description ? `<p class="oc-carousel__desc">${escHtml(s.description)}</p>` : ''}
        ${s.cta ? `<a href="${escHtml(s.ctaLink || '#')}" class="oc-btn oc-btn--primary oc-btn--lg">${escHtml(s.cta)}</a>` : ''}
      </div>
    </div>`).join('')

  const dotsHtml = props.showDots && slides.length > 1 ? `
    <div class="oc-carousel__dots">
      ${slides.map((_, i) => `<button class="oc-carousel__dot${i === 0 ? ' is-active' : ''}" data-index="${i}" aria-label="Slide ${i + 1}"></button>`).join('')}
    </div>` : ''

  const arrowsHtml = props.showArrows && slides.length > 1 ? `
    <button class="oc-carousel__arrow oc-carousel__arrow--prev" aria-label="Anterior">&#8249;</button>
    <button class="oc-carousel__arrow oc-carousel__arrow--next" aria-label="Siguiente">&#8250;</button>` : ''

  const progressHtml = props.autoplay ? `<div class="oc-carousel__progress"><div class="oc-carousel__progress-bar"></div></div>` : ''

  return `
  <section class="oc-carousel" id="${carouselId}" style="height:${height}" data-autoplay="${props.autoplay ? speed : 0}">
    <div class="oc-carousel__track">
      ${slidesHtml}
    </div>
    ${arrowsHtml}
    ${dotsHtml}
    ${progressHtml}
  </section>
  <script>
  (function() {
    var car = document.getElementById('${carouselId}');
    if (!car) return;
    var slides = car.querySelectorAll('.oc-carousel__slide');
    var dots = car.querySelectorAll('.oc-carousel__dot');
    var bar = car.querySelector('.oc-carousel__progress-bar');
    var current = 0;
    var total = slides.length;
    var autoplay = parseInt(car.dataset.autoplay) || 0;
    var timer;

    function goTo(n) {
      slides[current].classList.remove('is-active');
      if (dots[current]) dots[current].classList.remove('is-active');
      current = (n + total) % total;
      slides[current].classList.add('is-active');
      if (dots[current]) dots[current].classList.add('is-active');
      if (bar) { bar.style.transition='none'; bar.style.width='0%'; setTimeout(function(){ bar.style.transition='width '+autoplay+'ms linear'; bar.style.width='100%'; }, 20); }
    }

    var prevBtn = car.querySelector('.oc-carousel__arrow--prev');
    var nextBtn = car.querySelector('.oc-carousel__arrow--next');
    if (prevBtn) prevBtn.addEventListener('click', function(){ clearInterval(timer); goTo(current-1); if(autoplay) startTimer(); });
    if (nextBtn) nextBtn.addEventListener('click', function(){ clearInterval(timer); goTo(current+1); if(autoplay) startTimer(); });
    dots.forEach(function(d){ d.addEventListener('click', function(){ clearInterval(timer); goTo(parseInt(d.dataset.index)); if(autoplay) startTimer(); }); });

    function startTimer() {
      if (!autoplay) return;
      timer = setInterval(function(){ goTo(current+1); }, autoplay);
      if (bar) { bar.style.transition='none'; bar.style.width='0%'; setTimeout(function(){ bar.style.transition='width '+autoplay+'ms linear'; bar.style.width='100%'; }, 20); }
    }
    if (autoplay) startTimer();
  })();
  </script>`
}

function renderDivider(props) {
  return `
  <div class="oc-divider oc-divider--${props.style}" style="margin:${props.spacing || '48px'} 0" role="separator"></div>`
}

function renderSpacer(props) {
  return `<div class="oc-spacer" style="height:${props.height || '64px'}" aria-hidden="true"></div>`
}

function renderFooter(props) {
  const bgStyle = getBgStyle(props.background)
  const overlay = getBgOverlayHtml(props.background)
  const isImgBg = props.background?.type === 'image'
  const textStyle = isImgBg ? 'color:#fff;' : ''
  const subStyle = isImgBg ? 'color:rgba(255,255,255,0.7);' : ''
  const colsHtml = (props.columns || []).map(col => `
        <div class="oc-footer__col">
          <h4 style="${textStyle}">${escHtml(col.heading)}</h4>
          <ul>
            ${(col.links || []).map(l => `<li><a href="${escHtml(l.href)}" style="${subStyle}">${escHtml(l.text)}</a></li>`).join('\n            ')}
          </ul>
        </div>`).join('')

  return `
  <footer class="oc-footer" style="${bgStyle}">
    ${overlay}
    <div class="oc-container oc-footer__inner" style="position:relative;z-index:1;">
      <div class="oc-footer__brand">
        <div class="oc-footer__logo" style="${textStyle}">${escHtml(props.logo)}</div>
        ${props.tagline ? `<p class="oc-footer__tagline" style="${subStyle}">${escHtml(props.tagline)}</p>` : ''}
      </div>
      ${colsHtml ? `<div class="oc-footer__cols">${colsHtml}</div>` : ''}
    </div>
    <div class="oc-footer__bottom" style="${isImgBg ? 'border-top:1px solid rgba(255,255,255,0.15);' : ''}">
      <div class="oc-container" style="${subStyle}">${escHtml(props.copyright)}</div>
    </div>
  </footer>`
}

function renderComponent(component) {
  const { type, props } = component
  switch (type) {
    case 'navbar': return renderNavbar(props)
    case 'hero': return renderHero(props)
    case 'textSection': return renderTextSection(props)
    case 'image': return renderImage(props)
    case 'button': return renderButton(props)
    case 'features': return renderFeatures(props)
    case 'testimonial': return renderTestimonial(props)
    case 'pricing': return renderPricing(props)
    case 'form': return renderForm(props)
    case 'carousel': return renderCarousel(props)
    case 'divider': return renderDivider(props)
    case 'spacer': return renderSpacer(props)
    case 'footer': return renderFooter(props)
    default: return ''
  }
}

function escHtml(str) {
  if (str === undefined || str === null) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function buildCSS(styles) {
  return `/* =============================================
   OpenCanvas Creator — Generated CSS
   ============================================= */

:root {${cssVariables(styles)}
}

/* Reset & Base */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  background-color: var(--color-bg);
  color: var(--color-text);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}
img { max-width: 100%; height: auto; display: block; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }

/* Container */
.oc-container {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}

/* Typography */
h1, h2, h3, h4 { font-family: var(--font-heading); line-height: 1.2; }

/* =============================================
   Buttons
   ============================================= */
.oc-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-body);
  font-weight: 600;
  letter-spacing: 0.01em;
  border-radius: var(--radius);
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  border: 2px solid transparent;
  white-space: nowrap;
}
.oc-btn--primary {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}
.oc-btn--primary:hover { filter: brightness(1.1); transform: translateY(-1px); }
.oc-btn--secondary {
  background: var(--color-secondary);
  color: #fff;
  border-color: var(--color-secondary);
}
.oc-btn--outline {
  background: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}
.oc-btn--outline:hover { background: var(--color-primary); color: #fff; }
.oc-btn--ghost {
  background: transparent;
  color: var(--color-text);
  border-color: var(--color-border);
}
.oc-btn--sm { padding: 8px 18px; font-size: 0.875rem; }
.oc-btn--md { padding: 12px 24px; font-size: 1rem; }
.oc-btn--lg, .oc-btn--large { padding: 16px 36px; font-size: 1.0625rem; }
.oc-btn--full { width: 100%; }

/* =============================================
   Navbar
   ============================================= */
.oc-navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(12px);
}
.oc-navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  gap: 32px;
}
.oc-navbar__logo {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-primary);
  flex-shrink: 0;
}
.oc-navbar__links {
  display: flex;
  align-items: center;
  gap: 28px;
  flex: 1;
}
.oc-navbar__links a {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  font-weight: 500;
  transition: color 0.2s;
}
.oc-navbar__links a:hover { color: var(--color-primary); }
.oc-navbar__toggle { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
.oc-navbar__toggle span { display: block; width: 22px; height: 2px; background: var(--color-text); border-radius: 2px; transition: all 0.3s; }

/* =============================================
   Hero
   ============================================= */
.oc-hero {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-bg) 60%);
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}
.oc-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, color-mix(in srgb, var(--color-primary) 12%, transparent), transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}
.oc-hero__content { width: 100%; }
.oc-hero--center .oc-hero__content { text-align: center; max-width: 760px; margin: 0 auto; }
.oc-hero--left .oc-hero__content { text-align: left; max-width: 680px; }
.oc-hero__headline {
  font-size: clamp(2.5rem, 5vw, 4.25rem);
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
}
.oc-hero__sub {
  font-size: clamp(1.0625rem, 2vw, 1.25rem);
  color: var(--color-text-secondary);
  max-width: 560px;
  margin-bottom: 40px;
  line-height: 1.7;
}
.oc-hero--center .oc-hero__sub { margin-left: auto; margin-right: auto; }
.oc-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}
.oc-hero--center .oc-hero__actions { justify-content: center; }

/* =============================================
   Section Headings
   ============================================= */
.oc-section-heading {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.02em;
  margin-bottom: 16px;
}
.oc-section-heading--center { text-align: center; }
.oc-section-sub {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  max-width: 560px;
  margin-bottom: 56px;
  line-height: 1.65;
}
.oc-section-heading--center + .oc-section-sub { text-align: center; margin-left: auto; margin-right: auto; }

/* =============================================
   Text Section
   ============================================= */
.oc-text-section { padding: 80px 0; }
.oc-text-section__inner { max-width: 720px; }
.oc-text-section--center .oc-text-section__inner { margin: 0 auto; text-align: center; }
.oc-text-section--right .oc-text-section__inner { margin-left: auto; text-align: right; }
.oc-text-section .oc-section-heading { margin-bottom: 24px; }
.oc-prose {
  font-size: 1.0625rem;
  color: var(--color-text-secondary);
  line-height: 1.8;
}

/* =============================================
   Image
   ============================================= */
.oc-image-section { padding: 0 0 80px; }
.oc-image-wrap { overflow: hidden; margin: 0; }
.oc-image-wrap img { width: 100%; }
.oc-image-wrap figcaption {
  text-align: center;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-top: 12px;
}

/* =============================================
   Button Section
   ============================================= */
.oc-button-section { padding: 40px 0; }
.oc-button-section--center .oc-container { text-align: center; }
.oc-button-section--left .oc-container { text-align: left; }
.oc-button-section--right .oc-container { text-align: right; }

/* =============================================
   Features
   ============================================= */
.oc-features { padding: 96px 0; background: var(--color-surface); }
.oc-features__grid { display: grid; gap: 32px; }
.oc-features__grid--2 { grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); }
.oc-features__grid--3 { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
.oc-features__grid--4 { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }
.oc-feature-card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: calc(var(--radius) * 1.5);
  padding: 32px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.oc-feature-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.08); }
.oc-feature-card__icon { font-size: 2.25rem; margin-bottom: 20px; }
.oc-feature-card__title { font-size: 1.1875rem; font-weight: 600; margin-bottom: 10px; color: var(--color-text); }
.oc-feature-card__desc { font-size: 0.9375rem; color: var(--color-text-secondary); line-height: 1.7; }

/* =============================================
   Testimonial
   ============================================= */
.oc-testimonial { padding: 96px 0; }
.oc-testimonial__inner {
  max-width: 680px;
  margin: 0 auto;
  text-align: center;
}
.oc-testimonial__quote {
  font-family: var(--font-heading);
  font-size: clamp(1.25rem, 2.5vw, 1.625rem);
  font-style: italic;
  color: var(--color-text);
  line-height: 1.6;
  margin-bottom: 36px;
}
.oc-testimonial__author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}
.oc-testimonial__avatar,
.oc-testimonial__avatar-placeholder {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}
.oc-testimonial__avatar-placeholder {
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
}
.oc-testimonial__name {
  display: block;
  font-style: normal;
  font-weight: 600;
  color: var(--color-text);
}
.oc-testimonial__role { font-size: 0.875rem; color: var(--color-text-secondary); }

/* =============================================
   Pricing
   ============================================= */
.oc-pricing { padding: 96px 0; background: var(--color-surface); }
.oc-pricing__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  align-items: start;
}
.oc-pricing-card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: calc(var(--radius) * 2);
  padding: 36px 32px;
  position: relative;
}
.oc-pricing-card--featured {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary), 0 20px 60px rgba(0,0,0,0.1);
}
.oc-pricing-card__badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-primary);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 4px 16px;
  border-radius: 999px;
  white-space: nowrap;
}
.oc-pricing-card__name { font-size: 1.0625rem; font-weight: 600; margin-bottom: 16px; }
.oc-pricing-card__price { display: flex; align-items: baseline; gap: 4px; margin-bottom: 24px; }
.oc-pricing-card__amount { font-family: var(--font-heading); font-size: 2.5rem; font-weight: 700; }
.oc-pricing-card__period { font-size: 0.9375rem; color: var(--color-text-secondary); }
.oc-pricing-card__features { margin-bottom: 32px; display: flex; flex-direction: column; gap: 10px; }
.oc-pricing-card__features li { font-size: 0.9375rem; color: var(--color-text-secondary); padding-left: 4px; }

/* =============================================
   Form
   ============================================= */
.oc-form-section { padding: 96px 0; }
.oc-form-section__inner { max-width: 560px; margin: 0 auto; }
.oc-form {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: calc(var(--radius) * 2);
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.oc-form__field { display: flex; flex-direction: column; gap: 8px; }
.oc-form__field label { font-size: 0.875rem; font-weight: 600; color: var(--color-text); }
.oc-form__field label span { color: var(--color-primary); }
.oc-form__field input,
.oc-form__field textarea,
.oc-form__field select {
  padding: 12px 16px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius);
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-text);
  background: var(--color-bg);
  transition: border-color 0.2s, box-shadow 0.2s;
  appearance: none;
  -webkit-appearance: none;
}
.oc-form__field input:focus,
.oc-form__field textarea:focus,
.oc-form__field select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 15%, transparent);
}
.oc-form__field textarea { resize: vertical; min-height: 120px; }

/* =============================================
   Divider
   ============================================= */
.oc-divider { border: none; }
.oc-divider--line { border-top: 1px solid var(--color-border); }
.oc-divider--dots {
  text-align: center;
  color: var(--color-border);
  font-size: 1.5rem;
  letter-spacing: 0.5em;
}
.oc-divider--dots::before { content: '···'; }

/* =============================================
   Footer
   ============================================= */
.oc-footer {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: 64px 0 0;
}
.oc-footer__inner {
  display: flex;
  gap: 64px;
  padding-bottom: 48px;
  flex-wrap: wrap;
}
.oc-footer__brand { flex: 1; min-width: 200px; }
.oc-footer__logo {
  font-family: var(--font-heading);
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 12px;
}
.oc-footer__tagline { font-size: 0.9375rem; color: var(--color-text-secondary); line-height: 1.6; }
.oc-footer__cols { display: flex; gap: 48px; flex-wrap: wrap; }
.oc-footer__col h4 { font-size: 0.8125rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-text); margin-bottom: 16px; }
.oc-footer__col ul { display: flex; flex-direction: column; gap: 10px; }
.oc-footer__col a { font-size: 0.9375rem; color: var(--color-text-secondary); transition: color 0.2s; }
.oc-footer__col a:hover { color: var(--color-primary); }
.oc-footer__bottom {
  border-top: 1px solid var(--color-border);
  padding: 20px 0;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

/* =============================================
   Carousel
   ============================================= */
.oc-carousel {
  position: relative;
  overflow: hidden;
  background: #111;
}
.oc-carousel__track { position: absolute; inset: 0; }
.oc-carousel__slide {
  position: absolute; inset: 0;
  opacity: 0;
  transition: opacity 0.7s ease;
}
.oc-carousel__slide.is-active { opacity: 1; }
.oc-carousel__bg {
  position: absolute; inset: 0;
  background-size: cover;
  background-position: center;
}
.oc-carousel__overlay {
  position: absolute; inset: 0;
  pointer-events: none;
}
.oc-carousel__content {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  justify-content: center;
  padding: 48px 64px;
  z-index: 2;
}
.oc-carousel__content--center { align-items: center; text-align: center; }
.oc-carousel__content--left { align-items: flex-start; text-align: left; }
.oc-carousel__content--right { align-items: flex-end; text-align: right; }
.oc-carousel__title {
  font-size: clamp(1.75rem, 4vw, 3rem);
  font-weight: 700;
  color: #fff;
  line-height: 1.15;
  margin-bottom: 16px;
  max-width: 700px;
}
.oc-carousel__desc {
  font-size: clamp(0.9375rem, 1.5vw, 1.125rem);
  color: rgba(255,255,255,0.85);
  line-height: 1.65;
  margin-bottom: 28px;
  max-width: 560px;
}
.oc-carousel__arrow {
  position: absolute;
  top: 50%; transform: translateY(-50%);
  z-index: 10;
  width: 48px; height: 48px;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s;
  line-height: 1;
}
.oc-carousel__arrow:hover { background: rgba(255,255,255,0.3); }
.oc-carousel__arrow--prev { left: 20px; }
.oc-carousel__arrow--next { right: 20px; }
.oc-carousel__dots {
  position: absolute;
  bottom: 24px; left: 50%; transform: translateX(-50%);
  z-index: 10;
  display: flex; gap: 8px;
}
.oc-carousel__dot {
  width: 8px; height: 8px;
  border-radius: 99px;
  background: rgba(255,255,255,0.4);
  border: none; cursor: pointer;
  transition: all 0.3s ease; padding: 0;
}
.oc-carousel__dot.is-active { width: 24px; background: #fff; }
.oc-carousel__progress {
  position: absolute; bottom: 0; left: 0;
  width: 100%; height: 3px;
  background: rgba(255,255,255,0.2);
  z-index: 10;
}
.oc-carousel__progress-bar {
  height: 100%;
  background: var(--color-primary);
  width: 0%;
}

/* =============================================
   Responsive
   ============================================= */
@media (max-width: 768px) {
  .oc-container { padding: 0 16px; }

  /* Navbar */
  .oc-navbar__links { display: none; }
  .oc-navbar__toggle { display: flex; }
  .oc-navbar.is-open .oc-navbar__links {
    display: flex; flex-direction: column;
    position: absolute; top: 64px; left: 0; right: 0;
    background: var(--color-bg);
    padding: 20px 16px;
    border-bottom: 1px solid var(--color-border);
    gap: 16px; z-index: 99;
  }
  .oc-navbar.is-open .oc-btn { display: none; }

  /* Hero */
  .oc-hero { padding: 52px 0; }
  .oc-hero__actions { flex-direction: column; align-items: stretch; }
  .oc-hero--center .oc-hero__actions { align-items: center; }

  /* Features */
  .oc-features { padding: 56px 0; }
  .oc-features__grid--2,
  .oc-features__grid--3,
  .oc-features__grid--4 { grid-template-columns: 1fr; gap: 16px; }
  .oc-feature-card { padding: 24px 20px; }

  /* Pricing */
  .oc-pricing { padding: 56px 0; }
  .oc-pricing__grid { grid-template-columns: 1fr; }
  .oc-pricing-card { padding: 28px 20px; }

  /* Form */
  .oc-form-section { padding: 56px 0; }
  .oc-form { padding: 24px 16px; }

  /* Testimonial */
  .oc-testimonial { padding: 56px 0; }

  /* Text section */
  .oc-text-section { padding: 52px 0; }

  /* Footer */
  .oc-footer { padding: 44px 0 0; }
  .oc-footer__inner { flex-direction: column; gap: 28px; }
  .oc-footer__cols { flex-direction: column; gap: 20px; }

  /* Carousel */
  .oc-carousel__content { padding: 32px 24px; }
  .oc-carousel__arrow { width: 40px; height: 40px; font-size: 1.25rem; }
  .oc-carousel__arrow--prev { left: 10px; }
  .oc-carousel__arrow--next { right: 10px; }
}

@media (max-width: 480px) {
  .oc-hero__headline { font-size: clamp(1.75rem, 8vw, 2.5rem); }
  .oc-hero__sub { font-size: 1rem; }
  .oc-btn--lg, .oc-btn--large { padding: 14px 24px; font-size: 1rem; width: 100%; text-align: center; }
  .oc-hero__actions .oc-btn { width: 100%; justify-content: center; }
  .oc-section-heading { font-size: 1.625rem; }
}
`
}

export function exportToHTML(components, globalStyles, pageTitle = 'Mi Landing Page') {
  const fontsLink = googleFontsUrl(globalStyles.headingFont, globalStyles.bodyFont)
  const css = buildCSS(globalStyles)
  const bodyHTML = components.map(renderComponent).join('\n')

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escHtml(pageTitle)}</title>
  <meta name="description" content="${escHtml(pageTitle)}" />
  ${fontsLink}
  <style>
${css}
  </style>
</head>
<body>
${bodyHTML}
</body>
</html>`
}

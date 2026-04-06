import { useRef, useState, useEffect } from 'react'
import { useEditorStore } from '../../store/editorStore'

// ============================================================
// Inline text editing
// ============================================================
function InlineText({ tag: Tag = 'span', value, field, componentId, onSave, style = {}, className }) {
  const { updateComponent } = useEditorStore()
  const ref = useRef()
  const [editing, setEditing] = useState(false)
  const savedValue = useRef(value)

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus()
      const range = document.createRange()
      range.selectNodeContents(ref.current)
      window.getSelection().removeAllRanges()
      window.getSelection().addRange(range)
    }
  }, [editing])

  function handleDoubleClick(e) {
    e.stopPropagation()
    savedValue.current = value
    setEditing(true)
  }

  function handleBlur() {
    setEditing(false)
    const newVal = ref.current?.innerText ?? ''
    if (newVal !== savedValue.current) {
      if (onSave) {
        onSave(newVal)
      } else if (field && componentId) {
        updateComponent(componentId, { [field]: newVal })
      }
    }
  }

  function handleKeyDown(e) {
    e.stopPropagation()
    if (e.key === 'Escape') {
      if (ref.current) ref.current.innerText = savedValue.current
      setEditing(false)
      ref.current?.blur()
    }
    if (e.key === 'Enter' && Tag !== 'p' && Tag !== 'div') {
      e.preventDefault()
      ref.current?.blur()
    }
  }

  return (
    <Tag
      ref={ref}
      contentEditable={editing}
      suppressContentEditableWarning
      onDoubleClick={handleDoubleClick}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      data-editable="true"
      style={{
        ...style,
        cursor: editing ? 'text' : 'default',
        outline: editing ? '2px solid #3b82f6' : 'none',
        outlineOffset: 4,
        borderRadius: 3,
      }}
      title={editing ? undefined : 'Doble clic para editar'}
      className={className}
    >
      {value}
    </Tag>
  )
}

// ============================================================
// Background helpers
// ============================================================
function getBackgroundStyle(bg) {
  if (!bg || bg.type === 'none' || !bg.type) return null
  if (bg.type === 'color' && bg.color) return { background: bg.color }
  if (bg.type === 'gradient') {
    return { background: `linear-gradient(${bg.gradientDir || '135deg'}, ${bg.gradientStart || '#2563eb'}, ${bg.gradientEnd || '#1e40af'})` }
  }
  if (bg.type === 'image' && bg.imageUrl) {
    return { backgroundImage: `url(${bg.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }
  }
  return null
}

function BgOverlay({ bg }) {
  if (!bg || bg.type !== 'image') return null
  const opacity = Number(bg.overlayOpacity ?? 0.4)
  if (opacity <= 0) return null
  return (
    <div style={{ position: 'absolute', inset: 0, background: bg.overlayColor || '#000', opacity, pointerEvents: 'none', zIndex: 1 }} />
  )
}

// ============================================================
// Main renderer
// ============================================================
export default function ComponentRenderer({ component }) {
  const { globalStyles, viewport } = useEditorStore()
  const { type, props, id } = component

  const cssVars = {
    '--p': globalStyles.primaryColor,
    '--s': globalStyles.secondaryColor,
    '--a': globalStyles.accentColor,
    '--bg': globalStyles.backgroundColor,
    '--surf': globalStyles.surfaceColor,
    '--txt': globalStyles.textColor,
    '--txt2': globalStyles.textSecondaryColor,
    '--border': globalStyles.borderColor,
    '--r': globalStyles.borderRadius,
    '--fh': `'${globalStyles.headingFont}', Georgia, serif`,
    '--fb': `'${globalStyles.bodyFont}', system-ui, sans-serif`,
    fontFamily: `'${globalStyles.bodyFont}', system-ui, sans-serif`,
  }

  const wrap = (content) => (
    <div style={{ ...cssVars, color: 'var(--txt)' }}>
      {content}
    </div>
  )

  switch (type) {
    case 'navbar':      return wrap(<NavbarPreview props={props} id={id} viewport={viewport} />)
    case 'hero':        return wrap(<HeroPreview props={props} id={id} viewport={viewport} />)
    case 'textSection': return wrap(<TextSectionPreview props={props} id={id} viewport={viewport} />)
    case 'image':       return wrap(<ImagePreview props={props} id={id} />)
    case 'button':      return wrap(<ButtonPreview props={props} id={id} />)
    case 'features':    return wrap(<FeaturesPreview props={props} id={id} viewport={viewport} />)
    case 'testimonial': return wrap(<TestimonialPreview props={props} id={id} />)
    case 'pricing':     return wrap(<PricingPreview props={props} id={id} viewport={viewport} />)
    case 'form':        return wrap(<FormPreview props={props} id={id} viewport={viewport} />)
    case 'carousel':    return wrap(<CarouselPreview props={props} id={id} />)
    case 'divider':     return wrap(<DividerPreview props={props} />)
    case 'spacer':      return wrap(<SpacerPreview props={props} />)
    case 'footer':      return wrap(<FooterPreview props={props} id={id} viewport={viewport} />)
    default: return null
  }
}

// ============================================================
// Shared sub-components
// ============================================================
function Btn({ variant = 'primary', size = 'md', children, style = {} }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    padding: size === 'lg' || size === 'large' ? '14px 32px' : size === 'sm' ? '7px 14px' : '10px 22px',
    borderRadius: 'var(--r)', fontFamily: 'var(--fb)', fontWeight: 600,
    fontSize: size === 'sm' ? '0.8125rem' : '0.9375rem',
    cursor: 'pointer', border: '2px solid', transition: 'all 0.2s',
    textDecoration: 'none', whiteSpace: 'nowrap', ...style,
  }
  if (variant === 'outline') return <span style={{ ...base, background: 'transparent', borderColor: 'var(--p)', color: 'var(--p)' }}>{children}</span>
  if (variant === 'secondary') return <span style={{ ...base, background: 'var(--s)', borderColor: 'var(--s)', color: '#fff' }}>{children}</span>
  if (variant === 'ghost') return <span style={{ ...base, background: 'transparent', borderColor: 'var(--border)', color: 'var(--txt)' }}>{children}</span>
  return <span style={{ ...base, background: 'var(--p)', borderColor: 'var(--p)', color: '#fff' }}>{children}</span>
}

// ============================================================
// Previews
// ============================================================

function NavbarPreview({ props, id, viewport }) {
  const isMobile = viewport === 'mobile'
  return (
    <nav style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)', padding: '0 24px', display: 'flex', alignItems: 'center', height: 60, gap: 24 }}>
      <InlineText tag="div" value={props.logo} field="logo" componentId={id}
        style={{ fontFamily: 'var(--fh)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--p)', flexShrink: 0 }}
      />
      {!isMobile && (
        <div style={{ display: 'flex', gap: 20, flex: 1 }}>
          {(props.links || []).slice(0, 4).map(l => (
            <span key={l.id} style={{ fontSize: '0.875rem', color: 'var(--txt2)', fontWeight: 500 }}>{l.text}</span>
          ))}
        </div>
      )}
      {isMobile && <div style={{ flex: 1 }} />}
      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 4 }}>
          <span style={{ display: 'block', width: 20, height: 2, background: 'var(--txt)', borderRadius: 2 }} />
          <span style={{ display: 'block', width: 20, height: 2, background: 'var(--txt)', borderRadius: 2 }} />
          <span style={{ display: 'block', width: 20, height: 2, background: 'var(--txt)', borderRadius: 2 }} />
        </div>
      ) : (
        props.showCta && <Btn size="sm">{props.ctaText}</Btn>
      )}
    </nav>
  )
}

function HeroPreview({ props, id, viewport }) {
  const isMobile = viewport === 'mobile'
  const isTablet = viewport === 'tablet'
  const bg = props.background
  const bgStyle = getBackgroundStyle(bg)
  const hasCustomBg = !!bgStyle
  const isImageBg = bg?.type === 'image'
  const textColor = isImageBg ? '#ffffff' : 'var(--txt)'
  const subtextColor = isImageBg ? 'rgba(255,255,255,0.85)' : 'var(--txt2)'
  const padH = isMobile ? '24px' : isTablet ? '32px' : '48px'
  const padV = isMobile ? '52px' : '80px'

  return (
    <section style={{
      minHeight: isMobile ? '60vh' : props.minHeight || '85vh',
      display: 'flex', alignItems: 'center',
      padding: `${padV} ${padH}`,
      position: 'relative', overflow: 'hidden',
      ...(hasCustomBg ? bgStyle : { background: 'linear-gradient(135deg, var(--surf) 0%, var(--bg) 60%)' }),
    }}>
      <BgOverlay bg={bg} />
      <div style={{
        maxWidth: props.textAlign === 'center' ? 680 : 600,
        margin: props.textAlign === 'center' ? '0 auto' : '0',
        textAlign: props.textAlign || 'center',
        position: 'relative', zIndex: 2, width: '100%',
      }}>
        <InlineText tag="h1" value={props.headline} field="headline" componentId={id}
          style={{
            fontFamily: 'var(--fh)',
            fontSize: isMobile ? 'clamp(1.75rem, 8vw, 2.5rem)' : 'clamp(2.25rem, 5vw, 3.75rem)',
            fontWeight: 700, color: textColor, lineHeight: 1.1,
            letterSpacing: '-0.025em', marginBottom: 20, whiteSpace: 'pre-line',
          }}
        />
        <InlineText tag="p" value={props.subheadline} field="subheadline" componentId={id}
          style={{
            fontSize: isMobile ? '1rem' : 'clamp(1rem, 1.8vw, 1.2rem)',
            color: subtextColor, lineHeight: 1.7, marginBottom: 36,
            maxWidth: 540,
            margin: props.textAlign === 'center' ? '0 auto 36px' : '0 0 36px',
            whiteSpace: 'pre-line',
          }}
        />
        <div style={{
          display: 'flex', gap: 12, flexWrap: 'wrap',
          justifyContent: props.textAlign === 'center' ? 'center' : 'flex-start',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : undefined,
        }}>
          <Btn size="lg">{props.ctaText}</Btn>
          {props.showSecondary && <Btn variant="outline" size="lg">{props.secondaryCtaText}</Btn>}
        </div>
      </div>
    </section>
  )
}

function TextSectionPreview({ props, id, viewport }) {
  const isMobile = viewport === 'mobile'
  const bg = props.background
  const bgStyle = getBackgroundStyle(bg)
  const isImageBg = bg?.type === 'image'
  const textColor = isImageBg ? '#ffffff' : 'var(--txt)'
  const subtextColor = isImageBg ? 'rgba(255,255,255,0.85)' : 'var(--txt2)'
  const pad = isMobile ? '48px 24px' : '72px 48px'

  return (
    <section style={{ padding: pad, position: 'relative', overflow: 'hidden', ...(bgStyle || { background: 'var(--bg)' }) }}>
      <BgOverlay bg={bg} />
      <div style={{ maxWidth: 720, margin: props.textAlign === 'center' ? '0 auto' : '0', textAlign: props.textAlign || 'left', position: 'relative', zIndex: 2 }}>
        {props.showHeading !== false && (
          <InlineText tag="div" value={props.heading} field="heading" componentId={id}
            style={{ fontFamily: 'var(--fh)', fontSize: isMobile ? '1.5rem' : 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, color: textColor, letterSpacing: '-0.02em', marginBottom: 12 }}
          />
        )}
        <InlineText tag="p" value={props.content} field="content" componentId={id}
          style={{ fontSize: '1.0625rem', color: subtextColor, lineHeight: 1.8, whiteSpace: 'pre-line' }}
        />
      </div>
    </section>
  )
}

function ImagePreview({ props }) {
  return (
    <div style={{ background: 'var(--bg)' }}>
      <figure style={{ margin: 0, overflow: 'hidden', borderRadius: props.borderRadius || 0 }}>
        <img
          src={props.src} alt={props.alt}
          style={{ width: '100%', height: props.height || '400px', objectFit: props.objectFit || 'cover', display: 'block', borderRadius: props.borderRadius || 0 }}
          onError={e => { e.target.src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'><rect fill='%23e2e8f0' width='800' height='400'/><text x='400' y='200' text-anchor='middle' dominant-baseline='middle' fill='%2394a3b8' font-family='sans-serif' font-size='18'>🖼 Imagen</text></svg>` }}
        />
        {props.caption && <figcaption style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--txt2)', padding: '10px 0' }}>{props.caption}</figcaption>}
      </figure>
    </div>
  )
}

function ButtonPreview({ props, id }) {
  const alignMap = { center: 'center', left: 'flex-start', right: 'flex-end' }
  return (
    <div style={{ padding: '32px 48px', display: 'flex', justifyContent: alignMap[props.align] || 'center', background: 'var(--bg)' }}>
      <InlineText tag="span" value={props.text} field="text" componentId={id}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          padding: props.size === 'large' || props.size === 'lg' ? '14px 32px' : props.size === 'sm' ? '7px 14px' : '10px 22px',
          borderRadius: 'var(--r)', fontFamily: 'var(--fb)', fontWeight: 600, fontSize: '0.9375rem',
          border: '2px solid', background: props.variant === 'outline' ? 'transparent' : 'var(--p)',
          borderColor: 'var(--p)', color: props.variant === 'outline' ? 'var(--p)' : '#fff', whiteSpace: 'nowrap',
        }}
      />
    </div>
  )
}

function FeaturesPreview({ props, id, viewport }) {
  const isMobile = viewport === 'mobile'
  const isTablet = viewport === 'tablet'
  const cols = Number(props.columns) || 3
  const responsiveCols = isMobile ? 1 : isTablet ? Math.min(2, cols) : cols
  const bg = props.background
  const bgStyle = getBackgroundStyle(bg)
  const isImageBg = bg?.type === 'image'
  const textColor = isImageBg ? '#ffffff' : 'var(--txt)'
  const subtextColor = isImageBg ? 'rgba(255,255,255,0.8)' : 'var(--txt2)'
  const pad = isMobile ? '56px 24px' : '80px 32px'

  return (
    <section style={{ padding: pad, position: 'relative', overflow: 'hidden', ...(bgStyle || { background: 'var(--surf)' }) }}>
      <BgOverlay bg={bg} />
      <div style={{ maxWidth: 1060, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {props.heading && (
          <InlineText tag="div" value={props.heading} field="heading" componentId={id}
            style={{ fontFamily: 'var(--fh)', fontSize: isMobile ? '1.5rem' : 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, color: textColor, letterSpacing: '-0.02em', marginBottom: 12, textAlign: 'center' }}
          />
        )}
        {props.subheading && (
          <InlineText tag="p" value={props.subheading} field="subheading" componentId={id}
            style={{ textAlign: 'center', color: subtextColor, fontSize: '1.0625rem', marginBottom: 48, maxWidth: 540, margin: '0 auto 48px' }}
          />
        )}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${responsiveCols}, 1fr)`, gap: isMobile ? 16 : 24 }}>
          {(props.items || []).map(item => (
            <div key={item.id} style={{
              background: isImageBg ? 'rgba(255,255,255,0.1)' : 'var(--bg)',
              border: `1px solid ${isImageBg ? 'rgba(255,255,255,0.2)' : 'var(--border)'}`,
              borderRadius: 'calc(var(--r) * 1.5)', padding: isMobile ? '20px' : '28px 24px',
              backdropFilter: isImageBg ? 'blur(8px)' : undefined,
            }}>
              <div style={{ fontSize: '2rem', marginBottom: 14 }}>{item.icon}</div>
              <div style={{ fontFamily: 'var(--fh)', fontWeight: 600, fontSize: '1.0625rem', color: textColor, marginBottom: 8 }}>{item.title}</div>
              <p style={{ fontSize: '0.9rem', color: subtextColor, lineHeight: 1.65 }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialPreview({ props, id }) {
  const initial = (props.author || '?').charAt(0)
  const bg = props.background
  const bgStyle = getBackgroundStyle(bg)
  const isImageBg = bg?.type === 'image'
  const textColor = isImageBg ? '#ffffff' : 'var(--txt)'
  const subtextColor = isImageBg ? 'rgba(255,255,255,0.75)' : 'var(--txt2)'

  return (
    <section style={{ padding: '80px 48px', position: 'relative', overflow: 'hidden', ...(bgStyle || { background: 'var(--bg)' }) }}>
      <BgOverlay bg={bg} />
      <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <InlineText tag="blockquote" value={props.quote} field="quote" componentId={id}
          style={{ fontFamily: 'var(--fh)', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontStyle: 'italic', color: textColor, lineHeight: 1.65, marginBottom: 32, quotes: 'none' }}
        />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
          {props.avatar ? (
            <img src={props.avatar} alt={props.author} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--p)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--fh)', fontWeight: 700, fontSize: '1.25rem' }}>
              {initial}
            </div>
          )}
          <div style={{ textAlign: 'left' }}>
            <InlineText tag="div" value={props.author} field="author" componentId={id} style={{ fontWeight: 600, color: textColor, fontSize: '0.9375rem' }} />
            <InlineText tag="div" value={props.role} field="role" componentId={id} style={{ fontSize: '0.8125rem', color: subtextColor }} />
          </div>
        </div>
      </div>
    </section>
  )
}

function PricingPreview({ props, id, viewport }) {
  const isMobile = viewport === 'mobile'
  const isTablet = viewport === 'tablet'
  const planCount = (props.plans || []).length
  const cols = isMobile ? 1 : isTablet ? Math.min(2, planCount) : Math.min(3, planCount)
  const bg = props.background
  const bgStyle = getBackgroundStyle(bg)
  const isImageBg = bg?.type === 'image'
  const textColor = isImageBg ? '#ffffff' : 'var(--txt)'
  const subtextColor = isImageBg ? 'rgba(255,255,255,0.75)' : 'var(--txt2)'
  const pad = isMobile ? '56px 24px' : '80px 32px'

  return (
    <section style={{ padding: pad, position: 'relative', overflow: 'hidden', ...(bgStyle || { background: 'var(--surf)' }) }}>
      <BgOverlay bg={bg} />
      <div style={{ maxWidth: 1060, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {props.heading && (
          <InlineText tag="div" value={props.heading} field="heading" componentId={id}
            style={{ fontFamily: 'var(--fh)', fontSize: isMobile ? '1.5rem' : 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, color: textColor, letterSpacing: '-0.02em', marginBottom: 12, textAlign: 'center' }}
          />
        )}
        {props.subheading && (
          <p style={{ textAlign: 'center', color: subtextColor, fontSize: '1.0625rem', marginBottom: 48, maxWidth: 500, margin: '0 auto 48px' }}>{props.subheading}</p>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: isMobile ? 16 : 20, alignItems: 'start' }}>
          {(props.plans || []).map(plan => (
            <div key={plan.id} style={{
              background: isImageBg ? 'rgba(255,255,255,0.1)' : 'var(--bg)',
              border: `${plan.highlighted ? '2px' : '1px'} solid ${plan.highlighted ? 'var(--p)' : isImageBg ? 'rgba(255,255,255,0.2)' : 'var(--border)'}`,
              borderRadius: 'calc(var(--r) * 2)', padding: isMobile ? '20px' : '28px 24px',
              position: 'relative', backdropFilter: isImageBg ? 'blur(8px)' : undefined,
              boxShadow: plan.highlighted ? '0 0 0 2px var(--p), 0 16px 40px rgba(0,0,0,0.1)' : 'none',
            }}>
              {plan.highlighted && (
                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--p)', color: '#fff', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '3px 14px', borderRadius: 999, whiteSpace: 'nowrap' }}>
                  Más Popular
                </div>
              )}
              <div style={{ fontWeight: 600, marginBottom: 12, color: textColor }}>{plan.name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 20 }}>
                <span style={{ fontFamily: 'var(--fh)', fontSize: '2.25rem', fontWeight: 700, color: textColor }}>{plan.price}</span>
                {plan.period && <span style={{ color: subtextColor, fontSize: '0.875rem' }}>{plan.period}</span>}
              </div>
              <ul style={{ marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {(plan.features || []).map((f, i) => (
                  <li key={i} style={{ fontSize: '0.875rem', color: subtextColor }}>✓ {f}</li>
                ))}
              </ul>
              <Btn variant={plan.highlighted ? 'primary' : 'outline'} style={{ width: '100%' }}>{plan.cta}</Btn>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FormPreview({ props, id, viewport }) {
  const isMobile = viewport === 'mobile'
  const bg = props.background
  const bgStyle = getBackgroundStyle(bg)
  const isImageBg = bg?.type === 'image'
  const textColor = isImageBg ? '#ffffff' : 'var(--txt)'
  const subtextColor = isImageBg ? 'rgba(255,255,255,0.8)' : 'var(--txt2)'
  const pad = isMobile ? '48px 24px' : '80px 48px'

  return (
    <section id={props.formId || 'contacto'} style={{ padding: pad, position: 'relative', overflow: 'hidden', ...(bgStyle || { background: 'var(--bg)' }) }}>
      <BgOverlay bg={bg} />
      <div style={{ maxWidth: 520, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {props.heading && (
          <InlineText tag="div" value={props.heading} field="heading" componentId={id}
            style={{ fontFamily: 'var(--fh)', fontSize: isMobile ? '1.5rem' : 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, color: textColor, letterSpacing: '-0.02em', marginBottom: 12, textAlign: 'center' }}
          />
        )}
        {props.description && <p style={{ textAlign: 'center', color: subtextColor, marginBottom: 32 }}>{props.description}</p>}
        <div style={{ background: isImageBg ? 'rgba(255,255,255,0.1)' : 'var(--surf)', border: `1px solid ${isImageBg ? 'rgba(255,255,255,0.2)' : 'var(--border)'}`, borderRadius: 'calc(var(--r) * 2)', padding: isMobile ? '24px 20px' : '36px 32px', display: 'flex', flexDirection: 'column', gap: 18, backdropFilter: isImageBg ? 'blur(8px)' : undefined }}>
          {(props.fields || []).map(field => (
            <div key={field.id} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: textColor }}>
                {field.label}{field.required && <span style={{ color: 'var(--p)', marginLeft: 2 }}>*</span>}
              </label>
              {field.type === 'textarea' ? (
                <textarea placeholder={field.placeholder} rows={3} readOnly style={{ padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--r)', fontFamily: 'var(--fb)', fontSize: '0.9375rem', background: 'var(--bg)', color: 'var(--txt2)', resize: 'none', outline: 'none' }} />
              ) : (
                <input type={field.type} placeholder={field.placeholder} readOnly style={{ padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--r)', fontFamily: 'var(--fb)', fontSize: '0.9375rem', background: 'var(--bg)', color: 'var(--txt2)', outline: 'none' }} />
              )}
            </div>
          ))}
          <Btn style={{ width: '100%', marginTop: 4 }}>{props.submitText}</Btn>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// Carousel
// ============================================================
function CarouselPreview({ props, id }) {
  const { updateComponent } = useEditorStore()
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const slides = props.slides || []
  const total = slides.length

  useEffect(() => {
    if (!props.autoplay || total <= 1) return
    const timer = setInterval(() => {
      goTo((prev) => (prev + 1) % total)
    }, props.speed || 4000)
    return () => clearInterval(timer)
  }, [props.autoplay, props.speed, total])

  function goTo(indexOrUpdater) {
    const next = typeof indexOrUpdater === 'function' ? indexOrUpdater(current) : indexOrUpdater
    if (next === current || isTransitioning) return
    setIsTransitioning(true)
    setCurrent(next)
    setTimeout(() => setIsTransitioning(false), 700)
  }

  if (total === 0) {
    return (
      <div style={{ height: props.height || '500px', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontFamily: 'var(--fb)' }}>
        Agrega slides desde el panel derecho
      </div>
    )
  }

  const slide = slides[current]
  const align = props.textAlign || 'center'
  const overlayOpacity = Number(props.overlayOpacity ?? 0.45)
  const overlayColor = props.overlayColor || '#000000'

  return (
    <div style={{ position: 'relative', height: props.height || '520px', overflow: 'hidden', background: '#111', userSelect: 'none' }}>
      {/* Slide backgrounds */}
      {slides.map((s, i) => (
        <div key={s.id} style={{
          position: 'absolute', inset: 0,
          backgroundImage: s.image ? `url(${s.image})` : undefined,
          background: s.image ? undefined : '#334155',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: i === current ? 1 : 0,
          transition: 'opacity 0.7s ease',
        }} />
      ))}

      {/* Overlay */}
      {overlayOpacity > 0 && (
        <div style={{ position: 'absolute', inset: 0, background: overlayColor, opacity: overlayOpacity, pointerEvents: 'none' }} />
      )}

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center',
        justifyContent: 'center',
        padding: '48px 64px',
        textAlign: align,
      }}>
        <h2 style={{ fontFamily: 'var(--fh)', fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 700, color: '#fff', marginBottom: 16, lineHeight: 1.15, maxWidth: 700 }}>
          {slide.title}
        </h2>
        {slide.description && (
          <p style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, marginBottom: 28, maxWidth: 560 }}>
            {slide.description}
          </p>
        )}
        {slide.cta && (
          <Btn size="lg">{slide.cta}</Btn>
        )}
      </div>

      {/* Arrows */}
      {props.showArrows && total > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); goTo(((current - 1) + total) % total) }}
            style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: 44, height: 44, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.125rem', transition: 'background 0.2s' }}
          >‹</button>
          <button
            onClick={e => { e.stopPropagation(); goTo((current + 1) % total) }}
            style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: 44, height: 44, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.125rem', transition: 'background 0.2s' }}
          >›</button>
        </>
      )}

      {/* Dots */}
      {props.showDots && total > 1 && (
        <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: 8 }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); goTo(i) }}
              style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 99, background: i === current ? '#fff' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }}
            />
          ))}
        </div>
      )}

      {/* Progress bar */}
      {props.autoplay && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, height: 3, background: 'rgba(255,255,255,0.3)', width: '100%', zIndex: 10 }}>
          <div
            key={current}
            style={{
              height: '100%', background: 'var(--p)',
              animation: `carousel-progress ${props.speed || 4000}ms linear forwards`,
            }}
          />
        </div>
      )}

      {/* Slide counter */}
      <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 10, background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '0.75rem', fontFamily: 'var(--fb)', padding: '4px 10px', borderRadius: 99, backdropFilter: 'blur(4px)' }}>
        {current + 1} / {total}
      </div>
    </div>
  )
}

function DividerPreview({ props }) {
  return (
    <div style={{ margin: `${props.spacing || '48px'} 48px` }}>
      {props.style === 'dots' ? (
        <div style={{ textAlign: 'center', color: 'var(--border)', fontSize: '1.5rem', letterSpacing: '0.5em' }}>···</div>
      ) : (
        <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />
      )}
    </div>
  )
}

function SpacerPreview({ props }) {
  return (
    <div style={{ height: props.height || '64px', background: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.015) 0px, rgba(0,0,0,0.015) 10px, transparent 10px, transparent 20px)' }} />
  )
}

function FooterPreview({ props, id, viewport }) {
  const isMobile = viewport === 'mobile'
  const bg = props.background
  const bgStyle = getBackgroundStyle(bg)
  const isImageBg = bg?.type === 'image'
  const textColor = isImageBg ? '#ffffff' : 'var(--txt)'
  const subtextColor = isImageBg ? 'rgba(255,255,255,0.7)' : 'var(--txt2)'

  return (
    <footer style={{ position: 'relative', overflow: 'hidden', borderTop: isImageBg ? 'none' : '1px solid var(--border)', padding: isMobile ? '40px 24px 0' : '48px 32px 0', ...(bgStyle || { background: 'var(--surf)' }) }}>
      <BgOverlay bg={bg} />
      <div style={{ maxWidth: 1060, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', gap: isMobile ? 28 : 48, flexWrap: 'wrap', flexDirection: isMobile ? 'column' : 'row', paddingBottom: 36 }}>
          <div style={{ flex: 1, minWidth: 160 }}>
            <InlineText tag="div" value={props.logo} field="logo" componentId={id}
              style={{ fontFamily: 'var(--fh)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--p)', marginBottom: 10 }}
            />
            {props.tagline && (
              <InlineText tag="p" value={props.tagline} field="tagline" componentId={id}
                style={{ fontSize: '0.875rem', color: subtextColor, lineHeight: 1.6 }}
              />
            )}
          </div>
          {!isMobile && (props.columns || []).map(col => (
            <div key={col.id}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: textColor, marginBottom: 12 }}>{col.heading}</div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {(col.links || []).map(l => <li key={l.id} style={{ fontSize: '0.875rem', color: subtextColor }}>{l.text}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${isImageBg ? 'rgba(255,255,255,0.15)' : 'var(--border)'}`, padding: '14px 0', fontSize: '0.8125rem', color: subtextColor }}>
          {props.copyright}
        </div>
      </div>
    </footer>
  )
}

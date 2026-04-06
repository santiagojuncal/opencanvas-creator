import { useEditorStore } from '../../store/editorStore'

// Renders a live preview of a component with the current global styles applied
export default function ComponentRenderer({ component }) {
  const { globalStyles } = useEditorStore()
  const { type, props } = component

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
    <div style={{ ...cssVars, background: 'var(--bg)', color: 'var(--txt)' }}>
      {content}
    </div>
  )

  switch (type) {
    case 'navbar': return wrap(<NavbarPreview props={props} />)
    case 'hero': return wrap(<HeroPreview props={props} />)
    case 'textSection': return wrap(<TextSectionPreview props={props} />)
    case 'image': return wrap(<ImagePreview props={props} />)
    case 'button': return wrap(<ButtonPreview props={props} />)
    case 'features': return wrap(<FeaturesPreview props={props} />)
    case 'testimonial': return wrap(<TestimonialPreview props={props} />)
    case 'pricing': return wrap(<PricingPreview props={props} />)
    case 'form': return wrap(<FormPreview props={props} />)
    case 'divider': return wrap(<DividerPreview props={props} />)
    case 'spacer': return wrap(<SpacerPreview props={props} />)
    case 'footer': return wrap(<FooterPreview props={props} />)
    default: return null
  }
}

// --- Shared sub-components ---
function Btn({ variant = 'primary', size = 'md', children, style = {} }) {
  const styles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: size === 'lg' || size === 'large' ? '14px 32px' : size === 'sm' ? '7px 14px' : '10px 22px',
    borderRadius: 'var(--r)',
    fontFamily: 'var(--fb)',
    fontWeight: 600,
    fontSize: size === 'sm' ? '0.8125rem' : '0.9375rem',
    cursor: 'pointer',
    border: '2px solid',
    transition: 'all 0.2s',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    ...style,
  }
  if (variant === 'primary') return <span style={{ ...styles, background: 'var(--p)', borderColor: 'var(--p)', color: '#fff' }}>{children}</span>
  if (variant === 'secondary') return <span style={{ ...styles, background: 'var(--s)', borderColor: 'var(--s)', color: '#fff' }}>{children}</span>
  if (variant === 'outline') return <span style={{ ...styles, background: 'transparent', borderColor: 'var(--p)', color: 'var(--p)' }}>{children}</span>
  if (variant === 'ghost') return <span style={{ ...styles, background: 'transparent', borderColor: 'var(--border)', color: 'var(--txt)' }}>{children}</span>
  return <span style={{ ...styles, background: 'var(--p)', borderColor: 'var(--p)', color: '#fff' }}>{children}</span>
}

function SectionHeading({ children, center, style = {} }) {
  return (
    <div style={{
      fontFamily: 'var(--fh)',
      fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
      fontWeight: 700,
      color: 'var(--txt)',
      letterSpacing: '-0.02em',
      marginBottom: 12,
      textAlign: center ? 'center' : 'left',
      ...style,
    }}>
      {children}
    </div>
  )
}

// --- Previews ---

function NavbarPreview({ props }) {
  return (
    <nav style={{
      background: 'var(--bg)',
      borderBottom: '1px solid var(--border)',
      padding: '0 32px',
      display: 'flex',
      alignItems: 'center',
      height: 60,
      gap: 32,
    }}>
      <div style={{ fontFamily: 'var(--fh)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--p)', flexShrink: 0 }}>
        {props.logo}
      </div>
      <div style={{ display: 'flex', gap: 24, flex: 1 }}>
        {(props.links || []).slice(0, 4).map(l => (
          <span key={l.id} style={{ fontSize: '0.875rem', color: 'var(--txt2)', fontWeight: 500 }}>{l.text}</span>
        ))}
      </div>
      {props.showCta && <Btn size="sm">{props.ctaText}</Btn>}
    </nav>
  )
}

function HeroPreview({ props }) {
  return (
    <section style={{
      minHeight: props.minHeight || '85vh',
      display: 'flex',
      alignItems: 'center',
      background: 'linear-gradient(135deg, var(--surf) 0%, var(--bg) 60%)',
      padding: '80px 48px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: '-40%',
        right: '-10%',
        width: 500,
        height: 500,
        background: 'radial-gradient(circle, rgba(var(--p-rgb,0,0,0), 0.07), transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />
      <div style={{
        maxWidth: props.textAlign === 'center' ? 680 : 600,
        margin: props.textAlign === 'center' ? '0 auto' : '0',
        textAlign: props.textAlign || 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        <h1 style={{
          fontFamily: 'var(--fh)',
          fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
          fontWeight: 700,
          color: 'var(--txt)',
          lineHeight: 1.1,
          letterSpacing: '-0.025em',
          marginBottom: 24,
          whiteSpace: 'pre-line',
        }}>
          {props.headline}
        </h1>
        <p style={{
          fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
          color: 'var(--txt2)',
          lineHeight: 1.7,
          marginBottom: 40,
          maxWidth: 540,
          margin: props.textAlign === 'center' ? '0 auto 40px' : '0 0 40px',
          whiteSpace: 'pre-line',
        }}>
          {props.subheadline}
        </p>
        <div style={{
          display: 'flex',
          gap: 14,
          flexWrap: 'wrap',
          justifyContent: props.textAlign === 'center' ? 'center' : 'flex-start',
        }}>
          <Btn size="lg">{props.ctaText}</Btn>
          {props.showSecondary && <Btn variant="outline" size="lg">{props.secondaryCtaText}</Btn>}
        </div>
      </div>
    </section>
  )
}

function TextSectionPreview({ props }) {
  return (
    <section style={{ padding: '72px 48px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 720, margin: props.textAlign === 'center' ? '0 auto' : '0', textAlign: props.textAlign || 'left' }}>
        {props.showHeading !== false && (
          <SectionHeading center={props.textAlign === 'center'}>{props.heading}</SectionHeading>
        )}
        <p style={{ fontSize: '1.0625rem', color: 'var(--txt2)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
          {props.content}
        </p>
      </div>
    </section>
  )
}

function ImagePreview({ props }) {
  return (
    <div style={{ background: 'var(--bg)', paddingBottom: 0 }}>
      <figure style={{ margin: 0, overflow: 'hidden', borderRadius: props.borderRadius || 0 }}>
        <img
          src={props.src}
          alt={props.alt}
          style={{
            width: '100%',
            height: props.height || '400px',
            objectFit: props.objectFit || 'cover',
            display: 'block',
            borderRadius: props.borderRadius || 0,
          }}
          onError={e => {
            e.target.src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'><rect fill='%23e2e8f0' width='800' height='400'/><text x='400' y='200' text-anchor='middle' dominant-baseline='middle' fill='%2394a3b8' font-family='sans-serif' font-size='18'>🖼 Imagen</text></svg>`
          }}
        />
        {props.caption && (
          <figcaption style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--txt2)', padding: '10px 0' }}>
            {props.caption}
          </figcaption>
        )}
      </figure>
    </div>
  )
}

function ButtonPreview({ props }) {
  const alignMap = { center: 'center', left: 'flex-start', right: 'flex-end' }
  return (
    <div style={{
      padding: '32px 48px',
      display: 'flex',
      justifyContent: alignMap[props.align] || 'center',
      background: 'var(--bg)',
    }}>
      <Btn variant={props.variant} size={props.size}>{props.text}</Btn>
    </div>
  )
}

function FeaturesPreview({ props }) {
  const cols = Number(props.columns) || 3
  return (
    <section style={{ padding: '80px 32px', background: 'var(--surf)' }}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>
        {props.heading && <SectionHeading center>{props.heading}</SectionHeading>}
        {props.subheading && (
          <p style={{ textAlign: 'center', color: 'var(--txt2)', fontSize: '1.0625rem', marginBottom: 52, maxWidth: 540, margin: '0 auto 52px' }}>
            {props.subheading}
          </p>
        )}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(cols, (props.items || []).length)}, 1fr)`,
          gap: 24,
        }}>
          {(props.items || []).map(item => (
            <div key={item.id} style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 'calc(var(--r) * 1.5)',
              padding: '28px 24px',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: 16 }}>{item.icon}</div>
              <div style={{ fontFamily: 'var(--fh)', fontWeight: 600, fontSize: '1.0625rem', color: 'var(--txt)', marginBottom: 8 }}>{item.title}</div>
              <p style={{ fontSize: '0.9rem', color: 'var(--txt2)', lineHeight: 1.65 }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialPreview({ props }) {
  const initial = (props.author || '?').charAt(0)
  return (
    <section style={{ padding: '80px 48px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
        <blockquote style={{
          fontFamily: 'var(--fh)',
          fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
          fontStyle: 'italic',
          color: 'var(--txt)',
          lineHeight: 1.65,
          marginBottom: 32,
          quotes: 'none',
        }}>
          {props.quote}
        </blockquote>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
          {props.avatar ? (
            <img src={props.avatar} alt={props.author} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              background: 'var(--p)', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--fh)', fontWeight: 700, fontSize: '1.25rem',
            }}>
              {initial}
            </div>
          )}
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: 600, color: 'var(--txt)', fontSize: '0.9375rem' }}>{props.author}</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--txt2)' }}>{props.role}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PricingPreview({ props }) {
  return (
    <section style={{ padding: '80px 32px', background: 'var(--surf)' }}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>
        {props.heading && <SectionHeading center>{props.heading}</SectionHeading>}
        {props.subheading && (
          <p style={{ textAlign: 'center', color: 'var(--txt2)', fontSize: '1.0625rem', marginBottom: 48, maxWidth: 500, margin: '0 auto 48px' }}>
            {props.subheading}
          </p>
        )}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(3, (props.plans || []).length)}, 1fr)`,
          gap: 20,
          alignItems: 'start',
        }}>
          {(props.plans || []).map(plan => (
            <div key={plan.id} style={{
              background: 'var(--bg)',
              border: `${plan.highlighted ? '2px' : '1px'} solid ${plan.highlighted ? 'var(--p)' : 'var(--border)'}`,
              borderRadius: 'calc(var(--r) * 2)',
              padding: '28px 24px',
              position: 'relative',
              boxShadow: plan.highlighted ? '0 0 0 2px var(--p), 0 16px 40px rgba(0,0,0,0.1)' : 'none',
            }}>
              {plan.highlighted && (
                <div style={{
                  position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                  background: 'var(--p)', color: '#fff',
                  fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
                  padding: '3px 14px', borderRadius: 999, whiteSpace: 'nowrap',
                }}>
                  Más Popular
                </div>
              )}
              <div style={{ fontWeight: 600, marginBottom: 12 }}>{plan.name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 20 }}>
                <span style={{ fontFamily: 'var(--fh)', fontSize: '2.25rem', fontWeight: 700 }}>{plan.price}</span>
                {plan.period && <span style={{ color: 'var(--txt2)', fontSize: '0.875rem' }}>{plan.period}</span>}
              </div>
              <ul style={{ marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {(plan.features || []).map((f, i) => (
                  <li key={i} style={{ fontSize: '0.875rem', color: 'var(--txt2)' }}>✓ {f}</li>
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

function FormPreview({ props }) {
  return (
    <section id={props.formId || 'contacto'} style={{ padding: '80px 48px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        {props.heading && <SectionHeading center>{props.heading}</SectionHeading>}
        {props.description && (
          <p style={{ textAlign: 'center', color: 'var(--txt2)', marginBottom: 36 }}>{props.description}</p>
        )}
        <div style={{
          background: 'var(--surf)',
          border: '1px solid var(--border)',
          borderRadius: 'calc(var(--r) * 2)',
          padding: '36px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}>
          {(props.fields || []).map(field => (
            <div key={field.id} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--txt)' }}>
                {field.label}{field.required && <span style={{ color: 'var(--p)', marginLeft: 2 }}>*</span>}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  placeholder={field.placeholder}
                  rows={4}
                  readOnly
                  style={{
                    padding: '10px 14px',
                    border: '1.5px solid var(--border)',
                    borderRadius: 'var(--r)',
                    fontFamily: 'var(--fb)',
                    fontSize: '0.9375rem',
                    background: 'var(--bg)',
                    color: 'var(--txt2)',
                    resize: 'none',
                    outline: 'none',
                  }}
                />
              ) : field.type === 'select' ? (
                <select
                  disabled
                  style={{
                    padding: '10px 14px',
                    border: '1.5px solid var(--border)',
                    borderRadius: 'var(--r)',
                    fontFamily: 'var(--fb)',
                    fontSize: '0.9375rem',
                    background: 'var(--bg)',
                    color: 'var(--txt2)',
                    appearance: 'none',
                  }}
                >
                  <option>Seleccioná una opción</option>
                  {(field.options || '').split('|').map((o, i) => <option key={i}>{o.trim()}</option>)}
                </select>
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  readOnly
                  style={{
                    padding: '10px 14px',
                    border: '1.5px solid var(--border)',
                    borderRadius: 'var(--r)',
                    fontFamily: 'var(--fb)',
                    fontSize: '0.9375rem',
                    background: 'var(--bg)',
                    color: 'var(--txt2)',
                    outline: 'none',
                  }}
                />
              )}
            </div>
          ))}
          <Btn style={{ width: '100%', marginTop: 4 }}>{props.submitText}</Btn>
        </div>
      </div>
    </section>
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

function FooterPreview({ props }) {
  return (
    <footer style={{
      background: 'var(--surf)',
      borderTop: '1px solid var(--border)',
      padding: '48px 32px 0',
    }}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', paddingBottom: 40 }}>
          <div style={{ flex: 1, minWidth: 160 }}>
            <div style={{ fontFamily: 'var(--fh)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--p)', marginBottom: 10 }}>
              {props.logo}
            </div>
            {props.tagline && (
              <p style={{ fontSize: '0.875rem', color: 'var(--txt2)', lineHeight: 1.6 }}>{props.tagline}</p>
            )}
          </div>
          {(props.columns || []).map(col => (
            <div key={col.id}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--txt)', marginBottom: 12 }}>
                {col.heading}
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {(col.links || []).map(l => (
                  <li key={l.id} style={{ fontSize: '0.875rem', color: 'var(--txt2)' }}>{l.text}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{
          borderTop: '1px solid var(--border)',
          padding: '16px 0',
          fontSize: '0.8125rem',
          color: 'var(--txt2)',
        }}>
          {props.copyright}
        </div>
      </div>
    </footer>
  )
}

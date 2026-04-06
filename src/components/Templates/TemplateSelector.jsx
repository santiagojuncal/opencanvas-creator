import { TEMPLATES } from '../../templates'

// Mini visual preview of template using CSS colors
const TEMPLATE_PREVIEW_COLORS = {
  blank: { bg: '#f8fafc', line1: '#e2e8f0', line2: '#e2e8f0', accent: '#e2e8f0' },
  startup: { bg: '#ffffff', line1: '#2563eb', line2: '#dbeafe', accent: '#2563eb' },
  agency: { bg: '#fafaf9', line1: '#18181b', line2: '#f4f4f5', accent: '#f97316' },
  personal: { bg: '#ffffff', line1: '#7c3aed', line2: '#faf5ff', accent: '#ec4899' },
  event: { bg: '#0c0a09', line1: '#dc2626', line2: '#1c1917', accent: '#fbbf24' },
  product: { bg: '#ffffff', line1: '#059669', line2: '#f0fdf4', accent: '#6366f1' },
}

function TemplateMiniPreview({ id, emoji }) {
  const colors = TEMPLATE_PREVIEW_COLORS[id] || TEMPLATE_PREVIEW_COLORS.blank
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: colors.bg,
      display: 'flex',
      flexDirection: 'column',
      padding: '16px 20px',
      gap: 10,
      position: 'relative',
    }}>
      {/* Navbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: 0.8 }}>
        <div style={{ width: 40, height: 6, background: colors.line1, borderRadius: 3 }} />
        <div style={{ flex: 1, display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
          {[1, 2, 3].map(i => <div key={i} style={{ width: 20, height: 4, background: colors.line2, borderRadius: 2 }} />)}
          <div style={{ width: 28, height: 14, background: colors.accent, borderRadius: 3 }} />
        </div>
      </div>
      {/* Hero */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        {id === 'blank' ? (
          <div style={{ fontSize: '2rem', opacity: 0.3 }}>{emoji}</div>
        ) : (
          <>
            <div style={{ width: '70%', height: 8, background: colors.line1, borderRadius: 4, opacity: 0.9 }} />
            <div style={{ width: '55%', height: 5, background: colors.line2, borderRadius: 3 }} />
            <div style={{ width: '45%', height: 4, background: colors.line2, borderRadius: 3, opacity: 0.6 }} />
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <div style={{ width: 44, height: 14, background: colors.accent, borderRadius: 3 }} />
              <div style={{ width: 40, height: 14, border: `1.5px solid ${colors.accent}`, borderRadius: 3 }} />
            </div>
          </>
        )}
      </div>
      {/* Features strip */}
      {id !== 'blank' && (
        <div style={{ display: 'flex', gap: 6 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ flex: 1, height: 18, background: colors.line2, borderRadius: 3, opacity: 0.8 }} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function TemplateSelector({ onSelect, onClose }) {
  return (
    <div className="template-overlay" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="template-modal">
        <div className="template-modal__header">
          <div>
            <div className="template-modal__title">Elegí una plantilla</div>
            <div className="template-modal__sub">
              Podés empezar desde una plantilla o con un lienzo en blanco. Todo se puede editar después.
            </div>
          </div>
        </div>

        <div className="template-modal__body">
          <div className="template-grid">
            {TEMPLATES.map(template => (
              <div
                key={template.id}
                className="template-card"
                onClick={() => onSelect(template)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && onSelect(template)}
              >
                <div className="template-card__preview">
                  <TemplateMiniPreview id={template.id} emoji={template.emoji} />
                </div>
                <div className="template-card__body">
                  <div className="template-card__name">{template.emoji} {template.name}</div>
                  <div className="template-card__desc">{template.description}</div>
                  {template.id !== 'blank' && (
                    <div style={{ marginTop: 8, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {(template.components || []).slice(0, 4).map(c => (
                        <span key={c.type + Math.random()} className="tag tag--primary" style={{ fontSize: '0.6rem' }}>
                          {c.type}
                        </span>
                      ))}
                      {template.components.length > 4 && (
                        <span className="tag tag--primary" style={{ fontSize: '0.6rem' }}>
                          +{template.components.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer hint */}
        <div style={{
          padding: '14px 28px',
          borderTop: '1px solid var(--ui-border)',
          fontSize: '0.8rem',
          color: 'var(--ui-text-3)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <span>💡</span>
          <span>Las plantillas son puntos de partida. Podés agregar, quitar y editar cualquier sección.</span>
        </div>
      </div>
    </div>
  )
}

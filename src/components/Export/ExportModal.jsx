import { useState, useMemo } from 'react'
import { useEditorStore } from '../../store/editorStore'
import { exportToHTML } from '../../utils/exportHTML'

export default function ExportModal({ onClose }) {
  const { components, globalStyles } = useEditorStore()
  const [tab, setTab] = useState('preview')
  const [pageTitle, setPageTitle] = useState('Mi Landing Page')
  const [copied, setCopied] = useState(false)

  const html = useMemo(
    () => exportToHTML(components, globalStyles, pageTitle),
    [components, globalStyles, pageTitle]
  )

  function handleDownload() {
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${pageTitle.replace(/\s+/g, '-').toLowerCase() || 'landing-page'}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleCopy() {
    navigator.clipboard.writeText(html).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    })
  }

  const lineCount = html.split('\n').length
  const sizeKb = (new TextEncoder().encode(html).length / 1024).toFixed(1)

  return (
    <div className="export-overlay" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="export-modal">
        <div className="export-modal__header">
          <div>
            <div className="export-modal__title">Exportar HTML</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--ui-text-2)', marginTop: 2 }}>
              {lineCount} líneas · {sizeKb} KB · {components.length} sección{components.length !== 1 ? 'es' : ''}
            </div>
          </div>
          <button className="export-modal__close" onClick={onClose}>✕</button>
        </div>

        {/* Page title */}
        <div style={{
          padding: '10px 24px',
          borderBottom: '1px solid var(--ui-border)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: 'var(--ui-raised)',
        }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--ui-text-2)', fontWeight: 500, flexShrink: 0 }}>Título de la página:</span>
          <input
            className="prop-input"
            value={pageTitle}
            onChange={e => setPageTitle(e.target.value)}
            placeholder="Mi Landing Page"
            style={{ flex: 1, maxWidth: 300 }}
          />
        </div>

        <div className="export-tabs">
          <button className={`export-tab${tab === 'preview' ? ' active' : ''}`} onClick={() => setTab('preview')}>
            Vista Previa
          </button>
          <button className={`export-tab${tab === 'code' ? ' active' : ''}`} onClick={() => setTab('code')}>
            Código HTML
          </button>
          <button className={`export-tab${tab === 'guide' ? ' active' : ''}`} onClick={() => setTab('guide')}>
            Cómo Publicar
          </button>
        </div>

        <div className="export-modal__body">
          {tab === 'preview' && (
            <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
              <iframe
                srcDoc={html}
                style={{
                  width: '100%',
                  height: '420px',
                  border: '1px solid var(--ui-border)',
                  borderRadius: 'var(--r-md)',
                  background: '#fff',
                }}
                title="Preview"
                sandbox="allow-same-origin"
              />
            </div>
          )}

          {tab === 'code' && (
            <div className="export-code-area">
              <pre className="export-code">{html}</pre>
            </div>
          )}

          {tab === 'guide' && (
            <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <GuideStep
                  number="1"
                  title="Descargá el archivo HTML"
                  desc='Hacé click en "Descargar HTML" para guardar el archivo en tu computadora. Es un archivo .html completamente autónomo.'
                />
                <GuideStep
                  number="2"
                  title="Elegí dónde publicar"
                  desc="Podés hostear tu landing page en cualquiera de estas plataformas gratuitas:"
                  extras={[
                    { name: 'Netlify Drop', desc: 'Arrastrá el archivo en netlify.com/drop. Listo en segundos, sin registro.' },
                    { name: 'GitHub Pages', desc: 'Subí el archivo a un repositorio público y activá GitHub Pages en Settings.' },
                    { name: 'Vercel', desc: 'Creá un proyecto y subí el archivo. Deploy automático.' },
                    { name: 'Tu propio servidor', desc: 'Subí el archivo por FTP/SFTP a cualquier hosting estándar.' },
                  ]}
                />
                <GuideStep
                  number="3"
                  title="Configurá tu dominio (opcional)"
                  desc="Una vez publicada, podés apuntar un dominio personalizado desde el panel de tu proveedor de hosting."
                />
                <GuideStep
                  number="4"
                  title="Conectá el formulario (opcional)"
                  desc="Para que el formulario de contacto funcione, podés usar servicios como Formspree, Basin o Netlify Forms. Reemplazá el atributo action del formulario con la URL que te provean."
                  code='<form action="https://formspree.io/f/tu-id" method="POST">'
                />
                <div style={{
                  background: 'var(--ui-accent-glow)',
                  border: '1px solid var(--ui-accent)',
                  borderRadius: 'var(--r-md)',
                  padding: '14px 16px',
                  fontSize: '0.875rem',
                  color: 'var(--ui-text-2)',
                  lineHeight: 1.6,
                }}>
                  <span style={{ color: 'var(--ui-accent)', fontWeight: 600 }}>💡 Sin backend necesario:</span>
                  {' '}El HTML exportado es 100% estático. No necesita servidor, base de datos ni conocimientos técnicos para publicarlo.
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="export-modal__footer">
          <span className="export-hint">
            {tab === 'code' ? 'Código HTML semántico, limpio y listo para producción.' : 'Archivo .html autónomo con CSS embebido.'}
          </span>
          <div className="export-actions">
            <button className="toolbar-btn toolbar-btn--outline" onClick={handleCopy}>
              {copied ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M2 7l3 3 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  ¡Copiado!
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="1" y="4" width="9" height="9" rx="1.5"/>
                    <path d="M4 4V2.5A1.5 1.5 0 0 1 5.5 1H11.5A1.5 1.5 0 0 1 13 2.5V8.5A1.5 1.5 0 0 1 11.5 10H10" strokeLinecap="round"/>
                  </svg>
                  Copiar código
                </>
              )}
            </button>
            <button className="toolbar-btn toolbar-btn--accent" onClick={handleDownload}>
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M8 2v9M5 8l3 3 3-3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12v1.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V12" strokeLinecap="round"/>
              </svg>
              Descargar HTML
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function GuideStep({ number, title, desc, extras, code }) {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <div style={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        background: 'var(--ui-accent)',
        color: '#0f0e0d',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: '0.8125rem',
        flexShrink: 0,
        marginTop: 2,
      }}>
        {number}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, color: 'var(--ui-text)', marginBottom: 6 }}>{title}</div>
        <p style={{ fontSize: '0.875rem', color: 'var(--ui-text-2)', lineHeight: 1.6, marginBottom: extras || code ? 10 : 0 }}>
          {desc}
        </p>
        {extras && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {extras.map(e => (
              <div key={e.name} style={{
                background: 'var(--ui-raised)',
                border: '1px solid var(--ui-border)',
                borderRadius: 'var(--r-sm)',
                padding: '10px 14px',
              }}>
                <span style={{ fontWeight: 600, color: 'var(--ui-text)', fontSize: '0.875rem' }}>{e.name}</span>
                <span style={{ color: 'var(--ui-text-2)', fontSize: '0.8125rem' }}> — {e.desc}</span>
              </div>
            ))}
          </div>
        )}
        {code && (
          <pre style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            background: '#0d1117',
            color: '#c9d1d9',
            padding: '10px 14px',
            borderRadius: 'var(--r-sm)',
            overflowX: 'auto',
          }}>
            {code}
          </pre>
        )}
      </div>
    </div>
  )
}

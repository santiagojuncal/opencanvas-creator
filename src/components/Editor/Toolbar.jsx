import { useState, useEffect } from 'react'
import { useEditorStore } from '../../store/editorStore'

const ViewportIcon = {
  desktop: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="2" width="14" height="10" rx="1.5"/>
      <path d="M5 14h6M8 12v2"/>
    </svg>
  ),
  tablet: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2.5" y="1" width="11" height="14" rx="1.5"/>
      <circle cx="8" cy="12.5" r="0.7" fill="currentColor" stroke="none"/>
    </svg>
  ),
  mobile: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="1" width="8" height="14" rx="1.5"/>
      <circle cx="8" cy="12.5" r="0.7" fill="currentColor" stroke="none"/>
    </svg>
  ),
}

export default function Toolbar({ onOpenTemplates, onExport }) {
  const { components, historyIndex, history, undo, redo, viewport, setViewport } = useEditorStore()
  const [pageTitle, setPageTitle] = useState('Mi Landing Page')

  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  useEffect(() => {
    function onKey(e) {
      const mod = e.ctrlKey || e.metaKey
      if (mod && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo() }
      if (mod && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); redo() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [undo, redo])

  return (
    <>
      {/* Logo */}
      <span className="toolbar-logo">OpenCanvas</span>

      <div className="toolbar-divider" />

      {/* Templates */}
      <button
        className="toolbar-btn"
        onClick={onOpenTemplates}
        title="Cambiar plantilla"
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1" y="1" width="6" height="6" rx="1"/>
          <rect x="9" y="1" width="6" height="6" rx="1"/>
          <rect x="1" y="9" width="6" height="6" rx="1"/>
          <rect x="9" y="9" width="6" height="6" rx="1"/>
        </svg>
        Plantillas
      </button>

      <div className="toolbar-divider" />

      {/* Undo / Redo */}
      <button
        className="toolbar-btn toolbar-btn--icon"
        onClick={undo}
        disabled={!canUndo}
        title="Deshacer (Ctrl+Z)"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 6h7a4 4 0 0 1 0 8H5" strokeLinecap="round"/>
          <path d="M5 3L2 6l3 3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button
        className="toolbar-btn toolbar-btn--icon"
        onClick={redo}
        disabled={!canRedo}
        title="Rehacer (Ctrl+Y)"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 6H7a4 4 0 0 0 0 8h4" strokeLinecap="round"/>
          <path d="M11 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className="toolbar-divider" />

      {/* Viewport switcher */}
      <div className="viewport-switcher">
        {['desktop', 'tablet', 'mobile'].map(v => (
          <button
            key={v}
            className={`viewport-btn${viewport === v ? ' active' : ''}`}
            onClick={() => setViewport(v)}
            title={v.charAt(0).toUpperCase() + v.slice(1)}
          >
            {ViewportIcon[v]}
          </button>
        ))}
      </div>

      {/* Page title */}
      <input
        className="page-title-input"
        value={pageTitle}
        onChange={e => setPageTitle(e.target.value)}
        placeholder="Título de la página..."
        title="Título del documento"
      />

      <div className="toolbar-spacer" />

      {/* Component count */}
      {components.length > 0 && (
        <span className="tag tag--primary">{components.length} sección{components.length !== 1 ? 'es' : ''}</span>
      )}

      {/* Export */}
      <button
        className="toolbar-btn toolbar-btn--accent"
        onClick={onExport}
        title="Exportar HTML"
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M8 2v9M5 8l3 3 3-3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12v1.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V12" strokeLinecap="round"/>
        </svg>
        Exportar HTML
      </button>
    </>
  )
}

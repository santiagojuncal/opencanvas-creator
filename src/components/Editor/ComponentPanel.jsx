import { useState } from 'react'
import { useEditorStore } from '../../store/editorStore'

const COMPONENT_GROUPS = [
  {
    label: 'Estructura',
    items: [
      { type: 'navbar', icon: '≡', label: 'Navbar', desc: 'Barra de navegación' },
      { type: 'hero', icon: '⬛', label: 'Hero', desc: 'Sección principal' },
      { type: 'footer', icon: '▬', label: 'Footer', desc: 'Pie de página' },
    ],
  },
  {
    label: 'Contenido',
    items: [
      { type: 'textSection', icon: 'T', label: 'Texto', desc: 'Sección de texto' },
      { type: 'image', icon: '🖼', label: 'Imagen', desc: 'Imagen con caption' },
      { type: 'carousel', icon: '▷', label: 'Carrusel', desc: 'Slides con animación' },
      { type: 'button', icon: '◉', label: 'Botón', desc: 'Botón de acción' },
      { type: 'divider', icon: '—', label: 'Separador', desc: 'Línea divisoria' },
      { type: 'spacer', icon: '↕', label: 'Espaciado', desc: 'Espacio vacío' },
    ],
  },
  {
    label: 'Secciones',
    items: [
      { type: 'features', icon: '⊞', label: 'Características', desc: 'Grid de features' },
      { type: 'testimonial', icon: '❝', label: 'Testimonio', desc: 'Cita de cliente' },
      { type: 'pricing', icon: '◈', label: 'Precios', desc: 'Tabla de planes' },
      { type: 'form', icon: '✉', label: 'Formulario', desc: 'Formulario de contacto' },
    ],
  },
]

export default function ComponentPanel() {
  const { addComponent, selectedId, components } = useEditorStore()
  const [expandedGroups, setExpandedGroups] = useState(['Estructura', 'Contenido', 'Secciones'])

  function handleAdd(type) {
    const selectedIdx = components.findIndex(c => c.id === selectedId)
    addComponent(type, {}, selectedIdx >= 0 ? selectedIdx : null)
  }

  function toggleGroup(label) {
    setExpandedGroups(prev =>
      prev.includes(label) ? prev.filter(g => g !== label) : [...prev, label]
    )
  }

  return (
    <div style={{ padding: '0' }}>
      {/* Header */}
      <div style={{
        padding: '12px 14px 10px',
        borderBottom: '1px solid var(--ui-border)',
      }}>
        <div style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ui-text-3)', marginBottom: '4px' }}>
          Componentes
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--ui-text-3)', opacity: 0.7 }}>
          Click para agregar al canvas
        </div>
      </div>

      {COMPONENT_GROUPS.map(group => {
        const isExpanded = expandedGroups.includes(group.label)
        return (
          <div key={group.label} className="panel-section">
            <div
              className="panel-section-header"
              onClick={() => toggleGroup(group.label)}
            >
              <span className="panel-section-title">{group.label}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                style={{
                  color: 'var(--ui-text-3)',
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.2s',
                  flexShrink: 0,
                }}
              >
                <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {isExpanded && (
              <div className="panel-section-body">
                {group.items.map(item => (
                  <ComponentItem
                    key={item.type}
                    item={item}
                    onAdd={() => handleAdd(item.type)}
                  />
                ))}
              </div>
            )}
          </div>
        )
      })}

      {/* Tips */}
      <div style={{
        padding: '14px',
        fontSize: '0.75rem',
        color: 'var(--ui-text-3)',
        lineHeight: 1.6,
        borderTop: '1px solid var(--ui-border)',
        marginTop: 'auto',
      }}>
        <div style={{ fontWeight: 600, marginBottom: 6, color: 'var(--ui-text-2)' }}>Atajos</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div><kbd className="kbd">Ctrl+Z</kbd> Deshacer</div>
          <div><kbd className="kbd">Ctrl+Y</kbd> Rehacer</div>
          <div><kbd className="kbd">Del</kbd> Eliminar sección</div>
        </div>
      </div>
    </div>
  )
}

function ComponentItem({ item, onAdd }) {
  return (
    <div
      className="component-item"
      onClick={onAdd}
      title={`Agregar ${item.label}`}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onAdd()}
    >
      <div className="component-item__icon">
        <span style={{ fontSize: '1rem', lineHeight: 1 }}>{item.icon}</span>
      </div>
      <div>
        <div className="component-item__label">{item.label}</div>
        <div style={{ fontSize: '0.6875rem', color: 'var(--ui-text-3)', marginTop: 1 }}>{item.desc}</div>
      </div>
    </div>
  )
}

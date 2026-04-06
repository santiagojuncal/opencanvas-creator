import { useCallback, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useEditorStore } from '../../store/editorStore'
import ComponentRenderer from './ComponentRenderer'

const COMPONENT_LABELS = {
  navbar: 'Navbar',
  hero: 'Hero',
  textSection: 'Texto',
  image: 'Imagen',
  carousel: 'Carrusel',
  button: 'Botón',
  features: 'Características',
  testimonial: 'Testimonio',
  pricing: 'Precios',
  form: 'Formulario',
  divider: 'Separador',
  spacer: 'Espaciado',
  footer: 'Footer',
}

export default function Canvas() {
  const {
    components, selectedId, viewport,
    setSelected, removeComponent, duplicateComponent,
    moveComponent, reorderComponents, setDragging,
  } = useEditorStore()

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const handleDragStart = useCallback(() => setDragging(true), [setDragging])

  const handleDragEnd = useCallback((event) => {
    setDragging(false)
    const { active, over } = event
    if (over && active.id !== over.id) {
      reorderComponents(active.id, over.id)
    }
  }, [reorderComponents, setDragging])

  // Keyboard delete
  useEffect(() => {
    function onKey(e) {
      const tag = document.activeElement?.tagName
      const isEditing = document.activeElement?.contentEditable === 'true'
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || isEditing) return
        removeComponent(selectedId)
      }
      if (e.key === 'Escape') {
        if (isEditing) return
        setSelected(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedId, removeComponent, setSelected])

  const viewportClass = {
    desktop: 'canvas-viewport--desktop',
    tablet: 'canvas-viewport--tablet',
    mobile: 'canvas-viewport--mobile',
  }[viewport] || 'canvas-viewport--desktop'

  return (
    <div
      className={`canvas-viewport ${viewportClass}`}
      onClick={e => { if (e.target === e.currentTarget) setSelected(null) }}
    >
      {components.length === 0 ? (
        <EmptyState />
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={components.map(c => c.id)}
            strategy={verticalListSortingStrategy}
          >
            {components.map((component, index) => (
              <SortableComponent
                key={component.id}
                component={component}
                index={index}
                total={components.length}
                isSelected={selectedId === component.id}
                onSelect={() => setSelected(component.id)}
                onRemove={() => removeComponent(component.id)}
                onDuplicate={() => duplicateComponent(component.id)}
                onMoveUp={() => moveComponent(component.id, 'up')}
                onMoveDown={() => moveComponent(component.id, 'down')}
              />
            ))}
          </SortableContext>
          <DragOverlay>
            {/* minimal overlay */}
            <div style={{
              background: 'var(--ui-accent-dim)',
              border: '2px dashed var(--ui-accent)',
              height: '48px',
              borderRadius: 8,
              opacity: 0.8,
            }} />
          </DragOverlay>
        </DndContext>
      )}
    </div>
  )
}

function SortableComponent({ component, index, total, isSelected, onSelect, onRemove, onDuplicate, onMoveUp, onMoveDown }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    position: 'relative',
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`canvas-component${isSelected ? ' canvas-component--selected' : ''}`}
      onClick={(e) => { e.stopPropagation(); onSelect() }}
    >
      {/* Type label */}
      <div className="canvas-component__label">
        {COMPONENT_LABELS[component.type] || component.type}
      </div>

      {/* Controls */}
      <div className="canvas-component__controls">
        {/* Drag handle */}
        <button
          className="canvas-control-btn"
          title="Arrastrar para reordenar"
          style={{ cursor: 'grab' }}
          {...attributes}
          {...listeners}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <circle cx="4" cy="3" r="1.1"/>
            <circle cx="8" cy="3" r="1.1"/>
            <circle cx="4" cy="6" r="1.1"/>
            <circle cx="8" cy="6" r="1.1"/>
            <circle cx="4" cy="9" r="1.1"/>
            <circle cx="8" cy="9" r="1.1"/>
          </svg>
        </button>

        {/* Move up */}
        <button
          className="canvas-control-btn"
          onClick={e => { e.stopPropagation(); onMoveUp() }}
          disabled={index === 0}
          title="Mover arriba"
          style={{ opacity: index === 0 ? 0.3 : 1 }}
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 8l4-4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Move down */}
        <button
          className="canvas-control-btn"
          onClick={e => { e.stopPropagation(); onMoveDown() }}
          disabled={index === total - 1}
          title="Mover abajo"
          style={{ opacity: index === total - 1 ? 0.3 : 1 }}
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div style={{ width: 1, height: 16, background: 'var(--ui-border)', margin: '0 1px' }} />

        {/* Duplicate */}
        <button
          className="canvas-control-btn"
          onClick={e => { e.stopPropagation(); onDuplicate() }}
          title="Duplicar"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="1" y="4" width="9" height="9" rx="1.5"/>
            <path d="M4 4V2.5A1.5 1.5 0 0 1 5.5 1H11.5A1.5 1.5 0 0 1 13 2.5V8.5A1.5 1.5 0 0 1 11.5 10H10" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Delete */}
        <button
          className="canvas-control-btn canvas-control-btn--danger"
          onClick={e => { e.stopPropagation(); onRemove() }}
          title="Eliminar (Del)"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M1 3h12M4 3V2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M5.5 6v5M8.5 6v5M2 3l.7 9a1 1 0 0 0 1 .93h6.6a1 1 0 0 0 1-.93L12 3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Component preview */}
      <ComponentRenderer component={component} />
    </div>
  )
}

function EmptyState() {
  return (
    <div className="canvas-empty">
      <div className="canvas-empty__icon">🎨</div>
      <div className="canvas-empty__title">Tu canvas está vacío</div>
      <div className="canvas-empty__sub">
        Hacé click en cualquier componente del panel izquierdo para empezar a construir tu landing page.
      </div>
    </div>
  )
}

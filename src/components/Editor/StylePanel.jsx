import { useState } from 'react'
import { useEditorStore, generateId, defaultGlobalStyles } from '../../store/editorStore'

// ============================================================
// Reusable field components
// ============================================================

function Field({ label, children }) {
  return (
    <div className="prop-field">
      <label className="prop-label">{label}</label>
      {children}
    </div>
  )
}

function TextInput({ value, onChange, placeholder }) {
  return (
    <input
      className="prop-input"
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}

function TextArea({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      className="prop-textarea"
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
    />
  )
}

function SelectInput({ value, onChange, options }) {
  return (
    <select className="prop-select" value={value || ''} onChange={e => onChange(e.target.value)}>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  )
}

function Segments({ value, onChange, options }) {
  return (
    <div className="prop-segments">
      {options.map(opt => (
        <button
          key={opt.value}
          className={`prop-segment${value === opt.value ? ' active' : ''}`}
          onClick={() => onChange(opt.value)}
          type="button"
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

function Toggle({ label, value, onChange }) {
  const id = `tog-${Math.random().toString(36).substr(2, 6)}`
  return (
    <div className="prop-toggle">
      <span className="prop-toggle-label">{label}</span>
      <label className="toggle-switch">
        <input type="checkbox" checked={!!value} onChange={e => onChange(e.target.checked)} />
        <span className="toggle-slider" />
      </label>
    </div>
  )
}

function ColorField({ label, value, onChange }) {
  const [hex, setHex] = useState(value || '#000000')
  function handleHexChange(val) {
    setHex(val)
    if (/^#[0-9a-fA-F]{6}$/.test(val)) onChange(val)
  }
  function handlePickerChange(val) {
    setHex(val)
    onChange(val)
  }
  return (
    <Field label={label}>
      <div className="prop-color-row">
        <input
          type="color"
          className="prop-color-input"
          value={hex}
          onChange={e => handlePickerChange(e.target.value)}
        />
        <input
          type="text"
          className="prop-color-value"
          value={hex}
          onChange={e => handleHexChange(e.target.value)}
          spellCheck={false}
          maxLength={7}
        />
      </div>
    </Field>
  )
}

function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="prop-section">
      <div className="prop-section-title" onClick={() => setOpen(!open)}>
        {title}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
          <path d="M1 3l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {open && <div className="prop-section-body">{children}</div>}
    </div>
  )
}

// ============================================================
// Per-component editors
// ============================================================

function NavbarEditor({ props, update }) {
  function updateLink(id, key, val) {
    update({ links: props.links.map(l => l.id === id ? { ...l, [key]: val } : l) })
  }
  function addLink() {
    update({ links: [...(props.links || []), { id: generateId(), text: 'Enlace', href: '#' }] })
  }
  function removeLink(id) {
    update({ links: props.links.filter(l => l.id !== id) })
  }
  return (
    <>
      <Section title="Marca">
        <Field label="Logo / Nombre"><TextInput value={props.logo} onChange={v => update({ logo: v })} /></Field>
      </Section>
      <Section title="Navegación">
        {(props.links || []).map((l, i) => (
          <div key={l.id} className="list-item-row">
            <div className="list-item-row__header">
              <span className="list-item-row__title">Enlace {i + 1}</span>
              <button className="list-item-row__remove" onClick={() => removeLink(l.id)}>✕</button>
            </div>
            <Field label="Texto"><TextInput value={l.text} onChange={v => updateLink(l.id, 'text', v)} /></Field>
            <Field label="URL"><TextInput value={l.href} onChange={v => updateLink(l.id, 'href', v)} placeholder="#seccion" /></Field>
          </div>
        ))}
        <button className="add-item-btn" onClick={addLink}>+ Agregar Enlace</button>
      </Section>
      <Section title="CTA">
        <Toggle label="Mostrar botón" value={props.showCta} onChange={v => update({ showCta: v })} />
        {props.showCta && (
          <>
            <Field label="Texto"><TextInput value={props.ctaText} onChange={v => update({ ctaText: v })} /></Field>
            <Field label="URL"><TextInput value={props.ctaLink} onChange={v => update({ ctaLink: v })} /></Field>
          </>
        )}
      </Section>
    </>
  )
}

function HeroEditor({ props, update }) {
  return (
    <>
      <Section title="Contenido">
        <Field label="Título"><TextArea value={props.headline} onChange={v => update({ headline: v })} rows={2} /></Field>
        <Field label="Descripción"><TextArea value={props.subheadline} onChange={v => update({ subheadline: v })} rows={3} /></Field>
      </Section>
      <Section title="CTA Principal">
        <Field label="Texto del botón"><TextInput value={props.ctaText} onChange={v => update({ ctaText: v })} /></Field>
        <Field label="URL"><TextInput value={props.ctaLink} onChange={v => update({ ctaLink: v })} placeholder="#seccion" /></Field>
      </Section>
      <Section title="CTA Secundario" defaultOpen={false}>
        <Toggle label="Mostrar secundario" value={props.showSecondary} onChange={v => update({ showSecondary: v })} />
        {props.showSecondary && (
          <>
            <Field label="Texto"><TextInput value={props.secondaryCtaText} onChange={v => update({ secondaryCtaText: v })} /></Field>
            <Field label="URL"><TextInput value={props.secondaryCtaLink} onChange={v => update({ secondaryCtaLink: v })} /></Field>
          </>
        )}
      </Section>
      <Section title="Diseño" defaultOpen={false}>
        <Field label="Alineación">
          <Segments
            value={props.textAlign}
            onChange={v => update({ textAlign: v })}
            options={[{ value: 'left', label: 'Izq' }, { value: 'center', label: 'Centro' }, { value: 'right', label: 'Der' }]}
          />
        </Field>
        <Field label="Alto mínimo">
          <SelectInput
            value={props.minHeight}
            onChange={v => update({ minHeight: v })}
            options={[
              { value: '60vh', label: '60vh' },
              { value: '75vh', label: '75vh' },
              { value: '85vh', label: '85vh' },
              { value: '88vh', label: '88vh' },
              { value: '100vh', label: '100vh (pantalla completa)' },
            ]}
          />
        </Field>
      </Section>
    </>
  )
}

function TextSectionEditor({ props, update }) {
  return (
    <>
      <Section title="Contenido">
        <Toggle label="Mostrar encabezado" value={props.showHeading !== false} onChange={v => update({ showHeading: v })} />
        {props.showHeading !== false && (
          <Field label="Encabezado"><TextInput value={props.heading} onChange={v => update({ heading: v })} /></Field>
        )}
        <Field label="Texto"><TextArea value={props.content} onChange={v => update({ content: v })} rows={5} /></Field>
      </Section>
      <Section title="Diseño" defaultOpen={false}>
        <Field label="Alineación">
          <Segments
            value={props.textAlign}
            onChange={v => update({ textAlign: v })}
            options={[{ value: 'left', label: 'Izq' }, { value: 'center', label: 'Centro' }, { value: 'right', label: 'Der' }]}
          />
        </Field>
      </Section>
    </>
  )
}

function ImageEditor({ props, update }) {
  return (
    <>
      <Section title="Imagen">
        <Field label="URL de imagen"><TextInput value={props.src} onChange={v => update({ src: v })} placeholder="https://..." /></Field>
        <Field label="Texto alternativo"><TextInput value={props.alt} onChange={v => update({ alt: v })} placeholder="Descripción..." /></Field>
        <Field label="Caption"><TextInput value={props.caption} onChange={v => update({ caption: v })} placeholder="Opcional" /></Field>
      </Section>
      <Section title="Dimensiones" defaultOpen={false}>
        <Field label="Alto">
          <SelectInput
            value={props.height}
            onChange={v => update({ height: v })}
            options={[
              { value: '240px', label: '240px — Compacto' },
              { value: '340px', label: '340px' },
              { value: '420px', label: '420px — Estándar' },
              { value: '520px', label: '520px — Grande' },
              { value: '640px', label: '640px — Hero' },
            ]}
          />
        </Field>
        <Field label="Ajuste de imagen">
          <SelectInput
            value={props.objectFit}
            onChange={v => update({ objectFit: v })}
            options={[
              { value: 'cover', label: 'Cover (recortar)' },
              { value: 'contain', label: 'Contain (completo)' },
              { value: 'fill', label: 'Fill (estirar)' },
            ]}
          />
        </Field>
        <Field label="Bordes redondeados">
          <Segments
            value={props.borderRadius || '0'}
            onChange={v => update({ borderRadius: v })}
            options={[{ value: '0', label: 'Recto' }, { value: '8px', label: 'Suave' }, { value: '16px', label: 'Redondo' }]}
          />
        </Field>
      </Section>
    </>
  )
}

function ButtonEditor({ props, update }) {
  return (
    <>
      <Section title="Botón">
        <Field label="Texto"><TextInput value={props.text} onChange={v => update({ text: v })} /></Field>
        <Field label="URL"><TextInput value={props.link} onChange={v => update({ link: v })} placeholder="#seccion" /></Field>
      </Section>
      <Section title="Estilo" defaultOpen={false}>
        <Field label="Variante">
          <SelectInput
            value={props.variant}
            onChange={v => update({ variant: v })}
            options={[
              { value: 'primary', label: 'Primary' },
              { value: 'secondary', label: 'Secondary' },
              { value: 'outline', label: 'Outline' },
              { value: 'ghost', label: 'Ghost' },
            ]}
          />
        </Field>
        <Field label="Tamaño">
          <Segments
            value={props.size}
            onChange={v => update({ size: v })}
            options={[{ value: 'sm', label: 'S' }, { value: 'md', label: 'M' }, { value: 'large', label: 'L' }]}
          />
        </Field>
        <Field label="Alineación">
          <Segments
            value={props.align}
            onChange={v => update({ align: v })}
            options={[{ value: 'left', label: 'Izq' }, { value: 'center', label: 'Centro' }, { value: 'right', label: 'Der' }]}
          />
        </Field>
      </Section>
    </>
  )
}

function FeaturesEditor({ props, update }) {
  function updateItem(id, key, val) {
    update({ items: props.items.map(it => it.id === id ? { ...it, [key]: val } : it) })
  }
  function addItem() {
    update({ items: [...(props.items || []), { id: generateId(), icon: '⭐', title: 'Nueva Característica', description: 'Descripción aquí.' }] })
  }
  function removeItem(id) {
    update({ items: props.items.filter(it => it.id !== id) })
  }
  return (
    <>
      <Section title="Encabezado">
        <Field label="Título"><TextInput value={props.heading} onChange={v => update({ heading: v })} /></Field>
        <Field label="Subtítulo"><TextInput value={props.subheading} onChange={v => update({ subheading: v })} /></Field>
      </Section>
      <Section title="Columnas">
        <Field label="Cantidad">
          <Segments
            value={String(props.columns)}
            onChange={v => update({ columns: Number(v) })}
            options={[{ value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }]}
          />
        </Field>
      </Section>
      <Section title="Items">
        {(props.items || []).map((item, i) => (
          <div key={item.id} className="list-item-row">
            <div className="list-item-row__header">
              <span className="list-item-row__title">{item.icon} Item {i + 1}</span>
              <button className="list-item-row__remove" onClick={() => removeItem(item.id)}>✕</button>
            </div>
            <Field label="Ícono / Emoji"><TextInput value={item.icon} onChange={v => updateItem(item.id, 'icon', v)} /></Field>
            <Field label="Título"><TextInput value={item.title} onChange={v => updateItem(item.id, 'title', v)} /></Field>
            <Field label="Descripción"><TextArea value={item.description} onChange={v => updateItem(item.id, 'description', v)} rows={2} /></Field>
          </div>
        ))}
        <button className="add-item-btn" onClick={addItem}>+ Agregar Item</button>
      </Section>
    </>
  )
}

function TestimonialEditor({ props, update }) {
  return (
    <Section title="Testimonio">
      <Field label="Cita"><TextArea value={props.quote} onChange={v => update({ quote: v })} rows={4} /></Field>
      <Field label="Nombre"><TextInput value={props.author} onChange={v => update({ author: v })} /></Field>
      <Field label="Cargo / Empresa"><TextInput value={props.role} onChange={v => update({ role: v })} /></Field>
      <Field label="URL del avatar"><TextInput value={props.avatar} onChange={v => update({ avatar: v })} placeholder="https://..." /></Field>
    </Section>
  )
}

function PricingEditor({ props, update }) {
  function updatePlan(id, key, val) {
    update({ plans: props.plans.map(p => p.id === id ? { ...p, [key]: val } : p) })
  }
  function updateFeatures(id, val) {
    update({ plans: props.plans.map(p => p.id === id ? { ...p, features: val.split('\n').filter(Boolean) } : p) })
  }
  function addPlan() {
    update({ plans: [...(props.plans || []), { id: generateId(), name: 'Nuevo Plan', price: '$0', period: '/mes', features: ['Característica 1'], cta: 'Empezar', highlighted: false }] })
  }
  function removePlan(id) {
    update({ plans: props.plans.filter(p => p.id !== id) })
  }
  return (
    <>
      <Section title="Encabezado">
        <Field label="Título"><TextInput value={props.heading} onChange={v => update({ heading: v })} /></Field>
        <Field label="Subtítulo"><TextInput value={props.subheading} onChange={v => update({ subheading: v })} /></Field>
      </Section>
      <Section title="Planes">
        {(props.plans || []).map((plan, i) => (
          <div key={plan.id} className="list-item-row">
            <div className="list-item-row__header">
              <span className="list-item-row__title">Plan {i + 1}</span>
              <button className="list-item-row__remove" onClick={() => removePlan(plan.id)}>✕</button>
            </div>
            <Field label="Nombre"><TextInput value={plan.name} onChange={v => updatePlan(plan.id, 'name', v)} /></Field>
            <Field label="Precio"><TextInput value={plan.price} onChange={v => updatePlan(plan.id, 'price', v)} placeholder="$49" /></Field>
            <Field label="Período"><TextInput value={plan.period} onChange={v => updatePlan(plan.id, 'period', v)} placeholder="/mes" /></Field>
            <Field label="Texto del CTA"><TextInput value={plan.cta} onChange={v => updatePlan(plan.id, 'cta', v)} /></Field>
            <Field label="Características (una por línea)">
              <TextArea
                value={(plan.features || []).join('\n')}
                onChange={v => updateFeatures(plan.id, v)}
                rows={4}
                placeholder={"Característica 1\nCaracterística 2"}
              />
            </Field>
            <Toggle label="Destacado / Popular" value={plan.highlighted} onChange={v => updatePlan(plan.id, 'highlighted', v)} />
          </div>
        ))}
        <button className="add-item-btn" onClick={addPlan}>+ Agregar Plan</button>
      </Section>
    </>
  )
}

function FormEditor({ props, update }) {
  function updateField(id, key, val) {
    update({ fields: props.fields.map(f => f.id === id ? { ...f, [key]: val } : f) })
  }
  function addField() {
    update({ fields: [...(props.fields || []), { id: generateId(), type: 'text', label: 'Nuevo Campo', placeholder: '', required: false }] })
  }
  function removeField(id) {
    update({ fields: props.fields.filter(f => f.id !== id) })
  }
  return (
    <>
      <Section title="Encabezado">
        <Field label="Título"><TextInput value={props.heading} onChange={v => update({ heading: v })} /></Field>
        <Field label="Descripción"><TextArea value={props.description} onChange={v => update({ description: v })} rows={2} /></Field>
      </Section>
      <Section title="Campos">
        {(props.fields || []).map((field, i) => (
          <div key={field.id} className="list-item-row">
            <div className="list-item-row__header">
              <span className="list-item-row__title">Campo {i + 1}</span>
              <button className="list-item-row__remove" onClick={() => removeField(field.id)}>✕</button>
            </div>
            <Field label="Tipo">
              <SelectInput
                value={field.type}
                onChange={v => updateField(field.id, 'type', v)}
                options={[
                  { value: 'text', label: 'Texto corto' },
                  { value: 'email', label: 'Email' },
                  { value: 'tel', label: 'Teléfono' },
                  { value: 'textarea', label: 'Texto largo' },
                  { value: 'select', label: 'Selector' },
                ]}
              />
            </Field>
            <Field label="Etiqueta"><TextInput value={field.label} onChange={v => updateField(field.id, 'label', v)} /></Field>
            <Field label="Placeholder"><TextInput value={field.placeholder} onChange={v => updateField(field.id, 'placeholder', v)} /></Field>
            {field.type === 'select' && (
              <Field label="Opciones (separadas por |)">
                <TextInput value={field.options || ''} onChange={v => updateField(field.id, 'options', v)} placeholder="Op 1|Op 2|Op 3" />
              </Field>
            )}
            <Toggle label="Requerido" value={field.required} onChange={v => updateField(field.id, 'required', v)} />
          </div>
        ))}
        <button className="add-item-btn" onClick={addField}>+ Agregar Campo</button>
      </Section>
      <Section title="Envío" defaultOpen={false}>
        <Field label="Texto del botón"><TextInput value={props.submitText} onChange={v => update({ submitText: v })} /></Field>
        <Field label="Email de destino (opcional)"><TextInput value={props.submitEmail} onChange={v => update({ submitEmail: v })} placeholder="contacto@tuempresa.com" /></Field>
        <Field label="ID de sección (ancla)"><TextInput value={props.formId} onChange={v => update({ formId: v })} placeholder="contacto" /></Field>
      </Section>
    </>
  )
}

function DividerEditor({ props, update }) {
  return (
    <Section title="Separador">
      <Field label="Estilo">
        <Segments
          value={props.style}
          onChange={v => update({ style: v })}
          options={[{ value: 'line', label: 'Línea' }, { value: 'dots', label: 'Puntos' }]}
        />
      </Field>
      <Field label="Espaciado">
        <SelectInput
          value={props.spacing}
          onChange={v => update({ spacing: v })}
          options={[
            { value: '24px', label: '24px' },
            { value: '40px', label: '40px' },
            { value: '48px', label: '48px — Estándar' },
            { value: '64px', label: '64px' },
            { value: '80px', label: '80px' },
          ]}
        />
      </Field>
    </Section>
  )
}

function SpacerEditor({ props, update }) {
  return (
    <Section title="Espaciado">
      <Field label="Alto">
        <SelectInput
          value={props.height}
          onChange={v => update({ height: v })}
          options={[
            { value: '24px', label: '24px — Pequeño' },
            { value: '40px', label: '40px' },
            { value: '64px', label: '64px — Estándar' },
            { value: '80px', label: '80px' },
            { value: '120px', label: '120px — Grande' },
          ]}
        />
      </Field>
    </Section>
  )
}

function FooterEditor({ props, update }) {
  function updateCol(id, key, val) {
    update({ columns: props.columns.map(c => c.id === id ? { ...c, [key]: val } : c) })
  }
  function updateColLink(colId, linkId, key, val) {
    update({
      columns: props.columns.map(c =>
        c.id === colId
          ? { ...c, links: c.links.map(l => l.id === linkId ? { ...l, [key]: val } : l) }
          : c
      )
    })
  }
  function addCol() {
    update({ columns: [...(props.columns || []), { id: generateId(), heading: 'Columna', links: [] }] })
  }
  function removeCol(id) {
    update({ columns: props.columns.filter(c => c.id !== id) })
  }
  function addColLink(colId) {
    update({
      columns: props.columns.map(c =>
        c.id === colId ? { ...c, links: [...(c.links || []), { id: generateId(), text: 'Enlace', href: '#' }] } : c
      )
    })
  }
  function removeColLink(colId, linkId) {
    update({
      columns: props.columns.map(c =>
        c.id === colId ? { ...c, links: c.links.filter(l => l.id !== linkId) } : c
      )
    })
  }
  return (
    <>
      <Section title="Marca">
        <Field label="Logo / Nombre"><TextInput value={props.logo} onChange={v => update({ logo: v })} /></Field>
        <Field label="Tagline"><TextInput value={props.tagline} onChange={v => update({ tagline: v })} /></Field>
        <Field label="Copyright"><TextInput value={props.copyright} onChange={v => update({ copyright: v })} /></Field>
      </Section>
      <Section title="Columnas">
        {(props.columns || []).map((col, i) => (
          <div key={col.id} className="list-item-row">
            <div className="list-item-row__header">
              <span className="list-item-row__title">Columna {i + 1}</span>
              <button className="list-item-row__remove" onClick={() => removeCol(col.id)}>✕</button>
            </div>
            <Field label="Encabezado"><TextInput value={col.heading} onChange={v => updateCol(col.id, 'heading', v)} /></Field>
            {(col.links || []).map((l, j) => (
              <div key={l.id} style={{ display: 'flex', gap: 6, alignItems: 'flex-end' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <input className="prop-input" value={l.text} onChange={e => updateColLink(col.id, l.id, 'text', e.target.value)} placeholder="Texto" style={{ flex: 1 }} />
                    <input className="prop-input" value={l.href} onChange={e => updateColLink(col.id, l.id, 'href', e.target.value)} placeholder="URL" style={{ flex: 1 }} />
                  </div>
                </div>
                <button className="list-item-row__remove" onClick={() => removeColLink(col.id, l.id)} style={{ marginBottom: 1, flexShrink: 0 }}>✕</button>
              </div>
            ))}
            <button className="add-item-btn" onClick={() => addColLink(col.id)} style={{ marginTop: 4 }}>+ Enlace</button>
          </div>
        ))}
        <button className="add-item-btn" onClick={addCol}>+ Agregar Columna</button>
      </Section>
    </>
  )
}

// ============================================================
// Global Styles Panel
// ============================================================
const HEADING_FONTS = [
  'Playfair Display', 'Sora', 'Fraunces', 'Cormorant Garamond', 'Bebas Neue',
  'DM Serif Display', 'Abril Fatface', 'Josefin Sans', 'Raleway', 'Montserrat',
]
const BODY_FONTS = [
  'Source Sans 3', 'Inter', 'DM Sans', 'Nunito', 'Barlow',
  'Plus Jakarta Sans', 'Lato', 'Open Sans', 'IBM Plex Sans', 'Rubik',
]

function GlobalStylesPanel() {
  const { globalStyles, updateGlobalStyles } = useEditorStore()
  const update = (v) => updateGlobalStyles(v)

  return (
    <div className="prop-panel">
      <div className="global-styles-header">Estilos Globales</div>
      <Section title="Colores Principales">
        <ColorField label="Color Primario" value={globalStyles.primaryColor} onChange={v => update({ primaryColor: v })} />
        <ColorField label="Color Secundario" value={globalStyles.secondaryColor} onChange={v => update({ secondaryColor: v })} />
        <ColorField label="Color de Acento" value={globalStyles.accentColor} onChange={v => update({ accentColor: v })} />
      </Section>
      <Section title="Fondo y Superficie">
        <ColorField label="Fondo Principal" value={globalStyles.backgroundColor} onChange={v => update({ backgroundColor: v })} />
        <ColorField label="Fondo de Secciones" value={globalStyles.surfaceColor} onChange={v => update({ surfaceColor: v })} />
        <ColorField label="Color de Bordes" value={globalStyles.borderColor} onChange={v => update({ borderColor: v })} />
      </Section>
      <Section title="Texto">
        <ColorField label="Texto Principal" value={globalStyles.textColor} onChange={v => update({ textColor: v })} />
        <ColorField label="Texto Secundario" value={globalStyles.textSecondaryColor} onChange={v => update({ textSecondaryColor: v })} />
      </Section>
      <Section title="Tipografía">
        <Field label="Fuente de Títulos">
          <SelectInput
            value={globalStyles.headingFont}
            onChange={v => update({ headingFont: v })}
            options={HEADING_FONTS.map(f => ({ value: f, label: f }))}
          />
        </Field>
        <Field label="Fuente de Cuerpo">
          <SelectInput
            value={globalStyles.bodyFont}
            onChange={v => update({ bodyFont: v })}
            options={BODY_FONTS.map(f => ({ value: f, label: f }))}
          />
        </Field>
      </Section>
      <Section title="Forma" defaultOpen={false}>
        <Field label="Bordes Redondeados">
          <Segments
            value={globalStyles.borderRadius}
            onChange={v => update({ borderRadius: v })}
            options={[{ value: '0px', label: 'Recto' }, { value: '6px', label: 'Suave' }, { value: '12px', label: 'Redondo' }, { value: '999px', label: 'Pill' }]}
          />
        </Field>
        <Field label="Ancho Máximo">
          <SelectInput
            value={globalStyles.maxWidth}
            onChange={v => update({ maxWidth: v })}
            options={[
              { value: '960px', label: '960px — Angosto' },
              { value: '1100px', label: '1100px — Estándar' },
              { value: '1200px', label: '1200px — Ancho' },
              { value: '1400px', label: '1400px — Full' },
            ]}
          />
        </Field>
      </Section>
      <div style={{ padding: '12px 14px 14px' }}>
        <button
          className="add-item-btn"
          onClick={() => updateGlobalStyles({ ...defaultGlobalStyles })}
        >
          ↺ Restablecer valores predeterminados
        </button>
      </div>
    </div>
  )
}

// ============================================================
// Main StylePanel
// ============================================================
const COMPONENT_EDITORS = {
  navbar: NavbarEditor,
  hero: HeroEditor,
  textSection: TextSectionEditor,
  image: ImageEditor,
  button: ButtonEditor,
  features: FeaturesEditor,
  testimonial: TestimonialEditor,
  pricing: PricingEditor,
  form: FormEditor,
  divider: DividerEditor,
  spacer: SpacerEditor,
  footer: FooterEditor,
}

const COMPONENT_NAMES = {
  navbar: 'Navbar',
  hero: 'Hero',
  textSection: 'Texto',
  image: 'Imagen',
  button: 'Botón',
  features: 'Características',
  testimonial: 'Testimonio',
  pricing: 'Precios',
  form: 'Formulario',
  divider: 'Separador',
  spacer: 'Espaciado',
  footer: 'Footer',
}

export default function StylePanel() {
  const { components, selectedId, updateComponent, setSelected } = useEditorStore()
  const [tab, setTab] = useState('component') // 'component' | 'global'

  const selected = selectedId ? components.find(c => c.id === selectedId) : null
  const Editor = selected ? COMPONENT_EDITORS[selected.type] : null

  return (
    <div className="prop-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--ui-border)',
        flexShrink: 0,
      }}>
        <button
          style={{
            flex: 1,
            padding: '10px 12px',
            background: 'transparent',
            border: 'none',
            borderBottom: `2px solid ${tab === 'component' ? 'var(--ui-accent)' : 'transparent'}`,
            color: tab === 'component' ? 'var(--ui-accent)' : 'var(--ui-text-2)',
            fontFamily: 'var(--font-ui)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onClick={() => setTab('component')}
        >
          Componente
        </button>
        <button
          style={{
            flex: 1,
            padding: '10px 12px',
            background: 'transparent',
            border: 'none',
            borderBottom: `2px solid ${tab === 'global' ? 'var(--ui-accent)' : 'transparent'}`,
            color: tab === 'global' ? 'var(--ui-accent)' : 'var(--ui-text-2)',
            fontFamily: 'var(--font-ui)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onClick={() => setTab('global')}
        >
          Estilos Globales
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {tab === 'global' ? (
          <GlobalStylesPanel />
        ) : selected && Editor ? (
          <div>
            {/* Selected component header */}
            <div style={{
              padding: '10px 14px',
              borderBottom: '1px solid var(--ui-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--ui-raised)',
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="tag tag--accent">{COMPONENT_NAMES[selected.type] || selected.type}</span>
              </div>
              <button
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--ui-text-3)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  padding: '2px 6px',
                  borderRadius: 'var(--r-sm)',
                }}
                onClick={() => setSelected(null)}
                title="Cerrar"
              >
                ✕
              </button>
            </div>
            <Editor
              props={selected.props}
              update={(newProps) => updateComponent(selected.id, newProps)}
            />
          </div>
        ) : (
          <div className="prop-panel__empty">
            <div className="prop-panel__empty-icon">👆</div>
            <div className="prop-panel__empty-text">
              Hacé click en cualquier sección del canvas para editar sus propiedades.
            </div>
            <div style={{ marginTop: 8 }}>
              <button
                style={{
                  background: 'var(--ui-accent-dim)',
                  border: '1px solid var(--ui-accent)',
                  borderRadius: 'var(--r-sm)',
                  color: 'var(--ui-accent)',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  padding: '6px 14px',
                  cursor: 'pointer',
                }}
                onClick={() => setTab('global')}
              >
                → Ver Estilos Globales
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

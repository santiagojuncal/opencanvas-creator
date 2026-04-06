import { create } from 'zustand'

const generateId = () => Math.random().toString(36).substr(2, 9)

export const defaultGlobalStyles = {
  primaryColor: '#2563eb',
  secondaryColor: '#1e40af',
  accentColor: '#f59e0b',
  backgroundColor: '#ffffff',
  surfaceColor: '#f8fafc',
  textColor: '#1e293b',
  textSecondaryColor: '#64748b',
  borderColor: '#e2e8f0',
  headingFont: 'Playfair Display',
  bodyFont: 'Source Sans 3',
  borderRadius: '8px',
  maxWidth: '1100px',
}

const componentDefaults = {
  hero: {
    headline: 'Tu Título Principal Aquí',
    subheadline: 'Una descripción poderosa que conecta con tu audiencia y explica el valor único que ofreces en pocas palabras.',
    ctaText: 'Comenzar Ahora',
    ctaLink: '#contacto',
    secondaryCtaText: 'Saber Más',
    secondaryCtaLink: '#caracteristicas',
    textAlign: 'center',
    showSecondary: true,
    minHeight: '88vh',
    background: { type: 'none' },
  },
  textSection: {
    heading: 'Sobre Nosotros',
    content: 'Aquí puedes escribir el contenido de esta sección. Comparte tu historia, misión o cualquier información relevante para tu audiencia. El texto puede ser tan largo como necesites para transmitir tu mensaje con claridad.',
    textAlign: 'left',
    showHeading: true,
    background: { type: 'none' },
  },
  image: {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80',
    alt: 'Descripción de la imagen',
    caption: '',
    height: '420px',
    objectFit: 'cover',
    borderRadius: '0',
  },
  button: {
    text: 'Acción Principal',
    link: '#',
    variant: 'primary',
    size: 'large',
    align: 'center',
  },
  form: {
    heading: 'Contáctanos',
    description: 'Completa el formulario y te responderemos a la brevedad.',
    fields: [
      { id: generateId(), type: 'text', label: 'Nombre', placeholder: 'Tu nombre completo', required: true },
      { id: generateId(), type: 'email', label: 'Email', placeholder: 'tu@email.com', required: true },
      { id: generateId(), type: 'textarea', label: 'Mensaje', placeholder: 'Cuéntanos en qué podemos ayudarte...', required: false },
    ],
    submitText: 'Enviar Mensaje',
    submitEmail: '',
    formId: 'contacto',
    background: { type: 'none' },
  },
  features: {
    heading: 'Por Qué Elegirnos',
    subheading: 'Todo lo que necesitás para crecer',
    columns: 3,
    items: [
      { id: generateId(), icon: '⚡', title: 'Velocidad', description: 'Rendimiento optimizado para la mejor experiencia de usuario en cualquier dispositivo.' },
      { id: generateId(), icon: '🛡️', title: 'Seguridad', description: 'Máxima protección para tus datos y los de tus clientes con estándares enterprise.' },
      { id: generateId(), icon: '🎯', title: 'Precisión', description: 'Herramientas diseñadas con atención al detalle para resultados exactos y medibles.' },
    ],
    background: { type: 'none' },
  },
  testimonial: {
    quote: '"Este servicio cambió completamente la forma en que trabajamos. Los resultados hablan por sí solos y el equipo es excepcional."',
    author: 'María García',
    role: 'CEO, Empresa Ejemplo',
    avatar: '',
    background: { type: 'none' },
  },
  pricing: {
    heading: 'Planes y Precios',
    subheading: 'Elegí el plan que mejor se adapte a vos',
    plans: [
      { id: generateId(), name: 'Básico', price: '$9', period: '/mes', features: ['5 proyectos activos', '10 GB de almacenamiento', 'Soporte por email'], cta: 'Empezar Gratis', highlighted: false },
      { id: generateId(), name: 'Pro', price: '$29', period: '/mes', features: ['Proyectos ilimitados', '100 GB de almacenamiento', 'Soporte prioritario 24/7', 'Analytics avanzados', 'Integraciones API'], cta: 'Empezar Ahora', highlighted: true },
      { id: generateId(), name: 'Enterprise', price: 'A medida', period: '', features: ['Todo lo de Pro', 'SLA personalizado', 'Onboarding dedicado', 'Facturación anual'], cta: 'Contactar', highlighted: false },
    ],
    background: { type: 'none' },
  },
  carousel: {
    slides: [
      { id: generateId(), image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80', title: 'Primer Slide', description: 'Describe aquí el mensaje principal de este slide.', cta: 'Ver más', ctaLink: '#' },
      { id: generateId(), image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80', title: 'Segundo Slide', description: 'Un segundo mensaje impactante para captar la atención.', cta: 'Contactar', ctaLink: '#contacto' },
      { id: generateId(), image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80', title: 'Tercer Slide', description: 'Comparte tu propuesta de valor con imágenes potentes.', cta: 'Saber más', ctaLink: '#' },
    ],
    height: '520px',
    autoplay: true,
    speed: 4000,
    showArrows: true,
    showDots: true,
    overlayOpacity: 0.45,
    overlayColor: '#000000',
    textAlign: 'center',
    transition: 'fade',
  },
  divider: {
    style: 'line',
    spacing: '48px',
  },
  spacer: {
    height: '64px',
  },
  navbar: {
    logo: 'MiMarca',
    links: [
      { id: generateId(), text: 'Inicio', href: '#' },
      { id: generateId(), text: 'Características', href: '#caracteristicas' },
      { id: generateId(), text: 'Precios', href: '#precios' },
      { id: generateId(), text: 'Contacto', href: '#contacto' },
    ],
    ctaText: 'Empezar',
    ctaLink: '#contacto',
    showCta: true,
  },
  footer: {
    logo: 'MiMarca',
    tagline: 'Construido con OpenCanvas Creator',
    columns: [
      { id: generateId(), heading: 'Producto', links: [{ id: generateId(), text: 'Características', href: '#' }, { id: generateId(), text: 'Precios', href: '#' }] },
      { id: generateId(), heading: 'Empresa', links: [{ id: generateId(), text: 'Sobre Nosotros', href: '#' }, { id: generateId(), text: 'Contacto', href: '#' }] },
    ],
    copyright: `© ${new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.`,
    background: { type: 'none' },
  },
}

function createComponent(type, overrideProps = {}) {
  const defaults = componentDefaults[type] || {}
  return {
    id: generateId(),
    type,
    props: { ...JSON.parse(JSON.stringify(defaults)), ...overrideProps },
  }
}

const saveHistory = (state, newComponents) => ({
  components: newComponents,
  history: [...state.history.slice(0, state.historyIndex + 1), JSON.stringify(newComponents)],
  historyIndex: state.historyIndex + 1,
})

export const useEditorStore = create((set, get) => ({
  components: [],
  selectedId: null,
  globalStyles: { ...defaultGlobalStyles },
  history: ['[]'],
  historyIndex: 0,
  viewport: 'desktop',
  isDragging: false,

  addComponent: (type, props = {}, insertAfterIndex = null) => {
    const newComponent = createComponent(type, props)
    set(state => {
      let newComponents
      if (insertAfterIndex !== null && insertAfterIndex >= 0) {
        newComponents = [...state.components]
        newComponents.splice(insertAfterIndex + 1, 0, newComponent)
      } else {
        newComponents = [...state.components, newComponent]
      }
      return { ...saveHistory(state, newComponents), selectedId: newComponent.id }
    })
    return newComponent.id
  },

  removeComponent: (id) => {
    set(state => {
      const newComponents = state.components.filter(c => c.id !== id)
      return {
        ...saveHistory(state, newComponents),
        selectedId: state.selectedId === id ? null : state.selectedId,
      }
    })
  },

  updateComponent: (id, props) => {
    set(state => ({
      components: state.components.map(c =>
        c.id === id ? { ...c, props: { ...c.props, ...props } } : c
      ),
    }))
  },

  reorderComponents: (activeId, overId) => {
    set(state => {
      const items = [...state.components]
      const fromIndex = items.findIndex(c => c.id === activeId)
      const toIndex = items.findIndex(c => c.id === overId)
      if (fromIndex === -1 || toIndex === -1) return state
      const [moved] = items.splice(fromIndex, 1)
      items.splice(toIndex, 0, moved)
      return saveHistory(state, items)
    })
  },

  moveComponent: (id, direction) => {
    set(state => {
      const items = [...state.components]
      const idx = items.findIndex(c => c.id === id)
      if (direction === 'up' && idx > 0) {
        ;[items[idx - 1], items[idx]] = [items[idx], items[idx - 1]]
      } else if (direction === 'down' && idx < items.length - 1) {
        ;[items[idx], items[idx + 1]] = [items[idx + 1], items[idx]]
      } else {
        return state
      }
      return saveHistory(state, items)
    })
  },

  duplicateComponent: (id) => {
    set(state => {
      const idx = state.components.findIndex(c => c.id === id)
      if (idx === -1) return state
      const dupe = { ...state.components[idx], id: generateId() }
      const newComponents = [...state.components]
      newComponents.splice(idx + 1, 0, dupe)
      return { ...saveHistory(state, newComponents), selectedId: dupe.id }
    })
  },

  setSelected: (id) => set({ selectedId: id }),

  updateGlobalStyles: (styles) =>
    set(state => ({ globalStyles: { ...state.globalStyles, ...styles } })),

  setViewport: (viewport) => set({ viewport }),

  setDragging: (isDragging) => set({ isDragging }),

  loadTemplate: (template) => {
    const components = template.components.map(c => ({
      ...c,
      id: generateId(),
      props: { ...JSON.parse(JSON.stringify(componentDefaults[c.type] || {})), ...c.props },
    }))
    set({
      components,
      selectedId: null,
      globalStyles: { ...defaultGlobalStyles, ...(template.styles || {}) },
      history: ['[]', JSON.stringify(components)],
      historyIndex: 1,
    })
  },

  undo: () => {
    const { history, historyIndex } = get()
    if (historyIndex > 0) {
      set({
        components: JSON.parse(history[historyIndex - 1]),
        historyIndex: historyIndex - 1,
        selectedId: null,
      })
    }
  },

  redo: () => {
    const { history, historyIndex } = get()
    if (historyIndex < history.length - 1) {
      set({
        components: JSON.parse(history[historyIndex + 1]),
        historyIndex: historyIndex + 1,
        selectedId: null,
      })
    }
  },

  canUndo: () => get().historyIndex > 0,
  canRedo: () => get().historyIndex < get().history.length - 1,

  clearCanvas: () =>
    set({
      components: [],
      selectedId: null,
      history: ['[]'],
      historyIndex: 0,
    }),
}))

export { generateId, componentDefaults }

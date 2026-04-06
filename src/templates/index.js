import { generateId } from '../store/editorStore'

const id = () => generateId()

export const TEMPLATES = [
  {
    id: 'blank',
    name: 'Lienzo en Blanco',
    description: 'Empezá desde cero con total libertad',
    emoji: '✨',
    preview: 'blank',
    components: [],
    styles: {},
  },
  {
    id: 'startup',
    name: 'Startup Tech',
    description: 'Lanzá tu producto con impacto',
    emoji: '🚀',
    preview: 'startup',
    styles: {
      primaryColor: '#2563eb',
      secondaryColor: '#1d4ed8',
      accentColor: '#06b6d4',
      backgroundColor: '#ffffff',
      surfaceColor: '#f0f9ff',
      textColor: '#0f172a',
      headingFont: 'Sora',
      bodyFont: 'Inter',
    },
    components: [
      {
        type: 'navbar',
        props: {
          logo: 'StartupName',
          links: [
            { id: id(), text: 'Producto', href: '#producto' },
            { id: id(), text: 'Características', href: '#caracteristicas' },
            { id: id(), text: 'Precios', href: '#precios' },
          ],
          ctaText: 'Probar Gratis',
          ctaLink: '#registro',
          showCta: true,
        },
      },
      {
        type: 'hero',
        props: {
          headline: 'El Futuro de tu Negocio Comienza Aquí',
          subheadline: 'Plataforma todo-en-uno para startups que quieren crecer rápido, escalar sin fricciones y ganar mercado desde el día uno.',
          ctaText: 'Empezar Gratis',
          ctaLink: '#registro',
          secondaryCtaText: 'Ver Demo',
          secondaryCtaLink: '#demo',
          textAlign: 'center',
          showSecondary: true,
          minHeight: '88vh',
        },
      },
      {
        type: 'features',
        props: {
          heading: 'Todo lo que Necesitás para Crecer',
          subheading: 'Herramientas pensadas para startups ambiciosas',
          columns: 3,
          items: [
            { id: id(), icon: '⚡', title: 'Deploy Instantáneo', description: 'De la idea al mercado en horas, no semanas. Infraestructura automática que escala con vos.' },
            { id: id(), icon: '📊', title: 'Analytics en Tiempo Real', description: 'Decisiones basadas en datos. Dashboards intuitivos con todas las métricas que importan.' },
            { id: id(), icon: '🔗', title: '200+ Integraciones', description: 'Conectá con las herramientas que ya usás. Slack, Stripe, HubSpot y muchas más.' },
            { id: id(), icon: '🛡️', title: 'Seguridad Enterprise', description: 'SOC2, GDPR, ISO 27001. Protección de nivel bancario para vos y tus clientes.' },
            { id: id(), icon: '🌍', title: 'Alcance Global', description: 'CDN en 50 países, soporte multiidioma y cumplimiento de regulaciones locales.' },
            { id: id(), icon: '💬', title: 'Soporte 24/7', description: 'Equipo humano disponible en cualquier momento. SLA garantizado desde el día uno.' },
          ],
        },
      },
      {
        type: 'testimonial',
        props: {
          quote: '"En 3 meses pasamos de 0 a 10.000 usuarios activos. Nunca creí que escalar fuera tan simple."',
          author: 'Lucas Fernández',
          role: 'Co-fundador de TechCorp',
          avatar: '',
        },
      },
      {
        type: 'pricing',
        props: {
          heading: 'Precios Transparentes',
          subheading: 'Sin sorpresas. Cancelá cuando quieras.',
          plans: [
            { id: id(), name: 'Starter', price: 'Gratis', period: '', features: ['3 proyectos', '1.000 usuarios/mes', 'Analytics básicos', 'Soporte community'], cta: 'Empezar', highlighted: false },
            { id: id(), name: 'Growth', price: '$49', period: '/mes', features: ['Proyectos ilimitados', '50.000 usuarios/mes', 'Analytics avanzados', 'Soporte prioritario', 'Integraciones API'], cta: 'Empezar Ahora', highlighted: true },
            { id: id(), name: 'Scale', price: '$199', period: '/mes', features: ['Todo en Growth', 'Usuarios ilimitados', 'SLA 99.9%', 'Onboarding dedicado', 'Facturación anual'], cta: 'Contactar', highlighted: false },
          ],
        },
      },
      {
        type: 'form',
        props: {
          heading: 'Unite a la Lista de Espera',
          description: 'Sé de los primeros en acceder. Cupos limitados.',
          fields: [
            { id: id(), type: 'text', label: 'Nombre', placeholder: 'Tu nombre', required: true },
            { id: id(), type: 'email', label: 'Email laboral', placeholder: 'nombre@empresa.com', required: true },
            { id: id(), type: 'text', label: 'Empresa', placeholder: 'Nombre de tu empresa', required: false },
          ],
          submitText: 'Reservar Mi Lugar',
          submitEmail: '',
          formId: 'registro',
        },
      },
      {
        type: 'footer',
        props: {
          logo: 'StartupName',
          tagline: 'Construido con ❤️ para founders ambiciosos',
          columns: [
            { id: id(), heading: 'Producto', links: [{ id: id(), text: 'Características', href: '#' }, { id: id(), text: 'Precios', href: '#' }, { id: id(), text: 'Roadmap', href: '#' }] },
            { id: id(), heading: 'Empresa', links: [{ id: id(), text: 'Sobre Nosotros', href: '#' }, { id: id(), text: 'Blog', href: '#' }, { id: id(), text: 'Carreras', href: '#' }] },
          ],
          copyright: `© ${new Date().getFullYear()} StartupName. Todos los derechos reservados.`,
        },
      },
    ],
  },
  {
    id: 'agency',
    name: 'Agencia Creativa',
    description: 'Mostrá tu trabajo y atraé clientes',
    emoji: '🎨',
    preview: 'agency',
    styles: {
      primaryColor: '#18181b',
      secondaryColor: '#3f3f46',
      accentColor: '#f97316',
      backgroundColor: '#fafaf9',
      surfaceColor: '#f4f4f5',
      textColor: '#09090b',
      textSecondaryColor: '#71717a',
      headingFont: 'Fraunces',
      bodyFont: 'DM Sans',
    },
    components: [
      {
        type: 'navbar',
        props: {
          logo: 'Studio',
          links: [
            { id: id(), text: 'Trabajo', href: '#trabajo' },
            { id: id(), text: 'Servicios', href: '#servicios' },
            { id: id(), text: 'Sobre Nosotros', href: '#nosotros' },
          ],
          ctaText: 'Contactar',
          ctaLink: '#contacto',
          showCta: true,
        },
      },
      {
        type: 'hero',
        props: {
          headline: 'Diseñamos Experiencias que Dejan Huella',
          subheadline: 'Somos una agencia creativa especializada en branding, diseño digital y estrategia de contenido para marcas que quieren ser recordadas.',
          ctaText: 'Ver Nuestro Trabajo',
          ctaLink: '#trabajo',
          secondaryCtaText: 'Hablemos',
          secondaryCtaLink: '#contacto',
          textAlign: 'left',
          showSecondary: true,
          minHeight: '85vh',
        },
      },
      {
        type: 'textSection',
        props: {
          heading: 'Quiénes Somos',
          content: 'Somos un equipo de diseñadores, estrategas y narradores apasionados por crear marcas que conectan emocionalmente con las personas. Con más de 8 años de experiencia y 200+ proyectos realizados, sabemos cómo transformar ideas en identidades visuales poderosas.\n\nNo hacemos templates. Cada proyecto es único porque cada cliente es único.',
          textAlign: 'left',
          showHeading: true,
        },
      },
      {
        type: 'features',
        props: {
          heading: 'Nuestros Servicios',
          subheading: '',
          columns: 3,
          items: [
            { id: id(), icon: '🎯', title: 'Branding & Identidad', description: 'Creamos marcas memorables desde el logo hasta el manual de identidad completo.' },
            { id: id(), icon: '💻', title: 'Diseño Web', description: 'Sitios web que combinan estética impecable con experiencia de usuario superior.' },
            { id: id(), icon: '📱', title: 'UI/UX de Productos', description: 'Interfaces digitales intuitivas que los usuarios aman usar cada día.' },
            { id: id(), icon: '✍️', title: 'Estrategia de Contenido', description: 'Mensajes claros y auténticos que resonan con tu audiencia ideal.' },
            { id: id(), icon: '📸', title: 'Dirección de Arte', description: 'Conceptos visuales que elevan fotoshoots, videos y campañas.' },
            { id: id(), icon: '🚀', title: 'Lanzamientos de Marca', description: 'Campañas de lanzamiento estratégicas con impacto desde el primer día.' },
          ],
        },
      },
      {
        type: 'testimonial',
        props: {
          quote: '"Transformaron completamente nuestra percepción de marca. En 6 meses triplicamos el reconocimiento en nuestro mercado objetivo."',
          author: 'Carolina Mendez',
          role: 'Directora de Marketing, Lumina',
          avatar: '',
        },
      },
      {
        type: 'form',
        props: {
          heading: 'Trabajemos Juntos',
          description: 'Contanos sobre tu proyecto y te respondemos en menos de 24hs.',
          fields: [
            { id: id(), type: 'text', label: 'Tu Nombre', placeholder: 'Nombre completo', required: true },
            { id: id(), type: 'email', label: 'Email', placeholder: 'tu@empresa.com', required: true },
            { id: id(), type: 'text', label: 'Empresa', placeholder: 'Nombre de tu empresa', required: false },
            { id: id(), type: 'textarea', label: 'Contanos sobre tu proyecto', placeholder: '¿Qué necesitás? ¿Cuáles son tus objetivos?...', required: true },
          ],
          submitText: 'Enviar Consulta',
          submitEmail: '',
          formId: 'contacto',
        },
      },
      {
        type: 'footer',
        props: {
          logo: 'Studio',
          tagline: 'Diseño con propósito. Resultados medibles.',
          columns: [
            { id: id(), heading: 'Servicios', links: [{ id: id(), text: 'Branding', href: '#' }, { id: id(), text: 'Diseño Web', href: '#' }, { id: id(), text: 'UI/UX', href: '#' }] },
            { id: id(), heading: 'Estudio', links: [{ id: id(), text: 'Nosotros', href: '#' }, { id: id(), text: 'Trabajo', href: '#' }, { id: id(), text: 'Contacto', href: '#' }] },
          ],
          copyright: `© ${new Date().getFullYear()} Studio. Todos los derechos reservados.`,
        },
      },
    ],
  },
  {
    id: 'personal',
    name: 'Portafolio Personal',
    description: 'Tu marca personal, impecable',
    emoji: '👤',
    preview: 'personal',
    styles: {
      primaryColor: '#7c3aed',
      secondaryColor: '#6d28d9',
      accentColor: '#ec4899',
      backgroundColor: '#ffffff',
      surfaceColor: '#faf5ff',
      textColor: '#1e1b4b',
      headingFont: 'Cormorant Garamond',
      bodyFont: 'Nunito',
    },
    components: [
      {
        type: 'navbar',
        props: {
          logo: 'Tu Nombre',
          links: [
            { id: id(), text: 'Sobre Mí', href: '#sobre-mi' },
            { id: id(), text: 'Habilidades', href: '#habilidades' },
            { id: id(), text: 'Contacto', href: '#contacto' },
          ],
          ctaText: 'Contratar',
          ctaLink: '#contacto',
          showCta: true,
        },
      },
      {
        type: 'hero',
        props: {
          headline: 'Hola, Soy Tu Nombre 👋',
          subheadline: 'Diseñador UX / Desarrollador Frontend con 5 años de experiencia creando productos digitales que las personas aman usar.',
          ctaText: 'Ver Mi Trabajo',
          ctaLink: '#trabajo',
          secondaryCtaText: 'Descargar CV',
          secondaryCtaLink: '#',
          textAlign: 'center',
          showSecondary: true,
          minHeight: '80vh',
        },
      },
      {
        type: 'textSection',
        props: {
          heading: 'Sobre Mí',
          content: 'Soy un profesional apasionado por la intersección entre diseño y tecnología. Me especializo en crear experiencias digitales que son tanto visualmente atractivas como funcionalmente impecables.\n\nCuando no estoy diseñando o programando, disfruto explorar nuevas culturas, fotografiar paisajes urbanos y contribuir a proyectos open source.',
          textAlign: 'left',
          showHeading: true,
        },
      },
      {
        type: 'features',
        props: {
          heading: 'Mis Habilidades',
          subheading: 'Especialidades y herramientas',
          columns: 3,
          items: [
            { id: id(), icon: '🎨', title: 'Diseño UI/UX', description: 'Figma, Adobe XD, Sketch. Prototipos interactivos y design systems completos.' },
            { id: id(), icon: '⚛️', title: 'React & Next.js', description: 'Aplicaciones web modernas, performantes y accesibles con las últimas tecnologías.' },
            { id: id(), icon: '🎭', title: 'Animaciones', description: 'Motion design, GSAP, Framer Motion. Interfaces que cobran vida.' },
          ],
        },
      },
      {
        type: 'testimonial',
        props: {
          quote: '"Trabajar con esta persona fue una experiencia excepcional. Entendió nuestra visión desde el día uno y entregó un producto que superó todas las expectativas."',
          author: 'Roberto Silva',
          role: 'CTO, Product Co.',
          avatar: '',
        },
      },
      {
        type: 'form',
        props: {
          heading: 'Hablemos',
          description: '¿Tenés un proyecto en mente? Me encantaría escucharte.',
          fields: [
            { id: id(), type: 'text', label: 'Tu Nombre', placeholder: 'Nombre completo', required: true },
            { id: id(), type: 'email', label: 'Email', placeholder: 'tu@email.com', required: true },
            { id: id(), type: 'textarea', label: '¿En qué puedo ayudarte?', placeholder: 'Contame sobre tu proyecto...', required: true },
          ],
          submitText: 'Enviar Mensaje',
          submitEmail: '',
          formId: 'contacto',
        },
      },
      {
        type: 'footer',
        props: {
          logo: 'Tu Nombre',
          tagline: 'Diseño & Desarrollo · Buenos Aires, Argentina',
          columns: [],
          copyright: `© ${new Date().getFullYear()} Tu Nombre. Hecho con cariño.`,
        },
      },
    ],
  },
  {
    id: 'event',
    name: 'Evento / Conferencia',
    description: 'Registraciones y agenda en un clic',
    emoji: '🎤',
    preview: 'event',
    styles: {
      primaryColor: '#dc2626',
      secondaryColor: '#b91c1c',
      accentColor: '#fbbf24',
      backgroundColor: '#0c0a09',
      surfaceColor: '#1c1917',
      textColor: '#fafaf9',
      textSecondaryColor: '#a8a29e',
      borderColor: '#292524',
      headingFont: 'Bebas Neue',
      bodyFont: 'Barlow',
    },
    components: [
      {
        type: 'navbar',
        props: {
          logo: 'SUMMIT 2025',
          links: [
            { id: id(), text: 'Agenda', href: '#agenda' },
            { id: id(), text: 'Speakers', href: '#speakers' },
            { id: id(), text: 'Ubicación', href: '#ubicacion' },
          ],
          ctaText: 'Registrarse',
          ctaLink: '#registro',
          showCta: true,
        },
      },
      {
        type: 'hero',
        props: {
          headline: 'SUMMIT 2025\nEL EVENTO DEL AÑO',
          subheadline: '15 de Agosto, 2025 · Centro de Convenciones · Buenos Aires\n\nDos días de conferencias, workshops y networking con los líderes más influyentes de la industria.',
          ctaText: 'Registrarme Ahora',
          ctaLink: '#registro',
          secondaryCtaText: 'Ver Agenda',
          secondaryCtaLink: '#agenda',
          textAlign: 'center',
          showSecondary: true,
          minHeight: '90vh',
        },
      },
      {
        type: 'features',
        props: {
          heading: 'POR QUÉ ASISTIR',
          subheading: '48 horas que van a cambiar tu perspectiva',
          columns: 3,
          items: [
            { id: id(), icon: '🎤', title: '40 Speakers', description: 'Los referentes más influyentes del sector compartiendo sus visiones sobre el futuro.' },
            { id: id(), icon: '🤝', title: 'Networking', description: '2.000+ profesionales de toda América Latina en un mismo lugar.' },
            { id: id(), icon: '🛠️', title: '20 Workshops', description: 'Sesiones prácticas y talleres hands-on para aprendizaje profundo.' },
            { id: id(), icon: '🏆', title: 'Startup Pitch', description: 'Competencia con $100.000 en premios para proyectos innovadores.' },
            { id: id(), icon: '🎯', title: 'Mesas Redondas', description: 'Debates íntimos con expertos en grupos reducidos.' },
            { id: id(), icon: '🎉', title: 'After Party', description: 'Cierre memorable con música en vivo y cocktail de networking.' },
          ],
        },
      },
      {
        type: 'testimonial',
        props: {
          quote: '"Summit fue el punto de inflexión en mi carrera. Las conexiones que hice en esos dos días me abrieron puertas que no imaginaba."',
          author: 'Valentina Torres',
          role: 'Founder, edición anterior',
          avatar: '',
        },
      },
      {
        type: 'form',
        props: {
          heading: 'ASEGURÁ TU LUGAR',
          description: 'Cupos limitados. Registrá tus datos y te contactamos con los detalles de pago.',
          fields: [
            { id: id(), type: 'text', label: 'Nombre Completo', placeholder: 'Tu nombre', required: true },
            { id: id(), type: 'email', label: 'Email', placeholder: 'tu@email.com', required: true },
            { id: id(), type: 'text', label: 'Empresa / Organización', placeholder: 'Donde trabajás', required: false },
            { id: id(), type: 'select', label: 'Tipo de Entrada', placeholder: 'Seleccioná una opción', required: true, options: 'General ($150)|VIP ($350)|Startup Pass ($80)' },
          ],
          submitText: 'Confirmar Registro',
          submitEmail: '',
          formId: 'registro',
        },
      },
      {
        type: 'footer',
        props: {
          logo: 'SUMMIT 2025',
          tagline: '15 & 16 de Agosto · Buenos Aires, Argentina',
          columns: [
            { id: id(), heading: 'Evento', links: [{ id: id(), text: 'Agenda', href: '#' }, { id: id(), text: 'Speakers', href: '#' }, { id: id(), text: 'Sponsors', href: '#' }] },
            { id: id(), heading: 'Info', links: [{ id: id(), text: 'Ubicación', href: '#' }, { id: id(), text: 'Hospedaje', href: '#' }, { id: id(), text: 'FAQ', href: '#' }] },
          ],
          copyright: `© ${new Date().getFullYear()} Summit. Todos los derechos reservados.`,
        },
      },
    ],
  },
  {
    id: 'product',
    name: 'Producto / SaaS',
    description: 'Convertí visitantes en clientes',
    emoji: '📦',
    preview: 'product',
    styles: {
      primaryColor: '#059669',
      secondaryColor: '#047857',
      accentColor: '#6366f1',
      backgroundColor: '#ffffff',
      surfaceColor: '#f0fdf4',
      textColor: '#052e16',
      headingFont: 'Cabinet Grotesk',
      bodyFont: 'Plus Jakarta Sans',
    },
    components: [
      {
        type: 'navbar',
        props: {
          logo: 'ProductName',
          links: [
            { id: id(), text: 'Características', href: '#caracteristicas' },
            { id: id(), text: 'Cómo Funciona', href: '#como-funciona' },
            { id: id(), text: 'Precios', href: '#precios' },
          ],
          ctaText: 'Prueba Gratuita',
          ctaLink: '#registro',
          showCta: true,
        },
      },
      {
        type: 'hero',
        props: {
          headline: 'Automatizá Tu Negocio.\nCrecé Sin Límites.',
          subheadline: 'La plataforma todo-en-uno que automatiza tus procesos, centraliza tu equipo y te da los datos que necesitás para tomar mejores decisiones.',
          ctaText: '14 Días Gratis · Sin Tarjeta',
          ctaLink: '#registro',
          secondaryCtaText: 'Ver Demo en Vivo',
          secondaryCtaLink: '#demo',
          textAlign: 'center',
          showSecondary: true,
          minHeight: '85vh',
        },
      },
      {
        type: 'features',
        props: {
          heading: 'Todo lo que Necesitás en un Solo Lugar',
          subheading: 'Diseñado para equipos que quieren hacer más con menos',
          columns: 3,
          items: [
            { id: id(), icon: '🤖', title: 'Automatización Inteligente', description: 'Creá flujos de trabajo que trabajan solos. Ahorrá hasta 20 horas semanales por empleado.' },
            { id: id(), icon: '📈', title: 'Reportes en Tiempo Real', description: 'Todos tus KPIs en un dashboard. Tomá decisiones basadas en datos, no en suposiciones.' },
            { id: id(), icon: '👥', title: 'Colaboración en Equipo', description: 'Tu equipo alineado y productivo. Tareas, comentarios y actualizaciones en tiempo real.' },
            { id: id(), icon: '🔌', title: 'Integración Nativa', description: 'Conecta con Slack, Google Workspace, Salesforce, HubSpot y 300+ apps más.' },
            { id: id(), icon: '📱', title: 'App Móvil', description: 'Accedé a todo desde tu smartphone. iOS y Android con paridad de funcionalidades.' },
            { id: id(), icon: '🔒', title: 'Seguridad Avanzada', description: 'Encriptación end-to-end, 2FA, roles y permisos granulares. Tu info siempre segura.' },
          ],
        },
      },
      {
        type: 'testimonial',
        props: {
          quote: '"Reducimos nuestro tiempo operativo en un 40% en el primer mes. El ROI fue inmediato. No puedo imaginarme volver a trabajar sin esta herramienta."',
          author: 'Andrés Molina',
          role: 'Operations Manager, ScaleUp Co',
          avatar: '',
        },
      },
      {
        type: 'pricing',
        props: {
          heading: 'Elegí Tu Plan',
          subheading: 'Empezá gratis. Escalá cuando lo necesites.',
          plans: [
            { id: id(), name: 'Free', price: 'Gratis', period: '', features: ['Hasta 5 usuarios', '1.000 automatizaciones/mes', 'Soporte comunitario', '1 GB storage'], cta: 'Empezar Gratis', highlighted: false },
            { id: id(), name: 'Business', price: '$79', period: '/mes', features: ['Usuarios ilimitados', 'Automatizaciones ilimitadas', 'Soporte prioritario', '100 GB storage', 'Integraciones avanzadas', 'Analytics personalizado'], cta: 'Probar 14 Días Gratis', highlighted: true },
            { id: id(), name: 'Enterprise', price: 'Custom', period: '', features: ['Todo en Business', 'SLA dedicado 99.99%', 'Implementación asistida', 'Cumplimiento SOC2/HIPAA'], cta: 'Solicitar Demo', highlighted: false },
          ],
        },
      },
      {
        type: 'form',
        props: {
          heading: 'Empezá Tu Prueba Gratuita',
          description: 'Sin tarjeta de crédito. Configuración en 2 minutos.',
          fields: [
            { id: id(), type: 'text', label: 'Nombre', placeholder: 'Tu nombre', required: true },
            { id: id(), type: 'email', label: 'Email Laboral', placeholder: 'nombre@empresa.com', required: true },
            { id: id(), type: 'text', label: '¿Cuántas personas en tu equipo?', placeholder: 'Ej: 10-50', required: false },
          ],
          submitText: 'Crear Cuenta Gratis →',
          submitEmail: '',
          formId: 'registro',
        },
      },
      {
        type: 'footer',
        props: {
          logo: 'ProductName',
          tagline: 'Automatización inteligente para equipos modernos',
          columns: [
            { id: id(), heading: 'Producto', links: [{ id: id(), text: 'Características', href: '#' }, { id: id(), text: 'Integraciones', href: '#' }, { id: id(), text: 'Actualizaciones', href: '#' }] },
            { id: id(), heading: 'Recursos', links: [{ id: id(), text: 'Documentación', href: '#' }, { id: id(), text: 'Blog', href: '#' }, { id: id(), text: 'Soporte', href: '#' }] },
          ],
          copyright: `© ${new Date().getFullYear()} ProductName Inc. Todos los derechos reservados.`,
        },
      },
    ],
  },
]

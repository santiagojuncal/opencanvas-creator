import { useState } from 'react'
import { useEditorStore } from './store/editorStore'
import TemplateSelector from './components/Templates/TemplateSelector'
import Toolbar from './components/Editor/Toolbar'
import ComponentPanel from './components/Editor/ComponentPanel'
import Canvas from './components/Editor/Canvas'
import StylePanel from './components/Editor/StylePanel'
import ExportModal from './components/Export/ExportModal'

export default function App() {
  const [showTemplateSelector, setShowTemplateSelector] = useState(true)
  const [showExport, setShowExport] = useState(false)
  const { loadTemplate } = useEditorStore()

  function handleSelectTemplate(template) {
    loadTemplate(template)
    setShowTemplateSelector(false)
  }

  return (
    <>
      {showTemplateSelector && (
        <TemplateSelector
          onSelect={handleSelectTemplate}
          onClose={() => setShowTemplateSelector(false)}
        />
      )}

      {showExport && (
        <ExportModal onClose={() => setShowExport(false)} />
      )}

      <div className="app-shell">
        <div className="app-toolbar">
          <Toolbar
            onOpenTemplates={() => setShowTemplateSelector(true)}
            onExport={() => setShowExport(true)}
          />
        </div>

        <aside className="app-sidebar">
          <ComponentPanel />
        </aside>

        <main className="app-canvas-area">
          <Canvas />
        </main>

        <aside className="app-panel">
          <StylePanel />
        </aside>
      </div>
    </>
  )
}

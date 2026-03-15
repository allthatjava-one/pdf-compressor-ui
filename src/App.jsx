import { usePdfCompressor } from './hooks/usePdfCompressor'
import { PdfCompressorView } from './components/PdfCompressorView'
import NavBar from './components/NavBar'
import './App.css'

function App() {
  const props = usePdfCompressor()
  return (
    <div className="page">
      <NavBar />
      <main className="main">
        <div className="container">
          <div className="card">
            <PdfCompressorView {...props} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

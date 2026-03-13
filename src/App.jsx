import { usePdfCompressor } from './hooks/usePdfCompressor'
import { PdfCompressorView } from './components/PdfCompressorView'
import './App.css'

function App() {
  const props = usePdfCompressor()
  return <PdfCompressorView {...props} />
}

export default App

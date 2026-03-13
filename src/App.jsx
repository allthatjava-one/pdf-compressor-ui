import './App.css'

function App() {
  return (
    <div className="container">
      <div className="card">
        <div className="glow-ring" />
        <span className="badge">Welcome</span>
        <h1 className="title">
          Hello, <span className="gradient-text">World</span>
        </h1>
        <p className="subtitle">
          A modern React application built with Vite.
        </p>
        <div className="divider" />
        <div className="tags">
          <span className="tag">React 18</span>
          <span className="tag">Vite</span>
          <span className="tag">Modern Design</span>
        </div>
      </div>
    </div>
  )
}

export default App

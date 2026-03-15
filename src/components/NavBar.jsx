import React from 'react'

export function NavBar() {
  return (
    <header className="header">
      <div className="header-inner">
        <span className="logo">THRJ<span className="logo-accent">Tech</span></span>

        <nav className="nav">
          <a className="nav-link" href="https://thrjtech.com">Home</a>
        </nav>
      </div>
    </header>
  )
}

export default NavBar

import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/program', label: 'Program' },
    { to: '/participation', label: 'Participation' },
    { to: '/exhibition', label: 'Exhibition' },
    { to: '/venue', label: 'Venue' },
    { to: '/travel', label: 'Travel' },
  ]

  return (
    <nav className="navbar">
      <Link to="/" className="logo-small">
        <img src="/images/logo.png" alt="MWSS Logo" />
        MWSS
      </Link>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        <span /><span /><span />
      </button>
      <div className={`nav-links${menuOpen ? ' open' : ''}`}>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
        <Link to="/register" className="btn-reg" onClick={() => setMenuOpen(false)}>
          Register Now
        </Link>
      </div>
    </nav>
  )
}

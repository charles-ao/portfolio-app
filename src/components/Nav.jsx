import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import contact from '../data/contact.json'
import about from '../data/about.json'
import './Nav.css'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Contact' },
]

function LogoMark({ size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12.2 7.2 A6.2 6.2 0 1 0 12.2 16.8" />
      <path d="M12.2 16.8 L16.4 6.8 L20.6 16.8" />
    </svg>
  )
}

function ThemeIcon({ theme }) {
  if (theme === 'dark') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
    )
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />
    </svg>
  )
}

export default function Nav() {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="nav">
      <div className="nav__bar">
        <div className="nav__brand">
          <LogoMark />
          <span className="nav__name">{about.name}</span>
        </div>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `nav__link${isActive ? ' nav__link--active' : ''}`}
            >
              {label}
            </NavLink>
          ))}
          <button
            type="button"
            className="nav__theme-btn"
            onClick={toggleTheme}
            title="Toggle theme"
            aria-label="Toggle color theme"
          >
            <ThemeIcon theme={theme} />
          </button>
        </nav>

        <div className="nav__mobile-controls">
          <button
            type="button"
            className="nav__theme-btn"
            onClick={toggleTheme}
            title="Toggle theme"
            aria-label="Toggle color theme"
          >
            <ThemeIcon theme={theme} />
          </button>
          <button
            type="button"
            className="nav__menu-btn"
            onClick={() => setMenuOpen((open) => !open)}
            title="Menu"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 7h18M3 12h18M3 17h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="nav__mobile-menu">
          {LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `nav__mobile-link${isActive ? ' nav__mobile-link--active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <div className="nav__mobile-divider" />
          <span className="nav__mobile-status">{contact.availabilityStatus.toUpperCase()}</span>
        </div>
      )}
    </header>
  )
}

import { NavLink } from 'react-router-dom'
import about from '../data/about.json'
import contact from '../data/contact.json'
import './Footer.css'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Contact' },
]

function LogoMark() {
  return (
    <svg
      width="20"
      height="20"
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

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <div className="footer__brand-row">
            <LogoMark />
            <span className="footer__name">{about.name}</span>
          </div>
          <span className="footer__tagline">
            {about.title}, {about.location}
          </span>
        </div>

        <div className="footer__col">
          <span className="footer__heading">Directory</span>
          <div className="footer__directory">
            {LINKS.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className="footer__link">
                {label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="footer__col">
          <span className="footer__heading">Find me</span>
          <div className="footer__socials">
            <a href={contact.githubUrl} title="GitHub" className="footer__icon-link" target="_blank" rel="noreferrer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 4.5-1.4 4.5-5a3.9 3.9 0 0 0-1.1-2.7 3.6 3.6 0 0 0-.1-2.7s-1.2-.4-3.8 1.4a9.3 9.3 0 0 0-5 0C6.4 4 5.2 4.4 5.2 4.4a3.6 3.6 0 0 0-.1 2.7A3.9 3.9 0 0 0 4 9.8c0 3.6 1.7 4.7 4.5 5-.6.6-.6 1.2-.5 2V20" />
              </svg>
            </a>
            <a href={contact.linkedInUrl} title="LinkedIn" className="footer__icon-link" target="_blank" rel="noreferrer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href={`mailto:${contact.email}`} title="Email" className="footer__icon-link">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <rect x="2.5" y="5" width="19" height="14" />
                <path d="M3 6l9 6.5L21 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© {year} {about.name.toUpperCase()}</span>
        <span>BUILT WITH REACT · CONTENT FROM JSON</span>
      </div>
    </footer>
  )
}

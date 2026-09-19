import { Link } from 'react-router-dom'
import about from '../data/about.json'
import contact from '../data/contact.json'
import './Home.css'

function ToolIcon({ name, iconSlug }) {
  if (!iconSlug) {
    return <span className="home-tools__text-chip">{name}</span>
  }
  return (
    <img
      className="home-tools__icon"
      src={`https://cdn.simpleicons.org/${iconSlug}/697565`}
      alt={name}
    />
  )
}

export default function Home() {
  return (
    <div className="home">
      <div className="home__hero">
        <div className="home__intro">
          <div className="home__badge">
            <span className="home__badge-dot" />
            <span className="eyebrow">{contact.availabilityStatus}</span>
          </div>

          <h1 className="home__name">{about.name}</h1>
          <p className="home__role">
            {about.title.toUpperCase()} — {about.location.toUpperCase()}
          </p>

          <p className="home__lead">{about.heroTagline}</p>
          <p className="home__summary">{about.heroSummary}</p>

          <div className="home__actions">
            <Link to="/portfolio" className="btn btn--primary">
              View Portfolio
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square">
                <path d="M4 12h15M13 6l6 6-6 6" />
              </svg>
            </Link>
            <a href={about.resumeUrl} className="btn btn--secondary" download>
              Download CV
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square">
                <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
              </svg>
            </a>
          </div>
        </div>

        <div className="home__glance">
          <span className="home__glance-corner home__glance-corner--tl" />
          <span className="home__glance-corner home__glance-corner--tr" />
          <span className="home__glance-corner home__glance-corner--bl" />
          <span className="home__glance-corner home__glance-corner--br" />
          <span className="eyebrow">At a glance</span>
          <div className="home__glance-list">
            {about.atAGlance.map((row) => (
              <div className="home__glance-row" key={row.label}>
                <span className="home__glance-label">{row.label.toUpperCase()}</span>
                <span className="home__glance-value">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="home__tools">
        <span className="eyebrow">Working with daily</span>
        <div className="home__tools-row">
          {about.dailyTools.map((tool) => (
            <ToolIcon key={tool.name} {...tool} />
          ))}
        </div>
      </div>
    </div>
  )
}

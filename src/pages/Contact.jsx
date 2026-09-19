import CornerFrame from '../components/CornerFrame'
import WorldMap from '../components/WorldMap'
import contact from '../data/contact.json'
import './Contact.css'

function formatCoordinate(value, positiveLabel, negativeLabel) {
  const suffix = value >= 0 ? positiveLabel : negativeLabel
  return `${Math.abs(value).toFixed(2)}° ${suffix}`
}

function linkedInHandle(url) {
  return url.replace(/^https?:\/\/(www\.)?linkedin\.com\//, '')
}

function stripProtocol(url) {
  return url.replace(/^https?:\/\//, '')
}

const ARROW_ICON = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--fg2)" strokeWidth="1.6" strokeLinecap="square">
    <path d="M8 16L18 6M10 6h8v8" />
  </svg>
)

const LINKS = [
  {
    key: 'email',
    label: 'Email',
    value: contact.email,
    href: `mailto:${contact.email}`,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2.5" y="5" width="19" height="14" />
        <path d="M3 6l9 6.5L21 6" />
      </svg>
    ),
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    value: linkedInHandle(contact.linkedInUrl),
    href: contact.linkedInUrl,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    key: 'github',
    label: 'GitHub',
    value: stripProtocol(contact.githubUrl),
    href: contact.githubUrl,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round">
        <path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 4.5-1.4 4.5-5a3.9 3.9 0 0 0-1.1-2.7 3.6 3.6 0 0 0-.1-2.7s-1.2-.4-3.8 1.4a9.3 9.3 0 0 0-5 0C6.4 4 5.2 4.4 5.2 4.4a3.6 3.6 0 0 0-.1 2.7A3.9 3.9 0 0 0 4 9.8c0 3.6 1.7 4.7 4.5 5-.6.6-.6 1.2-.5 2V20" />
      </svg>
    ),
  },
]

export default function Contact() {
  const { location } = contact
  const coordinateLabel = `${formatCoordinate(location.lat, 'N', 'S')}, ${formatCoordinate(location.lon, 'E', 'W')}`

  return (
    <div className="contact">
      <span className="eyebrow">03 / Contact</span>

      <div className="contact__grid">
        <div className="contact__intro">
          <h1 className="contact__heading">Get in touch</h1>
          <p className="contact__lead">{contact.intro}</p>

          <div className="contact__status">
            <span className="contact__status-dot" />
            <span className="contact__status-text">{contact.availabilityStatus.toUpperCase()}</span>
          </div>

          <div className="contact__links">
            {LINKS.map(({ key, label, value, href, icon }) => (
              <a key={key} href={href} className="contact__link-row" target="_blank" rel="noreferrer">
                {icon}
                <span className="contact__link-body">
                  <span className="contact__link-label">{label.toUpperCase()}</span>
                  <span className="contact__link-value">{value}</span>
                </span>
                {ARROW_ICON}
              </a>
            ))}
          </div>
        </div>

        <CornerFrame className="contact__map-box">
          <div className="contact__map-heading">
            <span>LOCATION</span>
            <span>{coordinateLabel}</span>
          </div>

          <WorldMap />

          <div className="contact__map-footer">
            <span className="contact__map-city">
              {location.city}, {location.country}
            </span>
            <span className="contact__map-meta">
              {location.timezoneLabel} · {location.remoteScope.toUpperCase()}
            </span>
          </div>
        </CornerFrame>
      </div>
    </div>
  )
}

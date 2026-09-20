import about from '../data/about.json'
import { simpleIconUrl } from '../utils/icons'
import './About.css'

function SkillChip({ name, iconSlug }) {
  return (
    <span className={`chip${iconSlug ? '' : ' chip--mono'}`}>
      {iconSlug && <img className="chip__icon" src={simpleIconUrl(iconSlug)} alt="" />}
      {name}
    </span>
  )
}

function CertificationRow({ name, issuer, year, iconSlug }) {
  return (
    <div className="about-cert">
      <span className="about-cert__icon">
        {iconSlug ? (
          <img src={simpleIconUrl(iconSlug)} alt="" className="chip__icon" />
        ) : (
          issuer.slice(0, 3).toLowerCase()
        )}
      </span>
      <span className="about-cert__body">
        <span className="about-cert__name">{name}</span>
        <span className="about-cert__issuer">{issuer.toUpperCase()}</span>
      </span>
      <span className="about-cert__year">{year}</span>
    </div>
  )
}

export default function About() {
  return (
    <div className="about">
      <span className="eyebrow">01 / About</span>

      <div className="about__intro">
        <h1 className="about__name">{about.name}</h1>
        <p className="about__role">
          {about.title.toUpperCase()} — {about.currentCompany.toUpperCase()}
        </p>

        <div className="about__bio-group">
          {about.bio.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>

        <a href={about.resumeUrl} className="btn btn--primary" download>
          Download CV (PDF)
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square">
            <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
          </svg>
        </a>
      </div>

      <section className="about-section">
        <h2 className="section-heading">Career</h2>
        <div className="about-timeline">
          {about.timeline.map((role, index) => (
            <div className="about-timeline__row" key={`${role.company}-${role.startDate}`}>
              <span className="about-timeline__date">
                {role.startDate.toUpperCase()} — {role.endDate.toUpperCase()}
              </span>
              <div className="about-timeline__marker">
                <span className="about-timeline__dot" />
                {index < about.timeline.length - 1 && <span className="about-timeline__line" />}
              </div>
              <div>
                <h3 className="about-timeline__role">{role.role}</h3>
                <p className="about-timeline__meta">
                  {role.company.toUpperCase()} · {role.location.toUpperCase()}
                </p>
                <p className="about-timeline__description">{role.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2 className="section-heading">Skills</h2>
        <div className="about-skills">
          {about.skills.map((group) => (
            <div key={group.category}>
              <span className="about-skills__label">{group.category.toUpperCase()}</span>
              <div className="about-skills__chips">
                {group.items.map((item) => (
                  <SkillChip key={item.name} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2 className="section-heading">Certifications</h2>
        <div className="about-certs">
          {about.certifications.map((cert) => (
            <CertificationRow key={cert.name} {...cert} />
          ))}
        </div>
      </section>

      <section className="about-section about-education-grid">
        <div>
          <h2 className="section-heading">Education</h2>
          <div className="about-education">
            {about.education.map((entry) => (
              <div className="about-education__row" key={entry.degree}>
                <div className="about-education__line">
                  <span className="about-education__degree">{entry.degree}</span>
                  <span className="about-education__year">{entry.year}</span>
                </div>
                <span className="about-education__institution">{entry.institution}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

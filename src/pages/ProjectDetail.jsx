import { Link, useParams } from 'react-router-dom'
import CornerFrame from '../components/CornerFrame'
import projectsData from '../data/projects.json'
import { categoryName } from '../utils/categories'
import { simpleIconUrl } from '../utils/icons'
import './ProjectDetail.css'

const { projects } = projectsData

function DetailSection({ number, title, caption, children }) {
  return (
    <section className="detail-section">
      <div className="detail-section__grid">
        <div className="detail-section__label">
          <span className="detail-section__number">{number}</span>
          <h2 className="detail-section__title">{title}</h2>
          {caption && <span className="detail-section__caption">{caption}</span>}
        </div>
        <div className="detail-section__content">{children}</div>
      </div>
    </section>
  )
}

function DetailSectionFull({ number, title, children }) {
  return (
    <section className="detail-section">
      <span className="detail-section__number">{number}</span>
      <h2 className="detail-section__title-full">{title}</h2>
      {children}
    </section>
  )
}

function ImagePlaceholder({ src, alt, aspect = '16 / 9' }) {
  if (src) {
    return <img src={src} alt={alt} className="detail-image" style={{ aspectRatio: aspect }} />
  }
  return (
    <div className="detail-image detail-image--placeholder" style={{ aspectRatio: aspect }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="1" />
        <circle cx="8.5" cy="9.5" r="1.5" />
        <path d="M21 16l-5-5-9 9" />
      </svg>
      <span>Image coming soon</span>
    </div>
  )
}

function TechChip({ name, iconSlug }) {
  return (
    <span className={`chip chip--lg${iconSlug ? '' : ' chip--mono'}`}>
      {iconSlug && <img className="chip__icon" src={simpleIconUrl(iconSlug)} alt="" />}
      {name}
    </span>
  )
}

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <div className="detail-not-found">
        <span className="eyebrow">Project not found</span>
        <h1>We couldn't find that project</h1>
        <p>It may have been renamed or removed. Head back to the portfolio to see current work.</p>
        <Link to="/portfolio" className="btn btn--primary">
          Back to Portfolio
        </Link>
      </div>
    )
  }

  const hasDataModel = Boolean(project.dataModel)
  const hasInfrastructure = project.infrastructure && project.infrastructure.length > 0
  const hasScreenshots = project.screenshots && project.screenshots.length > 0

  return (
    <div className="detail">
      <Link to="/portfolio" className="detail-back">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square">
          <path d="M20 12H5M11 6l-6 6 6 6" />
        </svg>
        All Projects
      </Link>

      <div className="detail-header">
        <span className="detail-header__category">{categoryName(project.category).toUpperCase()}</span>
        <h1 className="detail-header__title">{project.title}</h1>
        <p className="detail-header__lead">{project.heroSummary}</p>

        <div className="detail-header__actions">
          {project.links.github && (
            <a href={project.links.github} className="btn btn--primary" target="_blank" rel="noreferrer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 4.5-1.4 4.5-5a3.9 3.9 0 0 0-1.1-2.7 3.6 3.6 0 0 0-.1-2.7s-1.2-.4-3.8 1.4a9.3 9.3 0 0 0-5 0C6.4 4 5.2 4.4 5.2 4.4a3.6 3.6 0 0 0-.1 2.7A3.9 3.9 0 0 0 4 9.8c0 3.6 1.7 4.7 4.5 5-.6.6-.6 1.2-.5 2V20" />
              </svg>
              Repository
            </a>
          )}
          {project.links.demo && (
            <a href={project.links.demo} className="btn btn--secondary" target="_blank" rel="noreferrer">
              Live dashboard
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square">
                <path d="M8 16L18 6M10 6h8v8" />
              </svg>
            </a>
          )}
        </div>
      </div>

      <DetailSection number="01" title="The problem">
        <div className="detail-prose">
          {project.problemStatement.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </DetailSection>

      <DetailSection number="02" title="Architecture">
        <CornerFrame className="detail-figure">
          <ImagePlaceholder src={project.architecture.imageUrl} alt={project.architecture.caption} aspect="16 / 9" />
        </CornerFrame>
        <span className="detail-caption">{project.architecture.caption}</span>
      </DetailSection>

      <DetailSection number="03" title="Tech stack">
        <div className="detail-chips">
          {project.techStack.map((tech) => (
            <TechChip key={tech.name} {...tech} />
          ))}
        </div>
      </DetailSection>

      <DetailSection number="04" title="Data sources">
        <div className="detail-table">
          <div className="detail-table__row detail-table__row--head">
            <span>SOURCE</span>
            <span>FORMAT</span>
          </div>
          {project.dataSources.map((row) => (
            <div className="detail-table__row" key={row.source}>
              <span>{row.source}</span>
              <span className="detail-table__format">{row.format}</span>
            </div>
          ))}
        </div>
      </DetailSection>

      <DetailSection number="05" title="The pipeline">
        <div className="detail-pipeline">
          {project.pipeline.map((stage) => (
            <div className="detail-pipeline__stage" key={stage.stage}>
              <span className="detail-pipeline__stage-label">STAGE {stage.stage}</span>
              <h4 className="detail-pipeline__stage-title">{stage.title}</h4>
              <p className="detail-pipeline__stage-description">{stage.description}</p>
            </div>
          ))}
        </div>
      </DetailSection>

      {hasDataModel && (
        <DetailSection number="06" title="Data model">
          <p className="detail-prose-lead">{project.dataModel.summary}</p>
          <div className="detail-model-grid">
            {project.dataModel.tables.map((table) => (
              <div className="detail-model-card" key={table.name}>
                <div className="detail-model-card__head">
                  <span className="detail-model-card__name">{table.name}</span>
                  <span className="detail-model-card__type">{table.type.toUpperCase()}</span>
                </div>
                <span className="detail-model-card__grain">GRAIN — {table.grain.toUpperCase()}</span>
                <p className="detail-model-card__description">{table.description}</p>
              </div>
            ))}
          </div>
          <span className="detail-caption">{project.dataModel.footnote}</span>
        </DetailSection>
      )}

      {hasInfrastructure && (
        <DetailSection number="07" title="Infrastructure & deployment">
          <div className="detail-infra-grid">
            {project.infrastructure.map((item) => (
              <div className="detail-infra-item" key={item.label}>
                <span className="detail-infra-item__label">{item.label.toUpperCase()}</span>
                <p className="detail-infra-item__description">{item.description}</p>
              </div>
            ))}
          </div>
        </DetailSection>
      )}

      <DetailSection number="08" title="Challenges">
        <div className="detail-challenges">
          {project.challenges.map((item) => (
            <div className="detail-challenge" key={item.challenge.slice(0, 24)}>
              <div>
                <span className="detail-challenge__label">CHALLENGE</span>
                <p className="detail-challenge__text">{item.challenge}</p>
              </div>
              <div>
                <span className="detail-challenge__label detail-challenge__label--solution">SOLUTION</span>
                <p className="detail-challenge__text detail-challenge__text--solution">{item.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </DetailSection>

      <DetailSectionFull number="09" title="Results">
        <div className="detail-stats">
          {project.results.map((stat) => (
            <CornerFrame className="detail-stat" variant="diagonal" key={stat.label}>
              <span className="detail-stat__value">{stat.value}</span>
              <span className="detail-stat__label">{stat.label}</span>
            </CornerFrame>
          ))}
        </div>
      </DetailSectionFull>

      {hasScreenshots && (
        <DetailSectionFull number="10" title="Dashboards">
          <div className="detail-gallery">
            {project.screenshots.map((shot) => (
              <figure className="detail-gallery__item" key={shot.caption}>
                <CornerFrame variant="diagonal">
                  <ImagePlaceholder src={shot.url} alt={shot.caption} aspect="16 / 10" />
                </CornerFrame>
                <figcaption className="detail-caption">{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </DetailSectionFull>
      )}

      {project.writeUp && (
        <DetailSection number="11" title="Write-up" caption={project.writeUp.readTime.toUpperCase()}>
          <p className="detail-prose-lead">{project.writeUp.lead}</p>
          <div className="detail-prose detail-prose--secondary">
            {project.writeUp.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          {project.writeUp.retro && (
            <>
              <h3 className="detail-retro__title">{project.writeUp.retro.title}</h3>
              <p className="detail-retro__text">{project.writeUp.retro.text}</p>
            </>
          )}
          {project.writeUp.externalUrl && (
            <a href={project.writeUp.externalUrl} className="btn btn--secondary" target="_blank" rel="noreferrer">
              Read the full write-up
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square">
                <path d="M8 16L18 6M10 6h8v8" />
              </svg>
            </a>
          )}
        </DetailSection>
      )}

      <div className="detail-tags">
        <span className="detail-tags__label">TAGS</span>
        {project.tags.map((tag) => (
          <span key={tag} className="tag-pill">
            {tag.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  )
}

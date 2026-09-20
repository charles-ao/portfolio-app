import CornerFrame from '../components/CornerFrame'
import ProjectCard from '../components/ProjectCard'
import { ALL, useProjectFilters } from '../hooks/useProjectFilters'
import projectsData from '../data/projects.json'
import categoriesData from '../data/categories.json'
import toolsData from '../data/tools.json'
import './Portfolio.css'

const { projects } = projectsData
const { categories } = categoriesData
const { tools } = toolsData

function joinWithAnd(items) {
  if (items.length === 0) return ''
  if (items.length === 1) return items[0]
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

function buildEmptyMessage({ categoryName, tool, search }) {
  const clauses = []
  if (categoryName) clauses.push(`in ${categoryName}`)
  if (tool !== ALL) clauses.push(`using ${tool}`)

  let sentence = clauses.length > 0 ? `Nothing ${clauses.join(' ')}` : 'Nothing'
  sentence += search ? ` matches “${search}”.` : ' matches these filters.'
  sentence += ' Try a different tool, or clear the search.'
  return sentence
}

export default function Portfolio() {
  const { category, setCategory, tool, setTool, search, setSearch, filtered, clearFilters } =
    useProjectFilters(projects)

  const totalCount = projects.length
  const categoryNames = categories.map((c) => c.name)
  const activeCategoryName = categories.find((c) => c.id === category)?.name ?? null

  return (
    <div className="portfolio">
      <span className="eyebrow">02 / Portfolio</span>

      <div className="portfolio__header">
        <div>
          <h1 className="portfolio__heading">Selected work</h1>
          <p className="portfolio__description">
            {totalCount > 0
              ? `${totalCount} case stud${totalCount === 1 ? 'y' : 'ies'} across ${joinWithAnd(categoryNames)}.`
              : 'New case studies are on the way.'}
          </p>
        </div>
        {totalCount > 0 && (
          <span className="portfolio__count">
            SHOWING <span className="portfolio__count-value">{filtered.length}</span> OF {totalCount}
          </span>
        )}
      </div>

      {totalCount > 0 && (
        <div className="portfolio__filters">
          <div className="portfolio__chips">
            <button
              type="button"
              className={`portfolio__chip${category === ALL ? ' portfolio__chip--active' : ''}`}
              onClick={() => setCategory(ALL)}
              aria-pressed={category === ALL}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`portfolio__chip${category === c.id ? ' portfolio__chip--active' : ''}`}
                onClick={() => setCategory(c.id)}
                aria-pressed={category === c.id}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="portfolio__controls">
            <label className="portfolio__search">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--fg2)" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="6.5" />
                <path d="M16 16l4.5 4.5" />
              </svg>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search projects"
                aria-label="Search projects"
              />
            </label>

            <div className="portfolio__tool-select">
              <span className="portfolio__tool-select-label">Tool: {tool === ALL ? 'All' : tool}</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square">
                <path d="M6 9l6 6 6-6" />
              </svg>
              <select
                className="portfolio__tool-select-input"
                value={tool}
                onChange={(event) => setTool(event.target.value)}
                aria-label="Filter by tool"
              >
                <option value={ALL}>All</option>
                {tools.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {totalCount > 0 && filtered.length > 0 && (
        <div className="portfolio__grid">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {totalCount > 0 && filtered.length === 0 && (
        <CornerFrame className="portfolio__empty">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" className="portfolio__empty-icon">
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l4.5 4.5M8.5 11h5" />
          </svg>
          <h3 className="portfolio__empty-heading">No projects match these filters</h3>
          <p className="portfolio__empty-text">
            {buildEmptyMessage({ categoryName: activeCategoryName, tool, search })}
          </p>
          <div className="portfolio__empty-actions">
            <button type="button" className="btn btn--primary" onClick={clearFilters}>
              Clear all filters
            </button>
            <button type="button" className="btn btn--secondary" onClick={clearFilters}>
              Browse all {totalCount} projects
            </button>
          </div>
        </CornerFrame>
      )}

      {totalCount === 0 && (
        <CornerFrame className="portfolio__empty">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" className="portfolio__empty-icon">
            <rect x="4" y="7" width="16" height="13" rx="1" />
            <path d="M4 10h16M9 4h6" />
          </svg>
          <h3 className="portfolio__empty-heading">No projects yet</h3>
          <p className="portfolio__empty-text">Check back soon — new case studies are on the way.</p>
        </CornerFrame>
      )}
    </div>
  )
}

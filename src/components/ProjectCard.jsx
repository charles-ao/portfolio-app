import { Link } from 'react-router-dom'
import categories from '../data/categories.json'
import { simpleIconUrl } from '../utils/icons'
import './ProjectCard.css'

function categoryName(categoryId) {
  return categories.categories.find((c) => c.id === categoryId)?.name ?? categoryId
}

export default function ProjectCard({ project }) {
  return (
    <Link to={`/portfolio/${project.id}`} className="project-card">
      <div className="project-card__thumb">
        <img src={simpleIconUrl(project.thumbnailIcon)} alt="" className="project-card__thumb-icon" />
        <span className="project-card__badge">{categoryName(project.category).toUpperCase()}</span>
      </div>
      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__summary">{project.summary}</p>
        <div className="project-card__tags">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech.name} className="project-card__tag">
              {tech.name.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

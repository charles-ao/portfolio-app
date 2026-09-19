import { useParams } from 'react-router-dom'

export default function ProjectDetail() {
  const { id } = useParams()

  return (
    <div className="page-placeholder">
      <span className="page-placeholder__eyebrow">04 / PROJECT DETAIL</span>
      <h1>Project detail — coming soon</h1>
      <p>Will render the case study for project id: {id}</p>
    </div>
  )
}

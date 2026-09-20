import { useMemo, useState } from 'react'

export const ALL = 'all'

/**
 * Category + tool + free-text filtering for the Portfolio page.
 * All three filters combine with AND logic. Search matches against
 * title, summary, tags and tech-stack names.
 */
export function useProjectFilters(projects) {
  const [category, setCategory] = useState(ALL)
  const [tool, setTool] = useState(ALL)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()

    return projects.filter((project) => {
      const matchesCategory = category === ALL || project.category === category
      const matchesTool = tool === ALL || project.techStack.some((t) => t.name === tool)
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.summary.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        project.techStack.some((t) => t.name.toLowerCase().includes(query))

      return matchesCategory && matchesTool && matchesSearch
    })
  }, [projects, category, tool, search])

  const hasActiveFilters = category !== ALL || tool !== ALL || search.trim() !== ''

  function clearFilters() {
    setCategory(ALL)
    setTool(ALL)
    setSearch('')
  }

  return {
    category,
    setCategory,
    tool,
    setTool,
    search,
    setSearch,
    filtered,
    hasActiveFilters,
    clearFilters,
  }
}

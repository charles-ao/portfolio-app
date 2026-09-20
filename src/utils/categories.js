import categoriesData from '../data/categories.json'

const { categories } = categoriesData

export function categoryName(categoryId) {
  return categories.find((c) => c.id === categoryId)?.name ?? categoryId
}

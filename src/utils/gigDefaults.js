import { GIG_CATEGORIES } from './constants'

export function getEmptyGig() {
  return {
    title: '',
    description: '',
    price: '',
    category: GIG_CATEGORIES[0],
    location: '',
  }
}

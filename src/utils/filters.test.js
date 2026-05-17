import { describe, expect, it } from 'vitest'
import { filterGigs } from './filters'

const gigs = [
  {
    id: 1,
    title: 'Logo Design',
    description: 'Campus club branding',
    location: 'On Campus',
    category: 'Design',
  },
  {
    id: 2,
    title: 'React Tutoring',
    description: 'Help with hooks homework',
    location: 'Remote',
    category: 'Tutoring',
  },
]

describe('filterGigs', () => {
  it('returns all gigs when no filters applied', () => {
    expect(filterGigs(gigs)).toHaveLength(2)
  })

  it('filters by search term in title', () => {
    expect(filterGigs(gigs, { search: 'react' })).toHaveLength(1)
  })

  it('filters by category', () => {
    expect(filterGigs(gigs, { category: 'Design' })).toHaveLength(1)
  })

  it('filters by search and category together', () => {
    expect(filterGigs(gigs, { search: 'campus', category: 'Design' })).toHaveLength(1)
    expect(filterGigs(gigs, { search: 'remote', category: 'Design' })).toHaveLength(0)
  })

  it('matches description and location in search', () => {
    expect(filterGigs(gigs, { search: 'hooks' })).toHaveLength(1)
    expect(filterGigs(gigs, { search: 'remote' })).toHaveLength(1)
  })
})

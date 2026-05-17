import { describe, expect, it } from 'vitest'
import { formatDate, formatPrice, GIG_CATEGORIES } from './constants'

describe('constants utilities', () => {
  it('exports gig categories', () => {
    expect(GIG_CATEGORIES).toContain('Design')
    expect(GIG_CATEGORIES.length).toBeGreaterThan(3)
  })

  it('formats price in KES', () => {
    expect(formatPrice(1500)).toMatch(/1,?500/)
  })

  it('formats ISO dates', () => {
    expect(formatDate('2026-05-10T10:00:00.000Z')).toMatch(/2026/)
  })

  it('returns empty string for missing date', () => {
    expect(formatDate(null)).toBe('')
  })
})

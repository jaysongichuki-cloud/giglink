import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BrowseGigs from './BrowseGigs'
import { fetchGigs } from '../api/gigs'

vi.mock('../api/gigs', () => ({
  fetchGigs: vi.fn(),
}))

const sampleGigs = [
  {
    id: 1,
    title: 'Design Logo',
    description: 'Club logo',
    price: 1000,
    category: 'Design',
    location: 'Campus',
    createdAt: '2026-05-10',
  },
]

describe('BrowseGigs page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders gigs from API', async () => {
    fetchGigs.mockResolvedValue(sampleGigs)
    render(
      <MemoryRouter>
        <BrowseGigs />
      </MemoryRouter>,
    )
    await waitFor(() => {
      expect(screen.getByText('Design Logo')).toBeInTheDocument()
    })
  })

  it('shows error when API fails', async () => {
    fetchGigs.mockRejectedValue(new Error('fail'))
    render(
      <MemoryRouter>
        <BrowseGigs />
      </MemoryRouter>,
    )
    await waitFor(() => {
      expect(screen.getByText(/could not load gigs/i)).toBeInTheDocument()
    })
  })
})

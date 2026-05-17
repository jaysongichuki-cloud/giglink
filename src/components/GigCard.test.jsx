import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import GigCard from './GigCard'

const gig = {
  id: 1,
  title: 'Test Gig',
  description: 'A sample gig for testing',
  price: 2000,
  category: 'Design',
  location: 'Remote',
  createdAt: '2026-05-10T10:00:00.000Z',
}

function renderCard() {
  return render(
    <MemoryRouter>
      <GigCard gig={gig} />
    </MemoryRouter>,
  )
}

describe('GigCard', () => {
  it('renders gig title and description', () => {
    renderCard()
    expect(screen.getByText('Test Gig')).toBeInTheDocument()
    expect(screen.getByText(/sample gig/i)).toBeInTheDocument()
  })

  it('links to gig detail page', () => {
    renderCard()
    const link = screen.getByRole('link', { name: /view/i })
    expect(link).toHaveAttribute('href', '/gigs/1')
  })
})

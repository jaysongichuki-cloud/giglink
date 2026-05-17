import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

const mockUseAuth = vi.fn()

vi.mock('../auth/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}))

describe('Home page', () => {
  it('renders hero headline and browse link', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false })
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/quick gigs/i)
    expect(screen.getByRole('link', { name: /browse gigs/i })).toHaveAttribute('href', '/gigs')
  })

  it('shows post gig when authenticated', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true })
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /post a gig/i })).toHaveAttribute('href', '/create')
  })
})

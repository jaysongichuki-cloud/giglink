import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

vi.mock('../auth/AuthContext', () => ({
  useAuth: vi.fn(),
}))

import { useAuth } from '../auth/AuthContext'

describe('Navbar', () => {
  it('shows sign in when logged out', () => {
    useAuth.mockReturnValue({
      isAuthenticated: false,
      isFirebaseConfigured: true,
      user: null,
      logout: vi.fn(),
    })
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument()
  })

  it('shows dashboard links when authenticated', () => {
    useAuth.mockReturnValue({
      isAuthenticated: true,
      isFirebaseConfigured: true,
      user: { name: 'Alex' },
      logout: vi.fn(),
    })
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    )
    expect(screen.getAllByText(/dashboard/i).length).toBeGreaterThan(0)
    expect(screen.getByText('Alex')).toBeInTheDocument()
  })
})

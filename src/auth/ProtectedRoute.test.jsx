import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

vi.mock('./AuthContext', () => ({
  useAuth: vi.fn(),
}))

import { useAuth } from './AuthContext'

function renderWithRouter(ui, { path = '/dashboard' } = {}) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/dashboard" element={ui} />
        <Route path="/login" element={<div>Login page</div>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('ProtectedRoute', () => {
  it('shows spinner while loading', () => {
    useAuth.mockReturnValue({
      loading: true,
      isAuthenticated: false,
      isFirebaseConfigured: true,
    })
    renderWithRouter(
      <ProtectedRoute>
        <div>Secret</div>
      </ProtectedRoute>,
    )
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('redirects when not authenticated', () => {
    useAuth.mockReturnValue({
      loading: false,
      isAuthenticated: false,
      isFirebaseConfigured: true,
    })
    renderWithRouter(
      <ProtectedRoute>
        <div>Secret</div>
      </ProtectedRoute>,
    )
    expect(screen.getByText('Login page')).toBeInTheDocument()
  })

  it('renders children when authenticated', () => {
    useAuth.mockReturnValue({
      loading: false,
      isAuthenticated: true,
      isFirebaseConfigured: true,
    })
    renderWithRouter(
      <ProtectedRoute>
        <div>Secret</div>
      </ProtectedRoute>,
    )
    expect(screen.getByText('Secret')).toBeInTheDocument()
  })

  it('shows firebase setup message when not configured', () => {
    useAuth.mockReturnValue({
      loading: false,
      isAuthenticated: false,
      isFirebaseConfigured: false,
    })
    renderWithRouter(
      <ProtectedRoute>
        <div>Secret</div>
      </ProtectedRoute>,
    )
    expect(screen.getByText(/add firebase credentials/i)).toBeInTheDocument()
  })
})

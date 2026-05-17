import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import LoadingSpinner from './LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders default label', () => {
    render(<LoadingSpinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('renders custom label', () => {
    render(<LoadingSpinner label="Fetching gigs" />)
    expect(screen.getByText('Fetching gigs')).toBeInTheDocument()
  })
})

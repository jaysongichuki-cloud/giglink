import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  it('shows version and tagline', () => {
    render(<Footer />)
    expect(screen.getByText(/GigLink/i)).toBeInTheDocument()
    expect(screen.getByText(/v1\.0\.0/)).toBeInTheDocument()
  })
})

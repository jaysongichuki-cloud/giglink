import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ApplicationForm from './ApplicationForm'

describe('ApplicationForm', () => {
  it('shows message when already applied', () => {
    render(<ApplicationForm hasApplied onSubmit={vi.fn()} loading={false} />)
    expect(screen.getByText(/already applied/i)).toBeInTheDocument()
  })

  it('submits cover letter', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<ApplicationForm hasApplied={false} onSubmit={onSubmit} loading={false} />)
    await user.type(screen.getByLabelText(/cover letter/i), 'I am a great fit')
    await user.click(screen.getByRole('button', { name: /submit/i }))
    expect(onSubmit).toHaveBeenCalledWith({ coverLetter: 'I am a great fit' })
  })
})

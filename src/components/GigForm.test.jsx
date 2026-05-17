import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GigForm from './GigForm'
import { getEmptyGig } from '../utils/gigDefaults'

describe('GigForm', () => {
  it('getEmptyGig returns default shape', () => {
    expect(getEmptyGig()).toMatchObject({ title: '', category: 'Design' })
  })

  it('calls onSubmit with form values', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<GigForm onSubmit={onSubmit} submitLabel="Save" loading={false} />)

    await user.type(screen.getByLabelText(/^title$/i), 'Tutor needed')
    await user.type(screen.getByLabelText(/^description$/i), 'Help with math')
    await user.type(screen.getByLabelText(/price/i), '500')
    await user.type(screen.getByLabelText(/^location$/i), 'Remote')
    await user.click(screen.getByRole('button', { name: /save/i }))

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Tutor needed',
        price: 500,
        location: 'Remote',
      }),
    )
  })
})

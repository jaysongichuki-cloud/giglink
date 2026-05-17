import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from './SearchBar'

describe('SearchBar', () => {
  it('calls onSearchChange when typing', async () => {
    const user = userEvent.setup()
    const onSearchChange = vi.fn()
    render(
      <SearchBar
        search=""
        category=""
        onSearchChange={onSearchChange}
        onCategoryChange={vi.fn()}
      />,
    )
    await user.type(screen.getByRole('searchbox'), 'tutor')
    expect(onSearchChange).toHaveBeenCalled()
  })

  it('calls onCategoryChange when selecting category', async () => {
    const user = userEvent.setup()
    const onCategoryChange = vi.fn()
    render(
      <SearchBar
        search=""
        category=""
        onSearchChange={vi.fn()}
        onCategoryChange={onCategoryChange}
      />,
    )
    await user.selectOptions(screen.getByRole('combobox'), 'Design')
    expect(onCategoryChange).toHaveBeenCalledWith('Design')
  })
})

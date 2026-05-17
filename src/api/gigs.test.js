import { beforeEach, describe, expect, it, vi } from 'vitest'
import client from './client'
import { createGig, deleteGig, fetchGigById, fetchGigs, updateGig } from './gigs'

vi.mock('./client', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('gigs API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetchGigs returns data from client', async () => {
    client.get.mockResolvedValue({ data: [{ id: 1 }] })
    const result = await fetchGigs()
    expect(client.get).toHaveBeenCalledWith('/gigs', { params: {} })
    expect(result).toEqual([{ id: 1 }])
  })

  it('fetchGigById fetches single gig', async () => {
    client.get.mockResolvedValue({ data: { id: 2 } })
    const result = await fetchGigById(2)
    expect(client.get).toHaveBeenCalledWith('/gigs/2')
    expect(result.id).toBe(2)
  })

  it('createGig posts with createdAt', async () => {
    client.post.mockResolvedValue({ data: { id: 3, title: 'New' } })
    const result = await createGig({ title: 'New' })
    expect(client.post).toHaveBeenCalled()
    expect(result.title).toBe('New')
  })

  it('updateGig patches gig', async () => {
    client.patch.mockResolvedValue({ data: { id: 1, title: 'Updated' } })
    const result = await updateGig(1, { title: 'Updated' })
    expect(result.title).toBe('Updated')
  })

  it('deleteGig calls delete endpoint', async () => {
    client.delete.mockResolvedValue({})
    await deleteGig(1)
    expect(client.delete).toHaveBeenCalledWith('/gigs/1')
  })
})

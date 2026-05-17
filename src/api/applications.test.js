import { beforeEach, describe, expect, it, vi } from 'vitest'
import client from './client'
import {
  createApplication,
  deleteApplication,
  fetchApplications,
  updateApplicationStatus,
} from './applications'

vi.mock('./client', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('applications API', () => {
  beforeEach(() => vi.clearAllMocks())

  it('fetchApplications', async () => {
    client.get.mockResolvedValue({ data: [] })
    await fetchApplications({ gigId: 1 })
    expect(client.get).toHaveBeenCalledWith('/applications', { params: { gigId: 1 } })
  })

  it('createApplication sets pending status', async () => {
    client.post.mockResolvedValue({ data: { id: 1, status: 'pending' } })
    const result = await createApplication({ gigId: 1, coverLetter: 'Hi' })
    expect(result.status).toBe('pending')
    expect(client.post).toHaveBeenCalled()
  })

  it('updateApplicationStatus', async () => {
    client.patch.mockResolvedValue({ data: { id: 1, status: 'accepted' } })
    const result = await updateApplicationStatus(1, 'accepted')
    expect(result.status).toBe('accepted')
  })

  it('deleteApplication', async () => {
    client.delete.mockResolvedValue({})
    await deleteApplication(1)
    expect(client.delete).toHaveBeenCalledWith('/applications/1')
  })
})

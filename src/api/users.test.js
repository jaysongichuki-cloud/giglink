import { beforeEach, describe, expect, it, vi } from 'vitest'
import client from './client'
import { createUser, fetchUsers, findUserByFirebaseUid, updateUser } from './users'

vi.mock('./client', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
}))

describe('users API', () => {
  beforeEach(() => vi.clearAllMocks())

  it('fetchUsers', async () => {
    client.get.mockResolvedValue({ data: [] })
    await fetchUsers()
    expect(client.get).toHaveBeenCalledWith('/users')
  })

  it('findUserByFirebaseUid returns first match', async () => {
    client.get.mockResolvedValue({ data: [{ id: 'u1' }] })
    const user = await findUserByFirebaseUid('uid-1')
    expect(user.id).toBe('u1')
  })

  it('findUserByFirebaseUid returns null when empty', async () => {
    client.get.mockResolvedValue({ data: [] })
    expect(await findUserByFirebaseUid('x')).toBeNull()
  })

  it('createUser', async () => {
    client.post.mockResolvedValue({ data: { id: 'new' } })
    const user = await createUser({ name: 'Test' })
    expect(user.id).toBe('new')
  })

  it('updateUser', async () => {
    client.patch.mockResolvedValue({ data: { id: 'u1', name: 'Updated' } })
    const user = await updateUser('u1', { name: 'Updated' })
    expect(user.name).toBe('Updated')
  })
})

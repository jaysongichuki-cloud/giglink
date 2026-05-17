import client from './client'

export async function fetchUsers() {
  const { data } = await client.get('/users')
  return data
}

export async function findUserByFirebaseUid(firebaseUid) {
  const { data } = await client.get('/users', {
    params: { firebaseUid },
  })
  return data[0] ?? null
}

export async function createUser(user) {
  const { data } = await client.post('/users', user)
  return data
}

export async function updateUser(id, user) {
  const { data } = await client.patch(`/users/${id}`, user)
  return data
}

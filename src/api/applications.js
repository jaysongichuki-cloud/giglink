import client from './client'

export async function fetchApplications(params = {}) {
  const { data } = await client.get('/applications', { params })
  return data
}

export async function createApplication(application) {
  const { data } = await client.post('/applications', {
    ...application,
    status: 'pending',
    createdAt: new Date().toISOString(),
  })
  return data
}

export async function updateApplicationStatus(id, status) {
  const { data } = await client.patch(`/applications/${id}`, { status })
  return data
}

export async function deleteApplication(id) {
  await client.delete(`/applications/${id}`)
}

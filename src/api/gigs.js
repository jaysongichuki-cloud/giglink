import client from './client'

export async function fetchGigs(params = {}) {
  const { data } = await client.get('/gigs', { params })
  return data
}

export async function fetchGigById(id) {
  const { data } = await client.get(`/gigs/${id}`)
  return data
}

export async function createGig(gig) {
  const { data } = await client.post('/gigs', {
    ...gig,
    createdAt: new Date().toISOString(),
  })
  return data
}

export async function updateGig(id, gig) {
  const { data } = await client.patch(`/gigs/${id}`, gig)
  return data
}

export async function deleteGig(id) {
  await client.delete(`/gigs/${id}`)
}

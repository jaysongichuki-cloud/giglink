export function filterGigs(gigs, { search = '', category = '' } = {}) {
  const term = search.trim().toLowerCase()
  return gigs.filter((gig) => {
    const matchesCategory = !category || gig.category === category
    const matchesSearch =
      !term ||
      gig.title.toLowerCase().includes(term) ||
      gig.description.toLowerCase().includes(term) ||
      gig.location.toLowerCase().includes(term)
    return matchesCategory && matchesSearch
  })
}

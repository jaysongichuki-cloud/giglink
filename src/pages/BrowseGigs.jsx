import { useEffect, useMemo, useState } from 'react'
import { fetchGigs } from '../api/gigs'
import GigCard from '../components/GigCard'
import LoadingSpinner from '../components/LoadingSpinner'
import SearchBar from '../components/SearchBar'
import { filterGigs } from '../utils/filters'

export default function BrowseGigs() {
  const [gigs, setGigs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchGigs()
      .then((data) => {
        if (!cancelled) setGigs(data)
      })
      .catch(() => {
        if (!cancelled) {
          setError('Could not load gigs. Make sure JSON Server is running (npm run server).')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = useMemo(
    () => filterGigs(gigs, { search, category }),
    [gigs, search, category],
  )

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 text-left">
        <h1 className="text-3xl font-bold text-slate-900">Browse gigs</h1>
        <p className="mt-2 text-slate-600">
          Search student-friendly freelance opportunities on campus and online.
        </p>
      </div>

      <SearchBar
        search={search}
        category={category}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
      />

      {loading && (
        <div className="py-16">
          <LoadingSpinner label="Loading gigs…" />
        </div>
      )}

      {error && (
        <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800">
          {error}
        </p>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p className="mt-8 text-center text-slate-500">No gigs match your search.</p>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((gig) => (
          <GigCard key={gig.id} gig={gig} />
        ))}
      </div>
    </section>
  )
}

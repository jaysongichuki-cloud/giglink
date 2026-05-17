import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createGig } from '../api/gigs'
import GigForm from '../components/GigForm'
import { useAuth } from '../auth/AuthContext'

export default function CreateGig() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(values) {
    setLoading(true)
    setError(null)
    try {
      const gig = await createGig({ ...values, userId: user.id })
      navigate(`/gigs/${gig.id}`)
    } catch {
      setError('Failed to create gig. Is JSON Server running?')
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Post a gig</h1>
      <p className="mt-2 text-slate-600">
        Share a quick job opportunity with students on campus.
      </p>

      {error && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800">
          {error}
        </p>
      )}

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <GigForm submitLabel="Publish gig" onSubmit={handleSubmit} loading={loading} />
      </div>
    </section>
  )
}

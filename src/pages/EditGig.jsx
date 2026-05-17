import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchGigById, updateGig } from '../api/gigs'
import GigForm from '../components/GigForm'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '../auth/AuthContext'

export default function EditGig() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [gig, setGig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchGigById(id)
      .then((data) => {
        if (data.userId !== user?.id) {
          setError('You can only edit your own gigs.')
        } else {
          setGig(data)
        }
      })
      .catch(() => setError('Gig not found.'))
      .finally(() => setLoading(false))
  }, [id, user])

  async function handleSubmit(values) {
    setSaving(true)
    setError(null)
    try {
      await updateGig(id, values)
      navigate(`/gigs/${id}`)
    } catch {
      setError('Failed to update gig.')
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="py-20">
        <LoadingSpinner />
      </div>
    )
  }

  if (error && !gig) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center text-red-600">
        {error}
      </div>
    )
  }

  return (
    <section className="mx-auto max-w-xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Edit gig</h1>
      {error && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800">
          {error}
        </p>
      )}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <GigForm
          initialValues={gig}
          submitLabel="Save changes"
          onSubmit={handleSubmit}
          loading={saving}
        />
      </div>
    </section>
  )
}

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { createApplication, fetchApplications } from '../api/applications'
import { fetchGigById } from '../api/gigs'
import ApplicationForm from '../components/ApplicationForm'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '../auth/AuthContext'
import { formatDate, formatPrice } from '../utils/constants'

export default function GigDetail() {
  const { id } = useParams()
  const { user, isAuthenticated } = useAuth()
  const [gig, setGig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hasApplied, setHasApplied] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    Promise.all([fetchGigById(id), fetchApplications({ gigId: id })])
      .then(([gigData, apps]) => {
        if (cancelled) return
        setGig(gigData)
        if (user) {
          setHasApplied(apps.some((a) => a.userId === user.id))
        }
      })
      .catch(() => {
        if (!cancelled) setError('Gig not found or server unavailable.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id, user])

  async function handleApply({ coverLetter }) {
    if (!user) return
    setSubmitting(true)
    setError(null)
    try {
      await createApplication({
        gigId: Number(id),
        userId: user.id,
        applicantName: user.name,
        coverLetter,
      })
      setHasApplied(true)
      setSuccess(true)
    } catch {
      setError('Failed to submit application. Try again.')
    } finally {
      setSubmitting(false)
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
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-red-600">{error}</p>
        <Link to="/gigs" className="mt-4 inline-block text-brand-600 hover:underline">
          Back to gigs
        </Link>
      </div>
    )
  }

  const isOwner = user?.id === gig.userId

  return (
    <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link to="/gigs" className="text-sm text-brand-600 hover:underline">
        ← Back to gigs
      </Link>

      <article className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
          {gig.category}
        </span>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">{gig.title}</h1>
        <p className="mt-4 text-slate-600">{gig.description}</p>
        <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-slate-500">Pay</dt>
            <dd className="font-semibold text-brand-700">{formatPrice(gig.price)}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Location</dt>
            <dd className="font-medium">{gig.location}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Posted</dt>
            <dd className="font-medium">{formatDate(gig.createdAt)}</dd>
          </div>
        </dl>

        {isOwner && (
          <div className="mt-6 flex gap-3">
            <Link
              to={`/gigs/${gig.id}/edit`}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              Edit gig
            </Link>
          </div>
        )}
      </article>

      {success && (
        <p className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-800">
          Application submitted successfully!
        </p>
      )}

      {error && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800">
          {error}
        </p>
      )}

      <div className="mt-8">
        {!isAuthenticated && !isOwner && (
          <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <Link to="/login" className="font-semibold text-brand-600 hover:underline">
              Sign in
            </Link>{' '}
            to apply for this gig.
          </p>
        )}
        {isAuthenticated && !isOwner && (
          <ApplicationForm
            onSubmit={handleApply}
            loading={submitting}
            hasApplied={hasApplied}
          />
        )}
        {isOwner && (
          <p className="text-sm text-slate-500">This is your gig. Manage applications in your dashboard.</p>
        )}
      </div>
    </section>
  )
}

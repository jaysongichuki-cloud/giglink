import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  deleteApplication,
  fetchApplications,
  updateApplicationStatus,
} from '../api/applications'
import { deleteGig, fetchGigs } from '../api/gigs'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '../auth/AuthContext'
import { formatDate, formatPrice } from '../utils/constants'

export default function Dashboard() {
  const { user } = useAuth()
  const [myGigs, setMyGigs] = useState([])
  const [myApplications, setMyApplications] = useState([])
  const [incomingApplications, setIncomingApplications] = useState([])
  const [loading, setLoading] = useState(true)

  const loadData = useCallback(async () => {
    if (!user) return
    setLoading(true)
    try {
      const [gigs, applications] = await Promise.all([
        fetchGigs({ userId: user.id }),
        fetchApplications(),
      ])
      setMyGigs(gigs)
      setMyApplications(applications.filter((a) => a.userId === user.id))
      const myGigIds = new Set(gigs.map((g) => g.id))
      setIncomingApplications(
        applications.filter((a) => myGigIds.has(a.gigId) && a.userId !== user.id),
      )
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    loadData()
  }, [loadData])

  async function handleDeleteGig(id) {
    if (!window.confirm('Delete this gig?')) return
    await deleteGig(id)
    loadData()
  }

  async function handleStatusChange(appId, status) {
    await updateApplicationStatus(appId, status)
    loadData()
  }

  async function handleWithdraw(appId) {
    if (!window.confirm('Withdraw this application?')) return
    await deleteApplication(appId)
    loadData()
  }

  if (loading) {
    return (
      <div className="py-20">
        <LoadingSpinner label="Loading dashboard…" />
      </div>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-slate-600">Welcome back, {user?.name}</p>
        </div>
        <Link
          to="/create"
          className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Post new gig
        </Link>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">My gigs</h2>
          {myGigs.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">You have not posted any gigs yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {myGigs.map((gig) => (
                <li
                  key={gig.id}
                  className="rounded-xl border border-slate-200 bg-white p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <Link
                        to={`/gigs/${gig.id}`}
                        className="font-semibold text-slate-900 hover:text-brand-600"
                      >
                        {gig.title}
                      </Link>
                      <p className="text-sm text-brand-700">{formatPrice(gig.price)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/gigs/${gig.id}/edit`}
                        className="text-sm text-brand-600 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDeleteGig(gig.id)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">My applications</h2>
          {myApplications.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">No applications yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {myApplications.map((app) => (
                <li
                  key={app.id}
                  className="rounded-xl border border-slate-200 bg-white p-4"
                >
                  <p className="font-medium">Gig #{app.gigId}</p>
                  <p className="mt-1 text-sm text-slate-600 line-clamp-2">{app.coverLetter}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                        app.status === 'accepted'
                          ? 'bg-green-100 text-green-800'
                          : app.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {app.status}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleWithdraw(app.id)}
                      className="text-xs text-slate-500 hover:text-red-600"
                    >
                      Withdraw
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-slate-900">Applications to my gigs</h2>
        {incomingApplications.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">No applications on your gigs yet.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {incomingApplications.map((app) => (
              <li
                key={app.id}
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                <p className="font-medium">{app.applicantName}</p>
                <p className="text-sm text-slate-500">
                  Gig #{app.gigId} · {formatDate(app.createdAt)}
                </p>
                <p className="mt-2 text-sm text-slate-600">{app.coverLetter}</p>
                {app.status === 'pending' && (
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleStatusChange(app.id, 'accepted')}
                      className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700"
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatusChange(app.id, 'rejected')}
                      className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium hover:bg-slate-50"
                    >
                      Reject
                    </button>
                  </div>
                )}
                {app.status !== 'pending' && (
                  <p className="mt-2 text-xs capitalize text-slate-500">Status: {app.status}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  )
}

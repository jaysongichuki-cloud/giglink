import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { FIREBASE_AUTH_CONSOLE } from '../utils/authErrors'

export default function Login() {
  const {
    isAuthenticated,
    loginWithGoogle,
    error,
    isFirebaseConfigured,
  } = useAuth()
  const location = useLocation()
  const [loading, setLoading] = useState(null)

  const from = location.state?.from?.pathname || '/dashboard'

  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  async function handleLogin(provider) {
    setLoading(provider)
    try {
      if (provider === 'google') await loginWithGoogle()
    } catch (err) {
      console.error('Sign-in error:', err)
    } finally {
      setLoading(null)
    }
  }

  return (
    <section className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
      <h1 className="text-center text-3xl font-bold text-slate-900">Welcome to GigLink</h1>
      <p className="mt-2 text-center text-slate-600">
        Sign in to post gigs, apply for jobs, and manage your dashboard.
      </p>

      {!isFirebaseConfigured ? (
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
          <p className="font-semibold">Firebase not configured</p>
          <p className="mt-2">
            Copy <code>.env.example</code> to <code>.env</code> and add your Firebase
            project keys. Enable Google and GitHub providers in the Firebase console.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          <button
            type="button"
            onClick={() => handleLogin('google')}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-3 text-sm font-semibold hover:bg-slate-50 disabled:opacity-60"
          >
            {loading === 'google' ? 'Signing in…' : 'Continue with Google'}
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <p>{error}</p>
          {error.includes('not enabled') && (
            <a
              href={FIREBASE_AUTH_CONSOLE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block font-semibold text-brand-700 underline"
            >
              Open Firebase sign-in settings →
            </a>
          )}
        </div>
      )}

      <p className="mt-8 text-center text-sm text-slate-500">
        <Link to="/gigs" className="text-brand-600 hover:underline">
          Browse gigs without signing in
        </Link>
      </p>
    </section>
  )
}

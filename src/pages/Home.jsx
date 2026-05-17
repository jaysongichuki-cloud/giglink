import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Home() {
  const { isAuthenticated } = useAuth()

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="text-left">
          <p className="mb-3 inline-block rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
            Built for students
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Find quick gigs.{' '}
            <span className="text-brand-600">Earn on your schedule.</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            GigLink connects students with short freelance jobs in their campus
            community — design, tutoring, errands, and more. No crowded
            marketplaces, just student-friendly opportunities.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/gigs"
              className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-brand-700"
            >
              Browse gigs
            </Link>
            {isAuthenticated ? (
              <Link
                to="/create"
                className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Post a gig
              </Link>
            ) : (
              <Link
                to="/login"
                className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Get started
              </Link>
            )}
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-900 p-8 text-white shadow-xl">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <ol className="mt-6 space-y-4 text-left text-brand-100">
            <li className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 font-bold">
                1
              </span>
              <span>Sign in with Google or GitHub</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 font-bold">
                2
              </span>
              <span>Post gigs or browse listings near campus</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 font-bold">
                3
              </span>
              <span>Apply, track applications, and manage work from your dashboard</span>
            </li>
          </ol>
        </div>
      </div>
    </section>
  )
}

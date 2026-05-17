import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

const linkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-brand-600 text-white'
      : 'text-slate-700 hover:bg-slate-100 hover:text-brand-700'
  }`

export default function Navbar() {
  const { user, isAuthenticated, logout, isFirebaseConfigured } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-brand-700">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-lg text-white">
            G
          </span>
          <span className="text-lg tracking-tight">GigLink</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/gigs" className={linkClass}>
            Browse Gigs
          </NavLink>
          {isAuthenticated && (
            <>
              <NavLink to="/dashboard" className={linkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/create" className={linkClass}>
                Post Gig
              </NavLink>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <span className="hidden max-w-[140px] truncate text-sm text-slate-600 sm:inline">
                {user?.name}
              </span>
              <button
                type="button"
                onClick={logout}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
            >
              {isFirebaseConfigured ? 'Sign in' : 'Setup auth'}
            </Link>
          )}
        </div>
      </nav>

      <div className="flex gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 md:hidden">
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/gigs" className={linkClass}>
          Gigs
        </NavLink>
        {isAuthenticated && (
          <>
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/create" className={linkClass}>
              Post
            </NavLink>
          </>
        )}
      </div>
    </header>
  )
}

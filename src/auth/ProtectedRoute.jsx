import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'
import LoadingSpinner from '../components/LoadingSpinner'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, isFirebaseConfigured } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center py-24">
        <LoadingSpinner label="Checking session" />
      </div>
    )
  }

  if (!isFirebaseConfigured) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
          Add Firebase credentials to <code className="text-sm">.env</code> to
          enable sign-in. See <code className="text-sm">.env.example</code>.
        </p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

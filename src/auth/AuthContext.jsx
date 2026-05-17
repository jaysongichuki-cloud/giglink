import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import {
  auth,
  isFirebaseConfigured,
  logout as firebaseLogout,
  signInWithGoogle,
} from './firebase'
import { createUser, findUserByFirebaseUid } from '../api/users'
import { getAuthErrorMessage } from '../utils/authErrors'

const AuthContext = createContext(null)

async function syncUserToServer(firebaseUser) {
  const existing = await findUserByFirebaseUid(firebaseUser.uid)
  if (existing) return existing

  const provider = 'google'

  return createUser({
    id: firebaseUser.uid,
    firebaseUid: firebaseUser.uid,
    name: firebaseUser.displayName || 'GigLink User',
    email: firebaseUser.email,
    avatar: firebaseUser.photoURL || '',
    provider,
  })
}

export function AuthProvider({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(null)
  const [dbUser, setDbUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isFirebaseConfigured() || !auth) {
      setLoading(false)
      return undefined
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true)
      setError(null)
      try {
        if (user) {
          const synced = await syncUserToServer(user)
          setFirebaseUser(user)
          setDbUser(synced)
        } else {
          setFirebaseUser(null)
          setDbUser(null)
        }
      } catch (err) {
        setError(err.message || 'Failed to sync user profile')
        setFirebaseUser(user)
        setDbUser(null)
      } finally {
        setLoading(false)
      }
    })

    return unsubscribe
  }, [])

  const loginWithGoogle = useCallback(async () => {
    setError(null)
    try {
      await signInWithGoogle()
    } catch (err) {
      setError(getAuthErrorMessage(err, 'Google'))
      throw err
    }
  }, [])

  const logout = useCallback(async () => {
    await firebaseLogout()
    setFirebaseUser(null)
    setDbUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user: dbUser,
      firebaseUser,
      loading,
      error,
      isAuthenticated: Boolean(dbUser),
      isFirebaseConfigured: isFirebaseConfigured(),
      loginWithGoogle,
      logout,
    }),
    [
      dbUser,
      firebaseUser,
      loading,
      error,
      loginWithGoogle,
      logout,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID

export const FIREBASE_AUTH_CONSOLE = projectId
  ? `https://console.firebase.google.com/project/${projectId}/authentication/providers`
  : 'https://console.firebase.google.com/'

export function getAuthErrorMessage(error, provider = 'this provider') {
  const code = error?.code || ''

  switch (code) {
    case 'auth/operation-not-allowed':
      return (
        `${provider} sign-in is not enabled in Firebase. Open Authentication → Sign-in method, ` +
        `enable ${provider}, then try again.`
      )
    case 'auth/popup-closed-by-user':
      return 'Sign-in was cancelled.'
    case 'auth/popup-blocked':
      return 'Pop-up was blocked. Allow pop-ups for this site and try again.'
    case 'auth/unauthorized-domain':
      return (
        'This domain is not authorized. Add localhost (and your deploy URL) under ' +
        'Firebase → Authentication → Settings → Authorized domains.'
      )
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with the same email using a different sign-in method.'
    default:
      return error?.message || 'Sign-in failed. Please try again.'
  }
}

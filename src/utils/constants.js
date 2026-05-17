export const GIG_CATEGORIES = [
  'Design',
  'Development',
  'Tutoring',
  'Writing',
  'Errands',
  'Marketing',
  'Other',
]

export const APPLICATION_STATUSES = ['pending', 'accepted', 'rejected']

export function formatPrice(kes) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  }).format(kes)
}

export function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-KE', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

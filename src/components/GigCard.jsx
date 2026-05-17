import { Link } from 'react-router-dom'
import { formatDate, formatPrice } from '../utils/constants'

export default function GigCard({ gig }) {
  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-300 hover:shadow-md">
      <div className="mb-2 flex items-start justify-between gap-2">
        <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
          {gig.category}
        </span>
        <span className="text-xs text-slate-500">{formatDate(gig.createdAt)}</span>
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{gig.title}</h3>
      <p className="mt-2 line-clamp-2 flex-1 text-sm text-slate-600">
        {gig.description}
      </p>
      <div className="mt-4 flex items-center justify-between gap-2">
        <div>
          <p className="text-lg font-bold text-brand-700">{formatPrice(gig.price)}</p>
          <p className="text-xs text-slate-500"> {gig.location}</p>
        </div>
        <Link
          to={`/gigs/${gig.id}`}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          View
        </Link>
      </div>
    </article>
  )
}

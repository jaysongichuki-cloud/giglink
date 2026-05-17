import { GIG_CATEGORIES } from '../utils/constants'

export default function SearchBar({
  search,
  category,
  onSearchChange,
  onCategoryChange,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor="gig-search">
        Search gigs
      </label>
      <input
        id="gig-search"
        type="search"
        placeholder="Search by title, description, or location…"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
      />
      <label className="sr-only" htmlFor="gig-category">
        Filter by category
      </label>
      <select
        id="gig-category"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 sm:w-48"
      >
        <option value="">All categories</option>
        {GIG_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  )
}

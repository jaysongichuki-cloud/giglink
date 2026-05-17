import { GIG_CATEGORIES } from '../utils/constants'
import { getEmptyGig } from '../utils/gigDefaults'

export default function GigForm({ initialValues, onSubmit, submitLabel, loading }) {
  const values = { ...getEmptyGig(), ...initialValues }

  function handleSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.target)
    onSubmit({
      title: form.get('title'),
      description: form.get('description'),
      price: Number(form.get('price')),
      category: form.get('category'),
      location: form.get('location'),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700">
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={values.title}
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>
      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium text-slate-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={values.description}
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className="mb-1 block text-sm font-medium text-slate-700">
            Price (KES)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="100"
            required
            defaultValue={values.price}
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>
        <div>
          <label htmlFor="category" className="mb-1 block text-sm font-medium text-slate-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            defaultValue={values.category}
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          >
            {GIG_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="location" className="mb-1 block text-sm font-medium text-slate-700">
          Location
        </label>
        <input
          id="location"
          name="location"
          required
          defaultValue={values.location}
          placeholder="Remote, On Campus, etc."
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60 sm:w-auto sm:px-8"
      >
        {loading ? 'Saving…' : submitLabel}
      </button>
    </form>
  )
}

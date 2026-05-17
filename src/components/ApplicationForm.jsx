export default function ApplicationForm({ onSubmit, loading, hasApplied }) {
  if (hasApplied) {
    return (
      <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
        You have already applied to this gig. Check your dashboard for status updates.
      </p>
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.target)
    onSubmit({ coverLetter: form.get('coverLetter') })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-slate-900">Apply for this gig</h3>
      <div>
        <label htmlFor="coverLetter" className="mb-1 block text-sm font-medium text-slate-700">
          Cover letter
        </label>
        <textarea
          id="coverLetter"
          name="coverLetter"
          required
          rows={4}
          placeholder="Tell the poster why you are a great fit…"
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {loading ? 'Submitting…' : 'Submit application'}
      </button>
    </form>
  )
}

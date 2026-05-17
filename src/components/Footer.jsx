export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-center text-sm text-slate-500 sm:flex-row sm:px-6 sm:text-left">
        <p>© {new Date().getFullYear()} GigLink — student gigs, simplified.</p>
        <p>v1.0.0 · Data stored on JSON Server (no browser cache)</p>
      </div>
    </footer>
  )
}

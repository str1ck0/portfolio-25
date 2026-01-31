import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-4">
      <h1 className="mb-4 text-6xl font-light text-white">404</h1>
      <p className="mb-8 text-white/60">Page not found</p>
      <Link
        href="/"
        className="text-sm text-white/50 transition-colors hover:text-white"
      >
        ← Back home
      </Link>
    </main>
  )
}

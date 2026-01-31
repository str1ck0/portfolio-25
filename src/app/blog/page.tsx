import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getAllBlogPosts, getSiteSettings } from '@/lib/sanity'
import BlogCard from '@/components/BlogCard'

export const revalidate = 60

export const metadata = {
  title: 'Blog',
  description: 'Thoughts, ideas, and explorations',
}

export default async function BlogPage() {
  const [posts, settings] = await Promise.all([
    getAllBlogPosts(),
    getSiteSettings(),
  ])

  return (
    <main className="min-h-screen bg-black px-6 py-8 md:px-8">
      {/* Header */}
      <header className="mb-12 flex items-center justify-between">
        <div>
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
          <h1 className="text-3xl font-light tracking-tight text-white md:text-4xl">
            Blog
          </h1>
        </div>

        {/* Name link back home */}
        <Link
          href="/"
          className="text-lg font-light text-white/50 transition-colors hover:text-white"
        >
          {settings?.name || 'Home'}
        </Link>
      </header>

      {/* Posts Grid */}
      {posts && posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-white/40">No posts yet.</p>
          <p className="mt-2 text-sm text-white/30">
            Add your first post in the{' '}
            <Link href="/studio" className="underline hover:text-white/50">
              Studio
            </Link>
          </p>
        </div>
      )}
    </main>
  )
}

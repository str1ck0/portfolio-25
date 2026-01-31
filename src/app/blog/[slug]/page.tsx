import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import { getBlogPostBySlug, getAllBlogPosts, urlFor, getSiteSettings } from '@/lib/sanity'
import type { PortableTextComponents } from '@portabletext/react'

export const revalidate = 60

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return (posts || []).map((post) => ({
    slug: post.slug.current,
  }))
}

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: post.title,
    description: post.excerpt || `Read ${post.title}`,
  }
}

// Custom Portable Text components
const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            <Image
              src={urlFor(value.asset).width(1200).quality(85).url()}
              alt={value.alt || 'Blog image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-white/40">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    videoEmbed: ({ value }) => {
      if (!value?.url) return null

      // Extract video ID and determine platform
      let embedUrl = ''
      if (value.url.includes('youtube.com') || value.url.includes('youtu.be')) {
        const videoId = value.url.includes('youtu.be')
          ? value.url.split('/').pop()
          : new URL(value.url).searchParams.get('v')
        embedUrl = `https://www.youtube.com/embed/${videoId}`
      } else if (value.url.includes('vimeo.com')) {
        const videoId = value.url.split('/').pop()
        embedUrl = `https://player.vimeo.com/video/${videoId}`
      }

      if (!embedUrl) return null

      return (
        <div className="my-8 aspect-video overflow-hidden rounded-lg">
          <iframe
            src={embedUrl}
            className="h-full w-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      )
    },
    codeBlock: ({ value }) => {
      return (
        <pre className="my-6 overflow-x-auto rounded-lg bg-white/5 p-4">
          <code className="font-mono text-sm text-white/80">
            {value.code}
          </code>
        </pre>
      )
    },
  },
  marks: {
    link: ({ children, value }) => {
      const isExternal = value?.href?.startsWith('http')
      return (
        <a
          href={value?.href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-white underline decoration-white/30 underline-offset-2 transition-colors hover:decoration-white"
        >
          {children}
        </a>
      )
    },
    code: ({ children }) => (
      <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm">
        {children}
      </code>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mb-4 mt-12 text-2xl font-medium text-white">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 text-xl font-medium text-white">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mb-6 leading-relaxed text-white/70">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-white/20 pl-4 italic text-white/60">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 ml-6 list-disc space-y-2 text-white/70">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 ml-6 list-decimal space-y-2 text-white/70">{children}</ol>
    ),
  },
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [post, settings] = await Promise.all([
    getBlogPostBySlug(slug),
    getSiteSettings(),
  ])

  if (!post) {
    notFound()
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-6 md:px-8">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            All Posts
          </Link>

          <Link
            href="/"
            className="text-sm font-light text-white/50 transition-colors hover:text-white"
          >
            {settings?.name || 'Home'}
          </Link>
        </div>
      </header>

      {/* Featured Image */}
      {post.featuredImage?.asset && (
        <div className="relative aspect-[21/9] w-full">
          <Image
            src={urlFor(post.featuredImage.asset).width(1920).quality(85).url()}
            alt={post.featuredImage.alt || post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
      )}

      {/* Content */}
      <article className="mx-auto max-w-3xl px-6 py-12 md:px-8 md:py-16">
        {/* Meta */}
        {formattedDate && (
          <p className="mb-4 font-mono text-sm text-white/40">{formattedDate}</p>
        )}

        {/* Title */}
        <h1 className="mb-6 text-3xl font-light tracking-tight text-white md:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="mb-12 text-lg text-white/60">{post.excerpt}</p>
        )}

        {/* Body */}
        {post.body && (
          <div className="prose prose-lg prose-invert max-w-none">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 border-t border-white/10 pt-8">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 px-3 py-1 text-sm text-white/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center md:px-8">
        <Link
          href="/blog"
          className="text-sm text-white/50 transition-colors hover:text-white"
        >
          ← Back to all posts
        </Link>
      </footer>
    </main>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import { urlFor, type BlogPost } from '@/lib/sanity'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group block overflow-hidden rounded-lg bg-white/5 transition-colors hover:bg-white/10"
    >
      {/* Featured Image */}
      {post.featuredImage?.asset && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={urlFor(post.featuredImage.asset).width(800).quality(80).url()}
            alt={post.featuredImage.alt || post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4 md:p-6">
        {/* Date */}
        {formattedDate && (
          <p className="mb-2 font-mono text-xs text-white/40">{formattedDate}</p>
        )}

        {/* Title */}
        <h2 className="mb-2 text-lg font-medium text-white transition-colors group-hover:text-white/80 md:text-xl">
          {post.title}
        </h2>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="line-clamp-2 text-sm text-white/60">{post.excerpt}</p>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/50"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}

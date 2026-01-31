import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getProjectsByTag, getSiteSettings, getAllProjects } from '@/lib/sanity'
import Gallery from '@/components/Gallery'

export const revalidate = 60

// Generate static params for common tags
export async function generateStaticParams() {
  const projects = await getAllProjects()
  const tags = new Set<string>()

  ;(projects || []).forEach((project) => {
    project.tags?.forEach((tag) => tags.add(tag))
  })

  return Array.from(tags).map((tag) => ({ tag }))
}

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const formattedTag = tag.charAt(0).toUpperCase() + tag.slice(1)

  return {
    title: `${formattedTag} Work`,
    description: `Projects tagged with ${tag}`,
  }
}

export default async function WorkByTagPage({
  params,
}: {
  params: Promise<{ tag: string }>
}) {
  const { tag } = await params
  const [projects, settings] = await Promise.all([
    getProjectsByTag(tag),
    getSiteSettings(),
  ])

  const formattedTag = tag.charAt(0).toUpperCase() + tag.slice(1)

  return (
    <main className="relative min-h-screen bg-black">
      {/* Header */}
      <header className="fixed left-6 top-6 z-20 md:left-8 md:top-8">
        <Link
          href="/"
          className="mb-2 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
        <h1 className="text-lg font-light text-white md:text-xl">
          {formattedTag}
        </h1>
        <p className="mt-1 text-xs text-white/40">
          {projects?.length || 0} project{(projects?.length || 0) !== 1 ? 's' : ''}
        </p>
      </header>

      {/* Name link */}
      <div className="fixed right-6 top-6 z-20 md:right-8 md:top-8">
        <Link
          href="/"
          className="text-lg font-light text-white/50 transition-colors hover:text-white"
        >
          {settings?.name || 'Home'}
        </Link>
      </div>

      {/* Gallery */}
      <div className="flex h-screen items-center justify-center px-4 py-16 md:px-16 md:py-8">
        <div className="relative h-[85vh] w-full max-w-7xl">
          {projects && projects.length > 0 ? (
            <Gallery
              projects={projects}
              interval={settings?.galleryInterval || 6}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <p className="text-white/40">No projects with tag "{tag}"</p>
                <Link
                  href="/"
                  className="mt-4 inline-block text-sm text-white/50 transition-colors hover:text-white"
                >
                  View all work →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

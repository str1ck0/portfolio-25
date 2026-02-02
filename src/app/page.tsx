import { getFeaturedProjects, getSiteSettings } from '@/lib/sanity'
import Gallery from '@/components/Gallery'
import CollapsibleMenu from '@/components/CollapsibleMenu'
import Background from '@/components/Background'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Home() {
  const [projects, settings] = await Promise.all([
    getFeaturedProjects(),
    getSiteSettings(),
  ])

  // Fallback settings if none exist in Sanity yet
  const siteSettings = settings || {
    _id: 'default',
    name: 'Liam Strickland',
    aboutText: 'I write, code, design, and create.',
    stack: ['TypeScript', 'React', 'Next.js', 'Node.js', 'Tailwind CSS'],
    email: 'hello@liamstrickland.com',
    social: [
      { platform: 'github', url: 'https://github.com/str1ck0' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/liamstrickland' },
    ],
  }

  return (
    <main className="relative min-h-screen bg-black">
      {/* Interactive Background */}
      <Background />

      {/* Top Left - Name and Menu */}
      <div className="fixed left-6 top-6 z-20 md:left-8 md:top-8 pointer-events-auto">
        {/* Name */}
        <h1 className="mb-4 text-lg font-light tracking-tight text-white md:text-xl">
          {siteSettings.name}
        </h1>

        {/* Collapsible Menu */}
        <CollapsibleMenu settings={siteSettings} />
      </div>

      {/* Central Gallery */}
      <div className="relative z-10 flex h-screen items-center justify-center px-4 py-16 md:px-16 md:py-8 pointer-events-none">
        <div className="relative h-[85vh] w-full max-w-7xl pointer-events-auto">
          <Gallery
            projects={projects || []}
            interval={siteSettings.galleryInterval || 6}
          />
        </div>
      </div>
    </main>
  )
}

export const metadata = {
  title: 'Studio | Portfolio CMS',
  description: 'Content management for your portfolio',
}

// Increase function timeout for Sanity Studio (requires Vercel Pro for >10s)
export const maxDuration = 60

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ height: '100vh' }}>
      {children}
    </div>
  )
}

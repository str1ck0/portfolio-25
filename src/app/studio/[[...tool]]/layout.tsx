export const metadata = {
  title: 'Studio | Portfolio CMS',
  description: 'Content management for your portfolio',
}

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

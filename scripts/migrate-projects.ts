import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Need write token
  useCdn: false,
})

// Old project data from the previous portfolio
const oldProjects = [
  {
    title: "Circles",
    slug: "circles",
    featured: true,
    order: 1,
    tags: ["code", "fullstack"],
    description: "A full stack Ruby on Rails web app, Circles is an event-centric social media platform that makes planning events within your social circles easy.",
    technologies: ["Ruby on Rails", "PostgreSQL", "Bootstrap", "Javascript", "Heroku", "Action Cable"],
    links: [
      { title: "GitHub", url: "https://github.com/ch0rizo/Circles" }
    ],
    images: [
      { path: "public/images/projects/circles_home.png", alt: "Circles home page" },
      { path: "public/images/projects/circles_event.png", alt: "Circles event page" },
    ]
  },
  {
    title: "Boro",
    slug: "boro",
    featured: true,
    order: 2,
    tags: ["code", "design", "fullstack"],
    description: "A p2p marketplace for the sharing economy. Borrow or lend any asset! Buy less, share more.",
    technologies: ["Figma", "Ruby on Rails", "Bootstrap", "PostgreSQL", "Heroku", "Adobe CC"],
    links: [
      { title: "Figma", url: "https://www.figma.com/proto/xuUgQ7edNWQ1SqAg3FVjHF/BORO-2.0-(Copy)?node-id=524-245&t=V9HWhSd11W46CrNX-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1" },
      { title: "GitHub", url: "https://github.com/ch0rizo/BORO" }
    ],
    images: [
      { path: "public/images/projects/Boro/boro-splash.png", alt: "Boro splash screen" },
      { path: "public/images/projects/Boro/boro-intro1.png", alt: "Boro intro 1" },
      { path: "public/images/projects/Boro/boro-intro2.png", alt: "Boro intro 2" },
      { path: "public/images/projects/Boro/boro-home.png", alt: "Boro home" },
      { path: "public/images/projects/Boro/boro-explore.png", alt: "Boro explore" },
      { path: "public/images/projects/Boro/boro-item.png", alt: "Boro item" },
      { path: "public/images/projects/Boro/boro-chat.png", alt: "Boro chat" },
    ]
  },
  {
    title: "Foolish - Cartine di Qualità",
    slug: "foolish-papers",
    featured: true,
    order: 3,
    tags: ["design", "fineart"],
    description: "Rolling papers artwork, designed in collaboration with Foolish as part of a limited 'Leisure Time' product release.",
    technologies: ["Adobe Illustrator", "Adobe Photoshop", "Ink on paper"],
    links: [],
    images: [
      { path: "public/images/projects/foolish-1.png", alt: "Foolish papers design" },
      { path: "public/images/projects/FoolishPapersFront.png", alt: "Foolish papers front" },
      { path: "public/images/projects/FoolishPapersInner.png", alt: "Foolish papers inner" },
    ]
  },
  {
    title: "Gold Cloud",
    slug: "gold-cloud",
    featured: true,
    order: 4,
    tags: ["code", "design"],
    description: "Medical cannabis e-commerce platform with product management, cart functionality, and user accounts.",
    technologies: ["Ruby on Rails", "Bootstrap", "PostgreSQL", "Figma"],
    links: [],
    images: [
      { path: "public/images/projects/goldcloud-1.png", alt: "Gold Cloud homepage" },
      { path: "public/images/projects/gc-home.png", alt: "Gold Cloud store" },
      { path: "public/images/projects/gc-cart.png", alt: "Gold Cloud cart" },
      { path: "public/images/projects/Goldcloud/store-home-portrait.png", alt: "Gold Cloud mobile" },
      { path: "public/images/projects/Goldcloud/product-show-portrait.png", alt: "Gold Cloud product" },
    ]
  },
  {
    title: "Garden Elegance",
    slug: "garden-elegance",
    featured: false,
    order: 5,
    tags: ["code"],
    description: "WordPress WooCommerce site rebuild for a gardening supplies business.",
    technologies: ["WordPress", "WooCommerce", "PHP", "CSS"],
    links: [],
    images: [
      { path: "public/images/projects/ge-home.png", alt: "Garden Elegance home" },
      { path: "public/images/projects/ge-about.png", alt: "Garden Elegance about" },
    ]
  },
  {
    title: "Le Wagon Tee Design",
    slug: "lewagon-tee",
    featured: false,
    order: 6,
    tags: ["design"],
    description: "T-shirt design for Le Wagon Melbourne coding bootcamp.",
    technologies: ["Adobe Illustrator"],
    links: [],
    images: [
      { path: "public/images/projects/lewagon-tee.png", alt: "Le Wagon t-shirt design" },
    ]
  },
]

// Site settings
const siteSettings = {
  _type: 'siteSettings',
  _id: 'siteSettings',
  name: 'Liam Strickland',
  aboutText: 'I write, code, design, and create.',
  stack: ['TypeScript', 'React', 'Next.js', 'Ruby on Rails', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Figma'],
  email: 'hello@liamstrickland.com',
  social: [
    { platform: 'github', url: 'https://github.com/str1ck0' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/liamstrickland' },
  ],
  galleryInterval: 6,
}

async function uploadImage(filePath: string): Promise<{ _type: 'image'; asset: { _type: 'reference'; _ref: string } } | null> {
  const fullPath = path.join(process.cwd(), filePath)

  if (!fs.existsSync(fullPath)) {
    console.log(`  ⚠ Image not found: ${filePath}`)
    return null
  }

  try {
    const imageBuffer = fs.readFileSync(fullPath)
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(filePath),
    })
    console.log(`  ✓ Uploaded: ${path.basename(filePath)}`)
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    }
  } catch (error) {
    console.log(`  ✗ Failed to upload: ${filePath}`, error)
    return null
  }
}

async function migrateProject(project: typeof oldProjects[0]) {
  console.log(`\nMigrating: ${project.title}`)

  // Upload images
  const uploadedImages = []
  for (const img of project.images) {
    const uploaded = await uploadImage(img.path)
    if (uploaded) {
      uploadedImages.push({
        ...uploaded,
        alt: img.alt,
      })
    }
  }

  // Create project document
  const doc = {
    _type: 'project',
    title: project.title,
    slug: { _type: 'slug', current: project.slug },
    featured: project.featured,
    order: project.order,
    tags: project.tags,
    description: project.description,
    technologies: project.technologies,
    links: project.links,
    images: uploadedImages,
  }

  try {
    const result = await client.create(doc)
    console.log(`✓ Created project: ${project.title} (${result._id})`)
    return result
  } catch (error) {
    console.log(`✗ Failed to create project: ${project.title}`, error)
    return null
  }
}

async function migrateSiteSettings() {
  console.log('\nMigrating site settings...')

  try {
    const result = await client.createOrReplace(siteSettings)
    console.log(`✓ Created site settings (${result._id})`)
    return result
  } catch (error) {
    console.log('✗ Failed to create site settings', error)
    return null
  }
}

async function main() {
  console.log('🚀 Starting migration to Sanity...\n')

  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ SANITY_API_TOKEN is required for write access.')
    console.error('   Get a token from: https://sanity.io/manage → Your Project → API → Tokens')
    console.error('   Then run: SANITY_API_TOKEN=your_token npx ts-node scripts/migrate-projects.ts')
    process.exit(1)
  }

  // Migrate site settings first
  await migrateSiteSettings()

  // Migrate all projects
  for (const project of oldProjects) {
    await migrateProject(project)
  }

  console.log('\n✅ Migration complete!')
}

main().catch(console.error)

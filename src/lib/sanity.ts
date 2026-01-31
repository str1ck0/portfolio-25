import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2024-01-01'

// Only create client if we have a project ID
export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
    })
  : null

// Image URL builder (only create if client exists)
const builder = client ? imageUrlBuilder(client) : null

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    // Return a placeholder image URL builder that returns empty strings
    return {
      width: () => ({ quality: () => ({ url: () => '' }) }),
      height: () => ({ quality: () => ({ url: () => '' }) }),
      quality: () => ({ url: () => '' }),
      url: () => '',
    }
  }
  return builder.image(source)
}

// ============================================
// GROQ Queries
// ============================================

// Get all featured projects for the gallery
export const featuredProjectsQuery = `
  *[_type == "project" && featured == true] | order(order asc) {
    _id,
    title,
    slug,
    description,
    tags,
    technologies,
    year,
    "images": images[] {
      _key,
      alt,
      caption,
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    links
  }
`

// Get all projects
export const allProjectsQuery = `
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    slug,
    featured,
    description,
    fullDescription,
    tags,
    technologies,
    year,
    "images": images[] {
      _key,
      alt,
      caption,
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    links
  }
`

// Get projects by tag
export const projectsByTagQuery = `
  *[_type == "project" && $tag in tags] | order(order asc) {
    _id,
    title,
    slug,
    featured,
    description,
    tags,
    technologies,
    year,
    "images": images[] {
      _key,
      alt,
      caption,
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    links
  }
`

// Get single project by slug
export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    fullDescription,
    tags,
    technologies,
    year,
    "images": images[] {
      _key,
      alt,
      caption,
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    links
  }
`

// Get all blog posts
export const allBlogPostsQuery = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    tags,
    "featuredImage": featuredImage {
      alt,
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    }
  }
`

// Get single blog post by slug
export const blogPostBySlugQuery = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    tags,
    "featuredImage": featuredImage {
      alt,
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    }
  }
`

// Get site settings
export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    _id,
    name,
    aboutText,
    aboutLinks,
    extendedAbout,
    stack,
    email,
    social,
    galleryInterval
  }
`

// ============================================
// Fetcher Functions
// ============================================

export async function getFeaturedProjects(): Promise<Project[]> {
  if (!client) return []
  return client.fetch(featuredProjectsQuery)
}

export async function getAllProjects(): Promise<Project[]> {
  if (!client) return []
  return client.fetch(allProjectsQuery)
}

export async function getProjectsByTag(tag: string): Promise<Project[]> {
  if (!client) return []
  return client.fetch(projectsByTagQuery, { tag })
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!client) return null
  return client.fetch(projectBySlugQuery, { slug })
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!client) return []
  return client.fetch(allBlogPostsQuery)
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!client) return null
  return client.fetch(blogPostBySlugQuery, { slug })
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!client) return null
  return client.fetch(siteSettingsQuery)
}

// ============================================
// Types
// ============================================

export interface Project {
  _id: string
  title: string
  slug: { current: string }
  featured?: boolean
  description?: string
  fullDescription?: any[]
  tags?: string[]
  technologies?: string[]
  year?: number
  images?: ProjectImage[]
  links?: { title: string; url: string }[]
}

export interface ProjectImage {
  _key: string
  alt?: string
  caption?: string
  asset: {
    _id: string
    url: string
    metadata?: {
      dimensions?: { width: number; height: number }
      lqip?: string
    }
  }
}

export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
  body?: any[]
  tags?: string[]
  featuredImage?: {
    alt?: string
    asset: {
      _id: string
      url: string
      metadata?: {
        dimensions?: { width: number; height: number }
        lqip?: string
      }
    }
  }
}

export interface SiteSettings {
  _id: string
  name: string
  aboutText?: string
  aboutLinks?: AboutLink[]
  extendedAbout?: any[]
  stack?: string[]
  email?: string
  social?: SocialLink[]
  galleryInterval?: number
}

export interface AboutLink {
  word: string
  linkType: 'blog' | 'tag' | 'external'
  tag?: string
  url?: string
}

export interface SocialLink {
  platform: string
  url: string
}

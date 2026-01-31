'use client'

import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Dribbble,
  Mail,
  ExternalLink,
} from 'lucide-react'
import type { SocialLink } from '@/lib/sanity'

interface SocialIconsProps {
  social: SocialLink[]
  email?: string
}

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  dribbble: Dribbble,
  behance: ExternalLink, // No built-in icon
  codepen: ExternalLink, // No built-in icon
  other: ExternalLink,
}

export default function SocialIcons({ social, email }: SocialIconsProps) {
  const allLinks = [
    ...(email ? [{ platform: 'email', url: `mailto:${email}` }] : []),
    ...social,
  ]

  return (
    <div className="flex items-center gap-3">
      {allLinks.map((link, index) => {
        const Icon = link.platform === 'email' ? Mail : (iconMap[link.platform] || ExternalLink)

        return (
          <a
            key={index}
            href={link.url}
            target={link.platform === 'email' ? undefined : '_blank'}
            rel={link.platform === 'email' ? undefined : 'noopener noreferrer'}
            className="text-white/40 transition-colors hover:text-white"
            aria-label={link.platform}
          >
            <Icon size={18} />
          </a>
        )
      })}
    </div>
  )
}

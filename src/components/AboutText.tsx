'use client'

import Link from 'next/link'
import type { AboutLink } from '@/lib/sanity'

interface AboutTextProps {
  text: string
  links: AboutLink[]
}

export default function AboutText({ text, links }: AboutTextProps) {
  // Build a map of words to their link info
  const linkMap = new Map<string, AboutLink>()
  links.forEach((link) => {
    if (link.word) {
      linkMap.set(link.word.toLowerCase(), link)
    }
  })

  // Split text into words and punctuation, preserving spacing
  const parts = text.split(/(\s+)/)

  return (
    <p className="text-sm leading-relaxed text-white/60">
      {parts.map((part, index) => {
        // Skip whitespace
        if (/^\s+$/.test(part)) {
          return <span key={index}>{part}</span>
        }

        // Check if this word (without punctuation) has a link
        const cleanWord = part.replace(/[.,!?;:'"]/g, '').toLowerCase()
        const linkInfo = linkMap.get(cleanWord)

        if (linkInfo) {
          // Preserve any trailing punctuation
          const punctuation = part.match(/[.,!?;:'"]+$/)?.[0] || ''
          const wordWithoutPunctuation = part.slice(0, part.length - punctuation.length)

          let href = '/blog'
          if (linkInfo.linkType === 'tag' && linkInfo.tag) {
            href = `/work/${linkInfo.tag}`
          } else if (linkInfo.linkType === 'external' && linkInfo.url) {
            href = linkInfo.url
          }

          const isExternal = linkInfo.linkType === 'external'

          if (isExternal) {
            return (
              <span key={index}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline decoration-white/30 underline-offset-2 transition-colors hover:decoration-white"
                >
                  {wordWithoutPunctuation}
                </a>
                {punctuation}
              </span>
            )
          }

          return (
            <span key={index}>
              <Link
                href={href}
                className="text-white underline decoration-white/30 underline-offset-2 transition-colors hover:decoration-white"
              >
                {wordWithoutPunctuation}
              </Link>
              {punctuation}
            </span>
          )
        }

        return <span key={index}>{part}</span>
      })}
    </p>
  )
}

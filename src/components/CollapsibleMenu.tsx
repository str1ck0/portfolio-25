'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import type { SiteSettings } from '@/lib/sanity'
import AboutText from './AboutText'
import SocialIcons from './SocialIcons'

interface CollapsibleMenuProps {
  settings: SiteSettings
}

type MenuSection = 'about' | 'stack' | 'contact' | null

export default function CollapsibleMenu({ settings }: CollapsibleMenuProps) {
  const [expandedSection, setExpandedSection] = useState<MenuSection>(null)
  const [lockedSection, setLockedSection] = useState<MenuSection>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setLockedSection(null)
        setExpandedSection(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleMouseEnter = (section: MenuSection) => {
    if (!lockedSection) {
      setExpandedSection(section)
    }
  }

  const handleMouseLeave = () => {
    if (!lockedSection) {
      setExpandedSection(null)
    }
  }

  const handleClick = (section: MenuSection) => {
    if (lockedSection === section) {
      setLockedSection(null)
      setExpandedSection(null)
    } else {
      setLockedSection(section)
      setExpandedSection(section)
    }
  }

  const isExpanded = (section: MenuSection) => {
    return expandedSection === section || lockedSection === section
  }

  const menuItems: { id: MenuSection; label: string }[] = [
    { id: 'about', label: 'About' },
    { id: 'stack', label: 'Stack' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <nav ref={menuRef} className="flex flex-col" onMouseLeave={handleMouseLeave}>
      {menuItems.map((item) => (
        <div key={item.id}>
          {/* Menu Item Header */}
          <button
            className={`w-full py-1.5 text-left text-sm transition-colors ${
              isExpanded(item.id) ? 'text-white' : 'text-white/50 hover:text-white/80'
            }`}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onClick={() => handleClick(item.id)}
          >
            {item.label}
          </button>

          {/* Expandable Content - only render when expanded */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-out ${
              isExpanded(item.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="pl-3 pt-1 pb-3">
              {item.id === 'about' && (
                <div className="max-w-xs space-y-3">
                  {settings.aboutText && (
                    <AboutText
                      text={settings.aboutText}
                      links={settings.aboutLinks || []}
                    />
                  )}
                  {settings.extendedAbout && (
                    <div className="prose prose-sm prose-invert max-w-none prose-p:text-white/60 prose-p:leading-relaxed">
                      <PortableText value={settings.extendedAbout} />
                    </div>
                  )}
                </div>
              )}

              {item.id === 'stack' && (
                <div className="flex max-w-xs flex-wrap gap-2">
                  {(settings.stack && settings.stack.length > 0 ? settings.stack : ['No stack defined']).map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-white/10 px-2 py-1 font-mono text-xs text-white/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {item.id === 'contact' && (
                <div className="space-y-3 text-sm">
                  {settings.email && (
                    <a
                      href={`mailto:${settings.email}`}
                      className="block text-white/60 transition-colors hover:text-white"
                    >
                      {settings.email}
                    </a>
                  )}
                  {settings.social && settings.social.length > 0 && (
                    <SocialIcons social={settings.social} />
                  )}
                  <Link
                    href="/blog"
                    className="block text-white/60 transition-colors hover:text-white"
                  >
                    Blog →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </nav>
  )
}

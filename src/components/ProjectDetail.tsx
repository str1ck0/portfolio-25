'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { urlFor, type Project } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'

interface ProjectDetailProps {
  project: Project
  onClose: () => void
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = project.images || []

  // Close on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose, images.length])

  // Close on backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm md:p-8"
      onClick={handleBackdropClick}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 md:right-8 md:top-8"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      {/* Content container */}
      <div className="scrollbar-hide flex h-full max-h-[90vh] w-full max-w-6xl flex-col overflow-y-auto md:flex-row md:gap-8">
        {/* Left side - Images */}
        <div className="relative flex-shrink-0 md:w-1/2 lg:w-3/5">
          {/* Main image */}
          {images.length > 0 && (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-white/5">
              <Image
                src={urlFor(images[currentImageIndex].asset).width(1200).quality(85).url()}
                alt={images[currentImageIndex].alt || project.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />

              {/* Image navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
          )}

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={image._key}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded transition-all ${
                    index === currentImageIndex
                      ? 'ring-2 ring-white'
                      : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={urlFor(image.asset).width(100).height(100).quality(60).url()}
                    alt={image.alt || `${project.title} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right side - Info */}
        <div className="mt-6 flex-1 md:mt-0 md:overflow-y-auto">
          {/* Title */}
          <h2 className="text-3xl font-light tracking-tight md:text-4xl">
            {project.title}
          </h2>

          {/* Year */}
          {project.year && (
            <p className="mt-2 font-mono text-sm text-white/50">{project.year}</p>
          )}

          {/* Description */}
          {project.description && (
            <p className="mt-4 text-base leading-relaxed text-white/70">
              {project.description}
            </p>
          )}

          {/* Full description (Portable Text) */}
          {project.fullDescription && (
            <div className="prose prose-invert mt-6 max-w-none prose-p:text-white/70 prose-a:text-white prose-a:underline">
              <PortableText value={project.fullDescription} />
            </div>
          )}

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-white/50">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded bg-white/10 px-2 py-1 font-mono text-xs text-white/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="mt-4">
              <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-white/50">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {project.links && project.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-white/90"
                >
                  {link.title}
                  <ExternalLink size={14} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

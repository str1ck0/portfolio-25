'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { urlFor, type Project, type ProjectImage } from '@/lib/sanity'
import ProjectOverlay from './ProjectOverlay'
import ProjectDetail from './ProjectDetail'

interface GalleryProps {
  projects: Project[]
  interval?: number // seconds between auto-advance
}

interface GalleryItem {
  project: Project
  image: ProjectImage
  index: number
}

export default function Gallery({ projects, interval = 6 }: GalleryProps) {
  // Flatten all featured images from projects into a single array
  const galleryItems: GalleryItem[] = projects.flatMap((project, projectIndex) =>
    (project.images || []).map((image, imageIndex) => ({
      project,
      image,
      index: projectIndex * 100 + imageIndex, // unique index
    }))
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const currentItem = galleryItems[currentIndex]

  // Navigate to specific index
  const goTo = useCallback((index: number) => {
    if (index === currentIndex || isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(index)
      setTimeout(() => setIsTransitioning(false), 50)
    }, 300)
  }, [currentIndex, isTransitioning])

  // Navigate to next/prev
  const goNext = useCallback(() => {
    const next = (currentIndex + 1) % galleryItems.length
    goTo(next)
  }, [currentIndex, galleryItems.length, goTo])

  const goPrev = useCallback(() => {
    const prev = (currentIndex - 1 + galleryItems.length) % galleryItems.length
    goTo(prev)
  }, [currentIndex, galleryItems.length, goTo])

  // Auto-advance timer
  useEffect(() => {
    if (isHovering || showDetail || galleryItems.length <= 1) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      return
    }

    timerRef.current = setInterval(goNext, interval * 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isHovering, showDetail, interval, goNext, galleryItems.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showDetail) return // Don't navigate when modal is open

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        goPrev()
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setShowDetail(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev, showDetail])

  // Touch swipe support
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX.current

    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        goNext()
      } else {
        goPrev()
      }
    }
  }

  if (galleryItems.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-white/40">No projects to display</p>
      </div>
    )
  }

  return (
    <>
      <div
        className="relative h-full w-full"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main Image */}
        <div
          className="relative h-full w-full cursor-pointer overflow-hidden"
          onClick={() => setShowDetail(true)}
        >
          {currentItem && (
            <Image
              src={urlFor(currentItem.image.asset).width(1920).quality(90).url()}
              alt={currentItem.image.alt || currentItem.project.title}
              fill
              priority
              className={`object-contain transition-opacity duration-500 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
              sizes="90vw"
              placeholder={currentItem.image.asset.metadata?.lqip ? 'blur' : 'empty'}
              blurDataURL={currentItem.image.asset.metadata?.lqip}
            />
          )}

          {/* Overlay on hover */}
          {currentItem && (
            <ProjectOverlay
              project={currentItem.project}
              isVisible={isHovering && !showDetail}
            />
          )}
        </div>

        {/* Navigation Dots */}
        {galleryItems.length > 1 && (
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  goTo(index)
                }}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white scale-125'
                    : 'bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Image counter */}
        <div className="absolute bottom-4 right-4 z-10 font-mono text-xs text-white/40">
          {currentIndex + 1} / {galleryItems.length}
        </div>
      </div>

      {/* Project Detail Modal */}
      {showDetail && currentItem && (
        <ProjectDetail
          project={currentItem.project}
          onClose={() => setShowDetail(false)}
        />
      )}
    </>
  )
}

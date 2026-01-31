'use client'

import type { Project } from '@/lib/sanity'

interface ProjectOverlayProps {
  project: Project
  isVisible: boolean
}

export default function ProjectOverlay({ project, isVisible }: ProjectOverlayProps) {
  return (
    <div
      className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 transition-opacity duration-300 md:p-8 ${
        isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="max-w-xl">
        {/* Title */}
        <h2 className="mb-2 text-2xl font-light tracking-tight md:text-3xl">
          {project.title}
        </h2>

        {/* Description */}
        {project.description && (
          <p className="mb-4 text-sm leading-relaxed text-white/70 md:text-base">
            {project.description}
          </p>
        )}

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Click hint */}
        <p className="mt-4 text-xs text-white/40">
          Click for details
        </p>
      </div>
    </div>
  )
}

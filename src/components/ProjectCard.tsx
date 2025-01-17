"use client"
import React, { useState, useCallback, memo } from 'react';
import Image from "next/image";
import dynamic from 'next/dynamic';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ImageGalleryModal = dynamic(() => import('./ImageGalleryModal'), {
  loading: () => <div className="fixed inset z-50 bg-black/90 flex items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
  </div>
});

interface ProjectDetails {
  summary?: string;
  paragraphs?: string[];
  technologies?: string[];
  challenges?: string[];
  outcomes?: string[];
  links?: {
    title: string;
    url: string;
    icon?: string;
  }[];
}

interface Project {
  title: string;
  subtitle: string;
  description: string | ProjectDetails;
  images: {
    url: string;
    alt: string;
    style?: {
      objectFit?: string;
      position?: string
    }
  }[];
  imageStyle?: string;
  imagePosition?: string;
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Memoize image style props
  const imageProps = React.useMemo(() => ({
    objectFit: project.images[0]?.style?.objectFit || project.imageStyle || "cover",
    objectPosition: project.images[0]?.style?.position || project.imagePosition || "center",
  }), [project.images, project.imageStyle, project.imagePosition]);

  const handleNext = useCallback((specificIndex?: number) => {
    if (typeof specificIndex === 'number') {
      setCurrentImageIndex(specificIndex);
    } else {
      setCurrentImageIndex((prev) =>
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }
  }, [project.images.length]);

  const handlePrev = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  }, [project.images.length]);

  const renderDescription = () => {
    if (typeof project.description === 'string') {
      return (
        <p className="text-gray-600 dark:text-gray-300 font-albert transform
          transition-all duration-300 delay-100 group-hover:translate-x-1">
          {project.description}
        </p>
      );
    }

    const details = project.description as ProjectDetails;

    return (
      <div className="space-y-4">
        {details.summary && (
          <p className="text-gray-600 dark:text-gray-300 font-albert transform
            transition-all duration-300 delay-100 group-hover:translate-x-1">
            {details.summary}
          </p>
        )}

        {isExpanded && (
          <>
            {details.paragraphs?.map((paragraph, index) => (
              <p key={index} className="text-gray-600 dark:text-gray-300 font-albert transform
                transition-all duration-300 delay-100 group-hover:translate-x-1">
                {paragraph}
              </p>
            ))}

            {details.technologies && (
              <div className="mt-4">
                <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {details.technologies.map((tech, index) => (
                    <span key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full
                      text-sm text-gray-700 dark:text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {details.challenges && (
              <div className="mt-4">
                <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
                  Challenges
                </h4>
                <ul className="list-disc list-inside space-y-2">
                  {details.challenges.map((challenge, index) => (
                    <li key={index} className="text-gray-600 dark:text-gray-300">
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {details.outcomes && (
              <div className="mt-4">
                <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
                  Key Outcomes
                </h4>
                <ul className="list-disc list-inside space-y-2">
                  {details.outcomes.map((outcome, index) => (
                    <li key={index} className="text-gray-600 dark:text-gray-300">
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {details.links && (
              <div className="mt-4 flex flex-wrap gap-3">
                {details.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100
                      dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700
                      transition-colors duration-200"
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            )}
          </>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400
            hover:underline mt-2"
        >
          {isExpanded ? (
            <>Show Less <ChevronUp className="h-4 w-4" /></>
          ) : (
            <>Read More <ChevronDown className="h-4 w-4" /></>
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="group flex flex-col md:flex-row gap-6 bg-white dark:bg-gray-900
      rounded-2xl hover:shadow-xl p-6 mb-6 transition-all duration-300 ease-in-out">
      <div
        className="relative w-full md:w-3/5 aspect-[24/16] overflow-hidden rounded-xl cursor-pointer"
        onClick={() => setIsGalleryOpen(true)}
      >
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse"/>
        )}

        <Image
          src={project.images[0].url}
          alt={project.images[0].alt}
          fill
          quality={85}
          {...imageProps}
          sizes="(max-width: 768px) 100vw, 60vw"
          onLoadingComplete={() => setIsImageLoaded(true)}
          className={`transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {project.images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1
            rounded-full text-white text-sm transform transition-all duration-300
            translate-y-1 opacity-90 group-hover:translate-y-0 group-hover:opacity-100">
            {project.images.length} images
          </div>
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10
          transition-all duration-300">
        </div>
      </div>

      <div className="flex flex-col w-full md:w-2/5">
        <h3 className="text-2xl font-bold mb-4 font-space text-gray-900 dark:text-gray-100
          transform transition-all duration-300 group-hover:translate-x-1">
          {project.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-bold font-albert
          transform transition-all duration-300 delay-75 group-hover:translate-x-1">
          {project.subtitle}
        </p>
        {renderDescription()}
      </div>

      {isGalleryOpen && (
        <ImageGalleryModal
          images={project.images}
          currentIndex={currentImageIndex}
          onClose={() => {
            setIsGalleryOpen(false);
            setCurrentImageIndex(0);
          }}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
};

export default memo(ProjectCard);

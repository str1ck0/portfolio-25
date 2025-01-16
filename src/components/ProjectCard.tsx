"use client"
import React, { useState, useEffect, useCallback } from 'react';
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"

const ImageGalleryModal = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  // Handle keyboard nav
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'ArrowLeft') onPrev();
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyPress]);

  if (!images || images.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p4"
      onClick={(e) => e.target === e.currentTarget && onClose() }
    >
      <div className="relative w-full max-w-6xl mx-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 p-2 bg-black/50 rounded-full text-white
            hover:bg-white/20 hover:scale-110 transition-all duration-300"
        >
          <X size={24} />
        </button>

        {/* Main image */}
        <div className="relative aspect-video w-full rounded-lg overflow-hidden group">
          <Image
            src={images[currentIndex].url}
            alt={images[currentIndex].alt}
            fill
            className="object-contain transform-transition duration-500"
            sizes="(max-width: 1536px) 100vw, 1536px"
            quality={100}
            priority
          />
        </div>

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 rounded-full
                text-white hover:bg-white/20 hover:scale-110 transition-all duration-300
                opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 rounded-full
                text-white hover:bg-white/20 hover:scale-110 transition-all duration-300
                opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Thumbnails */}
        <div className="flex gap-2 mt-4 justify-center">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onNext(index)}
              className={`relative w-16 h-16 rounded-lg overflow-hidden ${
                index === currentIndex ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-100'
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const ProjectCard = ({ project }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

 // Get image styles
  const getImageProps = (image) => {
  return {
    objectFit: image?.style?.objectFit || project.imageStyle || "cover",
    objectPosition: image?.style?.position || project.imagePosition || "center",
  };
};



  const handleNext = useCallback((specificIndex) => {
    if (typeof specificIndex === 'number') {
      setCurrentImageIndex(specificIndex);
    } else {
      setCurrentImageIndex((prev) =>
        prev === project.images.length -1 ? 0 : prev + 1
      );
    }
  }, [project.images.length]);

  const handlePrev = useCallback(() => {
    setCurrentImageIndex((prev) =>
    prev === 0 ? project.images.length - 1 : prev - 1
    );
  }, [project.images.length]);

  return (
    <div className="group flex flex-col md:flex-row gap-6 bg-white dark:bg-gray-900 rounded-2xl hover:shadow-xl p-6 mb-6 transition-all duration-500 ease-in-out">
      <div
        className="relative w-full md:w-3/5 aspect-[24/16] overflow-hidden rounded-xl cursor-pointer"
        onClick={() => setIsGalleryOpen(true)}
      >
        <Image
          src={project.images[0].url}
          alt={project.images[0].alt}
          fill
          quality={100}
          {...getImageProps(project.images[0])}
          className=""
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {project.images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm
          transform transition-all duration-300 translate-y-1 opacity-90 group-hover:translate-y-0 group-hover:opacity-100">
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
        <p className="text-gray-600 dark:text-gray-300 font-albert
          transform transition-all duration-300 delay-100 group-hover:translate-x-1">
          {project.description}
        </p>
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

export default ProjectCard;

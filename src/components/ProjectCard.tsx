"use client"
import React, { useState } from 'react';
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react"

const ImageGalleryModal = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p4">
      <div className="relative w-full max-w-6xl mx-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-all"
        >
          <X size={24} />
        </button>

        {/* Main image */}
        <div className="relative aspect-video w-full rounded-lg overflow-hidden">
          <Image
            src={images[currentIndex].url}
            alt={images[currentIndex].alt}
            fill
            className="object-contain"
            sizes="(max-width: 1536px) 100vw, 1536px"
            quality={100}
          />
        </div>

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p2 bg-black bg-opacity-50 rounded full text-white hover:bg-opacity-75 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-all"
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

  const handleNext = (specificIndex) => {
    if (typeof specificIndex === 'number') {
      setCurrentImageIndex(specificIndex);
    } else {
      setCurrentImageIndex((prev) =>
        prev === project.images.length -1 ? 0 : prev + 1
      );
    }
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
    prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="group flex flex-col md:flex-row gap-4 bg-white dark:bg-gray-900 transition-all duration-300">
      <div
        className="relative w-full md:w-3/5 aspect-[24/14] overflow-hidden rounded-xl cursor-pointer"
        onClick={() => setIsGalleryOpen(true)}
      >
        <Image
          src={project.images[0].url}
          alt={project.images[0].alt}
          fill
          quality={100}
          className="object-cover transition-transform duration-300 ease-in-out"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {project.images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 px-3 py-1 rounded-full text-white text-sm">
            {project.images.length} images
          </div>
        )}
      </div>

      <div className="flex flex-col w-full md:w-2/5">
        <h3 className="text-3xl font-bold mb-4 font-space text-gray-900 dark:text-gray-100">
          {project.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-bold font-albert">
          {project.subtitle}
        </p>
        <p className="text-gray-600 dark:text-gray-300 font-albert">
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

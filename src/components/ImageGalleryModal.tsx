import React, { useState, useEffect, useCallback } from 'react';
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageGalleryModalProps {
  images: { url: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onNext: (index?: number) => void;
  onPrev: () => void;
}

const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle keyboard nav
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight' && !isTransitioning) onNext();
    if (e.key === 'ArrowLeft' && !isTransitioning) onPrev();
  }, [onClose, onNext, onPrev, isTransitioning]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyPress]);

  // Handle image transitions
  const handleImageTransition = useCallback(() => {
    setIsTransitioning(true);
    setIsImageLoaded(false);
    setTimeout(() => setIsTransitioning(false), 300);
  }, []);

  const handleNext = useCallback(() => {
    handleImageTransition();
    onNext();
  }, [handleImageTransition, onNext]);

  const handlePrev = useCallback(() => {
    handleImageTransition();
    onPrev();
  }, [handleImageTransition, onPrev]);

  if (!images || images.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 p-2 bg-black/50 rounded-full text-white
            hover:bg-white/20 transition-all duration-300"
          aria-label="Close gallery"
        >
          <X size={24} />
        </button>

        {/* Loading indicator */}
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
        )}

        {/* Main image */}
        <div className="relative aspect-video w-full rounded-lg overflow-hidden">
          <Image
            src={images[currentIndex].url}
            alt={images[currentIndex].alt}
            fill
            className={`object-contain transition-opacity duration-300 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            quality={80}
            priority
            onLoadingComplete={() => setIsImageLoaded(true)}
          />
        </div>

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              disabled={isTransitioning}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 rounded-full
                text-white hover:bg-white/20 transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                sm:opacity-0 sm:group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              disabled={isTransitioning}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 rounded-full
                text-white hover:bg-white/20 transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                sm:opacity-0 sm:group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Thumbnails - only show on larger screens */}
        <div className="hidden sm:flex gap-2 mt-4 justify-center">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onNext(index)}
              className={`relative w-16 h-16 rounded-lg overflow-hidden ${
                index === currentIndex ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-100'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="64px"
                quality={60}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGalleryModal;

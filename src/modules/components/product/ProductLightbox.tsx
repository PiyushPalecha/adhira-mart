"use client";

import React, { useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ShopifyProductImage } from "@/lib/products";

interface ProductLightboxProps {
  isOpen: boolean;
  images: ShopifyProductImage[];
  currentIndex: number;
  productTitle: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ProductLightbox({
  isOpen,
  images,
  currentIndex,
  productTitle,
  onClose,
  onNavigate,
}: ProductLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const total = images.length;
  const currentImage = images[currentIndex];

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    onNavigate((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onNavigate]);

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    onNavigate((currentIndex + 1) % total);
  }, [currentIndex, total, onNavigate]);

  // Keyboard navigation & lock background scroll
  useEffect(() => {
    if (!isOpen) return;

    // Save previous overflow
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${productTitle} image gallery lightbox`}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/95 backdrop-blur-md select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Header bar */}
      <div
        className="w-full flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Position Indicator */}
        <div className="flex items-center gap-3">
          <span className="bg-white/15 text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
            {currentIndex + 1} / {total}
          </span>
          <span className="text-white/70 text-xs sm:text-sm font-medium truncate max-w-[200px] sm:max-w-md hidden sm:inline">
            {productTitle}
          </span>
        </div>

        {/* Action Controls: Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close image lightbox (Escape)"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 active:bg-white/35 text-white flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-white/80"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Main Image Viewport */}
      <div className="relative flex-1 flex items-center justify-center px-4 sm:px-16 py-2 overflow-hidden">
        {/* Previous Button */}
        {total > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous product image"
            className="absolute left-2 sm:left-6 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/25 active:bg-white/35 text-white flex items-center justify-center backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-white/80"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Center Image Container */}
        <div
          className="relative max-w-full max-h-[75vh] sm:max-h-[82vh] aspect-square flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-[85vw] sm:w-[70vw] md:w-[60vw] max-w-[850px] h-[65vh] sm:h-[75vh] flex items-center justify-center">
            <Image
              src={currentImage.url}
              alt={currentImage.altText || `${productTitle} - Image ${currentIndex + 1}`}
              fill
              priority
              className="object-contain drop-shadow-2xl transition-all duration-300"
              sizes="(max-width: 768px) 95vw, 850px"
            />
          </div>
        </div>

        {/* Next Button */}
        {total > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next product image"
            className="absolute right-2 sm:right-6 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/25 active:bg-white/35 text-white flex items-center justify-center backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-white/80"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip (if multiple images) */}
      {total > 1 && (
        <div
          className="w-full py-4 px-4 sm:px-8 z-20 flex justify-center items-center gap-2 overflow-x-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex gap-2 sm:gap-3 p-1.5 bg-black/40 rounded-2xl backdrop-blur-md max-w-full overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={img.id || idx}
                type="button"
                onClick={() => onNavigate(idx)}
                aria-label={`Jump to image ${idx + 1}`}
                className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  idx === currentIndex
                    ? "border-white scale-105 shadow-lg opacity-100"
                    : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.altText || `Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

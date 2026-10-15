"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ShopifyProductImage } from "@/lib/products";

interface ProductMobileCarouselProps {
  images: ShopifyProductImage[];
  productTitle: string;
  onImageClick: (index: number) => void;
  selectedImageIndex?: number;
}

export default function ProductMobileCarousel({
  images,
  productTitle,
  onImageClick,
  selectedImageIndex,
}: ProductMobileCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: images.length > 1,
    align: "start",
    skipSnaps: false,
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Synchronize when variant selection changes the active image
  useEffect(() => {
    if (
      emblaApi &&
      typeof selectedImageIndex === "number" &&
      selectedImageIndex >= 0 &&
      selectedImageIndex < images.length
    ) {
      emblaApi.scrollTo(selectedImageIndex);
    }
  }, [emblaApi, selectedImageIndex, images.length]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (images.length === 0) {
    return (
      <div className="w-full aspect-square bg-[#F0EEED] rounded-3xl flex items-center justify-center text-muted">
        No image available
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden block lg:hidden">
      {/* Embla Viewport */}
      <div ref={emblaRef} className="overflow-hidden w-full cursor-grab active:cursor-grabbing">
        <div className="flex touch-pan-y -ml-3">
          {images.map((image, index) => (
            <div
              key={image.id || index}
              className="flex-[0_0_100%] min-w-0 pl-3"
            >
              <button
                type="button"
                onClick={() => onImageClick(index)}
                className="w-full relative aspect-[4/5] bg-[#F0EEED] rounded-3xl overflow-hidden block text-left focus:outline-none focus:ring-2 focus:ring-primary/40 group"
                aria-label={`View ${productTitle} image ${index + 1} of ${images.length} full screen`}
              >
                <Image
                  src={image.url}
                  alt={image.altText || `${productTitle} - image ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />

                {/* Subtle Tap to Enlarge Indicator */}
                <div className="absolute bottom-3 right-3 bg-black/40 text-white rounded-full p-2 backdrop-blur-xs opacity-80 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Nav Chevrons (if multiple images) */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-primary shadow-md flex items-center justify-center transition-all focus:outline-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next slide"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-primary shadow-md flex items-center justify-center transition-all focus:outline-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Counter Pill & Dots */}
      {images.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {/* Pagination dots mapped directly from images */}
          <div className="flex items-center gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => emblaApi?.scrollTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === selectedIndex
                    ? "w-6 bg-primary"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          <span className="text-xs font-semibold text-muted ml-2">
            {selectedIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  );
}

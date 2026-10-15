"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShopifyProductImage } from "@/lib/products";

interface ProductGalleryDesktopProps {
  images: ShopifyProductImage[];
  productTitle: string;
  onImageClick: (index: number) => void;
  selectedImageIndex?: number;
}

export default function ProductGalleryDesktop({
  images,
  productTitle,
  onImageClick,
  selectedImageIndex = 0,
}: ProductGalleryDesktopProps) {
  const [userHeroIndex, setUserHeroIndex] = useState<number | null>(null);
  const [prevPropIndex, setPrevPropIndex] = useState(selectedImageIndex);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // If parent changed selectedImageIndex (e.g. from variant selection), reset user override
  if (prevPropIndex !== selectedImageIndex) {
    setPrevPropIndex(selectedImageIndex);
    setUserHeroIndex(null);
  }

  if (images.length === 0) {
    return (
      <div className="w-full aspect-square bg-white rounded-3xl border border-gray-200 flex items-center justify-center text-muted">
        No image available
      </div>
    );
  }

  const activeHeroIndex = userHeroIndex !== null ? userHeroIndex : selectedImageIndex;
  const heroImage = images[activeHeroIndex] || images[0];
  const hasMultipleImages = images.length > 1;

  return (
    <div className="hidden lg:flex items-start gap-3.5 xl:gap-5 w-full">
      {/* Left Column: Vertical Thumbnails Stack (when multiple images exist) */}
      {hasMultipleImages && (
        <div className="flex flex-col gap-3 w-20 xl:w-24 shrink-0 max-h-[560px] overflow-y-auto py-1 pr-1">
          {images.map((img, idx) => {
            const isSelected = idx === activeHeroIndex;
            return (
              <button
                key={img.id || idx}
                type="button"
                onClick={() => setUserHeroIndex(idx)}
                onMouseEnter={() => setUserHeroIndex(idx)}
                className={`relative w-full aspect-square rounded-2xl overflow-hidden bg-white transition-all cursor-pointer group flex items-center justify-center ${
                  isSelected
                    ? "border-2 border-[#008ECC] shadow-sm ring-1 ring-[#008ECC]/20"
                    : "border border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100"
                }`}
                aria-label={`Select product image ${idx + 1}`}
              >
                <div className="relative w-full h-full p-2">
                  <Image
                    src={img.url}
                    alt={img.altText || `${productTitle} thumbnail ${idx + 1}`}
                    fill
                    className="object-contain p-1 transition-transform duration-200 group-hover:scale-105"
                    sizes="96px"
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Right Column: Large Featured Main Image Card */}
      <div className="flex-1 min-w-0">
        <div className="relative w-full aspect-square max-h-[560px] rounded-3xl border border-gray-200 bg-white overflow-hidden group shadow-xs">
          {/* Wishlist Heart Icon Button (matches reference image 1 & 2) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className={`absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center transition-all hover:scale-110 focus:outline-none ${
              isWishlisted ? "text-rose-500 fill-rose-500" : "text-gray-700 hover:text-rose-500"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill={isWishlisted ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>

          {/* Main Image Viewport & Click-to-Lightbox */}
          <button
            type="button"
            onClick={() => onImageClick(activeHeroIndex)}
            className="w-full h-full relative block cursor-zoom-in focus:outline-none"
            aria-label={`View full-screen ${productTitle} image ${activeHeroIndex + 1} of ${images.length} in lightbox`}
          >
            <Image
              src={heroImage.url}
              alt={heroImage.altText || `${productTitle} - featured view`}
              fill
              priority
              className="object-contain p-6 sm:p-8 group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 1024px) 100vw, 600px"
            />

            {/* Subtle Hover Expand Badge */}
            <div className="absolute bottom-4 right-4 bg-white/95 text-primary text-xs font-semibold px-3 py-1.5 rounded-full shadow-xs border border-gray-200 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
              <span>Click to enlarge</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

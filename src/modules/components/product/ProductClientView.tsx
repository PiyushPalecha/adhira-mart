"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ShopifyProductDetail, ShopifyProductVariant } from "@/lib/products";
import ProductGalleryDesktop from "./ProductGalleryDesktop";
import ProductMobileCarousel from "./ProductMobileCarousel";
import ProductInfoSection from "./ProductInfoSection";
import ProductLightbox from "./ProductLightbox";

interface ProductClientViewProps {
  product: ShopifyProductDetail;
}

export default function ProductClientView({ product }: ProductClientViewProps) {
  // Extract all product images
  const allImages = useMemo(() => {
    return product.images?.nodes || [];
  }, [product.images]);

  // Selected variant state (defaults to first variant)
  const [selectedVariant, setSelectedVariant] = useState<ShopifyProductVariant | null>(
    product.variants?.nodes?.[0] || null
  );

  // Selected image index state
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Lightbox state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // When variant changes, if variant has an image, switch to it
  const handleSelectVariant = (variant: ShopifyProductVariant) => {
    setSelectedVariant(variant);

    if (variant.image) {
      const imgIdx = allImages.findIndex((img) => img.url === variant.image?.url || img.id === variant.image?.id);
      if (imgIdx !== -1) {
        setActiveImageIndex(imgIdx);
      }
    }
  };

  // Open lightbox handler
  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  // Scroll to top on product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [product.id]);

  return (
    <>
      {/* Top Breadcrumb Navigation (Across both columns as shown in reference) */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 font-medium mb-6 sm:mb-8 flex-wrap">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span>&rsaquo;</span>
        <Link href="/collections/all" className="hover:text-primary transition-colors">
          Shop
        </Link>
        {product.productType && (
          <>
            <span>&rsaquo;</span>
            <span className="text-neutral-500 capitalize">{product.productType}</span>
          </>
        )}
        <span>&rsaquo;</span>
        <span className="text-primary font-bold truncate max-w-[200px] sm:max-w-md">{product.title}</span>
      </nav>

      {/* Two-Column Layout */}
      <div className="w-full flex flex-col lg:flex-row items-start gap-8 lg:gap-10 xl:gap-14">
        {/* Left Column: Dedicated Product Gallery Container */}
        <div className="w-full lg:w-[48%] xl:w-[46%] shrink-0 lg:sticky lg:top-28">
          {/* Mobile Embla Touch Carousel (hidden on lg+) */}
          <ProductMobileCarousel
            images={allImages}
            productTitle={product.title}
            onImageClick={handleOpenLightbox}
            selectedImageIndex={activeImageIndex}
          />

          {/* Desktop Gallery: Vertical Thumbnails on Left + Main Preview on Right */}
          <ProductGalleryDesktop
            images={allImages}
            productTitle={product.title}
            onImageClick={handleOpenLightbox}
            selectedImageIndex={activeImageIndex}
          />
        </div>

        {/* Right Column: Product Information Section */}
        <div className="w-full lg:w-[52%] xl:w-[54%] flex-1 min-w-0">
          <ProductInfoSection
            product={product}
            selectedVariant={selectedVariant}
            onSelectVariant={handleSelectVariant}
          />
        </div>
      </div>

      {/* Interactive Full-Screen Lightbox */}
      <ProductLightbox
        isOpen={isLightboxOpen}
        images={allImages}
        currentIndex={lightboxIndex}
        productTitle={product.title}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </>
  );
}

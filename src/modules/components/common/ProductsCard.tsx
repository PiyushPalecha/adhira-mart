import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShopifyProduct } from "../../../lib/products";

interface ProductsCardProps {
    product: ShopifyProduct;
    // Optional static/fallback configuration props for future flexibility (e.g. mock ratings)
    rating?: string;
    reviewCount?: string;
}

export default function ProductsCard({
    product,
}: ProductsCardProps) {
    const primaryImage = product.featuredImage;
    const minPrice = product.priceRange.minVariantPrice;

    return (
        <Link href={`/product/${product.handle}`} className="group block">
            <div className="flex flex-col">
                {/* Dynamic Image Container */}
                <div className="relative w-full h-72 bg-[#F0EEED] rounded-[20px] overflow-hidden mb-4 flex items-center justify-center">
                    {primaryImage ? (
                        <Image
                            src={primaryImage.url}
                            alt={primaryImage.altText || product.title}
                            fill
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="text-gray-400 text-sm font-medium">No Image Available</div>
                    )}
                </div>

                {/* Dynamic Product Title */}
                <h3 className="font-bold text-lg text-black truncate mb-1">
                    {product.title}
                </h3>

                {/* Rating Display (Using props/config fallback until review backend is integrated)
                <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-yellow-400 text-sm">
                        {"★".repeat(4)}
                        <span className="text-gray-300">★</span>
                    </div>
                    <span className="text-xs text-gray-500 ml-1">{rating}</span>
                </div> */}

                {/* Dynamic Price & Currency */}
                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-black">
                        {minPrice.currencyCode === "INR" ? "₹" : "\$"}
                        {parseFloat(minPrice.amount).toLocaleString()}
                    </span>
                </div>
            </div>
        </Link>
    );
}
import Link from "next/link";
import Image from "next/image";
import { getProducts } from "../lib/products";
import Hero from "../modules/components/home/Hero";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Featured Products Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 py-16 sm:py-20">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-semibold mb-2">
            Selected Just For You
          </p>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-primary">
            Curated Best Sellers
          </h2>
        </div>

        {products.length === 0 ? (
          <div className="p-8 bg-ivory border border-black/5 rounded-3xl text-center text-neutral-600 max-w-xl mx-auto">
            No products found in your Shopify admin. Add products in Shopify Admin to see them here.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {products.map((product) => {
              const numericId = product.id.split("/").pop() || product.handle;
              return (
                <Link
                  key={product.id}
                  href={`/product/${numericId}`}
                  className="group p-4 bg-white rounded-3xl border border-black/5 hover:border-black/15 transition-all duration-300 hover:shadow-xl flex flex-col block"
                >
                  {product.featuredImage && (
                    <div className="w-full h-64 overflow-hidden rounded-2xl bg-ivory mb-4 relative">
                      <Image
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText || product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                      />
                    </div>
                  )}
                  <h3 className="font-bold text-lg text-primary mb-1 line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 mb-4 line-clamp-2 leading-relaxed">
                    {product.description || "Thoughtfully designed for comfort and elegance."}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-2 border-t border-neutral-100">
                    <p className="text-lg font-black text-primary">
                      {product.priceRange.minVariantPrice.currencyCode === "INR" ? "₹" : product.priceRange.minVariantPrice.currencyCode}{" "}
                      {parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                    </p>
                    <span className="text-xs font-semibold text-primary underline underline-offset-4 group-hover:text-neutral-600 transition-colors">
                      View Details &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

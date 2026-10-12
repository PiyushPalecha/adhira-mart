import { getProducts } from "../lib/products";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen p-8 bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-indigo-400 mb-2">
          AdhiraMart Storefront
        </h1>
        <p className="text-emerald-400 font-medium mb-8">
          ✓ Next.js + Tailwind CSS + Shopify Storefront API Connected!
        </p>

        <h2 className="text-2xl font-bold mb-4">
          Live Store Products ({products.length})
        </h2>

        {products.length === 0 ? (
          <div className="p-6 bg-amber-900/40 border border-amber-600 rounded-lg text-amber-200">
            No products found in your Shopify admin. Add products in Shopify Admin to see them here.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="p-5 bg-slate-800 rounded-2xl border border-slate-700 hover:border-indigo-500 transition shadow-lg"
              >
                {product.featuredImage && (
                  <img
                    src={product.featuredImage.url}
                    alt={product.featuredImage.altText || product.title}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                )}
                <h3 className="font-bold text-lg mb-1">{product.title}</h3>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                  {product.description || "No description provided."}
                </p>
                <p className="text-xl font-black text-indigo-400">
                  {product.priceRange.minVariantPrice.currencyCode}{" "}
                  {parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
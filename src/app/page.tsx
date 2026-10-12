import { getProducts } from "../lib/products";
import ProductsCard from "../modules/components/common/ProductsCard";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen p-8 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black text-black mb-1">
          NEW ARRIVALS
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          ✓ Next.js + Tailwind CSS + Shopify Storefront API Connected! Live Store Products ({products.length})
        </p>

        {products.length === 0 ? (
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl text-gray-600 text-center">
            No products found in your Shopify admin. Add products in Shopify Admin to see them here.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductsCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
import { getProductsByCollection } from "@/lib/products";
import ProductsCard from "@/modules/components/common/ProductsCard";
import { notFound } from "next/navigation";

export const instant = false;

interface CollectionPageProps {
  params: Promise<{
    handle: string;
  }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;
  const products = await getProductsByCollection(handle);

  if (!products) {
    notFound();
  }

  return (
    <main className="min-h-screen p-8 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black uppercase text-black mb-2">
          {handle.replace("-", " ")} Collection
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Showing live products from the Shopify collection ({products.length})
        </p>

        {products.length === 0 ? (
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl text-gray-600 text-center">
            No products found in this collection. Add items to this collection in your Shopify Admin.
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
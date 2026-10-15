import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";
import ProductClientView from "@/modules/components/product/ProductClientView";

export const instant = false;

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found | Adhira Mart",
      description: "The requested product could not be found.",
    };
  }

  const primaryImage = product.images.nodes[0]?.url;

  return {
    title: `${product.title} | Adhira Mart`,
    description:
      product.description ||
      "Discover premium collections and curated essentials at Adhira Mart.",
    openGraph: {
      title: `${product.title} | Adhira Mart`,
      description: product.description,
      images: primaryImage ? [{ url: primaryImage }] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white py-6 sm:py-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        <ProductClientView product={product} />
      </div>
    </main>
  );
}

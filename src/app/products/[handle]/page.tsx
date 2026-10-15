import { redirect } from "next/navigation";

export const instant = false;

interface LegacyProductsPageProps {
  params: Promise<{
    handle: string;
  }>;
}

export default async function LegacyProductsPage({ params }: LegacyProductsPageProps) {
  const { handle } = await params;
  redirect(`/product/${handle}`);
}

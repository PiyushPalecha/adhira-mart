export const instant = false;

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  // call api for this category
  return (
    <main className="min-h-screen p-8 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black uppercase text-black mb-2">
          {category}
        </h1>
      </div>
    </main>
  );
}
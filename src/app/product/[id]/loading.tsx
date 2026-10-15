export default function ProductLoading() {
  return (
    <main className="min-h-screen bg-white py-6 sm:py-10 animate-pulse">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-48 bg-gray-200 rounded mb-8" />

        {/* 30% / 70% Skeleton Layout */}
        <div className="w-full flex flex-col lg:flex-row items-start gap-8 lg:gap-12 xl:gap-16">
          {/* Left Gallery Skeleton (~30%) */}
          <div className="w-full lg:w-[32%] xl:w-[30%] shrink-0 space-y-4">
            <div className="w-full aspect-[4/5] bg-gray-200 rounded-3xl" />
            <div className="hidden lg:grid grid-cols-2 gap-3">
              <div className="aspect-square bg-gray-200 rounded-2xl" />
              <div className="aspect-square bg-gray-200 rounded-2xl" />
            </div>
          </div>

          {/* Right Product Details Skeleton (~70%) */}
          <div className="w-full lg:w-[68%] xl:w-[70%] flex-1 space-y-6">
            {/* Title */}
            <div className="h-10 bg-gray-200 rounded-lg w-3/4" />
            {/* Rating & Stock */}
            <div className="flex gap-3">
              <div className="h-6 w-32 bg-gray-200 rounded-full" />
              <div className="h-6 w-24 bg-gray-200 rounded-full" />
            </div>
            {/* Price */}
            <div className="h-10 w-44 bg-gray-200 rounded-lg" />
            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
            {/* Variant Selectors */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="h-4 w-28 bg-gray-200 rounded" />
              <div className="flex gap-3">
                <div className="h-10 w-20 bg-gray-200 rounded-full" />
                <div className="h-10 w-20 bg-gray-200 rounded-full" />
                <div className="h-10 w-20 bg-gray-200 rounded-full" />
              </div>
            </div>
            {/* Add to cart */}
            <div className="flex gap-4 pt-4">
              <div className="h-14 w-36 bg-gray-200 rounded-full" />
              <div className="h-14 flex-1 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

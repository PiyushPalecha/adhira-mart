import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-white px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-[#F0EEED] flex items-center justify-center text-primary">
          <svg className="w-10 h-10 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black uppercase tracking-tight text-primary">
            Product Not Found
          </h1>
          <p className="text-sm text-neutral-500 leading-relaxed">
            The product you are looking for might have been removed, had its identifier changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-primary hover:bg-neutral-800 text-white font-bold px-8 py-3.5 rounded-full text-sm transition-all shadow-sm"
          >
            Explore Best Sellers
          </Link>
          <Link
            href="/collections/new-arrivals"
            className="bg-[#F0EEED] hover:bg-neutral-200 text-primary font-bold px-8 py-3.5 rounded-full text-sm transition-all"
          >
            View New Arrivals
          </Link>
        </div>
      </div>
    </main>
  );
}

"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Product Page Error:", error);
  }, [error]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-white px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-red-50 flex items-center justify-center text-red-600">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-primary">
            Unable to Load Product
          </h1>
          <p className="text-sm text-neutral-500 leading-relaxed">
            We encountered a temporary issue connecting to the Shopify storefront. Please try refreshing the page.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="bg-primary hover:bg-neutral-800 text-white font-bold px-8 py-3.5 rounded-full text-sm transition-all shadow-sm"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="bg-[#F0EEED] hover:bg-neutral-200 text-primary font-bold px-8 py-3.5 rounded-full text-sm transition-all"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 4000);
    }
  };

  const footerLinks = {
    company: [
      { label: "About", href: "/about" },
      { label: "Features", href: "/features" },
      { label: "Works", href: "/works" },
      { label: "Career", href: "/career" },
    ],
    help: [
      { label: "Customer Support", href: "/support" },
      { label: "Delivery Details", href: "/delivery" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
    faq: [
      { label: "Account", href: "/account" },
      { label: "Manage Deliveries", href: "/deliveries" },
      { label: "Orders", href: "/orders" },
      { label: "Payments", href: "/payments" },
    ],
    resources: [
      { label: "Free eBooks", href: "/ebooks" },
      { label: "Development Tutorial", href: "/tutorials" },
      { label: "How to - Blog", href: "/blog" },
      { label: "Youtube Playlist", href: "/youtube" },
    ],
  };

  return (
    <footer className="w-full bg-secondary pt-20 mt-32 sm:mt-40 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Floating Top Newsletter Banner */}
        <div className="-mt-36 sm:-mt-44 mb-12 sm:mb-16 bg-primary rounded-[20px] px-6 sm:px-10 lg:px-16 py-8 sm:py-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-white leading-tight lg:leading-[45px] max-w-xl tracking-tight uppercase select-none text-center lg:text-left">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>

          {/* Newsletter Form */}
          <form
            onSubmit={handleSubscribe}
            className="w-full sm:w-[350px] lg:w-[360px] flex flex-col gap-3.5"
          >
            {/* Email Input */}
            <div className="w-full h-12 bg-white rounded-full flex items-center px-4 gap-3 border border-transparent focus-within:ring-2 focus-within:ring-white/50">
              <svg
                className="w-5 h-5 text-muted-light shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-transparent text-primary text-sm sm:text-base placeholder:text-muted-light outline-none"
              />
            </div>

            {/* Subscribe Button */}
            <button
              type="submit"
              className="w-full h-12 bg-white text-primary font-medium text-sm sm:text-base rounded-full hover:bg-neutral-100 transition-all cursor-pointer flex items-center justify-center shadow-xs active:scale-[0.99]"
            >
              {subscribed ? "Subscribed! Thank you" : "Subscribe to Newsletter"}
            </button>
          </form>
        </div>

        {/* Main Footer Links & Company Details */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10 pb-12 sm:pb-14">
          {/* Brand & Socials Section */}
          <div className="col-span-2 lg:col-span-2 space-y-5">
            <Link
              href="/"
              className="text-[28px] sm:text-[32px] font-black tracking-[-0.04em] text-primary select-none leading-none block"
            >
              Adhira Mart
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              We have clothes that suits your style and which you&apos;re proud to
              wear. From women to men.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1">
              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Facebook (Filled Black Circle with White 'f') */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-white flex items-center justify-center hover:opacity-85 transition-opacity"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-1.874 0-2.709.833-2.709 2.503v1.486h3.82l-.462 3.667h-3.358v7.98H9.101Z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base font-semibold tracking-[0.16em] uppercase text-primary">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm sm:text-base text-muted hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Column */}
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base font-semibold tracking-[0.16em] uppercase text-primary">
              Help
            </h3>
            <ul className="space-y-3">
              {footerLinks.help.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm sm:text-base text-muted hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ Column */}
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base font-semibold tracking-[0.16em] uppercase text-primary">
              FAQ
            </h3>
            <ul className="space-y-3">
              {footerLinks.faq.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm sm:text-base text-muted hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base font-semibold tracking-[0.16em] uppercase text-primary">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm sm:text-base text-muted hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="border-t border-black/10 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-muted text-center sm:text-left">
            Adhira Mart &copy; 2000-2023, All Rights Reserved
          </p>

          {/* Payment Badges */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap justify-center">
            {/* Visa */}
            <div
              className="bg-white rounded-md px-2.5 py-1 sm:py-1.5 border border-black/5 shadow-2xs h-7 sm:h-8 flex items-center justify-center"
              title="Visa"
            >
              <span className="font-black italic text-[#1A1F71] text-xs sm:text-sm tracking-tighter">
                VISA
              </span>
            </div>

            {/* Mastercard */}
            <div
              className="bg-white rounded-md px-2.5 py-1 sm:py-1.5 border border-black/5 shadow-2xs h-7 sm:h-8 flex items-center justify-center"
              title="Mastercard"
            >
              <div className="flex -space-x-1.5 items-center">
                <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] opacity-85" />
              </div>
            </div>

            {/* PayPal */}
            <div
              className="bg-white rounded-md px-2.5 py-1 sm:py-1.5 border border-black/5 shadow-2xs h-7 sm:h-8 flex items-center justify-center"
              title="PayPal"
            >
              <span className="font-extrabold italic text-[#003087] text-xs sm:text-sm tracking-tight">
                Pay<span className="text-[#0079C1]">Pal</span>
              </span>
            </div>

            {/* Apple Pay */}
            <div
              className="bg-white rounded-md px-2.5 py-1 sm:py-1.5 border border-black/5 shadow-2xs h-7 sm:h-8 flex items-center justify-center"
              title="Apple Pay"
            >
              <span className="font-semibold text-black text-xs sm:text-sm flex items-center gap-0.5">
                <svg
                  className="w-3 h-3 fill-current mb-0.5"
                  viewBox="0 0 170 170"
                >
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.85-11.97-14.42-6.19-9.5-10.98-20.2-14.37-32.1-3.39-11.9-5.08-23.2-5.08-33.91 0-14.8 3.58-27.14 10.74-37.03 7.16-9.88 16.32-15.02 27.48-15.42 4.48 0 9.87 1.25 16.17 3.75 6.3 2.5 10.22 3.75 11.75 3.75 1.3 0 5.43-1.35 12.39-4.05 6.96-2.7 12.63-3.9 17.02-3.6 12.63.65 22.84 5.37 30.64 14.16-11.05 6.74-16.42 16.14-16.11 28.2.33 9.4 3.99 17.27 10.98 23.6 7 6.33 15.24 10.05 24.72 11.16-2.07 6.42-4.68 13.06-7.85 19.92zM119.22 31.85c0-7.28 2.66-14.18 7.99-20.7 5.33-6.52 11.98-10.7 19.95-12.55.33 1.1.5 2.15.5 3.15 0 7.28-2.77 14.33-8.31 21.15-5.54 6.82-12.25 10.87-20.13 12.15-.33-1.07-.5-2.14-.5-3.2z" />
                </svg>
                Pay
              </span>
            </div>

            {/* Google Pay */}
            <div
              className="bg-white rounded-md px-2.5 py-1 sm:py-1.5 border border-black/5 shadow-2xs h-7 sm:h-8 flex items-center justify-center"
              title="Google Pay"
            >
              <span className="font-semibold text-xs sm:text-sm flex items-center gap-0.5">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#5F6368]">Pay</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

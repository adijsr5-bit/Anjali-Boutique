'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { SiteMetadata } from '../lib/content';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/#collections', label: 'Collections' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' }
];

type HeaderProps = {
  siteMetadata: SiteMetadata;
};

export default function Header({ siteMetadata }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/70 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group inline-flex items-center gap-3 text-lg font-semibold tracking-[0.3em] text-primary uppercase">
          <span className="inline-block h-10 w-10 rounded-full bg-primary/10"></span>
          ANJALI
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-zinc-700 transition hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href={`https://wa.me/${siteMetadata.whatsappNumber.replace(/\D/g, '')}`} className="hidden items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:shadow-lg md:inline-flex">
            WhatsApp
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-900 shadow-sm transition hover:border-primary/80 hover:text-primary md:hidden"
            aria-label="Toggle mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 7h16M4 12h16M4 17h16'} />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="border-t border-zinc-200 bg-white px-4 py-4 md:hidden">
          <nav className="space-y-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="block rounded-full px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-secondary/80 hover:text-primary" onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href={`https://wa.me/${siteMetadata.whatsappNumber.replace(/\D/g, '')}`} className="block rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white text-center transition hover:bg-[#7a1a36]">
              WhatsApp
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

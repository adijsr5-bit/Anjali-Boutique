import Link from 'next/link';
import type { SiteMetadata } from '../lib/content';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/#collections', label: 'Collections' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/refund-policy', label: 'Refund Policy' },
  { href: '/terms-conditions', label: 'Terms & Conditions' },
  { href: '/shipping-policy', label: 'Shipping Policy' },
  { href: '/faq', label: 'FAQ' }
];

const customerLinks = [
  { href: '/contact', label: 'Help & Support' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Track Your Order' },
  { href: '/contact', label: 'Partner Program' }
];

type FooterProps = {
  siteMetadata: SiteMetadata;
};

export default function Footer({ siteMetadata }: FooterProps) {
  return (
    <footer className="border-t border-zinc-200 bg-white px-4 py-16 text-zinc-700 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-4">
        <div className="space-y-4">
          <p className="text-xl font-semibold text-primary">Anjali Boutique</p>
          <p className="max-w-sm text-sm leading-7">Premium ethnic fashion for every woman. Designer sarees, party wear, plus-size collections and accessories crafted with love.</p>
          <p className="text-sm">{siteMetadata.contactEmail}</p>
          <p className="text-sm">{siteMetadata.contactPhone}</p>
        </div>
        <div>
          <p className="mb-4 font-semibold text-zinc-900">Quick Links</p>
          <ul className="space-y-3 text-sm">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-4 font-semibold text-zinc-900">Customer Info</p>
          <ul className="space-y-3 text-sm">
            {customerLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <p className="font-semibold text-zinc-900">Sign up for new stories and exclusive offers</p>
          <form className="flex flex-col gap-3 sm:flex-row">
            <input type="email" placeholder="Enter your email" className="w-full rounded-full border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-primary" />
            <button type="submit" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7a1a36]">
              Subscribe
            </button>
          </form>
          <div className="grid gap-3 text-sm text-zinc-600">
            <p>Business hours: Mon - Sat / 10:00 AM - 7:00 PM</p>
            <p>Secure and AdSense-friendly boutique website layout.</p>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-zinc-200 pt-6 text-center text-sm text-zinc-500">
        © 2026 Anjali Boutique. All rights reserved.
      </div>
    </footer>
  );
}

import Link from 'next/link';
import SectionHeader from '../../../components/SectionHeader';
import { siteMetadata } from '../../../lib/content';

/**
 * TEMPLATE LOCAL SEO PAGE
 * 
 * Copy this file and customize for each area:
 * /areas/sakchi/page.tsx
 * /areas/bistupur/page.tsx
 * /areas/mango/page.tsx
 * etc.
 * 
 * Change:
 * - areaName (Sakchi, Bistupur, etc.)
 * - areaDescription
 * - landmarks
 * - keywords
 * - metadata
 */

const areaName = 'Sakchi'; // CHANGE THIS FOR EACH AREA
const areaKeywords = [
  `Boutique in ${areaName}`,
  `Designer Saree Boutique in ${areaName}`,
  `Ladies Boutique in ${areaName}`,
  `Party Wear Boutique in ${areaName}`,
  `Ethnic Wear Boutique in ${areaName}`,
  `Women's Fashion Boutique in ${areaName}`
];

const landmarks = [
  'Sakchi Market',
  'Basant Talkies',
  'Court Road',
  'Tank Road',
  'Bengali Association'
];

export const metadata = {
  title: `Boutique in ${areaName} | Designer Sarees & Ethnic Wear | Anjali Boutique`,
  description: `Find the best designer saree boutique in ${areaName} with premium party wear, casual collections, and luxury ethnic fashion. WhatsApp for custom orders.`,
  keywords: areaKeywords.join(', ')
};

export default function LocalAreaPage() {
  return (
    <>
      <section className="bg-secondary px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Boutique in Jamshedpur</p>
            <h1 className="text-4xl font-semibold text-zinc-900 sm:text-5xl">Best Designer Saree Boutique in {areaName}</h1>
            <p className="max-w-3xl text-lg leading-8 text-zinc-600">
              Discover premium designer sarees, party wear, casual collections, and luxury ethnic fashion at Anjali Boutique in {areaName}. Premium boutique service with WhatsApp support and fast delivery across Jamshedpur.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-zinc-900">Premium Boutique Fashion in {areaName}</h2>
            <p className="leading-7 text-zinc-600">
              Anjali Boutique brings luxury ethnic wear and modern fashion directly to {areaName}. We specialize in designer sarees, bridal collections, party wear, and plus-size fashion tailored for women who value quality and elegance.
            </p>
            <p className="leading-7 text-zinc-600">
              Located strategically near {landmarks.slice(0, 2).join(' and ')}, we offer personalized boutique service with custom designs, styling advice, and seamless WhatsApp ordering for {areaName} residents.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[28px] border border-zinc-200 bg-secondary p-8 shadow-premium">
              <h3 className="text-xl font-semibold text-zinc-900">Our Collections</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-zinc-600">
                <li>✓ Designer Bridal Sarees</li>
                <li>✓ Party Wear Collections</li>
                <li>✓ Casual Daily Wear</li>
                <li>✓ Plus-Size Fashion</li>
                <li>✓ Premium Accessories</li>
                <li>✓ Custom Boutique Designs</li>
              </ul>
            </div>

            <div className="rounded-[28px] border border-zinc-200 bg-secondary p-8 shadow-premium">
              <h3 className="text-xl font-semibold text-zinc-900">Why Choose Us in {areaName}</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-zinc-600">
                <li>✓ Premium Quality Fabrics</li>
                <li>✓ Expert Styling Advice</li>
                <li>✓ Fast Delivery</li>
                <li>✓ WhatsApp Support</li>
                <li>✓ Custom Orders</li>
                <li>✓ Trusted Boutique Brand</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6 rounded-[28px] border border-zinc-200 bg-white p-8 shadow-premium">
            <h3 className="text-2xl font-semibold text-zinc-900">Landmarks Near Our {areaName} Boutique</h3>
            <p className="text-sm leading-7 text-zinc-600">
              We serve customers across {areaName} and nearby areas, including:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {landmarks.map((landmark) => (
                <div key={landmark} className="flex items-center gap-3 text-sm text-zinc-700">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">→</span>
                  {landmark}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 rounded-[28px] border border-zinc-200 bg-[#8B1E3F] p-8 text-white shadow-premium">
            <h3 className="text-2xl font-semibold">Order from {areaName} Today</h3>
            <p className="text-sm leading-7 text-[#F8EDEB]">
              Contact us via WhatsApp for exclusive designs, bulk orders, and custom styling for {areaName} events and celebrations.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={`https://wa.me/${siteMetadata.whatsappNumber.replace(/\D/g, '')}`} className="inline-flex rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1da851]">
                Chat on WhatsApp
              </a>
              <a href="/contact" className="inline-flex rounded-full border border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Contact Us
              </a>
            </div>
          </div>

          <div className="space-y-6 rounded-[28px] border border-zinc-200 bg-secondary p-8">
            <h3 className="text-2xl font-semibold text-zinc-900">Anjali Boutique Service in {areaName}</h3>
            <p className="text-sm leading-7 text-zinc-600">
              We deliver premium boutique fashion to {areaName} with:
            </p>
            <ul className="grid gap-4 sm:grid-cols-2 text-sm leading-7 text-zinc-600">
              <li>• Same-day or next-day delivery</li>
              <li>• Custom saree design service</li>
              <li>• Virtual styling consultations</li>
              <li>• WhatsApp ordering and support</li>
              <li>• Secure payment options</li>
              <li>• Easy returns and exchanges</li>
            </ul>
          </div>

          <div className="rounded-[28px] border border-zinc-200 bg-white p-8 shadow-premium">
            <h3 className="text-xl font-semibold text-zinc-900 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-zinc-900">Do you deliver to {areaName}?</h4>
                <p className="mt-2 text-zinc-600">Yes, we deliver quickly to all areas of {areaName} and nearby neighborhoods. WhatsApp your address for a delivery estimate.</p>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold text-zinc-900">Can I order custom sarees in {areaName}?</h4>
                <p className="mt-2 text-zinc-600">Absolutely! Our boutique team specializes in custom designs for {areaName} events, weddings, and celebrations. Contact us on WhatsApp.</p>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold text-zinc-900">Do you have a physical location in {areaName}?</h4>
                <p className="mt-2 text-zinc-600">Contact us to inquire about visiting our showroom or scheduling a virtual consultation tailored for {areaName} customers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

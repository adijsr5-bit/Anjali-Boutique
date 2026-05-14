import type { Metadata } from 'next';
import Script from 'next/script';
import { Playfair_Display, Poppins } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import AdsenseScript from '../components/AdsenseScript';
import LoadingScreen from '../components/LoadingScreen';
import { getContentData } from '../lib/data';
import { siteMetadata as defaultSiteMetadata } from '../lib/content';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-headings', display: 'swap' });
const poppins = Poppins({ subsets: ['latin'], weight: '400', variable: '--font-body', display: 'swap' });

export const metadata: Metadata = {
  title: defaultSiteMetadata.title,
  description: defaultSiteMetadata.description,
  metadataBase: new URL(defaultSiteMetadata.siteUrl),
  alternates: {
    canonical: defaultSiteMetadata.siteUrl
  },
  openGraph: {
    title: defaultSiteMetadata.title,
    description: defaultSiteMetadata.description,
    url: defaultSiteMetadata.siteUrl,
    siteName: 'Anjali Boutique',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultSiteMetadata.title,
    description: defaultSiteMetadata.description
  },
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Use static data initially to avoid blocking render
  const contentData = { siteMetadata: defaultSiteMetadata };

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Anjali Boutique',
        url: contentData.siteMetadata.siteUrl,
        logo: `${contentData.siteMetadata.siteUrl}/logo.png`,
        contactPoint: [{ '@type': 'ContactPoint', telephone: contentData.siteMetadata.contactPhone, contactType: 'customer service', areaServed: 'IN' }],
        sameAs: ['https://instagram.com']
      },
      {
        '@type': 'LocalBusiness',
        name: 'Anjali Boutique',
        image: `${contentData.siteMetadata.siteUrl}/images/hero.jpg`,
        '@id': `${contentData.siteMetadata.siteUrl}/#business`,
        url: contentData.siteMetadata.siteUrl,
        telephone: contentData.siteMetadata.contactPhone,
        email: contentData.siteMetadata.contactEmail,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Premium Boutique Address',
          addressLocality: 'India',
          addressCountry: 'IN'
        },
        openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '10:00', closes: '19:00' }]
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: contentData.siteMetadata.siteUrl }
        ]
      }
    ]
  };

  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <body className="bg-background text-text antialiased">
        <LoadingScreen />
        <Header siteMetadata={contentData.siteMetadata} />
        <main>{children}</main>
        <Footer siteMetadata={contentData.siteMetadata} />
        <WhatsAppButton whatsappNumber={contentData.siteMetadata.whatsappNumber} />
        <AdsenseScript />
        <Script id="structured-schema" type="application/ld+json">
          {JSON.stringify(structuredData)}
        </Script>
      </body>
    </html>
  );
}

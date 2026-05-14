import ContactPageClient from './ContactPageClient';
import { getContentData } from '../../lib/data';

export const metadata = {
  title: 'Contact Anjali Boutique | Boutique Inquiries & Support',
  description: 'Contact Anjali Boutique for orders, custom designs, WhatsApp inquiries, and premium boutique support.'
};

export default async function ContactPage() {
  const content = await getContentData();
  const { siteMetadata } = content;

  return <ContactPageClient contactEmail={siteMetadata.contactEmail} contactPhone={siteMetadata.contactPhone} whatsappNumber={siteMetadata.whatsappNumber} />;
}

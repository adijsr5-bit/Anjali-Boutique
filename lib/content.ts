export type Post = {
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string;
  publishedAt: string;
  image: string;
  alt: string;
  keywords: string[];
};

export type Collection = {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export type SiteMetadata = {
  title: string;
  description: string;
  siteUrl: string;
  contactPhone: string;
  contactEmail: string;
  whatsappNumber: string;
  heroImage?: string;
  heroAlt?: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type Testimonial = {
  rating: number;
  quote: string;
  author: string;
};

export type ContentData = {
  siteMetadata: SiteMetadata;
  collections: Collection[];
  testimonials: Testimonial[];
  faqItems: FAQItem[];
  blogPosts: Post[];
  serviceCards: string[];
};

export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  receivedAt: string;
  read?: boolean;
};

export const siteMetadata = {
  title: 'Anjali Boutique | Designer Sarees, Party Wear & Ethnic Fashion',
  description:
    'Explore elegant designer sarees, party wear, casual collections, plus-size fashion, and accessories at Anjali Boutique. Premium boutique fashion crafted for every occasion.',
  siteUrl: 'https://anjaliboutique.in',
  contactPhone: '+91 98765 43210',
  contactEmail: 'hello@anjaliboutique.in',
  whatsappNumber: '+919876543210',
  heroImage:
    'https://images.unsplash.com/photo-1495121605193-b116b5b9c5d9?auto=format&fit=crop&w=1200&q=80',
  heroAlt: 'Elegant designer saree collection hero image'
};

export const collections = [
  {
    id: 'designer-sarees',
    title: 'Designer Sarees',
    description: 'Elegant sarees designed for weddings, festivals, parties, and traditional occasions.',
    image: 'https://images.unsplash.com/photo-1495121605193-b116b5b9c5d9?auto=format&fit=crop&w=1000&q=80',
    alt: 'Designer saree collection by Anjali Boutique'
  },
  {
    id: 'casual-wear',
    title: 'Casual Wear',
    description: 'Comfortable daily wear with modern styling and premium fabric quality.',
    image: 'https://images.unsplash.com/photo-1520975911200-58fb9e158b4f?auto=format&fit=crop&w=1000&q=80',
    alt: 'Casual boutique wear collection by Anjali Boutique'
  },
  {
    id: 'party-wear',
    title: 'Party Wear',
    description: 'Stylish outfits crafted for celebrations, receptions, birthdays, and special events.',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80',
    alt: 'Party wear fashion collection for women'
  },
  {
    id: 'plus-size-collection',
    title: 'Plus Size Collection',
    description: 'Fashion designed for every body type with comfort, elegance, and confidence.',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80',
    alt: 'Plus size ethnic wear collection by Anjali Boutique'
  },
  {
    id: 'accessories',
    title: 'Accessories',
    description: 'Matching accessories that complete your perfect ethnic and modern look.',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80',
    alt: 'Boutique accessories for ethnic wear'
  }
];

export const testimonials = [
  {
    rating: 5,
    quote: 'Amazing collection and excellent fitting. The saree quality exceeded my expectations.',
    author: 'Riya Sharma'
  },
  {
    rating: 5,
    quote: 'Professional service and beautiful designs. Highly recommended boutique.',
    author: 'Nisha Patel'
  },
  {
    rating: 5,
    quote: 'The plus-size collection was elegant and comfortable. Very happy with my order.',
    author: 'Anita Verma'
  },
  {
    rating: 5,
    quote: 'Lovely fabrics, timely delivery, and excellent customer support. A premium experience.',
    author: 'Sana Khan'
  },
  {
    rating: 5,
    quote: 'Beautiful party wear outfits with detailed styling. My guests loved the look.',
    author: 'Priya Mehta'
  }
];

export const faqItems = [
  {
    question: 'Do you offer custom boutique designs?',
    answer:
      'Yes, we provide customized boutique collections based on customer preferences for bespoke events and celebrations.'
  },
  {
    question: 'Do you deliver across India?',
    answer: 'Yes, we offer delivery services across multiple cities and states in India for a seamless boutique experience.'
  },
  {
    question: 'Can I order through WhatsApp?',
    answer: 'Yes, customers can contact us directly through WhatsApp for inquiries, custom orders, and quick support.'
  },
  {
    question: 'Do you have plus-size collections?',
    answer: 'Yes, we offer stylish and comfortable plus-size fashion collections designed to celebrate every body type.'
  }
];

export const blogPosts: Post[] = [
  {
    title: 'Best Saree Designs for Weddings',
    slug: 'best-saree-designs-for-weddings',
    category: 'Saree Styling',
    summary:
      'Discover premium wedding saree trends, draping tips, and fabric choices to create a timeless bridal ensemble.',
    content:
      '<p>Explore bridal saree patterns, premium textile recommendations, and styling tips to look elegant at every wedding.</p>',
    publishedAt: '2026-04-09',
    image: 'https://images.unsplash.com/photo-1520975911200-58fb9e158b4f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Beautiful wedding saree design inspiration',
    keywords: ['wedding sarees', 'bridal saree designs', 'designer saree boutique']
  },
  {
    title: 'Trending Boutique Fashion in 2026',
    slug: 'trending-boutique-fashion-2026',
    category: 'Fashion Trends',
    summary:
      'Stay ahead with the latest boutique fashion trends for 2026, from luxury ethnic wear to contemporary party outfits.',
    content:
      '<p>Learn about the newest color palettes, fabric trends, and styling cues for boutique fashion in 2026.</p>',
    publishedAt: '2026-03-18',
    image: 'https://images.unsplash.com/photo-1495121605193-b116b5b9c5d9?auto=format&fit=crop&w=1200&q=80',
    alt: 'Luxury boutique fashion trends for 2026',
    keywords: ['boutique fashion', 'fashion trends 2026', 'premium ethnic wear']
  },
  {
    title: 'How to Style Party Wear Sarees',
    slug: 'how-to-style-party-wear-sarees',
    category: 'Style Guide',
    summary:
      'Master party-ready saree styling with statement jewelry, blouse pairing, and modern drape techniques.',
    content:
      '<p>Get styling ideas for party sarees, accessories, and perfect makeup to create a refined festive look.</p>',
    publishedAt: '2026-02-28',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    alt: 'Party wear saree style guide',
    keywords: ['party wear saree', 'saree styling', 'ethnic fashion']
  },
  {
    title: 'Best Colors for Festive Outfits',
    slug: 'best-colors-for-festive-outfits',
    category: 'Color Guide',
    summary:
      'Choose festive colors that enhance your look and match the mood of every celebration.',
    content:
      '<p>Discover the most flattering festive shades for sarees, lehengas, and contemporary ethnic outfits.</p>',
    publishedAt: '2026-01-10',
    image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=80',
    alt: 'Festive outfit color palette',
    keywords: ['festive colors', 'ethnic outfit colors', 'boutique fashion colors']
  },
  {
    title: 'Fashion Tips for Plus Size Women',
    slug: 'fashion-tips-for-plus-size-women',
    category: 'Body Positive',
    summary:
      'Find flattering plus size fashion ideas, fabric guidance, and confidence-boosting styling tips.',
    content:
      '<p>Learn how to choose cuts, fabrics, and accessories that celebrate shape and comfort without compromising elegance.</p>',
    publishedAt: '2026-05-01',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Plus size boutique fashion tips',
    keywords: ['plus size fashion', 'plus size boutique', 'body positive ethnic wear']
  }
];

export const serviceCards = [
  'Premium Quality Fabrics',
  'Affordable Luxury Fashion',
  'Trendy & Traditional Collections',
  'Customer Satisfaction Focused',
  'Smooth Shopping Experience',
  'Fast Customer Support',
  'Mobile Friendly Website',
  'Secure Checkout System'
];

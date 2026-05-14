# Anjali Boutique — Complete Website Development Guide

## Project Overview
Anjali Boutique is a premium, SEO-optimized Next.js 14 ecommerce website designed for luxury ethnic fashion boutiques in Jamshedpur. The site is built for Google ranking, mobile-first responsiveness, AdSense compatibility, and high-performance delivery.

---

## 1. Technology Stack
- **Framework:** Next.js 14.2.5 (App Router)
- **Styling:** Tailwind CSS 3.4.5
- **Typography:** Playfair Display (headings) + Poppins (body)
- **Animation:** Framer Motion 11.0
- **Language:** TypeScript 5.5.4
- **Deployment:** Vercel (recommended)
- **CDN:** Cloudflare (recommended)

---

## 2. Project Structure
```
boutique/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Global layout with schema markup
│   ├── page.tsx                 # Homepage with all sections
│   ├── api/contact/route.ts     # Contact form API endpoint
│   ├── sitemap.xml.ts           # Dynamic XML sitemap
│   ├── about/page.tsx           # About us page
│   ├── blog/page.tsx            # Blog index
│   ├── blog/[slug]/page.tsx     # Dynamic blog posts
│   ├── collections/page.tsx     # Collections showcase
│   ├── contact/page.tsx         # Contact form page
│   ├── faq/page.tsx             # FAQ page
│   ├── admin/page.tsx           # Admin dashboard stub
│   ├── privacy-policy/page.tsx  # Privacy Policy (AdSense required)
│   ├── terms-conditions/page.tsx # Terms & Conditions
│   ├── refund-policy/page.tsx   # Refund Policy
│   ├── shipping-policy/page.tsx # Shipping Policy
│   ├── disclaimer/page.tsx      # Disclaimer page
│   ├── not-found.tsx            # 404 page
│   └── globals.css              # Global styles
├── components/                   # Reusable React components
│   ├── Header.tsx               # Navigation header with mobile menu
│   ├── Footer.tsx               # Footer with links
│   ├── WhatsAppButton.tsx       # Sticky WhatsApp CTA
│   ├── CollectionCard.tsx       # Collection showcase cards
│   ├── BlogCard.tsx             # Blog post preview cards
│   ├── TestimonialCard.tsx      # Customer testimonial cards
│   └── SectionHeader.tsx        # Section title component
├── lib/
│   └── content.ts               # Centralized content and metadata
├── public/
│   ├── ads.txt                  # Google AdSense publisher ID
│   ├── robots.txt               # SEO robots instructions
│   └── images/                  # Image assets folder
├── next.config.mjs              # Next.js configuration
├── tailwind.config.ts           # Tailwind color customization
├── tsconfig.json                # TypeScript configuration
├── postcss.config.js            # PostCSS pipeline
└── package.json                 # Dependencies and scripts
```

---

## 3. Color Palette (Premium Boutique Theme)
- **Primary:** #8B1E3F (Luxury Wine) — CTAs, accents, highlights
- **Secondary:** #F8EDEB (Soft Cream) — Light backgrounds, hero sections
- **Accent:** #D4A373 (Elegant Gold) — Decorative elements, hover states
- **Text:** #1E1E1E (Dark Gray) — Body text, readability
- **Background:** #FFFFFF (Pure White) — Main background

---

## 4. Core Pages & SEO Features

### Homepage (/)
- Premium hero section with CTAs
- Collections grid with hover effects
- About summary
- Testimonials carousel
- Instagram feed integration
- Blog preview
- FAQ section
- Contact CTA section
- Rich schema markup (Organization, LocalBusiness, BreadcrumbList)

### Collections Page (/collections)
- All 5 main collection categories
- High-quality images
- SEO-optimized alt tags
- Call-to-action buttons

### Blog (/blog & /blog/[slug])
- Dynamic blog posts from content.ts
- SEO-friendly URLs
- Featured images
- Category and date information
- Schema markup for BlogPosting
- Fully indexable by Google

### Policy Pages (Required for AdSense)
- Privacy Policy
- Terms & Conditions
- Refund Policy
- Shipping Policy
- Disclaimer

### Contact, About, FAQ Pages
- Contact form with API endpoint
- Location and WhatsApp information
- Google Business Profile-ready content

---

## 5. Mobile-First Design Features
✅ Responsive breakpoints (mobile, tablet, desktop)
✅ Touch-friendly button targets (48px minimum)
✅ Sticky WhatsApp button (bottom-right)
✅ Mobile hamburger navigation
✅ Smooth scrolling
✅ Optimized images (WebP with fallbacks)
✅ Lazy loading for images
✅ Fast loading on 4G networks

---

## 6. SEO & Performance

### SEO Optimizations
- ✅ Single H1 per page
- ✅ Meta titles and descriptions
- ✅ Canonical URLs
- ✅ Open Graph & Twitter cards
- ✅ Structured JSON-LD schema (Organization, LocalBusiness, BreadcrumbList, FAQPage, BlogPosting)
- ✅ Internal linking strategy
- ✅ Semantic HTML5
- ✅ Image ALT tags for all images
- ✅ Robots.txt configuration
- ✅ Dynamic sitemap.xml generation
- ✅ SEO-friendly URLs
- ✅ Breadcrumb navigation

### Recommended Page Speed Targets
- **Mobile:** 85+ LCP (Largest Contentful Paint)
- **Desktop:** 90+ on PageSpeed Insights
- **Core Web Vitals:** All green
- **Image Optimization:** WebP format with lazy loading
- **Font Loading:** Optimized with swap strategy
- **CSS/JS:** Minified and code-split

---

## 7. AdSense Compliance
The website includes all required pages for AdSense approval:
- ✅ Privacy Policy (/privacy-policy)
- ✅ Terms & Conditions (/terms-conditions)
- ✅ Contact page with real info (/contact)
- ✅ About page (/about)
- ✅ Disclaimer page (/disclaimer)
- ✅ Refund & Shipping policies
- ✅ SSL/HTTPS ready
- ✅ Original content (no copied material)
- ✅ Proper contact information
- ✅ ads.txt file with placeholder publisher ID

---

## 8. Setup & Installation

### Prerequisites
- Node.js 18+ (v22.19.0 tested)
- npm or yarn package manager
- Git for version control

### Installation Steps
```bash
# 1. Navigate to project folder
cd boutique

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Run development server
npm run dev

# 4. Build for production
npm run build

# 5. Start production server
npm start
```

### Development Server
The development server runs on `http://localhost:3000` with hot reload enabled.

---

## 9. Content Management

All dynamic content (collections, blog posts, testimonials, FAQs) is stored in `lib/content.ts` for easy updates:

```typescript
// Add new blog post
export const blogPosts: Post[] = [
  {
    title: 'Your Title',
    slug: 'url-slug',
    category: 'Category Name',
    summary: 'Short summary',
    content: '<p>Full HTML content</p>',
    publishedAt: '2026-05-12',
    image: 'https://...',
    alt: 'Image description',
    keywords: ['keyword1', 'keyword2']
  }
];

// Update site metadata
export const siteMetadata = {
  title: 'Your Page Title',
  description: 'Your meta description',
  siteUrl: 'https://anjaliboutique.in',
  contactPhone: '+91 XXXXX XXXXX',
  contactEmail: 'hello@anjaliboutique.in',
  whatsappNumber: '+919XXXXXXXXXX'
};
```

---

## 10. Deployment on Vercel (Recommended)

### Steps:
1. **Connect Git repository** to Vercel
2. **Set environment variables** (if any)
3. **Deploy** — Vercel auto-deploys on every git push
4. **Configure domain** — Point your domain to Vercel nameservers
5. **Enable HTTPS** — Automatic SSL certificate
6. **Optimize images** — Vercel's Image Optimization is built-in

### Vercel Benefits
- ✅ Automatic zero-config deployments
- ✅ Global CDN for fast delivery
- ✅ Edge Functions for API routes
- ✅ Built-in analytics and monitoring
- ✅ Preview deployments for PRs

---

## 11. Google Integration Checklist

- [ ] **Google Analytics 4** — Track user behavior and conversions
  ```
  Add GA4 tracking ID to analytics script in layout.tsx
  ```
- [ ] **Google Search Console** — Monitor indexing and keywords
  - Verify site ownership
  - Submit sitemap: `https://anjaliboutique.in/sitemap.xml`
  - Monitor search performance
- [ ] **Google Business Profile** — Local business visibility
  - Business name: `Anjali Boutique Jamshedpur`
  - Address, phone, hours
  - Service areas: Sakchi, Bistupur, Mango, etc.
  - Photos and updates
- [ ] **Google Ads (optional)** — Run paid campaigns for faster ranking
- [ ] **Google Merchant Center (optional)** — If selling products

---

## 12. Local SEO Strategy for Jamshedpur

The website supports hyperlocal SEO targeting all major areas in Jamshedpur:

### Main Areas (create dedicated landing pages)
- Boutique in Sakchi
- Boutique in Bistupur
- Boutique in Kadma
- Boutique in Sonari
- Boutique in Mango
- Boutique in Telco
- Boutique in Golmuri
- Boutique in Adityapur
- (30+ additional neighborhood pages)

### Implementation:
1. Create area-specific pages under `/areas/[area-name]/`
2. Include local landmarks and neighborhoods in content
3. Use schema markup with `areaServed` field
4. Add local internal linking in footer and navigation
5. Optimize GBP for service areas

---

## 13. Performance & Optimization Checklist

### Image Optimization
- ✅ WebP format with JPEG fallback
- ✅ Responsive images (srcset)
- ✅ Lazy loading (loading="lazy")
- ✅ Image compression (TinyPNG/ImageOptim)
- ✅ Proper aspect ratios

### Code Optimization
- ✅ Minified CSS/JS (automatic with Next.js)
- ✅ Code splitting (automatic with App Router)
- ✅ Unused CSS removal (Tailwind purging)
- ✅ Client-side hydration optimization
- ✅ Font subsetting (only required glyphs)

### CDN & Caching
- ✅ Vercel global CDN
- ✅ Cloudflare optional for additional performance
- ✅ Cache-Control headers
- ✅ Static generation where possible
- ✅ ISR (Incremental Static Regeneration) for blog

---

## 14. Security & Trust Signals

- ✅ HTTPS/SSL enabled (automatic on Vercel)
- ✅ Form validation and spam protection
- ✅ reCAPTCHA ready (add to contact form if needed)
- ✅ XSS protection via Next.js sanitization
- ✅ Secure API endpoints
- ✅ Real contact information visible
- ✅ Privacy policy and terms clearly displayed
- ✅ WhatsApp official integration

---

## 15. Scaling & Future Features

### eCommerce Ready (Easy to add)
- Product pages with images
- Shopping cart functionality
- Wishlist feature
- Razorpay payment integration
- COD (Cash on Delivery) support
- Order tracking
- Customer login/accounts
- Inventory management

### Admin Panel (Can be expanded)
- Blog management interface
- Collection/product uploads
- Inquiry management dashboard
- Analytics dashboard
- SEO management interface
- Subscriber list management

### Integration Options
- **CMS:** Contentful, Sanity, or Strapi
- **Database:** Firebase, Supabase, or MongoDB
- **Email:** SendGrid, Mailgun
- **Payments:** Razorpay, Stripe, PayPal
- **Reviews:** Trustpilot, Google Reviews API
- **Social:** Instagram API for live feed

---

## 16. Before Launch Checklist

### SEO & Technical
- [ ] Google Analytics connected
- [ ] Google Search Console verified
- [ ] Sitemap submitted
- [ ] robots.txt finalized
- [ ] Schema markup validated
- [ ] Core Web Vitals green
- [ ] Mobile responsiveness tested
- [ ] No broken links

### Content & Policies
- [ ] All policy pages completed
- [ ] Contact form tested
- [ ] Blog posts published (minimum 5)
- [ ] Product images optimized
- [ ] Meta titles and descriptions set
- [ ] FAQ content accurate

### AdSense & Compliance
- [ ] ads.txt configured with real publisher ID
- [ ] Privacy policy compliant with GDPR
- [ ] No prohibited content
- [ ] Original, quality content
- [ ] No plagiarism or copied material
- [ ] Real contact information

### Marketing & Links
- [ ] Google Business Profile set up
- [ ] Social media linked
- [ ] Email marketing setup
- [ ] WhatsApp integration working
- [ ] Backlink strategy planned

---

## 17. Maintenance & Updates

### Regular Tasks
- **Weekly:** Monitor Google Analytics and Search Console
- **Monthly:** Update blog with new content
- **Monthly:** Check Core Web Vitals and performance metrics
- **Quarterly:** Review and update product images
- **Quarterly:** Analyze keyword rankings and adjust SEO strategy

### Monitoring Tools
- Google Analytics 4
- Google Search Console
- Vercel Analytics
- PageSpeed Insights
- Lighthouse (in DevTools)
- GTmetrix for detailed analysis

---

## 18. Support & Resources

### Documentation
- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/
- Vercel: https://vercel.com/docs

### SEO Best Practices
- Google SEO Starter Guide: https://developers.google.com/search/docs
- Schema.org Documentation: https://schema.org
- Core Web Vitals Guide: https://web.dev/vitals/

---

## 19. Final Notes

This website is built on industry best practices for boutique fashion ecommerce:
- **Premium UX:** Elegant, minimal design that converts
- **SEO-First:** Every page optimized for search visibility
- **Mobile-Ready:** 80%+ traffic expected from mobile
- **Fast Loading:** Optimized for 4G and slow networks
- **Scalable:** Easy to add ecommerce, blog, and features
- **AdSense-Ready:** All required pages and policies included

**Domain Recommendation:** anjaliboutique.in (or .com for broader reach)

**Next Steps:**
1. ✅ Set up domain and point to Vercel
2. ✅ Connect Google Analytics and Search Console
3. ✅ Create Google Business Profile
4. ✅ Submit sitemap to GSC
5. ✅ Create initial local SEO pages for key areas
6. ✅ Start blog publishing (1-2 posts per week)
7. ✅ Build initial backlinks from local directories
8. ✅ Monitor rankings and optimize based on data

---

**Project Status:** ✅ Complete and ready for deployment
**Last Updated:** May 12, 2026

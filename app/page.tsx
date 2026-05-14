'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ContentData } from '../lib/content';
import { blogPosts as defaultBlogPosts, collections as defaultCollections, faqItems as defaultFaqItems, serviceCards as defaultServiceCards, siteMetadata as defaultSiteMetadata, testimonials as defaultTestimonials } from '../lib/content';
import CollectionCard from '../components/CollectionCard';
import BlogCard from '../components/BlogCard';
import TestimonialCard from '../components/TestimonialCard';
import SectionHeader from '../components/SectionHeader';

const instagramImages = [
  'https://images.unsplash.com/photo-1520975911200-58fb9e158b4f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=600&q=80'
];

export default function HomePage() {
  const [content, setContent] = useState<ContentData>({
    siteMetadata: defaultSiteMetadata,
    collections: defaultCollections,
    testimonials: defaultTestimonials,
    faqItems: defaultFaqItems,
    blogPosts: defaultBlogPosts,
    serviceCards: defaultServiceCards
  });

  useEffect(() => {
    let active = true;

    async function fetchContent() {
      try {
        const response = await fetch('/api/content', { cache: 'no-store' });
        if (!response.ok) return;
        const data = await response.json();
        if (active) setContent(data);
      } catch (error) {
        console.error('Failed to load live content:', error);
      }
    }

    fetchContent();
    const interval = setInterval(fetchContent, 15000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const { siteMetadata, collections, testimonials, faqItems, blogPosts, serviceCards } = content;

  return (
    <div className="overflow-hidden">
      <section className="hero-gradient relative overflow-hidden bg-secondary px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex rounded-full bg-[#8B1E3F]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary sm:text-sm sm:tracking-[0.3em]">
              Luxury Ethnic Fashion
            </p>
            <h1 className="heading-shadow text-3xl font-semibold tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
              Elegant Fashion Designed for Every Woman
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-zinc-700 sm:text-lg">
              Discover premium sarees, party wear, casual collections, and boutique fashion crafted with elegance and comfort.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="#collections" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7a1a36]">
                Explore Collection
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-900 hover:text-white">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="relative basis-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl sm:rounded-[36px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(139,30,63,0.18),_transparent_35%)]" />
            <Image
              src={siteMetadata.heroImage || defaultSiteMetadata.heroImage}
              alt={siteMetadata.heroAlt || defaultSiteMetadata.heroAlt || 'Elegant designer saree collection hero image'}
              width={1200}
              height={1200}
              sizes="(max-width: 768px) 100vw, 1200px"
              quality={70}
              className="h-[320px] w-full object-cover sm:h-[420px]"
              priority={true}
              loading="eager"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
            />
          </div>
        </div>
      </section>

      <section id="about" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title="About Anjali Boutique" description="From a passionate dream to a trusted fashion destination." />
          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6 text-zinc-600">
              <p>From a passionate dream to a trusted fashion destination, Anjali Boutique brings elegant ethnic wear and modern fashion together for women who value style, comfort, and confidence.</p>
              <p>Inspired by timeless Indian fashion, we offer carefully curated collections including designer sarees, party wear, casual outfits, plus-size fashion, and accessories crafted to suit every occasion.</p>
              <p>Our goal is simple: deliver premium fashion with personal attention, quality fabrics, and unique designs that make every customer feel confident and beautiful.</p>
              <p>At Anjali Boutique, fashion is not just clothing — it is identity, confidence, and expression.</p>
            </div>
            <div className="relative overflow-hidden rounded-[32px] bg-secondary p-8 shadow-premium">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,163,115,0.2),_transparent_20%)]" />
              <div className="relative rounded-[32px] border border-white/70 bg-white/90 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-primary">Brand Promise</p>
                <h2 className="mt-4 text-3xl font-semibold text-zinc-900">Crafted for trust, quality, and boutique luxury.</h2>
                <p className="mt-5 text-sm leading-7 text-zinc-600">Every design is handpicked to deliver a seamless luxury experience, whether you are shopping for a wedding, a festival, or everyday elegance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="collections" className="bg-[#fff7f7] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title="Collections" description="Boutique categories curated for every occasion." />
          <div className="mt-12 grid gap-8 xl:grid-cols-3">
            {collections.map((item) => (
              <CollectionCard key={item.id || item.title} title={item.title} description={item.description} image={item.image} alt={item.alt} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title="Why Choose Us" description="Premium benefits that make Anjali Boutique a trusted choice." />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {serviceCards.map((service) => (
              <div key={service} className="rounded-[28px] border border-zinc-200 bg-secondary/80 p-6 text-sm text-zinc-700 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <p className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-sm">✓</p>
                <p className="font-semibold text-zinc-900">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#fff1f1] via-white to-[#fff9f6] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title="Testimonials" description="What our customers are saying." />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {testimonials.map((item) => (
              <TestimonialCard key={item.author} quote={item.quote} author={item.author} rating={item.rating} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title="Instagram" description="Real boutique style from our Instagram feed." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {instagramImages.map((src, index) => (
              <a key={index} href="https://instagram.com" target="_blank" rel="noreferrer" className="group overflow-hidden rounded-[28px] border border-zinc-200 bg-zinc-100 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={src}
                    alt="Anjali Boutique Instagram photo"
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    quality={60}
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="bg-[#F8EDEB] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title="Blog" description="Fashion guides designed for search and discovery." />
          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600">Stay updated with styling advice, festival trends, plus-size fashion ideas, and boutique news tailored for women who value premium ethnic wear.</p>
          <div className="mt-12 grid gap-6 xl:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <BlogCard key={post.slug} title={post.title} summary={post.summary} category={post.category} publishedAt={post.publishedAt} slug={post.slug} image={post.image} alt={post.alt} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/blog" className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#7a1a36]">
              Visit Blog
            </Link>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title="Frequently Asked Questions" description="Answers to the most common boutique inquiries." />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-[28px] border border-zinc-200 bg-secondary/70 p-6">
                <h3 className="text-lg font-semibold text-zinc-900">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#8B1E3F] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-[#F8EDEB]">Need help with your order?</p>
              <h2 className="text-4xl font-semibold tracking-tight">Contact Anjali Boutique for custom styling and order support.</h2>
              <p className="max-w-xl text-sm leading-7 text-[#F8EDEB]">Reach out via phone, email, or WhatsApp. Our team is ready to guide you through your boutique shopping experience.</p>
              <div className="space-y-3 text-sm text-[#F8EDEB]">
                <p>Phone: {siteMetadata.contactPhone}</p>
                <p>Email: {siteMetadata.contactEmail}</p>
                <p>WhatsApp support available 10:00 AM - 7:00 PM.</p>
              </div>
            </div>
            <div className="rounded-[36px] bg-white/10 p-8 backdrop-blur-xl">
              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-white">Name</label>
                  <input type="text" placeholder="Your name" className="mt-2 w-full rounded-full border border-white/30 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/60" />
                </div>
                <div>
                  <label className="text-sm font-medium text-white">Email</label>
                  <input type="email" placeholder="name@example.com" className="mt-2 w-full rounded-full border border-white/30 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/60" />
                </div>
                <div>
                  <label className="text-sm font-medium text-white">Message</label>
                  <textarea placeholder="Tell us about your boutique needs" rows={4} className="mt-2 w-full rounded-[24px] border border-white/30 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/60" />
                </div>
                <button type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-[#F8EDEB] px-6 py-3 text-sm font-semibold text-primary transition hover:bg-white/90">
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

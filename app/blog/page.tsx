import Link from 'next/link';
import BlogCard from '../../components/BlogCard';
import { getContentData } from '../../lib/data';

export const metadata = {
  title: 'Blog | Anjali Boutique',
  description: 'Read the latest style guides, saree trends, and boutique fashion tips from Anjali Boutique.'
};

export default async function BlogPage() {
  const content = await getContentData();

  return (
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-primary sm:text-sm sm:tracking-[0.3em]">Blog</p>
          <h1 className="text-3xl font-semibold text-zinc-900 sm:text-5xl">Fashion advice and boutique inspiration.</h1>
          <p className="mx-auto max-w-3xl text-sm leading-7 text-zinc-600">Explore articles on designer sarees, party wear, plus-size styling, festive colors, and boutique trends designed for SEO and discovery.</p>
        </div>
        <div className="mt-12 grid gap-6 xl:grid-cols-3">
          {content.blogPosts.map((post) => (
            <BlogCard key={post.slug} title={post.title} summary={post.summary} category={post.category} publishedAt={post.publishedAt} slug={post.slug} image={post.image} alt={post.alt} />
          ))}
        </div>
      </div>
    </section>
  );
}

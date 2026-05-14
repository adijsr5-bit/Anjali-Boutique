import Image from 'next/image';
import type { Metadata } from 'next';
import { getContentData } from '../../../lib/data';

type Props = {
  params: {
    slug: string;
  };
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const content = await getContentData();
  const post = content.blogPosts.find((item) => item.slug === params.slug);
  if (!post) return { title: 'Blog post not found | Anjali Boutique' };
  return {
    title: `${post.title} | Anjali Boutique`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [post.image]
    }
  };
}

export default async function PostPage({ params }: Props) {
  const content = await getContentData();
  const post = content.blogPosts.find((item) => item.slug === params.slug);

  if (!post) return <p className="p-8 text-center text-zinc-700">Post not found.</p>;

  return (
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-primary sm:text-sm sm:tracking-[0.3em]">{post.category}</p>
          <h1 className="text-3xl font-semibold text-zinc-900 sm:text-5xl">{post.title}</h1>
          <p className="text-sm text-zinc-500">Published on {post.publishedAt}</p>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-zinc-200 shadow-premium sm:rounded-[32px]">
          <Image src={post.image} alt={post.alt} width={1200} height={640} className="h-64 w-full object-cover sm:h-[420px]" />
        </div>
        <div className="prose prose-zinc max-w-none text-zinc-700">
          <p>{post.summary}</p>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </section>
  );
}

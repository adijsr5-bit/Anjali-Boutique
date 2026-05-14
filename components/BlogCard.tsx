import Image from 'next/image';
import Link from 'next/link';

type BlogCardProps = {
  title: string;
  summary: string;
  category: string;
  publishedAt: string;
  slug: string;
  image?: string;
  alt?: string;
};

export default function BlogCard({ title, summary, category, publishedAt, slug, image, alt }: BlogCardProps) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-premium transition hover:-translate-y-1 hover:shadow-2xl">
      {image && (
        <div className="relative h-52 overflow-hidden bg-zinc-100">
          <Image src={image} alt={alt || title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
      )}
      <div className="p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">{category}</p>
        <h3 className="mt-3 text-lg font-semibold text-zinc-900 sm:text-xl">{title}</h3>
        <p className="mt-4 text-sm leading-7 text-zinc-600">{summary}</p>
        <div className="mt-6 flex flex-col gap-3 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <span>{publishedAt}</span>
          <Link href={`/blog/${slug}`} className="font-semibold text-primary transition hover:text-[#7a1a36]">
            Read more
          </Link>
        </div>
      </div>
    </article>
  );
}

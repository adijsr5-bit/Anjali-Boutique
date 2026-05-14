import Image from 'next/image';

type CollectionCardProps = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

export default function CollectionCard({ title, description, image, alt }: CollectionCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-premium transition hover:-translate-y-1 hover:shadow-2xl sm:rounded-[28px]">
      <div className="relative h-64 overflow-hidden sm:h-72">
        <Image src={image} alt={alt} fill className="object-cover transition duration-700 group-hover:scale-105" priority sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="space-y-3 p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-zinc-900 sm:text-xl">{title}</h3>
        <p className="text-sm leading-7 text-zinc-600">{description}</p>
        <a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-[#7a1a36]">
          View Collection
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}

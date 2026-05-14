type TestimonialCardProps = {
  quote: string;
  author: string;
  rating: number;
};

export default function TestimonialCard({ quote, author, rating }: TestimonialCardProps) {
  return (
    <article className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-premium transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-center gap-2 text-amber-500">
        {Array.from({ length: rating }).map((_, index) => (
          <span key={index}>★</span>
        ))}
      </div>
      <p className="mt-4 text-sm leading-7 text-zinc-600">“{quote}”</p>
      <p className="mt-5 text-sm font-semibold text-zinc-900">{author}</p>
    </article>
  );
}

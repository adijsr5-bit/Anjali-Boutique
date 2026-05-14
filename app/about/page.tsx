export const metadata = {
  title: 'About Anjali Boutique | Premium Designer Ethnic Wear',
  description: 'Learn about Anjali Boutique, a premium fashion brand offering designer sarees, party wear, plus-size collections, and luxury accessories.'
};

export default function AboutPage() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">About Anjali Boutique</p>
          <h1 className="text-4xl font-semibold text-zinc-900 sm:text-5xl">Crafting premium boutique fashion for every woman.</h1>
          <p className="mx-auto max-w-3xl text-base leading-8 text-zinc-600">
            Anjali Boutique is a modern Indian fashion destination that combines luxury ethnic wear with contemporary styling. We offer curated designer sarees, casual wear, party collections, plus-size outfits, and accessories made for memorable occasions.
          </p>
        </div>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6 rounded-[32px] border border-zinc-200 bg-secondary p-8 shadow-premium">
            <h2 className="text-2xl font-semibold text-zinc-900">Our Story</h2>
            <p className="leading-7 text-zinc-600">Starting from a passion to dress women in confident silhouettes, Anjali Boutique is built on personalized service, quality fabrics, and timeless designs. Each piece is chosen for its craftsmanship, fit, and cultural elegance.</p>
          </div>
          <div className="space-y-6 rounded-[32px] border border-zinc-200 bg-secondary p-8 shadow-premium">
            <h2 className="text-2xl font-semibold text-zinc-900">Our Promise</h2>
            <p className="leading-7 text-zinc-600">We are committed to premium quality, transparent boutique communication, on-time delivery, and a shopping journey that feels luxurious from first click to final delivery.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

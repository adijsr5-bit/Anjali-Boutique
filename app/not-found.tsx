import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">Page not found</p>
        <h1 className="mt-6 text-4xl font-semibold text-zinc-900 sm:text-5xl">We couldn’t find that page.</h1>
        <p className="mt-4 text-sm leading-7 text-zinc-600">The boutique page you’re looking for may have moved or no longer exists. Let’s get you back to the homepage.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#7a1a36]">
          Return to Home
        </Link>
      </div>
    </section>
  );
}

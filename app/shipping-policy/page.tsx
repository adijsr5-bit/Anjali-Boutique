export const metadata = {
  title: 'Shipping Policy | Anjali Boutique',
  description: 'Review the shipping policy for Anjali Boutique, including delivery timelines, tracking, and packaging details.'
};

export default function ShippingPolicyPage() {
  return (
    <section className="bg-[#F8EDEB] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8 rounded-[32px] border border-zinc-200 bg-white p-10 shadow-premium">
        <h1 className="text-4xl font-semibold text-zinc-900">Shipping Policy</h1>
        <p className="text-sm leading-7 text-zinc-600">Anjali Boutique ships with care across India. Learn about our delivery commitments, order handling, and tracking process.</p>
        <div className="space-y-6 text-sm leading-7 text-zinc-600">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">Delivery Timeline</h2>
            <p>Orders are processed within 1-2 business days and delivered within the expected timeframe based on your location.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">Packaging</h2>
            <p>Every order is packed securely using premium materials to ensure your boutique pieces arrive in perfect condition.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">Tracking</h2>
            <p>We provide tracking details once your order is dispatched so you can follow every step of the delivery journey.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

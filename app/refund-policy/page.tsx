export const metadata = {
  title: 'Refund Policy | Anjali Boutique',
  description: 'Read the refund policy for Anjali Boutique, including return conditions, exchange options, and customer satisfaction guarantees.'
};

export default function RefundPolicyPage() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8 rounded-[32px] border border-zinc-200 bg-secondary p-10 shadow-premium">
        <h1 className="text-4xl font-semibold text-zinc-900">Refund Policy</h1>
        <p className="text-sm leading-7 text-zinc-600">Your satisfaction is important to us. This policy explains refund conditions, returns, and support for boutique purchases.</p>
        <div className="space-y-6 text-sm leading-7 text-zinc-600">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">Eligibility</h2>
            <p>Refunds are considered for damaged products, incorrect shipments, or quality issues reported within the specified timeframe.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">Return Process</h2>
            <p>Contact our support team via email or WhatsApp to initiate a return or exchange. We will guide you step by step.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">Processing Time</h2>
            <p>Refunds are processed promptly once the returned item is received and verified by our team.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

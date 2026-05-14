export const metadata = {
  title: 'Terms & Conditions | Anjali Boutique',
  description: 'Read the terms and conditions for using Anjali Boutique, including order policies, intellectual property, and user responsibilities.'
};

export default function TermsConditionsPage() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8 rounded-[32px] border border-zinc-200 bg-secondary p-10 shadow-premium">
        <h1 className="text-4xl font-semibold text-zinc-900">Terms & Conditions</h1>
        <p className="text-sm leading-7 text-zinc-600">Welcome to Anjali Boutique. These terms govern your access to our website and services, including boutique orders, account interactions, and customer communications.</p>
        <div className="space-y-6 text-sm leading-7 text-zinc-600">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">Use of the Website</h2>
            <p>By using this website, you agree to follow our guidelines and respect the boutique policies we have in place for customers.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">Order Policies</h2>
            <p>All orders are subject to availability and confirmation. We reserve the right to adjust pricing and delivery details before final confirmation.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">Intellectual Property</h2>
            <p>All content, branding, and design on this website are owned or licensed by Anjali Boutique and protected by applicable law.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

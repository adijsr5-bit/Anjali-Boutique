export const metadata = {
  title: 'Privacy Policy | Anjali Boutique',
  description: 'Review the privacy policy for Anjali Boutique and learn how we protect your personal data and boutique shopping experience.'
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-[#F8EDEB] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8 rounded-[32px] border border-zinc-200 bg-white p-10 shadow-premium">
        <h1 className="text-4xl font-semibold text-zinc-900">Privacy Policy</h1>
        <p className="text-sm leading-7 text-zinc-600">At Anjali Boutique, we respect your privacy. This policy explains the types of information we collect, how we use it, and how we keep your data secure during every transaction.</p>
        <div className="space-y-6 text-sm leading-7 text-zinc-600">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">Information We Collect</h2>
            <p>We collect contact details and inquiry details to fulfill your boutique request and provide customer support.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">How We Use Data</h2>
            <p>We use collected information for order management, customer service, and improving your boutique experience.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">Cookies and Tracking</h2>
            <p>Our website uses standard cookies and analytics to deliver a fast, secure, and personalized experience.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

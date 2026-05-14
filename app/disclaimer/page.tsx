export const metadata = {
  title: 'Disclaimer | Anjali Boutique',
  description: 'Anjali Boutique disclaimer page describing the limits of liability and scope of information provided on the website.'
};

export default function DisclaimerPage() {
  return (
    <section className="bg-[#F8EDEB] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8 rounded-[32px] border border-zinc-200 bg-white p-10 shadow-premium">
        <h1 className="text-4xl font-semibold text-zinc-900">Disclaimer</h1>
        <p className="text-sm leading-7 text-zinc-600">The content on this website is for general information and boutique guidance. Anjali Boutique strives for accuracy but is not liable for any errors or omissions.</p>
        <div className="space-y-6 text-sm leading-7 text-zinc-600">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">Accuracy of Information</h2>
            <p>While we make every effort to keep information up to date, product details may change based on availability and boutique updates.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">External Links</h2>
            <p>Our website may contain links to third-party sites. We are not responsible for the content or practices of those sites.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">No Guarantees</h2>
            <p>The website does not offer any guarantees beyond the terms specifically stated for orders and services.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

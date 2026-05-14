export const metadata = {
  title: 'FAQ | Anjali Boutique',
  description: 'Frequently asked questions about Anjali Boutique, delivery, custom designs, plus-size collections, and WhatsApp orders.'
};

const faqItems = [
  {
    question: 'Do you offer custom boutique designs?',
    answer: 'Yes, we provide customized boutique collections based on customer preferences for events, weddings, and special occasions.'
  },
  {
    question: 'Do you deliver across India?',
    answer: 'Yes, we offer delivery across India with tracking and secure packaging for every order.'
  },
  {
    question: 'Can I order through WhatsApp?',
    answer: 'Yes, customers can contact us directly through WhatsApp for inquiries, orders, and styling support.'
  },
  {
    question: 'Do you have plus-size collections?',
    answer: 'Yes, our plus-size collections are designed to offer comfort, elegance, and modern styling for all body types.'
  }
];

export default function FaqPage() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Frequently Asked Questions</p>
          <h1 className="text-4xl font-semibold text-zinc-900 sm:text-5xl">Everything you need to know before your boutique order.</h1>
        </div>
        <div className="grid gap-6">
          {faqItems.map((item) => (
            <div key={item.question} className="rounded-[32px] border border-zinc-200 bg-secondary p-8 shadow-premium">
              <h2 className="text-xl font-semibold text-zinc-900">{item.question}</h2>
              <p className="mt-4 text-sm leading-7 text-zinc-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

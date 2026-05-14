'use client';

import { useState } from 'react';

type ContactClientProps = {
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
};

export default function ContactPageClient({ contactEmail, contactPhone, whatsappNumber }: ContactClientProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setError('');

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
      cache: 'no-store'
    });

    if (response.ok) {
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      return;
    }

    const body = await response.json().catch(() => null);
    setStatus('error');
    setError(body?.error || 'We could not submit your message. Please try again.');
  }

  return (
    <section className="bg-[#F8EDEB] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Contact Us</p>
          <h1 className="text-4xl font-semibold text-zinc-900 sm:text-5xl">Connect with Anjali Boutique</h1>
          <p className="mx-auto max-w-3xl text-base leading-8 text-zinc-600">Reach out via phone, email, or WhatsApp for custom orders, collections, and styling support. We reply quickly to boutique inquiries.</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6 rounded-[32px] border border-zinc-200 bg-white p-8 shadow-premium">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary">Phone</p>
              <p className="mt-2 text-lg font-semibold text-zinc-900">{contactPhone}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary">Email</p>
              <p className="mt-2 text-lg font-semibold text-zinc-900">{contactEmail}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary">WhatsApp</p>
              <a href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="mt-2 inline-block text-lg font-semibold text-primary">
                Chat on WhatsApp
              </a>
            </div>
            <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-sm font-medium text-zinc-900">Business hours</p>
              <p className="mt-2 text-sm text-zinc-600">Mon - Sat / 10:00 AM - 7:00 PM</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 rounded-[32px] border border-zinc-200 bg-white p-8 shadow-premium">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-zinc-900">Full Name</label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                placeholder="Your name"
                className="mt-3 w-full rounded-full border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-zinc-900">Email Address</label>
              <input
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="name@example.com"
                className="mt-3 w-full rounded-full border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-medium text-zinc-900">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="How can we help you?"
                rows={5}
                className="mt-3 w-full rounded-[24px] border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-primary"
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7a1a36]"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'success' && <p className="text-sm text-green-700">Your message was sent successfully.</p>}
            {status === 'error' && <p className="text-sm text-red-600">{error}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

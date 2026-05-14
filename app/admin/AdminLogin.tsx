'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
      cache: 'no-store'
    });

    setLoading(false);

    if (response.ok) {
      router.refresh();
    } else {
      const result = await response.json().catch(() => null);
      setError(result?.error || 'Invalid password. Please try again.');
    }
  }

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-[32px] border border-zinc-200 bg-secondary p-10 shadow-premium">
        <div className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Admin Login</p>
          <h1 className="text-3xl font-semibold text-zinc-900">Secure Admin Access</h1>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-zinc-600">
            Enter the admin password to access the dashboard. The actual secret is stored in <code>.env.local</code>, not in source code.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label htmlFor="adminPassword" className="block text-sm font-medium text-zinc-900">
              Admin Password
            </label>
            <input
              id="adminPassword"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-3xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Enter admin password"
              required
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full justify-center rounded-3xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Checking...' : 'Unlock Dashboard'}
          </button>
        </form>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const consentKey = 'anjali_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(localStorage.getItem(consentKey) !== 'accepted');
  }, []);

  function acceptCookies() {
    localStorage.setItem(consentKey, 'accepted');
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-700 shadow-2xl sm:flex-row sm:items-center sm:justify-between">
        <p className="leading-6">
          We use cookies and similar storage to improve site experience, remember choices, and support analytics or ads where enabled. Read our{' '}
          <Link href="/privacy-policy" className="font-semibold text-primary hover:text-[#7a1a36]">
            Privacy Policy
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={acceptCookies}
          className="shrink-0 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#7a1a36]"
        >
          Accept
        </button>
      </div>
    </div>
  );
}

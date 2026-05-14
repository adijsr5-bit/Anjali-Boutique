'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function AdsenseScript() {
  const [publisherId, setPublisherId] = useState<string>('');

  useEffect(() => {
    // Load AdSense configuration from localStorage
    try {
      const config = localStorage.getItem('adsense_config');
      if (config) {
        const parsed = JSON.parse(config);
        if (parsed.enabled && parsed.publisherId) {
          setPublisherId(parsed.publisherId);
        }
      }
    } catch (error) {
      console.error('Error loading AdSense config:', error);
    }
  }, []);

  if (!publisherId) {
    return null;
  }

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Script
        id="adsense-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "${publisherId}",
              enable_page_level_ads: true
            });
          `,
        }}
      />
    </>
  );
}

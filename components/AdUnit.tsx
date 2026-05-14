'use client';

import { useEffect } from 'react';

interface AdUnitProps {
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  layout?: 'in-article' | '';
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdUnit({ format = 'auto', layout = '', className = '' }: AdUnitProps) {
  useEffect(() => {
    try {
      // Push ad units to AdSense
      if (typeof window !== 'undefined' && 'adsbygoogle' in window) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('Error loading AdSense ad unit:', error);
    }
  }, []);

  return (
    <div className={`my-4 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format={format}
        data-ad-layout={layout}
      />
    </div>
  );
}

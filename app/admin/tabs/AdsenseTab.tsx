'use client';

import { useState, useEffect } from 'react';
import { AdsenseConfig, getAdsenseConfig, saveAdsenseConfig } from '../../../lib/adminStorage';

export default function AdsenseTab() {
  const [config, setConfig] = useState<AdsenseConfig>({
    enabled: false,
    publisherId: '',
    autoAds: true,
    displayAds: true,
    inArticleAds: true
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConfig();
  }, []);

  async function loadConfig() {
    try {
      const data = await getAdsenseConfig();
      setConfig(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (config.enabled && !config.publisherId.trim()) {
      alert('Please enter your AdSense Publisher ID');
      return;
    }

    try {
      await saveAdsenseConfig(config);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      alert('Error saving AdSense configuration');
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-2xl space-y-6">
      {saved && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-sm text-green-800">
          ✓ AdSense settings saved successfully
        </div>
      )}

      <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 text-sm text-blue-800">
        <p className="font-semibold mb-2">📌 AdSense Setup Instructions</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Get your Publisher ID from Google AdSense account</li>
          <li>Enable AdSense to activate ads on your website</li>
          <li>Auto ads will automatically place ad units where they perform best</li>
          <li>You can manually control specific ad placements</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-semibold text-zinc-900 mb-1">Enable Google AdSense</label>
              <p className="text-xs text-zinc-600">Turn on to activate ads on your website</p>
            </div>
            <button
              type="button"
              onClick={() => setConfig({ ...config, enabled: !config.enabled })}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                config.enabled ? 'bg-primary' : 'bg-zinc-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  config.enabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {config.enabled && (
          <>
            <div>
              <label className="block text-sm font-semibold text-zinc-900 mb-2">Google AdSense Publisher ID</label>
              <p className="text-xs text-zinc-600 mb-2">Found in AdSense account settings (ca-pub-xxxxxxxxxxxxxxxxxx)</p>
              <input
                type="text"
                placeholder="ca-pub-xxxxxxxxxxxxxxxxxx"
                value={config.publisherId}
                onChange={(e) => setConfig({ ...config, publisherId: e.target.value })}
                className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 font-mono"
                required={config.enabled}
              />
            </div>

            <div className="space-y-4 rounded-lg border border-zinc-200 bg-white p-6">
              <h3 className="font-semibold text-zinc-900">Ad Types</h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-semibold text-zinc-900 mb-1">Auto Ads</label>
                  <p className="text-xs text-zinc-600">Google automatically places ads optimally</p>
                </div>
                <button
                  type="button"
                  onClick={() => setConfig({ ...config, autoAds: !config.autoAds })}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    config.autoAds ? 'bg-primary' : 'bg-zinc-300'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      config.autoAds ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="border-t border-zinc-200 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-semibold text-zinc-900 mb-1">Display Ads</label>
                    <p className="text-xs text-zinc-600">Show display ads on pages</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setConfig({ ...config, displayAds: !config.displayAds })}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      config.displayAds ? 'bg-primary' : 'bg-zinc-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        config.displayAds ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-semibold text-zinc-900 mb-1">In-Article Ads</label>
                    <p className="text-xs text-zinc-600">Place ads within blog article content</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setConfig({ ...config, inArticleAds: !config.inArticleAds })}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      config.inArticleAds ? 'bg-primary' : 'bg-zinc-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        config.inArticleAds ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        <button
          type="submit"
          className="rounded-full bg-primary px-8 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          Save AdSense Settings
        </button>
      </form>

      {config.enabled && config.publisherId && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-4">
          <p className="text-sm font-semibold text-green-900 mb-2">✓ AdSense is Active</p>
          <p className="text-xs text-green-800">Your ads are configured and will display on your website.</p>
        </div>
      )}
    </div>
  );
}

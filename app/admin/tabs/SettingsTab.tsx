'use client';

import { useEffect, useState } from 'react';
import { siteMetadata } from '../../../lib/content';

export default function SettingsTab() {
  const [formData, setFormData] = useState({
    contactEmail: siteMetadata.contactEmail,
    contactPhone: siteMetadata.contactPhone,
    whatsappNumber: siteMetadata.whatsappNumber,
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteUrl: siteMetadata.siteUrl,
    heroImage: siteMetadata.heroImage || '',
    heroAlt: siteMetadata.heroAlt || 'Elegant designer saree collection hero image'
  });

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      const response = await fetch('/api/content', { cache: 'no-store' });
      if (!response.ok) return;
      const data = await response.json();
      if (data.siteMetadata) {
        setFormData((current) => ({ ...current, ...data.siteMetadata }));
      }
    }

    loadSettings();
  }, []);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadData
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || 'Upload failed');
        return;
      }

      const data = await response.json();
      setFormData((current) => ({
        ...current,
        heroImage: data.imageUrl,
        heroAlt: current.heroAlt || 'Elegant designer saree collection hero image'
      }));
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  }

  function deleteHeroImage() {
    if (confirm('Delete hero image?')) {
      setFormData((current) => ({ ...current, heroImage: '' }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/admin/site', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        cache: 'no-store'
      });

      if (response.ok) {
        const data = await response.json();
        if (data.siteMetadata) {
          setFormData((current) => ({ ...current, ...data.siteMetadata }));
        }
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        const error = await response.json().catch(() => null);
        alert(error?.error || 'Error saving settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      {saved && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          Settings saved successfully
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4 rounded-lg border border-zinc-200 bg-white p-4 sm:p-6">
          <h3 className="font-semibold text-zinc-900">Website Information</h3>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-900">Site Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-900">Site Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-900">Site URL</label>
            <input
              type="url"
              value={formData.siteUrl}
              onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-zinc-200 bg-white p-4 sm:p-6">
          <h3 className="font-semibold text-zinc-900">Contact Information</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-900">Contact Email</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-900">Contact Phone</label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-900">WhatsApp Number</label>
            <input
              type="tel"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
            <p className="mt-1 text-xs text-zinc-500">Include country code, for example +91...</p>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-zinc-200 bg-white p-4 sm:p-6">
          <h3 className="font-semibold text-zinc-900">Hero Section Image</h3>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-900">Upload Hero Image From Phone</label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="min-w-0 flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm file:mr-2 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white disabled:opacity-50"
              />
              {formData.heroImage && (
                <button
                  type="button"
                  onClick={deleteHeroImage}
                  className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-200"
                >
                  Delete
                </button>
              )}
            </div>
            {uploading && <p className="mt-2 text-xs text-blue-600">Uploading...</p>}
            <p className="mt-2 text-xs text-zinc-500">You can also paste image URL below.</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-900">Hero Image URL</label>
            <input
              type="text"
              value={formData.heroImage}
              onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="https://images.unsplash.com/..."
            />
            {formData.heroImage && (
              <div className="mt-4 h-48 overflow-hidden rounded-lg bg-zinc-100 sm:h-64">
                <img src={formData.heroImage} alt="Hero preview" className="h-full w-full object-cover" />
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-900">Hero Image Alt Text</label>
            <input
              type="text"
              value={formData.heroAlt}
              onChange={(e) => setFormData({ ...formData, heroAlt: e.target.value })}
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Elegant designer saree collection hero image"
            />
          </div>
        </div>

        <p className="text-xs text-blue-800">
          Tip: After updating settings, refresh the home page to see the new hero image.
        </p>

        <button
          type="submit"
          disabled={loading || uploading}
          className="w-full rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {loading ? 'Saving...' : 'Save All Settings'}
        </button>
      </form>
    </div>
  );
}

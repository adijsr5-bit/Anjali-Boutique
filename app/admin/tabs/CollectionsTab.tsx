'use client';

import { useEffect, useState } from 'react';
import type { Collection } from '../../../lib/adminStorage';

const emptyForm = {
  title: '',
  description: '',
  image: '',
  alt: ''
};

export default function CollectionsTab() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    loadCollections();
  }, []);

  async function loadCollections() {
    const response = await fetch('/api/admin/collections', { cache: 'no-store' });
    if (!response.ok) return;
    const data = await response.json();
    setCollections(data.collections || []);
  }

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
      setFormData((current) => ({ ...current, image: data.imageUrl }));
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const id = editingId || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const response = await fetch('/api/admin/collections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, id }),
      cache: 'no-store'
    });

    setSaving(false);
    if (!response.ok) {
      const error = await response.json().catch(() => null);
      alert(error?.error || 'Collection save failed');
      return;
    }

    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(false);
    loadCollections();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this collection?')) return;
    await fetch(`/api/admin/collections?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
      cache: 'no-store'
    });
    loadCollections();
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingId(null);
          setFormData(emptyForm);
        }}
        className="w-full rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark sm:w-auto"
      >
        {showForm ? 'Cancel' : '+ Add Collection'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-zinc-200 bg-white p-4 sm:p-6">
          <input
            type="text"
            placeholder="Collection Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
            rows={3}
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-zinc-900">Collection Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm file:mr-2 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white disabled:opacity-50"
            />
            {uploading && <p className="text-xs text-blue-600">Uploading...</p>}
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                placeholder="Or paste image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="min-w-0 flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
              {formData.image && (
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: '' })}
                  className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-200"
                >
                  Delete Image
                </button>
              )}
            </div>
            {formData.image && <img src={formData.image} alt="Collection preview" className="h-44 w-full rounded-lg object-cover sm:h-56" />}
          </div>

          <input
            type="text"
            placeholder="Alt Text"
            value={formData.alt}
            onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
            className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
            required
          />
          <button
            type="submit"
            disabled={uploading || saving}
            className="inline-flex w-full justify-center rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-50 sm:w-auto"
          >
            {saving ? 'Saving...' : editingId ? 'Update' : 'Create'} Collection
          </button>
        </form>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {collections.length === 0 ? (
          <p className="text-sm text-zinc-600">No collections yet.</p>
        ) : (
          collections.map((col) => (
            <div key={col.id} className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
              <img src={col.image} alt={col.alt} className="h-40 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-zinc-900">{col.title}</h3>
                <p className="mt-2 text-xs text-zinc-600">{col.description}</p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => {
                      setEditingId(col.id);
                      setFormData({ title: col.title, description: col.description, image: col.image, alt: col.alt });
                      setShowForm(true);
                    }}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(col.id)} className="text-sm font-semibold text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

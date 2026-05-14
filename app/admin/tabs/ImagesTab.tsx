'use client';

import { useState, useEffect, useRef } from 'react';
import { SiteImage, getImages, addImage, updateImage, deleteImage } from '../../../lib/adminStorage';

export default function ImagesTab() {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    alt: '',
    category: 'hero' as 'hero' | 'collection' | 'blog' | 'gallery' | 'testimonial'
  });

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    const imgs = await getImages();
    setImages(imgs);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setFormData({ ...formData, url: base64 });
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.url || !formData.name || !formData.alt) {
      alert('Please fill in all fields');
      return;
    }

    if (editingId) {
      await updateImage(editingId, formData);
    } else {
      await addImage(formData);
    }

    setFormData({ name: '', url: '', alt: '', category: 'hero' });
    setEditingId(null);
    setShowForm(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    loadImages();
  }

  async function handleDelete(id: string) {
    if (confirm('Delete this image?')) {
      await deleteImage(id);
      loadImages();
    }
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingId(null);
        }}
        className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark"
      >
        {showForm ? 'Cancel' : '+ Add Image'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-zinc-200 bg-white p-6">
          <input
            type="text"
            placeholder="Image Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-zinc-900">Upload Image or Enter URL</label>
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm"
              />
            </div>
            <p className="text-xs text-zinc-500">or paste URL below</p>
            <input
              type="url"
              placeholder="Image URL"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {formData.url && (
            <div className="rounded-lg bg-zinc-50 p-4">
              <p className="mb-2 text-xs font-semibold text-zinc-600">Preview:</p>
              <img src={formData.url} alt="preview" className="h-32 w-32 rounded object-cover" />
            </div>
          )}

          <input
            type="text"
            placeholder="Alt Text"
            value={formData.alt}
            onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
            className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
            required
          />
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as 'hero' | 'collection' | 'blog' | 'gallery' | 'testimonial' })}
            className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="hero">Hero</option>
            <option value="collection">Collection</option>
            <option value="blog">Blog</option>
            <option value="gallery">Gallery</option>
            <option value="testimonial">Testimonial</option>
          </select>
          <button
            type="submit"
            disabled={uploading}
            className="inline-flex rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : editingId ? 'Update' : 'Add'} Image
          </button>
        </form>
      )}

      <div className="space-y-3">
        {images.length === 0 ? (
          <p className="text-sm text-zinc-600">No images uploaded yet.</p>
        ) : (
          images.map((img) => (
            <div key={img.id} className="flex items-center gap-4 rounded-lg border border-zinc-200 bg-white p-4">
              <img src={img.url} alt={img.alt} className="h-16 w-16 rounded object-cover" />
              <div className="flex-1">
                <h3 className="font-semibold text-zinc-900">{img.name}</h3>
                <p className="text-xs text-zinc-500">{img.category}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(img.id);
                    setFormData(img);
                    setShowForm(true);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(img.id)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

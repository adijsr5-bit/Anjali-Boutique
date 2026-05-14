'use client';

import { useEffect, useState } from 'react';
import type { BlogPost } from '../../../lib/adminStorage';

type BlogForm = Omit<BlogPost, 'id' | 'keywords'> & { keywords: string };

const emptyForm = (): BlogForm => ({
  title: '',
  slug: '',
  category: '',
  summary: '',
  content: '',
  publishedAt: new Date().toISOString().split('T')[0],
  image: '',
  alt: '',
  keywords: ''
});

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function BlogsTab() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<BlogForm>(emptyForm);

  useEffect(() => {
    loadBlogs();
  }, []);

  async function loadBlogs() {
    const response = await fetch('/api/admin/blogs', { cache: 'no-store' });
    if (!response.ok) return;
    const data = await response.json();
    setBlogs(data.blogPosts || []);
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

    const payload = {
      ...formData,
      slug: formData.slug || slugify(formData.title),
      keywords: formData.keywords.split(',').map((k) => k.trim()).filter(Boolean)
    };

    const response = await fetch('/api/admin/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store'
    });

    setSaving(false);
    if (!response.ok) {
      alert('Blog save failed');
      return;
    }

    if (editingSlug && editingSlug !== payload.slug) {
      await fetch(`/api/admin/blogs?slug=${encodeURIComponent(editingSlug)}`, { method: 'DELETE', cache: 'no-store' });
    }

    setFormData(emptyForm());
    setEditingSlug(null);
    setShowForm(false);
    loadBlogs();
  }

  async function handleDelete(slug: string) {
    if (!confirm('Delete this blog post?')) return;
    await fetch(`/api/admin/blogs?slug=${encodeURIComponent(slug)}`, {
      method: 'DELETE',
      cache: 'no-store'
    });
    loadBlogs();
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingSlug(null);
          setFormData(emptyForm());
        }}
        className="w-full rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark sm:w-auto"
      >
        {showForm ? 'Cancel' : '+ Add Blog Post'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-zinc-200 bg-white p-4 sm:p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: editingSlug ? formData.slug : slugify(e.target.value) })}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
            <input
              type="text"
              placeholder="Slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
            <input
              type="date"
              value={formData.publishedAt}
              onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <textarea
            placeholder="Summary"
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
            rows={2}
            required
          />

          <textarea
            placeholder="Content (HTML allowed)"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
            rows={5}
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-zinc-900">Blog Image</label>
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
            {formData.image && <img src={formData.image} alt="Blog preview" className="h-44 w-full rounded-lg object-cover sm:h-56" />}
          </div>

          <input
            type="text"
            placeholder="Alt text"
            value={formData.alt}
            onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
            className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
            required
          />

          <input
            type="text"
            placeholder="Keywords (comma-separated)"
            value={formData.keywords}
            onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
            className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
            required
          />

          <button
            type="submit"
            disabled={uploading || saving}
            className="inline-flex w-full justify-center rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-50 sm:w-auto"
          >
            {saving ? 'Saving...' : editingSlug ? 'Update' : 'Create'} Blog Post
          </button>
        </form>
      )}

      <div className="space-y-3">
        {blogs.length === 0 ? (
          <p className="text-sm text-zinc-600">No blog posts yet.</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog.slug} className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 gap-3">
                {blog.image && <img src={blog.image} alt={blog.alt} className="h-16 w-16 shrink-0 rounded object-cover" />}
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-zinc-900">{blog.title}</h3>
                  <p className="text-xs text-zinc-500">{blog.category} - {blog.publishedAt}</p>
                </div>
              </div>
              <div className="flex shrink-0 gap-3">
                <button
                  onClick={() => {
                    setEditingSlug(blog.slug);
                    setFormData({ ...blog, keywords: blog.keywords.join(', ') });
                    setShowForm(true);
                  }}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(blog.slug)} className="text-sm font-semibold text-red-600 hover:text-red-800">
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

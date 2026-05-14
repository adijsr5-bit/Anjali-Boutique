'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Collection, Post, SiteMetadata } from '../../lib/content';

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  receivedAt: string;
};

type AdminPanelProps = {
  initialBlogPosts: Post[];
  initialCollections: Collection[];
  initialSiteMetadata: SiteMetadata;
};

const tabItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'blogs', label: 'Blog Posts' },
  { id: 'collections', label: 'Collections' },
  { id: 'messages', label: 'Messages' },
  { id: 'contact', label: 'Contact Info' }
] as const;

export default function AdminPanel({ initialBlogPosts, initialCollections, initialSiteMetadata }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<(typeof tabItems)[number]['id']>('dashboard');
  const [blogPosts, setBlogPosts] = useState<Post[]>(initialBlogPosts);
  const [collections, setCollections] = useState<Collection[]>(initialCollections);
  const [messages, setMessages] = useState<Message[]>([]);
  const [siteMetadata, setSiteMetadata] = useState<SiteMetadata>(initialSiteMetadata);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Post | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);

  const [blogForm, setBlogForm] = useState<Post>({
    title: '',
    slug: '',
    category: '',
    summary: '',
    content: '',
    publishedAt: new Date().toISOString().slice(0, 10),
    image: '',
    alt: '',
    keywords: []
  });

  const [collectionForm, setCollectionForm] = useState<Collection>({
    id: '',
    title: '',
    description: '',
    image: '',
    alt: ''
  });

  const [contactForm, setContactForm] = useState({
    title: siteMetadata.title,
    description: siteMetadata.description,
    contactEmail: siteMetadata.contactEmail,
    contactPhone: siteMetadata.contactPhone,
    whatsappNumber: siteMetadata.whatsappNumber,
    heroImage: siteMetadata.heroImage || '',
    heroAlt: siteMetadata.heroAlt || ''
  });

  useEffect(() => {
    setContactForm({
      title: siteMetadata.title,
      description: siteMetadata.description,
      contactEmail: siteMetadata.contactEmail,
      contactPhone: siteMetadata.contactPhone,
      whatsappNumber: siteMetadata.whatsappNumber,
      heroImage: siteMetadata.heroImage || '',
      heroAlt: siteMetadata.heroAlt || ''
    });
  }, [siteMetadata]);

  useEffect(() => {
    async function loadMessages() {
      const res = await fetch('/api/admin/messages', { cache: 'no-store' });
      if (res.ok) {
        const body = await res.json();
        setMessages(body.messages || []);
      }
    }
    loadMessages();
  }, []);

  const handleBlogField = (field: keyof Post, value: string) => {
    setBlogForm((current) => ({ ...current, [field]: field === 'keywords' ? value.split(',').map((item) => item.trim()).filter(Boolean) : value }));
  };

  const handleCollectionField = (field: keyof Collection, value: string) => {
    setCollectionForm((current) => ({ ...current, [field]: value }));
  };

  const handleContactField = (field: keyof typeof contactForm, value: string) => {
    setContactForm((current) => ({ ...current, [field]: value }));
  };

  const selectedBlogCount = blogPosts.length;
  const selectedCollectionCount = collections.length;

  const blogList = useMemo(() => blogPosts.slice().sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)), [blogPosts]);

  async function sendRequest(url: string, options: RequestInit) {
    setIsSaving(true);
    setStatusMessage('Saving changes...');
    const res = await fetch(url, options);
    setIsSaving(false);

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      setStatusMessage(body?.error || 'Unable to save changes.');
      return null;
    }

    setStatusMessage('Saved successfully.');
    return res.json();
  }

  async function saveBlog(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await sendRequest('/api/admin/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogForm)
    });

    if (!response) return;
    setBlogPosts(response.blogPosts || []);
    setSelectedBlog(null);
    setBlogForm({
      title: '',
      slug: '',
      category: '',
      summary: '',
      content: '',
      publishedAt: new Date().toISOString().slice(0, 10),
      image: '',
      alt: '',
      keywords: []
    });
  }

  async function deleteBlog(slug: string) {
    const response = await sendRequest(`/api/admin/blogs?slug=${encodeURIComponent(slug)}`, {
      method: 'DELETE'
    });
    if (!response) return;
    setBlogPosts(response.blogPosts || []);
    setSelectedBlog(null);
  }

  async function saveCollection(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await sendRequest('/api/admin/collections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(collectionForm)
    });

    if (!response) return;
    setCollections(response.collections || []);
    setCollectionForm({ id: '', title: '', description: '', image: '', alt: '' });
    setSelectedCollection(null);
  }

  async function deleteCollection(id: string) {
    const response = await sendRequest(`/api/admin/collections?id=${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
    if (!response) return;
    setCollections(response.collections || []);
    setSelectedCollection(null);
  }

  async function saveContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await sendRequest('/api/admin/site', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactForm)
    });

    if (!response) return;
    setSiteMetadata(response.siteMetadata || siteMetadata);
  }

  const selectBlog = (post: Post) => {
    setSelectedBlog(post);
    setBlogForm({ ...post });
  };

  const selectCollection = (item: Collection) => {
    setSelectedCollection(item);
    setCollectionForm({ ...item });
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 rounded-[32px] border border-zinc-200 bg-secondary p-6 shadow-premium md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Admin Panel</p>
          <h1 className="mt-3 text-3xl font-semibold text-zinc-900">Manage content, inquiries, and site data</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-600">Use the tabs below to update blog posts, collections, contact details and review customer messages. All changes are persisted to the boutique content store.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-[24px] bg-white p-4 text-sm shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Blog Posts</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-900">{selectedBlogCount}</p>
          </div>
          <div className="rounded-[24px] bg-white p-4 text-sm shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Collections</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-900">{selectedCollectionCount}</p>
          </div>
          <div className="rounded-[24px] bg-white p-4 text-sm shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Saved Contact</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-900">{siteMetadata.contactEmail}</p>
          </div>
        </div>
      </div>

      <div className="rounded-[32px] border border-zinc-200 bg-white p-4 shadow-premium">
        <div className="flex flex-wrap gap-3 border-b border-zinc-200 pb-4">
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${activeTab === tab.id ? 'bg-primary text-white' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6 px-4 py-4 md:px-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-[28px] border border-zinc-200 bg-secondary p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-primary">Live blog post preview</p>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">Edit blog content from the Blog Posts tab and click publish to update the live store immediately.</p>
                </div>
                <div className="rounded-[28px] border border-zinc-200 bg-secondary p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-primary">Collections manager</p>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">Add and edit collections with images, descriptions, and call-to-action content for the boutique homepage and collection pages.</p>
                </div>
                <div className="rounded-[28px] border border-zinc-200 bg-secondary p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-primary">Contact settings</p>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">Update email, phone, or WhatsApp settings and keep the contact page in sync with the latest boutique information.</p>
                </div>
              </div>
              <div className="rounded-[28px] border border-zinc-200 bg-secondary p-6">
                <h2 className="text-xl font-semibold text-zinc-900">Mini checklist</h2>
                <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-zinc-600">
                  <li>Protect your admin password in <code>.env.local</code>.</li>
                  <li>Use the blog editor to publish new articles quickly.</li>
                  <li>Keep collection details and images updated for seasonal launches.</li>
                  <li>Review messages from customers and reply outside the site.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'blogs' && (
            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
              <div className="rounded-[28px] border border-zinc-200 p-6">
                <h2 className="text-xl font-semibold text-zinc-900">Blog editor</h2>
                <form onSubmit={saveBlog} className="space-y-4 mt-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm text-zinc-700">
                      Title
                      <input
                        value={blogForm.title}
                        onChange={(event) => handleBlogField('title', event.target.value)}
                        className="mt-2 w-full rounded-3xl border border-zinc-200 px-4 py-3 text-sm outline-none"
                        required
                      />
                    </label>
                    <label className="block text-sm text-zinc-700">
                      Slug
                      <input
                        value={blogForm.slug}
                        onChange={(event) => handleBlogField('slug', event.target.value)}
                        className="mt-2 w-full rounded-3xl border border-zinc-200 px-4 py-3 text-sm outline-none"
                        required
                      />
                    </label>
                  </div>
                  <label className="block text-sm text-zinc-700">
                    Category
                    <input
                      value={blogForm.category}
                      onChange={(event) => handleBlogField('category', event.target.value)}
                      className="mt-2 w-full rounded-3xl border border-zinc-200 px-4 py-3 text-sm outline-none"
                      required
                    />
                  </label>
                  <label className="block text-sm text-zinc-700">
                    Summary
                    <textarea
                      value={blogForm.summary}
                      onChange={(event) => handleBlogField('summary', event.target.value)}
                      rows={3}
                      className="mt-2 w-full rounded-[24px] border border-zinc-200 px-4 py-3 text-sm outline-none"
                      required
                    />
                  </label>
                  <label className="block text-sm text-zinc-700">
                    Content (HTML allowed)
                    <textarea
                      value={blogForm.content}
                      onChange={(event) => handleBlogField('content', event.target.value)}
                      rows={5}
                      className="mt-2 w-full rounded-[24px] border border-zinc-200 px-4 py-3 text-sm outline-none"
                      required
                    />
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm text-zinc-700">
                      Image URL
                      <input
                        value={blogForm.image}
                        onChange={(event) => handleBlogField('image', event.target.value)}
                        className="mt-2 w-full rounded-3xl border border-zinc-200 px-4 py-3 text-sm outline-none"
                      />
                    </label>
                    <label className="block text-sm text-zinc-700">
                      Alt text
                      <input
                        value={blogForm.alt}
                        onChange={(event) => handleBlogField('alt', event.target.value)}
                        className="mt-2 w-full rounded-3xl border border-zinc-200 px-4 py-3 text-sm outline-none"
                      />
                    </label>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm text-zinc-700">
                      Published date
                      <input
                        type="date"
                        value={blogForm.publishedAt}
                        onChange={(event) => handleBlogField('publishedAt', event.target.value)}
                        className="mt-2 w-full rounded-3xl border border-zinc-200 px-4 py-3 text-sm outline-none"
                      />
                    </label>
                    <label className="block text-sm text-zinc-700">
                      Keywords (comma separated)
                      <input
                        value={blogForm.keywords.join(', ')}
                        onChange={(event) => handleBlogField('keywords', event.target.value)}
                        className="mt-2 w-full rounded-3xl border border-zinc-200 px-4 py-3 text-sm outline-none"
                      />
                    </label>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button type="submit" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7a1a36] disabled:opacity-60" disabled={isSaving}>
                      {selectedBlog ? 'Update Blog Post' : 'Publish Blog Post'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedBlog(null);
                        setBlogForm({
                          title: '',
                          slug: '',
                          category: '',
                          summary: '',
                          content: '',
                          publishedAt: new Date().toISOString().slice(0, 10),
                          image: '',
                          alt: '',
                          keywords: []
                        });
                        setStatusMessage('');
                      }}
                      className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400"
                    >
                      Clear Form
                    </button>
                  </div>
                  {statusMessage ? <p className="text-sm text-zinc-600">{statusMessage}</p> : null}
                </form>
              </div>
              <div className="rounded-[28px] border border-zinc-200 bg-secondary p-6">
                <h2 className="text-xl font-semibold text-zinc-900">Existing blog posts</h2>
                <div className="mt-6 space-y-4">
                  {blogList.map((post) => (
                    <div key={post.slug} className="rounded-[24px] border border-zinc-200 bg-white p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
                        <div>
                          <p className="text-sm uppercase tracking-[0.3em] text-primary">{post.category}</p>
                          <h3 className="mt-1 text-lg font-semibold text-zinc-900">{post.title}</h3>
                          <p className="text-sm text-zinc-500">{post.publishedAt}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button type="button" onClick={() => selectBlog(post)} className="rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10">
                            Edit
                          </button>
                          <button type="button" onClick={() => deleteBlog(post.slug)} className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {blogList.length === 0 && <p className="text-sm text-zinc-500">No blog posts available yet.</p>}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'collections' && (
            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
              <div className="rounded-[28px] border border-zinc-200 p-6">
                <h2 className="text-xl font-semibold text-zinc-900">Collection editor</h2>
                <form onSubmit={saveCollection} className="space-y-4 mt-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm text-zinc-700">
                      Title
                      <input
                        value={collectionForm.title}
                        onChange={(event) => handleCollectionField('title', event.target.value)}
                        className="mt-2 w-full rounded-3xl border border-zinc-200 px-4 py-3 text-sm outline-none"
                        required
                      />
                    </label>
                    <label className="block text-sm text-zinc-700">
                      Slug / ID
                      <input
                        value={collectionForm.id}
                        onChange={(event) => handleCollectionField('id', event.target.value)}
                        className="mt-2 w-full rounded-3xl border border-zinc-200 px-4 py-3 text-sm outline-none"
                        required
                      />
                    </label>
                  </div>
                  <label className="block text-sm text-zinc-700">
                    Description
                    <textarea
                      value={collectionForm.description}
                      onChange={(event) => handleCollectionField('description', event.target.value)}
                      rows={3}
                      className="mt-2 w-full rounded-[24px] border border-zinc-200 px-4 py-3 text-sm outline-none"
                      required
                    />
                  </label>
                  <label className="block text-sm text-zinc-700">
                    Image URL
                    <input
                      value={collectionForm.image}
                      onChange={(event) => handleCollectionField('image', event.target.value)}
                      className="mt-2 w-full rounded-3xl border border-zinc-200 px-4 py-3 text-sm outline-none"
                    />
                  </label>
                  <label className="block text-sm text-zinc-700">
                    Alt text
                    <input
                      value={collectionForm.alt}
                      onChange={(event) => handleCollectionField('alt', event.target.value)}
                      className="mt-2 w-full rounded-3xl border border-zinc-200 px-4 py-3 text-sm outline-none"
                    />
                  </label>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button type="submit" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7a1a36] disabled:opacity-60" disabled={isSaving}>
                      {selectedCollection ? 'Update Collection' : 'Save Collection'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCollection(null);
                        setCollectionForm({ id: '', title: '', description: '', image: '', alt: '' });
                        setStatusMessage('');
                      }}
                      className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400"
                    >
                      Clear Form
                    </button>
                  </div>
                  {statusMessage ? <p className="text-sm text-zinc-600">{statusMessage}</p> : null}
                </form>
              </div>
              <div className="rounded-[28px] border border-zinc-200 bg-secondary p-6">
                <h2 className="text-xl font-semibold text-zinc-900">Collections</h2>
                <div className="mt-6 space-y-4">
                  {collections.map((item) => (
                    <div key={item.id} className="rounded-[24px] border border-zinc-200 bg-white p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
                        <div>
                          <h3 className="text-lg font-semibold text-zinc-900">{item.title}</h3>
                          <p className="text-sm text-zinc-500">{item.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button type="button" onClick={() => selectCollection(item)} className="rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10">
                            Edit
                          </button>
                          <button type="button" onClick={() => deleteCollection(item.id)} className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {collections.length === 0 && <p className="text-sm text-zinc-500">No collections added yet.</p>}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-6 px-4 py-4 md:px-6">
              <h2 className="text-xl font-semibold text-zinc-900">Contact Messages</h2>
              <p className="text-sm text-zinc-600">Messages submitted through the contact form are stored locally. Use the message text to respond through your preferred channel.</p>
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <p className="rounded-[28px] border border-zinc-200 bg-secondary p-6 text-sm text-zinc-500">No messages have been received yet.</p>
                ) : (
                  messages.map((message) => (
                    <div key={message.id} className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
                      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-start">
                        <div>
                          <p className="font-semibold text-zinc-900">{message.name}</p>
                          <p className="text-sm text-zinc-500">{message.email}</p>
                        </div>
                        <p className="text-sm text-zinc-500">{new Date(message.receivedAt).toLocaleString()}</p>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-zinc-700">{message.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-[28px] border border-zinc-200 p-6">
                <h2 className="text-xl font-semibold text-zinc-900">Contact settings</h2>
                <form onSubmit={saveContact} className="space-y-4 mt-6">
                  <label className="block text-sm text-zinc-700">
                    Site title
                    <input
                      value={contactForm.title}
                      onChange={(event) => handleContactField('title', event.target.value)}
                      className="mt-2 w-full rounded-3xl border border-zinc-200 px-4 py-3 text-sm outline-none"
                    />
                  </label>
                  <label className="block text-sm text-zinc-700">
                    Site description
                    <textarea
                      value={contactForm.description}
                      onChange={(event) => handleContactField('description', event.target.value)}
                      rows={3}
                      className="mt-2 w-full rounded-[24px] border border-zinc-200 px-4 py-3 text-sm outline-none"
                    />
                  </label>
                  <label className="block text-sm text-zinc-700">
                    Contact email
                    <input
                      value={contactForm.contactEmail}
                      onChange={(event) => handleContactField('contactEmail', event.target.value)}
                      className="mt-2 w-full rounded-3xl border border-zinc-200 px-4 py-3 text-sm outline-none"
                    />
                  </label>
                  <label className="block text-sm text-zinc-700">
                    Contact phone
                    <input
                      value={contactForm.contactPhone}
                      onChange={(event) => handleContactField('contactPhone', event.target.value)}
                      className="mt-2 w-full rounded-3xl border border-zinc-200 px-4 py-3 text-sm outline-none"
                    />
                  </label>
                  <label className="block text-sm text-zinc-700">
                    WhatsApp number
                    <input
                      value={contactForm.whatsappNumber}
                      onChange={(event) => handleContactField('whatsappNumber', event.target.value)}
                      className="mt-2 w-full rounded-3xl border border-zinc-200 px-4 py-3 text-sm outline-none"
                    />
                  </label>
                  <label className="block text-sm text-zinc-700">
                    Homepage hero image URL
                    <input
                      type="url"
                      value={contactForm.heroImage}
                      onChange={(event) => handleContactField('heroImage', event.target.value)}
                      placeholder="https://example.com/hero-image.jpg"
                      className="mt-2 w-full rounded-3xl border border-zinc-200 px-4 py-3 text-sm outline-none"
                    />
                  </label>
                  <label className="block text-sm text-zinc-700">
                    Homepage hero alt text
                    <input
                      value={contactForm.heroAlt}
                      onChange={(event) => handleContactField('heroAlt', event.target.value)}
                      placeholder="Elegant designer saree collection hero image"
                      className="mt-2 w-full rounded-3xl border border-zinc-200 px-4 py-3 text-sm outline-none"
                    />
                  </label>
                  <button type="submit" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7a1a36] disabled:opacity-60" disabled={isSaving}>
                    Update Contact Info
                  </button>
                  {statusMessage ? <p className="text-sm text-zinc-600">{statusMessage}</p> : null}
                </form>
              </div>
              <div className="rounded-[28px] border border-zinc-200 bg-secondary p-6">
                <h2 className="text-xl font-semibold text-zinc-900">Current contact details</h2>
                <div className="mt-6 space-y-3 text-sm text-zinc-700">
                  <p><span className="font-semibold text-zinc-900">Title:</span> {siteMetadata.title}</p>
                  <p><span className="font-semibold text-zinc-900">Description:</span> {siteMetadata.description}</p>
                  <p><span className="font-semibold text-zinc-900">Email:</span> {siteMetadata.contactEmail}</p>
                  <p><span className="font-semibold text-zinc-900">Phone:</span> {siteMetadata.contactPhone}</p>
                  <p><span className="font-semibold text-zinc-900">WhatsApp:</span> {siteMetadata.whatsappNumber}</p>
                  <p><span className="font-semibold text-zinc-900">Hero image:</span> {siteMetadata.heroImage || 'Not set'}</p>
                  <p><span className="font-semibold text-zinc-900">Hero alt text:</span> {siteMetadata.heroAlt || 'Not set'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogsTab from './tabs/BlogsTab';
import CollectionsTab from './tabs/CollectionsTab';
import ImagesTab from './tabs/ImagesTab';
import MessagesTab from './tabs/MessagesTab';
import SettingsTab from './tabs/SettingsTab';
import AdsenseTab from './tabs/AdsenseTab';

type Tab = 'blogs' | 'collections' | 'images' | 'messages' | 'adsense' | 'settings';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('blogs');
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.refresh();
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'blogs', label: 'Blog Posts' },
    { id: 'collections', label: 'Collections' },
    { id: 'images', label: 'Images' },
    { id: 'messages', label: 'Messages' },
    { id: 'adsense', label: 'AdSense' },
    { id: 'settings', label: 'Site Settings' }
  ];

  return (
    <section className="bg-white px-3 py-6 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 border-b border-zinc-200 pb-5 sm:flex-row sm:items-center sm:justify-between lg:mb-8 lg:pb-6">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold text-zinc-900 sm:text-4xl">Admin Dashboard</h1>
            <p className="mt-2 text-sm text-zinc-600">Manage your boutique content, collections, images, and inquiries.</p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex w-full justify-center rounded-full bg-red-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-red-700 sm:w-auto"
          >
            Logout
          </button>
        </div>

        <div className="mb-6 flex gap-2 overflow-x-auto border-b border-zinc-200 pb-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${
                activeTab === tab.id ? 'bg-primary text-white' : 'text-zinc-600 hover:bg-white hover:text-zinc-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="rounded-lg border border-zinc-200 bg-secondary/30 p-3 sm:p-6">
          {activeTab === 'blogs' && <BlogsTab />}
          {activeTab === 'collections' && <CollectionsTab />}
          {activeTab === 'images' && <ImagesTab />}
          {activeTab === 'messages' && <MessagesTab />}
          {activeTab === 'adsense' && <AdsenseTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </div>
    </section>
  );
}

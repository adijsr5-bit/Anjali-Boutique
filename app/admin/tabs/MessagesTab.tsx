'use client';

import { useState, useEffect } from 'react';
import type { Message } from '../../../lib/content';

export default function MessagesTab() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    const response = await fetch('/api/admin/messages', { cache: 'no-store' });
    if (!response.ok) return;
    const data = await response.json();
    const msgs = (data.messages || []) as Message[];
    setMessages(msgs.sort((a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()));
  }

  async function handleMarkRead(id: string) {
    const response = await fetch('/api/admin/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
      cache: 'no-store'
    });
    if (!response.ok) return;
    await loadMessages();
  }

  async function handleDelete(id: string) {
    if (confirm('Delete this message?')) {
      await fetch(`/api/admin/messages?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        cache: 'no-store'
      });
      setSelectedMsg(null);
      loadMessages();
    }
  }

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1 space-y-2">
        <div className="mb-4 rounded-lg bg-primary/10 p-4">
          <p className="text-sm font-semibold text-primary">{unreadCount} Unread Messages</p>
        </div>
        
        {messages.length === 0 ? (
          <p className="text-sm text-zinc-600">No messages received yet.</p>
        ) : (
          messages.map((msg) => (
            <button
              key={msg.id}
              onClick={() => {
                setSelectedMsg({ ...msg, read: true });
                if (!msg.read) handleMarkRead(msg.id);
              }}
              className={`w-full rounded-lg p-3 text-left transition ${
                msg.read ? 'border border-zinc-200 bg-white' : 'border-l-4 border-l-primary bg-primary/5'
              }`}
            >
              <h4 className={`text-sm font-semibold ${msg.read ? 'text-zinc-700' : 'text-primary'}`}>{msg.name}</h4>
              <p className="truncate text-xs text-zinc-500">{msg.email}</p>
              <p className="mt-1 text-xs text-zinc-500">{new Date(msg.receivedAt).toLocaleDateString()}</p>
            </button>
          ))
        )}
      </div>

      <div className="lg:col-span-2">
        {selectedMsg ? (
          <div className="rounded-lg border border-zinc-200 bg-white p-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">{selectedMsg.name}</h3>
              <p className="text-sm text-zinc-600">{selectedMsg.email}</p>
              <p className="text-xs text-zinc-500 mt-1">{new Date(selectedMsg.receivedAt).toLocaleString()}</p>
            </div>

            <div className="border-t border-zinc-200 pt-4">
              <h4 className="font-semibold text-zinc-900 mb-2">Message:</h4>
              <p className="text-sm leading-6 text-zinc-700 whitespace-pre-wrap">{selectedMsg.message}</p>
            </div>

            <div className="flex gap-2 border-t border-zinc-200 pt-4">
              {!selectedMsg.read && (
                <button
                  onClick={() => handleMarkRead(selectedMsg.id)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Mark as Read
                </button>
              )}
              <button
                onClick={() => handleDelete(selectedMsg.id)}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 h-64">
            <p className="text-zinc-600">Select a message to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}

import fs from 'fs/promises';
import path from 'path';
import { get, put } from '@vercel/blob';
import { unstable_noStore as noStore } from 'next/cache';
import type { Collection, ContentData, Message, SiteMetadata } from './content';

const contentFile = path.join(process.cwd(), 'data', 'content.json');
const messagesFile = path.join(process.cwd(), 'data', 'messages.json');
const contentBlobPath = process.env.CONTENT_BLOB_PATH || 'admin/content.json';
const messagesBlobPath = process.env.MESSAGES_BLOB_PATH || 'admin/messages.json';

function hasBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function isVercel() {
  return Boolean(process.env.VERCEL);
}

function assertWritableStorageConfigured() {
  if (isVercel() && !hasBlobStorage()) {
    throw new Error('Vercel Blob is not configured. Add BLOB_READ_WRITE_TOKEN in Vercel environment variables.');
  }
}

async function readJson<T>(filePath: string): Promise<T> {
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents) as T;
}

async function writeJson<T>(filePath: string, data: T) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

async function readBlobJson<T>(pathname: string): Promise<T | null> {
  if (!hasBlobStorage()) {
    return null;
  }

  const blob = await get(pathname, { access: 'private', useCache: false });
  if (!blob || blob.statusCode !== 200 || !blob.stream) {
    return null;
  }

  return new Response(blob.stream).json() as Promise<T>;
}

async function writeBlobJson<T>(pathname: string, data: T) {
  await put(pathname, JSON.stringify(data, null, 2), {
    access: 'private',
    allowOverwrite: true,
    contentType: 'application/json'
  });
}

export async function getContentData(): Promise<ContentData> {
  noStore();

  const blobData = await readBlobJson<ContentData>(contentBlobPath);
  if (blobData) {
    return blobData;
  }

  return readJson<ContentData>(contentFile);
}

export async function saveContentData(data: ContentData): Promise<void> {
  if (hasBlobStorage()) {
    await writeBlobJson(contentBlobPath, data);
    return;
  }

  assertWritableStorageConfigured();
  await writeJson(contentFile, data);
}

export async function getMessages(): Promise<Message[]> {
  noStore();

  const blobData = await readBlobJson<Message[]>(messagesBlobPath);
  if (blobData) {
    return blobData;
  }

  return readJson<Message[]>(messagesFile);
}

export async function saveMessages(messages: Message[]): Promise<void> {
  if (hasBlobStorage()) {
    await writeBlobJson(messagesBlobPath, messages);
    return;
  }

  assertWritableStorageConfigured();
  await writeJson(messagesFile, messages);
}

export async function addMessage(message: Omit<Message, 'id' | 'receivedAt'>): Promise<Message> {
  const messages = await getMessages();
  const newMessage: Message = {
    ...message,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    receivedAt: new Date().toISOString()
  };
  messages.unshift(newMessage);
  await saveMessages(messages);
  return newMessage;
}

export async function deleteMessage(id: string): Promise<Message[]> {
  const messages = await getMessages();
  const updated = messages.filter((message) => message.id !== id);
  await saveMessages(updated);
  return updated;
}

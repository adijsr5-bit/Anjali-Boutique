import fs from 'fs/promises';
import path from 'path';
import type { Collection, ContentData, Message, SiteMetadata } from './content';

const contentFile = path.join(process.cwd(), 'data', 'content.json');
const messagesFile = path.join(process.cwd(), 'data', 'messages.json');

async function readJson<T>(filePath: string): Promise<T> {
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents) as T;
}

async function writeJson<T>(filePath: string, data: T) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

export async function getContentData(): Promise<ContentData> {
  return readJson<ContentData>(contentFile);
}

export async function saveContentData(data: ContentData): Promise<void> {
  await writeJson(contentFile, data);
}

export async function getMessages(): Promise<Message[]> {
  return readJson<Message[]>(messagesFile);
}

export async function saveMessages(messages: Message[]): Promise<void> {
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

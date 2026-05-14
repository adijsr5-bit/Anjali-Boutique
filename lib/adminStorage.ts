// In-memory storage with localStorage fallback for development
// For production, replace with actual database calls

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string;
  publishedAt: string;
  image: string;
  alt: string;
  keywords: string[];
};

export type Collection = {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  receivedAt: string;
  read: boolean;
};

export type SiteImage = {
  id: string;
  name: string;
  url: string;
  alt: string;
  category: 'hero' | 'collection' | 'blog' | 'gallery' | 'testimonial';
};

// Blog Posts CRUD
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const data = localStorage.getItem('blog_posts');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export async function addBlogPost(post: Omit<BlogPost, 'id'>): Promise<BlogPost> {
  const id = Date.now().toString();
  const newPost: BlogPost = { ...post, id };
  const posts = await getBlogPosts();
  posts.push(newPost);
  localStorage.setItem('blog_posts', JSON.stringify(posts));
  return newPost;
}

export async function updateBlogPost(id: string, post: Omit<BlogPost, 'id'>): Promise<BlogPost> {
  const posts = await getBlogPosts();
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) throw new Error('Post not found');
  const updated = { ...post, id };
  posts[index] = updated;
  localStorage.setItem('blog_posts', JSON.stringify(posts));
  return updated;
}

export async function deleteBlogPost(id: string): Promise<void> {
  const posts = await getBlogPosts();
  const filtered = posts.filter((p) => p.id !== id);
  localStorage.setItem('blog_posts', JSON.stringify(filtered));
}

// Collections CRUD
export async function getCollections(): Promise<Collection[]> {
  try {
    const data = localStorage.getItem('collections');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export async function addCollection(collection: Omit<Collection, 'id'>): Promise<Collection> {
  const id = Date.now().toString();
  const newCollection: Collection = { ...collection, id };
  const collections = await getCollections();
  collections.push(newCollection);
  localStorage.setItem('collections', JSON.stringify(collections));
  return newCollection;
}

export async function updateCollection(id: string, collection: Omit<Collection, 'id'>): Promise<Collection> {
  const collections = await getCollections();
  const index = collections.findIndex((c) => c.id === id);
  if (index === -1) throw new Error('Collection not found');
  const updated = { ...collection, id };
  collections[index] = updated;
  localStorage.setItem('collections', JSON.stringify(collections));
  return updated;
}

export async function deleteCollection(id: string): Promise<void> {
  const collections = await getCollections();
  const filtered = collections.filter((c) => c.id !== id);
  localStorage.setItem('collections', JSON.stringify(filtered));
}

// Contact Messages
export async function getMessages(): Promise<ContactMessage[]> {
  try {
    const data = localStorage.getItem('contact_messages');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export async function addMessage(msg: Omit<ContactMessage, 'id' | 'read'>): Promise<ContactMessage> {
  const id = Date.now().toString();
  const newMsg: ContactMessage = { ...msg, id, read: false };
  const messages = await getMessages();
  messages.push(newMsg);
  localStorage.setItem('contact_messages', JSON.stringify(messages));
  return newMsg;
}

export async function markMessageAsRead(id: string): Promise<void> {
  const messages = await getMessages();
  const msg = messages.find((m) => m.id === id);
  if (msg) {
    msg.read = true;
    localStorage.setItem('contact_messages', JSON.stringify(messages));
  }
}

export async function deleteMessage(id: string): Promise<void> {
  const messages = await getMessages();
  const filtered = messages.filter((m) => m.id !== id);
  localStorage.setItem('contact_messages', JSON.stringify(filtered));
}

// Site Images
export async function getImages(): Promise<SiteImage[]> {
  try {
    const data = localStorage.getItem('site_images');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export async function addImage(image: Omit<SiteImage, 'id'>): Promise<SiteImage> {
  const id = Date.now().toString();
  const newImage: SiteImage = { ...image, id };
  const images = await getImages();
  images.push(newImage);
  localStorage.setItem('site_images', JSON.stringify(images));
  return newImage;
}

export async function updateImage(id: string, image: Omit<SiteImage, 'id'>): Promise<SiteImage> {
  const images = await getImages();
  const index = images.findIndex((i) => i.id === id);
  if (index === -1) throw new Error('Image not found');
  const updated = { ...image, id };
  images[index] = updated;
  localStorage.setItem('site_images', JSON.stringify(images));
  return updated;
}

export async function deleteImage(id: string): Promise<void> {
  const images = await getImages();
  const filtered = images.filter((i) => i.id !== id);
  localStorage.setItem('site_images', JSON.stringify(filtered));
}

// AdSense Configuration
export type AdsenseConfig = {
  enabled: boolean;
  publisherId: string;
  autoAds: boolean;
  displayAds: boolean;
  inArticleAds: boolean;
};

export async function getAdsenseConfig(): Promise<AdsenseConfig> {
  try {
    const data = localStorage.getItem('adsense_config');
    return data ? JSON.parse(data) : {
      enabled: false,
      publisherId: '',
      autoAds: true,
      displayAds: true,
      inArticleAds: true
    };
  } catch {
    return {
      enabled: false,
      publisherId: '',
      autoAds: true,
      displayAds: true,
      inArticleAds: true
    };
  }
}

export async function saveAdsenseConfig(config: AdsenseConfig): Promise<AdsenseConfig> {
  localStorage.setItem('adsense_config', JSON.stringify(config));
  return config;
}

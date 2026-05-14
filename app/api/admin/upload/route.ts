import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '../../../../lib/adminAuth';
import { put } from '@vercel/blob';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  const token = request.cookies.get('admin-auth')?.value;
  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only images allowed.' }, { status: 400 });
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Max 5MB.' }, { status: 400 });
    }

    const extensionByType: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
      'image/gif': 'gif'
    };

    // Generate unique filename from the validated MIME type.
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const ext = extensionByType[file.type];
    const filename = `${timestamp}-${random}.${ext}`;
    const bytes = await file.arrayBuffer();

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`uploads/${filename}`, bytes, {
        access: 'public',
        addRandomSuffix: true,
        contentType: file.type
      });

      return NextResponse.json({
        success: true,
        imageUrl: blob.url,
        filename
      });
    }

    if (process.env.VERCEL) {
      return NextResponse.json(
        { error: 'Vercel Blob is not configured. Add BLOB_READ_WRITE_TOKEN in Vercel environment variables.' },
        { status: 500 }
      );
    }

    // Local development fallback.
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    const filepath = join(uploadsDir, filename);
    await writeFile(filepath, Buffer.from(bytes));

    // Return public URL
    const imageUrl = `/uploads/${filename}`;
    return NextResponse.json({ 
      success: true, 
      imageUrl,
      filename 
    });
  } catch (error) {
    console.error('Upload error:', error);
    const message = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

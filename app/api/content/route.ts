import { NextResponse } from 'next/server';
import { getContentData } from '../../../lib/data';

export async function GET() {
  const content = await getContentData();
  return NextResponse.json(content);
}

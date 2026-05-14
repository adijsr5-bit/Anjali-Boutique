import { NextRequest, NextResponse } from 'next/server';
import { getContentData, saveContentData } from '../../../../lib/data';
import { verifyAdminToken } from '../../../../lib/adminAuth';

export async function PUT(request: NextRequest) {
  const token = request.cookies.get('admin-auth')?.value;
  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const content = await getContentData();
  content.siteMetadata = {
    ...content.siteMetadata,
    title: typeof body.title === 'string' ? body.title : content.siteMetadata.title,
    description: typeof body.description === 'string' ? body.description : content.siteMetadata.description,
    contactEmail: typeof body.contactEmail === 'string' ? body.contactEmail : content.siteMetadata.contactEmail,
    contactPhone: typeof body.contactPhone === 'string' ? body.contactPhone : content.siteMetadata.contactPhone,
    whatsappNumber: typeof body.whatsappNumber === 'string' ? body.whatsappNumber : content.siteMetadata.whatsappNumber,
    heroImage: typeof body.heroImage === 'string' ? body.heroImage : content.siteMetadata.heroImage,
    heroAlt: typeof body.heroAlt === 'string' ? body.heroAlt : content.siteMetadata.heroAlt
  };

  await saveContentData(content);
  return NextResponse.json({ siteMetadata: content.siteMetadata });
}

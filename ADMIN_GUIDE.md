# Admin Dashboard Guide - Full Power Control

## Overview
The Admin Dashboard provides complete control over your boutique website. With full CRUD (Create, Read, Update, Delete) capabilities for all content, you can manage everything from blogs to images to AdSense configuration.

## Login
- **URL**: `/admin`
- **Password**: Set via `ADMIN_PASSWORD` environment variable in `.env.local`
- **Duration**: 2-hour session timeout

## Dashboard Tabs

### 1. 📝 Blog Posts
**Complete blog management with full control**

#### Features:
- ✅ **Add New Blog**: Create blog posts with rich content
- ✅ **Edit Blog**: Modify any published blog post
- ✅ **Delete Blog**: Remove blog posts permanently
- ✅ **Full Editing**: 
  - Title, slug, category
  - Summary and full HTML content
  - Publication date
  - Featured image with alt text
  - SEO keywords (comma-separated)

#### How to Add a Blog:
1. Click "+ Add Blog Post" button
2. Fill in all fields:
   - **Title**: Blog title (appears in search results)
   - **Slug**: URL-friendly name (e.g., "summer-collection-2024")
   - **Category**: Blog category for organization
   - **Summary**: Short excerpt (meta description)
   - **Content**: Full HTML content (use HTML for formatting)
   - **Published At**: Publication date
   - **Image**: Featured image URL
   - **Alt Text**: Image description for accessibility
   - **Keywords**: SEO keywords separated by commas
3. Click "Add Blog Post"

---

### 2. 👗 Collections
**Manage product collections**

#### Features:
- ✅ **Create Collections**: Add new product categories
- ✅ **Edit Collections**: Update collection details
- ✅ **Delete Collections**: Remove old collections
- ✅ Full Content Control:
  - Collection title
  - Description with multiple lines
  - Featured image
  - Image alt text

#### How to Manage Collections:
1. Click "+ Add Collection" to create new
2. Enter collection details
3. Upload or paste image URL
4. Click "Create Collection"

---

### 3. 🖼️ Images
**Complete image management system**

#### Features:
- ✅ **Upload Images**: Direct file upload from computer
- ✅ **Add Image URLs**: Paste image URLs from web
- ✅ **Edit Images**: Update any image details
- ✅ **Delete Images**: Remove images
- ✅ **Image Categories**:
  - Hero (header images)
  - Collection (product images)
  - Blog (article images)
  - Gallery (photo gallery)
  - Testimonial (customer images)
- ✅ **Live Preview**: See images before saving

#### How to Upload Images:
1. Click "+ Add Image"
2. Choose upload method:
   - **File Upload**: Click to select image from computer
   - **Or paste URL**: Use external image links
3. Enter image name and alt text
4. Select category from dropdown
5. Preview appears automatically
6. Click "Add Image"

**Storage**: Images are stored as base64 in browser localStorage (suitable for small to medium websites)

---

### 4. 💬 Messages
**Customer inquiry management**

#### Features:
- ✅ **View Messages**: See all contact form submissions
- ✅ **Mark as Read**: Track which messages you've reviewed
- ✅ **Delete Messages**: Remove old messages
- ✅ **Unread Counter**: Know how many new messages
- ✅ **Full Details**: Name, email, message, timestamp

#### How to Use:
1. Check "Unread Messages" count
2. Click message to read full details
3. Mark as read or delete as needed
4. Click another message to view next

---

### 5. 📊 AdSense (Google Ads)
**Complete AdSense configuration**

#### Features:
- ✅ **Enable/Disable**: Turn ads on/off with single toggle
- ✅ **Publisher ID**: Input your Google AdSense ID
- ✅ **Auto Ads**: Google automatically places optimal ads
- ✅ **Display Ads**: Banner/box ads across site
- ✅ **In-Article Ads**: Ads within blog content
- ✅ **Individual Control**: Enable/disable each ad type separately

#### How to Set Up AdSense:
1. Go to AdSense tab
2. Click "Enable Google AdSense" toggle
3. Get Publisher ID from [AdSense Account](https://adsense.google.com)
4. Paste Publisher ID (format: ca-pub-xxxxxxxxxxxxxxxxxx)
5. Choose ad types you want:
   - ✅ Auto Ads (recommended)
   - ✅ Display Ads
   - ✅ In-Article Ads
6. Click "Save AdSense Settings"
7. Ads appear automatically on website

**Status**: Green indicator shows when AdSense is active and earning

---

### 6. ⚙️ Site Settings
**Website-wide configuration**

#### Features:
- ✅ **Edit All Settings**: Complete control
- ✅ **Website Information**:
  - Site title (appears in browser tab)
  - Meta description (search engines)
  - Site URL
- ✅ **Contact Information**:
  - Contact email for inquiries
  - Contact phone number
  - WhatsApp number (for quick contact)

#### How to Update Settings:
1. Click "Site Settings" tab
2. Update any field you want to change
3. Tips appear for each field
4. Click "Save All Settings"
5. Confirmation appears

---

## Environment Variables Required

Create `.env.local` file in project root:

```env
ADMIN_PASSWORD=your_secure_password_here
```

**Security Note**: 
- Change default password immediately
- Use strong, unique password
- Never commit `.env.local` to git
- Password is hashed with SHA-256

---

## File Upload Notes

### Image Upload Limits:
- **File Size**: Up to 5MB per image
- **Formats**: JPG, PNG, WebP, GIF
- **Storage**: Browser localStorage (up to 5-10MB)
- **Best Practice**: For large sites, use external image service

### Recommended External Services:
- Cloudinary
- Imgix
- AWS S3
- Google Cloud Storage

---

## SEO Tips

### Blog Posts:
- Use descriptive titles (50-60 characters)
- Write detailed summaries (150-160 characters)
- Add relevant keywords
- Use descriptive alt text for images

### Collections:
- Clear, searchable titles
- Detailed descriptions
- High-quality images
- Proper alt text

### Website Settings:
- Unique meta description (150-160 chars)
- Relevant site title
- Complete contact information

---

## Best Practices

✅ **DO:**
- Regularly update blog content
- Keep images optimized (compress before upload)
- Review messages frequently
- Use descriptive names for all content
- Add proper alt text to all images
- Use proper categories for images

❌ **DON'T:**
- Use very large image files
- Leave fields empty
- Use generic descriptions
- Share admin password
- Delete important messages without backup

---

## Troubleshooting

### Images Not Appearing:
1. Clear browser cache
2. Try uploading again
3. Check image file size
4. Use a different image format

### AdSense Not Working:
1. Verify Publisher ID is correct
2. Ensure AdSense is enabled
3. Wait 24 hours for ads to appear
4. Check AdSense account settings

### Messages Not Saving:
1. Check browser localStorage is enabled
2. Clear old data if storage is full
3. Try using different browser
4. Contact support if issue persists

---

## Contact & Support

For issues or feature requests:
- Email: admin@anjaliboutique.in
- WhatsApp: +919876543210
- Check DEPLOYMENT.md for technical details

---

## Version Info
- **Last Updated**: May 2026
- **Admin Features**: Complete CRUD Operations
- **AdSense Support**: Enabled
- **Image Management**: Full Upload Support

---

**Now you have FULL CONTROL over your website! 🎉**
  
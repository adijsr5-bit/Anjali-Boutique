# 🚀 Admin Dashboard - Complete Setup & Features

## What's New ✨

Your website now has **FULL POWER ADMIN CONTROL** with complete ability to:

### ✅ Complete CRUD Operations
- **Blog Posts**: Create, Read, Update, Delete
- **Collections**: Full management
- **Images**: Upload and manage
- **Messages**: View and manage inquiries
- **Site Settings**: Complete control
- **AdSense**: Setup and configuration

### ✅ Image Management
- Direct file upload (JPG, PNG, WebP, GIF)
- Paste image URLs
- Categorized images (Hero, Collection, Blog, Gallery, Testimonial)
- Live image preview
- Base64 storage for quick access

### ✅ Google AdSense Integration
- One-click enable/disable
- Auto Ads (optimal placement)
- Display Ads (banners/boxes)
- In-Article Ads (within blog posts)
- Individual control for each ad type
- Live configuration status

---

## 🔧 Quick Setup

### 1. Set Admin Password

Create `.env.local` in project root:
```env
ADMIN_PASSWORD=your_secure_password_here
```

**Important**: 
- Choose a strong, unique password
- Change it from default
- Never commit `.env.local` to git

### 2. Access Admin Dashboard

```
http://localhost:3000/admin
```

Enter password → Get full admin access

### 3. Add Google AdSense (Optional)

1. Go to Admin → AdSense tab
2. Get Publisher ID from [Google AdSense](https://adsense.google.com)
3. Enable AdSense in dashboard
4. Paste Publisher ID (ca-pub-xxxxxxxxxxxxxxxxxx)
5. Choose ad types
6. Save

Done! Ads appear on website automatically.

---

## 📋 Dashboard Features

| Feature | CRUD | Upload | Preview | Notes |
|---------|------|--------|---------|-------|
| **Blog Posts** | ✅ Full | ✅ Images | ✅ Yes | HTML content support |
| **Collections** | ✅ Full | ✅ Images | ✅ Yes | Product categories |
| **Images** | ✅ Full | ✅ Direct | ✅ Live | 5 categories |
| **Messages** | ✅ Full | - | ✅ Yes | Auto timestamp |
| **Site Settings** | ✅ Full | - | - | Global config |
| **AdSense** | ✅ Full | - | ✅ Status | Email activation |

---

## 📱 Tab Navigation

```
Admin Dashboard
├── 📝 Blog Posts (Create/Edit/Delete articles)
├── 👗 Collections (Manage product categories)
├── 🖼️ Images (Upload and organize images)
├── 💬 Messages (View customer inquiries)
├── 📊 AdSense (Setup Google Ads)
└── ⚙️ Settings (Site configuration)
```

---

## 🎯 Common Tasks

### Add a Blog Post
1. Dashboard → Blog Posts
2. Click "+ Add Blog Post"
3. Fill title, slug, content, date, image
4. Add keywords for SEO
5. Save → Blog appears on website

### Upload Images
1. Dashboard → Images
2. Click "+ Add Image"
3. Upload file OR paste URL
4. Select category
5. Add alt text
6. Save → Image stored and ready to use

### Setup AdSense
1. Dashboard → AdSense
2. Click "Enable Google AdSense"
3. Paste Publisher ID
4. Choose ad types
5. Save → Ads appear on site

### Update Site Info
1. Dashboard → Settings
2. Update any field
3. Save → Changes apply site-wide

---

## 🔐 Security

- Admin password is **hashed with SHA-256**
- Passwords are **never stored in plain text**
- Session timeout: **2 hours**
- Secure cookie handling
- CSRF protection built-in

**Never:**
- Share admin password
- Commit `.env.local` to git
- Use weak passwords
- Leave admin session unattended

---

## 💾 Storage

### Local Storage
- Blog posts
- Collections  
- Messages
- Images (base64)
- AdSense config

### For Production
Consider migrating to:
- **Database**: MongoDB, PostgreSQL
- **Image Storage**: Cloudinary, AWS S3
- **Form Backend**: Custom API

---

## 🚀 Performance Tips

1. **Optimize Images**
   - Compress before upload
   - Use appropriate formats (PNG for graphics, JPG for photos)
   - Keep under 2MB per image

2. **Blog Content**
   - Use structured HTML
   - Optimize images within articles
   - Add meta descriptions

3. **AdSense**
   - Wait 24 hours for ads to appear
   - Don't click own ads
   - Monitor AdSense account

---

## 📊 File Locations

```
app/
├── admin/
│   ├── AdminDashboard.tsx        # Main dashboard
│   ├── AdminLogin.tsx            # Login form
│   ├── AdminPanel.tsx            # Panel component
│   └── tabs/                     # Individual tabs
│       ├── BlogsTab.tsx
│       ├── CollectionsTab.tsx
│       ├── ImagesTab.tsx
│       ├── MessagesTab.tsx
│       ├── SettingsTab.tsx
│       └── AdsenseTab.tsx        # NEW!
├── api/admin/                    # Admin API routes
│   ├── login/route.ts
│   ├── logout/route.ts
│   ├── blogs/route.ts
│   ├── collections/route.ts
│   ├── messages/route.ts
│   └── site/route.ts
components/
├── AdsenseScript.tsx             # NEW! AdSense integration
├── AdUnit.tsx                    # NEW! Ad placement component
lib/
├── adminStorage.ts               # LOCAL storage functions
├── adminAuth.ts                  # Authentication
└── content.ts                    # Content types
```

---

## 🎓 Learning Resources

- [Google AdSense Help](https://support.google.com/adsense)
- [HTML Content Guide](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [SEO Best Practices](https://support.google.com/webmasters)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## ❓ FAQ

**Q: Where is data stored?**
A: Browser localStorage. For production, migrate to a database.

**Q: How large can images be?**
A: Up to 5MB per image. Optimize for web (200-500KB is ideal).

**Q: When do ads appear?**
A: Within 24-48 hours after enabling AdSense.

**Q: Can I edit blog posts later?**
A: Yes! Click "Edit" on any blog post in the Blog Posts tab.

**Q: How do I backup my data?**
A: Export localStorage, or setup a database.

**Q: Can multiple people be admins?**
A: Currently one password. Add database auth for multiple users.

---

## 🆘 Troubleshooting

**Admin login not working:**
- Check `.env.local` has `ADMIN_PASSWORD`
- Restart dev server
- Clear browser cookies
- Try incognito/private window

**Images not uploading:**
- Check file size (max 5MB)
- Try different format (PNG, JPG)
- Clear browser cache
- Check localStorage is enabled

**AdSense not showing ads:**
- Verify Publisher ID is correct
- Wait 24-48 hours
- Check AdSense account in good standing
- Ensure ads are enabled in dashboard

**Messages not saving:**
- Check browser localStorage enabled
- Verify browser has space
- Try different browser
- Clear old data

---

## 📞 Support

Need help? 
- Check ADMIN_GUIDE.md for detailed docs
- Review DEPLOYMENT.md for technical setup
- Check console errors (F12 → Console)
- Test in different browser

---

## 📝 Version Info

- **Version**: 1.0.0
- **Updated**: May 2026
- **Features**: Full CRUD, Image Upload, AdSense Integration
- **Storage**: localStorage (dev), ready for database
- **Admin Tabs**: 6 (Blogs, Collections, Images, Messages, AdSense, Settings)

---

**🎉 You're all set! Start managing your boutique website like a pro!**

**Next Steps:**
1. Set `ADMIN_PASSWORD` in `.env.local`
2. Restart dev server
3. Visit `/admin` and login
4. Add your first blog post
5. Upload your first image
6. (Optional) Setup Google AdSense

Happy managing! 📊✨

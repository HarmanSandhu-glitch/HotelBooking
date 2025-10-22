# 🚀 Vercel Deployment Guide

## ✅ Fixed Issues

### Problem:
Vercel deployment was failing due to dependency conflict between `cloudinary@2.8.0` and `multer-storage-cloudinary@4.0.0` (which requires `cloudinary@1.x`).

### Solution:
**Removed** `multer-storage-cloudinary` dependency and created a **custom Cloudinary upload solution** using Cloudinary v2's native streaming API.

---

## 📝 Changes Made

### 1. Updated `uploadMiddleware.js`
- ✅ Removed `multer-storage-cloudinary` import
- ✅ Created custom `uploadToCloudinary()` function using Cloudinary v2 streaming API
- ✅ Uses `multer.memoryStorage()` to store files in memory temporarily
- ✅ Uploads to Cloudinary using `cloudinary.uploader.upload_stream()`
- ✅ Maintains all previous functionality (image validation, size limits, transformations)

### 2. Updated `package.json`
- ✅ Removed `multer-storage-cloudinary` dependency
- ✅ Now only uses native Cloudinary v2 and Multer

### 3. Updated `vercel.json`
- ✅ Simplified build configuration
- ✅ Added `NODE_ENV` production setting

---

## 🚀 Deploy to Vercel

### Step 1: Commit and Push Changes
```bash
cd "/home/harmn/Resume Projects/HotelBooking/server"
git add .
git commit -m "Fix: Remove multer-storage-cloudinary, use native Cloudinary v2 API"
git push origin main
```

### Step 2: Configure Environment Variables in Vercel
Go to your Vercel project settings and add these environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_webhook_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=production
```

### Step 3: Deploy
Vercel will automatically deploy when you push to your main branch, or you can manually deploy:

```bash
vercel --prod
```

---

## 🔧 How the New Upload System Works

### Before (multer-storage-cloudinary):
```javascript
// Used CloudinaryStorage adapter
const storage = new CloudinaryStorage({...})
```

### After (Native Cloudinary v2):
```javascript
// Custom implementation using memory storage + streaming upload
1. Multer stores file in memory (buffer)
2. Custom middleware uploads buffer to Cloudinary via streaming API
3. Returns Cloudinary URL
```

### Benefits:
- ✅ No dependency conflicts
- ✅ Works with Cloudinary v2
- ✅ More control over upload process
- ✅ Same functionality as before
- ✅ Vercel deployment compatible

---

## 📋 Deployment Checklist

- [x] Remove `multer-storage-cloudinary` dependency
- [x] Update `uploadMiddleware.js` with custom solution
- [x] Update `package.json`
- [x] Test locally (server runs successfully)
- [ ] Commit changes
- [ ] Push to GitHub
- [ ] Configure Vercel environment variables
- [ ] Deploy to Vercel
- [ ] Test production API endpoints

---

## 🧪 Testing Uploads

After deployment, test these endpoints:

### 1. Test Single Image Upload
```bash
POST /api/rooms
Content-Type: multipart/form-data
Authorization: Bearer <token>

# Include 'images' field with file(s)
```

### 2. Test Multiple Images Upload
Same endpoint, multiple files in 'images' field (max 10)

### 3. Verify Cloudinary
- Check your Cloudinary dashboard
- Images should appear in `hotel-booking` folder
- Images should be transformed (1000x1000 max)

---

## 🐛 Troubleshooting

### Issue: Upload fails in production
**Solution:** Verify Cloudinary credentials in Vercel environment variables

### Issue: Large file upload timeout
**Solution:** Files are limited to 5MB, check file size before upload

### Issue: Wrong file format
**Solution:** Only JPG, JPEG, PNG, and WebP are allowed

---

## 📊 Vercel Build Output (Expected)

```
✓ Installing dependencies...
✓ Building...
✓ Uploading build outputs...
✓ Deployment ready
```

No more dependency conflicts! 🎉

---

## 🔗 Next Steps

1. **Push changes** to GitHub
2. **Verify deployment** on Vercel
3. **Update frontend** API URL to point to Vercel URL:
   ```env
   VITE_API_URL=https://your-vercel-app.vercel.app/api
   ```
4. **Test all features** in production

---

**Deployment Status:** ✅ Ready for Production
**Last Updated:** October 22, 2025

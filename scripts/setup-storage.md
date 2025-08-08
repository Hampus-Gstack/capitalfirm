# Storage Setup Guide

## ✅ Blob Storage - COMPLETED

Your Blob storage has been successfully created via CLI:

- **Store Name**: `capitalfirm-files`
- **Store ID**: `store_01y8J81T4Lj6YEPi`
- **Environment**: Production, Preview, Development
- **Token**: Added to `.env.local`

## 🔧 Edge Config - Manual Setup Required

Since Edge Config creation is not available via CLI yet, you need to create it manually:

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/hampus-grunes-projects/capitalfirm
2. Click on "Storage" tab
3. Click "Create" on "Edge Config"

### Step 2: Create Edge Config
1. Name it: `capitalfirm-config`
2. Select environments: Production, Preview, Development
3. Click "Create"

### Step 3: Get Environment Variable
1. After creation, copy the `EDGE_CONFIG` URL
2. Add it to your `.env.local` file:
   ```
   EDGE_CONFIG=your_edge_config_url_here
   ```

## 🚀 Test Your Setup

### Test Blob Storage
```bash
# Test file upload
curl -X POST http://localhost:3000/api/upload \
  -F "file=@test-image.jpg" \
  -F "category=image"
```

### Test Edge Config
```bash
# The edge config will be available in your app
# Check the lib/edge-config.ts file for usage
```

## 📊 Current Status

- ✅ **Blob Storage**: Ready to use
- ⏳ **Edge Config**: Needs manual creation
- ✅ **Environment Variables**: Blob token configured
- ⏳ **Environment Variables**: Edge Config URL needed

## 💰 Cost Summary

- **Blob Storage**: FREE (100GB storage + 100GB bandwidth)
- **Edge Config**: FREE (100KB storage)
- **Total Cost**: $0

## 🎯 Next Steps

1. Create Edge Config in Vercel dashboard
2. Add EDGE_CONFIG to environment variables
3. Test file uploads in your admin settings
4. Deploy your changes

Your file hosting system is ready! 🎉 
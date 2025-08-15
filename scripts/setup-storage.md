# Vercel Blob Storage Setup for Cursus Capital

## Overview
This guide will help you set up Vercel Blob Storage for file uploads in your Cursus Capital application.

## Prerequisites
- Vercel account
- Cursus Capital project deployed on Vercel

## Step 1: Create Blob Store
1. Go to your Vercel dashboard
2. Select your Cursus Capital project
3. Go to Storage tab
4. Click "Create Store"
5. **Store Name**: `cursuscapital-files`
6. **Region**: Choose closest to your users
7. Click "Create"

## Step 2: Get Environment Variables
1. In your blob store settings, copy the following:
   - `BLOB_READ_WRITE_TOKEN`
   - `BLOB_READ_WRITE_TOKEN_VERCEL`

## Step 3: Update Environment Variables
1. Visit: https://vercel.com/hampus-grunes-projects/cursuscapital
2. Go to Settings > Environment Variables
3. Add the following variables:
   - `BLOB_READ_WRITE_TOKEN` = [your_token]
   - `BLOB_READ_WRITE_TOKEN_VERCEL` = [your_vercel_token]

## Step 4: Create Edge Config
1. Go to Vercel Dashboard > Edge Config
2. Click "Create Config"
3. Name it: `cursuscapital-config`
4. Add your configuration

## Step 5: Test Upload
1. Deploy your changes
2. Test file upload functionality
3. Verify files appear in your blob store

## Troubleshooting
- Ensure environment variables are set correctly
- Check blob store permissions
- Verify API routes are working 
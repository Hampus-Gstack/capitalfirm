#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('📊 Checking your Vercel Blob Storage usage...\n');

try {
  // Get store details
  const storeInfo = execSync('vercel blob store get store_01y8J81T4Lj6YEPi', { encoding: 'utf8' });
  console.log(storeInfo);
  
  // List files to see current usage
  console.log('\n📁 Current files in your Blob store:');
  const files = execSync('vercel blob list', { encoding: 'utf8' });
  console.log(files || 'No files uploaded yet.');
  
  console.log('\n💰 Usage Summary:');
  console.log('• Free tier: 1GB storage, 1GB bandwidth/month');
  console.log('• Current usage: Check the "Size" field above');
  console.log('• Upgrade to Pro ($20/month) for 100GB if needed');
  
} catch (error) {
  console.error('❌ Error checking usage:', error.message);
} 
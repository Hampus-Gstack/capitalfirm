#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

// Create a test image file
const testImagePath = path.join(__dirname, 'test-image.txt');
const testContent = 'This is a test file for upload verification';

fs.writeFileSync(testImagePath, testContent);

console.log('🧪 Testing file upload functionality...');
console.log('📁 Test file created:', testImagePath);

// Test the upload API
async function testUpload() {
  try {
    const FormData = require('form-data');
    const fs = require('fs');
    
    const form = new FormData();
    form.append('file', fs.createReadStream(testImagePath));
    form.append('category', 'test');
    
    const response = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: form,
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Upload successful!');
      console.log('📊 Result:', JSON.stringify(result, null, 2));
    } else {
      const error = await response.text();
      console.log('❌ Upload failed:', error);
    }
  } catch (error) {
    console.log('❌ Test failed:', error.message);
    console.log('💡 Make sure your development server is running: npm run dev');
  }
}

// Run the test
testUpload();

// Cleanup
setTimeout(() => {
  if (fs.existsSync(testImagePath)) {
    fs.unlinkSync(testImagePath);
    console.log('🧹 Test file cleaned up');
  }
}, 5000); 
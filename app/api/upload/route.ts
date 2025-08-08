import { NextRequest, NextResponse } from 'next/server';
import { uploadFile, validateFileSize, validateFileType } from '@/lib/storage';

const MAX_FILE_SIZE = 100; // 100MB
const ALLOWED_IMAGE_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
const ALLOWED_VIDEO_TYPES = ['mp4', 'mov', 'avi', 'webm'];
const ALLOWED_DOCUMENT_TYPES = ['pdf', 'doc', 'docx', 'ppt', 'pptx'];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string || 'general';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file size
    if (!validateFileSize(file.size, MAX_FILE_SIZE)) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${MAX_FILE_SIZE}MB` },
        { status: 400 }
      );
    }

    // Validate file type based on category
    const filename = file.name;
    let allowedTypes: string[] = [];

    switch (category) {
      case 'image':
        allowedTypes = ALLOWED_IMAGE_TYPES;
        break;
      case 'video':
        allowedTypes = ALLOWED_VIDEO_TYPES;
        break;
      case 'document':
        allowedTypes = ALLOWED_DOCUMENT_TYPES;
        break;
      default:
        allowedTypes = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES, ...ALLOWED_DOCUMENT_TYPES];
    }

    if (!validateFileType(filename, allowedTypes)) {
      return NextResponse.json(
        { error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const extension = filename.split('.').pop();
    const uniqueFilename = `${category}/${timestamp}-${filename}`;

    // Upload file
    const result = await uploadFile(file, uniqueFilename, file.type);

    return NextResponse.json({
      success: true,
      data: {
        url: result.url,
        filename: uniqueFilename,
        size: result.size,
        uploadedAt: result.uploadedAt,
        category,
      },
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Upload endpoint',
    limits: {
      maxFileSize: `${MAX_FILE_SIZE}MB`,
      allowedImageTypes: ALLOWED_IMAGE_TYPES,
      allowedVideoTypes: ALLOWED_VIDEO_TYPES,
      allowedDocumentTypes: ALLOWED_DOCUMENT_TYPES,
    },
  });
} 
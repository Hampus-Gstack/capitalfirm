import { put } from '@vercel/blob';
import { NextRequest } from 'next/server';

export interface UploadResult {
  url: string;
  size: number;
  uploadedAt: Date;
}

export async function uploadFile(
  file: File | Buffer,
  filename: string,
  contentType?: string
): Promise<UploadResult> {
  try {
    const blob = await put(filename, file, {
      access: 'public',
      contentType: contentType || 'application/octet-stream',
    });

    // Get file size from the input file if available
    let fileSize = 0;
    if (file instanceof File) {
      fileSize = file.size;
    } else if (Buffer.isBuffer(file)) {
      fileSize = file.length;
    }

    return {
      url: blob.url,
      size: fileSize,
      uploadedAt: new Date(),
    };
  } catch (error) {
    console.error('Upload failed:', error);
    throw new Error('File upload failed');
  }
}

export async function uploadImage(
  file: File | Buffer,
  filename: string
): Promise<UploadResult> {
  return uploadFile(file, `images/${filename}`, 'image/*');
}

export async function uploadVideo(
  file: File | Buffer,
  filename: string
): Promise<UploadResult> {
  return uploadFile(file, `videos/${filename}`, 'video/*');
}

export async function uploadDocument(
  file: File | Buffer,
  filename: string
): Promise<UploadResult> {
  return uploadFile(file, `documents/${filename}`, 'application/pdf');
}

export function getFileSizeMB(bytes: number): number {
  return Math.round((bytes / 1024 / 1024) * 100) / 100;
}

export function validateFileSize(bytes: number, maxMB: number): boolean {
  return bytes <= maxMB * 1024 * 1024;
}

export function validateFileType(filename: string, allowedTypes: string[]): boolean {
  const extension = filename.split('.').pop()?.toLowerCase();
  return extension ? allowedTypes.includes(extension) : false;
} 
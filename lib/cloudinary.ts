import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadResult {
  url: string;
  public_id: string;
  secure_url: string;
  format: string;
  bytes: number;
  width?: number;
  height?: number;
  duration?: number; // for videos
}

export async function uploadToCloudinary(
  file: File | Buffer,
  folder: string = 'cursuscapital',
  options: any = {}
): Promise<CloudinaryUploadResult> {
  try {
    // Convert file to base64 if it's a File object
    let fileData: string;
    
    if (file instanceof File) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fileData = `data:${file.type};base64,${buffer.toString('base64')}`;
    } else {
      fileData = `data:application/octet-stream;base64,${file.toString('base64')}`;
    }

    const uploadOptions = {
      folder,
      resource_type: 'auto', // auto-detect image/video
      ...options,
    };

    const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      cloudinary.uploader.upload(
        fileData,
        uploadOptions,
        (error, result) => {
          if (error) reject(error);
          else resolve(result as CloudinaryUploadResult);
        }
      );
    });

    return result;
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    throw new Error('File upload failed');
  }
}

export async function uploadImage(
  file: File | Buffer,
  folder: string = 'cursuscapital/images'
): Promise<CloudinaryUploadResult> {
  return uploadToCloudinary(file, folder, {
    resource_type: 'image',
    transformation: [
      { quality: 'auto:good' }, // Optimize quality
      { fetch_format: 'auto' }, // Auto format (WebP for modern browsers)
    ],
  });
}

export async function uploadVideo(
  file: File | Buffer,
  folder: string = 'cursuscapital/videos'
): Promise<CloudinaryUploadResult> {
  return uploadToCloudinary(file, folder, {
    resource_type: 'video',
    transformation: [
      { quality: 'auto:good' },
      { fetch_format: 'auto' },
    ],
  });
}

export function getCloudinaryUrl(publicId: string, options: any = {}): string {
  return cloudinary.url(publicId, options);
}

export function deleteFromCloudinary(publicId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
} 
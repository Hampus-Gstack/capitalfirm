import { createClient } from '@vercel/edge-config';

// Create Edge Config client
const edgeConfig = createClient(process.env.EDGE_CONFIG);

export interface AppSettings {
  companyName: string;
  contactEmail: string;
  phoneNumber: string;
  address: string;
  socialMedia: {
    linkedin: string;
    twitter: string;
    facebook: string;
  };
  features: {
    fileUpload: boolean;
    calendarIntegration: boolean;
    analytics: boolean;
  };
  limits: {
    maxFileSize: number;
    maxUploadsPerDay: number;
    allowedFileTypes: string[];
  };
}

export async function getAppSettings(): Promise<AppSettings> {
  try {
    const settings = await edgeConfig.get('appSettings');
    return settings as AppSettings;
  } catch (error) {
    console.error('Failed to load app settings:', error);
    // Return default settings
    return {
      companyName: 'Capital Firm',
      contactEmail: 'info@capitalfirm.com',
      phoneNumber: '+1 (555) 123-4567',
      address: '123 Business St, New York, NY 10001',
      socialMedia: {
        linkedin: 'https://linkedin.com/company/capitalfirm',
        twitter: 'https://twitter.com/capitalfirm',
        facebook: 'https://facebook.com/capitalfirm',
      },
      features: {
        fileUpload: true,
        calendarIntegration: true,
        analytics: true,
      },
      limits: {
        maxFileSize: 100, // MB
        maxUploadsPerDay: 50,
        allowedFileTypes: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'doc', 'docx'],
      },
    };
  }
}

export async function updateAppSettings(settings: Partial<AppSettings>): Promise<void> {
  try {
    // Note: Edge Config is read-only in production
    // You would typically update this through Vercel dashboard or API
    console.log('Settings update requested:', settings);
  } catch (error) {
    console.error('Failed to update app settings:', error);
  }
}

export async function getFeatureFlag(flag: string): Promise<boolean> {
  try {
    const value = await edgeConfig.get(`features.${flag}`);
    return value === true;
  } catch (error) {
    console.error(`Failed to get feature flag ${flag}:`, error);
    return false;
  }
}

export async function getAppLimit(limit: string): Promise<number> {
  try {
    const value = await edgeConfig.get(`limits.${limit}`);
    return value as number;
  } catch (error) {
    console.error(`Failed to get app limit ${limit}:`, error);
    return 0;
  }
} 
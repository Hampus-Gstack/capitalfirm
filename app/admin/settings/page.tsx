'use client'

import { useState } from 'react'
import { 
  CogIcon,
  UserIcon,
  ShieldCheckIcon,
  BellIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  KeyIcon
} from '@heroicons/react/24/outline'
import FileUpload from '@/components/FileUpload';

interface Settings {
  general: {
    companyName: string
    timezone: string
    currency: string
    language: string
  }
  notifications: {
    emailNotifications: boolean
    smsNotifications: boolean
    meetingReminders: boolean
    clientUpdates: boolean
    systemAlerts: boolean
  }
  security: {
    twoFactorAuth: boolean
    sessionTimeout: number
    passwordPolicy: string
    ipWhitelist: string[]
  }
  integrations: {
    calendly: boolean
    hubspot: boolean
    googleCalendar: boolean
    zcal: boolean
  }
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    general: {
      companyName: 'Capital Firm',
      timezone: 'America/New_York',
      currency: 'USD',
      language: 'en'
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      meetingReminders: true,
      clientUpdates: true,
      systemAlerts: true
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordPolicy: 'strong',
      ipWhitelist: ['192.168.1.1', '10.0.0.1']
    },
    integrations: {
      calendly: true,
      hubspot: true,
      googleCalendar: false,
      zcal: false
    }
  })

  const [activeTab, setActiveTab] = useState('general')
  const [isSaving, setIsSaving] = useState(false)

  const tabs = [
    { id: 'general', name: 'General', icon: CogIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'integrations', name: 'Integrations', icon: GlobeAltIcon }
  ]

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    // You could add a success notification here
  }

  const updateSetting = (section: keyof Settings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }))
  }

  const handleFileUpload = (result: any) => {
    console.log('File uploaded:', result);
    // Handle the uploaded file URL
    // You can save it to your database or use it in your app
  };

  const handleUploadError = (error: string) => {
    console.error('Upload error:', error);
    // Handle upload errors
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-gray-600">Manage your application settings and configurations.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-accent-500/20 text-accent-400 border border-accent-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-3" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">File Management</h3>
              
              <div className="space-y-6">
                {/* Image Upload */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Upload Images</h4>
                  <FileUpload
                    onUploadComplete={handleFileUpload}
                    onUploadError={handleUploadError}
                    category="image"
                    maxSize={10}
                    allowedTypes={['jpg', 'jpeg', 'png', 'gif', 'webp']}
                    multiple={true}
                  />
                </div>

                {/* Video Upload */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Upload Videos</h4>
                  <FileUpload
                    onUploadComplete={handleFileUpload}
                    onUploadError={handleUploadError}
                    category="video"
                    maxSize={100}
                    allowedTypes={['mp4', 'mov', 'avi', 'webm']}
                    multiple={false}
                  />
                </div>

                {/* Document Upload */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Upload Documents</h4>
                  <FileUpload
                    onUploadComplete={handleFileUpload}
                    onUploadError={handleUploadError}
                    category="document"
                    maxSize={50}
                    allowedTypes={['pdf', 'doc', 'docx', 'ppt', 'pptx']}
                    multiple={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
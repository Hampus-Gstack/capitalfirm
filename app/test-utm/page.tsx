'use client';

import { useState } from 'react';

export default function TestUTMPage() {
  const [utmParams, setUtmParams] = useState({
    utm_source: 'capitalfirm',
    utm_medium: 'email',
    utm_campaign: 'discovery_call',
    utm_content: 'zcal',
    email: 'test@example.com',
    name: 'Test User'
  });

  const generateUTMLink = () => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams();
    
    Object.entries(utmParams).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });
    
    return `${baseUrl}/calendar-booking?${params.toString()}`;
  };

  const handleParamChange = (key: string, value: string) => {
    setUtmParams(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">UTM Tracking Test</h1>
          <p className="text-xl text-gray-300">Generate and test UTM tracking links for your calendar</p>
        </div>

        <div className="bg-gray-900 rounded-2xl border border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-white mb-6">UTM Parameters</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                UTM Source
              </label>
              <input
                type="text"
                value={utmParams.utm_source}
                onChange={(e) => handleParamChange('utm_source', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-500 transition-colors"
                placeholder="capitalfirm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                UTM Medium
              </label>
              <input
                type="text"
                value={utmParams.utm_medium}
                onChange={(e) => handleParamChange('utm_medium', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-500 transition-colors"
                placeholder="email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                UTM Campaign
              </label>
              <input
                type="text"
                value={utmParams.utm_campaign}
                onChange={(e) => handleParamChange('utm_campaign', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-500 transition-colors"
                placeholder="discovery_call"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                UTM Content
              </label>
              <input
                type="text"
                value={utmParams.utm_content}
                onChange={(e) => handleParamChange('utm_content', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-500 transition-colors"
                placeholder="zcal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Prospect Email
              </label>
              <input
                type="email"
                value={utmParams.email}
                onChange={(e) => handleParamChange('email', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-500 transition-colors"
                placeholder="prospect@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Prospect Name
              </label>
              <input
                type="text"
                value={utmParams.name}
                onChange={(e) => handleParamChange('name', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-500 transition-colors"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Generated Link</h3>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={generateUTMLink()}
                readOnly
                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm"
              />
              <button
                onClick={() => copyToClipboard(generateUTMLink())}
                className="bg-accent-600 hover:bg-accent-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => window.open(generateUTMLink(), '_blank')}
              className="bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200"
            >
              Test Link
            </button>
            
            <button
              onClick={() => {
                setUtmParams({
                  utm_source: 'capitalfirm',
                  utm_medium: 'email',
                  utm_campaign: 'discovery_call',
                  utm_content: 'zcal',
                  email: 'test@example.com',
                  name: 'Test User'
                });
              }}
              className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-medium transition-colors"
            >
              Reset to Default
            </button>
          </div>
        </div>

        <div className="mt-8 bg-gray-900 rounded-2xl border border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-accent-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Generate UTM Link</h3>
                <p className="text-gray-400">
                  Use the form above to create a tracking link with UTM parameters. This link will capture all the tracking data when someone clicks it.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-accent-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Send to Prospect</h3>
                <p className="text-gray-400">
                  Send the generated link to your prospect via email, LinkedIn, or any other channel. The UTM parameters will track the source.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-accent-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Automatic Tracking</h3>
                <p className="text-gray-400">
                  When the prospect clicks the link, a booking session is created automatically. You can then manually create meetings from the dashboard.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-accent-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Monitor Results</h3>
                <p className="text-gray-400">
                  Check your dashboard to see booking sessions and create meetings manually. All UTM data is preserved for analytics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
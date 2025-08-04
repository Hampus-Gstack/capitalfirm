'use client';

import { useState } from 'react';

export default function TestUTMPage() {
  const [utmSource, setUtmSource] = useState('capitalfirm');
  const [utmMedium, setUtmMedium] = useState('dashboard');
  const [utmCampaign, setUtmCampaign] = useState('client_meeting');
  const [utmContent, setUtmContent] = useState('zcal');

  const generateUTMLink = (baseUrl: string) => {
    const utmParams = new URLSearchParams({
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_content: utmContent
    });
    return `${baseUrl}?${utmParams.toString()}`;
  };

  const zcalLink = 'https://zcal.co/hampusg/discovery-call';
  const trackedLink = generateUTMLink(zcalLink);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">UTM Tracking Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* UTM Parameters */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">UTM Parameters</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">UTM Source</label>
                <input
                  type="text"
                  value={utmSource}
                  onChange={(e) => setUtmSource(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  placeholder="capitalfirm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">UTM Medium</label>
                <input
                  type="text"
                  value={utmMedium}
                  onChange={(e) => setUtmMedium(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  placeholder="dashboard"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">UTM Campaign</label>
                <input
                  type="text"
                  value={utmCampaign}
                  onChange={(e) => setUtmCampaign(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  placeholder="client_meeting"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">UTM Content</label>
                <input
                  type="text"
                  value={utmContent}
                  onChange={(e) => setUtmContent(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  placeholder="zcal"
                />
              </div>
            </div>
          </div>

          {/* Generated Link */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Generated Link</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Original Zcal Link</label>
                <div className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm break-all">
                  {zcalLink}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tracked Link</label>
                <div className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm break-all">
                  {trackedLink}
                </div>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(trackedLink)}
                className="w-full bg-accent-600 hover:bg-accent-500 text-white px-4 py-2 rounded font-medium transition-colors"
              >
                Copy Tracked Link
              </button>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="font-semibold text-white mb-2">1. UTM Tracking</h3>
              <p>When someone books a meeting using the tracked link, Zcal will include the UTM parameters in the webhook data sent to your application.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">2. Webhook Processing</h3>
              <p>Your webhook endpoint at <code className="bg-gray-700 px-2 py-1 rounded">/api/webhooks/calendar</code> will receive the meeting data with UTM information.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">3. Dashboard Display</h3>
              <p>The meeting will appear in your dashboard with UTM tags showing the source, medium, campaign, and content parameters.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">4. Zcal Webhook Setup</h3>
              <p>To enable this, you'll need to:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Contact Zcal support to enable webhook notifications</li>
                <li>Configure the webhook URL: <code className="bg-gray-700 px-2 py-1 rounded">https://your-domain.com/api/webhooks/calendar</code></li>
                <li>Test the integration with a sample booking</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Test Meeting */}
        <div className="mt-8 bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Test Meeting Data</h2>
          <div className="bg-gray-700 rounded p-4">
            <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "event_type": "meeting.created",
  "meeting": {
    "id": "test-meeting-123",
    "title": "Discovery Call - Test Client",
    "start_time": "2024-01-20T10:00:00Z",
    "end_time": "2024-01-20T11:00:00Z",
    "attendees": [
      {
        "email": "client@example.com",
        "name": "Test Client"
      }
    ],
    "source": "zcal",
    "booking_url": "${trackedLink}",
    "utm_source": "${utmSource}",
    "utm_medium": "${utmMedium}",
    "utm_campaign": "${utmCampaign}",
    "utm_content": "${utmContent}"
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
} 
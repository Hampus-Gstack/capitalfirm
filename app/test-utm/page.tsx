'use client';

import { useState } from 'react';

export default function TestUTMPage() {
  const [utmSource, setUtmSource] = useState('capitalfirm');
  const [utmMedium, setUtmMedium] = useState('email');
  const [utmCampaign, setUtmCampaign] = useState('discovery_call');
  const [utmContent, setUtmContent] = useState('zcal');
  const [prospectEmail, setProspectEmail] = useState('prospect@company.com');
  const [prospectName, setProspectName] = useState('John Doe');

  const generateUTMLink = () => {
    const utmParams = new URLSearchParams({
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_content: utmContent,
      email: prospectEmail,
      name: prospectName
    });
    return `${window.location.origin}/calendar-booking?${utmParams.toString()}`;
  };

  const trackedLink = generateUTMLink();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Fully Automated UTM Tracking</h1>
        <p className="text-gray-400 mb-8">Generate tracked links for your email campaigns - meetings appear automatically!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* UTM Parameters */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Campaign Settings</h2>
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
                  placeholder="email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">UTM Campaign</label>
                <input
                  type="text"
                  value={utmCampaign}
                  onChange={(e) => setUtmCampaign(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  placeholder="discovery_call"
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
              <div>
                <label className="block text-sm font-medium mb-2">Prospect Email (Optional)</label>
                <input
                  type="email"
                  value={prospectEmail}
                  onChange={(e) => setProspectEmail(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  placeholder="prospect@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Prospect Name (Optional)</label>
                <input
                  type="text"
                  value={prospectName}
                  onChange={(e) => setProspectName(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  placeholder="John Doe"
                />
              </div>
            </div>
          </div>

          {/* Generated Link */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Your Email Link</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tracked Link for Email</label>
                <div className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm break-all">
                  {trackedLink}
                </div>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(trackedLink)}
                className="w-full bg-accent-600 hover:bg-accent-500 text-white px-4 py-2 rounded font-medium transition-colors"
              >
                Copy Email Link
              </button>
            </div>
          </div>
        </div>

        {/* Email Template */}
        <div className="mt-8 bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Email Template</h2>
          <div className="bg-gray-700 rounded p-4">
            <div className="text-sm text-gray-300 space-y-2">
              <p><strong>Subject:</strong> Let's Schedule Your Discovery Call</p>
              <div className="mt-4">
                <p>Hi {prospectName},</p>
                <p className="mt-2">I'd love to schedule a discovery call to discuss your investment needs.</p>
                <p className="mt-2">Please click the link below to book a time that works for you:</p>
                <p className="mt-4 font-mono text-accent-400 break-all">{trackedLink}</p>
                <p className="mt-4">Looking forward to our conversation!</p>
                <p className="mt-2">Best regards,<br/>Your Name</p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works - Fully Automated */}
        <div className="mt-8 bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Fully Automated Workflow</h2>
          <div className="space-y-4 text-gray-300">
            <div className="flex items-start space-x-3">
              <div className="bg-accent-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">1</div>
              <div>
                <h3 className="font-semibold text-white">Send Email</h3>
                <p>Send the generated link to your prospect via email</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-accent-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">2</div>
              <div>
                <h3 className="font-semibold text-white">Prospect Clicks</h3>
                <p>Prospect clicks the link → UTM data captured automatically</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-accent-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">3</div>
              <div>
                <h3 className="font-semibold text-white">Meeting Books</h3>
                <p>Prospect books the meeting through your calendar system</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-accent-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">4</div>
              <div>
                <h3 className="font-semibold text-white">Automatic Creation</h3>
                <p>Meeting automatically appears in your dashboard with UTM tracking - NO MANUAL ENTRY!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Automation Features */}
        <div className="mt-8 bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Automation Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">✅ Automatic Meeting Creation</h3>
              <p className="text-sm text-gray-300">Meetings are created automatically when prospects book through your tracked links</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">✅ UTM Tracking</h3>
              <p className="text-sm text-gray-300">All UTM parameters are captured and stored with each meeting</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">✅ Dashboard Integration</h3>
              <p className="text-sm text-gray-300">Meetings appear in your dashboard with full UTM attribution</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">✅ No Manual Work</h3>
              <p className="text-sm text-gray-300">Zero manual entry required - everything happens automatically</p>
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mt-8 bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Presets</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => {
                setUtmCampaign('discovery_call');
                setUtmMedium('email');
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-medium transition-colors"
            >
              Discovery Call
            </button>
            <button
              onClick={() => {
                setUtmCampaign('follow_up');
                setUtmMedium('email');
              }}
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded font-medium transition-colors"
            >
              Follow Up
            </button>
            <button
              onClick={() => {
                setUtmCampaign('referral');
                setUtmMedium('email');
              }}
              className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded font-medium transition-colors"
            >
              Referral
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
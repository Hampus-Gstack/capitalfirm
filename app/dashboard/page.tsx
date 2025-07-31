'use client';

import { useState, useEffect } from 'react';

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  attendee: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  source: 'calendly' | 'hubspot' | 'google' | 'zcal';
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export default function Dashboard() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [calendarLinks, setCalendarLinks] = useState({
    calendly: 'https://calendly.com/your-calendar',
    hubspot: 'https://meetings.hubspot.com/your-calendar',
    google: 'https://calendar.google.com/your-calendar',
    zcal: 'https://zcal.co/your-calendar'
  });

  // Generate UTM-tracked calendar links
  const generateUTMLink = (baseUrl: string, source: string) => {
    const utmParams = new URLSearchParams({
      utm_source: 'capitalfirm',
      utm_medium: 'dashboard',
      utm_campaign: 'client_meeting',
      utm_content: source
    });
    return `${baseUrl}?${utmParams.toString()}`;
  };

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockMeetings: Meeting[] = [
      {
        id: '1',
        title: 'Investment Review Call',
        date: '2024-01-15',
        time: '10:00 AM',
        attendee: 'John Smith',
        status: 'scheduled',
        source: 'calendly',
        utm_source: 'capitalfirm',
        utm_medium: 'dashboard',
        utm_campaign: 'client_meeting'
      },
      {
        id: '2',
        title: 'Due Diligence Meeting',
        date: '2024-01-18',
        time: '2:00 PM',
        attendee: 'Sarah Johnson',
        status: 'scheduled',
        source: 'hubspot',
        utm_source: 'capitalfirm',
        utm_medium: 'dashboard',
        utm_campaign: 'client_meeting'
      }
    ];
    setMeetings(mockMeetings);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'calendly': return '📅';
      case 'hubspot': return '🔗';
      case 'google': return '📊';
      case 'zcal': return '⚡';
      default: return '📅';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold">Capital Firm Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">Welcome back,</span>
              <span className="font-semibold">Client Name</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview' },
              { id: 'meetings', name: 'Meetings' },
              { id: 'investments', name: 'Investments' },
              { id: 'documents', name: 'Documents' },
              { id: 'crm', name: 'CRM' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-accent-500 text-accent-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Quick Stats */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Total Investments</h3>
              <p className="text-3xl font-bold text-accent-400">$2.5M</p>
              <p className="text-sm text-gray-400">+12% from last month</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Active Deals</h3>
              <p className="text-3xl font-bold text-green-400">8</p>
              <p className="text-sm text-gray-400">3 in due diligence</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Scheduled Meetings</h3>
              <p className="text-3xl font-bold text-blue-400">{meetings.filter(m => m.status === 'scheduled').length}</p>
              <p className="text-sm text-gray-400">This week</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Portfolio Companies</h3>
              <p className="text-3xl font-bold text-purple-400">15</p>
              <p className="text-sm text-gray-400">+2 this quarter</p>
            </div>
          </div>
        )}

        {activeTab === 'meetings' && (
          <div className="space-y-6">
            {/* Meeting Tracking Section */}
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Meeting Tracking</h2>
                <button className="bg-accent-600 hover:bg-accent-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Add Meeting
                </button>
              </div>

              {/* Calendar Integration Setup */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">UTM Tracking Links</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Use these links to track meetings from your calendar systems:
                  </p>
                  <div className="space-y-3">
                    {Object.entries(calendarLinks).map(([platform, baseUrl]) => (
                      <div key={platform} className="flex items-center space-x-3">
                        <span className="text-sm font-medium capitalize">{platform}:</span>
                        <input
                          type="text"
                          value={generateUTMLink(baseUrl, platform)}
                          readOnly
                          className="flex-1 bg-gray-600 border border-gray-500 rounded px-3 py-2 text-sm"
                        />
                        <button
                          onClick={() => navigator.clipboard.writeText(generateUTMLink(baseUrl, platform))}
                          className="text-accent-400 hover:text-accent-300 text-sm"
                        >
                          Copy
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">API Integration</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Connect your calendar systems for automatic meeting tracking:
                  </p>
                  <div className="space-y-3">
                    <button className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-medium transition-colors">
                      Connect Calendly
                    </button>
                    <button className="w-full bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded font-medium transition-colors">
                      Connect HubSpot
                    </button>
                    <button className="w-full bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded font-medium transition-colors">
                      Connect Google Calendar
                    </button>
                    <button className="w-full bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded font-medium transition-colors">
                      Connect Zcal
                    </button>
                  </div>
                </div>
              </div>

              {/* Meetings List */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Recent Meetings</h3>
                <div className="space-y-3">
                  {meetings.map((meeting) => (
                    <div key={meeting.id} className="flex items-center justify-between p-4 bg-gray-600 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{getSourceIcon(meeting.source)}</span>
                        <div>
                          <h4 className="font-semibold">{meeting.title}</h4>
                          <p className="text-sm text-gray-400">
                            {meeting.date} at {meeting.time} • {meeting.attendee}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
                          {meeting.status}
                        </span>
                        <button className="text-accent-400 hover:text-accent-300 text-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'investments' && (
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6">Investment Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Active Investments</h3>
                <p className="text-2xl font-bold text-green-400">$1.8M</p>
                <p className="text-sm text-gray-400">8 companies</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Total Return</h3>
                <p className="text-2xl font-bold text-accent-400">+24.5%</p>
                <p className="text-sm text-gray-400">YTD performance</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Average IRR</h3>
                <p className="text-2xl font-bold text-blue-400">18.2%</p>
                <p className="text-sm text-gray-400">Portfolio average</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6">Document Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Due Diligence</h3>
                <p className="text-2xl font-bold text-yellow-400">12</p>
                <p className="text-sm text-gray-400">Documents pending</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Legal Documents</h3>
                <p className="text-2xl font-bold text-blue-400">8</p>
                <p className="text-sm text-gray-400">Contracts signed</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Financial Reports</h3>
                <p className="text-2xl font-bold text-green-400">24</p>
                <p className="text-sm text-gray-400">Reports uploaded</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'crm' && (
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6">CRM Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Total Contacts</h3>
                <p className="text-2xl font-bold text-accent-400">156</p>
                <p className="text-sm text-gray-400">+12 this month</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Active Deals</h3>
                <p className="text-2xl font-bold text-green-400">23</p>
                <p className="text-sm text-gray-400">In pipeline</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Meetings This Week</h3>
                <p className="text-2xl font-bold text-blue-400">8</p>
                <p className="text-sm text-gray-400">Scheduled</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Follow-ups</h3>
                <p className="text-2xl font-bold text-yellow-400">15</p>
                <p className="text-sm text-gray-400">Pending</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
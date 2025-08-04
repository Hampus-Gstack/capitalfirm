'use client';

import { useState } from 'react';

export default function DebugPage() {
  const [bookingSessions, setBookingSessions] = useState<any[]>([]);
  const [meetings, setMeetings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const testBookingSessions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/booking-sessions');
      if (response.ok) {
        const data = await response.json();
        setBookingSessions(data.bookingSessions || []);
      } else {
        console.error('Failed to fetch booking sessions:', response.status);
      }
    } catch (error) {
      console.error('Error fetching booking sessions:', error);
    }
    setLoading(false);
  };

  const testMeetings = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/meetings');
      if (response.ok) {
        const data = await response.json();
        setMeetings(data.meetings || []);
      } else {
        console.error('Failed to fetch meetings:', response.status);
      }
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
    setLoading(false);
  };

  const createTestBooking = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/booking-sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          utm_source: 'test',
          utm_medium: 'test',
          utm_campaign: 'test',
          utm_content: 'test',
          prospect_email: 'test@example.com',
          prospect_name: 'Test User',
          timestamp: new Date().toISOString(),
          referrer: 'test',
          session_id: `test-${Date.now()}`,
          status: 'pending',
          calendar_url: 'https://zcal.co/hampusg/discovery-call'
        })
      });

      if (response.ok) {
        console.log('Test booking session created');
        await testBookingSessions();
      } else {
        console.error('Failed to create test booking session:', response.status);
      }
    } catch (error) {
      console.error('Error creating test booking session:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Debug Page</h1>
        
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">API Tests</h2>
            <div className="space-y-4">
              <button
                onClick={testBookingSessions}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-medium transition-colors disabled:opacity-50"
              >
                Test Booking Sessions API
              </button>
              
              <button
                onClick={testMeetings}
                disabled={loading}
                className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded font-medium transition-colors disabled:opacity-50"
              >
                Test Meetings API
              </button>
              
              <button
                onClick={createTestBooking}
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded font-medium transition-colors disabled:opacity-50"
              >
                Create Test Booking Session
              </button>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Booking Sessions ({bookingSessions.length})</h2>
            <div className="space-y-2">
              {bookingSessions.map((session, index) => (
                <div key={index} className="bg-gray-700 rounded p-4">
                  <pre className="text-sm overflow-auto">{JSON.stringify(session, null, 2)}</pre>
                </div>
              ))}
              {bookingSessions.length === 0 && (
                <p className="text-gray-400">No booking sessions found</p>
              )}
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Meetings ({meetings.length})</h2>
            <div className="space-y-2">
              {meetings.map((meeting, index) => (
                <div key={index} className="bg-gray-700 rounded p-4">
                  <pre className="text-sm overflow-auto">{JSON.stringify(meeting, null, 2)}</pre>
                </div>
              ))}
              {meetings.length === 0 && (
                <p className="text-gray-400">No meetings found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
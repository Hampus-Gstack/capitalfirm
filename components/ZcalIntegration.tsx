'use client'
import { useState } from 'react'
import { CalendarIcon, ClockIcon, UserGroupIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

interface Meeting {
  id: string
  title: string
  date: string
  time: string
  duration: number
  attendees: string[]
  status: 'scheduled' | 'completed' | 'cancelled'
  zcalLink?: string
}

interface ZcalIntegrationProps {
  onMeetingScheduled?: (meeting: Meeting) => void
  onMeetingUpdated?: (meeting: Meeting) => void
}

export default function ZcalIntegration({ onMeetingScheduled, onMeetingUpdated }: ZcalIntegrationProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Series A Pitch - ABC Ventures',
      date: '2024-01-15',
      time: '10:00 AM',
      duration: 60,
      attendees: ['John Smith', 'Sarah Johnson (ABC Ventures)'],
      status: 'scheduled',
      zcalLink: 'https://zcal.co/abc-ventures-meeting'
    },
    {
      id: '2',
      title: 'Follow-up Call - XYZ Capital',
      date: '2024-01-17',
      time: '2:00 PM',
      duration: 30,
      attendees: ['John Smith', 'Mike Chen (XYZ Capital)'],
      status: 'scheduled',
      zcalLink: 'https://zcal.co/xyz-capital-followup'
    }
  ])

  const connectZcal = async () => {
    setIsLoading(true)
    // Simulate Zcal API connection
    setTimeout(() => {
      setIsConnected(true)
      setIsLoading(false)
    }, 2000)
  }

  const scheduleMeeting = async (meetingData: Partial<Meeting>) => {
    setIsLoading(true)
    // Simulate scheduling a meeting via Zcal API
    setTimeout(() => {
      const newMeeting: Meeting = {
        id: Date.now().toString(),
        title: meetingData.title || 'New Meeting',
        date: meetingData.date || new Date().toISOString().split('T')[0],
        time: meetingData.time || '10:00 AM',
        duration: meetingData.duration || 30,
        attendees: meetingData.attendees || [],
        status: 'scheduled',
        zcalLink: `https://zcal.co/meeting-${Date.now()}`
      }
      
      setMeetings([...meetings, newMeeting])
      onMeetingScheduled?.(newMeeting)
      setIsLoading(false)
    }, 1500)
  }

  const updateMeeting = async (meetingId: string, updates: Partial<Meeting>) => {
    setIsLoading(true)
    // Simulate updating a meeting via Zcal API
    setTimeout(() => {
      const updatedMeetings = meetings.map(meeting => 
        meeting.id === meetingId 
          ? { ...meeting, ...updates }
          : meeting
      )
      setMeetings(updatedMeetings)
      
      const updatedMeeting = updatedMeetings.find(m => m.id === meetingId)
      if (updatedMeeting) {
        onMeetingUpdated?.(updatedMeeting)
      }
      setIsLoading(false)
    }, 1000)
  }

  const syncMeetings = async () => {
    setIsLoading(true)
    // Simulate syncing meetings from Zcal
    setTimeout(() => {
      // This would fetch meetings from Zcal API
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Zcal Integration</h3>
          <p className="text-sm text-gray-400">Automated meeting scheduling and CRM sync</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
          <span className="text-sm text-gray-400">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      {!isConnected ? (
        <div className="text-center">
          <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">
            Connect your Zcal account to automatically sync meetings and update your CRM
          </p>
          <button
            onClick={connectZcal}
            disabled={isLoading}
            className="bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? 'Connecting...' : 'Connect Zcal Account'}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => scheduleMeeting({})}
              disabled={isLoading}
              className="bg-accent-500/10 hover:bg-accent-500/20 text-accent-400 px-4 py-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              Schedule Meeting
            </button>
            <button
              onClick={syncMeetings}
              disabled={isLoading}
              className="bg-accent-500/10 hover:bg-accent-500/20 text-accent-400 px-4 py-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              Sync Meetings
            </button>
            <button className="bg-accent-500/10 hover:bg-accent-500/20 text-accent-400 px-4 py-3 rounded-lg text-sm font-medium transition-colors">
              View Calendar
            </button>
          </div>

          {/* Recent Meetings */}
          <div>
            <h4 className="text-md font-semibold text-white mb-4">Recent Meetings</h4>
            <div className="space-y-3">
              {meetings.map((meeting) => (
                <div key={meeting.id} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h5 className="text-sm font-medium text-white">{meeting.title}</h5>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                        <div className="flex items-center space-x-1">
                          <CalendarIcon className="h-3 w-3" />
                          <span>{new Date(meeting.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="h-3 w-3" />
                          <span>{meeting.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <UserGroupIcon className="h-3 w-3" />
                          <span>{meeting.attendees.length} attendees</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        meeting.status === 'completed' 
                          ? 'bg-green-500/10 text-green-400'
                          : meeting.status === 'cancelled'
                          ? 'bg-red-500/10 text-red-400'
                          : 'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {meeting.status}
                      </span>
                      {meeting.zcalLink && (
                        <a
                          href={meeting.zcalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent-400 hover:text-accent-300 text-xs"
                        >
                          View
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Integration Status */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-medium text-white mb-3">Integration Status</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Calendar Sync</span>
                <CheckCircleIcon className="h-4 w-4 text-green-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">CRM Updates</span>
                <CheckCircleIcon className="h-4 w-4 text-green-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Meeting Reminders</span>
                <CheckCircleIcon className="h-4 w-4 text-green-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Auto Follow-ups</span>
                <CheckCircleIcon className="h-4 w-4 text-green-400" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 
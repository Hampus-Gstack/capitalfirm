'use client'
import { useState } from 'react'
import Link from 'next/link'
import { 
  ChartBarIcon, 
  DocumentTextIcon, 
  CalendarIcon, 
  UserGroupIcon,
  BellIcon,
  CogIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

// Mock data - in a real app, this would come from an API
const dashboardData = {
  client: {
    name: "John Smith",
    company: "TechStart Inc.",
    email: "john@techstart.com",
    avatar: "JS"
  },
  stats: {
    totalRaised: "$2.5M",
    activeInvestors: 12,
    meetingsThisMonth: 8,
    documentsPending: 3
  },
  recentActivity: [
    {
      id: 1,
      type: "meeting",
      title: "Investor Meeting - Series A",
      description: "Meeting with ABC Ventures scheduled for tomorrow",
      time: "2 hours ago",
      status: "upcoming"
    },
    {
      id: 2,
      type: "document",
      title: "Due Diligence Package",
      description: "Financial documents uploaded and ready for review",
      time: "1 day ago",
      status: "completed"
    },
    {
      id: 3,
      type: "investor",
      title: "New Investor Interest",
      description: "XYZ Capital expressed interest in your round",
      time: "3 days ago",
      status: "new"
    }
  ],
  upcomingMeetings: [
    {
      id: 1,
      title: "Series A Pitch - ABC Ventures",
      date: "2024-01-15",
      time: "10:00 AM",
      duration: "60 min",
      attendees: ["John Smith", "Sarah Johnson (ABC Ventures)"],
      status: "confirmed"
    },
    {
      id: 2,
      title: "Follow-up Call - XYZ Capital",
      date: "2024-01-17",
      time: "2:00 PM",
      duration: "30 min",
      attendees: ["John Smith", "Mike Chen (XYZ Capital)"],
      status: "pending"
    }
  ],
  contracts: [
    {
      id: 1,
      title: "Series A Term Sheet",
      status: "pending",
      lastUpdated: "2024-01-10",
      progress: 75
    },
    {
      id: 2,
      title: "Due Diligence Agreement",
      status: "completed",
      lastUpdated: "2024-01-08",
      progress: 100
    },
    {
      id: 3,
      title: "Investment Agreement",
      status: "draft",
      lastUpdated: "2024-01-12",
      progress: 25
    }
  ]
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-400/10'
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10'
      case 'draft':
        return 'text-gray-400 bg-gray-400/10'
      case 'new':
        return 'text-blue-400 bg-blue-400/10'
      default:
        return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-4 w-4" />
      case 'pending':
        return <ClockIcon className="h-4 w-4" />
      case 'new':
        return <ExclamationTriangleIcon className="h-4 w-4" />
      default:
        return <ClockIcon className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="mr-8">
                <span className="text-xl font-bold gradient-text">Capital Firm</span>
              </Link>
              <nav className="hidden md:flex space-x-8">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === 'overview' 
                      ? 'text-accent-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('contracts')}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === 'contracts' 
                      ? 'text-accent-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Contracts
                </button>
                <button
                  onClick={() => setActiveTab('meetings')}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === 'meetings' 
                      ? 'text-accent-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Meetings
                </button>
                <button
                  onClick={() => setActiveTab('crm')}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === 'crm' 
                      ? 'text-accent-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  CRM
                </button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-white transition-colors">
                <BellIcon className="h-6 w-6" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <CogIcon className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {dashboardData.client.avatar}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-white">{dashboardData.client.name}</p>
                  <p className="text-xs text-gray-400">{dashboardData.client.company}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-accent-500/10 rounded-lg">
                    <ChartBarIcon className="h-6 w-6 text-accent-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Total Raised</p>
                    <p className="text-2xl font-bold text-white">{dashboardData.stats.totalRaised}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <UserGroupIcon className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Active Investors</p>
                    <p className="text-2xl font-bold text-white">{dashboardData.stats.activeInvestors}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <CalendarIcon className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Meetings This Month</p>
                    <p className="text-2xl font-bold text-white">{dashboardData.stats.meetingsThisMonth}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <DocumentTextIcon className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Documents Pending</p>
                    <p className="text-2xl font-bold text-white">{dashboardData.stats.documentsPending}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity and Upcoming Meetings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {dashboardData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${getStatusColor(activity.status)}`}>
                        {getStatusIcon(activity.status)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{activity.title}</p>
                        <p className="text-sm text-gray-400">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Meetings */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Upcoming Meetings</h3>
                <div className="space-y-4">
                  {dashboardData.upcomingMeetings.map((meeting) => (
                    <div key={meeting.id} className="border border-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white">{meeting.title}</h4>
                          <p className="text-sm text-gray-400 mt-1">
                            {new Date(meeting.date).toLocaleDateString()} at {meeting.time}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {meeting.duration} • {meeting.attendees.length} attendees
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          meeting.status === 'confirmed' 
                            ? 'bg-green-500/10 text-green-400' 
                            : 'bg-yellow-500/10 text-yellow-400'
                        }`}>
                          {meeting.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Link 
                  href="/dashboard/meetings"
                  className="inline-flex items-center text-accent-400 hover:text-accent-300 text-sm font-medium mt-4"
                >
                  View all meetings
                  <ArrowRightIcon className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contracts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Contracts & Documents</h2>
              <button className="bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200">
                Upload Document
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardData.contracts.map((contract) => (
                <div key={contract.id} className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">{contract.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                      {contract.status}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                      <span>Progress</span>
                      <span>{contract.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-accent-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${contract.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-4">
                    Last updated: {new Date(contract.lastUpdated).toLocaleDateString()}
                  </p>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                      View
                    </button>
                    <button className="flex-1 bg-accent-500/10 hover:bg-accent-500/20 text-accent-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'meetings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Meetings & Schedule</h2>
              <button className="bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200">
                Schedule Meeting
              </button>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Upcoming Meetings</h3>
                  <div className="space-y-4">
                    {dashboardData.upcomingMeetings.map((meeting) => (
                      <div key={meeting.id} className="border border-gray-700 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-white">{meeting.title}</h4>
                            <p className="text-sm text-gray-400 mt-1">
                              {new Date(meeting.date).toLocaleDateString()} at {meeting.time}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {meeting.duration} • {meeting.attendees.join(', ')}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            meeting.status === 'confirmed' 
                              ? 'bg-green-500/10 text-green-400' 
                              : 'bg-yellow-500/10 text-yellow-400'
                          }`}>
                            {meeting.status}
                          </span>
                        </div>
                        <div className="mt-3 flex space-x-2">
                          <button className="bg-accent-500/10 hover:bg-accent-500/20 text-accent-400 px-3 py-1 rounded text-xs font-medium transition-colors">
                            Join Meeting
                          </button>
                          <button className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors">
                            Reschedule
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Calendar Integration</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-white mb-2">Zapier Integration</h4>
                      <p className="text-sm text-gray-400 mb-3">
                        Automatically sync meetings with your calendar and CRM
                      </p>
                      <button className="bg-accent-500/10 hover:bg-accent-500/20 text-accent-400 px-3 py-2 rounded text-sm font-medium transition-colors">
                        Configure Integration
                      </button>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-white mb-2">Meeting Templates</h4>
                      <p className="text-sm text-gray-400 mb-3">
                        Pre-configured meeting types for different investor stages
                      </p>
                      <button className="bg-accent-500/10 hover:bg-accent-500/20 text-accent-400 px-3 py-2 rounded text-sm font-medium transition-colors">
                        View Templates
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'crm' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">CRM & Investor Relations</h2>
              <button className="bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200">
                Add Contact
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Investor Pipeline */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Investor Pipeline</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-white">Initial Contact</p>
                      <p className="text-xs text-gray-400">5 investors</p>
                    </div>
                    <span className="text-accent-400 text-sm font-medium">→</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-white">Due Diligence</p>
                      <p className="text-xs text-gray-400">3 investors</p>
                    </div>
                    <span className="text-accent-400 text-sm font-medium">→</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-white">Term Sheet</p>
                      <p className="text-xs text-gray-400">2 investors</p>
                    </div>
                    <span className="text-accent-400 text-sm font-medium">→</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-white">Closed</p>
                      <p className="text-xs text-green-400">1 investor</p>
                    </div>
                    <CheckCircleIcon className="h-4 w-4 text-green-400" />
                  </div>
                </div>
              </div>

              {/* Recent Interactions */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Interactions</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent-400 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-white">Follow-up email sent</p>
                      <p className="text-xs text-gray-400">ABC Ventures • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-white">Meeting scheduled</p>
                      <p className="text-xs text-gray-400">XYZ Capital • 1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-white">Documents requested</p>
                      <p className="text-xs text-gray-400">DEF Partners • 3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-accent-500/10 hover:bg-accent-500/20 text-accent-400 px-4 py-3 rounded-lg text-sm font-medium transition-colors">
                    Send Investor Update
                  </button>
                  <button className="w-full bg-accent-500/10 hover:bg-accent-500/20 text-accent-400 px-4 py-3 rounded-lg text-sm font-medium transition-colors">
                    Schedule Follow-up
                  </button>
                  <button className="w-full bg-accent-500/10 hover:bg-accent-500/20 text-accent-400 px-4 py-3 rounded-lg text-sm font-medium transition-colors">
                    Export Contact List
                  </button>
                  <button className="w-full bg-accent-500/10 hover:bg-accent-500/20 text-accent-400 px-4 py-3 rounded-lg text-sm font-medium transition-colors">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 
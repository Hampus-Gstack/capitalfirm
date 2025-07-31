'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

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

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'not_started' | 'in_progress' | 'in_review' | 'done';
  stage: string;
  assignee: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

interface Stage {
  id: string;
  name: string;
  order: number;
  status: 'not_started' | 'in_progress' | 'completed';
  tasks: Task[];
}

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [activeTab, setActiveTab] = useState(() => {
    return searchParams.get('tab') || 'overview';
  });
  const [calendarLinks, setCalendarLinks] = useState({
    calendly: 'https://calendly.com/your-calendar',
    hubspot: 'https://meetings.hubspot.com/your-calendar',
    google: 'https://calendar.google.com/your-calendar',
    zcal: 'https://zcal.co/your-calendar'
  });

  const [showCalendarSetup, setShowCalendarSetup] = useState(false);
  const [stages, setStages] = useState<Stage[]>([
    {
      id: '1',
      name: 'Stage 1: Onboarding',
      order: 1,
      status: 'not_started',
      tasks: [
        {
          id: '1',
          title: 'Onboarding',
          description: 'Complete client onboarding process',
          status: 'not_started',
          stage: '1',
          assignee: 'Team',
          priority: 'high',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15'
        }
      ]
    },
    {
      id: '2',
      name: 'Stage 2: Setup',
      order: 2,
      status: 'not_started',
      tasks: [
        {
          id: '2',
          title: 'Technical Setup',
          description: 'Configure technical infrastructure',
          status: 'not_started',
          stage: '2',
          assignee: 'Team',
          priority: 'high',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15'
        },
        {
          id: '3',
          title: 'ICP',
          description: 'Define Ideal Customer Profile',
          status: 'not_started',
          stage: '2',
          assignee: 'Team',
          priority: 'medium',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15'
        },
        {
          id: '4',
          title: 'Pitch Deck',
          description: 'Create investor pitch deck',
          status: 'not_started',
          stage: '2',
          assignee: 'Team',
          priority: 'high',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15'
        },
        {
          id: '5',
          title: 'Investor Presentation',
          description: 'Prepare investor presentation materials',
          status: 'not_started',
          stage: '2',
          assignee: 'Team',
          priority: 'high',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15'
        }
      ]
    },
    {
      id: '3',
      name: 'Stage 3: Campaigns',
      order: 3,
      status: 'not_started',
      tasks: [
        {
          id: '6',
          title: 'List Scraping',
          description: 'Scrape and compile investor lists',
          status: 'not_started',
          stage: '3',
          assignee: 'Team',
          priority: 'medium',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15'
        },
        {
          id: '7',
          title: 'Campaign Setup',
          description: 'Set up outreach campaigns',
          status: 'not_started',
          stage: '3',
          assignee: 'Team',
          priority: 'high',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15'
        },
        {
          id: '8',
          title: 'Kick-Off',
          description: 'Launch investor outreach campaign',
          status: 'not_started',
          stage: '3',
          assignee: 'Team',
          priority: 'high',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15'
        }
      ]
    },
    {
      id: '4',
      name: 'Stage 4: Placement',
      order: 4,
      status: 'not_started',
      tasks: []
    },
    {
      id: '5',
      name: 'Stage 5: Reporting',
      order: 5,
      status: 'not_started',
      tasks: [
        {
          id: '9',
          title: 'Reporting',
          description: 'Generate campaign reports and analytics',
          status: 'not_started',
          stage: '5',
          assignee: 'Team',
          priority: 'medium',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15'
        }
      ]
    }
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

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

  // Update URL when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams);
    params.set('tab', tab);
    router.push(`/dashboard?${params.toString()}`, { scroll: false });
  };

  // Sync URL state on mount
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams, activeTab]);

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

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'not_started': return 'bg-gray-500';
      case 'in_progress': return 'bg-blue-500';
      case 'in_review': return 'bg-orange-500';
      case 'done': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const updateTaskStatus = (taskId: string, newStatus: string) => {
    setStages(prevStages => 
      prevStages.map(stage => ({
        ...stage,
        tasks: stage.tasks.map(task => 
          task.id === taskId 
            ? { ...task, status: newStatus as any, updatedAt: new Date().toISOString().split('T')[0] }
            : task
        )
      }))
    );
  };

  const updateStageStatus = (stageId: string, newStatus: string) => {
    setStages(prevStages => 
      prevStages.map(stage => 
        stage.id === stageId 
          ? { ...stage, status: newStatus as any }
          : stage
      )
    );
  };

  const getTasksByStatus = (status: string) => {
    return stages.flatMap(stage => stage.tasks).filter(task => task.status === status);
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
              { id: 'crm', name: 'CRM' },
              { id: 'project-management', name: 'Project Management' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
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

        {activeTab === 'project-management' && (
          <div className="space-y-8">
            {/* Project Overview */}
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Project Management</h2>
                <button 
                  onClick={() => setShowNewTaskModal(true)}
                  className="bg-accent-600 hover:bg-accent-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  + New Task
                </button>
              </div>

              {/* Progress Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Progress</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Onboarding</span>
                      <span className="text-xs text-gray-400">Stage 1</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Setup</span>
                      <span className="text-xs text-gray-400">Stage 2</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Campaigns</span>
                      <span className="text-xs text-gray-400">Stage 3</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stages Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Stages</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {stages.map((stage) => (
                    <div key={stage.id} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{stage.name}</span>
                        <span className={`w-2 h-2 rounded-full ${getTaskStatusColor(stage.status)}`}></span>
                      </div>
                      <p className="text-xs text-gray-400 mb-3">{stage.tasks.length} tasks</p>
                      <div className="space-y-2">
                        {stage.tasks.slice(0, 2).map((task) => (
                          <div key={task.id} className="text-xs text-gray-300">
                            • {task.title}
                          </div>
                        ))}
                        {stage.tasks.length > 2 && (
                          <div className="text-xs text-gray-400">
                            +{stage.tasks.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kanban Board */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Task Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { status: 'not_started', title: 'Not Started', count: getTasksByStatus('not_started').length },
                    { status: 'in_progress', title: 'In Progress', count: getTasksByStatus('in_progress').length },
                    { status: 'in_review', title: 'In Review', count: getTasksByStatus('in_review').length },
                    { status: 'done', title: 'Done', count: getTasksByStatus('done').length }
                  ].map((column) => (
                    <div key={column.status} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">{column.title}</h4>
                        <span className="text-sm text-gray-400">{column.count}</span>
                      </div>
                      <div className="space-y-2">
                        {getTasksByStatus(column.status).map((task) => (
                          <div 
                            key={task.id} 
                            className="bg-gray-600 rounded p-3 cursor-pointer hover:bg-gray-500 transition-colors"
                            onClick={() => {
                              setSelectedTask(task);
                              setShowTaskModal(true);
                            }}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">{task.title}</span>
                              <span className={`text-xs ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-400">{task.assignee}</span>
                              <span className={`w-2 h-2 rounded-full ${getTaskStatusColor(task.status)}`}></span>
                            </div>
                          </div>
                        ))}
                        <button 
                          onClick={() => setShowNewTaskModal(true)}
                          className="w-full text-center text-sm text-gray-400 hover:text-gray-300 py-2 border-2 border-dashed border-gray-600 rounded hover:border-gray-500 transition-colors"
                        >
                          + Add Task
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold">UTM Tracking Links</h3>
                    <button
                      onClick={() => setShowCalendarSetup(!showCalendarSetup)}
                      className="text-accent-400 hover:text-accent-300 text-sm"
                    >
                      {showCalendarSetup ? 'Hide Setup' : 'Setup URLs'}
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    Use these links to track meetings from your calendar systems:
                  </p>
                  
                  {showCalendarSetup && (
                    <div className="mb-4 p-4 bg-gray-600 rounded-lg">
                      <h4 className="text-sm font-semibold mb-3">Update Your Calendar URLs:</h4>
                      {Object.entries(calendarLinks).map(([platform, baseUrl]) => (
                        <div key={platform} className="mb-3">
                          <label className="text-xs text-gray-400 capitalize">{platform}:</label>
                          <input
                            type="text"
                            value={baseUrl}
                            onChange={(e) => setCalendarLinks(prev => ({
                              ...prev,
                              [platform]: e.target.value
                            }))}
                            placeholder={`Enter your ${platform} calendar URL`}
                            className="w-full bg-gray-500 border border-gray-400 rounded px-3 py-2 text-sm mt-1"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  
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
                    <button 
                      onClick={() => {
                        alert('Calendly Integration:\n\n1. Go to Calendly.com > Integrations\n2. Create API key\n3. Add webhook: https://capitalfirm-vert.vercel.app/api/webhooks/calendar\n4. Add CALENDLY_API_KEY to your environment variables');
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-medium transition-colors"
                    >
                      Connect Calendly
                    </button>
                    <button 
                      onClick={() => {
                        alert('HubSpot Integration:\n\n1. Go to HubSpot Settings > Calendar\n2. Enable calendar integration\n3. Add webhook: https://capitalfirm-vert.vercel.app/api/webhooks/calendar\n4. Add HUBSPOT_API_KEY to your environment variables');
                      }}
                      className="w-full bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded font-medium transition-colors"
                    >
                      Connect HubSpot
                    </button>
                    <button 
                      onClick={() => {
                        alert('Google Calendar Integration:\n\n1. Go to Google Cloud Console\n2. Enable Google Calendar API\n3. Create OAuth credentials\n4. Add GOOGLE_CLIENT_ID to your environment variables');
                      }}
                      className="w-full bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded font-medium transition-colors"
                    >
                      Connect Google Calendar
                    </button>
                    <button 
                      onClick={() => {
                        alert('Zcal Integration:\n\n1. Contact Zcal support for API access\n2. Get API key and webhook URL\n3. Add ZCAL_API_KEY to your environment variables');
                      }}
                      className="w-full bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded font-medium transition-colors"
                    >
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

      {/* Task Modal */}
      {showTaskModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Task Details</h3>
              <button 
                onClick={() => setShowTaskModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={selectedTask.title}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={selectedTask.description || ''}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  rows={3}
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={selectedTask.status}
                  onChange={(e) => updateTaskStatus(selectedTask.id, e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                >
                  <option value="not_started">Not Started</option>
                  <option value="in_progress">In Progress</option>
                  <option value="in_review">In Review</option>
                  <option value="done">Done</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Assignee</label>
                <input
                  type="text"
                  value={selectedTask.assignee}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Priority</label>
                <span className={`text-sm ${getPriorityColor(selectedTask.priority)}`}>
                  {selectedTask.priority}
                </span>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowTaskModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
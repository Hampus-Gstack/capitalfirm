'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

// Import types from the main dashboard
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
  utm_content?: string;
  meeting_url?: string;
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
  tags?: string[];
  estimatedHours?: number;
  actualHours?: number;
}

interface Stage {
  id: string;
  name: string;
  order: number;
  status: 'not_started' | 'in_progress' | 'completed';
  tasks: Task[];
  color: string;
  icon: string;
}

interface Deal {
  id: string;
  title: string;
  company: string;
  contact: string;
  email: string;
  phone?: string;
  value: number;
  stage: string;
  probability: number;
  closeDate: string;
  source: string;
  description?: string;
  lastActivity: string;
  createdAt: string;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
}

interface PipelineStage {
  id: string;
  name: string;
  color: string;
  deals: Deal[];
  order: number;
}

export default function AdminClientDashboard({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [clientId] = useState(params.id)
  const [clientName, setClientName] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [stages, setStages] = useState<Stage[]>([])
  const [pipelineStages, setPipelineStages] = useState<PipelineStage[]>([])

  // Initialize client data based on ID
  useEffect(() => {
    // In a real app, you'd fetch this from an API
    const clientData = {
      '1': { name: 'John Smith', company: 'TechStart Inc.' },
      '2': { name: 'Sarah Johnson', company: 'Innovate Co.' },
      '3': { name: 'Mike Chen', company: 'GreenTech Solutions' },
      '4': { name: 'Emily Davis', company: 'DataFlow Analytics' },
      '5': { name: 'Alex Rodriguez', company: 'HealthTech Pro' }
    }
    
    const client = clientData[clientId as keyof typeof clientData]
    if (client) {
      setClientName(`${client.name} (${client.company})`)
    } else {
      setClientName('Unknown Client')
    }

    // Initialize sample data for this client
    initializeClientData()
  }, [clientId])

  const initializeClientData = () => {
    // Sample meetings for this client
    setMeetings([
      {
        id: '1',
        title: 'Discovery Call',
        date: '2024-01-20',
        time: '10:00',
        attendee: clientName || 'Client',
        status: 'scheduled',
        source: 'zcal',
        utm_source: 'capitalfirm',
        utm_medium: 'email',
        utm_campaign: 'discovery_call'
      }
    ])

    // Sample project stages for this client
    setStages([
      {
        id: 'onboarding',
        name: 'Onboarding',
        order: 1,
        status: 'completed',
        color: 'from-blue-500 to-cyan-500',
        icon: '🚀',
        tasks: [
          {
            id: '1',
            title: 'Client Welcome Package',
            description: 'Send welcome materials and setup instructions',
            status: 'done',
            stage: 'onboarding',
            assignee: 'Admin',
            priority: 'high',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
          }
        ]
      },
      {
        id: 'setup',
        name: 'Setup',
        order: 2,
        status: 'in_progress',
        color: 'from-orange-500 to-red-500',
        icon: '⚙️',
        tasks: [
          {
            id: '2',
            title: 'Account Configuration',
            description: 'Setup client accounts and access permissions',
            status: 'in_progress',
            stage: 'setup',
            assignee: 'Admin',
            priority: 'high',
            createdAt: '2024-01-02T00:00:00Z',
            updatedAt: '2024-01-02T00:00:00Z'
          }
        ]
      }
    ])

    // Sample CRM pipeline for this client
    setPipelineStages([
      {
        id: 'lead',
        name: 'Leads',
        color: 'from-blue-500 to-cyan-500',
        order: 1,
        deals: [
          {
            id: '1',
            title: 'Series A Funding',
            company: clientName || 'Client Company',
            contact: 'Contact Person',
            email: 'contact@company.com',
            value: 2500000,
            stage: 'lead',
            probability: 25,
            closeDate: '2024-03-15',
            source: 'Website',
            lastActivity: new Date().toISOString(),
            createdAt: '2024-01-01T00:00:00Z',
            tags: ['series-a', 'tech'],
            priority: 'high'
          }
        ]
      },
      {
        id: 'qualified',
        name: 'Qualified',
        color: 'from-orange-500 to-yellow-500',
        order: 2,
        deals: []
      },
      {
        id: 'proposal',
        name: 'Proposal',
        color: 'from-purple-500 to-pink-500',
        order: 3,
        deals: []
      },
      {
        id: 'negotiation',
        name: 'Negotiation',
        color: 'from-red-500 to-orange-500',
        order: 4,
        deals: []
      },
      {
        id: 'closed',
        name: 'Closed Won',
        color: 'from-green-500 to-emerald-500',
        order: 5,
        deals: []
      }
    ])
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleDragEnd = (result: DropResult) => {
    // Handle task drag and drop
    if (!result.destination) return
    
    // Implementation would update task status/stage
    console.log('Task moved:', result)
  }

  const handlePipelineDragEnd = (result: DropResult) => {
    // Handle deal drag and drop
    if (!result.destination) return
    
    // Implementation would update deal stage
    console.log('Deal moved:', result)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <button
                onClick={() => router.back()}
                className="text-accent-400 hover:text-accent-300 mb-2 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Clients</span>
              </button>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-accent-400 to-purple-400 bg-clip-text text-transparent">
                Client Dashboard - {clientName}
              </h1>
              <p className="text-gray-400 mt-1">Manage all aspects of this client's project</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-green-400 font-medium">Admin View</span>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview' },
              { id: 'meetings', name: 'Meetings' },
              { id: 'project-management', name: 'Project Management' },
              { id: 'crm', name: 'CRM Pipeline' },
              { id: 'documents', name: 'Documents' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
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
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
                <h3 className="text-lg font-semibold mb-2">Project Progress</h3>
                <p className="text-3xl font-bold text-blue-400">65%</p>
                <p className="text-sm text-gray-400">Overall completion</p>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
                <h3 className="text-lg font-semibold mb-2">Active Tasks</h3>
                <p className="text-3xl font-bold text-green-400">{stages.flatMap(s => s.tasks).filter(t => t.status === 'in_progress').length}</p>
                <p className="text-sm text-gray-400">In progress</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                <h3 className="text-lg font-semibold mb-2">Meetings</h3>
                <p className="text-3xl font-bold text-purple-400">{meetings.length}</p>
                <p className="text-sm text-gray-400">Total scheduled</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm rounded-xl p-6 border border-orange-500/30">
                <h3 className="text-lg font-semibold mb-2">Pipeline Value</h3>
                <p className="text-3xl font-bold text-orange-400">
                  {formatCurrency(pipelineStages.reduce((acc, stage) => acc + stage.deals.reduce((sum, deal) => sum + deal.value, 0), 0))}
                </p>
                <p className="text-sm text-gray-400">Total opportunities</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'meetings' && (
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
              <h3 className="text-lg font-semibold mb-4">Client Meetings</h3>
              <div className="space-y-3">
                {meetings.map((meeting) => (
                  <div key={meeting.id} className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{meeting.title}</h4>
                        <p className="text-sm text-gray-400">{meeting.date} at {meeting.time}</p>
                        <p className="text-sm text-gray-400">Attendee: {meeting.attendee}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        meeting.status === 'scheduled' ? 'bg-blue-500/20 text-blue-300' :
                        meeting.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {meeting.status}
                      </span>
                    </div>
                  </div>
                ))}
                {meetings.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    No meetings scheduled for this client
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'project-management' && (
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
              <h3 className="text-lg font-semibold mb-4">Project Stages</h3>
              <DragDropContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {stages.map((stage) => (
                    <div key={stage.id} className="space-y-4">
                      <div className={`bg-gradient-to-r ${stage.color} rounded-lg p-4`}>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{stage.icon}</span>
                          <h4 className="font-semibold text-white">{stage.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            stage.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                            stage.status === 'in_progress' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-gray-500/20 text-gray-300'
                          }`}>
                            {stage.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                      
                      <Droppable droppableId={stage.id}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="space-y-2 min-h-[200px]"
                          >
                            {stage.tasks.map((task, index) => (
                              <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="bg-gray-700/50 rounded-lg p-3 cursor-pointer hover:bg-gray-600/50 transition-colors"
                                  >
                                    <h5 className="font-medium text-white">{task.title}</h5>
                                    {task.description && (
                                      <p className="text-sm text-gray-400 mt-1">{task.description}</p>
                                    )}
                                    <div className="flex justify-between items-center mt-2">
                                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        task.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                                        task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                                        'bg-green-500/20 text-green-300'
                                      }`}>
                                        {task.priority}
                                      </span>
                                      <span className="text-xs text-gray-400">{task.assignee}</span>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  ))}
                </div>
              </DragDropContext>
            </div>
          </div>
        )}

        {activeTab === 'crm' && (
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
              <h3 className="text-lg font-semibold mb-4">Sales Pipeline</h3>
              <DragDropContext onDragEnd={handlePipelineDragEnd}>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                  {pipelineStages.map((stage) => (
                    <div key={stage.id} className="space-y-3">
                      <div className={`bg-gradient-to-r ${stage.color} rounded-lg p-3`}>
                        <h4 className="font-semibold text-white text-sm">{stage.name}</h4>
                        <p className="text-white/80 text-xs">
                          {stage.deals.length} deals • {formatCurrency(stage.deals.reduce((sum, deal) => sum + deal.value, 0))}
                        </p>
                      </div>
                      
                      <Droppable droppableId={stage.id}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="space-y-2 min-h-[300px]"
                          >
                            {stage.deals.map((deal, index) => (
                              <Draggable key={deal.id} draggableId={deal.id} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="bg-gray-700/50 rounded-lg p-3 cursor-pointer hover:bg-gray-600/50 transition-colors"
                                  >
                                    <h5 className="font-medium text-white text-sm">{deal.title}</h5>
                                    <p className="text-xs text-gray-400">{deal.company}</p>
                                    <div className="flex justify-between items-center mt-2">
                                      <span className="text-sm font-bold text-green-400">{formatCurrency(deal.value)}</span>
                                      <span className="text-xs text-blue-400">{deal.probability}%</span>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  ))}
                </div>
              </DragDropContext>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
              <h3 className="text-lg font-semibold mb-4">Client Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Contracts</h4>
                  <p className="text-2xl font-bold text-blue-400">3</p>
                  <p className="text-sm text-gray-400">Active contracts</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Reports</h4>
                  <p className="text-2xl font-bold text-green-400">12</p>
                  <p className="text-sm text-gray-400">Generated reports</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Presentations</h4>
                  <p className="text-2xl font-bold text-purple-400">5</p>
                  <p className="text-sm text-gray-400">Client presentations</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
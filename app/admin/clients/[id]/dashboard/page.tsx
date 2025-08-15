'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { StrictModeDroppable as Droppable } from '@/components/StrictModeDroppable'
import PortalAwareDraggable from '@/components/PortalAwareDraggable'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  CheckIcon, 
  XMarkIcon,
  EyeIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

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
  
  // Admin editing states
  const [isEditing, setIsEditing] = useState(false)
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [showAddDealModal, setShowAddDealModal] = useState(false)
  const [showAddMeetingModal, setShowAddMeetingModal] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null)
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  // Check admin authentication
  useEffect(() => {
    // In a real app, this would check actual authentication
    // For demo purposes, we'll assume admin access from the URL path
    const isAdminUser = window.location.pathname.includes('/admin/')
    setIsAdmin(isAdminUser)
    
    if (!isAdminUser) {
      // Redirect non-admin users
      router.push('/login?redirect=' + encodeURIComponent(window.location.pathname))
    }
  }, [router])

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
        utm_source: 'cursuscapital',
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
        name: 'Closed',
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
    if (!result.destination) return

    const { source, destination } = result
    const newStages = [...stages]
    const sourceStage = newStages.find(s => s.id === source.droppableId)
    const destStage = newStages.find(s => s.id === destination.droppableId)

    if (sourceStage && destStage) {
      const [movedTask] = sourceStage.tasks.splice(source.index, 1)
      destStage.tasks.splice(destination.index, 0, movedTask)
      setStages(newStages)
    }
  }

  const handlePipelineDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const { source, destination } = result
    const newPipelineStages = [...pipelineStages]
    const sourceStage = newPipelineStages.find(s => s.id === source.droppableId)
    const destStage = newPipelineStages.find(s => s.id === destination.droppableId)

    if (sourceStage && destStage) {
      const [movedDeal] = sourceStage.deals.splice(source.index, 1)
      movedDeal.stage = destStage.id
      destStage.deals.splice(destination.index, 0, movedDeal)
      setPipelineStages(newPipelineStages)
    }
  }

  // Admin editing functions
  const addTask = (task: Task) => {
    const newStages = stages.map(stage => {
      if (stage.id === task.stage) {
        return { ...stage, tasks: [...stage.tasks, task] }
      }
      return stage
    })
    setStages(newStages)
    setShowAddTaskModal(false)
  }

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    const newStages = stages.map(stage => ({
      ...stage,
      tasks: stage.tasks.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      )
    }))
    setStages(newStages)
    setEditingTask(null)
  }

  const deleteTask = (taskId: string) => {
    const newStages = stages.map(stage => ({
      ...stage,
      tasks: stage.tasks.filter(task => task.id !== taskId)
    }))
    setStages(newStages)
  }

  const addDeal = (deal: Deal) => {
    const newPipelineStages = pipelineStages.map(stage => {
      if (stage.id === deal.stage) {
        return { ...stage, deals: [...stage.deals, deal] }
      }
      return stage
    })
    setPipelineStages(newPipelineStages)
    setShowAddDealModal(false)
  }

  const updateDeal = (dealId: string, updates: Partial<Deal>) => {
    const newPipelineStages = pipelineStages.map(stage => ({
      ...stage,
      deals: stage.deals.map(deal => 
        deal.id === dealId ? { ...deal, ...updates } : deal
      )
    }))
    setPipelineStages(newPipelineStages)
    setEditingDeal(null)
  }

  const deleteDeal = (dealId: string) => {
    const newPipelineStages = pipelineStages.map(stage => ({
      ...stage,
      deals: stage.deals.filter(deal => deal.id !== dealId)
    }))
    setPipelineStages(newPipelineStages)
  }

  const addMeeting = (meeting: Meeting) => {
    setMeetings([...meetings, meeting])
    setShowAddMeetingModal(false)
  }

  const updateMeeting = (meetingId: string, updates: Partial<Meeting>) => {
    setMeetings(meetings.map(meeting => 
      meeting.id === meetingId ? { ...meeting, ...updates } : meeting
    ))
    setEditingMeeting(null)
  }

  const deleteMeeting = (meetingId: string) => {
    setMeetings(meetings.filter(meeting => meeting.id !== meetingId))
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

  // Show loading while checking admin access
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Checking admin access...</p>
        </div>
      </div>
    )
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
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg px-3 py-1">
                <span className="text-green-400 font-medium text-sm">ADMIN ACCESS</span>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isEditing 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isEditing ? 'Exit Edit Mode' : 'Enter Edit Mode'}
              </button>
              <button
                onClick={() => router.push('/admin/clients')}
                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg text-sm font-medium"
              >
                Back to Clients
              </button>
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
              { id: 'documents', name: 'Asset Library' }
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

            {/* Admin Quick Actions */}
            {isEditing && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
                <h3 className="text-lg font-semibold mb-4">Admin Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setShowAddTaskModal(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg text-left transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <PlusIcon className="h-6 w-6" />
                      <div>
                        <h4 className="font-semibold">Add Task</h4>
                        <p className="text-sm opacity-90">Create new project task</p>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setShowAddDealModal(true)}
                    className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg text-left transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <CurrencyDollarIcon className="h-6 w-6" />
                      <div>
                        <h4 className="font-semibold">Add Deal</h4>
                        <p className="text-sm opacity-90">Create new sales opportunity</p>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setShowAddMeetingModal(true)}
                    className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg text-left transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <CalendarIcon className="h-6 w-6" />
                      <div>
                        <h4 className="font-semibold">Schedule Meeting</h4>
                        <p className="text-sm opacity-90">Book client meeting</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Recent Activity */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {meetings.slice(0, 3).map((meeting) => (
                  <div key={meeting.id} className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                    <CalendarIcon className="h-5 w-5 text-blue-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{meeting.title}</p>
                      <p className="text-xs text-gray-400">{meeting.date} at {meeting.time}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      meeting.status === 'scheduled' ? 'bg-blue-500/20 text-blue-300' :
                      meeting.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {meeting.status}
                    </span>
                  </div>
                ))}
                {meetings.length === 0 && (
                  <p className="text-gray-400 text-sm">No recent meetings</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'meetings' && (
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Client Meetings</h3>
                {isEditing && (
                  <button
                    onClick={() => setShowAddMeetingModal(true)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center space-x-1"
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span>Add Meeting</span>
                  </button>
                )}
              </div>
              <div className="space-y-3">
                {meetings.map((meeting) => (
                  <div key={meeting.id} className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold">{meeting.title}</h4>
                        <p className="text-sm text-gray-400">{meeting.date} at {meeting.time}</p>
                        <p className="text-sm text-gray-400">Attendee: {meeting.attendee}</p>
                        {meeting.source && (
                          <p className="text-sm text-gray-400">Source: {meeting.source}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          meeting.status === 'scheduled' ? 'bg-blue-500/20 text-blue-300' :
                          meeting.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {meeting.status}
                        </span>
                        {isEditing && (
                          <div className="flex space-x-1">
                            <button
                              onClick={() => setEditingMeeting(meeting)}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                              title="Edit Meeting"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteMeeting(meeting.id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                              title="Delete Meeting"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>
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
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Project Stages</h3>
                {isEditing && (
                  <button
                    onClick={() => setShowAddTaskModal(true)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center space-x-1"
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span>Add Task</span>
                  </button>
                )}
              </div>
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
                              <PortalAwareDraggable key={task.id} draggableId={task.id} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`bg-gray-700/50 rounded-lg p-3 cursor-pointer hover:bg-gray-600/50 transition-colors ${
                                      snapshot.isDragging ? 'shadow-lg opacity-90' : ''
                                    }`}
                                    style={provided.draggableProps.style}
                                  >
                                    <div className="flex justify-between items-start">
                                      <div className="flex-1">
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
                                      {isEditing && (
                                        <div className="flex space-x-1 ml-2">
                                          <button
                                            onClick={() => setEditingTask(task)}
                                            className="text-blue-400 hover:text-blue-300 transition-colors"
                                            title="Edit Task"
                                          >
                                            <PencilIcon className="h-4 w-4" />
                                          </button>
                                          <button
                                            onClick={() => deleteTask(task.id)}
                                            className="text-red-400 hover:text-red-300 transition-colors"
                                            title="Delete Task"
                                          >
                                            <TrashIcon className="h-4 w-4" />
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </PortalAwareDraggable>
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
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Sales Pipeline</h3>
                {isEditing && (
                  <button
                    onClick={() => setShowAddDealModal(true)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center space-x-1"
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span>Add Deal</span>
                  </button>
                )}
              </div>
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
                              <PortalAwareDraggable key={deal.id} draggableId={deal.id} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`bg-gray-700/50 rounded-lg p-3 cursor-pointer hover:bg-gray-600/50 transition-colors ${
                                      snapshot.isDragging ? 'shadow-lg opacity-90' : ''
                                    }`}
                                    style={provided.draggableProps.style}
                                  >
                                    <div className="flex justify-between items-start">
                                      <div className="flex-1">
                                        <h5 className="font-medium text-white text-sm">{deal.title}</h5>
                                        <p className="text-xs text-gray-400">{deal.company}</p>
                                        <div className="flex justify-between items-center mt-2">
                                          <span className="text-sm font-bold text-green-400">{formatCurrency(deal.value)}</span>
                                          <span className="text-xs text-blue-400">{deal.probability}%</span>
                                        </div>
                                      </div>
                                      {isEditing && (
                                        <div className="flex space-x-1 ml-2">
                                          <button
                                            onClick={() => setEditingDeal(deal)}
                                            className="text-blue-400 hover:text-blue-300 transition-colors"
                                            title="Edit Deal"
                                          >
                                            <PencilIcon className="h-4 w-4" />
                                          </button>
                                          <button
                                            onClick={() => deleteDeal(deal.id)}
                                            className="text-red-400 hover:text-red-300 transition-colors"
                                            title="Delete Deal"
                                          >
                                            <TrashIcon className="h-4 w-4" />
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </PortalAwareDraggable>
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
              <h3 className="text-lg font-semibold mb-4">Client Asset Library</h3>
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

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const newTask: Task = {
                id: Date.now().toString(),
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                status: 'not_started',
                stage: formData.get('stage') as string,
                assignee: formData.get('assignee') as string,
                priority: formData.get('priority') as 'low' | 'medium' | 'high',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              }
              addTask(newTask)
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    name="title"
                    type="text"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    name="description"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Stage</label>
                  <select
                    name="stage"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  >
                    {stages.map(stage => (
                      <option key={stage.id} value={stage.id}>{stage.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Assignee</label>
                  <input
                    name="assignee"
                    type="text"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <select
                    name="priority"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Add Task
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddTaskModal(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Deal Modal */}
      {showAddDealModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Deal</h3>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const newDeal: Deal = {
                id: Date.now().toString(),
                title: formData.get('title') as string,
                company: formData.get('company') as string,
                contact: formData.get('contact') as string,
                email: formData.get('email') as string,
                value: Number(formData.get('value')),
                stage: formData.get('stage') as string,
                probability: Number(formData.get('probability')),
                closeDate: formData.get('closeDate') as string,
                source: formData.get('source') as string,
                lastActivity: new Date().toISOString(),
                createdAt: new Date().toISOString(),
                tags: [],
                priority: formData.get('priority') as 'low' | 'medium' | 'high'
              }
              addDeal(newDeal)
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    name="title"
                    type="text"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Company</label>
                  <input
                    name="company"
                    type="text"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Contact</label>
                  <input
                    name="contact"
                    type="text"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Value</label>
                  <input
                    name="value"
                    type="number"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Stage</label>
                  <select
                    name="stage"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  >
                    {pipelineStages.map(stage => (
                      <option key={stage.id} value={stage.id}>{stage.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Probability (%)</label>
                  <input
                    name="probability"
                    type="number"
                    min="0"
                    max="100"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Close Date</label>
                  <input
                    name="closeDate"
                    type="date"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Source</label>
                  <input
                    name="source"
                    type="text"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <select
                    name="priority"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Add Deal
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddDealModal(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Meeting Modal */}
      {showAddMeetingModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Meeting</h3>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const newMeeting: Meeting = {
                id: Date.now().toString(),
                title: formData.get('title') as string,
                date: formData.get('date') as string,
                time: formData.get('time') as string,
                attendee: formData.get('attendee') as string,
                status: formData.get('status') as 'scheduled' | 'completed' | 'cancelled',
                source: formData.get('source') as 'calendly' | 'hubspot' | 'google' | 'zcal'
              }
              addMeeting(newMeeting)
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    name="title"
                    type="text"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    name="date"
                    type="date"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <input
                    name="time"
                    type="time"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Attendee</label>
                  <input
                    name="attendee"
                    type="text"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    name="status"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Source</label>
                  <select
                    name="source"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="calendly">Calendly</option>
                    <option value="hubspot">HubSpot</option>
                    <option value="google">Google Calendar</option>
                    <option value="zcal">Zcal</option>
                  </select>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Add Meeting
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddMeetingModal(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
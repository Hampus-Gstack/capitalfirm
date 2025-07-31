'use client'

import { useState } from 'react'
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  UsersIcon
} from '@heroicons/react/24/outline'

interface Client {
  id: string
  name: string
  company: string
  email: string
  phone: string
  role: string
  status: 'active' | 'pending' | 'inactive' | 'onboarding'
  stage: 'onboarding' | 'setup' | 'campaigns' | 'placement' | 'reporting'
  progress: number
  totalInvestment: number
  activeDeals: number
  scheduledMeetings: number
  lastActivity: string
  joinedAt: string
  priority: 'high' | 'medium' | 'low'
  tags: string[]
  notes: string
}

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'John Smith',
      company: 'TechStart Inc.',
      email: 'john@techstart.com',
      phone: '+1 (555) 123-4567',
      role: 'Founder/CEO',
      status: 'active',
      stage: 'campaigns',
      progress: 65,
      totalInvestment: 2500000,
      activeDeals: 3,
      scheduledMeetings: 5,
      lastActivity: '2024-01-15T10:00:00Z',
      joinedAt: '2024-01-01T00:00:00Z',
      priority: 'high',
      tags: ['tech', 'series-a', 'urgent'],
      notes: 'High potential client, needs immediate attention for Series A round.'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      company: 'Innovate Co.',
      email: 'sarah@innovate.co',
      phone: '+1 (555) 234-5678',
      role: 'CTO',
      status: 'active',
      stage: 'setup',
      progress: 35,
      totalInvestment: 1800000,
      activeDeals: 2,
      scheduledMeetings: 3,
      lastActivity: '2024-01-14T14:30:00Z',
      joinedAt: '2024-01-05T00:00:00Z',
      priority: 'medium',
      tags: ['fintech', 'growth'],
      notes: 'Fintech startup, good traction, looking for growth capital.'
    },
    {
      id: '3',
      name: 'Mike Chen',
      company: 'GreenTech Solutions',
      email: 'mike@greentech.com',
      phone: '+1 (555) 345-6789',
      role: 'CEO',
      status: 'onboarding',
      stage: 'onboarding',
      progress: 15,
      totalInvestment: 0,
      activeDeals: 0,
      scheduledMeetings: 1,
      lastActivity: '2024-01-13T09:15:00Z',
      joinedAt: '2024-01-10T00:00:00Z',
      priority: 'high',
      tags: ['cleantech', 'new'],
      notes: 'New cleantech client, requires onboarding support.'
    },
    {
      id: '4',
      name: 'Emily Davis',
      company: 'DataFlow Analytics',
      email: 'emily@dataflow.com',
      phone: '+1 (555) 456-7890',
      role: 'Founder',
      status: 'active',
      stage: 'placement',
      progress: 85,
      totalInvestment: 3200000,
      activeDeals: 4,
      scheduledMeetings: 8,
      lastActivity: '2024-01-15T16:45:00Z',
      joinedAt: '2023-12-15T00:00:00Z',
      priority: 'medium',
      tags: ['ai', 'enterprise'],
      notes: 'AI/ML company with strong enterprise traction.'
    },
    {
      id: '5',
      name: 'Alex Rodriguez',
      company: 'HealthTech Pro',
      email: 'alex@healthtech.com',
      phone: '+1 (555) 567-8901',
      role: 'COO',
      status: 'pending',
      stage: 'onboarding',
      progress: 5,
      totalInvestment: 0,
      activeDeals: 0,
      scheduledMeetings: 0,
      lastActivity: '2024-01-12T11:20:00Z',
      joinedAt: '2024-01-12T00:00:00Z',
      priority: 'low',
      tags: ['healthtech', 'pending'],
      notes: 'Healthtech startup, pending initial consultation.'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterStage, setFilterStage] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [showClientModal, setShowClientModal] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10 border-green-400/20'
      case 'pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      case 'inactive': return 'text-red-400 bg-red-400/10 border-red-400/20'
      case 'onboarding': return 'text-blue-400 bg-blue-400/10 border-blue-400/20'
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/10'
      case 'medium': return 'text-yellow-400 bg-yellow-400/10'
      case 'low': return 'text-green-400 bg-green-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'onboarding': return 'from-blue-500 to-cyan-500'
      case 'setup': return 'from-purple-500 to-pink-500'
      case 'campaigns': return 'from-green-500 to-emerald-500'
      case 'placement': return 'from-orange-500 to-red-500'
      case 'reporting': return 'from-indigo-500 to-purple-500'
      default: return 'from-gray-500 to-gray-600'
    }
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
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus
    const matchesStage = filterStage === 'all' || client.stage === filterStage
    const matchesPriority = filterPriority === 'all' || client.priority === filterPriority
    
    return matchesSearch && matchesStatus && matchesStage && matchesPriority
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-accent-400 to-purple-400 bg-clip-text text-transparent">
                Client Management
              </h1>
              <p className="text-gray-400 mt-1">Manage all your clients and their progress</p>
            </div>
            <button className="bg-gradient-to-r from-accent-600 to-purple-600 hover:from-accent-500 hover:to-purple-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center">
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Client
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="onboarding">Onboarding</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
              className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            >
              <option value="all">All Stages</option>
              <option value="onboarding">Onboarding</option>
              <option value="setup">Setup</option>
              <option value="campaigns">Campaigns</option>
              <option value="placement">Placement</option>
              <option value="reporting">Reporting</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Clients Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-600/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Stage
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Investment
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Deals
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Meetings
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Last Activity
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{client.name}</div>
                          <div className="text-sm text-gray-400">{client.company}</div>
                          <div className="text-xs text-gray-500">{client.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(client.status)}`}>
                          {client.status}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(client.priority)}`}>
                          {client.priority}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getStageIcon(client.stage)}</span>
                        <div>
                          <div className="text-sm font-medium text-white capitalize">{client.stage}</div>
                          <div className="text-xs text-gray-400">{client.progress}% complete</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-green-400">
                        {formatCurrency(client.totalInvestment)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-blue-400 font-medium">
                        {client.activeDeals} active
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-purple-400 font-medium">
                        {client.scheduledMeetings} scheduled
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-300">
                        {formatDate(client.lastActivity)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedClient(client)
                            setShowClientModal(true)
                          }}
                          className="text-accent-400 hover:text-accent-300 transition-colors"
                          title="View Details"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                          title="Edit Client"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          className="text-red-400 hover:text-red-300 transition-colors"
                          title="Delete Client"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <UsersIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-400 mb-2">No clients found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {/* Client Details Modal */}
      {showClientModal && selectedClient && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-sm rounded-xl p-6 w-full max-w-2xl mx-4 border border-gray-600/30">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-accent-400 to-purple-400 bg-clip-text text-transparent">
                Client Details
              </h3>
              <button 
                onClick={() => setShowClientModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                  <input
                    type="text"
                    value={selectedClient.name}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Company</label>
                  <input
                    type="text"
                    value={selectedClient.company}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                  <input
                    type="email"
                    value={selectedClient.email}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Phone</label>
                  <input
                    type="tel"
                    value={selectedClient.phone}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    readOnly
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Role</label>
                  <input
                    type="text"
                    value={selectedClient.role}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Status</label>
                  <div className={`px-4 py-3 rounded-lg border ${getStatusColor(selectedClient.status)}`}>
                    <span className="text-sm font-medium capitalize">{selectedClient.status}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Stage</label>
                  <div className="flex items-center space-x-2 px-4 py-3 bg-gray-700/50 rounded-lg border border-gray-600/50">
                    <span className="text-lg">{getStageIcon(selectedClient.stage)}</span>
                    <span className="text-sm font-medium capitalize">{selectedClient.stage}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Progress</label>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${getStageColor(selectedClient.stage)} h-2 rounded-full progress-animate`}
                      style={{ width: `${selectedClient.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{selectedClient.progress}% complete</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Notes</label>
                <textarea
                  value={selectedClient.notes}
                  rows={3}
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {selectedClient.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-700/50 px-3 py-1 rounded-full text-sm text-gray-300 border border-gray-600/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-8">
              <button
                onClick={() => setShowClientModal(false)}
                className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
              >
                Close
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-accent-600 to-purple-600 hover:from-accent-500 hover:to-purple-500 text-white rounded-lg font-medium transition-all duration-200">
                Edit Client
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function getStageIcon(stage: string) {
  switch (stage) {
    case 'onboarding': return '🚀'
    case 'setup': return '⚙️'
    case 'campaigns': return '📈'
    case 'placement': return '💰'
    case 'reporting': return '📊'
    default: return '📋'
  }
} 
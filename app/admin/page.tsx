'use client'

import { useState, useEffect } from 'react'
import { 
  UsersIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CogIcon
} from '@heroicons/react/24/outline'

interface Client {
  id: string
  name: string
  company: string
  email: string
  role: string
  status: 'active' | 'pending' | 'inactive' | 'onboarding'
  stage: 'onboarding' | 'setup' | 'campaigns' | 'placement' | 'reporting'
  progress: number
  totalInvestment: number
  activeDeals: number
  scheduledMeetings: number
  lastActivity: string
  joinedAt: string
  avatar?: string
  priority: 'high' | 'medium' | 'low'
  tags: string[]
}

interface DashboardStats {
  totalClients: number
  activeClients: number
  totalInvestment: number
  averageDealSize: number
  conversionRate: number
  monthlyGrowth: number
  pendingOnboarding: number
  upcomingMeetings: number
}

export default function AdminOverviewPage() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'John Smith',
      company: 'TechStart Inc.',
      email: 'john@techstart.com',
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
      tags: ['tech', 'series-a', 'urgent']
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      company: 'Innovate Co.',
      email: 'sarah@innovate.co',
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
      tags: ['fintech', 'growth']
    },
    {
      id: '3',
      name: 'Mike Chen',
      company: 'GreenTech Solutions',
      email: 'mike@greentech.com',
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
      tags: ['cleantech', 'new']
    },
    {
      id: '4',
      name: 'Emily Davis',
      company: 'DataFlow Analytics',
      email: 'emily@dataflow.com',
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
      tags: ['ai', 'enterprise']
    },
    {
      id: '5',
      name: 'Alex Rodriguez',
      company: 'HealthTech Pro',
      email: 'alex@healthtech.com',
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
      tags: ['healthtech', 'pending']
    }
  ])

  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 5,
    activeClients: 3,
    totalInvestment: 7500000,
    averageDealSize: 1875000,
    conversionRate: 75,
    monthlyGrowth: 12.5,
    pendingOnboarding: 2,
    upcomingMeetings: 17
  })

  const [filterStatus, setFilterStatus] = useState('all')
  const [filterStage, setFilterStage] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('lastActivity')

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

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'onboarding': return '🚀'
      case 'setup': return '⚙️'
      case 'campaigns': return '📈'
      case 'placement': return '💰'
      case 'reporting': return '📊'
      default: return '📋'
    }
  }

  const filteredClients = clients.filter(client => {
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus
    const matchesStage = filterStage === 'all' || client.stage === filterStage
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesStatus && matchesStage && matchesSearch
  })

  const sortedClients = [...filteredClients].sort((a, b) => {
    switch (sortBy) {
      case 'lastActivity':
        return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
      case 'progress':
        return b.progress - a.progress
      case 'totalInvestment':
        return b.totalInvestment - a.totalInvestment
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

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
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-accent-400 to-purple-400 bg-clip-text text-transparent">
                Admin Overview
              </h1>
              <p className="text-gray-400 mt-1">Master dashboard for client management and business insights</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-accent-600 to-purple-600 hover:from-accent-500 hover:to-purple-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg">
                <UsersIcon className="h-5 w-5 mr-2 inline" />
                Add Client
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30 card-hover hover-glow animate-slideIn">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-400">Total Clients</p>
                <p className="text-3xl font-bold text-blue-400">{stats.totalClients}</p>
              </div>
              <UsersIcon className="h-8 w-8 text-blue-400" />
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
              <span>+{stats.monthlyGrowth}% this month</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30 card-hover hover-glow animate-slideIn" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-400">Total Investment</p>
                <p className="text-3xl font-bold text-green-400">{formatCurrency(stats.totalInvestment)}</p>
              </div>
              <CurrencyDollarIcon className="h-8 w-8 text-green-400" />
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <span>Avg: {formatCurrency(stats.averageDealSize)}</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 card-hover hover-glow animate-slideIn" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-400">Conversion Rate</p>
                <p className="text-3xl font-bold text-purple-400">{stats.conversionRate}%</p>
              </div>
              <ChartBarIcon className="h-8 w-8 text-purple-400" />
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <span>{stats.activeClients} active clients</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm rounded-xl p-6 border border-orange-500/30 card-hover hover-glow animate-slideIn" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-400">Upcoming Meetings</p>
                <p className="text-3xl font-bold text-orange-400">{stats.upcomingMeetings}</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-orange-400" />
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <span>{stats.pendingOnboarding} pending onboarding</span>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search clients by name, company, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              />
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
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            >
              <option value="lastActivity">Sort by Activity</option>
              <option value="progress">Sort by Progress</option>
              <option value="totalInvestment">Sort by Investment</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedClients.map((client) => (
            <div key={client.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 card-hover hover-glow">
              {/* Client Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {client.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{client.name}</h3>
                    <p className="text-sm text-gray-400">{client.company}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(client.status)}`}>
                    {client.status}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(client.priority)}`}>
                    {client.priority}
                  </span>
                </div>
              </div>

              {/* Client Info */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Role:</span>
                  <span className="text-white">{client.role}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white truncate">{client.email}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Investment:</span>
                  <span className="text-green-400 font-medium">{formatCurrency(client.totalInvestment)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Active Deals:</span>
                  <span className="text-blue-400 font-medium">{client.activeDeals}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Meetings:</span>
                  <span className="text-purple-400 font-medium">{client.scheduledMeetings}</span>
                </div>
              </div>

              {/* Stage Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getStageIcon(client.stage)}</span>
                    <span className="text-sm font-medium text-gray-300 capitalize">{client.stage}</span>
                  </div>
                  <span className="text-sm text-gray-400">{client.progress}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${getStageColor(client.stage)} h-2 rounded-full progress-animate`}
                    style={{ width: `${client.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Tags */}
              {client.tags.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {client.tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-gray-700/50 px-2 py-1 rounded-full text-gray-300 border border-gray-600/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Last Activity */}
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Last activity: {formatDate(client.lastActivity)}</span>
                <button className="text-accent-400 hover:text-accent-300 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedClients.length === 0 && (
          <div className="text-center py-12">
            <UsersIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-400 mb-2">No clients found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  )
} 
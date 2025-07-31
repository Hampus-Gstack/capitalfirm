'use client'

import { useState } from 'react'
import { 
  ChartBarIcon,
  CurrencyDollarIcon,
  UsersIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

interface AnalyticsData {
  totalRevenue: number
  monthlyGrowth: number
  conversionRate: number
  averageDealSize: number
  totalClients: number
  activeClients: number
  pendingOnboarding: number
  upcomingMeetings: number
  stageDistribution: {
    onboarding: number
    setup: number
    campaigns: number
    placement: number
    reporting: number
  }
  monthlyRevenue: number[]
  clientGrowth: number[]
  topPerformingClients: Array<{
    name: string
    company: string
    revenue: number
    deals: number
  }>
}

export default function AdminAnalyticsPage() {
  const [analyticsData] = useState<AnalyticsData>({
    totalRevenue: 8750000,
    monthlyGrowth: 12.5,
    conversionRate: 75,
    averageDealSize: 1875000,
    totalClients: 15,
    activeClients: 12,
    pendingOnboarding: 3,
    upcomingMeetings: 24,
    stageDistribution: {
      onboarding: 3,
      setup: 4,
      campaigns: 5,
      placement: 2,
      reporting: 1
    },
    monthlyRevenue: [1200000, 1350000, 1420000, 1580000, 1650000, 1720000, 1850000, 1920000, 2010000, 2150000, 2280000, 2400000],
    clientGrowth: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    topPerformingClients: [
      { name: 'John Smith', company: 'TechStart Inc.', revenue: 2500000, deals: 3 },
      { name: 'Emily Davis', company: 'DataFlow Analytics', revenue: 3200000, deals: 4 },
      { name: 'Sarah Johnson', company: 'Innovate Co.', revenue: 1800000, deals: 2 },
      { name: 'Mike Chen', company: 'GreenTech Solutions', revenue: 0, deals: 0 },
      { name: 'Alex Rodriguez', company: 'HealthTech Pro', revenue: 0, deals: 0 }
    ]
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-accent-400 to-purple-400 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-gray-400 mt-1">Business insights and performance metrics</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gray-700/50 hover:bg-gray-600/50 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 border border-gray-600/50">
                Export Report
              </button>
              <button className="bg-gradient-to-r from-accent-600 to-purple-600 hover:from-accent-500 hover:to-purple-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg">
                <ChartBarIcon className="h-5 w-5 mr-2 inline" />
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30 card-hover hover-glow animate-slideIn">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-400">Total Revenue</p>
                <p className="text-3xl font-bold text-green-400">{formatCurrency(analyticsData.totalRevenue)}</p>
              </div>
              <CurrencyDollarIcon className="h-8 w-8 text-green-400" />
            </div>
            <div className="flex items-center text-sm">
              <ArrowTrendingUpIcon className="h-4 w-4 mr-1 text-green-400" />
              <span className="text-green-400">{formatPercentage(analyticsData.monthlyGrowth)} this month</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30 card-hover hover-glow animate-slideIn" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-400">Conversion Rate</p>
                <p className="text-3xl font-bold text-blue-400">{analyticsData.conversionRate}%</p>
              </div>
              <ChartBarIcon className="h-8 w-8 text-blue-400" />
            </div>
            <div className="flex items-center text-sm">
              <ArrowTrendingUpIcon className="h-4 w-4 mr-1 text-blue-400" />
              <span className="text-blue-400">+5.2% vs last month</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 card-hover hover-glow animate-slideIn" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-400">Active Clients</p>
                <p className="text-3xl font-bold text-purple-400">{analyticsData.activeClients}</p>
              </div>
              <UsersIcon className="h-8 w-8 text-purple-400" />
            </div>
            <div className="flex items-center text-sm">
              <span className="text-purple-400">of {analyticsData.totalClients} total</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm rounded-xl p-6 border border-orange-500/30 card-hover hover-glow animate-slideIn" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-400">Avg Deal Size</p>
                <p className="text-3xl font-bold text-orange-400">{formatCurrency(analyticsData.averageDealSize)}</p>
              </div>
              <CurrencyDollarIcon className="h-8 w-8 text-orange-400" />
            </div>
            <div className="flex items-center text-sm">
              <ArrowTrendingUpIcon className="h-4 w-4 mr-1 text-orange-400" />
              <span className="text-orange-400">+8.3% vs last quarter</span>
            </div>
          </div>
        </div>

        {/* Charts and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
            <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
            <div className="h-64 flex items-end justify-between space-x-2">
              {analyticsData.monthlyRevenue.map((revenue, index) => {
                const maxRevenue = Math.max(...analyticsData.monthlyRevenue)
                const height = (revenue / maxRevenue) * 100
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-accent-500 to-purple-500 rounded-t transition-all duration-300 hover:from-accent-400 hover:to-purple-400"
                      style={{ height: `${height}%` }}
                    ></div>
                    <span className="text-xs text-gray-400 mt-2">{index + 1}</span>
                  </div>
                )
              })}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-400">Revenue trend over the last 12 months</p>
            </div>
          </div>

          {/* Stage Distribution */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
            <h3 className="text-lg font-semibold mb-4">Client Stage Distribution</h3>
            <div className="space-y-4">
              {Object.entries(analyticsData.stageDistribution).map(([stage, count]) => (
                <div key={stage} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{getStageIcon(stage)}</span>
                    <span className="text-sm font-medium capitalize">{stage}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-accent-500 to-purple-500 h-2 rounded-full progress-animate"
                        style={{ width: `${(count / analyticsData.totalClients) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-400 w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Clients */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-600/30 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700/50">
            <h3 className="text-lg font-semibold">Top Performing Clients</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Deals
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {analyticsData.topPerformingClients.map((client, index) => (
                  <tr key={index} className="hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-white">{client.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {client.company}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-green-400">
                        {formatCurrency(client.revenue)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-blue-400 font-medium">
                        {client.deals} deals
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        client.revenue > 0 
                          ? 'text-green-400 bg-green-400/10 border border-green-400/20'
                          : 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20'
                      }`}>
                        {client.revenue > 0 ? 'Active' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <ClockIcon className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Pending Onboarding</p>
                <p className="text-2xl font-bold text-white">{analyticsData.pendingOnboarding}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
            <div className="flex items-center">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <CalendarIcon className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Upcoming Meetings</p>
                <p className="text-2xl font-bold text-white">{analyticsData.upcomingMeetings}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
            <div className="flex items-center">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Success Rate</p>
                <p className="text-2xl font-bold text-white">{analyticsData.conversionRate}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
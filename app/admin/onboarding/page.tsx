'use client'

import { useState, useEffect } from 'react'
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  DocumentTextIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

interface OnboardingData {
  id: string
  type: 'startup' | 'fund'
  status: 'completed' | 'in_progress' | 'pending'
  submittedAt: string
  lastUpdated: string
  
  // Basic Information
  companyName: string
  onboardingDate: string
  avalancheRepresentative: string
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  
  // Company Information
  companyDescription: string
  dataRoomLink: string
  foundedYear?: string
  yearFounded?: string
  companyHQ: string
  
  // Startup-specific fields
  uniqueValueProposition?: string
  industryVertical?: string
  comparableCompanies?: string
  differentiation?: string
  highlights?: string
  teamExperience?: string
  leadershipEquity?: string
  raisedToDate?: string
  strategicPartnerships?: string
  financials?: string
  projections?: string
  monthlyBurnRate?: string
  runway?: string
  nearTermCatalysts?: string
  companyStage?: string
  capitalToRaise?: string
  preMoneyValuation?: string
  closedPortion?: string
  exitStrategy?: string
  dealType?: string
  preferredInvestorType?: string
  
  // Fund-specific fields
  fundStructure?: string
  targetIRR?: string
  portfolioAllocation?: string
  targetRaiseCloseDate?: string
  investmentTerm?: string
  investmentJurisdiction?: string
  managementTeam?: string
  descriptionOfUnits?: string
  currentAUM?: string
  managementFees?: string
  totalFundRaiseAmount?: string
  
  // Contact Information
  takingInvestorCalls: string
  emailNames: string
  forwardingDomain: string
  investorPresentation: string
  existingInvestors: string
  salesAssets: string
  
  // Metadata
  completionPercentage: number
  tags: string[]
  notes?: string
}

export default function AdminOnboardingPage() {
  const [onboardingData, setOnboardingData] = useState<OnboardingData[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch onboarding data on component mount
  useEffect(() => {
    fetchOnboardingData()
  }, [])

  const fetchOnboardingData = async () => {
    try {
      const response = await fetch('/api/onboarding')
      if (response.ok) {
        const result = await response.json()
        setOnboardingData(result.data || [])
      } else {
        console.error('Failed to fetch onboarding data')
      }
    } catch (error) {
      console.error('Error fetching onboarding data:', error)
    } finally {
      setLoading(false)
    }
  }

  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedOnboarding, setSelectedOnboarding] = useState<OnboardingData | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/10 border-green-400/20'
      case 'in_progress': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      case 'pending': return 'text-blue-400 bg-blue-400/10 border-blue-400/20'
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'startup': return 'text-purple-400 bg-purple-400/10'
      case 'fund': return 'text-orange-400 bg-orange-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredData = onboardingData.filter(item => {
    const matchesSearch = 
      item.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = filterType === 'all' || item.type === filterType
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-400'
    if (percentage >= 50) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-accent-400 to-purple-400 bg-clip-text text-transparent">
                Cursus Capital Onboarding
              </h1>
              <p className="text-gray-400 mt-1">View and manage all client onboarding responses</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">
                {onboardingData.length} total submissions
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by company, name, email, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="startup">Startup</option>
              <option value="fund">Fund</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in_progress">In Progress</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Onboarding Data Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredData.map((item) => (
            <div key={item.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 card-hover hover-glow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {item.companyName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.companyName}</h3>
                    <p className="text-sm text-gray-400">{item.firstName} {item.lastName}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                    {item.status.replace('_', ' ')}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                    {item.type}
                  </span>
                </div>
              </div>

              {/* Key Information */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300 truncate">{item.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <PhoneIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300">{item.phoneNumber}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <BuildingOfficeIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300">{item.companyHQ}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CalendarIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300">{formatDate(item.submittedAt)}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Completion</span>
                  <span className={`text-sm font-medium ${getCompletionColor(item.completionPercentage)}`}>
                    {item.completionPercentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      item.completionPercentage >= 80 ? 'bg-green-500' :
                      item.completionPercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${item.completionPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Tags */}
              {item.tags.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="text-xs bg-gray-700/50 px-2 py-1 rounded-full text-gray-300 border border-gray-600/50">
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="text-xs text-gray-400">+{item.tags.length - 3}</span>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <span>Last updated: {formatDate(item.lastUpdated)}</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedOnboarding(item)
                    setShowDetailsModal(true)
                  }}
                  className="text-accent-400 hover:text-accent-300 transition-colors"
                  title="View Details"
                >
                  <EyeIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <DocumentTextIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-400 mb-2">No onboarding data found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedOnboarding && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-sm rounded-xl p-6 w-full max-w-4xl mx-4 border border-gray-600/30 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-accent-400 to-purple-400 bg-clip-text text-transparent">
                Onboarding Details - {selectedOnboarding.companyName}
              </h3>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-white">Basic Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Company:</span>
                      <span className="text-white font-medium">{selectedOnboarding.companyName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Contact:</span>
                      <span className="text-white">{selectedOnboarding.firstName} {selectedOnboarding.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email:</span>
                      <span className="text-white">{selectedOnboarding.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Phone:</span>
                      <span className="text-white">{selectedOnboarding.phoneNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">HQ:</span>
                      <span className="text-white">{selectedOnboarding.companyHQ}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedOnboarding.type)}`}>
                        {selectedOnboarding.type}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedOnboarding.status)}`}>
                        {selectedOnboarding.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Company Information */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-white">Company Information</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400 text-sm">Description:</span>
                      <p className="text-white text-sm mt-1">{selectedOnboarding.companyDescription}</p>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Founded:</span>
                      <span className="text-white">{selectedOnboarding.foundedYear || selectedOnboarding.yearFounded}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Data Room:</span>
                      <a href={selectedOnboarding.dataRoomLink} target="_blank" rel="noopener noreferrer" className="text-accent-400 hover:text-accent-300 text-sm">
                        View Link
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Details */}
              <div className="space-y-6">
                {selectedOnboarding.type === 'startup' && (
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-white">Startup Details</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Stage:</span>
                        <span className="text-white">{selectedOnboarding.companyStage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Capital to Raise:</span>
                        <span className="text-white">{selectedOnboarding.capitalToRaise}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Pre-money Valuation:</span>
                        <span className="text-white">{selectedOnboarding.preMoneyValuation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Deal Type:</span>
                        <span className="text-white">{selectedOnboarding.dealType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Burn Rate:</span>
                        <span className="text-white">{selectedOnboarding.monthlyBurnRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Runway:</span>
                        <span className="text-white">{selectedOnboarding.runway}</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedOnboarding.type === 'fund' && (
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-white">Fund Details</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Fund Structure:</span>
                        <span className="text-white">{selectedOnboarding.fundStructure}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Target IRR:</span>
                        <span className="text-white">{selectedOnboarding.targetIRR}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Current AUM:</span>
                        <span className="text-white">{selectedOnboarding.currentAUM}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Management Fees:</span>
                        <span className="text-white">{selectedOnboarding.managementFees}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Target Raise:</span>
                        <span className="text-white">{selectedOnboarding.totalFundRaiseAmount}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Preferences */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-white">Contact Preferences</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Taking Calls:</span>
                      <span className="text-white">{selectedOnboarding.takingInvestorCalls}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Email Names:</span>
                      <p className="text-white text-sm mt-1">{selectedOnboarding.emailNames}</p>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Forwarding Domain:</span>
                      <a href={selectedOnboarding.forwardingDomain} target="_blank" rel="noopener noreferrer" className="text-accent-400 hover:text-accent-300 text-sm">
                        View Link
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            {selectedOnboarding.tags.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-4 text-white">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedOnboarding.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-700/50 px-3 py-1 rounded-full text-sm text-gray-300 border border-gray-600/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3 mt-8">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
              >
                Close
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-accent-600 to-purple-600 hover:from-accent-500 hover:to-purple-500 text-white rounded-lg font-medium transition-all duration-200">
                Export Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 
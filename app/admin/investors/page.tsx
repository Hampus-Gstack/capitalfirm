'use client'
import { useState, useEffect } from 'react'
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  FunnelIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  ChartBarIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'

interface Investor {
  id: string
  name: string
  email: string
  phone?: string
  company: string
  title: string
  investmentSize: {
    min: number
    max: number
  }
  preferredSectors: string[]
  preferredStages: string[]
  preferredGeographies: string[]
  notes?: string
  status: 'active' | 'inactive' | 'prospect'
  lastContact?: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

interface Client {
  id: string
  name: string
  company: string
  sector: string
  stage: string
  geography: string
  fundingNeeded: number
  description: string
  status: 'raising' | 'funded' | 'closed'
}

export default function InvestorsPage() {
  const [investors, setInvestors] = useState<Investor[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSector, setSelectedSector] = useState('')
  const [selectedStage, setSelectedStage] = useState('')
  const [selectedGeography, setSelectedGeography] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showMatchModal, setShowMatchModal] = useState(false)
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null)
  const [matchedClients, setMatchedClients] = useState<Client[]>([])

  // Sample data - replace with API calls
  useEffect(() => {
    // Mock data for demonstration
    setInvestors([
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah@venturepartners.com',
        phone: '+1-555-0123',
        company: 'Venture Partners Capital',
        title: 'Managing Partner',
        investmentSize: { min: 500000, max: 5000000 },
        preferredSectors: ['AI/ML', 'SaaS', 'Fintech'],
        preferredStages: ['Series A', 'Series B'],
        preferredGeographies: ['North America', 'Europe'],
        notes: 'Very interested in AI companies with strong technical teams',
        status: 'active',
        lastContact: '2024-01-15',
        tags: ['AI', 'SaaS', 'Active'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-15'
      },
      {
        id: '2',
        name: 'Michael Chen',
        email: 'michael@techgrowth.com',
        company: 'TechGrowth Ventures',
        title: 'Investment Director',
        investmentSize: { min: 1000000, max: 10000000 },
        preferredSectors: ['Healthcare', 'Biotech', 'Clean Energy'],
        preferredStages: ['Seed', 'Series A'],
        preferredGeographies: ['North America', 'Asia'],
        notes: 'Focus on breakthrough healthcare technologies',
        status: 'active',
        lastContact: '2024-01-10',
        tags: ['Healthcare', 'Biotech', 'Active'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-10'
      }
    ])

    setClients([
      {
        id: '1',
        name: 'Alex Rodriguez',
        company: 'AIFlow Solutions',
        sector: 'AI/ML',
        stage: 'Series A',
        geography: 'North America',
        fundingNeeded: 3000000,
        description: 'AI-powered workflow automation platform',
        status: 'raising'
      },
      {
        id: '2',
        name: 'Dr. Emily Watson',
        company: 'BioTech Innovations',
        sector: 'Healthcare',
        stage: 'Seed',
        geography: 'North America',
        fundingNeeded: 1500000,
        description: 'Revolutionary drug delivery system',
        status: 'raising'
      }
    ])
  }, [])

  const sectors = ['AI/ML', 'SaaS', 'Fintech', 'Healthcare', 'Biotech', 'Clean Energy', 'E-commerce', 'EdTech']
  const stages = ['Seed', 'Series A', 'Series B', 'Series C', 'Growth']
  const geographies = ['North America', 'Europe', 'Asia', 'Latin America', 'Africa', 'Global']

  const filteredInvestors = investors.filter(investor => {
    const matchesSearch = investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSector = !selectedSector || investor.preferredSectors.includes(selectedSector)
    const matchesStage = !selectedStage || investor.preferredStages.includes(selectedStage)
    const matchesGeography = !selectedGeography || investor.preferredGeographies.includes(selectedGeography)
    
    return matchesSearch && matchesSector && matchesStage && matchesGeography
  })

  const findMatches = (investor: Investor) => {
    return clients.filter(client => {
      const sectorMatch = investor.preferredSectors.includes(client.sector)
      const stageMatch = investor.preferredStages.includes(client.stage)
      const geographyMatch = investor.preferredGeographies.includes(client.geography)
      const sizeMatch = client.fundingNeeded >= investor.investmentSize.min && 
                       client.fundingNeeded <= investor.investmentSize.max
      
      return sectorMatch && stageMatch && geographyMatch && sizeMatch && client.status === 'raising'
    })
  }

  const handleMatchInvestor = (investor: Investor) => {
    setSelectedInvestor(investor)
    setMatchedClients(findMatches(investor))
    setShowMatchModal(true)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Cursus Capital Investor Rolodex</h1>
            <p className="text-gray-400 mt-2">Manage investor relationships and find perfect matches</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-accent-600 hover:bg-accent-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            Add Investor
          </button>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search investors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
            </div>
            
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
            >
              <option value="">All Sectors</option>
              {sectors.map(sector => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>
            
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
            >
              <option value="">All Stages</option>
              {stages.map(stage => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </select>
            
            <select
              value={selectedGeography}
              onChange={(e) => setSelectedGeography(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
            >
              <option value="">All Geographies</option>
              {geographies.map(geo => (
                <option key={geo} value={geo}>{geo}</option>
              ))}
            </select>
            
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedSector('')
                setSelectedStage('')
                setSelectedGeography('')
              }}
              className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <UserGroupIcon className="h-8 w-8 text-accent-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Investors</p>
                <p className="text-2xl font-bold text-white">{investors.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-8 w-8 text-green-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Active Investors</p>
                <p className="text-2xl font-bold text-white">
                  {investors.filter(i => i.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <BuildingOfficeIcon className="h-8 w-8 text-blue-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Companies</p>
                <p className="text-2xl font-bold text-white">
                  {new Set(investors.map(i => i.company)).size}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <GlobeAltIcon className="h-8 w-8 text-purple-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Geographies</p>
                <p className="text-2xl font-bold text-white">
                  {new Set(investors.flatMap(i => i.preferredGeographies)).size}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Investors List */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Investors ({filteredInvestors.length})</h2>
          </div>
          
          <div className="divide-y divide-gray-700">
            {filteredInvestors.map(investor => (
              <div key={investor.id} className="p-6 hover:bg-gray-750 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{investor.name}</h3>
                        <p className="text-gray-400">{investor.title} at {investor.company}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {investor.status === 'active' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        )}
                        {investor.status === 'inactive' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Inactive
                          </span>
                        )}
                        {investor.status === 'prospect' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Prospect
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Investment Range</p>
                        <p className="text-white font-medium">
                          {formatCurrency(investor.investmentSize.min)} - {formatCurrency(investor.investmentSize.max)}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-400">Preferred Sectors</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {investor.preferredSectors.map(sector => (
                            <span key={sector} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-accent-100 text-accent-800">
                              {sector}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-400">Preferred Stages</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {investor.preferredStages.map(stage => (
                            <span key={stage} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                              {stage}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {investor.notes && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-400">Notes</p>
                        <p className="text-white text-sm">{investor.notes}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-6">
                    <button
                      onClick={() => handleMatchInvestor(investor)}
                      className="bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                    >
                      <ChartBarIcon className="h-4 w-4" />
                      Find Matches
                    </button>
                    
                    <button className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded-lg transition-colors">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    
                    <button className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded-lg transition-colors">
                      <PencilIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Investor Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4">
              <h2 className="text-xl font-semibold text-white mb-4">Add New Investor</h2>
              {/* Add form here */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button className="bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Add Investor
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Match Modal */}
        {showMatchModal && selectedInvestor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Matches for {selectedInvestor.name}
                </h2>
                <button
                  onClick={() => setShowMatchModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-2">Investor Criteria</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Investment Range</p>
                    <p className="text-white">
                      {formatCurrency(selectedInvestor.investmentSize.min)} - {formatCurrency(selectedInvestor.investmentSize.max)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Sectors</p>
                    <p className="text-white">{selectedInvestor.preferredSectors.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Stages</p>
                    <p className="text-white">{selectedInvestor.preferredStages.join(', ')}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-4">
                  Matching Clients ({matchedClients.length})
                </h3>
                
                {matchedClients.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No matching clients found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {matchedClients.map(client => (
                      <div key={client.id} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-lg font-semibold text-white">{client.company}</h4>
                            <p className="text-gray-400">{client.name}</p>
                            <p className="text-white text-sm mt-2">{client.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-white">
                              {formatCurrency(client.fundingNeeded)}
                            </p>
                            <div className="flex gap-2 mt-2">
                              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-accent-100 text-accent-800">
                                {client.sector}
                              </span>
                              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                                {client.stage}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <button className="bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Introduce
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
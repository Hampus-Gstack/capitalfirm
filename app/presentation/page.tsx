'use client'
import { useState } from 'react'
import Link from 'next/link'
import { 
  ChartBarIcon, 
  DocumentArrowDownIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  StarIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'

export default function PresentationPage() {
  const [activeSection, setActiveSection] = useState('overview')

  const downloadPDF = () => {
    // In a real implementation, this would generate and download a PDF
    // For now, we'll simulate the download
    const link = document.createElement('a')
    link.href = '/api/download-presentation'
    link.download = 'ROIALS-CAPITAL-PRESENTATION-2025-Q2.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-900/20 to-primary-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center text-accent-400 hover:text-accent-300 transition-colors"
            >
              ← Back to Home
            </Link>
            <button
              onClick={downloadPDF}
              className="bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center"
            >
              <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
              Download PDF
            </button>
          </div>
          
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              ROIALS CAPITAL
            </h1>
            <p className="text-2xl text-gray-300 mb-4">Investment Presentation</p>
            <p className="text-xl text-accent-400">Q2 2025</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-black/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto py-4">
            {[
              { id: 'overview', label: 'Overview', icon: BuildingOfficeIcon },
              { id: 'market', label: 'Market Analysis', icon: GlobeAltIcon },
              { id: 'financials', label: 'Financials', icon: ChartBarIcon },
              { id: 'strategy', label: 'Strategy', icon: LightBulbIcon },
              { id: 'investment', label: 'Investment', icon: CurrencyDollarIcon },
              { id: 'team', label: 'Team', icon: UserGroupIcon }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeSection === section.id 
                    ? 'text-accent-400' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <section.icon className="h-4 w-4" />
                <span>{section.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeSection === 'overview' && (
          <div className="space-y-12">
            {/* Company Overview */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6">Company Overview</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">About ROIALS Capital</h3>
                  <p className="text-gray-300 mb-4">
                    ROIALS Capital is a leading investment firm specializing in growth-stage companies 
                    across technology, healthcare, and sustainable energy sectors. We provide strategic 
                    capital and operational expertise to help companies scale and achieve market leadership.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircleIcon className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">$500M+ Assets Under Management</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircleIcon className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">50+ Portfolio Companies</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircleIcon className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">15+ Years of Investment Experience</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Investment Focus</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Technology</span>
                      <span className="text-accent-400 font-medium">40%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-accent-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Healthcare</span>
                      <span className="text-accent-400 font-medium">30%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-accent-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Sustainable Energy</span>
                      <span className="text-accent-400 font-medium">20%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-accent-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Other</span>
                      <span className="text-accent-400 font-medium">10%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-accent-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-accent-500/10 rounded-lg">
                    <CurrencyDollarIcon className="h-6 w-6 text-accent-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Total AUM</p>
                    <p className="text-2xl font-bold text-white">$547M</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <ArrowTrendingUpIcon className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Average IRR</p>
                    <p className="text-2xl font-bold text-white">24.7%</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <UserGroupIcon className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Portfolio Companies</p>
                    <p className="text-2xl font-bold text-white">52</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'market' && (
          <div className="space-y-12">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6">Market Analysis</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Market Opportunity</h3>
                  <p className="text-gray-300 mb-4">
                    The global private equity market is experiencing unprecedented growth, driven by 
                    technological disruption, demographic shifts, and increasing institutional demand 
                    for alternative investments.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Global PE Market Size</span>
                      <span className="text-accent-400 font-medium">$4.5T</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Annual Growth Rate</span>
                      <span className="text-accent-400 font-medium">12.3%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Projected 2025 Size</span>
                      <span className="text-accent-400 font-medium">$6.2T</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Key Trends</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <StarIcon className="h-5 w-5 text-yellow-400 mt-0.5" />
                      <div>
                        <p className="text-white font-medium">ESG Integration</p>
                        <p className="text-gray-400 text-sm">Growing demand for sustainable investments</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <StarIcon className="h-5 w-5 text-yellow-400 mt-0.5" />
                      <div>
                        <p className="text-white font-medium">Technology Focus</p>
                        <p className="text-gray-400 text-sm">AI, fintech, and digital transformation</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <StarIcon className="h-5 w-5 text-yellow-400 mt-0.5" />
                      <div>
                        <p className="text-white font-medium">Geographic Diversification</p>
                        <p className="text-gray-400 text-sm">Emerging market opportunities</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Competitive Landscape</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent-400 mb-2">Top 10%</div>
                    <div className="text-gray-300 text-sm">Performance Ranking</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent-400 mb-2">15+ Years</div>
                    <div className="text-gray-300 text-sm">Track Record</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent-400 mb-2">$2.1B</div>
                    <div className="text-gray-300 text-sm">Total Returns Generated</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'financials' && (
          <div className="space-y-12">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6">Financial Performance</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Fund Performance</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Fund I (2010-2015)</span>
                      <span className="text-green-400 font-medium">32.4% IRR</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Fund II (2015-2020)</span>
                      <span className="text-green-400 font-medium">28.7% IRR</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Fund III (2020-2025)</span>
                      <span className="text-green-400 font-medium">24.7% IRR</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Fund IV (2025-Present)</span>
                      <span className="text-accent-400 font-medium">In Progress</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Key Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Total Capital Raised</span>
                      <span className="text-accent-400 font-medium">$547M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Total Value Created</span>
                      <span className="text-accent-400 font-medium">$2.1B</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Average Exit Multiple</span>
                      <span className="text-accent-400 font-medium">4.2x</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Management Fee</span>
                      <span className="text-accent-400 font-medium">2.0%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Portfolio Distribution</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-2">35%</div>
                    <div className="text-gray-300 text-sm">Exited</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-2">45%</div>
                    <div className="text-gray-300 text-sm">Active</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400 mb-2">15%</div>
                    <div className="text-gray-300 text-sm">Write-offs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent-400 mb-2">5%</div>
                    <div className="text-gray-300 text-sm">Other</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'strategy' && (
          <div className="space-y-12">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6">Investment Strategy</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Our Approach</h3>
                  <p className="text-gray-300 mb-6">
                    ROIALS Capital employs a disciplined, research-driven investment approach 
                    focused on identifying high-growth opportunities in underserved markets. 
                    We combine deep industry expertise with operational support to create 
                    sustainable value for our portfolio companies.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-accent-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-white font-medium">Sector Expertise</p>
                        <p className="text-gray-400 text-sm">Deep knowledge in target industries</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-accent-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-white font-medium">Operational Support</p>
                        <p className="text-gray-400 text-sm">Hands-on value creation</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-accent-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-white font-medium">Network Access</p>
                        <p className="text-gray-400 text-sm">Strategic partnerships and relationships</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Investment Criteria</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Revenue Range</span>
                      <span className="text-accent-400 font-medium">$10M - $100M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Growth Rate</span>
                      <span className="text-accent-400 font-medium">20%+ Annually</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Investment Size</span>
                      <span className="text-accent-400 font-medium">$5M - $50M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Hold Period</span>
                      <span className="text-accent-400 font-medium">3-7 Years</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Value Creation Framework</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-accent-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <LightBulbIcon className="h-6 w-6 text-accent-400" />
                    </div>
                    <h4 className="text-white font-medium mb-2">Strategic Planning</h4>
                    <p className="text-gray-400 text-sm">Develop growth strategies and market positioning</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <ChartBarIcon className="h-6 w-6 text-green-400" />
                    </div>
                    <h4 className="text-white font-medium mb-2">Operational Excellence</h4>
                    <p className="text-gray-400 text-sm">Optimize processes and improve efficiency</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <UserGroupIcon className="h-6 w-6 text-blue-400" />
                    </div>
                    <h4 className="text-white font-medium mb-2">Talent Development</h4>
                    <p className="text-gray-400 text-sm">Build strong management teams</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'investment' && (
          <div className="space-y-12">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6">Investment Opportunity</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Fund IV Overview</h3>
                  <p className="text-gray-300 mb-6">
                    ROIALS Capital Fund IV represents our latest investment vehicle, targeting 
                    $200M in commitments to continue our successful investment strategy across 
                    technology, healthcare, and sustainable energy sectors.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Target Fund Size</span>
                      <span className="text-accent-400 font-medium">$200M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Minimum Investment</span>
                      <span className="text-accent-400 font-medium">$5M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Fund Term</span>
                      <span className="text-accent-400 font-medium">10 Years</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Management Fee</span>
                      <span className="text-accent-400 font-medium">2.0%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Expected Returns</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Target IRR</span>
                      <span className="text-accent-400 font-medium">25-30%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Target Multiple</span>
                      <span className="text-accent-400 font-medium">3.0-4.0x</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Investment Period</span>
                      <span className="text-accent-400 font-medium">3-4 Years</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Harvest Period</span>
                      <span className="text-accent-400 font-medium">6-7 Years</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Use of Proceeds</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent-400 mb-2">70%</div>
                    <div className="text-gray-300 text-sm">Portfolio Investments</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent-400 mb-2">20%</div>
                    <div className="text-gray-300 text-sm">Follow-on Investments</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent-400 mb-2">10%</div>
                    <div className="text-gray-300 text-sm">Fund Expenses</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'team' && (
          <div className="space-y-12">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6">Investment Team</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gray-800 rounded-xl p-6 text-center">
                  <div className="w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">JS</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">John Smith</h3>
                  <p className="text-accent-400 mb-2">Managing Partner</p>
                  <p className="text-gray-400 text-sm">
                    20+ years in private equity. Former partner at Blackstone. 
                    Led 15+ successful exits with average 4.2x returns.
                  </p>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 text-center">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">SJ</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Sarah Johnson</h3>
                  <p className="text-accent-400 mb-2">Partner</p>
                  <p className="text-gray-400 text-sm">
                    Technology sector expert. Former VP at Google Ventures. 
                    Specializes in SaaS and fintech investments.
                  </p>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 text-center">
                  <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">MC</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Mike Chen</h3>
                  <p className="text-accent-400 mb-2">Partner</p>
                  <p className="text-gray-400 text-sm">
                    Healthcare and biotech specialist. PhD from Stanford. 
                    Led investments in 8 FDA-approved therapeutics.
                  </p>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 text-center">
                  <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">AL</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Anna Lee</h3>
                  <p className="text-accent-400 mb-2">Principal</p>
                  <p className="text-gray-400 text-sm">
                    Sustainable energy expert. Former Tesla executive. 
                    Focuses on renewable energy and cleantech investments.
                  </p>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 text-center">
                  <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">RK</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Robert Kim</h3>
                  <p className="text-accent-400 mb-2">Vice President</p>
                  <p className="text-gray-400 text-sm">
                    Operations specialist. Former McKinsey consultant. 
                    Leads value creation initiatives across portfolio.
                  </p>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 text-center">
                  <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">LD</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Lisa Davis</h3>
                  <p className="text-accent-400 mb-2">Vice President</p>
                  <p className="text-gray-400 text-sm">
                    Finance and IR expert. Former Goldman Sachs. 
                    Manages investor relations and fund operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
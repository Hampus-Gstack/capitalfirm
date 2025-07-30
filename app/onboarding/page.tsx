'use client'
import { useState } from 'react'
import Link from 'next/link'
import { 
  PlayIcon, 
  DocumentTextIcon, 
  UserGroupIcon, 
  CalendarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

export default function OnboardingPage() {
  const [activeStep, setActiveStep] = useState(1)
  const [userType, setUserType] = useState<'funds' | 'startups' | null>(null)

  const steps = [
    { id: 1, title: 'Watch Orientation Video', icon: PlayIcon },
    { id: 2, title: 'Fill Out Onboarding Form', icon: DocumentTextIcon },
    { id: 3, title: 'Review Resources', icon: UserGroupIcon },
    { id: 4, title: 'Book Onboarding Call', icon: CalendarIcon }
  ]

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
          </div>
          
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Capital Firm
            </h1>
            <p className="text-2xl text-gray-300 mb-4">Onboarding Process</p>
            <p className="text-xl text-accent-400">Get started with your capital raising journey</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div 
                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                  activeStep >= step.id 
                    ? 'border-accent-500 bg-accent-500 text-white' 
                    : 'border-gray-600 text-gray-400'
                }`}
              >
                {activeStep > step.id ? (
                  <CheckCircleIcon className="h-6 w-6" />
                ) : (
                  <step.icon className="h-6 w-6" />
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  activeStep >= step.id ? 'text-white' : 'text-gray-400'
                }`}>
                  Step {step.id}
                </p>
                <p className={`text-xs ${
                  activeStep >= step.id ? 'text-accent-400' : 'text-gray-500'
                }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  activeStep > step.id ? 'bg-accent-500' : 'bg-gray-600'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {activeStep === 1 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Step One</h2>
              <h3 className="text-xl text-gray-300">Watch the orientation video below</h3>
            </div>

            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
              <div className="aspect-video bg-gray-800 rounded-xl flex items-center justify-center mb-6">
                <div className="text-center">
                  <PlayIcon className="h-16 w-16 text-accent-400 mx-auto mb-4" />
                  <p className="text-gray-400">Orientation Video</p>
                  <p className="text-sm text-gray-500 mt-2">Learn about our process and what to expect</p>
                </div>
              </div>
              
              <div className="text-center">
                <button
                  onClick={() => setActiveStep(2)}
                  className="bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center mx-auto"
                >
                  Continue to Step Two
                  <ArrowRightIcon className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Step Two</h2>
              <h3 className="text-xl text-gray-300">Fill Out The Onboarding Form</h3>
            </div>

            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div 
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    userType === 'funds' 
                      ? 'border-accent-500 bg-accent-500/10' 
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  onClick={() => setUserType('funds')}
                >
                  <div className="text-center">
                    <UserGroupIcon className="h-12 w-12 text-accent-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">For Funds</h3>
                    <p className="text-gray-400 text-sm">
                      Investment funds looking to raise capital or manage investor relations
                    </p>
                  </div>
                </div>

                <div 
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    userType === 'startups' 
                      ? 'border-accent-500 bg-accent-500/10' 
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  onClick={() => setUserType('startups')}
                >
                  <div className="text-center">
                    <DocumentTextIcon className="h-12 w-12 text-accent-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">For Startups</h3>
                    <p className="text-gray-400 text-sm">
                      Early-stage companies seeking funding and investor connections
                    </p>
                  </div>
                </div>
              </div>

              {userType && (
                <div className="bg-gray-800 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">
                    {userType === 'funds' ? 'Fund Onboarding Form' : 'Startup Onboarding Form'}
                  </h4>
                  
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Company/Fund Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-500 transition-colors"
                          placeholder="Enter company name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Contact Person
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-500 transition-colors"
                          placeholder="Enter contact name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-500 transition-colors"
                          placeholder="Enter email address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-500 transition-colors"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Funding Target
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-500 transition-colors"
                        placeholder="e.g., $5M Series A, $50M Fund II"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Timeline
                      </label>
                      <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-accent-500 transition-colors">
                        <option value="">Select timeline</option>
                        <option value="immediate">Immediate (0-3 months)</option>
                        <option value="short">Short term (3-6 months)</option>
                        <option value="medium">Medium term (6-12 months)</option>
                        <option value="long">Long term (12+ months)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Additional Information
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-500 transition-colors"
                        placeholder="Tell us about your funding needs, current stage, and any specific requirements..."
                      />
                    </div>
                  </form>

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setActiveStep(3)}
                      className="bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center mx-auto"
                    >
                      Continue to Step Three
                      <ArrowRightIcon className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Step Three</h2>
              <h3 className="text-xl text-gray-300">Go Through The Relevant Resources</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-accent-500 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <DocumentTextIcon className="h-8 w-8 text-accent-400" />
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Pitch Deck Database</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Access our curated collection of successful pitch decks and fundraising materials
                </p>
                <div className="text-accent-400 text-sm font-medium">View Resources →</div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-accent-500 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <UserGroupIcon className="h-8 w-8 text-accent-400" />
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Solving For Investor Type</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Learn how to identify and target the right investors for your specific needs
                </p>
                <div className="text-accent-400 text-sm font-medium">View Resources →</div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-accent-500 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <DocumentTextIcon className="h-8 w-8 text-accent-400" />
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Due Diligence Requirements</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Understand what investors need and how to prepare your documentation
                </p>
                <div className="text-accent-400 text-sm font-medium">View Resources →</div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-accent-500 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <DocumentTextIcon className="h-8 w-8 text-accent-400" />
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Capital Raising Guide</h3>
                <p className="text-gray-400 text-sm mb-4">
                  A definitive guide to efficiently raising capital during market challenges
                </p>
                <div className="text-accent-400 text-sm font-medium">View Resources →</div>
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => setActiveStep(4)}
                className="bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center mx-auto"
              >
                Continue to Step Four
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        )}

        {activeStep === 4 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Step Four</h2>
              <h3 className="text-xl text-gray-300">Book Your Onboarding Call Below</h3>
            </div>

            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
              <div className="text-center mb-8">
                <CalendarIcon className="h-16 w-16 text-accent-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-2">Schedule Your Onboarding Call</h3>
                <p className="text-gray-400">
                  Let's discuss your specific needs and create a customized capital raising strategy
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gray-800 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">What to Expect</h4>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-accent-400 mr-3 mt-0.5" />
                      <span>30-minute strategy session</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-accent-400 mr-3 mt-0.5" />
                      <span>Customized approach discussion</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-accent-400 mr-3 mt-0.5" />
                      <span>Next steps and timeline</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-accent-400 mr-3 mt-0.5" />
                      <span>Q&A session</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-800 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Preparation</h4>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-accent-400 mr-3 mt-0.5" />
                      <span>Review your business plan</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-accent-400 mr-3 mt-0.5" />
                      <span>Prepare funding requirements</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-accent-400 mr-3 mt-0.5" />
                      <span>List your key questions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-accent-400 mr-3 mt-0.5" />
                      <span>Have your pitch deck ready</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <button className="bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center mx-auto text-lg">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Book Your Onboarding Call
                </button>
                <p className="text-gray-400 text-sm mt-4">
                  Get started with your capital raising journey today
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
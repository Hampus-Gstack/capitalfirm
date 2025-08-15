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
import StartupOnboardingForm from '@/components/StartupOnboardingForm'
import FundOnboardingForm from '@/components/FundOnboardingForm'

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
              Cursus Capital
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
              <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden mb-6">
                <iframe
                  src="https://www.loom.com/embed/your-loom-video-id"
                  frameBorder="0"
                  allowFullScreen
                  className="w-full h-full"
                  title="Cursus Capital Onboarding Video"
                ></iframe>
              </div>
              
              <div className="flex justify-center space-x-6">
                <button
                  onClick={() => setActiveStep(1)}
                  disabled={activeStep === 1}
                  className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 flex items-center min-w-[140px] justify-center"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => setActiveStep(2)}
                  className="bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center min-w-[140px] justify-center"
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
                  
                  {userType === 'funds' ? (
                    <FundOnboardingForm />
                  ) : (
                    <StartupOnboardingForm />
                  )}

                  <div className="mt-6 flex justify-center space-x-6">
                    <button
                      onClick={() => setActiveStep(1)}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 flex items-center min-w-[140px] justify-center"
                    >
                      ← Previous
                    </button>
                    <button
                      onClick={() => setActiveStep(3)}
                      className="bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center min-w-[140px] justify-center"
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
                <a 
                  href="#"
                  className="text-accent-400 text-sm font-medium hover:text-accent-300 transition-colors"
                >
                  View Resources →
                </a>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-accent-500 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <UserGroupIcon className="h-8 w-8 text-accent-400" />
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Solving For Investor Type</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Comprehensive matrix covering 7 investor types with stage, deal type, valuation, and outreach strategies
                </p>
                <a 
                  href="https://docs.google.com/spreadsheets/d/14zqS5SZGG6aaQ-LsoOaZIZOz3q-X5-S6D1xqUwmNtpU/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-400 text-sm font-medium hover:text-accent-300 transition-colors"
                >
                  View Matrix →
                </a>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-accent-500 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <DocumentTextIcon className="h-8 w-8 text-accent-400" />
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Due Diligence Requirements</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Comprehensive checklist covering Finance, Legal, HR, Assets, IT, and Market Analysis
                </p>
                <a 
                  href="https://docs.google.com/spreadsheets/d/1_ZYV_ENwFMSGX6m5LrL1UThM4_vjy_ufiaMSiofqteI/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-400 text-sm font-medium hover:text-accent-300 transition-colors"
                >
                  View Checklist →
                </a>
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
                <a 
                  href="https://docs.google.com/document/d/1fn6TYCtRYvuFRmMx8r-miV_DO6A__mSlEWK86IuE9os/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-400 text-sm font-medium hover:text-accent-300 transition-colors"
                >
                  View Guide →
                </a>
              </div>
            </div>

            <div className="flex justify-center space-x-6 mt-8">
              <button
                onClick={() => setActiveStep(2)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 flex items-center min-w-[140px] justify-center"
              >
                ← Previous
              </button>
              <button
                onClick={() => setActiveStep(4)}
                className="bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center min-w-[140px] justify-center"
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
              <h3 className="text-xl text-gray-300">Book Your Onboarding Call</h3>
            </div>

            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
              <div className="text-center mb-8">
                <CalendarIcon className="h-16 w-16 text-accent-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
                <p className="text-gray-400 text-lg">
                  Schedule your onboarding call with our team to discuss your capital raising strategy
                </p>
              </div>

              <div className="flex justify-center space-x-6">
                <button
                  onClick={() => setActiveStep(3)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 flex items-center min-w-[140px] justify-center"
                >
                  ← Previous
                </button>
                <button className="bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center text-lg min-w-[140px] justify-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Book Your Onboarding Call
                </button>
              </div>
              <div className="text-center mt-4">
                <p className="text-gray-400 text-sm">
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
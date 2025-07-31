'use client'
import { useState } from 'react'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'

interface FormData {
  companyName: string
  onboardingDate: string
  avalancheRepresentative: string
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  companyDescription: string
  dataRoomLink: string
  yearFounded: string
  companyHQ: string
  fundStructure: string
  highlights: string
  targetIRR: string
  portfolioAllocation: string
  targetRaiseCloseDate: string
  investmentTerm: string
  investmentJurisdiction: string
  managementTeam: string
  descriptionOfUnits: string
  currentAUM: string
  managementFees: string
  totalFundRaiseAmount: string
  takingInvestorCalls: string
  emailNames: string
  forwardingDomain: string
  investorPresentation: string
  existingInvestors: string
  salesAssets: string
}

export default function FundOnboardingForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    onboardingDate: '',
    avalancheRepresentative: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    companyDescription: '',
    dataRoomLink: '',
    yearFounded: '',
    companyHQ: '',
    fundStructure: '',
    highlights: '',
    targetIRR: '',
    portfolioAllocation: '',
    targetRaiseCloseDate: '',
    investmentTerm: '',
    investmentJurisdiction: '',
    managementTeam: '',
    descriptionOfUnits: '',
    currentAUM: '',
    managementFees: '',
    totalFundRaiseAmount: '',
    takingInvestorCalls: '',
    emailNames: '',
    forwardingDomain: '',
    investorPresentation: '',
    existingInvestors: '',
    salesAssets: ''
  })

  const totalSteps = 26

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Company Name</h3>
            </div>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => updateFormData('companyName', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              placeholder="Enter your company name"
            />
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Date of Onboarding</h3>
            </div>
            <input
              type="date"
              value={formData.onboardingDate}
              onChange={(e) => updateFormData('onboardingDate', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
            />
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Who is your representative from Avalanche Capital?</h3>
            </div>
            <input
              type="text"
              value={formData.avalancheRepresentative}
              onChange={(e) => updateFormData('avalancheRepresentative', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              placeholder="Enter representative name"
            />
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Your Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => updateFormData('firstName', e.target.value)}
                className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                placeholder="First name"
              />
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => updateFormData('lastName', e.target.value)}
                className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                placeholder="Last name"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                placeholder="Phone number"
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                placeholder="Email"
              />
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Company Description</h3>
              <p className="text-gray-400">Brief introduction to the company, snapshot of the company's main objective or area of expertise.</p>
            </div>
            <textarea
              value={formData.companyDescription}
              onChange={(e) => updateFormData('companyDescription', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              rows={4}
              placeholder="Type your answer here…"
            />
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Data Room Link</h3>
            </div>
            <input
              type="url"
              value={formData.dataRoomLink}
              onChange={(e) => updateFormData('dataRoomLink', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              placeholder="https://your-data-room-link.com"
            />
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Year Founded</h3>
            </div>
            <input
              type="number"
              value={formData.yearFounded}
              onChange={(e) => updateFormData('yearFounded', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              placeholder="e.g., 2020"
              min="1900"
              max="2030"
            />
          </div>
        )

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Company HQ</h3>
            </div>
            <input
              type="text"
              value={formData.companyHQ}
              onChange={(e) => updateFormData('companyHQ', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              placeholder="e.g., New York, NY"
            />
          </div>
        )

      case 9:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Fund Structure</h3>
              <p className="text-gray-400">Distribution, Capital appreciation, Hold period, Redemption, DRIP, Tax efficiency etc…</p>
            </div>
            <textarea
              value={formData.fundStructure}
              onChange={(e) => updateFormData('fundStructure', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              rows={4}
              placeholder="Describe your fund structure, distribution policy, hold periods, redemption terms, DRIP options, and tax efficiency features..."
            />
          </div>
        )

      case 10:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Highlights</h3>
              <p className="text-gray-400">Fund Highlights and Strategies</p>
            </div>
            <textarea
              value={formData.highlights}
              onChange={(e) => updateFormData('highlights', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              rows={4}
              placeholder="Describe your fund highlights, key strategies, and competitive advantages..."
            />
          </div>
        )

      case 11:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Target IRR / MOIC</h3>
              <p className="text-gray-400">Target IRR / MOIC and Hurdle rate if applicable</p>
            </div>
            <textarea
              value={formData.targetIRR}
              onChange={(e) => updateFormData('targetIRR', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              rows={4}
              placeholder="Describe your target IRR, MOIC, and hurdle rate if applicable..."
            />
          </div>
        )

      case 12:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Portfolio Allocation</h3>
              <p className="text-gray-400">Portfolio Asset Allocation – asset type and geography</p>
            </div>
            <textarea
              value={formData.portfolioAllocation}
              onChange={(e) => updateFormData('portfolioAllocation', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              rows={4}
              placeholder="Describe your portfolio asset allocation by asset type and geography..."
            />
          </div>
        )

      case 13:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Target Raise and Close Date</h3>
              <p className="text-gray-400">Type your answer here…</p>
            </div>
            <input
              type="text"
              value={formData.targetRaiseCloseDate}
              onChange={(e) => updateFormData('targetRaiseCloseDate', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              placeholder="e.g., $50M target, Q4 2024 close"
            />
          </div>
        )

      case 14:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Investment Term</h3>
              <p className="text-gray-400">Type your answer here…</p>
            </div>
            <input
              type="text"
              value={formData.investmentTerm}
              onChange={(e) => updateFormData('investmentTerm', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              placeholder="e.g., 5-7 years"
            />
          </div>
        )

      case 15:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Investment Jurisdiction</h3>
              <p className="text-gray-400">Type your answer here…</p>
            </div>
            <input
              type="text"
              value={formData.investmentJurisdiction}
              onChange={(e) => updateFormData('investmentJurisdiction', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              placeholder="e.g., Delaware, Cayman Islands"
            />
          </div>
        )

      case 16:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Management Team</h3>
              <p className="text-gray-400">Fund Management team and participation (% of Fund)</p>
            </div>
            <textarea
              value={formData.managementTeam}
              onChange={(e) => updateFormData('managementTeam', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              rows={4}
              placeholder="Describe your fund management team and their participation percentage in the fund..."
            />
          </div>
        )

      case 17:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Description of Units</h3>
              <p className="text-gray-400">Describe different Series of Units available</p>
            </div>
            <textarea
              value={formData.descriptionOfUnits}
              onChange={(e) => updateFormData('descriptionOfUnits', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              rows={4}
              placeholder="Describe the different series of units available and their features..."
            />
          </div>
        )

      case 18:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Current AUM</h3>
              <p className="text-gray-400">Current AUM if applicable</p>
            </div>
            <input
              type="text"
              value={formData.currentAUM}
              onChange={(e) => updateFormData('currentAUM', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              placeholder="e.g., $100M AUM"
            />
          </div>
        )

      case 19:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Management Fees</h3>
              <p className="text-gray-400">Type your answer here…</p>
            </div>
            <input
              type="text"
              value={formData.managementFees}
              onChange={(e) => updateFormData('managementFees', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              placeholder="e.g., 2% management fee"
            />
          </div>
        )

      case 20:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Total Fund Raise Amount</h3>
              <p className="text-gray-400">Type your answer here…</p>
            </div>
            <input
              type="text"
              value={formData.totalFundRaiseAmount}
              onChange={(e) => updateFormData('totalFundRaiseAmount', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              placeholder="e.g., $50M fund size"
            />
          </div>
        )

      case 21:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Who will be taking the investor calls? And are you okay with using that name for outreach?</h3>
              <p className="text-gray-400">If not, we'll use generic names to conduct our efforts. Example: firstname@companyname.com</p>
            </div>
            <div className="space-y-3">
              {['Yes', 'No'].map((option) => (
                <label key={option} className="flex items-center p-4 bg-gray-700 rounded-xl cursor-pointer hover:bg-gray-600 transition-colors">
                  <input
                    type="radio"
                    name="takingInvestorCalls"
                    value={option}
                    checked={formData.takingInvestorCalls === option}
                    onChange={(e) => updateFormData('takingInvestorCalls', e.target.value)}
                    className="mr-3 text-accent-500 focus:ring-accent-500"
                  />
                  <span className="text-white text-lg">{option}</span>
                </label>
              ))}
            </div>
          </div>
        )

      case 22:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Email Names</h3>
              <p className="text-gray-400">Please provide us with the first and last names of 3 separate team members who we can create email addresses for.</p>
            </div>
            <textarea
              value={formData.emailNames}
              onChange={(e) => updateFormData('emailNames', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              rows={4}
              placeholder="Provide first and last names of 3 team members for email addresses..."
            />
          </div>
        )

      case 23:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Forwarding Domain</h3>
              <p className="text-gray-400">We will purchase new domains for these email addresses, using a look-a-like variation of your company name. Please provide us with a forwarding domain, either your website or the link to a non-confidential deck.</p>
            </div>
            <input
              type="url"
              value={formData.forwardingDomain}
              onChange={(e) => updateFormData('forwardingDomain', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              placeholder="https://your-website.com or deck link"
            />
          </div>
        )

      case 24:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Investor Presentation</h3>
              <p className="text-gray-400">Please share a link to your investment presentation video. (If it is a file, you can share it in the next field)</p>
            </div>
            <input
              type="url"
              value={formData.investorPresentation}
              onChange={(e) => updateFormData('investorPresentation', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              placeholder="https://your-presentation-link.com"
            />
          </div>
        )

      case 25:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Please provide us a list of all Investors/LPs you're in discussions with</h3>
              <p className="text-gray-400">This blacklist will ensure no overlapping takes place with existing stakeholders.</p>
            </div>
            <textarea
              value={formData.existingInvestors}
              onChange={(e) => updateFormData('existingInvestors', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              rows={4}
              placeholder="List all investors/LPs you're currently in discussions with..."
            />
          </div>
        )

      case 26:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Your Sales Assets</h3>
              <p className="text-gray-400">Please share your Investor Decks, Investment Track Record etc</p>
            </div>
            <textarea
              value={formData.salesAssets}
              onChange={(e) => updateFormData('salesAssets', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              rows={4}
              placeholder="Share your investor decks, investment track record, and other sales materials..."
            />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-accent-500 to-accent-400 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
      
      {/* Step Counter */}
      <div className="text-center">
        <p className="text-gray-400 text-sm">
          Step {currentStep} of {totalSteps}
        </p>
      </div>

      {/* Form Content */}
      <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="flex justify-center space-x-6">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center px-8 py-4 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200 min-w-[140px] justify-center"
        >
          <ChevronLeftIcon className="h-5 w-5 mr-2" />
          Previous
        </button>
        
        <button
          onClick={nextStep}
          disabled={currentStep === totalSteps}
          className="flex items-center px-8 py-4 bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 min-w-[140px] justify-center"
        >
          {currentStep === totalSteps ? 'Submit' : 'Next'}
          <ChevronRightIcon className="h-5 w-5 ml-2" />
        </button>
      </div>
    </div>
  )
} 
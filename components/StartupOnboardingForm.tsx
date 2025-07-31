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
  foundedYear: string
  companyHQ: string
  uniqueValueProposition: string
  industryVertical: string
  comparableCompanies: string
  differentiation: string
  highlights: string
  teamExperience: string
  leadershipEquity: string
  raisedToDate: string
  strategicPartnerships: string
  financials: string
  projections: string
  monthlyBurnRate: string
  runway: string
  nearTermCatalysts: string
  companyStage: string
  capitalToRaise: string
  preMoneyValuation: string
  closedPortion: string
  exitStrategy: string
  dealType: string
  preferredInvestorType: string
  takingInvestorCalls: string
  emailNames: string
  forwardingDomain: string
  investorPresentation: string
  existingInvestors: string
  salesAssets: string
}

export default function StartupOnboardingForm() {
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
    foundedYear: '',
    companyHQ: '',
    uniqueValueProposition: '',
    industryVertical: '',
    comparableCompanies: '',
    differentiation: '',
    highlights: '',
    teamExperience: '',
    leadershipEquity: '',
    raisedToDate: '',
    strategicPartnerships: '',
    financials: '',
    projections: '',
    monthlyBurnRate: '',
    runway: '',
    nearTermCatalysts: '',
    companyStage: '',
    capitalToRaise: '',
    preMoneyValuation: '',
    closedPortion: '',
    exitStrategy: '',
    dealType: '',
    preferredInvestorType: '',
    takingInvestorCalls: '',
    emailNames: '',
    forwardingDomain: '',
    investorPresentation: '',
    existingInvestors: '',
    salesAssets: ''
  })

  const totalSteps = 35

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
              <h3 className="text-2xl font-bold text-white mb-2">Company Name *</h3>
              <p className="text-gray-400">Type your answer here…</p>
            </div>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => updateFormData('companyName', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              placeholder="Enter your company name"
              required
            />
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Date of Onboarding *</h3>
              <p className="text-gray-400">Month / Day / Year</p>
            </div>
            <input
              type="date"
              value={formData.onboardingDate}
              onChange={(e) => updateFormData('onboardingDate', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              required
            />
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Who is your representative from Avalanche Capital? *</h3>
              <p className="text-gray-400">Type your answer here…</p>
            </div>
            <input
              type="text"
              value={formData.avalancheRepresentative}
              onChange={(e) => updateFormData('avalancheRepresentative', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              placeholder="Enter representative name"
              required
            />
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Your Information</h3>
              <p className="text-gray-400">First name, Last name, Phone number, Email</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => updateFormData('firstName', e.target.value)}
                className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                placeholder="First name"
                required
              />
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => updateFormData('lastName', e.target.value)}
                className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                placeholder="Last name"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                placeholder="Phone number"
                required
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                placeholder="Email"
                required
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
              <h3 className="text-2xl font-bold text-white mb-2">Data Room Link *</h3>
              <p className="text-gray-400">Please provide us with a link to your full data room.</p>
            </div>
            <input
              type="url"
              value={formData.dataRoomLink}
              onChange={(e) => updateFormData('dataRoomLink', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              placeholder="Type your answer here…"
              required
            />
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">What year was the company founded in? *</h3>
              <p className="text-gray-400">Type your answer here…</p>
            </div>
            <input
              type="number"
              value={formData.foundedYear}
              onChange={(e) => updateFormData('foundedYear', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              placeholder="e.g., 2020"
              min="1900"
              max="2030"
              required
            />
          </div>
        )

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Company HQ *</h3>
              <p className="text-gray-400">Type your answer here…</p>
            </div>
            <input
              type="text"
              value={formData.companyHQ}
              onChange={(e) => updateFormData('companyHQ', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              placeholder="e.g., San Francisco, CA"
              required
            />
          </div>
        )

      case 9:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">What is the company's unique value proposition? *</h3>
              <p className="text-gray-400">Please share some more information on what makes this an attractive investment opportunity.</p>
            </div>
            <textarea
              value={formData.uniqueValueProposition}
              onChange={(e) => updateFormData('uniqueValueProposition', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              rows={4}
              placeholder="Type your answer here…"
              required
            />
          </div>
        )

      case 10:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">What industry and vertical is your company in? *</h3>
              <p className="text-gray-400">Type your answer here…</p>
            </div>
            <input
              type="text"
              value={formData.industryVertical}
              onChange={(e) => updateFormData('industryVertical', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              placeholder="e.g., Fintech - Payments"
              required
            />
          </div>
        )

      case 11:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Please provide us with a list of comparable companies, direct and adjacent. *</h3>
              <p className="text-gray-400">Type your answer here…</p>
            </div>
            <textarea
              value={formData.comparableCompanies}
              onChange={(e) => updateFormData('comparableCompanies', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              rows={4}
              placeholder="Type your answer here…"
              required
            />
          </div>
        )

      case 12:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">What makes your company different from the list of names provided previously? *</h3>
              <p className="text-gray-400">Type your answer here…</p>
            </div>
            <textarea
              value={formData.differentiation}
              onChange={(e) => updateFormData('differentiation', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              rows={4}
              placeholder="Type your answer here…"
              required
            />
          </div>
        )

      case 13:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Highlights</h3>
              <p className="text-gray-400">Please outline the most salient features or attributes of the company in bullet points.</p>
            </div>
            <textarea
              value={formData.highlights}
              onChange={(e) => updateFormData('highlights', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              rows={4}
              placeholder="Type your answer here…"
            />
          </div>
        )

      case 14:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Could you share more information on the team, and its experience/industry relevancy? *</h3>
              <p className="text-gray-400">Type your answer here…</p>
            </div>
            <textarea
              value={formData.teamExperience}
              onChange={(e) => updateFormData('teamExperience', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              rows={4}
              placeholder="Type your answer here…"
              required
            />
          </div>
        )

      case 15:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">How much equity has been attributed to the leadership team? *</h3>
              <p className="text-gray-400">Type your answer here…</p>
            </div>
            <input
              type="text"
              value={formData.leadershipEquity}
              onChange={(e) => updateFormData('leadershipEquity', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              placeholder="e.g., 60%"
              required
            />
          </div>
        )

      case 16:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">How much money has been raised to date? *</h3>
              <p className="text-gray-400">Please provide us with the timelines on previous rounds, and its valuations.</p>
            </div>
            <textarea
              value={formData.raisedToDate}
              onChange={(e) => updateFormData('raisedToDate', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              rows={4}
              placeholder="Type your answer here…"
              required
            />
          </div>
        )

      case 17:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Are there any relevant key strategic partnerships or collaborations that ought to be mentioned? *</h3>
              <p className="text-gray-400">Type your answer here…</p>
            </div>
            <textarea
              value={formData.strategicPartnerships}
              onChange={(e) => updateFormData('strategicPartnerships', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              rows={4}
              placeholder="Type your answer here…"
              required
            />
          </div>
        )

      case 18:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Financials</h3>
              <p className="text-gray-400">Would you kindly share the past 3 years, if possible? *</p>
            </div>
            <textarea
              value={formData.financials}
              onChange={(e) => updateFormData('financials', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              rows={4}
              placeholder="Type your answer here…"
              required
            />
          </div>
        )

      case 19:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Projections</h3>
              <p className="text-gray-400">Would you kindly share the projections for the next 3 years? *</p>
            </div>
            <textarea
              value={formData.projections}
              onChange={(e) => updateFormData('projections', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              rows={4}
              placeholder="Type your answer here…"
              required
            />
          </div>
        )

      case 20:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">What is your company's monthly burn rate? *</h3>
              <p className="text-gray-400">Type your answer here…</p>
            </div>
            <input
              type="text"
              value={formData.monthlyBurnRate}
              onChange={(e) => updateFormData('monthlyBurnRate', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              placeholder="e.g., $50,000"
              required
            />
          </div>
        )

      case 21:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">What is your company's runway? *</h3>
              <p className="text-gray-400">Type your answer here…</p>
            </div>
            <input
              type="text"
              value={formData.runway}
              onChange={(e) => updateFormData('runway', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              placeholder="e.g., 18 months"
              required
            />
          </div>
        )

      case 22:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Are there any significant near term catalysts?</h3>
              <p className="text-gray-400">If so, which?</p>
            </div>
            <textarea
              value={formData.nearTermCatalysts}
              onChange={(e) => updateFormData('nearTermCatalysts', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              rows={4}
              placeholder="Type your answer here…"
            />
          </div>
        )

      case 23:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">What stage is your company in? *</h3>
              <p className="text-gray-400">Options:</p>
            </div>
            <div className="space-y-3">
              {['Idea', 'Pre-Revenue', 'Early Revenue', 'Scaling', 'Growth', 'Pre-IPO', 'Public'].map((stage) => (
                <label key={stage} className="flex items-center p-4 bg-gray-700 rounded-xl cursor-pointer hover:bg-gray-600 transition-colors">
                  <input
                    type="radio"
                    name="companyStage"
                    value={stage}
                    checked={formData.companyStage === stage}
                    onChange={(e) => updateFormData('companyStage', e.target.value)}
                    className="mr-3 text-accent-500 focus:ring-accent-500"
                    required
                  />
                  <span className="text-white text-lg">{stage}</span>
                </label>
              ))}
            </div>
          </div>
        )

      case 24:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">What is the total amount of capital you'd be looking to raise? *</h3>
              <p className="text-gray-400">Type your answer here…</p>
            </div>
            <input
              type="text"
              value={formData.capitalToRaise}
              onChange={(e) => updateFormData('capitalToRaise', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              placeholder="e.g., $2M"
              required
            />
          </div>
        )

      case 25:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">What is your company's pre-money valuation? *</h3>
              <p className="text-gray-400">Type your answer here…</p>
            </div>
            <input
              type="text"
              value={formData.preMoneyValuation}
              onChange={(e) => updateFormData('preMoneyValuation', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              placeholder="e.g., $10M"
              required
            />
          </div>
        )

      case 26:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Have you closed out any portion of this round? *</h3>
              <p className="text-gray-400">Please share soft/hard commitments, as well as any visibility you may have.</p>
            </div>
            <textarea
              value={formData.closedPortion}
              onChange={(e) => updateFormData('closedPortion', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              rows={4}
              placeholder="Type your answer here…"
              required
            />
          </div>
        )

      case 27:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">What is your exit strategy? *</h3>
              <p className="text-gray-400">Please share more information on your long-term aspirations, and plans for an exit.</p>
            </div>
            <textarea
              value={formData.exitStrategy}
              onChange={(e) => updateFormData('exitStrategy', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              rows={4}
              placeholder="Type your answer here…"
              required
            />
          </div>
        )

      case 28:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Deal Type? *</h3>
              <p className="text-gray-400">Options:</p>
            </div>
            <div className="space-y-3">
              {['Pre-seed / Accelerator', 'Seed', 'Series A', 'Series B', 'Series C', 'Late Stage'].map((type) => (
                <label key={type} className="flex items-center p-4 bg-gray-700 rounded-xl cursor-pointer hover:bg-gray-600 transition-colors">
                  <input
                    type="radio"
                    name="dealType"
                    value={type}
                    checked={formData.dealType === type}
                    onChange={(e) => updateFormData('dealType', e.target.value)}
                    className="mr-3 text-accent-500 focus:ring-accent-500"
                    required
                  />
                  <span className="text-white text-lg">{type}</span>
                </label>
              ))}
            </div>
          </div>
        )

      case 29:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Preferred Investor Type? *</h3>
              <p className="text-gray-400">Options:</p>
            </div>
            <div className="space-y-3">
              {['Institutional', 'Accredited Retail', 'Angels & HNWI'].map((type) => (
                <label key={type} className="flex items-center p-4 bg-gray-700 rounded-xl cursor-pointer hover:bg-gray-600 transition-colors">
                  <input
                    type="radio"
                    name="preferredInvestorType"
                    value={type}
                    checked={formData.preferredInvestorType === type}
                    onChange={(e) => updateFormData('preferredInvestorType', e.target.value)}
                    className="mr-3 text-accent-500 focus:ring-accent-500"
                    required
                  />
                  <span className="text-white text-lg">{type}</span>
                </label>
              ))}
            </div>
          </div>
        )

      case 30:
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
                    required
                  />
                  <span className="text-white text-lg">{option}</span>
                </label>
              ))}
            </div>
          </div>
        )

      case 31:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Email Names</h3>
              <p className="text-gray-400">We will be creating email addresses to send investor relations correspondence on your behalf. Meeting rates increase drastically when an email comes from the founder, as opposed to coming from capital markets group. Please provide us with the first and last names of 3 separate team members who we can create email addresses for.</p>
            </div>
            <textarea
              value={formData.emailNames}
              onChange={(e) => updateFormData('emailNames', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              rows={4}
              placeholder="Type your answer here…"
            />
          </div>
        )

      case 32:
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
              placeholder="Type your answer here…"
            />
          </div>
        )

      case 33:
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
              placeholder="Type your answer here…"
            />
          </div>
        )

      case 34:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Please provide us a list of all Investors/LPs you're in discussions with?</h3>
              <p className="text-gray-400">This blacklist will ensure no overlapping takes place with existing stakeholders.</p>
            </div>
            <textarea
              value={formData.existingInvestors}
              onChange={(e) => updateFormData('existingInvestors', e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              rows={4}
              placeholder="Type your answer here…"
            />
          </div>
        )

      case 35:
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
              placeholder="Type your answer here…"
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
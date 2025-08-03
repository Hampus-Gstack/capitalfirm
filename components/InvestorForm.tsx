'use client'
import { useState, useEffect } from 'react'
import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

interface InvestorFormData {
  name: string
  email: string
  phone: string
  company: string
  title: string
  investmentSize: {
    min: number
    max: number
  }
  preferredSectors: string[]
  preferredStages: string[]
  preferredGeographies: string[]
  notes: string
  status: 'active' | 'inactive' | 'prospect'
  tags: string[]
}

interface InvestorFormProps {
  investor?: any
  onSubmit: (data: InvestorFormData) => void
  onCancel: () => void
  isOpen: boolean
}

const sectors = [
  'AI/ML', 'SaaS', 'Fintech', 'Healthcare', 'Biotech', 'Clean Energy', 
  'E-commerce', 'EdTech', 'Real Estate', 'Transportation', 'Media', 'Gaming'
]

const stages = [
  'Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Growth', 'IPO'
]

const geographies = [
  'North America', 'Europe', 'Asia', 'Latin America', 'Africa', 'Global'
]

export default function InvestorForm({ investor, onSubmit, onCancel, isOpen }: InvestorFormProps) {
  const [formData, setFormData] = useState<InvestorFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    investmentSize: { min: 0, max: 0 },
    preferredSectors: [],
    preferredStages: [],
    preferredGeographies: [],
    notes: '',
    status: 'prospect',
    tags: []
  })

  const [newTag, setNewTag] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (investor) {
      setFormData({
        name: investor.name || '',
        email: investor.email || '',
        phone: investor.phone || '',
        company: investor.company || '',
        title: investor.title || '',
        investmentSize: investor.investmentSize || { min: 0, max: 0 },
        preferredSectors: investor.preferredSectors || [],
        preferredStages: investor.preferredStages || [],
        preferredGeographies: investor.preferredGeographies || [],
        notes: investor.notes || '',
        status: investor.status || 'prospect',
        tags: investor.tags || []
      })
    }
  }, [investor])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company is required'
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (formData.investmentSize.min < 0) {
      newErrors.investmentMin = 'Minimum investment must be positive'
    }

    if (formData.investmentSize.max < formData.investmentSize.min) {
      newErrors.investmentMax = 'Maximum investment must be greater than minimum'
    }

    if (formData.preferredSectors.length === 0) {
      newErrors.sectors = 'At least one sector is required'
    }

    if (formData.preferredStages.length === 0) {
      newErrors.stages = 'At least one stage is required'
    }

    if (formData.preferredGeographies.length === 0) {
      newErrors.geographies = 'At least one geography is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleSectorToggle = (sector: string) => {
    setFormData(prev => ({
      ...prev,
      preferredSectors: prev.preferredSectors.includes(sector)
        ? prev.preferredSectors.filter(s => s !== sector)
        : [...prev.preferredSectors, sector]
    }))
  }

  const handleStageToggle = (stage: string) => {
    setFormData(prev => ({
      ...prev,
      preferredStages: prev.preferredStages.includes(stage)
        ? prev.preferredStages.filter(s => s !== stage)
        : [...prev.preferredStages, stage]
    }))
  }

  const handleGeographyToggle = (geography: string) => {
    setFormData(prev => ({
      ...prev,
      preferredGeographies: prev.preferredGeographies.includes(geography)
        ? prev.preferredGeographies.filter(g => g !== geography)
        : [...prev.preferredGeographies, geography]
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">
              {investor ? 'Edit Investor' : 'Add New Investor'}
            </h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Enter full name"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Enter email address"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Company *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 ${
                  errors.company ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Enter company name"
              />
              {errors.company && <p className="text-red-400 text-sm mt-1">{errors.company}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Enter job title"
              />
              {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
              >
                <option value="prospect">Prospect</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Investment Size */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Investment Range *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Minimum Investment</label>
                <input
                  type="number"
                  value={formData.investmentSize.min}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    investmentSize: { ...prev.investmentSize, min: parseInt(e.target.value) || 0 }
                  }))}
                  className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 ${
                    errors.investmentMin ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="0"
                />
                {errors.investmentMin && <p className="text-red-400 text-sm mt-1">{errors.investmentMin}</p>}
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Maximum Investment</label>
                <input
                  type="number"
                  value={formData.investmentSize.max}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    investmentSize: { ...prev.investmentSize, max: parseInt(e.target.value) || 0 }
                  }))}
                  className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 ${
                    errors.investmentMax ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="0"
                />
                {errors.investmentMax && <p className="text-red-400 text-sm mt-1">{errors.investmentMax}</p>}
              </div>
            </div>
          </div>

          {/* Preferred Sectors */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Preferred Sectors *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {sectors.map(sector => (
                <button
                  key={sector}
                  type="button"
                  onClick={() => handleSectorToggle(sector)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    formData.preferredSectors.includes(sector)
                      ? 'bg-accent-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {sector}
                </button>
              ))}
            </div>
            {errors.sectors && <p className="text-red-400 text-sm mt-1">{errors.sectors}</p>}
          </div>

          {/* Preferred Stages */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Preferred Stages *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {stages.map(stage => (
                <button
                  key={stage}
                  type="button"
                  onClick={() => handleStageToggle(stage)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    formData.preferredStages.includes(stage)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
            {errors.stages && <p className="text-red-400 text-sm mt-1">{errors.stages}</p>}
          </div>

          {/* Preferred Geographies */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Preferred Geographies *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {geographies.map(geography => (
                <button
                  key={geography}
                  type="button"
                  onClick={() => handleGeographyToggle(geography)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    formData.preferredGeographies.includes(geography)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {geography}
                </button>
              ))}
            </div>
            {errors.geographies && <p className="text-red-400 text-sm mt-1">{errors.geographies}</p>}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
                placeholder="Add a tag"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition-colors"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-700 text-white"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-gray-400 hover:text-white"
                  >
                    <TrashIcon className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
              placeholder="Add any additional notes about this investor..."
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg font-medium transition-colors"
            >
              {investor ? 'Update Investor' : 'Add Investor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 
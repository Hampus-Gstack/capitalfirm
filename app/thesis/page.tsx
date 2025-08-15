'use client'
import { useState } from 'react'
import { PlayIcon, ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function ThesisPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const benefits = [
    'Navigate QT market conditions with proven strategies',
    'Access exclusive investor networks and relationships',
    'Optimize fundraising timing and positioning',
    'Leverage data-driven market insights',
    'Accelerate capital deployment cycles',
    'Minimize fundraising costs and time-to-close'
  ]

  const stats = [
    { number: '85%', label: 'Success Rate in QT Markets' },
    { number: '3.2x', label: 'Faster Capital Deployment' },
    { number: '$2.1B+', label: 'Capital Raised in QT Periods' },
    { number: '47%', label: 'Reduction in Fundraising Time' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold gradient-text">
              Cursus Capital
            </a>
            <a
              href="#contact"
              className="bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-700 hover:to-accent-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200"
            >
              Get Started →
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {/* Target Audience */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-600/20 border border-accent-500/30 text-accent-400 text-sm font-medium mb-8">
              <span className="mr-2">🎯</span>
              For: GPs & Executives At Lower/Mid Market Funds In Top-Performing Industries/Verticals
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              A Definitive Guide To{' '}
              <span className="gradient-text">Efficiently Raising Capital</span>{' '}
              During A Market Crippling Period Of{' '}
              <span className="text-accent-400">Quantitative Tightening (QT)</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Master the art of capital raising in the most challenging market conditions. 
              Learn proven strategies that work when traditional methods fail.
            </p>
          </div>

          {/* Video Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              {/* Video Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative">
                {!isVideoPlaying ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <button
                        onClick={() => setIsVideoPlaying(true)}
                        className="w-20 h-20 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-accent-700 transition-colors cursor-pointer"
                      >
                        <PlayIcon className="h-8 w-8 text-white ml-1" />
                      </button>
                      <p className="text-gray-400 text-lg">Click to watch the definitive guide</p>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                      <p className="text-gray-400">Loading video...</p>
                    </div>
                  </div>
                )}
                
                {/* Loom Video Embed */}
                <iframe
                  src="https://www.loom.com/embed/your-video-id-here"
                  frameBorder="0"
                  allowFullScreen
                  className={`w-full h-full ${isVideoPlaying ? 'block' : 'hidden'}`}
                  onLoad={() => setIsVideoPlaying(true)}
                ></iframe>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-accent-500/50 transition-all duration-300">
                <CheckCircleIcon className="h-8 w-8 text-accent-400 mb-4" />
                <p className="text-lg font-medium text-white">{benefit}</p>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-accent-600/20 to-purple-600/20 rounded-2xl p-8 border border-accent-500/30">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Master QT Capital Raising?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join the elite group of fund managers who've successfully navigated quantitative tightening periods and emerged stronger.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  className="bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-700 hover:to-accent-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center"
                >
                  Get Your Free Strategy Session
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </a>
                <a
                  href="/presentation"
                  className="border border-gray-600 hover:border-accent-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
                >
                  View Our Presentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Cursus Capital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 
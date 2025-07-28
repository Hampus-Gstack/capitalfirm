import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-900/20 via-transparent to-accent-800/20"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Raise capital with an{' '}
            <span className="gradient-text">unfair advantage</span>
          </h1>
          
          <p className="mt-8 text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
            Revolutionize Your Fundraising Journey With Our Results-Driven Approach. 
            Unlocking Access To Capital Globally For Private Equity, Venture Capital Funds and Emerging Businesses.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#contact"
              className="bg-gradient-to-r from-accent-600 to-accent-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-accent-700 hover:to-accent-600 transition-all duration-200 flex items-center gap-2 group"
            >
              Get Started
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#resources"
              className="text-gray-300 hover:text-white font-semibold text-lg transition-colors"
            >
              Explore Our Resources
            </a>
          </div>
          
          {/* Stats section */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">$1T+</div>
              <div className="text-gray-400 text-sm mt-2">worth of investors partners brought in for our clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">200M+</div>
              <div className="text-gray-400 text-sm mt-2">Capital raised in Last 2 years</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">1000+</div>
              <div className="text-gray-400 text-sm mt-2">Introductions made</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
} 
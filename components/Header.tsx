'use client'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] bg-black/80 backdrop-blur-md border-b border-gray-800">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold gradient-text">Capital Firm</span>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <a href="#process" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white transition-colors">
            Process
          </a>
          <a href="#verticals" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white transition-colors">
            Verticals
          </a>
          <a href="#team" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white transition-colors">
            Team
          </a>
          <a href="#testimonials" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white transition-colors">
            Testimonials
          </a>
          <a href="#resources" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white transition-colors">
            Resources
          </a>
          <a href="/blog" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white transition-colors">
            Blog
          </a>
          <a href="/presentation" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white transition-colors">
            Presentation
          </a>
          <a href="/onboarding" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white transition-colors">
            Onboarding
          </a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <a
            href="/login"
            className="text-sm font-semibold leading-6 text-gray-300 hover:text-white transition-colors"
          >
            Client Login
          </a>
          <a
            href="#contact"
            className="bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-700 hover:to-accent-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200"
          >
            Get Started →
          </a>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-[70]" />
          <div className="fixed inset-y-0 right-0 z-[80] w-full overflow-y-auto bg-black/95 backdrop-blur-md px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="text-2xl font-bold gradient-text">Capital Firm</span>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-800">
                <div className="space-y-2 py-6">
                  <a
                    href="#process"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Process
                  </a>
                  <a
                    href="#verticals"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Verticals
                  </a>
                  <a
                    href="#team"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Team
                  </a>
                  <a
                    href="#testimonials"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Testimonials
                  </a>
                  <a
                    href="#resources"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Resources
                  </a>
                  <a
                    href="/blog"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Blog
                  </a>
                  <a
                    href="/presentation"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Presentation
                  </a>
                  <a
                    href="/onboarding"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Onboarding
                  </a>
                </div>
                <div className="py-6 space-y-3">
                  <a
                    href="/login"
                    className="block text-center text-base font-semibold leading-7 text-gray-300 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Client Login
                  </a>
                  <a
                    href="#contact"
                    className="bg-gradient-to-r from-accent-600 to-accent-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-accent-700 hover:to-accent-600 transition-all duration-200 block text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 
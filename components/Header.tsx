'use client'
import { useState, useEffect, useRef } from 'react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const navigationItems = [
    // Main sections
    { name: 'Home', href: '/', isHome: true },
    { name: 'About', href: '#process' },
    { name: 'Services', href: '#verticals' },
    { name: 'Team', href: '#team' },
    
    // Client resources
    { name: 'Client Portal', href: '/dashboard', isHighlight: true },
    { name: 'Onboarding', href: '/onboarding' },
    { name: 'Presentation', href: '/presentation' },
    
    // Content & resources
    { name: 'Blog', href: '/blog' },
    { name: 'Resources', href: '#resources' },
    { name: 'Testimonials', href: '#testimonials' },
  ]

  const adminItems = [
    { name: 'Admin Panel', href: '/admin/invitations' },
    { name: 'Manage Invitations', href: '/admin/invitations' },
  ]

  const authItems = [
    { name: 'Login', href: '/login' },
    { name: 'Sign Up', href: '/signup' },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const renderNavItem = (item: any, isMobile = false) => (
    <a
      key={item.name}
      href={item.href}
      className={`${
        isMobile 
          ? '-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7'
          : 'text-sm font-semibold leading-6'
      } ${
        item.isHighlight
          ? 'text-accent-400 hover:text-accent-300'
          : 'text-gray-300 hover:text-white'
      } transition-colors ${
        isMobile ? 'hover:bg-gray-800' : ''
      }`}
      onClick={() => setMobileMenuOpen(false)}
    >
      {item.name}
    </a>
  )

  const renderDropdown = (title: string, items: any[], dropdownKey: string) => (
    <div className="relative" key={dropdownKey}>
      <button
        onClick={() => setDropdownOpen(dropdownOpen === dropdownKey ? null : dropdownKey)}
        className="flex items-center text-sm font-semibold leading-6 text-gray-300 hover:text-white transition-colors"
      >
        {title}
        <ChevronDownIcon className="ml-1 h-4 w-4" />
      </button>
      
      {dropdownOpen === dropdownKey && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
          <div className="py-2">
            {items.map(item => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                onClick={() => setDropdownOpen(null)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] bg-black/80 backdrop-blur-md border-b border-gray-800">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
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
        
        <div className="hidden lg:flex lg:gap-x-6" ref={dropdownRef}>
          {navigationItems.map(item => renderNavItem(item))}
          {renderDropdown('Admin', adminItems, 'admin')}
          {renderDropdown('Account', authItems, 'auth')}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
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
              <a href="/" className="-m-1.5 p-1.5">
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
                {/* Main Navigation */}
                <div className="space-y-1 py-6">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Main
                  </div>
                  {navigationItems.filter(item => !item.isHighlight).map(item => renderNavItem(item, true))}
                </div>
                
                {/* Client Resources */}
                <div className="space-y-1 py-6">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Client Resources
                  </div>
                  {navigationItems.filter(item => item.isHighlight).map(item => renderNavItem(item, true))}
                </div>
                
                {/* Admin */}
                <div className="space-y-1 py-6">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Admin
                  </div>
                  {adminItems.map(item => renderNavItem(item, true))}
                </div>
                
                {/* Account */}
                <div className="space-y-1 py-6">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Account
                  </div>
                  {authItems.map(item => renderNavItem(item, true))}
                </div>
                
                {/* Actions */}
                <div className="py-6 space-y-3">
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
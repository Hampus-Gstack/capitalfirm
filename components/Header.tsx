'use client'
import { useState, useEffect, useRef } from 'react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Frontend (Public-facing) items
  const frontendItems = [
    { name: 'Home', href: '/', isHome: true },
    { name: 'About', href: '#process' },
    { name: 'Services', href: '#verticals' },
    { name: 'Team', href: '#team' },
    { name: 'Blog', href: '/blog' },
    { name: 'Resources', href: '#resources' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Presentation', href: '/presentation' },
  ]

  // Backend (Client/Admin) items
  const backendItems = [
    { name: 'Client Portal', href: '/dashboard', isHighlight: true },
    { name: 'Onboarding', href: '/onboarding' },
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

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [mobileMenuOpen])

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false)
  }

  const renderNavItem = (item: any, isMobile = false) => (
    <a
      key={item.name}
      href={item.href}
      className={`${
        isMobile 
          ? 'mobile-menu-item'
          : 'text-sm font-semibold leading-6'
      } ${
        item.isHighlight
          ? 'highlight'
          : 'text-gray-300 hover:text-white'
      } transition-colors ${
        isMobile ? 'hover:bg-gray-800' : ''
      }`}
      onClick={() => {
        handleMobileMenuClose()
      }}
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
    <header className="fixed top-0 left-0 right-0 z-30 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold gradient-text">Capital Firm</span>
          </a>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white bg-accent-600 hover:bg-accent-500 transition-colors"
            onClick={handleMobileMenuToggle}
            aria-label="Open main menu"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          {/* Debug indicator - removed for production */}
        </div>
        
        <div className="hidden lg:flex lg:gap-x-6" ref={dropdownRef}>
          {/* Frontend Links - temporarily reduced */}
          {frontendItems.slice(0, 3).map(item => renderNavItem(item))}
          
          {/* Backend Dropdown */}
          {renderDropdown('Client Portal', backendItems, 'backend')}
          
          {/* Admin Dropdown */}
          {renderDropdown('Admin', adminItems, 'admin')}
          
          {/* Account Dropdown */}
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
      
      {/* Simple Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={handleMobileMenuClose}
          />
          
          {/* Menu */}
          <div className="absolute inset-y-0 right-0 w-80 bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out translate-x-0">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <a href="/" className="text-2xl font-bold gradient-text">
                  Capital Firm
                </a>
                <button
                  type="button"
                  className="text-gray-400 hover:text-white"
                  onClick={handleMobileMenuClose}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Main Navigation */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                      Navigation
                    </h3>
                    <div className="space-y-2">
                      {frontendItems.map(item => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block text-lg font-medium text-white hover:text-accent-400 py-2"
                          onClick={handleMobileMenuClose}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  {/* Client Portal */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                      Client Portal
                    </h3>
                    <div className="space-y-2">
                      {backendItems.map(item => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block text-lg font-medium text-white hover:text-accent-400 py-2"
                          onClick={handleMobileMenuClose}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  {/* Admin */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                      Admin
                    </h3>
                    <div className="space-y-2">
                      {adminItems.map(item => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block text-lg font-medium text-white hover:text-accent-400 py-2"
                          onClick={handleMobileMenuClose}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  {/* Account */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                      Account
                    </h3>
                    <div className="space-y-2">
                      {authItems.map(item => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block text-lg font-medium text-white hover:text-accent-400 py-2"
                          onClick={handleMobileMenuClose}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer */}
              <div className="p-6 border-t border-gray-700">
                <a
                  href="#contact"
                  className="block w-full text-center bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-700 transition-colors"
                  onClick={handleMobileMenuClose}
                >
                  Get Started →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 
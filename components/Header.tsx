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

  // Close mobile menu on escape key and prevent body scroll
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const handleMobileMenuToggle = () => {
    const newState = !mobileMenuOpen
    setMobileMenuOpen(newState)
    // Close any open dropdowns when mobile menu opens
    if (!mobileMenuOpen) {
      setDropdownOpen(null)
    }
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
      
      {/* Mobile Menu - Full Page Overlay */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
        mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Full Page Background - Always covers entire screen */}
        <div className="absolute inset-0 bg-gray-900 min-h-screen">
          <div className="flex flex-col h-screen">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700 flex-shrink-0">
              <a href="/" className="text-xl font-bold text-white">
                Capital Firm
              </a>
              <button
                type="button"
                className="text-white hover:text-gray-300 transition-colors"
                onClick={handleMobileMenuClose}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            {/* Menu Items - Takes remaining space */}
            <div className="flex-1 overflow-y-auto">
              <div className="py-4">
                {/* Main Navigation */}
                {frontendItems.map(item => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-6 py-4 text-white hover:bg-gray-800 transition-colors border-b border-gray-700 text-lg"
                    onClick={handleMobileMenuClose}
                  >
                    {item.name}
                  </a>
                ))}
                
                {/* Client Portal */}
                {backendItems.map(item => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-6 py-4 text-white hover:bg-gray-800 transition-colors border-b border-gray-700 text-lg"
                    onClick={handleMobileMenuClose}
                  >
                    {item.name}
                  </a>
                ))}
                
                {/* Admin */}
                {adminItems.map(item => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-6 py-4 text-white hover:bg-gray-800 transition-colors border-b border-gray-700 text-lg"
                    onClick={handleMobileMenuClose}
                  >
                    {item.name}
                  </a>
                ))}
                
                {/* Account */}
                {authItems.map(item => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-6 py-4 text-white hover:bg-gray-800 transition-colors border-b border-gray-700 text-lg"
                    onClick={handleMobileMenuClose}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Action Buttons - Fixed at bottom */}
            <div className="p-6 space-y-3 border-t border-gray-700 flex-shrink-0">
              <a
                href="/login"
                className="block w-full text-center border border-gray-600 text-white px-6 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors text-lg"
                onClick={handleMobileMenuClose}
              >
                Log in
              </a>
              <a
                href="#contact"
                className="block w-full text-center bg-accent-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-accent-700 transition-colors text-lg"
                onClick={handleMobileMenuClose}
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 
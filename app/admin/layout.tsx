'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  UsersIcon, 
  EnvelopeIcon, 
  ChartBarIcon,
  CogIcon,
  HomeIcon,
  BuildingOfficeIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { name: 'Overview', href: '/admin', icon: HomeIcon },
    { name: 'Clients', href: '/admin/clients', icon: UsersIcon },
    { name: 'Onboarding', href: '/admin/onboarding', icon: DocumentTextIcon },
    { name: 'Invitations', href: '/admin/invitations', icon: EnvelopeIcon },
    { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
    { name: 'Settings', href: '/admin/settings', icon: CogIcon },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:w-64 lg:bg-gray-900/95 lg:backdrop-blur-sm lg:border-r lg:border-gray-700/50">
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700/50">
          <div className="flex items-center">
            <BuildingOfficeIcon className="h-8 w-8 text-accent-400" />
            <span className="ml-3 text-xl font-bold text-white">Admin Panel</span>
          </div>
        </div>
        
        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-accent-500/20 text-accent-400 border border-accent-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Admin Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">A</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-gray-400">admin@capitalfirm.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Mobile Header */}
        <div className="lg:hidden bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-40">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <BuildingOfficeIcon className="h-8 w-8 text-accent-400" />
              <span className="ml-3 text-lg font-bold text-white">Admin Panel</span>
            </div>
            <button
              onClick={() => {
                console.log('Mobile menu button clicked, current state:', sidebarOpen)
                setSidebarOpen(!sidebarOpen)
              }}
              className="p-3 bg-gray-700/50 rounded-lg text-gray-400 hover:text-white transition-colors touch-manipulation"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {children}
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
            style={{ zIndex: 101 }}
          />
          
          {/* Sidebar */}
          <div 
            className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-gray-900/95 backdrop-blur-sm border-r border-gray-700/50 transform transition-transform duration-300 ease-in-out"
            style={{ zIndex: 102 }}
          >
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700/50">
              <div className="flex items-center">
                <BuildingOfficeIcon className="h-8 w-8 text-accent-400" />
                <span className="ml-3 text-xl font-bold text-white">Admin Panel</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <nav className="mt-8 px-4 flex-1 overflow-y-auto">
              <div className="space-y-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-accent-500/20 text-accent-400 border border-accent-500/30'
                          : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                      }`}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </nav>

            {/* Admin Info */}
            <div className="p-4 border-t border-gray-700/50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">A</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Admin User</p>
                  <p className="text-xs text-gray-400">admin@capitalfirm.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 
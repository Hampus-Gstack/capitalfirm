'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'client' | 'admin' | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in (this would be replaced with actual auth logic)
    const checkAuth = () => {
      // For now, we'll simulate auth based on URL patterns
      if (pathname.startsWith('/dashboard')) {
        setIsLoggedIn(true);
        setUserRole('client');
      } else if (pathname.startsWith('/admin')) {
        setIsLoggedIn(true);
        setUserRole('admin');
      } else {
        setIsLoggedIn(false);
        setUserRole(null);
      }
    };

    checkAuth();
  }, [pathname]);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = () => {
    // Clear authentication state
    setIsLoggedIn(false);
    setUserRole(null);
    
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
    
    // Redirect to home page
    router.push('/');
  };

  // Public navigation for non-logged-in users
  const publicNavItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
    { name: 'Blog', href: '/blog' },
  ];

  // Client navigation for logged-in clients
  const clientNavItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Meetings', href: '/dashboard?tab=meetings' },
    { name: 'Tasks', href: '/dashboard?tab=tasks' },
    { name: 'Analytics', href: '/dashboard?tab=analytics' },
    { name: 'Settings', href: '/dashboard?tab=settings' },
  ];

  // Admin navigation for logged-in admins
  const adminNavItems = [
    { name: 'Overview', href: '/admin' },
    { name: 'Clients', href: '/admin/clients' },
    { name: 'Investors', href: '/admin/investors' },
    { name: 'Analytics', href: '/admin/analytics' },
    { name: 'Settings', href: '/admin/settings' },
  ];

  return (
    <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-accent-500 to-accent-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CF</span>
        </div>
              <span className="text-white font-bold text-lg">Cursus Capital</span>
            </Link>
        </div>
        
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {!isLoggedIn ? (
              // Public navigation
              <>
                {publicNavItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex items-center space-x-4">
                  <Link
                    href="/login"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-accent-600 hover:bg-accent-500 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            ) : userRole === 'client' ? (
              // Client navigation
              <>
                {clientNavItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400 text-sm">Client Portal</span>
                  <button 
                    onClick={handleSignOut}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            ) : userRole === 'admin' ? (
              // Admin navigation
              <>
                {adminNavItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400 text-sm">Admin Portal</span>
                  <button 
                    onClick={handleSignOut}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            ) : null}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={handleMobileMenuToggle}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800/50 rounded-lg mt-2">
              {!isLoggedIn ? (
                // Public mobile navigation
                <>
                  {publicNavItems.map((item) => (
                    <Link
                    key={item.name}
                    href={item.href}
                      className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md transition-colors duration-200"
                    onClick={handleMobileMenuClose}
                  >
                    {item.name}
                    </Link>
                  ))}
                  <div className="border-t border-gray-600 pt-2 mt-2">
                    <Link
                      href="/login"
                      className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md transition-colors duration-200"
                      onClick={handleMobileMenuClose}
                    >
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      className="block px-3 py-2 bg-accent-600 hover:bg-accent-500 text-white rounded-md transition-colors duration-200"
                      onClick={handleMobileMenuClose}
                    >
                      Sign Up
                    </Link>
              </div>
                </>
              ) : userRole === 'client' ? (
                // Client mobile navigation
                <>
                  {clientNavItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md transition-colors duration-200"
                onClick={handleMobileMenuClose}
              >
                      {item.name}
                    </Link>
                  ))}
                  <div className="border-t border-gray-600 pt-2 mt-2">
                    <span className="block px-3 py-2 text-gray-400 text-sm">Client Portal</span>
                    <button 
                      onClick={() => {
                        handleSignOut();
                        handleMobileMenuClose();
                      }}
                      className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md transition-colors duration-200 flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              ) : userRole === 'admin' ? (
                // Admin mobile navigation
                <>
                  {adminNavItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md transition-colors duration-200"
                onClick={handleMobileMenuClose}
              >
                      {item.name}
                    </Link>
                  ))}
                  <div className="border-t border-gray-600 pt-2 mt-2">
                    <span className="block px-3 py-2 text-gray-400 text-sm">Admin Portal</span>
                    <button 
                      onClick={() => {
                        handleSignOut();
                        handleMobileMenuClose();
                      }}
                      className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md transition-colors duration-200 flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 
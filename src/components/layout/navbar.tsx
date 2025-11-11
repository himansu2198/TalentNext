"use client"

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Hide the navbar on auth pages (login / signup and any nested routes)
  if (pathname?.startsWith('/auth')) return null

  const navItems = [
    { name: 'Feed', href: '/dashboard/feed' },
    { name: 'Internships', href: '/dashboard/internships' },
    { name: 'Hackathons', href: '/dashboard/hackathons' },
    { name: 'Challenges', href: '/dashboard/challenges' },
    { name: 'Generator', href: '/dashboard/generator' },
  ]

  return (
    <nav className='bg-white shadow-sm border-b fixed w-full top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center gap-6'>
            <button
              type="button"
              onClick={() => router.push('/')}
              className='text-xl font-bold text-blue-600 flex items-center gap-2'
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EA</span>
              </div>
              EventAggregator
            </button>

            <div className='hidden md:flex items-center space-x-2'>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                    pathname === item.href
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className='flex items-center space-x-4'>
            {/* When signed in show user avatar button; otherwise show sign in */}
            <SignedIn>
              {/* My Dashboard Button - Desktop */}
              <Link
                href="/dashboard/profile"
                className='hidden md:flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition duration-200'
              >
                <span>👤</span>
                <span>My Dashboard</span>
              </Link>

              {/* User Button */}
              <div className="hidden md:block">
                <UserButton 
                  appearance={{ 
                    elements: { 
                      userButtonAvatarBox: 'w-9 h-9',
                      userButtonTrigger: 'focus:shadow-none'
                    } 
                  }} 
                />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md hover:bg-gray-100 transition duration-200"
              >
                <div className="w-6 h-6 flex flex-col justify-between">
                  <span className="w-full h-0.5 bg-gray-600 rounded"></span>
                  <span className="w-full h-0.5 bg-gray-600 rounded"></span>
                  <span className="w-full h-0.5 bg-gray-600 rounded"></span>
                </div>
              </button>
            </SignedIn>

            <SignedOut>
              <SignInButton>
                <button className='px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition duration-200'>
                  Sign in
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <div className="flex flex-col space-y-3">
              {/* Navigation Links */}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                    pathname === item.href
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* My Dashboard Link for Mobile */}
              <SignedIn>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition duration-200 flex items-center gap-2"
                >
                  <span>👤</span>
                  <span>My Dashboard</span>
                </Link>
                
                {/* User Button for Mobile */}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm text-gray-600">Account</span>
                    <UserButton 
                      appearance={{ 
                        elements: { 
                          userButtonAvatarBox: 'w-8 h-8',
                          userButtonTrigger: 'focus:shadow-none'
                        } 
                      }} 
                    />
                  </div>
                </div>
              </SignedIn>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}


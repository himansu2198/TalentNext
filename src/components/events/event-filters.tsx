
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, X } from 'lucide-react'

interface EventFiltersProps {
  onFiltersChange: (filters: any) => void
}

export default function EventFilters({ onFiltersChange }: EventFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    platform: 'all',
    deadline: 'all',
    location: 'all'
  })

  useEffect(() => {
    // Check screen size on client side
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024)
    }

    // Initial check
    checkScreenSize()

    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize)

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'internship', label: '🎯 Internships' },
    { value: 'hackathon', label: '⚡ Hackathons' },
    { value: 'workshop', label: '🎓 Workshops' },
    { value: 'coding_challenge', label: '💻 Coding Challenges' },
    { value: 'festival', label: '🎪 Tech Festivals' }
  ]

  const platforms = [
    { value: 'all', label: 'All Platforms' },
    { value: 'unstop', label: '🚀 Unstop' },
    { value: 'hackerrank', label: '💻 HackerRank' },
    { value: 'internshala', label: '🎯 Internshala' },
    { value: 'other', label: '🌍 Others' }
  ]

  const deadlines = [
    { value: 'all', label: 'Any Time' },
    { value: 'week', label: 'Next 7 Days' },
    { value: 'month', label: 'Next 30 Days' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'past', label: 'Past Events' }
  ]

  const locations = [
    { value: 'all', label: 'Any Location' },
    { value: 'remote', label: '🌍 Remote' },
    { value: 'onsite', label: '🏢 Onsite' },
    { value: 'hybrid', label: '🔀 Hybrid' }
  ]

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      category: 'all',
      platform: 'all',
      deadline: 'all',
      location: 'all'
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const hasActiveFilters = filters.search || 
    filters.category !== 'all' || 
    filters.platform !== 'all' || 
    filters.deadline !== 'all' || 
    filters.location !== 'all'

  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8'>
      {/* Header */}
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-3'>
          <Filter size={20} className='text-gray-600' />
          <h3 className='text-lg font-semibold text-gray-900'>Filter Events</h3>
        </div>
        <div className='flex items-center gap-3'>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className='flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors'
            >
              <X size={16} />
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className='lg:hidden flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700'
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className='relative mb-4'>
        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
        <input
          type='text'
          placeholder='Search events by title, skills, or keywords...'
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        />
      </div>

      {/* Filter Grid */}
      <AnimatePresence>
        {(isExpanded || isLargeScreen) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'
          >
            {/* Category Filter */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                🏷️ Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Platform Filter */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                🧩 Platform
              </label>
              <select
                value={filters.platform}
                onChange={(e) => handleFilterChange('platform', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                {platforms.map((platform) => (
                  <option key={platform.value} value={platform.value}>
                    {platform.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Deadline Filter */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                📅 Deadline
              </label>
              <select
                value={filters.deadline}
                onChange={(e) => handleFilterChange('deadline', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                {deadlines.map((deadline) => (
                  <option key={deadline.value} value={deadline.value}>
                    {deadline.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                🌍 Location
              </label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                {locations.map((location) => (
                  <option key={location.value} value={location.value}>
                    {location.label}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Badges */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex flex-wrap gap-2 mt-4'
        >
          {filters.search && (
            <span className='inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'>
              Search: {filters.search}
              <button onClick={() => handleFilterChange('search', '')}>
                <X size={14} />
              </button>
            </span>
          )}
          {filters.category !== 'all' && (
            <span className='inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm'>
              {categories.find(c => c.value === filters.category)?.label}
              <button onClick={() => handleFilterChange('category', 'all')}>
                <X size={14} />
              </button>
            </span>
          )}
          {filters.platform !== 'all' && (
            <span className='inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm'>
              {platforms.find(p => p.value === filters.platform)?.label}
              <button onClick={() => handleFilterChange('platform', 'all')}>
                <X size={14} />
              </button>
            </span>
          )}
        </motion.div>
      )}
    </div>
  )
}


'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import EventCard from '@/components/events/event-card'
import EventFilters from '@/components/events/event-filters'
import Pagination from '@/components/shared/pagination'
import { sampleEvents } from '@/lib/sample-data'

const EVENTS_PER_PAGE = 6

export default function FeedPage() {
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    platform: 'all',
    deadline: 'all',
    location: 'all'
  })
  const [currentPage, setCurrentPage] = useState(1)

  // Filter events based on current filters
  const filteredEvents = useMemo(() => {
    return sampleEvents.filter(event => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch = 
          event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower) ||
          event.tags.some(tag => tag.toLowerCase().includes(searchLower))
        if (!matchesSearch) return false
      }

      // Category filter
      if (filters.category !== 'all' && event.type !== filters.category) {
        return false
      }

      // Platform filter
      if (filters.platform !== 'all' && event.platform !== filters.platform) {
        return false
      }

      // Location filter
      if (filters.location !== 'all' && event.location !== filters.location) {
        return false
      }

      // Deadline filter (simplified for demo)
      if (filters.deadline !== 'all') {
        const eventDate = new Date(event.deadline)
        const today = new Date()
        
        if (filters.deadline === 'week') {
          const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
          if (eventDate > nextWeek) return false
        } else if (filters.deadline === 'month') {
          const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
          if (eventDate > nextMonth) return false
        } else if (filters.deadline === 'past') {
          if (eventDate > today) return false
        } else if (filters.deadline === 'upcoming') {
          if (eventDate < today) return false
        }
      }

      return true
    })
  }, [filters])

  // Paginate events
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * EVENTS_PER_PAGE
    const endIndex = startIndex + EVENTS_PER_PAGE
    return filteredEvents.slice(startIndex, endIndex)
  }, [filteredEvents, currentPage])

  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE)

  // Reset to page 1 when filters change
  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='mb-8'
      >
        <h1 className='text-3xl font-bold text-gray-900'>Event Feed</h1>
        <p className='text-gray-600 mt-2'>
          Showing {paginatedEvents.length} of {filteredEvents.length} events
          {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
        </p>
      </motion.div>
      
      {/* Event Filters */}
      <EventFilters onFiltersChange={handleFiltersChange} />
      
      {/* Events Grid */}
      {paginatedEvents.length > 0 ? (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {paginatedEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center py-12'
        >
          <div className='text-gray-400 text-6xl mb-4'>🔍</div>
          <h3 className='text-xl font-semibold text-gray-900 mb-2'>No events found</h3>
          <p className='text-gray-600'>Try adjusting your filters to see more results</p>
        </motion.div>
      )}
    </div>
  )
}


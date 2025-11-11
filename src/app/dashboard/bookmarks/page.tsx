'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import EventCard from '@/components/events/event-card'
import { sampleEvents } from '@/lib/sample-data'
import { Bookmark, Trash2 } from 'lucide-react'

export default function BookmarksPage() {
  const [bookmarkedEvents, setBookmarkedEvents] = useState<any[]>([])
  const [bookmarkIds, setBookmarkIds] = useState<string[]>([])

  useEffect(() => {
    // Load bookmarks from localStorage
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    setBookmarkIds(savedBookmarks)
    
    // Filter events that are bookmarked
    const bookmarked = sampleEvents.filter(event => 
      savedBookmarks.includes(event.id)
    )
    setBookmarkedEvents(bookmarked)
  }, [])

  const clearAllBookmarks = () => {
    localStorage.setItem('bookmarks', JSON.stringify([]))
    setBookmarkedEvents([])
    setBookmarkIds([])
  }

  const removeBookmark = (eventId: string) => {
    const updatedBookmarks = bookmarkIds.filter(id => id !== eventId)
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))
    setBookmarkIds(updatedBookmarks)
    setBookmarkedEvents(prev => prev.filter(event => event.id !== eventId))
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='mb-8'
      >
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-3'>
              <Bookmark className='text-blue-600' size={28} />
              My Bookmarks
            </h1>
            <p className='text-gray-600 mt-2'>
              {bookmarkedEvents.length} saved {bookmarkedEvents.length === 1 ? 'event' : 'events'}
            </p>
          </div>
          
          {bookmarkedEvents.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearAllBookmarks}
              className='flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
            >
              <Trash2 size={18} />
              Clear All
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Bookmarked Events */}
      {bookmarkedEvents.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {bookmarkedEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className='relative'
            >
              <EventCard event={event} />
              <motion.button
                onClick={() => removeBookmark(event.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className='absolute top-4 left-4 z-20 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors shadow-lg'
                title='Remove bookmark'
              >
                <Trash2 size={16} />
              </motion.button>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center py-16'
        >
          <div className='text-gray-300 text-8xl mb-6'>🔖</div>
          <h3 className='text-2xl font-semibold text-gray-900 mb-4'>No bookmarks yet</h3>
          <p className='text-gray-600 max-w-md mx-auto mb-6'>
            Start exploring events and click the bookmark icon to save your favorites for later.
          </p>
          <a 
            href='/dashboard/feed'
            className='inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors'
          >
            Explore Events
          </a>
        </motion.div>
      )}
    </div>
  )
}

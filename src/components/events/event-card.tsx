'use client'

import { Event } from '@/types'
import { motion } from 'framer-motion'
import { Calendar, MapPin, ExternalLink, Users, Bookmark } from 'lucide-react'
import { useState, useEffect } from 'react'

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    // Check if event is bookmarked
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    setIsBookmarked(bookmarks.includes(event.id))
  }, [event.id])

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    let updatedBookmarks

    if (isBookmarked) {
      updatedBookmarks = bookmarks.filter((id: string) => id !== event.id)
    } else {
      updatedBookmarks = [...bookmarks, event.id]
    }

    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))
    setIsBookmarked(!isBookmarked)
  }

  const getTypeColor = (type: string) => {
    const colors = {
      internship: 'bg-green-100 text-green-800',
      hackathon: 'bg-purple-100 text-purple-800',
      workshop: 'bg-blue-100 text-blue-800',
      coding_challenge: 'bg-orange-100 text-orange-800',
      festival: 'bg-pink-100 text-pink-800',
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getPlatformColor = (platform: string) => {
    const colors = {
      unstop: 'bg-red-100 text-red-800',
      hackerrank: 'bg-emerald-100 text-emerald-800',
      internshala: 'bg-cyan-100 text-cyan-800',
      other: 'bg-gray-100 text-gray-800',
    }
    return colors[platform as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 relative"
    >
      {/* Bookmark Button */}
      <motion.button
        onClick={toggleBookmark}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white transition-colors"
      >
        <Bookmark
          size={18}
          className={isBookmarked ? 'fill-blue-600 text-blue-600' : 'text-gray-400'}
        />
      </motion.button>

      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-col flex-1 pr-8">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex items-center gap-2">
              {event.title}
              {/* ✅ External Link beside title (no overlap with bookmark) */}
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors"
                title="Visit event page"
              >
                <ExternalLink size={16} />
              </a>
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
              event.type
            )}`}
          >
            {event.type.replace('_', ' ')}
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(
              event.platform
            )}`}
          >
            {event.platform}
          </span>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {event.location}
          </span>
        </div>

        {/* Additional Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {event.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 rounded-md text-xs bg-blue-50 text-blue-700"
            >
              {tag}
            </span>
          ))}
          {event.tags.length > 3 && (
            <span className="px-2 py-1 rounded-md text-xs bg-gray-50 text-gray-600">
              +{event.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              {new Date(event.deadline).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <MapPin size={14} className="mr-1" />
              {event.location}
            </div>
          </div>
          <div className="flex items-center">
            <Users size={14} className="mr-1" />
            {event.eligibility.join(', ')}
          </div>
        </div>
      </div>
    </motion.div>
  )
}





'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const maxVisiblePages = 5
  
  // Calculate visible page numbers
  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const end = Math.min(totalPages, start + maxVisiblePages - 1)
    
    const pages = []
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    return pages
  }

  const visiblePages = getVisiblePages()

  if (totalPages <= 1) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='flex items-center justify-center space-x-2 mt-12'
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='flex items-center px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
      >
        <ChevronLeft size={16} />
        <span className='ml-1'>Previous</span>
      </button>

      {/* Page Numbers */}
      <div className='flex items-center space-x-1'>
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg border transition-all duration-200 ${
              currentPage === page
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
        
        {/* Ellipsis for many pages */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            <span className='px-2 text-gray-500'>...</span>
            <button
              onClick={() => onPageChange(totalPages)}
              className='w-10 h-10 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200'
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='flex items-center px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
      >
        <span className='mr-1'>Next</span>
        <ChevronRight size={16} />
      </button>

      {/* Page Info */}
      <div className='ml-4 text-sm text-gray-600'>
        Page {currentPage} of {totalPages}
      </div>
    </motion.div>
  )
}

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-gray-900 text-gray-300'>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Brand Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className='text-2xl font-bold text-white mb-4'>Event Aggregator</h3>
            <p className='text-gray-400 mb-4 leading-relaxed'>
              Your single destination for all college events, internships, hackathons, and coding challenges across multiple platforms.
            </p>
            <p className='text-gray-400 text-sm'>
              Helping students discover opportunities since 2024.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className='text-lg font-semibold text-white mb-4'>Quick Links</h4>
            <ul className='space-y-2'>
              <li>
                <Link href='/dashboard/feed' className='hover:text-white transition-colors duration-200'>
                  Explore Events
                </Link>
              </li>
              <li>
                <Link href='/dashboard/generator' className='hover:text-white transition-colors duration-200'>
                  AI Post Generator
                </Link>
              </li>
              <li>
                <Link href='/dashboard/internships' className='hover:text-white transition-colors duration-200'>
                  Internships
                </Link>
              </li>
              <li>
                <Link href='/dashboard/hackathons' className='hover:text-white transition-colors duration-200'>
                  Hackathons
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className='text-lg font-semibold text-white mb-4'>Connect With Us</h4>
            <div className='flex space-x-4 mb-4'>
              <a href='#' className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300'>
                <span className='text-lg'>💼</span>
              </a>
              <a href='#' className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 hover:text-white transition-all duration-300'>
                <span className='text-lg'>🐙</span>
              </a>
              <a href='#' className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all duration-300'>
                <span className='text-lg'>📷</span>
              </a>
              <a href='#' className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300'>
                <span className='text-lg'>🐦</span>
              </a>
            </div>
            <p className='text-gray-400 text-sm'>
              Have questions?<br />
              <a href='mailto:hello@eventaggregator.com' className='hover:text-white transition-colors duration-200'>
                hello@eventaggregator.com
              </a>
            </p>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className='border-t border-gray-800 mt-8 pt-8 text-center'
        >
          <p className='text-gray-400 text-sm'>
            © {currentYear} Event Aggregator. All rights reserved.
          </p>
          <p className='text-gray-500 text-xs mt-2'>
            Built with ❤️ for students everywhere
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

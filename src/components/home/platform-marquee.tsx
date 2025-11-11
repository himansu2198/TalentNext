
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const platforms = [
  { 
    name: 'Unstop', 
    logo: '/images/platforms/unstop.png'
  },
  { 
    name: 'HackerRank', 
    logo: '/images/platforms/hackerrank.png'
  },
  { 
    name: 'Internshala', 
    logo: '/images/platforms/internshala.png'
  },
  { 
    name: 'Devfolio', 
    logo: '/images/platforms/devfolio.png'
  },
  { 
    name: 'AngelList', 
    logo: '/images/platforms/angellist.png'
  },
  { 
    name: 'GeeksforGeeks', 
    logo: '/images/platforms/geeksforgeeks.png'
  },
  { 
    name: 'Coding Ninjas', 
    logo: '/images/platforms/codingninjas.png'
  },
  { 
    name: 'TechGig', 
    logo: '/images/platforms/techgig.png'
  }
]

export default function PlatformMarquee() {
  return (
    <section className='py-16 bg-white border-y border-gray-100'>
      <div className='max-w-6xl mx-auto px-4'>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center mb-12'
        >
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            Integrated with Your Favorite Platforms
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            We aggregate events from all major platforms so you never miss an opportunity
          </p>
        </motion.div>

        {/* Platforms Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6'
        >
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -2 }}
              className='flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 hover:bg-white border border-gray-200 hover:border-blue-200 transition-all duration-300 group cursor-pointer'
            >
              {/* Logo Container with Actual Image */}
              <div className='w-16 h-16 mb-3 flex items-center justify-center bg-white rounded-lg border border-gray-200 group-hover:border-blue-300 transition-colors duration-300 p-2'>
                <Image 
                  src={platform.logo}
                  alt={platform.name}
                  width={48}
                  height={48}
                  className='object-contain w-full h-full'
                />
              </div>
              <span className='text-sm font-medium text-gray-700 text-center leading-tight'>
                {platform.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className='text-center mt-12'
        >
          <div className='inline-flex items-center space-x-8 text-sm text-gray-500'>
            <div className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
              <span>Live Data Sync</span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-blue-500 rounded-full animate-pulse'></div>
              <span>Real-time Updates</span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-purple-500 rounded-full animate-pulse'></div>
              <span>Multiple Sources</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

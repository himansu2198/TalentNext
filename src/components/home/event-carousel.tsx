
'use client'

import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { sampleEvents } from '@/lib/sample-data'

export default function EventCarousel() {
  return (
    <section className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center mb-12'
        >
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            🎪 Live Upcoming Events
          </h2>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
            Discover exciting opportunities happening right now
          </p>
        </motion.div>

        {/* Swiper Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 }
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation
            loop={true}
            className='px-4'
          >
            {sampleEvents.map((event, index) => (
              <SwiperSlide key={event.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer'
                >
                  {/* Event Header */}
                  <div className='p-4 border-b border-gray-100'>
                    <div className='flex justify-between items-start mb-2'>
                      <h3 className='font-semibold text-gray-900 line-clamp-2 text-sm leading-tight flex-1'>
                        {event.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ml-2 ${
                        event.type === 'internship' ? 'bg-green-100 text-green-800' :
                        event.type === 'hackathon' ? 'bg-purple-100 text-purple-800' :
                        event.type === 'workshop' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {event.type.replace('_', ' ')}
                      </span>
                    </div>
                    
                    {/* Platform */}
                    <div className='flex items-center text-xs text-gray-500 mb-2'>
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        event.platform === 'unstop' ? 'bg-red-500' :
                        event.platform === 'hackerrank' ? 'bg-emerald-500' :
                        'bg-cyan-500'
                      }`}></span>
                      {event.platform}
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className='p-4'>
                    {/* Tags */}
                    <div className='flex flex-wrap gap-1 mb-3'>
                      {event.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className='px-2 py-1 rounded-md text-xs bg-blue-50 text-blue-700'
                        >
                          {tag}
                        </span>
                      ))}
                      {event.tags.length > 2 && (
                        <span className='px-2 py-1 rounded-md text-xs bg-gray-50 text-gray-600'>
                          +{event.tags.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Deadline & Location */}
                    <div className='flex justify-between items-center text-xs text-gray-500'>
                      <div className='flex items-center'>
                        <span className='mr-1'>📅</span>
                        {new Date(event.deadline).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className='flex items-center'>
                        <span className='mr-1'>📍</span>
                        {event.location}
                      </div>
                    </div>

                    {/* Eligibility */}
                    <div className='mt-2 text-xs text-gray-500'>
                      <span className='mr-1'>👥</span>
                      {event.eligibility.join(', ')}
                    </div>

                    {/* CTA Button */}
                    <button className='w-full mt-3 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200'>
                      View Details
                    </button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className='text-center mt-12'
        >
          <p className='text-gray-600 mb-4'>Want to see more events?</p>
          <a 
            href='/dashboard/feed'
            className='inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300'
          >
            🚀 Explore All Events
          </a>
        </motion.div>
      </div>
    </section>
  )
}


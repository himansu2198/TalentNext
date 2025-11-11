'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import CountUp from 'react-countup'

export default function FinalCTASection() {
  return (
    <section className='py-20 bg-gradient-to-r from-blue-600 to-indigo-600'>
      <div className='max-w-4xl mx-auto px-4 text-center'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
            Start Your Journey Today!
          </h2>
          <p className='text-xl text-blue-100 mb-8 max-w-2xl mx-auto'>
            Don't miss out on amazing opportunities. Join now and take the first step towards your dream career.
          </p>
          
          <motion.div 
            className='flex flex-col sm:flex-row gap-4 justify-center'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link 
              href='/dashboard/feed'
              className='bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg text-lg'
            >
              🚀 Get Started Free
            </Link>
            <Link 
              href='/dashboard/generator'
              className='border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 hover:scale-105 transition-all duration-300 text-lg'
            >
              ✨ Try AI Generator
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className='mt-8 grid grid-cols-3 gap-6 max-w-2xl mx-auto'
          >
            <div className='text-center'>
              <div className='text-white text-2xl font-bold'>
                <CountUp end={2400} suffix='+' duration={2} enableScrollSpy scrollSpyOnce />
              </div>
              <div className='text-blue-200 text-sm'>Events</div>
            </div>
            <div className='text-center'>
              <div className='text-white text-2xl font-bold'>
                <CountUp end={1200} suffix='+' duration={2} enableScrollSpy scrollSpyOnce />
              </div>
              <div className='text-blue-200 text-sm'>Active Students</div>
            </div>
            <div className='text-center'>
              <div className='text-white text-2xl font-bold'>
                <CountUp end={95} suffix='%' duration={2} enableScrollSpy scrollSpyOnce />
              </div>
              <div className='text-blue-200 text-sm'>Success Rate</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}


'use client'

import { motion } from 'framer-motion'
import CountUp from 'react-countup'

const stats = [
  { number: 2400, suffix: '+', label: 'Events Aggregated', emoji: '🧠', color: 'text-blue-600' },
  { number: 1200, suffix: '+', label: 'Active Students', emoji: '🚀', color: 'text-green-600' },
  { number: 8, suffix: '+', label: 'Platforms Integrated', emoji: '🌍', color: 'text-purple-600' },
  { number: 95, suffix: '%', label: 'Success Rate', emoji: '🎯', color: 'text-orange-600' }
]

export default function StatsSection() {
  return (
    <section className='py-20 bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='max-w-6xl mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            Trusted by Students Across India
          </h2>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
            Join thousands of students who have discovered their perfect opportunities through our platform
          </p>
        </motion.div>

        <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className='text-center'
            >
              <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300'>
                <div className='text-3xl mb-3'>{stat.emoji}</div>
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                  <CountUp 
                    end={stat.number}
                    suffix={stat.suffix}
                    duration={2.5}
                    enableScrollSpy
                    scrollSpyDelay={200}
                    scrollSpyOnce
                  />
                </div>
                <div className='text-gray-600 font-medium'>{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className='text-center mt-12'
        >
          <p className='text-sm text-gray-500 mb-4'>Trusted by students from</p>
          <div className='flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600'>
            <span>🏛️ IITs & NITs</span>
            <span>🎓 State Universities</span>
            <span>💻 Engineering Colleges</span>
            <span>📚 Private Institutions</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

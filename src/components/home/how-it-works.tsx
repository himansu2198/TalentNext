
'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Aggregate Events',
    description: 'We automatically collect events from all major platforms like Unstop, HackerRank, Internshala and more in one place.',
    icon: '🌐',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    number: '02',
    title: 'Filter & Get Alerts',
    description: 'Set your preferences and get smart notifications about events that match your skills, interests, and deadlines.',
    icon: '🔔',
    color: 'from-purple-500 to-pink-500'
  },
  {
    number: '03',
    title: 'Generate LinkedIn Posts',
    description: 'Create professional LinkedIn posts in seconds with our AI generator to showcase your achievements.',
    icon: '🤖',
    color: 'from-green-500 to-emerald-500'
  }
]

export default function HowItWorksSection() {
  return (
    <section className='py-20 bg-white'>
      <div className='max-w-6xl mx-auto px-4'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            How It Works
          </h2>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
            Get started in 3 simple steps and never miss an opportunity again
          </p>
        </motion.div>

        {/* Timeline Steps */}
        <div className='relative'>
          {/* Connecting Line */}
          <div className='absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 hidden lg:block'></div>
          
          <div className='space-y-12 lg:space-y-0'>
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Content */}
                <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'} mb-8 lg:mb-0`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className='bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300'
                  >
                    <div className='flex items-center mb-4'>
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-xl font-bold mr-4`}>
                        {step.number}
                      </div>
                      <h3 className='text-2xl font-bold text-gray-900'>{step.title}</h3>
                    </div>
                    <p className='text-gray-600 text-lg leading-relaxed'>
                      {step.description}
                    </p>
                  </motion.div>
                </div>

                {/* Icon Circle */}
                <div className='lg:w-1/2 flex justify-center'>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-24 h-24 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-3xl shadow-lg`}
                  >
                    {step.icon}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className='text-center mt-16'
        >
          <div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white'>
            <h3 className='text-2xl font-bold mb-4'>Ready to Get Started?</h3>
            <p className='text-blue-100 mb-6 text-lg'>
              Join thousands of students already discovering amazing opportunities
            </p>
            <div className='space-x-4'>
              <a 
                href='/dashboard/feed'
                className='bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 inline-block'
              >
                Explore Events
              </a>
              <a 
                href='/dashboard/generator'
                className='border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 inline-block'
              >
                Try Post Generator
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

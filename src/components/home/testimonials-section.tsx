
'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    college: 'IIT Delhi',
    year: '3rd Year CSE',
    avatar: '👩‍💻',
    quote: 'Found my dream internship at Microsoft through Event Aggregator! The platform made it so easy to discover opportunities.',
    rating: 5
  },
  {
    id: 2,
    name: 'Arjun Patel',
    college: 'NIT Karnataka',
    year: 'Final Year IT',
    avatar: '👨‍💻',
    quote: 'Won my first hackathon because Event Aggregator notified me about it. The AI post generator helped me showcase my achievement!',
    rating: 5
  },
  {
    id: 3,
    name: 'Neha Gupta',
    college: 'DTU Delhi',
    year: '2nd Year ECE',
    avatar: '👩‍🎓',
    quote: 'As a second-year student, I was struggling to find relevant events. This platform showed me perfect workshops for my level.',
    rating: 4
  },
  {
    id: 4,
    name: 'Rohan Kumar',
    college: 'VIT Vellore',
    year: '4th Year CSE',
    avatar: '👨‍🎓',
    quote: 'The cross-platform aggregation saved me hours of searching. Got placed at Amazon through an internship I found here!',
    rating: 5
  }
]

export default function TestimonialsSection() {
  return (
    <section className='py-20 bg-gradient-to-br from-gray-50 to-blue-50'>
      <div className='max-w-6xl mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            What Our Students Say
          </h2>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
            Join thousands of students who have transformed their careers through our platform
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className='bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300'
            >
              <div className='flex mb-4'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-lg ${star <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ⭐
                  </span>
                ))}
              </div>

              <blockquote className='text-gray-700 text-lg leading-relaxed mb-6 italic'>
                {testimonial.quote}
              </blockquote>

              <div className='flex items-center'>
                <div className='w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl mr-4'>
                  {testimonial.avatar}
                </div>
                <div>
                  <div className='font-semibold text-gray-900'>{testimonial.name}</div>
                  <div className='text-sm text-gray-600'>{testimonial.college}</div>
                  <div className='text-xs text-gray-500'>{testimonial.year}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className='text-center mt-12'
        >
          <div className='inline-grid grid-cols-2 md:grid-cols-4 gap-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-200'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-blue-600'>500+</div>
              <div className='text-sm text-gray-600'>Internships Found</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-green-600'>200+</div>
              <div className='text-sm text-gray-600'>Hackathon Wins</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-purple-600'>95%</div>
              <div className='text-sm text-gray-600'>Success Rate</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-orange-600'>4.8/5</div>
              <div className='text-sm text-gray-600'>Student Rating</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}



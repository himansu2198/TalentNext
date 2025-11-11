"use client"

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AnimatedCard } from '@/components/shared/animated-card'
import PlatformMarquee from '@/components/home/platform-marquee'
import StatsSection from '@/components/home/stats-section'
import EventCarousel from '@/components/home/event-carousel'
import TestimonialsSection from '@/components/home/testimonials-section'
import HowItWorksSection from '@/components/home/how-it-works'
import FinalCTASection from '@/components/home/final-cta'
import Footer from '@/components/home/footer'
import AlertBell from '@/components/home/alert-bell'
import { AuroraText } from "@/components/ui/aurora-text" // ✅ Added AuroraText import

export default function HomePage() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100'>
      {/* Hero Section */}
      <div className='max-w-6xl mx-auto px-4 py-20'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center'
        >
          <h1 className='text-5xl md:text-6xl font-bold text-gray-900 mb-6'>
            Welcome to{" "}
            <AuroraText
              colors={["#0070F3", "#38bdf8", "#7928CA", "#FF0080"]}
              speed={1.5}
              className="ml-2"
            >
              Event Aggregator
            </AuroraText>
          </h1>

          

          <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed mt-6'>
            Your single destination for all college events, internships, hackathons, and coding challenges across multiple platforms.
          </p>

          <motion.div
            className='space-x-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link
              href='/dashboard/feed'
              className='bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl'
            >
              🚀 Explore Events
            </Link>
            <Link
              href='/dashboard/generator'
              className='border border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300'
            >
              ✨ Try Post Generator
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className='grid md:grid-cols-3 gap-8 mt-20'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <AnimatedCard className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300'>
            <div className='text-2xl mb-4'>🌐</div>
            <h3 className='text-lg font-semibold mb-3 text-gray-900'>All Platforms</h3>
            <p className='text-gray-600 leading-relaxed'>Aggregated events from Unstop, HackerRank, Internshala and more in one place</p>
          </AnimatedCard>

          <AnimatedCard className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300'>
            <div className='text-2xl mb-4'>🔔</div>
            <h3 className='text-lg font-semibold mb-3 text-gray-900'>Smart Alerts</h3>
            <p className='text-gray-600 leading-relaxed'>Get personalized notifications about events matching your interests and skills</p>
          </AnimatedCard>

          <AnimatedCard className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300'>
            <div className='text-2xl mb-4'>🤖</div>
            <h3 className='text-lg font-semibold mb-3 text-gray-900'>AI Generator</h3>
            <p className='text-gray-600 leading-relaxed'>Create professional LinkedIn posts in seconds with AI assistance</p>
          </AnimatedCard>
        </motion.div>
      </div>

      {/* Platform Marquee Section */}
      <PlatformMarquee />

      {/* Stats Section */}
      <StatsSection />

      {/* Event Carousel Section */}
      <EventCarousel />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Final CTA Section */}
      <FinalCTASection />

      {/* Footer */}
      <Footer />

      {/* Floating Alert Bell */}
      <AlertBell />
    </main>
  )
}


'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function AlertBell() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState({
    internships: true,
    hackathons: true,
    workshops: false,
    codingChallenges: true
  })

  const toggleNotification = (type: string) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev]
    }))
  }

  return (
    <>
      {/* Floating Bell Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className='fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group'
      >
        <Bell size={24} />
        {/* Notification Dot */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className='absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white'
        />
      </motion.button>

      {/* Alert Settings Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2'>
              <Bell size={20} />
              Smart Alert Settings
            </DialogTitle>
          </DialogHeader>
          
          <div className='space-y-4 py-4'>
            <p className='text-sm text-gray-600'>
              Get notified about events that match your interests
            </p>
            
            {/* Alert Preferences */}
            <div className='space-y-3'>
              <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                <div>
                  <div className='font-medium'>🎯 Internships</div>
                  <div className='text-xs text-gray-500'>Summer & remote opportunities</div>
                </div>
                <button
                  onClick={() => toggleNotification('internships')}
                  className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                    notifications.internships ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                      notifications.internships ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                <div>
                  <div className='font-medium'>⚡ Hackathons</div>
                  <div className='text-xs text-gray-500'>Coding competitions & prizes</div>
                </div>
                <button
                  onClick={() => toggleNotification('hackathons')}
                  className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                    notifications.hackathons ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                      notifications.hackathons ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                <div>
                  <div className='font-medium'>🎓 Workshops</div>
                  <div className='text-xs text-gray-500'>Learning sessions & skill development</div>
                </div>
                <button
                  onClick={() => toggleNotification('workshops')}
                  className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                    notifications.workshops ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                      notifications.workshops ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                <div>
                  <div className='font-medium'>💻 Coding Challenges</div>
                  <div className='text-xs text-gray-500'>Daily & weekly programming tasks</div>
                </div>
                <button
                  onClick={() => toggleNotification('codingChallenges')}
                  className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                    notifications.codingChallenges ? 'bg-orange-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                      notifications.codingChallenges ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Email Input */}
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Email for alerts</label>
              <input
                type='email'
                placeholder='your.email@example.com'
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>

          <div className='flex gap-3'>
            <Button
              onClick={() => setIsOpen(false)}
              className='flex-1 bg-blue-600 hover:bg-blue-700'
            >
              Save Preferences
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              variant='outline'
              className='flex-1'
            >
              Maybe Later
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

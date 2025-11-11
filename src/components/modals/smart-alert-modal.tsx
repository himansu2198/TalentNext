"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';

interface SmartAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AlertPreferences {
  email: string;
  internships: boolean;
  hackathons: boolean;
  workshops: boolean;
  codingChallenges: boolean;
  aiMlEvents: boolean;
  webDevEvents: boolean;
  dataScienceEvents: boolean;
}

export default function SmartAlertModal({ isOpen, onClose }: SmartAlertModalProps) {
  const { user } = useUser();
  const [preferences, setPreferences] = useState<AlertPreferences>({
    email: user?.primaryEmailAddress?.emailAddress || '',
    internships: true,
    hackathons: true,
    workshops: false,
    codingChallenges: true,
    aiMlEvents: false,
    webDevEvents: false,
    dataScienceEvents: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load saved preferences when modal opens
  useEffect(() => {
    if (isOpen && user) {
      loadSavedPreferences();
    }
  }, [isOpen, user]);

  const loadSavedPreferences = async () => {
    try {
      const response = await fetch('/api/alerts/save');
      if (response.ok) {
        const data = await response.json();
        if (data.data) {
          setPreferences(prev => ({
            ...prev,
            ...data.data,
            email: data.data.email || user?.primaryEmailAddress?.emailAddress || '',
          }));
        }
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
  };

  const togglePreference = (key: keyof Omit<AlertPreferences, 'email'>) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = async () => {
    if (!preferences.email || !preferences.email.includes('@')) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/alerts/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message || 'Preferences saved successfully!' });
        
        // Close modal after success
        setTimeout(() => {
          onClose();
          setMessage(null);
        }, 2000);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save preferences' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    { key: 'internships' as const, label: 'Internships', emoji: '💼' },
    { key: 'hackathons' as const, label: 'Hackathons', emoji: '⚡' },
    { key: 'workshops' as const, label: 'Workshops', emoji: '🎓' },
    { key: 'codingChallenges' as const, label: 'Coding Challenges', emoji: '🏆' },
    { key: 'aiMlEvents' as const, label: 'AI/ML Events', emoji: '🤖' },
    { key: 'webDevEvents' as const, label: 'Web Development', emoji: '🌐' },
    { key: 'dataScienceEvents' as const, label: 'Data Science', emoji: '📊' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">🎯 Smart Alerts</h2>
                  <p className="text-blue-100 mt-1">Get notified about events you care about</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-white hover:text-blue-200 transition duration-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Email Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email for notifications
                </label>
                <input
                  type="email"
                  value={preferences.email}
                  onChange={(e) => setPreferences(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
              </div>

              {/* Alert Categories */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Select categories to monitor:</h3>
                
                {categories.map(({ key, label, emoji }) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{emoji}</span>
                      <span className="font-medium text-gray-800">{label}</span>
                    </div>
                    
                    {/* Toggle Switch */}
                    <button
                      onClick={() => togglePreference(key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                        preferences[key] ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          preferences[key] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              {/* Message */}
              {message && (
                <div
                  className={`mt-4 p-3 rounded-lg text-center font-medium ${
                    message.type === 'success'
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}
                >
                  {message.text}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition duration-200 disabled:opacity-50 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    'Save Preferences'
                  )}
                </button>
              </div>

              {/* Info Text */}
              <p className="text-center text-gray-500 text-sm mt-4">
                We'll email you when new events match your selected categories
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
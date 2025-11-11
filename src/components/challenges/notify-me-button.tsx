"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NotifyMeButtonProps {
  challenge: {
    id: number;
    title: string;
    deadline: string;
    platform: string;
  };
  onNotify: (challengeId: number, email?: string) => Promise<void>;
}

export default function NotifyMeButton({ challenge, onNotify }: NotifyMeButtonProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState("");

  const handleNotify = async () => {
    if (isSubscribed) return;

    if (!showEmailInput) {
      setShowEmailInput(true);
      return;
    }

    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      await onNotify(challenge.id, email);
      setIsSubscribed(true);
      setShowEmailInput(false);
      // Save to localStorage
      const subscriptions = JSON.parse(localStorage.getItem('challengeSubscriptions') || '[]');
      localStorage.setItem('challengeSubscriptions', JSON.stringify([
        ...subscriptions,
        { challengeId: challenge.id, email, subscribedAt: new Date().toISOString() }
      ]));
    } catch (error) {
      alert('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickNotify = async () => {
    setIsLoading(true);
    try {
      await onNotify(challenge.id);
      setIsSubscribed(true);
      // Save to localStorage
      const subscriptions = JSON.parse(localStorage.getItem('challengeSubscriptions') || '[]');
      localStorage.setItem('challengeSubscriptions', JSON.stringify([
        ...subscriptions,
        { challengeId: challenge.id, subscribedAt: new Date().toISOString() }
      ]));
    } catch (error) {
      alert('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user is already subscribed
  useState(() => {
    const subscriptions = JSON.parse(localStorage.getItem('challengeSubscriptions') || '[]');
    const isSubscribed = subscriptions.some((sub: any) => sub.challengeId === challenge.id);
    setIsSubscribed(isSubscribed);
  });

  if (isSubscribed) {
    return (
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium text-sm border border-green-200"
      >
        ✅ Notifications On
      </motion.div>
    );
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {showEmailInput && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full mb-2 left-0 right-0 bg-white p-3 rounded-lg shadow-lg border border-gray-200 z-10"
          >
            <div className="text-sm font-medium text-gray-900 mb-2">
              Get reminder for: {challenge.title}
            </div>
            <input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex gap-2">
              <button
                onClick={handleNotify}
                disabled={isLoading}
                className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition duration-200 disabled:opacity-50"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
              <button
                onClick={() => setShowEmailInput(false)}
                className="px-3 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-sm font-medium transition duration-200"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNotify}
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-medium text-sm transition duration-200 shadow-lg disabled:opacity-50"
        >
          {isLoading ? '...' : '🔔 Notify Me'}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleQuickNotify}
          disabled={isLoading}
          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition duration-200 disabled:opacity-50"
          title="Quick subscribe without email"
        >
          ⚡
        </motion.button>
      </div>
    </div>
  );
}
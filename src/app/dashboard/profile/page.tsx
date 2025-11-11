"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [userStats, setUserStats] = useState({
    bookmarksCount: 0,
    registeredEvents: 0,
    alertsEnabled: true,
    joinedDate: ""
  });

  // Load user stats from localStorage (replace with your backend later)
  useEffect(() => {
    if (isLoaded && user) {
      // Load bookmarks count
      const savedBookmarks = JSON.parse(localStorage.getItem("bookmarkedEvents") || "[]");
      const bookmarksCount = savedBookmarks.length;

      // Load other stats (mock data for now)
      const registeredEvents = Math.floor(Math.random() * 15) + 1; // Random 1-15
      const alertsEnabled = true;
      const joinedDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Recently";

      setUserStats({
        bookmarksCount,
        registeredEvents,
        alertsEnabled,
        joinedDate
      });
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account and track your activity</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Card */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white shadow-lg rounded-xl p-8"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <img
                    src={user?.imageUrl || "/default-avatar.png"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-blue-100 shadow-md"
                  />
                </div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {user?.fullName || "User"}
                  </h2>
                  <p className="text-gray-500 text-lg mb-1">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Member since {userStats.joinedDate}
                  </p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{userStats.bookmarksCount}</div>
                      <div className="text-sm text-gray-600">Bookmarks</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{userStats.registeredEvents}</div>
                      <div className="text-sm text-gray-600">Events</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {userStats.alertsEnabled ? "✅" : "❌"}
                      </div>
                      <div className="text-sm text-gray-600">Alerts</div>
                    </div>
                  </div>
                </div>

                {/* UserButton for account management */}
                <div className="flex-shrink-0">
                  <div className="text-center">
                    <UserButton afterSignOutUrl="/" />
                    <p className="text-sm text-gray-500 mt-2">Manage Account</p>
                  </div>
                </div>
              </div>

              {/* Account Overview */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Account Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-lg">⭐</span>
                      </div>
                      <div>
                        <div className="font-semibold text-blue-800">Bookmarked Events</div>
                        <div className="text-blue-600">{userStats.bookmarksCount} saved events</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-lg">📅</span>
                      </div>
                      <div>
                        <div className="font-semibold text-green-800">Events Registered</div>
                        <div className="text-green-600">{userStats.registeredEvents} participations</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 text-lg">🔔</span>
                      </div>
                      <div>
                        <div className="font-semibold text-purple-800">Notifications</div>
                        <div className="text-purple-600">
                          {userStats.alertsEnabled ? "Alerts enabled" : "Alerts disabled"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 text-lg">🤖</span>
                      </div>
                      <div>
                        <div className="font-semibold text-orange-800">AI Posts Generated</div>
                        <div className="text-orange-600">Coming soon</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* User Activity Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white shadow-lg rounded-xl p-8 mt-6"
            >
              <h3 className="text-xl font-semibold mb-6 text-gray-800">Recent Activity</h3>
              
              <div className="space-y-4">
                {/* Recent Bookmarks */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-600">⭐</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Bookmarked Events</div>
                      <div className="text-sm text-gray-600">Recently saved coding challenges</div>
                    </div>
                  </div>
                  <Link 
                    href="/dashboard/bookmarks"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition duration-200"
                  >
                    View All
                  </Link>
                </div>

                {/* Alert Preferences */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600">🔔</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Alert Preferences</div>
                      <div className="text-sm text-gray-600">Manage your notification settings</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition duration-200">
                    Configure
                  </button>
                </div>

                {/* AI Generator History */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600">🤖</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">AI Post Generator</div>
                      <div className="text-sm text-gray-600">Your generated LinkedIn posts</div>
                    </div>
                  </div>
                  <Link 
                    href="/dashboard/generator"
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition duration-200"
                  >
                    Generate
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Quick Actions */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Quick Actions */}
              <div className="bg-white shadow-lg rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Actions</h3>
                <div className="space-y-3">
                  <Link
                    href="/dashboard/feed"
                    className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition duration-200 group"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600">📰</span>
                    </div>
                    <div>
                      <div className="font-medium text-blue-800 group-hover:text-blue-900">Browse Events</div>
                      <div className="text-sm text-blue-600">Discover new opportunities</div>
                    </div>
                  </Link>

                  <Link
                    href="/dashboard/bookmarks"
                    className="w-full flex items-center gap-3 p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition duration-200 group"
                  >
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-600">⭐</span>
                    </div>
                    <div>
                      <div className="font-medium text-yellow-800 group-hover:text-yellow-900">My Bookmarks</div>
                      <div className="text-sm text-yellow-600">View saved events</div>
                    </div>
                  </Link>

                  <Link
                    href="/dashboard/generator"
                    className="w-full flex items-center gap-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition duration-200 group"
                  >
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600">🤖</span>
                    </div>
                    <div>
                      <div className="font-medium text-purple-800 group-hover:text-purple-900">AI Generator</div>
                      <div className="text-sm text-purple-600">Create LinkedIn posts</div>
                    </div>
                  </Link>

                  <Link
                    href="/dashboard/challenges"
                    className="w-full flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition duration-200 group"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600">🏆</span>
                    </div>
                    <div>
                      <div className="font-medium text-green-800 group-hover:text-green-900">Coding Challenges</div>
                      <div className="text-sm text-green-600">Test your skills</div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Account Status */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Account Status</h3>
                <p className="text-blue-100 text-sm mb-4">Your profile is active and verified</p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Verified Member</span>
                </div>
                <div className="mt-4 text-xs text-blue-200">
                  <p>• Full platform access</p>
                  <p>• Event notifications</p>
                  <p>• AI Post Generator</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useFilterStore } from "@/lib/store/filter-store";

interface LeaderboardWidgetProps {
  liveChallenges: number;
  upcomingChallenges: number;
  totalParticipants: number;
  trendingTags: string[];
}

export default function LeaderboardWidget({ 
  liveChallenges, 
  upcomingChallenges, 
  totalParticipants,
  trendingTags 
}: LeaderboardWidgetProps) {
  const { setSelectedDeadline } = useFilterStore();

  const handleJoinLiveContests = () => {
    if (liveChallenges > 0) {
      // Set filter to show only live contests
      setSelectedDeadline("Live Now");
      
      // Scroll to challenges section after a short delay
      setTimeout(() => {
        const challengesSection = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
        if (challengesSection) {
          challengesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // If no live contests, show all challenges
      setSelectedDeadline("All");
      alert('No live contests available at the moment. Showing all challenges!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">🏆 Live Leaderboard</h3>
        <div className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
          🔴 LIVE
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold">{liveChallenges}</div>
          <div className="text-xs opacity-90">Live Contests</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{upcomingChallenges}</div>
          <div className="text-xs opacity-90">Upcoming</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{(totalParticipants / 1000).toFixed(1)}k</div>
          <div className="text-xs opacity-90">Participants</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">🏅</div>
          <div className="text-xs opacity-90">Active</div>
        </div>
      </div>

      {/* Trending Tags */}
      <div className="mt-4">
        <div className="text-sm font-medium mb-2 opacity-90">🔥 Trending Tags</div>
        <div className="flex flex-wrap gap-1">
          {trendingTags.map((tag, index) => (
            <span
              key={tag}
              className="px-2 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Action */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleJoinLiveContests}
        className="w-full mt-4 px-4 py-2 bg-white text-blue-600 rounded-xl font-semibold text-sm hover:bg-blue-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={liveChallenges === 0}
      >
        {liveChallenges > 0 ? "🚀 Join Live Contests" : "📊 View Challenges"}
      </motion.button>
    </motion.div>
  );
}
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { useFilterStore } from "@/lib/store/filter-store";
import LeaderboardWidget from "@/components/challenges/leaderboard-widget";
import NotifyMeButton from "@/components/challenges/notify-me-button";
import CalendarDropdown from "@/components/challenges/calendar-dropdown";

// Platform logos mapping
const platformLogos: { [key: string]: string } = {
  "HackerRank": "💚",
  "Unstop": "🔵", 
  "LeetCode": "🟡",
  "CodeChef": "🔴",
  "CodeForces": "🔵",
  "TopCoder": "🔴",
  "Other": "⚫"
};

// Enhanced mock data with more challenges for pagination
const mockChallenges = [
  {
    id: 1,
    title: "AI Coding Challenge 2024",
    platform: "HackerRank",
    type: "coding_challenge",
    description: "Solve real-world AI problems in this 48-hour coding challenge. Test your machine learning and algorithm skills.",
    deadline: "2024-01-28T23:59:00",
    location: "Remote",
    tags: ["AI", "Python", "Machine Learning", "Neural Networks"],
    link: "https://hackerrank.com/ai-challenge",
    isLive: true,
    difficulty: "Hard",
    participants: 1250
  },
  {
    id: 2,
    title: "Full Stack Development Contest",
    platform: "Unstop",
    type: "coding_challenge",
    description: "Build a complete full-stack application with modern technologies including React, Node.js, and MongoDB.",
    deadline: "2024-02-15T18:00:00",
    location: "Remote",
    tags: ["React", "Node.js", "MongoDB", "Full Stack", "JavaScript"],
    link: "https://unstop.com/fullstack-contest",
    isLive: false,
    difficulty: "Medium",
    participants: 890
  },
  {
    id: 3,
    title: "Data Structures Championship",
    platform: "LeetCode",
    type: "coding_challenge",
    description: "Compete in algorithmic problems and data structure challenges. Perfect for interview preparation.",
    deadline: "2024-01-25T20:00:00",
    location: "Remote",
    tags: ["Algorithms", "Data Structures", "C++", "Java", "Python"],
    link: "https://leetcode.com/contest",
    isLive: true,
    difficulty: "Medium",
    participants: 4500
  },
  {
    id: 4,
    title: "Beginner Friendly Coding Sprint",
    platform: "CodeChef",
    type: "coding_challenge",
    description: "Perfect for beginners! Solve fun coding problems and learn programming fundamentals.",
    deadline: "2024-02-10T16:00:00",
    location: "Remote",
    tags: ["Beginner", "Python", "Basic Programming", "Algorithms"],
    link: "https://codechef.com/beginner-sprint",
    isLive: false,
    difficulty: "Easy",
    participants: 3200
  },
  {
    id: 5,
    title: "React Native Mobile App Challenge",
    platform: "Unstop",
    type: "coding_challenge",
    description: "Create innovative mobile applications using React Native and modern mobile development practices.",
    deadline: "2024-01-20T23:59:00", // Past deadline for testing
    location: "Remote",
    tags: ["React Native", "Mobile", "JavaScript", "iOS", "Android"],
    link: "https://unstop.com/react-native-challenge",
    isLive: false,
    difficulty: "Medium",
    participants: 2100
  },
  {
    id: 6,
    title: "Cloud Infrastructure Hackathon",
    platform: "HackerRank",
    type: "coding_challenge",
    description: "Design and deploy scalable cloud infrastructure solutions using AWS and Docker.",
    deadline: "2024-02-28T18:00:00",
    location: "Remote",
    tags: ["AWS", "Cloud", "Docker", "DevOps", "Infrastructure"],
    link: "https://hackerrank.com/cloud-hackathon",
    isLive: false,
    difficulty: "Hard",
    participants: 1800
  },
  // Add more challenges for pagination testing...
  ...Array.from({ length: 10 }, (_, i) => ({
    id: i + 7,
    title: `Advanced Algorithm Challenge ${i + 1}`,
    platform: ["LeetCode", "HackerRank", "CodeForces"][i % 3],
    type: "coding_challenge",
    description: `Advanced algorithmic problems and optimization challenges for experienced coders. Round ${i + 1}`,
    deadline: `2024-0${2 + Math.floor(i / 3)}-${(i % 28) + 1}T18:00:00`,
    location: "Remote",
    tags: ["Algorithms", "Optimization", "C++", "Java", "Advanced"],
    link: `https://example.com/challenge-${i + 7}`,
    isLive: false,
    difficulty: ["Easy", "Medium", "Hard"][i % 3],
    participants: 500 + i * 100
  }))
];

const platforms = ["All", "HackerRank", "Unstop", "LeetCode", "CodeChef", "CodeForces", "TopCoder", "Other"];
const deadlineFilters = ["All", "Live Now", "Upcoming", "This Week", "This Month"];
const locationFilters = ["All", "Remote", "Onsite", "Hybrid"];
const difficultyFilters = ["All", "Easy", "Medium", "Hard"];
const sortOptions = ["Newest", "Deadline", "Platform", "Difficulty", "Popularity"];

// Countdown timer component with dynamic status
function CountdownTimer({ deadline, challengeId }: { deadline: string, challengeId: number }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(deadline).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setHasEnded(true);
        return "Ended";
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        return `Ends in ${days}d ${hours}h`;
      } else if (hours > 0) {
        return `Ends in ${hours}h ${minutes}m`;
      } else {
        return `Ends in ${minutes}m`;
      }
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);

    return () => clearInterval(timer);
  }, [deadline]);

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
      hasEnded 
        ? "bg-gray-100 text-gray-600"
        : "bg-orange-100 text-orange-800"
    }`}>
      ⏱️ {timeLeft}
    </div>
  );
}

// Dynamic action button component
function ActionButton({ deadline, link, challengeId }: { deadline: string, link: string, challengeId: number }) {
  const [buttonState, setButtonState] = useState<"participate" | "view_results" | "ended">("participate");

  useEffect(() => {
    const checkDeadline = () => {
      const hasEnded = new Date(deadline).getTime() <= new Date().getTime();
      setButtonState(hasEnded ? "view_results" : "participate");
    };

    checkDeadline();
    const interval = setInterval(checkDeadline, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [deadline]);

  const getButtonConfig = (state: string) => {
    switch (state) {
      case "view_results":
        return {
          text: "View Results",
          className: "bg-purple-600 hover:bg-purple-700",
          icon: "📊"
        };
      case "ended":
        return {
          text: "Ended",
          className: "bg-gray-500 cursor-not-allowed",
          icon: "⏸️"
        };
      default:
        return {
          text: "Participate",
          className: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
          icon: "🚀"
        };
    }
  };

  const config = getButtonConfig(buttonState);

  return (
    <motion.button
      whileHover={buttonState !== "ended" ? { scale: 1.02 } : {}}
      whileTap={buttonState !== "ended" ? { scale: 0.98 } : {}}
      onClick={() => buttonState !== "ended" && window.open(link, "_blank")}
      className={`flex-1 px-4 py-3 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl group ${
        buttonState === "ended" ? "cursor-not-allowed" : "cursor-pointer"
      } ${config.className}`}
      disabled={buttonState === "ended"}
    >
      <span className="flex items-center justify-center">
        {config.icon} {config.text}
        {buttonState === "participate" && (
          <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
        )}
      </span>
    </motion.button>
  );
}

// Difficulty badge component
function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const getDifficultyConfig = (diff: string) => {
    switch (diff) {
      case "Easy":
        return { color: "bg-green-100 text-green-800 border-green-200", icon: "🟢" };
      case "Medium":
        return { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: "🟡" };
      case "Hard":
        return { color: "bg-red-100 text-red-800 border-red-200", icon: "🔴" };
      default:
        return { color: "bg-gray-100 text-gray-800 border-gray-200", icon: "⚫" };
    }
  };

  const config = getDifficultyConfig(difficulty);

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${config.color}`}>
      {config.icon} {difficulty}
    </span>
  );
}

// Live Badge component with glow effect
function LiveBadge() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-red-400 rounded-full blur-sm animate-pulse"></div>
      <span className="relative px-3 py-1 bg-red-500 text-white rounded-full text-sm font-bold border-2 border-white">
        🔴 LIVE
      </span>
    </div>
  );
}

// Bookmark button with instant toggle
function BookmarkButton({ challenge, isBookmarked: initialBookmarked }: { challenge: any, isBookmarked: boolean }) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  const toggleBookmark = useCallback(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarkedEvents") || "[]");
    
    let updatedBookmarks;
    if (isBookmarked) {
      updatedBookmarks = savedBookmarks.filter((b: any) => b.id !== challenge.id);
    } else {
      updatedBookmarks = [...savedBookmarks, { ...challenge, bookmarkedAt: new Date().toISOString() }];
    }
    
    localStorage.setItem("bookmarkedEvents", JSON.stringify(updatedBookmarks));
    setIsBookmarked(!isBookmarked);
  }, [isBookmarked, challenge]);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleBookmark}
      className={`px-4 py-3 border-2 rounded-xl font-medium transition-all duration-200 ${
        isBookmarked 
          ? "border-yellow-400 bg-yellow-50 text-yellow-600" 
          : "border-gray-300 hover:border-yellow-400 hover:bg-yellow-50"
      }`}
    >
      {isBookmarked ? "★" : "⭐"}
    </motion.button>
  );
}

const ITEMS_PER_PAGE = 6;

export default function ChallengesPage() {
  // Use Zustand store for persistent filters
  const {
    selectedPlatform,
    selectedDifficulty,
    selectedDeadline,
    selectedLocation,
    sortBy,
    searchQuery,
    setSelectedPlatform,
    setSelectedDifficulty,
    setSelectedDeadline,
    setSelectedLocation,
    setSortBy,
    setSearchQuery,
    clearAllFilters
  } = useFilterStore();

  const [challenges] = useState(mockChallenges);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(new Set());

  // Load bookmarks on component mount
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarkedEvents") || "[]");
    const bookmarkedIds = new Set(savedBookmarks.map((b: any) => b.id));
    setBookmarkedIds(bookmarkedIds);
  }, []);

  // Notify me handler
  const handleNotify = useCallback(async (challengeId: number, email?: string) => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(`Subscribed to challenge ${challengeId} with email: ${email}`);
        // Here you would typically make an API call to your backend
        resolve();
      }, 1000);
    });
  }, []);

  // Smart search function with tag/keyword matching
  const searchChallenges = useCallback((challenges: any[], query: string) => {
    if (!query.trim()) return challenges;

    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    
    return challenges.filter(challenge => {
      const searchableText = [
        challenge.title,
        challenge.description,
        challenge.platform,
        challenge.difficulty,
        ...challenge.tags
      ].join(' ').toLowerCase();

      // Match all search terms (AND logic)
      return searchTerms.every(term => 
        searchableText.includes(term) ||
        challenge.tags.some((tag: string) => tag.toLowerCase().includes(term))
      );
    });
  }, []);

  // Filter and sort challenges
  const filteredChallenges = useMemo(() => {
    let filtered = challenges.filter(challenge => challenge.type === "coding_challenge");

    // Apply smart search
    filtered = searchChallenges(filtered, searchQuery);

    // Platform filter
    if (selectedPlatform !== "All") {
      filtered = filtered.filter(challenge => challenge.platform === selectedPlatform);
    }

    // Deadline filter
    if (selectedDeadline !== "All") {
      const now = new Date();
      switch (selectedDeadline) {
        case "Live Now":
          filtered = filtered.filter(challenge => challenge.isLive);
          break;
        case "This Week":
          const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(challenge => new Date(challenge.deadline) <= nextWeek);
          break;
        case "This Month":
          const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
          filtered = filtered.filter(challenge => new Date(challenge.deadline) <= nextMonth);
          break;
      }
    }

    // Location filter
    if (selectedLocation !== "All") {
      filtered = filtered.filter(challenge => challenge.location === selectedLocation);
    }

    // Difficulty filter
    if (selectedDifficulty !== "All") {
      filtered = filtered.filter(challenge => challenge.difficulty === selectedDifficulty);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "Deadline":
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        case "Platform":
          return a.platform.localeCompare(b.platform);
        case "Difficulty":
          const difficultyOrder = { "Easy": 1, "Medium": 2, "Hard": 3 };
          return difficultyOrder[a.difficulty as keyof typeof difficultyOrder] - difficultyOrder[b.difficulty as keyof typeof difficultyOrder];
        case "Popularity":
          return b.participants - a.participants;
        case "Newest":
        default:
          return b.id - a.id;
      }
    });

    return filtered;
  }, [challenges, searchQuery, selectedPlatform, selectedDeadline, selectedLocation, selectedDifficulty, sortBy, searchChallenges]);

  // Calculate leaderboard stats
  const leaderboardStats = useMemo(() => {
    const liveChallenges = filteredChallenges.filter(challenge => challenge.isLive).length;
    const upcomingChallenges = filteredChallenges.filter(challenge => 
      !challenge.isLive && new Date(challenge.deadline) > new Date()
    ).length;
    const totalParticipants = filteredChallenges.reduce((acc, curr) => acc + curr.participants, 0);
    
    // Extract trending tags
    const tagCounts: { [key: string]: number } = {};
    filteredChallenges.forEach(challenge => {
      challenge.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    
    const trendingTags = Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([tag]) => tag);

    return {
      liveChallenges,
      upcomingChallenges,
      totalParticipants,
      trendingTags
    };
  }, [filteredChallenges]);

  // Pagination
  const paginatedChallenges = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredChallenges.slice(0, startIndex + ITEMS_PER_PAGE);
  }, [filteredChallenges, currentPage]);

  const hasMore = paginatedChallenges.length < filteredChallenges.length;

  // Load more function
  const loadMore = useCallback(() => {
    if (hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  }, [hasMore]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedPlatform, selectedDeadline, selectedLocation, selectedDifficulty, sortBy]);

  const activeFiltersCount = [
    selectedPlatform !== "All",
    selectedDifficulty !== "All",
    selectedDeadline !== "All",
    selectedLocation !== "All",
    searchQuery.trim() !== ""
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🏆 Coding Challenges
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Level up your coding skills with live contests and challenges from top platforms
          </p>
        </motion.div>

        {/* Leaderboard Widget and Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Leaderboard Widget */}
          <div className="lg:col-span-1">
            <LeaderboardWidget {...leaderboardStats} />
          </div>

          {/* Stats Grid */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-4 rounded-xl shadow-sm border text-center"
            >
              <div className="text-2xl font-bold text-blue-600">{filteredChallenges.length}</div>
              <div className="text-sm text-gray-600">Total Challenges</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-4 rounded-xl shadow-sm border text-center"
            >
              <div className="text-2xl font-bold text-green-600">
                {filteredChallenges.filter(c => c.isLive).length}
              </div>
              <div className="text-sm text-gray-600">Live Now</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-4 rounded-xl shadow-sm border text-center"
            >
              <div className="text-2xl font-bold text-purple-600">
                {platforms.length - 1}
              </div>
              <div className="text-sm text-gray-600">Platforms</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-4 rounded-xl shadow-sm border text-center"
            >
              <div className="text-2xl font-bold text-orange-600">
                {filteredChallenges.reduce((acc, curr) => acc + curr.participants, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Participants</div>
            </motion.div>
          </div>
        </div>

        {/* Filters & Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-sm border mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search Bar */}
            <div className="w-full lg:w-auto">
              <input
                type="text"
                placeholder="🔍 Search by title, platform, tags (e.g., React, Python, AI)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full lg:w-96 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {/* Platform Filter */}
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                {platforms.map(platform => (
                  <option key={platform} value={platform}>
                    {platform === "All" ? "🌐 All Platforms" : `${platformLogos[platform]} ${platform}`}
                  </option>
                ))}
              </select>

              {/* Difficulty Filter */}
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                {difficultyFilters.map(diff => (
                  <option key={diff} value={diff}>
                    {diff === "All" ? "📊 All Levels" : `${diff === "Easy" ? "🟢" : diff === "Medium" ? "🟡" : "🔴"} ${diff}`}
                  </option>
                ))}
              </select>

              {/* Sort Options */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>📋 {option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedPlatform !== "All" && (
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {platformLogos[selectedPlatform]} {selectedPlatform}
                  <button onClick={() => setSelectedPlatform("All")} className="ml-2 hover:text-blue-900">×</button>
                </span>
              )}
              {selectedDifficulty !== "All" && (
                <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {selectedDifficulty === "Easy" ? "🟢" : selectedDifficulty === "Medium" ? "🟡" : "🔴"} {selectedDifficulty}
                  <button onClick={() => setSelectedDifficulty("All")} className="ml-2 hover:text-green-900">×</button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  🔍 {searchQuery}
                  <button onClick={() => setSearchQuery("")} className="ml-2 hover:text-purple-900">×</button>
                </span>
              )}
              <button
                onClick={clearAllFilters}
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200 transition duration-200"
              >
                🗑️ Clear All ({activeFiltersCount})
              </button>
            </div>
          )}
        </motion.div>

        {/* Challenges Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {paginatedChallenges.map((challenge) => (
            <motion.div
              key={challenge.id}
              whileHover={{ 
                y: -4,
                transition: { duration: 0.2 }
              }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              <div className="p-6">
                {/* Challenge Header - Top Row */}
                <div className="flex items-center justify-between mb-4">
                  {/* Left side: Platform and Live badge */}
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{platformLogos[challenge.platform]}</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">
                      {challenge.platform}
                    </span>
                    {/* Live Badge beside platform with 8px margin */}
                    {challenge.isLive && (
                      <div className="mr-2">
                        <LiveBadge />
                      </div>
                    )}
                  </div>

                  {/* Right side: Difficulty badge */}
                  <DifficultyBadge difficulty={challenge.difficulty} />
                </div>

                {/* Challenge Title & Description */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                  {challenge.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {challenge.description}
                </p>

                {/* Countdown Timer */}
                <div className="mb-4">
                  <CountdownTimer deadline={challenge.deadline} challengeId={challenge.id} />
                </div>

                {/* Participants */}
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    👥 {challenge.participants.toLocaleString()} participants
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {challenge.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium border border-blue-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Enhanced Action Buttons Section */}
                <div className="space-y-3">
                  {/* Main Action Row */}
                  <div className="flex gap-3">
                    <ActionButton 
                      deadline={challenge.deadline} 
                      link={challenge.link}
                      challengeId={challenge.id}
                    />
                    <BookmarkButton 
                      challenge={challenge} 
                      isBookmarked={bookmarkedIds.has(challenge.id)}
                    />
                  </div>

                  {/* Engagement Buttons Row */}
                  <div className="flex gap-2">
                    {/* Notify Me Button - Show for upcoming challenges */}
                    {!challenge.isLive && new Date(challenge.deadline) > new Date() && (
                      <div className="flex-1">
                        <NotifyMeButton 
                          challenge={challenge}
                          onNotify={handleNotify}
                        />
                      </div>
                    )}
                    
                    {/* Calendar Dropdown - Show for all challenges */}
                    <CalendarDropdown challenge={challenge} />
                  </div>

                  {/* Quick Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                    <span>👥 {challenge.participants.toLocaleString()} joined</span>
                    <span>⏱️ {new Date(challenge.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadMore}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold text-lg transition duration-200 shadow-lg"
            >
              📥 Load More ({filteredChallenges.length - paginatedChallenges.length} remaining)
            </motion.button>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredChallenges.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No challenges found
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              {searchQuery || activeFiltersCount > 0
                ? "Try adjusting your filters to see more results"
                : "No active coding challenges available right now. Check back later!"
              }
            </p>
            {activeFiltersCount > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearAllFilters}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition duration-200 shadow-lg"
              >
                🗑️ Clear All Filters
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Results Count */}
        {filteredChallenges.length > 0 && (
          <div className="text-center text-gray-600 text-sm">
            Showing {paginatedChallenges.length} of {filteredChallenges.length} challenges
            {activeFiltersCount > 0 && ` (${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} active)`}
          </div>
        )}
      </div>
    </div>
  );
}
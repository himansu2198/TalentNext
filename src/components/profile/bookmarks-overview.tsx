"use client";

import { useState, useEffect } from "react";

export default function BookmarksOverview() {
  const [bookmarkCount, setBookmarkCount] = useState(0);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarkedEvents");
    if (savedBookmarks) {
      const bookmarks = JSON.parse(savedBookmarks);
      setBookmarkCount(bookmarks.length);
    }
  }, []);

  return (
    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
          <span className="text-blue-600 text-lg">⭐</span>
        </div>
        <h3 className="font-semibold text-blue-800">Bookmarked Events</h3>
      </div>
      <p className="text-sm text-blue-700 mb-4">
        You've saved {bookmarkCount} events so far!
      </p>
      <button 
        onClick={() => window.location.href = '/dashboard/bookmarks'}
        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200 font-medium"
      >
        View All Bookmarks
      </button>
    </div>
  );
}
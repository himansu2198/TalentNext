"use client";

export default function RecentActivity() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
          <span className="text-green-600 text-lg">📅</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <p className="text-gray-600 text-sm">Your recent interactions with events</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="text-center py-8">
          <div className="text-gray-400 text-6xl mb-4">📊</div>
          <p className="text-gray-500">Your activity will appear here</p>
          <p className="text-gray-400 text-sm mt-1">Bookmark events to see them here</p>
        </div>
      </div>
    </div>
  );
}
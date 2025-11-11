"use client";

export default function QuickActions() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button className="p-4 border border-gray-300 rounded-lg text-left hover:bg-gray-50 transition duration-200 group">
          <div className="font-medium text-gray-900 group-hover:text-blue-600">Account Settings</div>
          <div className="text-sm text-gray-500 mt-1">Update your profile information</div>
        </button>
        <button className="p-4 border border-gray-300 rounded-lg text-left hover:bg-gray-50 transition duration-200 group">
          <div className="font-medium text-gray-900 group-hover:text-blue-600">Notification Settings</div>
          <div className="text-sm text-gray-500 mt-1">Manage email preferences</div>
        </button>
        <button className="p-4 border border-gray-300 rounded-lg text-left hover:bg-gray-50 transition duration-200 group">
          <div className="font-medium text-gray-900 group-hover:text-blue-600">Privacy & Security</div>
          <div className="text-sm text-gray-500 mt-1">Control your data and security</div>
        </button>
        <button className="p-4 border border-gray-300 rounded-lg text-left hover:bg-gray-50 transition duration-200 group">
          <div className="font-medium text-gray-900 group-hover:text-blue-600">Help & Support</div>
          <div className="text-sm text-gray-500 mt-1">Get help with Event Aggr</div>
        </button>
      </div>
    </div>
  );
}
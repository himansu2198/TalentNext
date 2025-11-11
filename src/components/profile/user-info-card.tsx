"use client";

import { useUser, UserButton } from "@clerk/nextjs";

export default function UserInfoCard() {
  const { user } = useUser();

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <div className="flex flex-col items-center text-center">
        <img
          src={user?.imageUrl || "/default-avatar.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4 border-2 border-gray-200"
        />
        <h2 className="text-xl font-semibold text-gray-900">
          {user?.fullName || "User"}
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          {user?.primaryEmailAddress?.emailAddress}
        </p>
        <p className="text-gray-400 text-xs mt-2">
          Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Recently"}
        </p>
        
        <div className="mt-4 flex items-center gap-2">
          <UserButton afterSignOutUrl="/" />
          <span className="text-sm text-gray-600">Manage Account</span>
        </div>
      </div>
    </div>
  );
}
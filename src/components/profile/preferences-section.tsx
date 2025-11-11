"use client";

import { useState, useEffect } from "react";

const categories = ["AI", "Web Dev", "Data Science", "Finance", "Mobile Dev", "Cloud Computing", "Cybersecurity", "UI/UX"];

interface PreferencesSectionProps {
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
}

export default function PreferencesSection({ selectedCategories, onCategoryToggle }: PreferencesSectionProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
          <span className="text-orange-600 text-lg">🔔</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Your Interests</h3>
          <p className="text-gray-600 text-sm">
            Get personalized notifications for events matching your interests
          </p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 mt-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryToggle(category)}
            className={`px-4 py-2 rounded-full border transition duration-200 font-medium ${
              selectedCategories.includes(category)
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        {selectedCategories.length > 0 
          ? `Selected ${selectedCategories.length} categories: ${selectedCategories.join(", ")}`
          : "No categories selected - enable all notifications"
        }
      </div>
    </div>
  );
}
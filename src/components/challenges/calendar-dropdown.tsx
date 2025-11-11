"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateGoogleCalendarLink, generateICalFile, downloadICalFile } from "@/lib/utils/calendar-utils";

interface CalendarDropdownProps {
  challenge: {
    id: number;
    title: string;
    description: string;
    deadline: string;
    location: string;
    link: string;
  };
}

// Helper function to safely parse dates
function safeDate(dateString: string): Date {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? new Date(Date.now() + 24 * 60 * 60 * 1000) : date; // Fallback to tomorrow if invalid
}

export default function CalendarDropdown({ challenge }: CalendarDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Safely create calendar event with valid dates
  const calendarEvent = {
    title: challenge.title,
    description: `${challenge.description}\n\nPlatform: ${challenge.link}`,
    startTime: new Date(safeDate(challenge.deadline).getTime() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours before deadline
    endTime: safeDate(challenge.deadline).toISOString(),
    location: challenge.location,
    url: challenge.link
  };

  const handleGoogleCalendar = () => {
    const googleCalendarUrl = generateGoogleCalendarLink(calendarEvent);
    window.open(googleCalendarUrl, '_blank');
    setIsOpen(false);
  };

  const handleDownloadICS = () => {
    const icsContent = generateICalFile(calendarEvent);
    downloadICalFile(icsContent, `${challenge.title.replace(/\s+/g, '_')}.ics`);
    setIsOpen(false);
  };

  const handleOutlookCalendar = () => {
    const icsContent = generateICalFile(calendarEvent);
    window.open(icsContent, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm transition duration-200 shadow-lg flex items-center gap-2"
      >
        📅 Add to Calendar
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full mt-2 right-0 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-20 py-2"
          >
            <div className="text-xs font-medium text-gray-500 px-4 py-2 border-b border-gray-100">
              Export to Calendar
            </div>
            
            <button
              onClick={handleGoogleCalendar}
              className="w-full px-4 py-3 text-left hover:bg-blue-50 transition duration-200 flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-red-600 text-sm">G</span>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">Google Calendar</div>
                <div className="text-xs text-gray-500">Add to Google Calendar</div>
              </div>
            </button>

            <button
              onClick={handleOutlookCalendar}
              className="w-full px-4 py-3 text-left hover:bg-blue-50 transition duration-200 flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-sm">O</span>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">Outlook</div>
                <div className="text-xs text-gray-500">Add to Outlook</div>
              </div>
            </button>

            <button
              onClick={handleDownloadICS}
              className="w-full px-4 py-3 text-left hover:bg-blue-50 transition duration-200 flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-sm">📥</span>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">Download .ics</div>
                <div className="text-xs text-gray-500">Import to any calendar</div>
              </div>
            </button>

            <div className="px-4 py-2 border-t border-gray-100">
              <div className="text-xs text-gray-500">
                Reminder set for 2 hours before deadline
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
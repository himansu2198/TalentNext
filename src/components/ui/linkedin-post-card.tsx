"use client";

import { motion } from "framer-motion";

interface LinkedInPostCardProps {
  children: React.ReactNode;
  title?: string;
  style?: "simple" | "professional" | "storytelling";
  className?: string;
}

export function LinkedInPostCard({ 
  children, 
  title, 
  style = "professional",
  className = "" 
}: LinkedInPostCardProps) {
  
  const getStyleConfig = () => {
    switch (style) {
      case "simple":
        return { from: "#10b981", to: "#3b82f6" }; // Green to Blue
      case "professional":
        return { from: "#3b82f6", to: "#9333ea" }; // Blue to Purple
      case "storytelling":
        return { from: "#f59e0b", to: "#ec4899" }; // Orange to Pink
      default:
        return { from: "#3b82f6", to: "#9333ea" };
    }
  };

  const colors = getStyleConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-2xl overflow-hidden border border-gray-200/50 bg-white/80 backdrop-blur-sm shadow-lg p-6 ${className}`}
    >
      {/* Custom gradient border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-sm" />
      <div className="absolute inset-[1px] rounded-2xl bg-white" />
      
      {/* Animated gradient corners */}
      <motion.div
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-2xl"
        style={{
          borderColor: colors.from,
        }}
      />
      <motion.div
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr-2xl"
        style={{
          borderColor: colors.to,
        }}
      />
      <motion.div
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 rounded-bl-2xl"
        style={{
          borderColor: colors.from,
        }}
      />
      <motion.div
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-2xl"
        style={{
          borderColor: colors.to,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {title && (
          <div className="flex items-center gap-2 mb-4">
            <div 
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ 
                background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` 
              }}
            />
            <h3 className="text-lg font-semibold text-gray-900 capitalize">
              {style} Style
            </h3>
          </div>
        )}
        
        {children}
      </div>
    </motion.div>
  );
}
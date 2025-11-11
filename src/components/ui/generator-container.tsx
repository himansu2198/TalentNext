"use client";

import { motion } from "framer-motion";

interface GeneratorContainerProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function GeneratorContainer({ 
  children, 
  title, 
  className = "" 
}: GeneratorContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-2xl overflow-hidden border border-gray-200/50 bg-white/80 backdrop-blur-sm shadow-xl p-8 ${className}`}
    >
      {/* Subtle gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20" />
      <div className="absolute inset-[1px] rounded-2xl bg-white/95" />
      
      {/* Animated corner accents */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full opacity-50"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-2 left-2 w-4 h-4 bg-purple-500 rounded-full opacity-50"
      />
      
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 relative z-10">
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-2 h-2 bg-blue-500 rounded-full"
          />
          {title}
        </h2>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
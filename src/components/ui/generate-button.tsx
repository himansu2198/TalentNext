"use client";

import { motion } from "framer-motion";

interface GenerateButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export function GenerateButton({ 
  children, 
  onClick, 
  disabled = false, 
  loading = false,
  className = "" 
}: GenerateButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`relative rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 overflow-hidden transition-all duration-300 ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-2xl"
      } ${className}`}
    >
      {/* Animated gradient overlay on hover */}
      {!disabled && (
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl"
        />
      )}
      
      {/* Loading animation */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute inset-0 rounded-xl border-2 border-transparent"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`
            }}
          />
        </motion.div>
      )}
      
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
          />
        )}
        {children}
      </span>
    </motion.button>
  );
}
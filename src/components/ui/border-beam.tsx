"use client";

import { motion } from "framer-motion";

interface BorderBeamProps {
  size?: number;
  duration?: number;
  delay?: number;
  className?: string;
  colorFrom?: string;
  colorTo?: string;
}

export function BorderBeam({
  size = 200,
  duration = 6,
  delay = 0,
  className = "",
  colorFrom = "#3b82f6",
  colorTo = "#9333ea",
}: BorderBeamProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 rounded-2xl ${className}`}>
      <motion.div
        style={{
          width: size,
          height: size,
          background: `linear-gradient(135deg, ${colorFrom}, ${colorTo}, ${colorFrom})`,
        }}
        animate={{
          x: ["0%", "100%", "0%"],
          y: ["0%", "100%", "0%"],
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-0 left-0 rounded-2xl opacity-70 blur-sm"
      />
      <motion.div
        style={{
          width: size,
          height: size,
          background: `linear-gradient(135deg, ${colorFrom}, ${colorTo}, ${colorFrom})`,
        }}
        animate={{
          x: ["100%", "0%", "100%"],
          y: ["100%", "0%", "100%"],
        }}
        transition={{
          duration,
          delay: delay + duration / 2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-0 right-0 rounded-2xl opacity-70 blur-sm"
      />
    </div>
  );
}
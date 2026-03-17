import React from "react";
import { motion } from "motion/react";

export const Radar = ({ className }: { className?: string }) => {
  const circles = [
    { size: "25%", opacity: 0.25 },
    { size: "50%", opacity: 0.2 },
    { size: "75%", opacity: 0.15 },
    { size: "100%", opacity: 0.1 },
  ];

  return (
    <div
      className={`relative ${className}`}
      style={{ aspectRatio: "1/1" }}
    >
      {/* Static Circles */}
      {circles.map((circle, idx) => (
        <div
          key={`circle-${idx}`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-tomato/30"
          style={{
            width: circle.size,
            height: circle.size,
            opacity: circle.opacity,
          }}
        />
      ))}

      {/* Animated Radar Sweep with Gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          transformOrigin: "center center",
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 49,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Gradient sweep effect with lighter orange shades */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: "100%",
            height: "100%",
            background: `conic-gradient(from 0deg, transparent 0deg 270deg, rgba(246, 94, 60, 0.15) 270deg 300deg, rgba(246, 94, 60, 0.25) 300deg 330deg, rgba(246, 94, 60, 0.35) 330deg 360deg)`,
          }}
        />
      </motion.div>
    </div>
  );
};


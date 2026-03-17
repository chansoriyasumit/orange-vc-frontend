import React from "react";
import { motion } from "motion/react";

export const IconContainer = ({
  icon,
  text,
  delay,
  className,
}: {
  icon: React.ReactNode;
  text?: string;
  delay?: number;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: delay || 0,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative flex flex-col items-center gap-2.5 ${className}`}
    >
      <div className="group relative flex h-16 w-16 items-center p-1.5 justify-center rounded-2xl bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl border border-orange-200/60">
        {icon}
      </div>
      {text && (
        <div className="text-center mt-2 max-w-[90px]">
          <p className="text-xs font-semibold text-rich-black leading-tight">
            {text}
          </p>
        </div>
      )}
    </motion.div>
  );
};


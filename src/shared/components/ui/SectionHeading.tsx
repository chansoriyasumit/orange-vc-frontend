import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface SectionHeadingProps {
  icon: LucideIcon;
  iconLabel: string;
  title: ReactNode;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  icon: Icon,
  iconLabel,
  title,
  subtitle,
  centered = false,
  className = "",
}: SectionHeadingProps) {
  // Always left-aligned on mobile, respects centered prop on larger screens
  const alignmentClass = centered 
    ? "text-left md:text-center items-start mx-auto md:items-center" 
    : "text-left items-start";
  const badgeAlignment = centered ? "mr-auto md:mx-auto" : "mr-auto";

  return (
    <div className={`flex max-w-xl flex-col ${alignmentClass} ${className}`}>
      <div className={`flex mb-4 text-tomato max-w-min font-semibold items-center gap-2 text-orange-600 bg-orange-50 rounded-full px-3 py-1 ${badgeAlignment}`}>
        <Icon size={16} />
        <span className="whitespace-nowrap">{iconLabel}</span>
      </div>

      <h2 className="font-heading md:text-5xl text-4xl tracking-tighter font-bold text-rich-black mb-6">
        {title}
      </h2>

      {subtitle && (
        <p className="text-lg text-rich-black/70 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}


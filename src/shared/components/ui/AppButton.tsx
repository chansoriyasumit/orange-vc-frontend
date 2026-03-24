"use client";

import { forwardRef, ReactNode } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from '@/src/lib/utils/utils';

export type ButtonSize = "sm" | "md" | "lg";
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "text";

export interface AppButtonProps extends Omit<ButtonProps, "variant" | "size"> {
  /**
   * Button size variant
   * - sm: Small button (navbar, compact spaces)
   * - md: Medium button (default)
   * - lg: Large button (hero, CTA sections)
   */
  size?: ButtonSize;
  
  /**
   * Button visual variant
   * - primary: Filled tomato background (main CTAs)
   * - secondary: Filled white background
   * - outline: Bordered with transparent background
   * - ghost: Minimal styling, transparent background
   * - text: No background, just text
   */
  variant?: ButtonVariant;
  
  /**
   * Loading state - shows spinner and disables interaction
   */
  isLoading?: boolean;
  
  /**
   * Navigation href - when provided, button acts as a Next.js Link
   * Use this for navigation instead of wrapping in Link component
   * @example href="/services"
   */
  href?: string;
  
  /**
   * Button content
   */
  children: ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Make button full width
   */
  fullWidth?: boolean;
}

/**
 * AppButton - Unified button component for consistent styling across the app
 * Built on top of the base Button component for theme consistency
 * 
 * @example
 * ```tsx
 * // As a button
 * <AppButton size="lg" variant="primary" onClick={handleClick}>
 *   Get Started
 * </AppButton>
 * 
 * // As a link (navigation)
 * <AppButton size="lg" variant="primary" href="/services">
 *   View Services
 * </AppButton>
 * 
 * // With loading state
 * <AppButton variant="outline" isLoading>
 *   Submitting...
 * </AppButton>
 * ```
 */
export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    {
      size = "md",
      variant = "primary",
      isLoading = false,
      href,
      children,
      className,
      fullWidth = false,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    // Map our sizes to shadcn sizes
    const sizeMap: Record<ButtonSize, "sm" | "default" | "lg"> = {
      sm: "sm",
      md: "default",
      lg: "lg",
    };

    // Custom size overrides for consistent heights and padding
    const sizeStyles = {
      sm: "h-9 px-4 py-2 text-sm font-medium",
      md: "h-11 px-6 py-3 tracking-tight font-medium",
      lg: "h-14 px-8 py-4 tracking-tight font-medium",
    };

    // Variant styles extending base button
    const variantStyles = {
      primary: [
        "bg-tomato text-white border-2 border-tomato",
        "hover:bg-tomato-600 hover:border-tomato-600",
        "active:scale-95",
        "disabled:bg-tomato/50 disabled:border-tomato/50",
        "shadow-lg hover:shadow-xl",
      ].join(" "),
      secondary: [
        "bg-white text-tomato border-2 border-white",
        "hover:bg-white/90",
        "active:scale-95",
        "disabled:bg-white/50",
        "shadow-md hover:shadow-lg",
      ].join(" "),
      outline: [
        "bg-tomato/6 text-rich-black border-2",
        "hover:bg-rich-black hover:text-white hover:border-rich-black",
        "active:scale-95",
        "disabled:text-rich-black/40 disabled:border-rich-black/10 disabled:bg-transparent",
        "backdrop-blur-sm",
      ].join(" "),
      ghost: [
        "bg-transparent text-rich-black border-2 border-transparent",
        "hover:bg-rich-black/5",
        "active:bg-rich-black/10",
        "disabled:text-rich-black/40",
      ].join(" "),
      text: [
        "bg-transparent text-rich-black border-2 border-transparent",
        "hover:text-tomato",
        "active:text-tomato-600",
        "disabled:text-rich-black/40",
        "shadow-none",
      ].join(" "),
    };

    const buttonContent = (
      <>
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </>
    );

    const buttonClasses = cn(
      "font-semibold rounded-xl gap-2 transition-all duration-200",
      "inline-flex items-center justify-center whitespace-nowrap",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      sizeStyles[size],
      variantStyles[variant],
      fullWidth && "w-full",
      className
    );

    // If href is provided, render as Link with button styling
    if (href) {
      return (
        <Link href={href} className={buttonClasses}>
          {buttonContent}
        </Link>
      );
    }

    // Otherwise, render as button using base Button component
    return (
      <Button
        ref={ref}
        size={sizeMap[size]}
        disabled={disabled || isLoading}
        onClick={onClick}
        className={buttonClasses}
        {...props}
      >
        {buttonContent}
      </Button>
    );
  }
);

AppButton.displayName = "AppButton";


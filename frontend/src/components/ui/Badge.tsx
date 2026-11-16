import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'outline' | 'black';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  className,
}) => {
  const variantStyles = {
    success: 'bg-[#E8F8F1] text-[#059669] border-[#A7F3D0]',
    warning: 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]',
    error: 'bg-[#FEE2E2] text-[#DC2626] border-[#FECACA]',
    info: 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]',
    neutral: 'bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]',
    outline: 'bg-transparent text-[#374151] border-[#E5E7EB]',
    black: 'bg-[#111827] text-white border-transparent',
  };

  const dotColors = {
    success: 'bg-[#10B981]',
    warning: 'bg-[#F59E0B]',
    error: 'bg-[#EF4444]',
    info: 'bg-[#3B82F6]',
    neutral: 'bg-[#9CA3AF]',
    outline: 'bg-[#9CA3AF]',
    black: 'bg-white',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium rounded-full',
    md: 'text-xs px-2.5 py-1 font-medium rounded-full',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 border leading-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span
          className={clsx(
            'w-1.5 h-1.5 rounded-full flex-shrink-0',
            dotColors[variant]
          )}
        />
      )}
      {children}
    </span>
  );
};

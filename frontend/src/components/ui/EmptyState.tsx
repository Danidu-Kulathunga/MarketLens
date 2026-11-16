import React from 'react';
import { cn } from '@/utils/cn';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center rounded-xl border border-dashed border-gray-200 bg-gray-50/50',
        className
      )}
    >
      {icon && <div className="text-gray-400 mb-3 p-3 bg-white rounded-full shadow-sm border border-gray-100">{icon}</div>}
      <h4 className="text-base font-bold text-gray-800">{title}</h4>
      <p className="text-xs text-gray-500 max-w-sm mt-1 mb-4">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

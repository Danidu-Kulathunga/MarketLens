import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string | number;
  changePercent?: number;
  subtext?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changePercent,
  subtext,
  icon,
  trend,
  className,
  onClick,
}) => {
  const isUp = trend === 'up' || (changePercent !== undefined && changePercent > 0);
  const isDown = trend === 'down' || (changePercent !== undefined && changePercent < 0);

  return (
    <div
      onClick={onClick}
      className={cn(
        'p-5 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between transition-all hover:border-gray-300',
        onClick && 'cursor-pointer hover:shadow-md',
        className
      )}
    >
      <div className="flex items-center justify-between text-gray-500 mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{title}</span>
        {icon && <div className="text-gray-400 p-1.5 rounded-lg bg-gray-50">{icon}</div>}
      </div>

      <div className="flex items-baseline justify-between mt-1">
        <div className="text-2xl font-extrabold text-gray-900 tracking-tight">{value}</div>
        {(change !== undefined || changePercent !== undefined) && (
          <div
            className={cn(
              'inline-flex items-center text-xs font-bold px-2 py-0.5 rounded-full',
              isUp && 'bg-emerald-50 text-emerald-700',
              isDown && 'bg-rose-50 text-rose-700',
              !isUp && !isDown && 'bg-gray-100 text-gray-600'
            )}
          >
            {isUp && <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />}
            {isDown && <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
            {!isUp && !isDown && <Minus className="w-3.5 h-3.5 mr-0.5" />}
            {change !== undefined && <span>{change}</span>}
            {changePercent !== undefined && (
              <span>{changePercent > 0 ? `+${changePercent.toFixed(2)}%` : `${changePercent.toFixed(2)}%`}</span>
            )}
          </div>
        )}
      </div>

      {subtext && <div className="text-xs text-gray-400 mt-2">{subtext}</div>}
    </div>
  );
};

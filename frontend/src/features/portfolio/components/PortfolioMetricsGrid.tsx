import React from 'react';
import { DollarSign, TrendingUp, Calendar, Layers } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { formatCurrency, formatPercent } from '@/utils/formatters';
import { PortfolioSummary } from '@/types';

interface PortfolioMetricsGridProps {
  summary: PortfolioSummary;
}

export const PortfolioMetricsGrid: React.FC<PortfolioMetricsGridProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Portfolio Value"
        value={formatCurrency(summary.totalValue)}
        change={`${summary.dayChange >= 0 ? '+' : ''}${formatCurrency(summary.dayChange)}`}
        changePercent={summary.dayChangePercent}
        icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
        subtext="Live market valuation"
      />
      <StatCard
        title="Total Unrealized P&L"
        value={`${summary.totalReturn >= 0 ? '+' : ''}${formatCurrency(summary.totalReturn)}`}
        changePercent={summary.totalReturnPercent}
        icon={<TrendingUp className="w-5 h-5 text-indigo-600" />}
        subtext="All-time cumulative return"
      />
      <StatCard
        title="Available Cash Balance"
        value={formatCurrency(summary.cashBalance)}
        icon={<Calendar className="w-5 h-5 text-amber-600" />}
        subtext="Unallocated purchasing power"
      />
      <StatCard
        title="Active Holdings"
        value={`${summary.holdingsCount} Assets`}
        icon={<Layers className="w-5 h-5 text-blue-600" />}
        subtext="Diversified equity positions"
      />
    </div>
  );
};

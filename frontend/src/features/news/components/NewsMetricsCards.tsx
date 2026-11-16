import React from 'react';
import { TrendingUp, MessageSquare, Target, Zap } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';

export const NewsMetricsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Market Sentiment Index"
        value="Bullish (68%)"
        change="+4.2%"
        changePercent={4.2}
        icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
        subtext="Dominant tone across financial wire"
      />
      <StatCard
        title="24h Processed Volume"
        value="1,428 Stories"
        icon={<MessageSquare className="w-5 h-5 text-indigo-600" />}
        subtext="Aggregated across 24 tier-1 feeds"
      />
      <StatCard
        title="Entity Match Precision"
        value="99.4%"
        icon={<Target className="w-5 h-5 text-blue-600" />}
        subtext="Zero hallucinated ticker symbols"
      />
      <StatCard
        title="High-Impact Bulletins"
        value="18 Alerts"
        icon={<Zap className="w-5 h-5 text-amber-600" />}
        subtext="Significant macro & earnings drivers"
      />
    </div>
  );
};

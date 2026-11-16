import React from 'react';
import { MOCK_MARKET_SENTIMENT } from '@/data/mock/marketData';

export const DashboardSentimentCard: React.FC = () => {
  const s = MOCK_MARKET_SENTIMENT;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <h3 className="font-bold text-gray-900 text-sm">Market Sentiment Overview</h3>
        <span className="text-[11px] text-gray-400 font-medium">{s.sources}</span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-baseline">
          <span className="text-sm font-black text-gray-900">{s.label}</span>
          <span className="text-xs font-bold text-emerald-600">{s.status} ({s.percent}%)</span>
        </div>

        {/* Stacked Sentiment Bar */}
        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden flex">
          <div className="bg-emerald-500 h-full" style={{ width: `${s.positive}%` }} title={`Positive: ${s.positive}%`} />
          <div className="bg-gray-300 h-full" style={{ width: `${s.neutral}%` }} title={`Neutral: ${s.neutral}%`} />
          <div className="bg-rose-500 h-full" style={{ width: `${s.negative}%` }} title={`Negative: ${s.negative}%`} />
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 text-center text-xs">
          <div>
            <div className="text-[10px] text-gray-400 font-semibold">Positive</div>
            <div className="font-bold text-emerald-600">{s.positive}%</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-400 font-semibold">Neutral</div>
            <div className="font-bold text-gray-600">{s.neutral}%</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-400 font-semibold">Negative</div>
            <div className="font-bold text-rose-600">{s.negative}%</div>
          </div>
        </div>

        <div className="text-[10px] text-gray-400 text-center pt-1">
          Based on {s.articlesIndexed.toLocaleString()} analyzed wire stories
        </div>
      </div>
    </div>
  );
};

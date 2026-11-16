import React from 'react';
import { SECTOR_SENTIMENTS } from '@/data/mock/newsData';

export const SectorSentimentCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <h3 className="font-bold text-gray-900 text-sm">Sector Sentiment Telemetry</h3>
        <span className="text-[11px] text-gray-400 font-medium">NLP Distribution</span>
      </div>

      <div className="space-y-3">
        {SECTOR_SENTIMENTS.map((item) => (
          <div key={item.sector} className="space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-gray-700">{item.sector}</span>
              <span className={item.status === 'Bullish' ? 'text-emerald-600' : 'text-rose-600'}>
                {item.bullishPercent}% {item.status}
              </span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden flex">
              <div
                className={`h-full ${
                  item.status === 'Bullish' ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
                style={{ width: `${item.bullishPercent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

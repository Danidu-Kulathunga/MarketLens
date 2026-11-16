import React from 'react';
import { TRENDING_TICKERS } from '@/data/mock/newsData';

interface TrendingTickersCardProps {
  selectedTicker: string | null;
  onSelectTicker: (ticker: string | null) => void;
}

export const TrendingTickersCard: React.FC<TrendingTickersCardProps> = ({
  selectedTicker,
  onSelectTicker,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <h3 className="font-bold text-gray-900 text-sm">Trending News Tickers</h3>
        {selectedTicker && (
          <button
            onClick={() => onSelectTicker(null)}
            className="text-[11px] text-indigo-600 hover:underline font-semibold"
          >
            Clear Filter
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {TRENDING_TICKERS.map((t) => {
          const isSelected = selectedTicker === t.symbol;
          return (
            <button
              key={t.symbol}
              onClick={() => onSelectTicker(isSelected ? null : t.symbol)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-gray-50 border border-gray-200 text-gray-800 hover:bg-gray-100'
              }`}
            >
              <span>{t.symbol}</span>
              <span
                className={`text-[10px] ${
                  isSelected ? 'text-indigo-200' : 'text-gray-400'
                }`}
              >
                {t.volumeChange}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

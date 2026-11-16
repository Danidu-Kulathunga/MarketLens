import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { MOCK_INDICES } from '@/data/mock/marketData';

export const MarketIndicesGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {MOCK_INDICES.map((idx) => {
        const isUp = idx.change >= 0;
        return (
          <div
            key={idx.id}
            className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between hover:border-gray-300 transition-all"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-gray-500 font-semibold mb-1">
                <span>{idx.name}</span>
                <span className="font-mono text-[11px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">
                  {idx.symbol}
                </span>
              </div>
              <div className="text-2xl font-extrabold text-gray-900 tracking-tight">
                {idx.value.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100 text-xs">
              <span
                className={`inline-flex items-center font-bold ${
                  isUp ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {isUp ? (
                  <TrendingUp className="w-3.5 h-3.5 mr-1" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 mr-1" />
                )}
                {isUp ? '+' : ''}
                {idx.change.toFixed(2)} ({isUp ? '+' : ''}
                {idx.changePercent.toFixed(2)}%)
              </span>
              <span className="text-gray-400 text-[11px] font-medium">Prev: {idx.prevClose}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

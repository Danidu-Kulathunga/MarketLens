import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { TOP_MOVERS } from '@/data/mock/marketData';
import { formatCurrency, formatPercent } from '@/utils/formatters';

interface TopMoversCardProps {
  activeTab: 'gainers' | 'losers';
  onTabChange: (tab: 'gainers' | 'losers') => void;
}

export const TopMoversCard: React.FC<TopMoversCardProps> = ({
  activeTab,
  onTabChange,
}) => {
  const navigate = useNavigate();
  const items = activeTab === 'gainers' ? TOP_MOVERS.gainers : TOP_MOVERS.losers;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <h3 className="font-bold text-gray-900 text-sm">Market Movers (24h)</h3>
        <div className="flex items-center bg-gray-100 p-0.5 rounded-lg text-xs font-semibold">
          <button
            onClick={() => onTabChange('gainers')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeTab === 'gainers'
                ? 'bg-white text-emerald-700 shadow-sm font-bold'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Gainers
          </button>
          <button
            onClick={() => onTabChange('losers')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              activeTab === 'losers'
                ? 'bg-white text-rose-700 shadow-sm font-bold'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Losers
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {items.map((stock) => {
          const isUp = stock.changePercent >= 0;
          return (
            <div
              key={stock.symbol}
              onClick={() => navigate(`/markets/${stock.symbol}`)}
              className="py-2.5 flex items-center justify-between hover:bg-gray-50/80 cursor-pointer px-2 rounded-lg transition-colors text-xs"
            >
              <div>
                <div className="font-bold text-gray-900 font-mono">{stock.symbol}</div>
                <div className="text-gray-400 text-[11px] truncate max-w-[120px]">{stock.name}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900 font-mono">
                  {formatCurrency(stock.price)}
                </div>
                <div
                  className={`inline-flex items-center font-bold text-[11px] ${
                    isUp ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {isUp ? (
                    <TrendingUp className="w-3 h-3 mr-0.5" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-0.5" />
                  )}
                  {isUp ? '+' : ''}
                  {formatPercent(stock.changePercent)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

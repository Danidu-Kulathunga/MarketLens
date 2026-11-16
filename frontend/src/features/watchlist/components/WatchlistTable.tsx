import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { WatchlistItem } from '@/types';
import { formatCurrency, formatPercent } from '@/utils/formatters';

interface WatchlistTableProps {
  items: WatchlistItem[];
  onToggleWatchlist: (symbol: string) => void;
}

export const WatchlistTable: React.FC<WatchlistTableProps> = ({
  items,
  onToggleWatchlist,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50/80 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-100">
              <th className="py-3.5 px-6">Symbol</th>
              <th className="py-3.5 px-4">Company Name</th>
              <th className="py-3.5 px-4 text-right">Price</th>
              <th className="py-3.5 px-4 text-right">Change %</th>
              <th className="py-3.5 px-4">Momentum</th>
              <th className="py-3.5 px-4">Owned</th>
              <th className="py-3.5 px-4">Alert Trigger</th>
              <th className="py-3.5 px-4">Trend (7D)</th>
              <th className="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => {
              const isUp = item.changePercent >= 0;
              return (
                <tr
                  key={item.symbol}
                  className="hover:bg-gray-50/80 transition-colors cursor-pointer"
                  onClick={() => navigate(`/markets/${item.symbol}`)}
                >
                  <td className="py-3.5 px-6 font-mono font-bold text-gray-900">
                    {item.symbol}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-gray-800">{item.name}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-gray-900">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-semibold">
                    <span className={isUp ? 'text-emerald-600' : 'text-rose-600'}>
                      {isUp ? '+' : ''}
                      {formatPercent(item.changePercent)} {isUp ? '↑' : '↓'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        item.momentum === 'Positive'
                          ? 'bg-emerald-50 text-emerald-700'
                          : item.momentum === 'Negative'
                          ? 'bg-rose-50 text-rose-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {item.momentum}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {item.owned ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-black" />
                        Owned
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {item.alertStatus === 'Active' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Active {item.alertCondition ? `(${item.alertCondition})` : ''}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">No Alert</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="w-20 h-6">
                      <svg className="w-full h-full" viewBox="0 0 60 20">
                        <path
                          d={
                            isUp
                              ? 'M0,16 Q20,12 35,6 T60,2'
                              : 'M0,4 Q20,8 35,14 T60,18'
                          }
                          fill="none"
                          stroke={isUp ? '#10B981' : '#EF4444'}
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                  </td>
                  <td className="py-3.5 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onToggleWatchlist(item.symbol)}
                      className="p-1 rounded text-gray-400 hover:text-rose-600 hover:bg-gray-100"
                      title="Remove from Watchlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

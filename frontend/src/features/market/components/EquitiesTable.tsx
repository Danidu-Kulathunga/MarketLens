import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, ArrowUpRight, Star } from 'lucide-react';
import { StockSummary } from '@/types';
import { formatCurrency, formatPercent } from '@/utils/formatters';

interface EquitiesTableProps {
  stocks: StockSummary[];
  watchlist: { symbol: string }[];
  onToggleWatchlist: (symbol: string) => void;
}

export const EquitiesTable: React.FC<EquitiesTableProps> = ({
  stocks,
  watchlist,
  onToggleWatchlist,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">Tracked Market Equities</h3>
        <span className="text-xs text-gray-400">{stocks.length} instruments</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50">
              <th className="py-3 px-6">Ticker</th>
              <th className="py-3 px-4">Company Name</th>
              <th className="py-3 px-4">Sector</th>
              <th className="py-3 px-4 text-right">Price</th>
              <th className="py-3 px-4 text-right">Day Change</th>
              <th className="py-3 px-4 text-right">Market Cap</th>
              <th className="py-3 px-4 text-right">Volume</th>
              <th className="py-3 px-4 text-center">Momentum</th>
              <th className="py-3 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {stocks.map((s) => {
              const inWatch = watchlist.some((w) => w.symbol === s.symbol);
              const isUp = s.changePercent >= 0;

              return (
                <tr
                  key={s.symbol}
                  className="hover:bg-gray-50/80 transition-colors cursor-pointer"
                  onClick={() => navigate(`/markets/${s.symbol}`)}
                >
                  <td className="py-3.5 px-6 font-mono font-bold text-gray-900">{s.symbol}</td>
                  <td className="py-3.5 px-4 text-gray-800">{s.name}</td>
                  <td className="py-3.5 px-4 text-gray-500">{s.sector}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-900 text-right">
                    {formatCurrency(s.price)}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-right">
                    <span
                      className={`inline-flex items-center ${
                        isUp ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {isUp ? (
                        <TrendingUp className="w-3.5 h-3.5 mr-0.5 inline" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5 mr-0.5 inline" />
                      )}
                      {isUp ? '+' : ''}
                      {formatPercent(s.changePercent)}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 font-mono text-right">{s.marketCap}</td>
                  <td className="py-3.5 px-4 text-gray-600 font-mono text-right">{s.volume}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700">
                      {s.momentumScore}/100
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onToggleWatchlist(s.symbol)}
                        className={`p-1.5 rounded-lg border text-xs font-semibold ${
                          inWatch
                            ? 'bg-amber-50 text-amber-600 border-amber-200'
                            : 'hover:bg-gray-100 border-gray-200 text-gray-500'
                        }`}
                        title={inWatch ? 'Remove from Watchlist' : 'Add to Watchlist'}
                      >
                        <Star className={`w-3.5 h-3.5 ${inWatch ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => navigate(`/markets/${s.symbol}`)}
                        className="px-2.5 py-1 rounded-lg bg-gray-900 text-white text-xs font-medium hover:bg-black flex items-center gap-1"
                      >
                        <span>Analyze</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
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

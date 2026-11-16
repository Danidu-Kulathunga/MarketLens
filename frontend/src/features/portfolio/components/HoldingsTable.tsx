import React from 'react';
import { Edit2, Trash2, ArrowUpRight } from 'lucide-react';
import { Holding } from '@/types';
import { formatCurrency, formatPercent } from '@/utils/formatters';

interface HoldingsTableProps {
  holdings: Holding[];
  onOpenEdit: (id: string, shares: number, cost: number) => void;
  onRemoveHolding: (id: string) => void;
  onNavigateStock: (symbol: string) => void;
}

export const HoldingsTable: React.FC<HoldingsTableProps> = ({
  holdings,
  onOpenEdit,
  onRemoveHolding,
  onNavigateStock,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-gray-900 text-base">Current Portfolio Positions</h3>
          <p className="text-xs text-gray-500">Real-time cost basis, current price, and unrealized gain/loss</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50/80 text-gray-500 border-b border-gray-200 font-semibold uppercase tracking-wider">
              <th className="py-3 px-4">Asset</th>
              <th className="py-3 px-4 text-right">Shares</th>
              <th className="py-3 px-4 text-right">Avg Cost</th>
              <th className="py-3 px-4 text-right">Current Price</th>
              <th className="py-3 px-4 text-right">Market Value</th>
              <th className="py-3 px-4 text-right">Unrealized P&L</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {holdings.map((h) => {
              const isProfit = h.totalGain >= 0;
              return (
                <tr key={h.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div
                      onClick={() => onNavigateStock(h.symbol)}
                      className="cursor-pointer group flex items-center gap-1.5"
                    >
                      <span className="font-extrabold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {h.symbol}
                      </span>
                      <span className="text-gray-400 font-normal">| {h.companyName}</span>
                      <ArrowUpRight className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-semibold text-gray-700">
                    {h.shares}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-gray-600">
                    {formatCurrency(h.avgCost)}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-gray-900">
                    {formatCurrency(h.currentPrice)}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-gray-900">
                    {formatCurrency(h.marketValue)}
                  </td>
                  <td className="py-3 px-4 text-right font-mono">
                    <span
                      className={`inline-block font-bold ${
                        isProfit ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {isProfit ? '+' : ''}
                      {formatCurrency(h.totalGain)} ({formatPercent(h.totalGainPercent)})
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onOpenEdit(h.id, h.shares, h.avgCost)}
                        className="text-gray-400 hover:text-indigo-600 transition-colors p-1 rounded hover:bg-gray-100"
                        title="Edit Position"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onRemoveHolding(h.id)}
                        className="text-gray-400 hover:text-rose-600 transition-colors p-1 rounded hover:bg-gray-100"
                        title="Delete Position"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
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

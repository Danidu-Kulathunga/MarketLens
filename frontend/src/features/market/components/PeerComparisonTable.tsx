import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency, formatPercent } from '@/utils/formatters';

export interface PeerBenchmarkItem {
  asset: string;
  company: string;
  lastPrice: number;
  dayChange: number;
  marketCap: string;
  peTtm: number;
}

interface PeerComparisonTableProps {
  peers: PeerBenchmarkItem[];
}

export const PeerComparisonTable: React.FC<PeerComparisonTableProps> = ({ peers }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-sm">Peer Valuation & Multiple Benchmarks</h3>
          <p className="text-xs text-gray-500">Comparable companies in the same sector & market tier</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-100">
              <th className="py-2.5 px-4">Company</th>
              <th className="py-2.5 px-4 text-right">Price</th>
              <th className="py-2.5 px-4 text-right">Daily Change %</th>
              <th className="py-2.5 px-4 text-right">P/E Ratio (TTM)</th>
              <th className="py-2.5 px-4 text-right">Market Cap</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {peers.map((peer) => {
              const isUp = peer.dayChange >= 0;
              return (
                <tr
                  key={peer.asset}
                  onClick={() => navigate(`/markets/${peer.asset}`)}
                  className="hover:bg-gray-50/70 cursor-pointer transition-colors"
                >
                  <td className="py-2.5 px-4">
                    <span className="font-extrabold text-gray-900 mr-2">{peer.asset}</span>
                    <span className="text-gray-400 font-normal">{peer.company}</span>
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-gray-800">
                    {formatCurrency(peer.lastPrice)}
                  </td>
                  <td
                    className={`py-2.5 px-4 text-right font-mono font-bold ${
                      isUp ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {isUp ? '+' : ''}
                    {formatPercent(peer.dayChange)}
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono text-gray-700">
                    {peer.peTtm ? peer.peTtm.toFixed(1) : 'N/A'}
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono text-gray-700">
                    {peer.marketCap}
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

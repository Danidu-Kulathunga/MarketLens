import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { formatCurrency } from '@/utils/formatters';

interface PricePoint {
  time: string;
  price: number;
  volume: number;
  sma50?: number;
  sma200?: number;
}

interface StockPriceChartProps {
  data: PricePoint[];
  timeRange: '1D' | '5D' | '1M' | '3M' | '6M' | '1Y' | 'ALL';
  onTimeRangeChange: (tr: '1D' | '5D' | '1M' | '3M' | '6M' | '1Y' | 'ALL') => void;
}

export const StockPriceChart: React.FC<StockPriceChartProps> = ({
  data,
  timeRange,
  onTimeRangeChange,
}) => {
  const timeRanges: ('1D' | '5D' | '1M' | '3M' | '6M' | '1Y' | 'ALL')[] = [
    '1D',
    '5D',
    '1M',
    '3M',
    '6M',
    '1Y',
    'ALL',
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
      {/* Chart Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-emerald-600 rounded"></span>
            <span className="text-xs font-semibold text-gray-700">Price (Close)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-indigo-500 rounded"></span>
            <span className="text-xs font-semibold text-gray-700">SMA 50</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-amber-500 rounded"></span>
            <span className="text-xs font-semibold text-gray-700">SMA 200</span>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          {timeRanges.map((tr) => (
            <button
              key={tr}
              onClick={() => onTimeRangeChange(tr)}
              className={`px-2 py-0.5 text-xs font-bold rounded-md transition-all ${
                timeRange === tr
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {tr}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="time" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis
              yAxisId="price"
              stroke="#9ca3af"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              domain={['auto', 'auto']}
              tickFormatter={(v) => `$${v.toFixed(0)}`}
            />
            <YAxis
              yAxisId="vol"
              orientation="right"
              stroke="#d1d5db"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              domain={[0, (dataMax: number) => dataMax * 4]}
              tickFormatter={(v) => `${(v / 1e6).toFixed(0)}M`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const p = payload[0].payload;
                  return (
                    <div className="bg-gray-900 text-white p-3 rounded-lg shadow-xl text-xs space-y-1">
                      <div className="text-gray-400 font-mono">{p.time}</div>
                      <div className="font-bold text-sm text-emerald-400">
                        Price: {formatCurrency(p.price)}
                      </div>
                      {p.sma50 && (
                        <div className="text-indigo-300">SMA 50: {formatCurrency(p.sma50)}</div>
                      )}
                      {p.sma200 && (
                        <div className="text-amber-300">SMA 200: {formatCurrency(p.sma200)}</div>
                      )}
                      <div className="text-gray-400">
                        Volume: {(p.volume / 1e6).toFixed(2)}M
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar yAxisId="vol" dataKey="volume" fill="#e5e7eb" radius={[2, 2, 0, 0]} />
            <Line
              yAxisId="price"
              type="monotone"
              dataKey="price"
              stroke="#059669"
              strokeWidth={2.5}
              dot={false}
            />
            <Line
              yAxisId="price"
              type="monotone"
              dataKey="sma50"
              stroke="#6366f1"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
            />
            <Line
              yAxisId="price"
              type="monotone"
              dataKey="sma200"
              stroke="#f59e0b"
              strokeWidth={1.5}
              strokeDasharray="2 2"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

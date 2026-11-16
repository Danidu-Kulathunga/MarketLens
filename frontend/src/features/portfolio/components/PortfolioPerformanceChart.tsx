import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { formatCurrency } from '@/utils/formatters';

interface PortfolioPerformanceChartProps {
  timeframe: '1M' | '3M' | '6M' | '1Y' | 'ALL';
  onTimeframeChange: (tf: '1M' | '3M' | '6M' | '1Y' | 'ALL') => void;
  chartData: { date: string; value: number }[];
}

export const PortfolioPerformanceChart: React.FC<PortfolioPerformanceChartProps> = ({
  timeframe,
  onTimeframeChange,
  chartData,
}) => {
  const timeframes: ('1M' | '3M' | '6M' | '1Y' | 'ALL')[] = ['1M', '3M', '6M', '1Y', 'ALL'];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-gray-100 gap-3">
        <div>
          <h3 className="font-bold text-gray-900 text-base">Portfolio Value Trajectory</h3>
          <p className="text-xs text-gray-500">Intraday and historical equity valuation curve</p>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeframeChange(tf)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                timeframe === tf
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis
              dataKey="date"
              stroke="#9ca3af"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#9ca3af"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              domain={['auto', 'auto']}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-gray-900 text-white p-2.5 rounded-lg shadow-xl text-xs">
                      <div className="text-gray-400 font-mono mb-1">{payload[0].payload.date}</div>
                      <div className="font-bold text-sm text-emerald-400">
                        {formatCurrency(payload[0].value as number)}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#059669"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: '#059669', stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

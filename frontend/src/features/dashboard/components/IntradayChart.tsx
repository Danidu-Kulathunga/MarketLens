import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

interface PricePoint {
  time: string;
  price: number;
  volume?: number;
}

interface IntradayChartProps {
  timeframe: '1D' | '1W' | '1M' | '3M' | '1Y';
  onTimeframeChange: (tf: '1D' | '1W' | '1M' | '3M' | '1Y') => void;
  chartData: PricePoint[];
  selectedBenchmark: string;
}

export const IntradayChart: React.FC<IntradayChartProps> = ({
  timeframe,
  onTimeframeChange,
  chartData,
  selectedBenchmark,
}) => {
  const timeframes: ('1D' | '1W' | '1M' | '3M' | '1Y')[] = ['1D', '1W', '1M', '3M', '1Y'];

  return (
    <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-gray-100">
        <div>
          <h3 className="font-bold text-gray-900 text-sm">{selectedBenchmark} Intraday Action</h3>
          <p className="text-xs text-gray-400">Continuous volume-weighted execution trajectory</p>
        </div>

        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeframeChange(tf)}
              className={`px-2.5 py-0.5 text-xs font-bold rounded-md transition-all ${
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

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <XAxis dataKey="time" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#9ca3af"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              domain={['auto', 'auto']}
              tickFormatter={(v) => v.toFixed(0)}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-gray-900 text-white p-2 rounded-lg shadow-xl text-xs">
                      <div className="text-gray-400 font-mono">{payload[0].payload.time}</div>
                      <div className="font-bold text-sm text-emerald-400">
                        {payload[0].value?.toLocaleString()}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#059669"
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

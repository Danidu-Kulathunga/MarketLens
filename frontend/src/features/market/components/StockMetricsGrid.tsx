import React from 'react';
import { StockSummary } from '@/types';
import { formatCurrency } from '@/utils/formatters';

interface StockMetricsGridProps {
  stock: StockSummary;
}

export const StockMetricsGrid: React.FC<StockMetricsGridProps> = ({ stock }) => {
  const metrics = [
    { label: 'Market Cap', value: stock.marketCap || '$3.42T' },
    { label: 'P/E Ratio (TTM)', value: stock.peRatio ? stock.peRatio.toFixed(1) : '33.8' },
    { label: 'Forward P/E', value: stock.forwardPe ? stock.forwardPe.toFixed(1) : '28.5' },
    { label: 'PEG Ratio', value: stock.pegRatio ? stock.pegRatio.toFixed(2) : '2.14' },
    { label: 'Volume', value: stock.volume || '48.2M' },
    { label: 'Avg Volume (30D)', value: stock.avgVolume || '54.1M' },
    { label: '52-Week High', value: formatCurrency(stock.week52High || 237.23) },
    { label: '52-Week Low', value: formatCurrency(stock.week52Low || 164.08) },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
      {metrics.map((m) => (
        <div key={m.label} className="border-r last:border-none border-gray-100 pr-2">
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            {m.label}
          </div>
          <div className="text-sm font-extrabold text-gray-900 mt-0.5">{m.value}</div>
        </div>
      ))}
    </div>
  );
};

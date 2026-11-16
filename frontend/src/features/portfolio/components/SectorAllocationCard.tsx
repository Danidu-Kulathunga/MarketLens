import React from 'react';
import { PieChart as PieIcon } from 'lucide-react';

interface SectorAllocationItem {
  sector: string;
  percentage: number;
  value: number;
}

interface SectorAllocationCardProps {
  sectors: SectorAllocationItem[];
}

export const SectorAllocationCard: React.FC<SectorAllocationCardProps> = ({ sectors }) => {
  const colors = ['bg-indigo-600', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500'];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <PieIcon className="w-4 h-4 text-gray-500" />
          <h3 className="font-bold text-gray-900 text-sm">Sector Allocation</h3>
        </div>
        <span className="text-xs text-gray-400 font-medium">By Exposure %</span>
      </div>

      <div className="space-y-3 mt-4">
        {sectors.map((item, idx) => (
          <div key={item.sector} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-gray-700">{item.sector}</span>
              <span className="font-bold text-gray-900">{item.percentage}%</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${colors[idx % colors.length]}`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

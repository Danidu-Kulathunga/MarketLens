import React from 'react';
import { Target } from 'lucide-react';

interface TelemetryItem {
  metric: string;
  observedValue: string;
}

interface EvidenceMatrixTableProps {
  telemetry: TelemetryItem[];
}

export const EvidenceMatrixTable: React.FC<EvidenceMatrixTableProps> = ({ telemetry }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-indigo-600" />
          <h3 className="font-bold text-gray-900 text-sm">Grounded Evidence Telemetry Matrix</h3>
        </div>
        <span className="text-[11px] text-gray-400 font-medium">Verifiable Data Citations</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-100">
              <th className="py-2.5 px-4">Observed Telemetry Metric</th>
              <th className="py-2.5 px-4">Empirical Observation & Condition</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {telemetry.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                <td className="py-2.5 px-4 font-bold text-gray-900 font-mono w-1/3">
                  {item.metric}
                </td>
                <td className="py-2.5 px-4 text-gray-700">{item.observedValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

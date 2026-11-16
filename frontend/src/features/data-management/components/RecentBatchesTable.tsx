import React from 'react';
import { ImportBatch } from '@/types';

interface RecentBatchesTableProps {
  batches: ImportBatch[];
}

export const RecentBatchesTable: React.FC<RecentBatchesTableProps> = ({ batches }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-sm">Recent Ingestion Batches</h3>
          <p className="text-xs text-gray-400">Ingested CSV, JSON and API scheduler runs</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-100">
              <th className="py-2.5 px-4">Batch ID</th>
              <th className="py-2.5 px-4">Source Channel</th>
              <th className="py-2.5 px-4">Started At</th>
              <th className="py-2.5 px-4 text-right">Total Records</th>
              <th className="py-2.5 px-4 text-right">Valid Records</th>
              <th className="py-2.5 px-4 text-right">Failed</th>
              <th className="py-2.5 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {batches.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50/70">
                <td className="py-2.5 px-4 font-mono font-bold text-gray-900">{b.id}</td>
                <td className="py-2.5 px-4 text-gray-700">{b.source}</td>
                <td className="py-2.5 px-4 text-gray-500 font-mono">{b.started}</td>
                <td className="py-2.5 px-4 text-right font-mono font-bold text-gray-900">
                  {b.totalRecords.toLocaleString()}
                </td>
                <td className="py-2.5 px-4 text-right font-mono text-emerald-600 font-bold">
                  {b.validRecords.toLocaleString()}
                </td>
                <td className="py-2.5 px-4 text-right font-mono text-rose-600 font-bold">
                  {b.failedRecords}
                </td>
                <td className="py-2.5 px-4 text-center">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      b.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700'
                        : b.status === 'Warning'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

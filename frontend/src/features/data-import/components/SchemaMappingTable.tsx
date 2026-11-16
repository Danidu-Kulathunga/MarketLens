import React from 'react';
import { MOCK_IMPORT_PREVIEW_RECORDS } from '@/data/mock/dataManagerData';

export const SchemaMappingTable: React.FC = () => {
  const columns = [
    { source: 'timestamp', target: 'time (Hypertable partition key)', type: 'TIMESTAMPTZ' },
    { source: 'ticker', target: 'symbol', type: 'VARCHAR(20)' },
    { source: 'open_price', target: 'open', type: 'NUMERIC(15,4)' },
    { source: 'high_price', target: 'high', type: 'NUMERIC(15,4)' },
    { source: 'low_price', target: 'low', type: 'NUMERIC(15,4)' },
    { source: 'close_price', target: 'close', type: 'NUMERIC(15,4)' },
    { source: 'volume', target: 'volume', type: 'BIGINT' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-sm">Step 2: Canonical Schema Alignment</h3>
          <p className="text-xs text-gray-400">Map uploaded headers to MarketLens canonical hypertable columns</p>
        </div>
        <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          Auto-Mapped 100%
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-100">
              <th className="py-2.5 px-4">CSV Header</th>
              <th className="py-2.5 px-4">Canonical Database Column</th>
              <th className="py-2.5 px-4">Data Type</th>
              <th className="py-2.5 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {columns.map((col) => (
              <tr key={col.source} className="hover:bg-gray-50/70">
                <td className="py-2.5 px-4 font-mono font-bold text-gray-800">{col.source}</td>
                <td className="py-2.5 px-4 font-mono text-indigo-600 font-semibold">{col.target}</td>
                <td className="py-2.5 px-4 text-gray-500">{col.type}</td>
                <td className="py-2.5 px-4 text-center">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                    Validated
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sample Ingested Rows Preview */}
      <div className="p-4 bg-gray-50/50 border-t border-gray-100">
        <div className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-2">
          Preview of First 4 Ingested Records
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs bg-white rounded-lg border border-gray-200">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-[10px] uppercase font-semibold border-b border-gray-200">
                <th className="p-2">Date</th>
                <th className="p-2">Ticker</th>
                <th className="p-2 text-right">Open</th>
                <th className="p-2 text-right">High</th>
                <th className="p-2 text-right">Low</th>
                <th className="p-2 text-right">Close</th>
                <th className="p-2 text-right">Volume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono text-[11px]">
              {MOCK_IMPORT_PREVIEW_RECORDS.slice(0, 4).map((r, i) => (
                <tr key={i}>
                  <td className="p-2">{r.timestamp}</td>
                  <td className="p-2 font-bold">{r.ticker}</td>
                  <td className="p-2 text-right">{r.open_price}</td>
                  <td className="p-2 text-right">{r.high_price}</td>
                  <td className="p-2 text-right">{r.low_price}</td>
                  <td className="p-2 text-right font-bold">{r.close_price}</td>
                  <td className="p-2 text-right">{r.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

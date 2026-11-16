import React from 'react';
import { Database, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { DataSourceItem } from '@/types';

interface DataSourceHealthCardsProps {
  sources: DataSourceItem[];
  onRetrySource: () => void;
}

export const DataSourceHealthCards: React.FC<DataSourceHealthCardsProps> = ({
  sources,
  onRetrySource,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div>
          <h3 className="font-bold text-gray-900 text-sm">Data Ingestion Providers & APIs</h3>
          <p className="text-xs text-gray-400">External exchange feeds and batch upload collectors</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sources.map((s) => (
          <div
            key={s.id}
            className={`p-4 rounded-xl border ${
              s.hasAlert
                ? 'bg-amber-50/50 border-amber-200 text-amber-900'
                : 'bg-white border-gray-200 text-gray-900'
            } shadow-xs space-y-3`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-indigo-600" />
                <span className="font-bold text-sm text-gray-900">{s.source}</span>
                <span className="text-[10px] font-mono font-bold bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">
                  {s.type}
                </span>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  s.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-700'
                    : s.status === 'Degraded'
                    ? 'bg-rose-50 text-rose-700'
                    : 'bg-blue-50 text-blue-700'
                }`}
              >
                {s.status}
              </span>
            </div>

            <div className="flex justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
              <span>Synced Today: <strong className="text-gray-900">{s.records}</strong></span>
              <span>Updated: {s.lastUpdated}</span>
            </div>

            {s.hasAlert && (
              <div className="p-2.5 rounded-lg bg-amber-100/70 text-amber-900 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span>{s.alertTitle || 'API Rate Limit Threshold Reached'}</span>
                </div>
                <button
                  onClick={onRetrySource}
                  className="font-bold underline text-amber-950 hover:text-black ml-2"
                >
                  Retry Sync
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

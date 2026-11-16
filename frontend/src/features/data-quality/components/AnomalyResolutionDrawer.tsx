import React from 'react';
import { Check, X, ShieldAlert, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DataQualityIssue } from '@/types';

interface AnomalyResolutionDrawerProps {
  issue: DataQualityIssue | null;
  correctedValue: string;
  setCorrectedValue: (val: string) => void;
  onResolve: () => void;
  onQuarantine: () => void;
  onRemove: () => void;
}

export const AnomalyResolutionDrawer: React.FC<AnomalyResolutionDrawerProps> = ({
  issue,
  correctedValue,
  setCorrectedValue,
  onResolve,
  onQuarantine,
  onRemove,
}) => {
  if (!issue) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400 text-xs shadow-sm">
        Select an anomaly record from the queue to inspect raw payload and resolve.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div>
          <span className="font-mono text-xs font-bold text-indigo-600">{issue.id}</span>
          <h3 className="font-bold text-gray-900 text-sm mt-0.5">Triage & Resolution Drawer</h3>
        </div>
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
            issue.status === 'Open'
              ? 'bg-rose-100 text-rose-800'
              : issue.status === 'Quarantined'
              ? 'bg-amber-100 text-amber-800'
              : 'bg-emerald-100 text-emerald-800'
          }`}
        >
          {issue.status}
        </span>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <span className="text-gray-400 uppercase tracking-wider text-[10px] font-semibold">
            Issue Diagnosis
          </span>
          <p className="font-semibold text-gray-800 mt-0.5">{issue.problem}</p>
        </div>

        <div>
          <span className="text-gray-400 uppercase tracking-wider text-[10px] font-semibold">
            Raw Ingested Record
          </span>
          <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-[11px] overflow-x-auto mt-1">
            {JSON.stringify(issue.rawRecord, null, 2)}
          </pre>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Corrected Field Value ({issue.field})
          </label>
          <input
            type="text"
            value={correctedValue}
            onChange={(e) => setCorrectedValue(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder={issue.fixSuggestion || 'Enter corrected value'}
          />
          {issue.fixSuggestion && (
            <p className="text-[11px] text-gray-400 mt-1">
              Suggested Fix: <span className="font-mono font-bold">{issue.fixSuggestion}</span>
            </p>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
        <Button onClick={onResolve} variant="primary" size="sm" className="w-full justify-center">
          <Check className="w-3.5 h-3.5 mr-1.5" />
          Apply Correction & Cleanse
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={onQuarantine} variant="outline" size="sm" className="justify-center">
            <ShieldAlert className="w-3.5 h-3.5 mr-1" />
            Quarantine
          </Button>
          <Button
            onClick={onRemove}
            variant="outline"
            size="sm"
            className="justify-center text-rose-600 hover:bg-rose-50"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1" />
            Discard
          </Button>
        </div>
      </div>
    </div>
  );
};

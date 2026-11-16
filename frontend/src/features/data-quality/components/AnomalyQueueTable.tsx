import React from 'react';
import { DataQualityIssue } from '@/types';

interface AnomalyQueueTableProps {
  issues: DataQualityIssue[];
  selectedIssueId?: string;
  onSelectIssue: (issue: DataQualityIssue) => void;
}

export const AnomalyQueueTable: React.FC<AnomalyQueueTableProps> = ({
  issues,
  selectedIssueId,
  onSelectIssue,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-100">
              <th className="py-3 px-4">Issue ID</th>
              <th className="py-3 px-4">Symbol</th>
              <th className="py-3 px-4">Problem Diagnosis</th>
              <th className="py-3 px-4">Target Table</th>
              <th className="py-3 px-4 text-center">Severity</th>
              <th className="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {issues.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-400">
                  Zero anomalies found matching selected criteria.
                </td>
              </tr>
            ) : (
              issues.map((issue) => {
                const isSelected = selectedIssueId === issue.id;
                return (
                  <tr
                    key={issue.id}
                    onClick={() => onSelectIssue(issue)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-indigo-50/70 border-l-4 border-indigo-600' : 'hover:bg-gray-50/80'
                    }`}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-gray-900">{issue.id}</td>
                    <td className="py-3 px-4">
                      <span className="font-extrabold text-gray-900 mr-1.5">{issue.symbol}</span>
                      <span className="text-gray-400 font-normal truncate">{issue.companyName}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-700 max-w-xs truncate">{issue.problem}</td>
                    <td className="py-3 px-4 font-mono text-gray-500">{issue.targetTable}</td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          issue.severity === 'High'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : issue.severity === 'Medium'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {issue.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          issue.status === 'Open'
                            ? 'bg-rose-100 text-rose-800'
                            : issue.status === 'Quarantined'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {issue.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

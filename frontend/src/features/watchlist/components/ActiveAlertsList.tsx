import React from 'react';
import { Bell, Power, Trash2 } from 'lucide-react';
import { AlertItem } from '@/types';

interface ActiveAlertsListProps {
  alerts: AlertItem[];
  onToggleStatus: (id: string) => void;
  onDeleteAlert: (id: string) => void;
}

export const ActiveAlertsList: React.FC<ActiveAlertsListProps> = ({
  alerts,
  onToggleStatus,
  onDeleteAlert,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-indigo-600" />
          <h3 className="font-bold text-gray-900 text-sm">Configured Price Triggers</h3>
        </div>
        <span className="text-xs text-gray-400 font-medium">{alerts.length} Rules Active</span>
      </div>

      <div className="divide-y divide-gray-100">
        {alerts.map((alert) => (
          <div key={alert.id} className="py-3 flex items-center justify-between gap-4 text-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-gray-900 font-mono">{alert.symbol}</span>
                <span className="text-gray-400 font-normal">| {alert.companyName}</span>
                <span
                  className={`px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                    alert.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {alert.status}
                </span>
              </div>
              <p className="text-gray-600 mt-0.5">{alert.condition}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleStatus(alert.id)}
                className={`p-1.5 rounded-lg transition-colors ${
                  alert.status === 'Active'
                    ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100'
                    : 'text-gray-400 bg-gray-50 hover:bg-gray-100'
                }`}
                title={alert.status === 'Active' ? 'Disable Alert' : 'Enable Alert'}
              >
                <Power className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDeleteAlert(alert.id)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-gray-100 transition-colors"
                title="Delete Alert Rule"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

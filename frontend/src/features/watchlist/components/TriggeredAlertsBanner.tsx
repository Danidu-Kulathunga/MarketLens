import React from 'react';
import { Bell, CheckCircle2 } from 'lucide-react';
import { TriggeredAlert } from '@/types';

interface TriggeredAlertsBannerProps {
  alerts: TriggeredAlert[];
  onDismiss: (id: string) => void;
}

export const TriggeredAlertsBanner: React.FC<TriggeredAlertsBannerProps> = ({
  alerts,
  onDismiss,
}) => {
  if (alerts.length === 0) return null;

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-700">
              <Bell className="w-4 h-4 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm">{alert.title}</span>
                <span className="text-[11px] font-mono bg-amber-200/70 px-1.5 py-0.5 rounded text-amber-800">
                  {alert.symbol}
                </span>
                <span className="text-xs text-amber-700/80">{alert.time}</span>
              </div>
              <p className="text-xs text-amber-800 mt-0.5">{alert.description}</p>
            </div>
          </div>

          <button
            onClick={() => onDismiss(alert.id)}
            className="flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950 px-2.5 py-1 rounded-md hover:bg-amber-100 transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Dismiss
          </button>
        </div>
      ))}
    </div>
  );
};

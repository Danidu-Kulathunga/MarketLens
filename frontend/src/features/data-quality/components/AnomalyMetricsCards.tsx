import React from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle2, Clock } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';

interface AnomalyMetricsCardsProps {
  totalOpen: number;
  totalQuarantined: number;
  totalResolved: number;
}

export const AnomalyMetricsCards: React.FC<AnomalyMetricsCardsProps> = ({
  totalOpen,
  totalQuarantined,
  totalResolved,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Active Open Anomalies"
        value={`${totalOpen} Records`}
        change="Z-Score Spikes"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
        subtext="Requires analyst or manager triage"
      />
      <StatCard
        title="Quarantined Records"
        value={`${totalQuarantined} Records`}
        icon={<ShieldAlert className="w-5 h-5 text-amber-600" />}
        subtext="Isolated from canonical downstream feed"
      />
      <StatCard
        title="Resolved Today"
        value={`${totalResolved} Records`}
        icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
        subtext="Corrected via formula or manual fix"
      />
      <StatCard
        title="Data Freshness SLA"
        value="99.98%"
        icon={<Clock className="w-5 h-5 text-blue-600" />}
        subtext="Pipeline latency < 250ms"
      />
    </div>
  );
};

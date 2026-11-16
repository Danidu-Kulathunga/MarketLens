import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotateCw, Upload, Database, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';
import { INITIAL_DATA_SOURCES } from '@/data/mock/dataManagerData';
import { useMarketData } from '@/context/MarketDataContext';
import { StatCard } from '@/components/ui/StatCard';
import { Button } from '@/components/ui/Button';

// Modular Feature Components
import { DataSourceHealthCards } from './components/DataSourceHealthCards';
import { PipelineProcessingTasks } from './components/PipelineProcessingTasks';
import { RecentBatchesTable } from './components/RecentBatchesTable';

export const DataManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const { importBatches, dataQualityIssues } = useMarketData();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sources, setSources] = useState(INITIAL_DATA_SOURCES);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleRetryTwelveData = () => {
    setSources((prev) =>
      prev.map((s) => (s.source === 'Twelve Data' ? { ...s, hasAlert: false } : s))
    );
  };

  const openIssuesCount = dataQualityIssues.filter((i) => i.status === 'Open').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Data Management Operations
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Monitor financial data sources, batch ingestion pipelines, and background processing activity
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={handleRefresh} disabled={isRefreshing} variant="outline" size="sm">
            <RotateCw className={`w-3.5 h-3.5 mr-1.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh Telemetry
          </Button>

          <Button onClick={() => navigate('/data-import')} variant="primary" size="sm">
            <Upload className="w-3.5 h-3.5 mr-1.5" />
            Upload Dataset
          </Button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Imports Today"
          value="128,450 Records"
          icon={<Database className="w-5 h-5 text-indigo-600" />}
          subtext="Across 4 active batch jobs"
        />
        <StatCard
          title="Pipeline Health"
          value="Operational"
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          subtext="Workers throughput optimal"
        />
        <StatCard
          title="Active Ingestion Feeds"
          value="4 Data Sources"
          icon={<Database className="w-5 h-5 text-blue-600" />}
          subtext="Twelve Data, CSE, SEC, CSV"
        />
        <StatCard
          title="Quality Issues"
          value={`${openIssuesCount} Flagged`}
          change="Triage Needed"
          icon={<ShieldAlert className="w-5 h-5 text-rose-600" />}
          subtext="Anomalies pending resolution"
          onClick={() => navigate('/data-quality')}
        />
      </div>

      {/* Provider Cards */}
      <DataSourceHealthCards sources={sources} onRetrySource={handleRetryTwelveData} />

      {/* Pipeline Progress and Tasks */}
      <PipelineProcessingTasks />

      {/* Recent Batches Table */}
      <RecentBatchesTable batches={importBatches} />
    </div>
  );
};

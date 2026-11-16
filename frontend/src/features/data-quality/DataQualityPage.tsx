import React, { useState } from 'react';
import { ChevronRight, Search, RotateCw } from 'lucide-react';
import { useMarketData } from '@/context/MarketDataContext';
import { DataQualityIssue } from '@/types';
import { Button } from '@/components/ui/Button';

// Modular Feature Components
import { AnomalyMetricsCards } from './components/AnomalyMetricsCards';
import { AnomalyQueueTable } from './components/AnomalyQueueTable';
import { AnomalyResolutionDrawer } from './components/AnomalyResolutionDrawer';

export const DataQualityPage: React.FC = () => {
  const {
    dataQualityIssues,
    resolveQualityIssue,
    ignoreQualityIssue,
    removeQualityRecord,
  } = useMarketData();

  const [activeTab, setActiveTab] = useState<'All' | 'Open' | 'Quarantined' | 'Resolved'>('Open');
  const [severityFilter, setSeverityFilter] = useState('All Severities');
  const [search, setSearch] = useState('');

  // Selected Issue for Resolution Panel
  const [selectedIssue, setSelectedIssue] = useState<DataQualityIssue | null>(
    dataQualityIssues.find((i) => i.id === 'DQ-1043') || dataQualityIssues[0] || null
  );
  const [correctedValue, setCorrectedValue] = useState(selectedIssue?.fixSuggestion || '175.43');

  const handleSelectIssue = (issue: DataQualityIssue) => {
    setSelectedIssue(issue);
    setCorrectedValue(issue.fixSuggestion || '');
  };

  const handleSaveResolve = () => {
    if (!selectedIssue) return;
    resolveQualityIssue(selectedIssue.id, correctedValue);
    setSelectedIssue((prev) => (prev ? { ...prev, status: 'Resolved' } : null));
  };

  const handleQuarantine = () => {
    if (!selectedIssue) return;
    ignoreQualityIssue(selectedIssue.id);
    setSelectedIssue((prev) => (prev ? { ...prev, status: 'Quarantined' } : null));
  };

  const handleRemove = () => {
    if (!selectedIssue) return;
    removeQualityRecord(selectedIssue.id);
    setSelectedIssue(null);
  };

  const filteredIssues = dataQualityIssues.filter((item) => {
    const matchesTab = activeTab === 'All' || item.status === activeTab;
    const matchesSeverity =
      severityFilter === 'All Severities' || item.severity === severityFilter;
    const matchesSearch =
      item.symbol.toLowerCase().includes(search.toLowerCase()) ||
      item.batch.toLowerCase().includes(search.toLowerCase()) ||
      item.problem.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSeverity && matchesSearch;
  });

  const totalOpen = dataQualityIssues.filter((i) => i.status === 'Open').length;
  const totalQuarantined = dataQualityIssues.filter((i) => i.status === 'Quarantined').length;
  const totalResolved = dataQualityIssues.filter((i) => i.status === 'Resolved').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-1">
            <span>Data Management</span>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-gray-900 font-bold">Data Quality</span>
          </nav>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Data Quality & Anomaly Triage
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Statistical anomaly detection (Z-Score), missing field isolation, and resolution drawer
          </p>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <AnomalyMetricsCards
        totalOpen={totalOpen}
        totalQuarantined={totalQuarantined}
        totalResolved={totalResolved}
      />

      {/* Main Layout: Queue Table + Resolution Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2/3: Controls & Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-gray-200">
            <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-lg text-xs font-semibold">
              {(['All', 'Open', 'Quarantined', 'Resolved'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeTab === tab
                      ? 'bg-white text-gray-900 shadow-sm font-bold'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-56">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter issues..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs bg-white text-gray-700 focus:outline-none"
              >
                <option value="All Severities">All Severities</option>
                <option value="High">High Severity</option>
                <option value="Medium">Medium Severity</option>
                <option value="Low">Low Severity</option>
              </select>
            </div>
          </div>

          <AnomalyQueueTable
            issues={filteredIssues}
            selectedIssueId={selectedIssue?.id}
            onSelectIssue={handleSelectIssue}
          />
        </div>

        {/* Right 1/3: Resolution Drawer */}
        <div className="lg:col-span-1">
          <AnomalyResolutionDrawer
            issue={selectedIssue}
            correctedValue={correctedValue}
            setCorrectedValue={setCorrectedValue}
            onResolve={handleSaveResolve}
            onQuarantine={handleQuarantine}
            onRemove={handleRemove}
          />
        </div>
      </div>
    </div>
  );
};

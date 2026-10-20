import React, { useState } from 'react';
import {
  RotateCw,
  Play,
  Search,
  Filter,
  Info,
  CheckCircle2,
  X,
  Check,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { useMarketData } from '@/context/MarketDataContext';
import { RECENTLY_RESOLVED_RECORDS } from '@/data/mock/dataManagerData';
import { DataQualityIssue } from '@/types';

export const DataQualityPage: React.FC = () => {
  const {
    dataQualityIssues,
    resolveQualityIssue,
    ignoreQualityIssue,
    removeQualityRecord,
    reprocessResolvedIssues,
  } = useMarketData();

  const [activeTab, setActiveTab] = useState<'All' | 'Open' | 'Quarantined' | 'Resolved'>('Open');
  const [severityFilter, setSeverityFilter] = useState('All Severities');
  const [datasetFilter, setDatasetFilter] = useState('All Datasets');
  const [batchFilter, setBatchFilter] = useState('All Batches');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Selected Issue for Resolution Panel
  const [selectedIssue, setSelectedIssue] = useState<DataQualityIssue | null>(
    dataQualityIssues.find((i) => i.id === 'DQ-1043') || dataQualityIssues[0] || null
  );
  const [correctedValue, setCorrectedValue] = useState(
    selectedIssue?.fixSuggestion || '175.43'
  );

  const handleSelectIssue = (issue: DataQualityIssue) => {
    setSelectedIssue(issue);
    setCorrectedValue(issue.fixSuggestion || '');
  };

  const handleSaveResolve = () => {
    if (!selectedIssue) return;
    resolveQualityIssue(selectedIssue.id, correctedValue);
    setSelectedIssue((prev) => (prev ? { ...prev, status: 'Resolved' } : null));
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
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Data Quality
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review validation issues and quarantined financial-data records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsRefreshing(true);
              setTimeout(() => setIsRefreshing(false), 500);
            }}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-xs"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : 'text-gray-400'}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={reprocessResolvedIssues}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#111827] text-white rounded-lg text-xs font-semibold hover:bg-black shadow-xs transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Reprocess Resolved ({totalResolved})</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Open Issues */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <span>OPEN ISSUES</span>
            <AlertTriangle className="w-3.5 h-3.5 text-gray-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900 font-mono">
              {totalOpen}
            </span>
            <span className="text-xs text-red-600 font-medium">• Requires review</span>
          </div>
        </div>

        {/* Quarantined */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <span>QUARANTINED</span>
            <span>🛡</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900 font-mono">
              {totalQuarantined}
            </span>
            <span className="text-xs text-gray-500">• Excluded from main dataset</span>
          </div>
        </div>

        {/* Resolved Today */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <span>RESOLVED TODAY</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-gray-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900 font-mono">
              {totalResolved}
            </span>
            <span className="text-xs text-emerald-600 font-medium">• Ready for reprocessing</span>
          </div>
        </div>

        {/* Failed Reprocessing */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <span>FAILED REPROCESSING</span>
            <span className="text-red-500">!</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-red-600 font-mono">2</span>
            <span className="text-xs text-red-600 font-medium">• Requires attention</span>
          </div>
        </div>
      </div>

      {/* Info Callout */}
      <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl flex items-center gap-2.5 text-xs text-gray-600">
        <Info className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <span>
          Quarantined records are excluded from the main MarketLens dataset until their validation issues are resolved.
        </span>
      </div>

      {/* Main Table Card: Data Quality Issues */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-gray-100 space-y-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">Data Quality Issues</h3>
            <p className="text-xs text-gray-400">
              {totalOpen} active issues requiring attention
            </p>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Filter Tabs */}
            <div className="flex items-center bg-gray-100 rounded-lg p-0.5 text-xs font-semibold text-gray-600">
              <button
                onClick={() => setActiveTab('All')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'All' ? 'bg-white text-gray-900 shadow-xs' : 'hover:text-gray-900'
                }`}
              >
                All (55)
              </button>
              <button
                onClick={() => setActiveTab('Open')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'Open' ? 'bg-white text-gray-900 shadow-xs' : 'hover:text-gray-900'
                }`}
              >
                Open ({totalOpen})
              </button>
              <button
                onClick={() => setActiveTab('Quarantined')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'Quarantined' ? 'bg-white text-gray-900 shadow-xs' : 'hover:text-gray-900'
                }`}
              >
                Quarantined ({totalQuarantined})
              </button>
              <button
                onClick={() => setActiveTab('Resolved')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'Resolved' ? 'bg-white text-gray-900 shadow-xs' : 'hover:text-gray-900'
                }`}
              >
                Resolved ({totalResolved})
              </button>
            </div>

            {/* Dropdowns & Search */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="All Severities">All Severities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <select
                value={datasetFilter}
                onChange={(e) => setDatasetFilter(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="All Datasets">All Datasets</option>
                <option value="Historical OHLCV">Historical OHLCV</option>
                <option value="News Feed">News Feed</option>
              </select>

              <select
                value={batchFilter}
                onChange={(e) => setBatchFilter(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="All Batches">All Batches</option>
                <option value="B-1043">Batch B-1043</option>
                <option value="B-1041">Batch B-1041</option>
                <option value="B-1039">Batch B-1039</option>
              </select>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search symbol, batch, f..."
                  className="pl-8 pr-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-black w-44"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Issues Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] text-gray-400 uppercase tracking-wider border-b border-gray-100 font-sans">
                <th className="py-3 px-6">ISSUE ID</th>
                <th className="py-3 px-4">RECORD / SYMBOL</th>
                <th className="py-3 px-4">BATCH</th>
                <th className="py-3 px-4">FIELD</th>
                <th className="py-3 px-4">PROBLEM</th>
                <th className="py-3 px-4">SEVERITY</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">DETECTED</th>
                <th className="py-3 px-6 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredIssues.map((issue) => {
                const isCurrent = selectedIssue?.id === issue.id;
                return (
                  <tr
                    key={issue.id}
                    onClick={() => handleSelectIssue(issue)}
                    className={`transition-colors cursor-pointer ${
                      isCurrent ? 'bg-gray-50 font-medium' : 'hover:bg-gray-50/60'
                    }`}
                  >
                    <td className="py-3 px-6 font-mono font-bold text-gray-900">
                      {issue.id}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-gray-900 font-mono">{issue.symbol}</span>
                      <p className="text-[11px] text-gray-400">{issue.companyName}</p>
                    </td>
                    <td className="py-3 px-4 font-mono text-gray-600">{issue.batch}</td>
                    <td className="py-3 px-4 font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 text-[11px]">
                        {issue.field}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-800">{issue.problem}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          issue.severity === 'High'
                            ? 'bg-red-50 text-red-700'
                            : issue.severity === 'Medium'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {issue.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          issue.status === 'Open'
                            ? 'bg-amber-50 text-amber-800'
                            : issue.status === 'Quarantined'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        {issue.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-[11px]">{issue.detected}</td>
                    <td className="py-3 px-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectIssue(issue);
                        }}
                        className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 shadow-xs"
                      >
                        {issue.status === 'Resolved' ? 'View' : 'Resolve'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Showing 1–{filteredIssues.length} of {dataQualityIssues.length} issues</span>
          <div className="flex items-center gap-1 font-semibold">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className="px-2 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-50"
            >
              Previous
            </button>
            <button className="px-2.5 py-1 bg-black text-white rounded">1</button>
            <button className="px-2.5 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-50">
              2
            </button>
            <button className="px-2.5 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-50">
              3
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-2 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Recently Resolved Records Banner */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px]">
              RECENTLY RESOLVED RECORDS (TODAY)
            </h4>
          </div>
          <span className="text-gray-400">Last 24 hours</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {RECENTLY_RESOLVED_RECORDS.map((rec) => (
            <div
              key={rec.id}
              className="p-3 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-gray-900">{rec.id}</span>
                <span className="font-bold text-gray-900">{rec.symbol}</span>
                <span className="text-gray-600 truncate max-w-xs">{rec.detail}</span>
              </div>
              <span className="text-[11px] text-gray-400 whitespace-nowrap ml-2">
                {rec.resolvedTime} by {rec.resolvedBy}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Slide-out / Bottom Detail Resolution Panel */}
      {selectedIssue && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <img
                src="/src/assets/branding/marketlens-icon.svg"
                alt="MarketLens"
                className="w-5 h-5"
              />
              <span className="text-sm font-bold text-gray-900">
                Inspection & Resolution: {selectedIssue.id} ({selectedIssue.symbol})
              </span>
            </div>
            <button
              onClick={() => setSelectedIssue(null)}
              className="p-1 rounded text-gray-400 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Issue Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              ISSUE SUMMARY
            </h4>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-xs space-y-1.5 font-mono">
              <div className="flex items-center justify-between text-gray-600">
                <span className="font-sans">Batch Source:</span>
                <span className="font-bold text-gray-900">{selectedIssue.batch} • CSV Upload</span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span className="font-sans">Target Table:</span>
                <span className="font-bold text-gray-900">{selectedIssue.targetTable}</span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span className="font-sans">Detected:</span>
                <span className="font-bold text-gray-900">{selectedIssue.detected}</span>
              </div>
              <p className="font-sans text-red-600 pt-2 border-t border-gray-200 mt-2">
                Required field <code className="font-mono bg-white px-1 border rounded">{selectedIssue.field}</code> is null or missing in source row {selectedIssue.rawRecord.rowNumber || 184}.
              </p>
            </div>
          </div>

          {/* Original Raw Record */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <h4 className="font-bold text-gray-400 uppercase tracking-wider">
                ORIGINAL RAW RECORD
              </h4>
              <span className="font-mono text-gray-400">Row #{selectedIssue.rawRecord.rowNumber || 184}</span>
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono space-y-1 divide-y divide-gray-100">
              <div className="flex items-center justify-between py-1">
                <span className="text-gray-500">symbol:</span>
                <span className="font-bold text-gray-900">{selectedIssue.rawRecord.symbol}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-gray-500">date:</span>
                <span className="font-bold text-gray-900">{selectedIssue.rawRecord.date}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-gray-500">open:</span>
                <span className="font-bold text-gray-900">{selectedIssue.rawRecord.open}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-gray-500">high:</span>
                <span className="font-bold text-gray-900">{selectedIssue.rawRecord.high}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-gray-500">low:</span>
                <span className="font-bold text-gray-900">{selectedIssue.rawRecord.low}</span>
              </div>

              {/* Missing field row highlighted red */}
              <div className="flex items-center justify-between py-1.5 bg-red-50 -mx-4 px-4 text-red-600 font-bold">
                <span>{selectedIssue.field}:</span>
                <span>— (MISSING)</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-gray-500">volume:</span>
                <span className="font-bold text-gray-900">
                  {selectedIssue.rawRecord.volume?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Correct Invalid Value Form */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-gray-900">
              Correct Invalid Value ({selectedIssue.field})
            </label>
            <input
              type="text"
              value={correctedValue}
              onChange={(e) => setCorrectedValue(e.target.value)}
              className="w-full bg-white border border-gray-200 px-3.5 py-2.5 rounded-lg text-sm font-mono text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
            />
            <p className="text-[11px] text-gray-400 font-mono">
              Expected decimal float conforming to OHLCV schema.
            </p>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleSaveResolve}
                className="w-full py-2.5 bg-[#111827] text-white rounded-lg text-xs font-bold hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Save & Mark Resolved</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => ignoreQualityIssue(selectedIssue.id)}
                  className="py-2 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Ignore Issue
                </button>
                <button
                  onClick={() => removeQualityRecord(selectedIssue.id)}
                  className="py-2 bg-white border border-red-200 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-50"
                >
                  Remove Record
                </button>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 pt-2 flex items-center gap-1.5">
              <span>↻</span>
              <span>Once marked resolved, this record will be queued for reprocessing into the primary dataset.</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

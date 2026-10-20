import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RotateCw,
  Upload,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Database,
  FileSpreadsheet,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import {
  INITIAL_DATA_SOURCES,
  DATA_FRESHNESS,
  INITIAL_PIPELINE_TASKS,
} from '@/data/mock/dataManagerData';
import { useMarketData } from '@/context/MarketDataContext';

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Data Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor financial data sources, imports, and processing activity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-xs"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : 'text-gray-400'}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={() => navigate('/data-import')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#111827] text-white rounded-lg text-xs font-semibold hover:bg-black transition-colors shadow-xs"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Data</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Imports Today */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <span>IMPORTS TODAY</span>
            <span>⇄</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900 font-mono">12</span>
          </div>
          <p className="mt-3 text-xs text-gray-500 pt-2 border-t border-gray-100">
            API & manual imports
          </p>
        </div>

        {/* Records Processed */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <span>RECORDS PROCESSED</span>
            <span>{'{}'}</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900 font-mono">82,540</span>
          </div>
          <p className="mt-3 text-xs text-gray-500 pt-2 border-t border-gray-100">
            Today
          </p>
        </div>

        {/* Failed Records */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <span>FAILED RECORDS</span>
            <span className="text-red-500">!</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-red-600 font-mono">31</span>
          </div>
          <p className="mt-3 text-xs text-red-600 font-medium pt-2 border-t border-gray-100">
            Requires review
          </p>
        </div>

        {/* Quarantined Records */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <span>QUARANTINED RECORDS</span>
            <span className="text-amber-500">🛡</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-600 font-mono">18</span>
          </div>
          <p className="mt-3 text-xs text-gray-500 pt-2 border-t border-gray-100">
            Awaiting resolution
          </p>
        </div>
      </div>

      {/* Middle Row: Data Sources (2/3) + Data Freshness (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Data Sources */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900">Data Sources</h3>
                <p className="text-xs text-gray-400">
                  Configured sources currently available to MarketLens.
                </p>
              </div>
              <span className="text-xs text-gray-400 font-mono">3 Connected</span>
            </div>

            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    <th className="py-2.5 px-2">SOURCE</th>
                    <th className="py-2.5 px-4">TYPE</th>
                    <th className="py-2.5 px-4">STATUS</th>
                    <th className="py-2.5 px-4">LAST UPDATED</th>
                    <th className="py-2.5 px-2 text-right">RECORDS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sources.map((src) => (
                    <tr key={src.id} className="hover:bg-gray-50/50">
                      <td className="py-3 px-2 font-medium text-gray-900 flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            src.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-300'
                          }`}
                        />
                        <span>{src.source}</span>
                      </td>
                      <td className="py-3 px-4 text-gray-500 font-mono text-[11px]">{src.type}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            src.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {src.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-500">{src.lastUpdated}</td>
                      <td className="py-3 px-2 text-right font-mono text-gray-900">{src.records}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Ingestion Rate Limit Alert box */}
            {sources.some((s) => s.hasAlert) && (
              <div className="mt-4 p-4 bg-amber-50/60 border border-amber-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-amber-900">
                      Twelve Data — Ingestion Rate Limit Alert
                    </h5>
                    <p className="text-amber-800 mt-0.5">
                      MarketLens is currently serving cached data snapshot (18 min ago) to prevent quota violation.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleRetryTwelveData}
                  className="px-3 py-1.5 bg-white border border-amber-300 text-amber-900 rounded-lg text-xs font-semibold hover:bg-amber-100/50 whitespace-nowrap self-start sm:self-center"
                >
                  Retry Connection
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Data Freshness */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">Data Freshness</h3>
              <p className="text-xs text-gray-400">Latest successful data updates.</p>
            </div>

            <div className="space-y-4 mt-4">
              {DATA_FRESHNESS.map((df) => (
                <div
                  key={df.name}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-medium text-gray-900">{df.name}</span>
                  </div>
                  <span className="text-gray-500 font-mono text-[11px]">{df.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 mt-4 text-[11px] text-gray-400 leading-normal">
            Freshness depends on source refresh intervals and API rate limits.
          </div>
        </div>
      </div>

      {/* Recent Imports Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900">Recent Imports</h3>
            <p className="text-xs text-gray-400">
              Recent API synchronizations and manual dataset imports.
            </p>
          </div>
          <button
            onClick={() => navigate('/data-import')}
            className="text-xs font-semibold text-gray-700 hover:text-black flex items-center gap-1"
          >
            <span>View all</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] text-gray-400 uppercase tracking-wider border-b border-gray-100 font-sans">
                <th className="py-2.5 px-6">BATCH ID</th>
                <th className="py-2.5 px-4">SOURCE</th>
                <th className="py-2.5 px-4">STARTED</th>
                <th className="py-2.5 px-4">TOTAL RECORDS</th>
                <th className="py-2.5 px-4">VALID</th>
                <th className="py-2.5 px-4">FAILED</th>
                <th className="py-2.5 px-4">STATUS</th>
                <th className="py-2.5 px-6 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {importBatches.map((batch) => (
                <tr key={batch.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3 px-6 font-bold text-gray-900">{batch.id}</td>
                  <td className="py-3 px-4 font-sans text-gray-700">{batch.source}</td>
                  <td className="py-3 px-4 text-gray-500">{batch.started}</td>
                  <td className="py-3 px-4 text-gray-900">{batch.totalRecords.toLocaleString()}</td>
                  <td className="py-3 px-4 text-emerald-600">{batch.validRecords.toLocaleString()}</td>
                  <td className={`py-3 px-4 ${batch.failedRecords > 0 ? 'text-red-600 font-bold' : 'text-gray-400'}`}>
                    {batch.failedRecords}
                  </td>
                  <td className="py-3 px-4 font-sans">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        batch.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700'
                          : batch.status === 'Warning'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {batch.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-right">
                    <button
                      onClick={() => navigate('/data-quality')}
                      className="text-gray-400 hover:text-black font-sans text-xs font-bold"
                    >
                      &gt;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Import Your Own Dataset Banner */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-gray-900">Import your own dataset</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-xl">
            Upload CSV or JSON financial-market data, validate the records, preview the dataset, and import approved records into MarketLens.
          </p>
        </div>

        <button
          onClick={() => navigate('/data-import')}
          className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-gray-900 hover:bg-gray-50 transition-colors shadow-xs flex items-center gap-2 self-start sm:self-center"
        >
          <FileSpreadsheet className="w-4 h-4 text-gray-600" />
          <span>Upload CSV / JSON</span>
        </button>
      </div>

      {/* Bottom Row: Pipeline Activity (2/3) + Data Quality Preview (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4">
          <div className="pb-3 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-900">Pipeline Activity</h3>
            <p className="text-xs text-gray-400">Current ingestion and processing tasks.</p>
          </div>

          <div className="space-y-3">
            {INITIAL_PIPELINE_TASKS.map((task) => (
              <div
                key={task.id}
                className="p-4 bg-gray-50/60 border border-gray-100 rounded-xl space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900">{task.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      task.status === 'Processing'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : task.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {task.status}
                  </span>
                </div>

                {task.detail && <p className="text-gray-500 text-[11px]">{task.detail}</p>}
                {task.lastCompleted && (
                  <p className="text-gray-400 text-[11px]">{task.lastCompleted}</p>
                )}

                {task.progress !== undefined && (
                  <div className="pt-1">
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1 font-mono">
                      <span>{task.progress}% completed</span>
                      <span>{task.eta}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Data Quality Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">Data Quality</h3>
              <p className="text-xs text-gray-400">Current dataset validation state.</p>
            </div>

            {/* 3 mini stat blocks */}
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="p-3 bg-red-50/50 rounded-xl border border-red-100">
                <span className="text-[10px] text-gray-500 uppercase font-semibold">Open Issues</span>
                <p className="text-xl font-bold text-red-600 mt-1 font-mono">
                  {dataQualityIssues.filter((i) => i.status === 'Open').length}
                </p>
              </div>

              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100">
                <span className="text-[10px] text-gray-500 uppercase font-semibold">Quarantined</span>
                <p className="text-xl font-bold text-amber-600 mt-1 font-mono">
                  {dataQualityIssues.filter((i) => i.status === 'Quarantined').length}
                </p>
              </div>

              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                <span className="text-[10px] text-gray-500 uppercase font-semibold">Resolved</span>
                <p className="text-xl font-bold text-emerald-600 mt-1 font-mono">12</p>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                RECENT ISSUES
              </span>

              <div className="divide-y divide-gray-100 text-xs">
                <div className="py-2 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">Missing closing price</p>
                    <p className="text-[10px] text-gray-400">AAPL • Market Data</p>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-50 text-red-700">
                    High
                  </span>
                </div>

                <div className="py-2 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">Invalid date format</p>
                    <p className="text-[10px] text-gray-400">CSV Import B-1043</p>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700">
                    Medium
                  </span>
                </div>

                <div className="py-2 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">Duplicate record</p>
                    <p className="text-[10px] text-gray-400">NVDA • Historical Data</p>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-600">
                    Low
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 mt-4">
            <button
              onClick={() => navigate('/data-quality')}
              className="w-full py-2 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-800 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View Data Quality</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

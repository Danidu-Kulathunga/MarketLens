import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  FileSpreadsheet,
  Clock,
  Download,
  Trash2,
  Eye,
  CheckCircle2,
  RotateCw,
  ChevronRight,
  Check,
} from 'lucide-react';
import { MOCK_IMPORT_PREVIEW_RECORDS } from '@/data/mock/dataManagerData';
import { useMarketData } from '@/context/MarketDataContext';

export const DataImportPage: React.FC = () => {
  const navigate = useNavigate();
  const { addImportBatch } = useMarketData();

  const [hasUploadedFile, setHasUploadedFile] = useState(true);
  const [ingestionMode, setIngestionMode] = useState<'append' | 'overwrite'>('append');
  const [targetDataset, setTargetDataset] = useState('Equities Price History (OHLCV)');
  const [autoValidate, setAutoValidate] = useState(true);
  const [isolateAnomalies, setIsolateAnomalies] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);

  const handleExecuteImport = () => {
    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      setImportSuccess(true);
      addImportBatch({
        id: `B-${Math.floor(1044 + Math.random() * 50)}`,
        source: 'CSV Upload',
        started: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        totalRecords: 12532,
        validRecords: 12532,
        failedRecords: 0,
        status: 'Completed',
        timestamp: new Date().toISOString(),
      });
      setTimeout(() => {
        navigate('/data-management');
      }, 1500);
    }, 1200);
  };

  const handleDownloadTemplate = () => {
    const csvContent =
      'timestamp,ticker,open_price,high_price,low_price,close_price,volume\n2026-10-18,AAPL,172.10,176.82,171.90,175.43,52341200\n';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'marketlens_ohlcv_template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-1">
            <span>Data Operations</span>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-gray-900 font-bold">Data Import</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Data Import
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Upload, map, and validate financial time-series, equity instruments, and macroeconomic datasets into MarketLens.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/data-management')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-xs"
          >
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>Import History</span>
          </button>

          <button
            onClick={handleDownloadTemplate}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-gray-400" />
            <span>Download CSV Template</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Imports */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <span>TOTAL IMPORTS</span>
            <FileSpreadsheet className="w-3.5 h-3.5 text-gray-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900 font-mono">148</span>
          </div>
          <p className="mt-3 text-xs text-gray-500 pt-2 border-t border-gray-100">
            All historical batches
          </p>
        </div>

        {/* Successful Batches */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold tracking-wider">
            <span className="text-gray-400 uppercase">SUCCESSFUL BATCHES</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              • 95.9%
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900 font-mono">142</span>
          </div>
          <p className="mt-3 text-xs text-gray-500 pt-2 border-t border-gray-100">
            +95.9% success rate
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
            Pending manual resolution in Data Quality
          </p>
        </div>

        {/* Active Data Pipeline */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold tracking-wider">
            <span className="text-gray-400 uppercase">ACTIVE DATA PIPELINE</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              • Active
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900 tracking-tight">Running</span>
          </div>
          <p className="mt-3 text-xs text-gray-500 pt-2 border-t border-gray-100">
            Ingestion engine v2.4 operational
          </p>
        </div>
      </div>

      {/* Step 1: Upload Dataset File */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center">
              1
            </span>
            <h3 className="text-base font-bold text-gray-900">Upload Dataset File</h3>
          </div>
          <span className="text-xs text-gray-400 font-mono">Max file size: 250 MB</span>
        </div>

        <p className="text-xs text-gray-500">
          Provide tabular market feeds, quote intervals, or balance sheet exports.
        </p>

        {/* Drag and Drop Zone */}
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center mx-auto text-gray-600 mb-3 shadow-xs">
            <Upload className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-gray-800">
            Drag & drop files or <span className="text-black underline">Browse local machine</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Supports .CSV, .JSON, .PARQUET up to 250MB
          </p>
        </div>

        {/* Selected File Box */}
        {hasUploadedFile && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-700">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-900 font-mono">
                    US_Equities_OHLCV_2026-10-18.csv
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>100% Uploaded</span>
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 font-mono mt-0.5">
                  18.4 MB • 12,532 records detected • <span className="text-emerald-600 font-semibold">Ready for schema mapping</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-400">
              <button className="p-1.5 hover:text-gray-700 rounded-lg hover:bg-white transition-colors">
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => setHasUploadedFile(false)}
                className="p-1.5 hover:text-red-600 rounded-lg hover:bg-white transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Step 2: Target Dataset & Ingestion Configuration */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-5">
        <div className="pb-3 border-b border-gray-100 flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center">
            2
          </span>
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Target Dataset & Ingestion Configuration
            </h3>
            <p className="text-xs text-gray-400">
              Specify destination table partition and data deduplication strategy.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Target Destination Dataset */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              TARGET DESTINATION DATASET
            </label>
            <select
              value={targetDataset}
              onChange={(e) => setTargetDataset(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="Equities Price History (OHLCV)">
                Equities Price History (OHLCV)
              </option>
              <option value="Financial News & Sentiment Feed">
                Financial News & Sentiment Feed
              </option>
              <option value="Macroeconomic Indicators (FRED)">
                Macroeconomic Indicators (FRED)
              </option>
            </select>
            <p className="text-[11px] text-gray-400 font-mono mt-1.5">
              Destination table: <code className="text-gray-700">marketlens_prod.securities_ohlcv_daily</code>
            </p>
          </div>

          {/* Ingestion Mode */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              INGESTION MODE
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIngestionMode('append')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 transition-colors ${
                  ingestionMode === 'append'
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Append & Update Existing</span>
              </button>

              <button
                type="button"
                onClick={() => setIngestionMode('overwrite')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold border flex items-center justify-center transition-colors ${
                  ingestionMode === 'overwrite'
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                Full Snapshot Overwrite
              </button>
            </div>
            <p className="text-[11px] text-gray-400 mt-1.5">
              Matches primary keys (Symbol + Date) and updates modified rows.
            </p>
          </div>
        </div>

        {/* Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-xs">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <p className="font-semibold text-gray-900">Auto-Validate Schema</p>
              <p className="text-[11px] text-gray-500">
                Enforces strict data typing against MarketLens canonical dictionary.
              </p>
            </div>
            <input
              type="checkbox"
              checked={autoValidate}
              onChange={(e) => setAutoValidate(e.target.checked)}
              className="w-4 h-4 text-black rounded focus:ring-black cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <p className="font-semibold text-gray-900">Isolate Anomalies</p>
              <p className="text-[11px] text-gray-500">
                Isolates anomalies into Data Quality queue without failing the entire batch.
              </p>
            </div>
            <input
              type="checkbox"
              checked={isolateAnomalies}
              onChange={(e) => setIsolateAnomalies(e.target.checked)}
              className="w-4 h-4 text-black rounded focus:ring-black cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Floating / Sticky Pipeline Execution Confirmation Bar */}
      <div className="bg-[#111827] text-white rounded-xl p-4 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Target: <strong className="text-emerald-400">ohlcv_daily</strong></span>
          <span className="text-gray-400">• Ready for pipeline execution</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/data-management')}
            className="px-3.5 py-2 text-xs font-semibold text-gray-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => {}}
            className="px-3.5 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Re-validate Schema</span>
          </button>
          <button
            onClick={handleExecuteImport}
            disabled={isImporting || importSuccess}
            className="px-4 py-2 bg-white text-black hover:bg-gray-100 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 shadow-xs disabled:opacity-50"
          >
            {isImporting ? (
              <>
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : importSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Imported Successfully!</span>
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5" />
                <span>Import 12,532 Records</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Step 3: Schema Mapping & Data Preview Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center">
              3
            </span>
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Schema Mapping & Data Preview
              </h3>
              <p className="text-xs text-gray-400">
                Preview of the first 5 records with automated canonical field mapping.
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>12,532 records ready to import • 0 errors found</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] text-gray-400 uppercase tracking-wider border-b border-gray-100 font-sans">
                <th className="py-3 px-6">
                  Source: timestamp
                  <p className="text-[10px] text-gray-500 normal-case font-mono">Date (ISO 8601)</p>
                </th>
                <th className="py-3 px-4">
                  Source: ticker
                  <p className="text-[10px] text-gray-500 normal-case font-mono">Symbol (Uppercase)</p>
                </th>
                <th className="py-3 px-4">
                  Source: open_price
                  <p className="text-[10px] text-gray-500 normal-case font-mono">Open ($ Mono)</p>
                </th>
                <th className="py-3 px-4">
                  Source: high_price
                  <p className="text-[10px] text-gray-500 normal-case font-mono">High ($ Mono)</p>
                </th>
                <th className="py-3 px-4">
                  Source: low_price
                  <p className="text-[10px] text-gray-500 normal-case font-mono">Low ($ Mono)</p>
                </th>
                <th className="py-3 px-4">
                  Source: close_price
                  <p className="text-[10px] text-gray-500 normal-case font-mono">Close ($ Mono)</p>
                </th>
                <th className="py-3 px-4">
                  Source: volume
                  <p className="text-[10px] text-gray-500 normal-case font-mono">Volume (Integer)</p>
                </th>
                <th className="py-3 px-6 text-right font-sans">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_IMPORT_PREVIEW_RECORDS.map((rec) => (
                <tr key={rec.ticker} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3 px-6 text-gray-600">{rec.timestamp}</td>
                  <td className="py-3 px-4 font-bold text-gray-900">{rec.ticker}</td>
                  <td className="py-3 px-4 text-gray-800">{rec.open_price}</td>
                  <td className="py-3 px-4 text-gray-800">{rec.high_price}</td>
                  <td className="py-3 px-4 text-gray-800">{rec.low_price}</td>
                  <td className="py-3 px-4 font-bold text-gray-900">{rec.close_price}</td>
                  <td className="py-3 px-4 text-gray-600">{rec.volume}</td>
                  <td className="py-3 px-6 text-right font-sans">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <Check className="w-3 h-3" />
                      <span>{rec.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

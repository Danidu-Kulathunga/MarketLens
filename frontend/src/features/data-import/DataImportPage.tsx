import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, ChevronRight, RotateCw, CheckCircle2 } from 'lucide-react';
import { useMarketData } from '@/context/MarketDataContext';
import { Button } from '@/components/ui/Button';

// Modular Feature Components
import { ImportStepIndicator } from './components/ImportStepIndicator';
import { FileUploadZone } from './components/FileUploadZone';
import { SchemaMappingTable } from './components/SchemaMappingTable';

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
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Data Import Wizard
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            3-step CSV/JSON upload, canonical schema mapping, and automated validation pipeline
          </p>
        </div>

        <Button onClick={handleDownloadTemplate} variant="outline" size="sm">
          <Download className="w-4 h-4 mr-1.5" />
          Download CSV Template
        </Button>
      </div>

      {/* Step Indicator */}
      <ImportStepIndicator currentStep={hasUploadedFile ? 2 : 1} />

      {/* Step 1: File Upload */}
      <FileUploadZone
        hasUploadedFile={hasUploadedFile}
        onClearFile={() => setHasUploadedFile(false)}
        onUploadFile={() => setHasUploadedFile(true)}
      />

      {/* Step 2: Schema Mapping Table */}
      {hasUploadedFile && <SchemaMappingTable />}

      {/* Step 3: Ingestion Configuration & Trigger */}
      {hasUploadedFile && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 text-sm pb-2 border-b border-gray-100">
            Step 3: Validation & Ingestion Controls
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Target Canonical Table</label>
              <select
                value={targetDataset}
                onChange={(e) => setTargetDataset(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="Equities Price History (OHLCV)">
                  Equities Price History (`market_ticks` Hypertable)
                </option>
                <option value="Financial Statements">Financial Statements (Quarterly)</option>
                <option value="Market Indices">Market Indices Constituents</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Ingestion Mode</label>
              <select
                value={ingestionMode}
                onChange={(e) => setIngestionMode(e.target.value as 'append' | 'overwrite')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="append">Append (Insert new observations)</option>
                <option value="overwrite">Overwrite / Upsert on primary key collision</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-gray-100 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoValidate}
                onChange={(e) => setAutoValidate(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="font-medium text-gray-700">
                Run statistical Z-Score validation before persistence
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isolateAnomalies}
                onChange={(e) => setIsolateAnomalies(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="font-medium text-gray-700">
                Quarantine detected anomalies into Data Quality queue
              </span>
            </label>
          </div>

          <div className="pt-4 flex justify-end">
            <Button
              onClick={handleExecuteImport}
              disabled={isImporting || importSuccess}
              variant="primary"
              size="sm"
              className="px-6"
            >
              {isImporting ? (
                <>
                  <RotateCw className="w-4 h-4 mr-2 animate-spin" />
                  Ingesting 12,532 records...
                </>
              ) : importSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2 text-white" />
                  Ingestion Complete! Redirecting...
                </>
              ) : (
                'Execute Canonical Ingestion'
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

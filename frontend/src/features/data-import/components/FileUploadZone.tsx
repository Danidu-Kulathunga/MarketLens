import React from 'react';
import { Upload, FileSpreadsheet, Trash2, CheckCircle2 } from 'lucide-react';

interface FileUploadZoneProps {
  hasUploadedFile: boolean;
  onClearFile: () => void;
  onUploadFile: () => void;
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  hasUploadedFile,
  onClearFile,
  onUploadFile,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div>
          <h3 className="font-bold text-gray-900 text-sm">Step 1: Dataset Source File</h3>
          <p className="text-xs text-gray-400">Supported formats: CSV, TSV, JSON (Max 50MB)</p>
        </div>
      </div>

      {hasUploadedFile ? (
        <div className="flex items-center justify-between p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 rounded-lg text-emerald-700">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-gray-900">
                  aapl_historical_ticks_2026.csv
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-800">
                  Ready
                </span>
              </div>
              <div className="text-[11px] text-gray-500 mt-0.5">
                4.2 MB • 12,532 records • 7 detected columns
              </div>
            </div>
          </div>

          <button
            onClick={onClearFile}
            className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Remove File"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={onUploadFile}
          className="border-2 border-dashed border-gray-300 hover:border-indigo-500 rounded-xl p-8 text-center cursor-pointer transition-colors bg-gray-50/50"
        >
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-xs font-bold text-gray-700">
            Click to upload or drag and drop financial CSV/JSON
          </p>
          <p className="text-[11px] text-gray-400 mt-1">Automatic schema detection on drop</p>
        </div>
      )}
    </div>
  );
};

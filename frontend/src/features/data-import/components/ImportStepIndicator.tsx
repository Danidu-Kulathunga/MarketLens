import React from 'react';
import { Check } from 'lucide-react';

interface ImportStepIndicatorProps {
  currentStep: number;
}

export const ImportStepIndicator: React.FC<ImportStepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { num: 1, title: 'Upload File', desc: 'Select CSV or JSON' },
    { num: 2, title: 'Map Schema', desc: 'Align columns to canonical model' },
    { num: 3, title: 'Ingest & Validate', desc: 'Run quality checks & persist' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
      {steps.map((s) => {
        const isCompleted = currentStep > s.num;
        const isCurrent = currentStep === s.num;
        return (
          <div key={s.num} className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                isCompleted
                  ? 'bg-emerald-600 text-white'
                  : isCurrent
                  ? 'bg-indigo-600 text-white ring-4 ring-indigo-50'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {isCompleted ? <Check className="w-4 h-4" /> : s.num}
            </div>
            <div>
              <div className="font-extrabold text-xs text-gray-900">{s.title}</div>
              <div className="text-[11px] text-gray-400">{s.desc}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

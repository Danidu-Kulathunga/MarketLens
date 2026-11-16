import React from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';
import { AIAnalysisReport } from '@/data/mock/aiData';

interface ThesisReportCardProps {
  report: AIAnalysisReport;
}

export const ThesisReportCard: React.FC<ThesisReportCardProps> = ({ report }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
              {report.symbol}
            </span>
            <span className="text-xs text-gray-400">{report.period}</span>
          </div>
          <h2 className="text-lg font-black text-gray-900 mt-1">
            Grounded Quantitative Thesis: {report.symbol}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
              Sentiment Overview
            </div>
            <div className="text-sm font-extrabold text-emerald-600">
              {report.sentimentStats.overall}
            </div>
          </div>
          <div className="text-right pl-3 border-l border-gray-200">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
              Positive Ratio
            </div>
            <div className="text-sm font-extrabold text-gray-900">
              {report.sentimentStats.positive}%
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
          Executive Summary
        </h4>
        <p className="text-xs text-gray-700 leading-relaxed bg-gray-50/70 p-4 rounded-xl border border-gray-100">
          {report.executiveSummary}
        </p>
      </div>

      <div>
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
          Model Interpretation
        </h4>
        <p className="text-xs text-indigo-950 leading-relaxed bg-indigo-50/60 p-4 rounded-xl border border-indigo-100">
          {report.aiInterpretation}
        </p>
      </div>

      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          Technical Indicators & Momentum
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-gray-400 text-[10px] uppercase font-semibold">Momentum</div>
            <div className="font-extrabold text-gray-900 text-sm mt-0.5">
              {report.technicalEvidence.momentum}
            </div>
            <div className="text-[10px] text-emerald-600">{report.technicalEvidence.momentumNote}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-gray-400 text-[10px] uppercase font-semibold">MA 20</div>
            <div className="font-extrabold text-gray-900 text-sm mt-0.5">
              {report.technicalEvidence.ma20}
            </div>
            <div className="text-[10px] text-emerald-600">{report.technicalEvidence.ma20Note}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-gray-400 text-[10px] uppercase font-semibold">MA 50</div>
            <div className="font-extrabold text-gray-900 text-sm mt-0.5">
              {report.technicalEvidence.ma50}
            </div>
            <div className="text-[10px] text-emerald-600">{report.technicalEvidence.ma50Note}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-gray-400 text-[10px] uppercase font-semibold">Volatility</div>
            <div className="font-extrabold text-gray-900 text-sm mt-0.5">
              {report.technicalEvidence.volatility}
            </div>
            <div className="text-[10px] text-gray-500">{report.technicalEvidence.volatilityNote}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

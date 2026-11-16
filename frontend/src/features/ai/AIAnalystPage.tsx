import React, { useState } from 'react';
import { MOCK_AI_REPORTS, AIAnalysisReport } from '@/data/mock/aiData';

// Modular Feature Components
import { AIQueryBuilder } from './components/AIQueryBuilder';
import { ThesisReportCard } from './components/ThesisReportCard';
import { EvidenceMatrixTable } from './components/EvidenceMatrixTable';
import { ModelRiskDisclaimer } from './components/ModelRiskDisclaimer';

export const AIAnalystPage: React.FC = () => {
  const [query, setQuery] = useState(
    'What could the recent earnings announcement mean for AAPL momentum?'
  );
  const [selectedAsset, setSelectedAsset] = useState('AAPL');
  const [selectedMode, setSelectedMode] = useState<'asset' | 'portfolio' | 'news'>('asset');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Context checkboxes
  const [includeMarketData, setIncludeMarketData] = useState(true);
  const [includeTechnicals, setIncludeTechnicals] = useState(true);
  const [includeNews, setIncludeNews] = useState(true);
  const [includePortfolio, setIncludePortfolio] = useState(false);

  // Active Report
  const [report, setReport] = useState<AIAnalysisReport>(MOCK_AI_REPORTS.AAPL);

  const handleRunAnalysis = (overrideQuery?: string, overrideAsset?: string) => {
    setIsAnalyzing(true);
    const targetQ = overrideQuery || query;
    const targetA = overrideAsset || selectedAsset;

    setTimeout(() => {
      setIsAnalyzing(false);
      if (selectedMode === 'portfolio' || targetQ.toLowerCase().includes('portfolio')) {
        setReport(MOCK_AI_REPORTS.PORTFOLIO);
      } else if (targetA === 'NVDA' || targetQ.toLowerCase().includes('nvda')) {
        setReport(MOCK_AI_REPORTS.NVDA);
      } else {
        setReport(MOCK_AI_REPORTS.AAPL);
      }
    }, 500);
  };

  const handleSuggestedClick = (text: string) => {
    setQuery(text);
    if (text.includes('NVDA')) {
      setSelectedAsset('NVDA');
      handleRunAnalysis(text, 'NVDA');
    } else if (text.includes('portfolio')) {
      setSelectedMode('portfolio');
      handleRunAnalysis(text, 'PORTFOLIO');
    } else {
      setSelectedAsset('AAPL');
      handleRunAnalysis(text, 'AAPL');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">AI Financial Analyst</h1>
          <p className="text-xs text-gray-500 mt-1">
            Grounded quantitative synthesis across price action, momentum, and financial news
          </p>
        </div>
        <div className="text-xs text-gray-400 font-medium">Model: MarketLens-Omni-v2.1</div>
      </div>

      {/* Query Builder & Grounding Toggles */}
      <AIQueryBuilder
        query={query}
        setQuery={setQuery}
        selectedAsset={selectedAsset}
        setSelectedAsset={setSelectedAsset}
        isAnalyzing={isAnalyzing}
        onRunAnalysis={() => handleRunAnalysis()}
        onSuggestedClick={handleSuggestedClick}
        includeMarketData={includeMarketData}
        setIncludeMarketData={setIncludeMarketData}
        includeTechnicals={includeTechnicals}
        setIncludeTechnicals={setIncludeTechnicals}
        includeNews={includeNews}
        setIncludeNews={setIncludeNews}
        includePortfolio={includePortfolio}
        setIncludePortfolio={setIncludePortfolio}
      />

      {/* Executive Thesis Report Card */}
      <ThesisReportCard report={report} />

      {/* Grounded Evidence Telemetry Matrix */}
      <EvidenceMatrixTable telemetry={report.telemetryMatrix} />

      {/* Model Risk & Uncertainty Disclaimer */}
      <ModelRiskDisclaimer risks={report.riskFactors} />
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Download,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  RotateCw,
  Search,
  Check,
  X,
} from 'lucide-react';
import { MOCK_AI_REPORTS, AIAnalysisReport } from '@/data/mock/aiData';
import { useMarketData } from '@/context/MarketDataContext';
import { ALL_STOCKS } from '@/data/mock/marketData';

export const AIAnalystPage: React.FC = () => {
  const navigate = useNavigate();
  const { holdings, portfolioSummary } = useMarketData();

  const [query, setQuery] = useState(
    'What could the recent earnings announcement mean for AAPL momentum?'
  );
  const [selectedAsset, setSelectedAsset] = useState('AAPL');
  const [selectedMode, setSelectedMode] = useState<'asset' | 'portfolio' | 'news'>('asset');
  const [analysisPeriod, setAnalysisPeriod] = useState('3 Months (Default)');
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              AI Analyst
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
              Deterministic Model v4.2
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Analyze markets, news, indicators, and your portfolio with contextual AI insights.
          </p>
        </div>

        <div className="text-xs text-gray-400 font-medium">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
          Market data: 2 min ago • News: 8 min ago
        </div>
      </div>

      {/* Main Grid: Query & Report (2/3) + Analysis Context (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Query Box */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                ASK MARKETLENS
              </span>
              <span className="text-gray-400 normal-case font-normal text-[11px]">
                Natural language query engine
              </span>
            </div>

            <textarea
              rows={2}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about tickers, technicals, or macro market trends..."
              className="w-full text-sm text-gray-900 border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-black resize-none"
            />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3 pt-3 border-t border-gray-100">
              <span className="text-[11px] text-gray-400">
                🔒 Constrained to verified historical & real-time telemetry
              </span>

              <button
                onClick={() => handleRunAnalysis()}
                disabled={isAnalyzing}
                className="inline-flex items-center justify-center gap-2 bg-[#111827] text-white px-5 py-2 rounded-lg text-xs font-semibold hover:bg-black transition-colors disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RotateCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Analyze</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Suggested Prompts */}
          <div>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Suggested questions:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                'Why is AAPL showing positive momentum?',
                'What risks are affecting my portfolio?',
                'How could this news affect NVDA?',
                'Compare MSFT momentum with AAPL',
              ].map((pill) => (
                <button
                  key={pill}
                  onClick={() => handleSuggestedClick(pill)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-xs text-left"
                >
                  {pill}
                </button>
              ))}
            </div>
          </div>

          {/* AI Analysis Report Container */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-6">
            {/* Report Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-gray-900">
                    AI Analysis Report
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-gray-100 text-gray-800">
                    {report.symbol} • {report.period}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Context ready
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Report generated with verified multi-factor groundings
                </p>
              </div>

              <button
                className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
                title="Download report"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>

            {/* 1. EXECUTIVE SUMMARY */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                1. EXECUTIVE SUMMARY
              </h4>
              <p className="text-sm font-medium text-gray-800 leading-relaxed">
                {report.executiveSummary}
              </p>
            </div>

            {/* 2. TECHNICAL EVIDENCE */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  2. TECHNICAL EVIDENCE
                </h4>
                <span className="text-[11px] text-gray-400">Real-time indicator values</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase">Momentum</span>
                  <p className="text-lg font-bold text-emerald-600 mt-0.5">
                    {report.technicalEvidence.momentum}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    {report.technicalEvidence.momentumNote}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase">MA20</span>
                  <p className="text-lg font-bold text-gray-900 mt-0.5">
                    {report.technicalEvidence.ma20}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    {report.technicalEvidence.ma20Note}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase">MA50</span>
                  <p className="text-lg font-bold text-gray-900 mt-0.5">
                    {report.technicalEvidence.ma50}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    {report.technicalEvidence.ma50Note}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase">Volatility</span>
                  <p className="text-lg font-bold text-gray-900 mt-0.5">
                    {report.technicalEvidence.volatility}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    {report.technicalEvidence.volatilityNote}
                  </p>
                </div>
              </div>
            </div>

            {/* 3. NEWS CONTEXT & SENTIMENT */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <h4 className="font-bold text-gray-400 uppercase tracking-wider text-[11px]">
                  3. NEWS CONTEXT & SENTIMENT
                </h4>
                <span>
                  {report.sentimentStats.analyzedCount} relevant articles analyzed • Sentiment:{' '}
                  <strong className="text-gray-900">{report.sentimentStats.overall}</strong>
                </span>
              </div>

              {/* Stacked Sentiment bar */}
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden flex">
                <div style={{ width: `${report.sentimentStats.positive}%` }} className="bg-emerald-500 h-full" />
                <div style={{ width: `${report.sentimentStats.neutral}%` }} className="bg-gray-400 h-full" />
                <div style={{ width: `${report.sentimentStats.negative}%` }} className="bg-red-500 h-full" />
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-500 px-1">
                <span>{report.sentimentStats.positive}% Positive</span>
                <span>{report.sentimentStats.neutral}% Neutral</span>
                <span>{report.sentimentStats.negative}% Negative</span>
              </div>

              <div className="space-y-2 mt-2">
                {report.newsArticles.map((art, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-gray-50 rounded-lg flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">📄</span>
                      <span className="font-medium text-gray-900">{art.headline}</span>
                      <span className="text-gray-400">• {art.source}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-[11px]">{art.timeAgo}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                        {art.sentiment}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/news')}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 mt-1"
              >
                <span>View related news in News Intelligence</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* AI Interpretation Box */}
            <div className="p-4 bg-emerald-50/50 border border-emerald-200/80 rounded-xl space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>AI INTERPRETATION</span>
              </div>
              <p className="text-xs text-emerald-950 leading-relaxed">
                {report.aiInterpretation}
              </p>
            </div>

            {/* 4. RISK FACTORS */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                4. RISK FACTORS
              </h4>
              <ul className="space-y-2 text-xs text-gray-700">
                {report.riskFactors.map((rf, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                    <span>{rf}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 5. EVIDENCE USED (Verified telemetry matrix) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  5. EVIDENCE USED
                </h4>
                <span className="text-[11px] text-gray-400">Verified telemetry matrix</span>
              </div>

              <div className="border border-gray-100 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                      <th className="py-2.5 px-4">METRIC / SOURCE</th>
                      <th className="py-2.5 px-4 text-right">OBSERVED VALUE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-mono">
                    {report.telemetryMatrix.map((tm, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50">
                        <td className="py-2.5 px-4 text-gray-700 font-sans">{tm.metric}</td>
                        <td className="py-2.5 px-4 text-right font-medium text-gray-900">
                          {tm.observedValue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 6. RELATED SOURCES */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                6. RELATED SOURCES
              </h4>
              <div className="space-y-2">
                {report.relatedSources.map((rs, idx) => (
                  <div
                    key={idx}
                    className="p-3 border border-gray-200 rounded-lg flex items-center justify-between text-xs hover:border-gray-300 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{rs.title}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{rs.tag}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-gray-400">{rs.date}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. EXPLORE FURTHER */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                7. EXPLORE FURTHER
              </h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleSuggestedClick('Compare MSFT momentum with AAPL')}
                  className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100"
                >
                  ✨ Compare with MSFT
                </button>
                <button
                  onClick={() => handleSuggestedClick('Explain volatility indicators')}
                  className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100"
                >
                  ⏱ Explain volatility
                </button>
                <button
                  onClick={() => handleSuggestedClick('Show momentum details')}
                  className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100"
                >
                  📈 Show momentum details
                </button>
                <button
                  onClick={() => handleSuggestedClick('What risks are affecting my portfolio?')}
                  className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100"
                >
                  💼 Analyze portfolio impact
                </button>
              </div>
            </div>

            {/* Bottom Disclaimer */}
            <p className="text-[10px] text-gray-400 pt-4 border-t border-gray-100 leading-normal">
              MarketLens provides analytical information for educational and informational purposes. AI-generated insights should not be interpreted as guaranteed financial outcomes or trading advice. Past performance and mathematical models do not assure future equity returns.
            </p>
          </div>
        </div>

        {/* Right Column: Analysis Context (1/3) */}
        <div className="space-y-6">
          {/* Mode Selector */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs space-y-2">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              MODE
            </span>
            <div className="space-y-1 text-xs font-medium">
              <button
                onClick={() => {
                  setSelectedMode('asset');
                  setReport(MOCK_AI_REPORTS.AAPL);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                  selectedMode === 'asset'
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>Asset Analysis ({selectedAsset})</span>
                {selectedMode === 'asset' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                )}
              </button>

              <button
                onClick={() => {
                  setSelectedMode('portfolio');
                  setReport(MOCK_AI_REPORTS.PORTFOLIO);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                  selectedMode === 'portfolio'
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>Portfolio Risk Analysis</span>
                {selectedMode === 'portfolio' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                )}
              </button>

              <button
                onClick={() => setSelectedMode('news')}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                  selectedMode === 'news'
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>News Impact Analysis</span>
                {selectedMode === 'news' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                )}
              </button>
            </div>
          </div>

          {/* Analysis Context */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Analysis Context</h3>
              <button
                onClick={() => {
                  setSelectedAsset('AAPL');
                  setAnalysisPeriod('3 Months (Default)');
                  setIncludeMarketData(true);
                  setIncludeTechnicals(true);
                  setIncludeNews(true);
                  setIncludePortfolio(false);
                }}
                className="text-[11px] text-gray-400 hover:text-gray-700 font-medium"
              >
                Reset
              </button>
            </div>

            {/* Asset Selector */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-gray-700">ASSET</span>
                <button
                  onClick={() => navigate(`/markets/${selectedAsset}`)}
                  className="text-emerald-600 hover:underline flex items-center gap-0.5 text-[11px]"
                >
                  <span>Market Detail</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <select
                value={selectedAsset}
                onChange={(e) => {
                  setSelectedAsset(e.target.value);
                  handleRunAnalysis(undefined, e.target.value);
                }}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
              >
                {ALL_STOCKS.map((s) => (
                  <option key={s.symbol} value={s.symbol}>
                    [{s.symbol[0]}] {s.symbol} — {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Analysis Period */}
            <div>
              <span className="block text-xs font-semibold text-gray-700 mb-1.5">
                ANALYSIS PERIOD
              </span>
              <select
                value={analysisPeriod}
                onChange={(e) => setAnalysisPeriod(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="1 Month">1 Month</option>
                <option value="3 Months (Default)">3 Months (Default)</option>
                <option value="6 Months">6 Months</option>
                <option value="1 Year">1 Year</option>
              </select>
            </div>

            {/* Include Data Layers */}
            <div className="space-y-2.5 pt-2 border-t border-gray-100">
              <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                INCLUDE DATA LAYERS
              </span>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700">
                <input
                  type="checkbox"
                  checked={includeMarketData}
                  onChange={(e) => setIncludeMarketData(e.target.checked)}
                  className="w-4 h-4 rounded text-black focus:ring-black"
                />
                <span className="font-medium">Market Data</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700">
                <input
                  type="checkbox"
                  checked={includeTechnicals}
                  onChange={(e) => setIncludeTechnicals(e.target.checked)}
                  className="w-4 h-4 rounded text-black focus:ring-black"
                />
                <span className="font-medium">Technical Indicators</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700">
                <input
                  type="checkbox"
                  checked={includeNews}
                  onChange={(e) => setIncludeNews(e.target.checked)}
                  className="w-4 h-4 rounded text-black focus:ring-black"
                />
                <span className="font-medium">Recent News</span>
              </label>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700">
                  <input
                    type="checkbox"
                    checked={includePortfolio}
                    onChange={(e) => setIncludePortfolio(e.target.checked)}
                    className="w-4 h-4 rounded text-black focus:ring-black"
                  />
                  <span className="font-medium">My Portfolio</span>
                </label>
                <p className="text-[10px] text-gray-400 ml-6 mt-0.5">
                  Uses your saved portfolio holdings as analysis context
                </p>
              </div>
            </div>

            {/* Selected News Context */}
            <div className="pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-[11px] text-gray-400 font-semibold mb-2">
                <span>SELECTED NEWS CONTEXT</span>
                <span className="font-normal">From News Intelligence</span>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs relative">
                <p className="font-medium text-gray-900 pr-5">
                  Apple reports stronger-than-expected quarterly earnings
                </p>
                <div className="flex items-center justify-between mt-2 text-[10px] text-gray-400">
                  <span>Reuters • 18 min ago</span>
                  <span className="font-mono font-bold text-gray-700">AAPL</span>
                </div>
              </div>
            </div>

            {/* Portfolio Context */}
            <div className="pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-[11px] text-gray-400 font-semibold mb-2">
                <span>PORTFOLIO CONTEXT</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">{holdings.length} Active Holdings</span>
                <span className="font-bold text-gray-900 font-mono">
                  ${portfolioSummary.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">Technology exposure: 68%</p>
            </div>

            <button
              onClick={() => handleRunAnalysis()}
              className="w-full py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-800 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCw className="w-3.5 h-3.5 text-gray-500" />
              <span>Update Context Model</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

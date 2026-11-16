import React from 'react';
import { Sparkles, RotateCw, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AIQueryBuilderProps {
  query: string;
  setQuery: (q: string) => void;
  selectedAsset: string;
  setSelectedAsset: (a: string) => void;
  isAnalyzing: boolean;
  onRunAnalysis: () => void;
  onSuggestedClick: (text: string) => void;
  includeMarketData: boolean;
  setIncludeMarketData: (val: boolean) => void;
  includeTechnicals: boolean;
  setIncludeTechnicals: (val: boolean) => void;
  includeNews: boolean;
  setIncludeNews: (val: boolean) => void;
  includePortfolio: boolean;
  setIncludePortfolio: (val: boolean) => void;
}

export const AIQueryBuilder: React.FC<AIQueryBuilderProps> = ({
  query,
  setQuery,
  selectedAsset,
  setSelectedAsset,
  isAnalyzing,
  onRunAnalysis,
  onSuggestedClick,
  includeMarketData,
  setIncludeMarketData,
  includeTechnicals,
  setIncludeTechnicals,
  includeNews,
  setIncludeNews,
  includePortfolio,
  setIncludePortfolio,
}) => {
  const suggestions = [
    'What could the recent earnings announcement mean for AAPL momentum?',
    'Evaluate NVDA correlation with recent semiconductor sector sentiment',
    'Assess risk exposure and sector concentration across my portfolio',
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
          Natural Language Research Query
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask an analytical question regarding stocks, trends, or portfolio..."
              className="w-full pl-9 pr-4 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>
          <Button
            onClick={onRunAnalysis}
            disabled={isAnalyzing || !query.trim()}
            variant="primary"
            size="sm"
            className="px-5"
          >
            {isAnalyzing ? (
              <>
                <RotateCw className="w-4 h-4 mr-1.5 animate-spin" />
                Synthesizing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-1.5" />
                Run Analysis
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Context Grounding Toggles */}
      <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-gray-100 text-xs">
        <span className="text-gray-400 font-semibold uppercase text-[10px] tracking-wider">
          Grounding Context:
        </span>
        <label className="flex items-center gap-1.5 cursor-pointer text-gray-700">
          <input
            type="checkbox"
            checked={includeMarketData}
            onChange={(e) => setIncludeMarketData(e.target.checked)}
            className="rounded text-indigo-600 focus:ring-indigo-500"
          />
          <span>Market Prices</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer text-gray-700">
          <input
            type="checkbox"
            checked={includeTechnicals}
            onChange={(e) => setIncludeTechnicals(e.target.checked)}
            className="rounded text-indigo-600 focus:ring-indigo-500"
          />
          <span>Technicals (SMA/RSI)</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer text-gray-700">
          <input
            type="checkbox"
            checked={includeNews}
            onChange={(e) => setIncludeNews(e.target.checked)}
            className="rounded text-indigo-600 focus:ring-indigo-500"
          />
          <span>News Sentiment</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer text-gray-700">
          <input
            type="checkbox"
            checked={includePortfolio}
            onChange={(e) => setIncludePortfolio(e.target.checked)}
            className="rounded text-indigo-600 focus:ring-indigo-500"
          />
          <span>Owned Portfolio</span>
        </label>
      </div>

      {/* Suggested Prompts */}
      <div className="pt-2 border-t border-gray-100">
        <div className="text-[11px] text-gray-400 font-semibold mb-2">Suggested Inquiries:</div>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => onSuggestedClick(s)}
              className="text-left text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors truncate max-w-md"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

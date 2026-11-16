import React, { useState } from 'react';
import { Search, Calendar } from 'lucide-react';
import { MOCK_NEWS_ARTICLES } from '@/data/mock/newsData';

// Modular Feature Components
import { NewsMetricsCards } from './components/NewsMetricsCards';
import { NewsArticleCard } from './components/NewsArticleCard';
import { SectorSentimentCard } from './components/SectorSentimentCard';
import { TrendingTickersCard } from './components/TrendingTickersCard';

export const NewsPage: React.FC = () => {
  const [sentimentFilter, setSentimentFilter] = useState<'All' | 'Bullish' | 'Bearish' | 'Neutral'>('All');
  const [categoryFilter, setCategoryFilter] = useState<
    'All News' | 'Corporate Earnings' | 'Macro & Fed' | 'Sector Trends'
  >('All News');
  const [selectedTickerFilter, setSelectedTickerFilter] = useState<string | null>('$NVDA');
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState('Last 24 Hours');

  const filteredArticles = MOCK_NEWS_ARTICLES.filter((article) => {
    const matchesSentiment = sentimentFilter === 'All' || article.sentiment === sentimentFilter;
    const matchesCategory = categoryFilter === 'All News' || article.category === categoryFilter;
    const matchesTicker =
      !selectedTickerFilter ||
      article.tickers.some((t) => t.symbol.toUpperCase() === selectedTickerFilter.toUpperCase());
    const matchesSearch =
      article.headline.toLowerCase().includes(search.toLowerCase()) ||
      article.summary.toLowerCase().includes(search.toLowerCase());
    return matchesSentiment && matchesCategory && matchesTicker && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Financial News & Intelligence
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Real-time market sentiment, automated entity extraction, and multi-asset news impact analysis
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5 text-xs font-semibold text-gray-600">
            {(['All', 'Bullish', 'Bearish', 'Neutral'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSentimentFilter(s)}
                className={`px-3 py-1 rounded-md transition-colors ${
                  sentimentFilter === s
                    ? 'bg-gray-900 text-white shadow-xs'
                    : 'hover:text-gray-900 text-gray-600'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 font-medium">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span>{dateRange}</span>
          </div>
        </div>
      </div>

      {/* KPI Metrics */}
      <NewsMetricsCards />

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2/3: Search, Categories & Articles List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search headlines, company summaries, or topics..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
              {(
                [
                  'All News',
                  'Corporate Earnings',
                  'Macro & Fed',
                  'Sector Trends',
                ] as const
              ).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                    categoryFilter === cat
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredArticles.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-xl border border-dashed border-gray-200 text-gray-500 text-xs">
                No articles found matching your criteria. Try adjusting your search or filters.
              </div>
            ) : (
              filteredArticles.map((article) => (
                <NewsArticleCard key={article.id} article={article} />
              ))
            )}
          </div>
        </div>

        {/* Right 1/3: Sector Sentiment & Trending Tickers */}
        <div className="space-y-6">
          <SectorSentimentCard />
          <TrendingTickersCard
            selectedTicker={selectedTickerFilter}
            onSelectTicker={setSelectedTickerFilter}
          />
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Calendar,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Info,
  ExternalLink,
} from 'lucide-react';
import {
  MOCK_NEWS_ARTICLES,
  SECTOR_SENTIMENTS,
  TRENDING_TICKERS,
} from '@/data/mock/newsData';

export const NewsPage: React.FC = () => {
  const navigate = useNavigate();
  const [sentimentFilter, setSentimentFilter] = useState<'All' | 'Bullish' | 'Bearish' | 'Neutral'>('All');
  const [categoryFilter, setCategoryFilter] = useState<'All News' | 'Corporate Earnings' | 'Macro & Fed' | 'Sector Trends'>('All News');
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            News Intelligence
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time market sentiment, automated entity extraction, and multi-asset news impact analysis.
          </p>
        </div>

        {/* Top Right Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5 text-xs font-semibold text-gray-600">
            {(['All', 'Bullish', 'Bearish', 'Neutral'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSentimentFilter(s)}
                className={`px-3 py-1 rounded-md transition-colors ${
                  sentimentFilter === s
                    ? 'bg-[#111827] text-white shadow-xs'
                    : 'hover:text-gray-900 text-gray-600'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 font-medium">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>{dateRange}</span>
            </div>
            <span className="text-[11px] text-gray-400 hidden lg:inline">• Updated 1m ago</span>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Sentiment Index */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <span>Overall Sentiment Index</span>
            <span className="text-emerald-500">☺</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900">64.2</span>
            <span className="text-xs font-semibold text-emerald-600">+4.8 pts</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500 pt-2 border-t border-gray-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Moderately Bullish across tier-1 coverage</span>
          </div>
        </div>

        {/* News Flow Volume */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <span>News Flow Volume</span>
            <span className="text-gray-400">📄</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900">1,428</span>
            <span className="text-xs font-semibold text-emerald-600">+14% vs avg</span>
          </div>
          <p className="mt-3 text-xs text-gray-500 pt-2 border-t border-gray-100">
            Articles tracked and indexed in 24h
          </p>
        </div>

        {/* High Impact Stories */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <span>High Impact Stories</span>
            <span className="text-amber-500">⚡</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900">14</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              Active alerts
            </span>
          </div>
          <p className="mt-3 text-xs text-gray-500 pt-2 border-t border-gray-100">
            Priority market-moving items identified
          </p>
        </div>

        {/* Most Mentioned Ticker */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <span>Most Mentioned Ticker</span>
            <span className="text-blue-500">📈</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900 font-mono">NVDA</span>
            <span className="text-xs font-semibold text-emerald-600">78% Positive</span>
          </div>
          <p className="mt-3 text-xs text-gray-500 pt-2 border-t border-gray-100">
            184 mentions across 32 sources
          </p>
        </div>
      </div>

      {/* Category Tabs & Ticker Filter Pills */}
      <div className="space-y-3">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {(['All News', 'Corporate Earnings', 'Macro & Fed', 'Sector Trends'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                categoryFilter === cat
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Ticker Filter Pills */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-400 font-semibold uppercase text-[11px]">FILTER:</span>
          {['$AAPL', '$NVDA', '$MSFT', '$TSLA'].map((tick) => (
            <button
              key={tick}
              onClick={() =>
                setSelectedTickerFilter(selectedTickerFilter === tick ? null : tick)
              }
              className={`px-2.5 py-1 rounded-md font-mono text-xs font-semibold transition-colors ${
                selectedTickerFilter === tick
                  ? 'bg-[#111827] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tick}
            </button>
          ))}
          {selectedTickerFilter && (
            <button
              onClick={() => setSelectedTickerFilter(null)}
              className="text-[11px] text-gray-400 hover:text-gray-600 ml-2"
            >
              Clear filter
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Articles Feed (2/3) + Side Panels (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Articles Feed */}
        <div className="lg:col-span-2 space-y-4">
          {filteredArticles.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-sm text-gray-500">
              No news articles match the selected filters.
            </div>
          ) : (
            filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs hover:border-gray-300 transition-colors"
              >
                {/* Meta Row */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-gray-900 font-mono">
                    {article.source}
                  </span>
                  <span className="text-xs text-gray-400">{article.timeAgo}</span>

                  {article.impact && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                      ⚡ {article.impact}
                    </span>
                  )}

                  <span
                    className={`ml-auto px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      article.sentiment === 'Bullish'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : article.sentiment === 'Bearish'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-gray-100 text-gray-700 border border-gray-200'
                    }`}
                  >
                    • {article.sentiment} ({article.sentimentPercent}%)
                  </span>
                </div>

                {/* Headline */}
                <h3 className="text-base font-bold text-gray-900 hover:text-black leading-snug cursor-pointer">
                  {article.headline}
                </h3>

                {/* Summary */}
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  {article.summary}
                </p>

                {/* Footer Tags & CTA */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    {article.tickers.map((t) => (
                      <span
                        key={t.symbol}
                        className="px-2 py-0.5 rounded font-mono font-bold bg-gray-100 text-gray-800 text-[11px]"
                      >
                        {t.symbol} {t.change >= 0 ? `+${t.change}%` : `${t.change}%`}
                      </span>
                    ))}
                    <span className="text-[11px] text-gray-400">
                      {article.entityMatchScore}% Entity Match
                    </span>
                  </div>

                  <button
                    onClick={() => navigate('/ai-analyst')}
                    className="inline-flex items-center gap-1 font-semibold text-gray-900 hover:text-black"
                  >
                    <span>Analyze Impact</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Side Panels (1/3) */}
        <div className="space-y-6">
          {/* Sentiment by Sector */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Sentiment by Sector</h3>
              <span className="text-[11px] text-gray-400">24h Net</span>
            </div>

            <div className="space-y-4 mt-4 text-xs">
              {SECTOR_SENTIMENTS.map((sec) => (
                <div key={sec.sector} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800">{sec.sector}</span>
                    <span
                      className={`font-semibold ${
                        sec.status === 'Bullish' ? 'text-emerald-600' : 'text-red-600'
                      }`}
                    >
                      {sec.bullishPercent}% Bullish
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        sec.status === 'Bullish' ? 'bg-emerald-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${sec.bullishPercent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Tickers */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Trending Tickers</h3>
              <span className="text-[11px] text-gray-400">Article Volume</span>
            </div>

            <div className="divide-y divide-gray-100 mt-2">
              {TRENDING_TICKERS.map((t) => (
                <div key={t.symbol} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono font-bold text-gray-900">{t.symbol}</span>
                    <span className="text-gray-400 ml-2">{t.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-gray-600 text-[11px]">{t.volumeChange}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        t.sentiment === 'Bullish'
                          ? 'bg-emerald-50 text-emerald-700'
                          : t.sentiment === 'Bearish'
                          ? 'bg-red-50 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {t.sentiment}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Market Brief */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-bold text-gray-900">AI Market Brief</h3>
            </div>
            <p className="text-xs text-gray-600 mt-3 leading-relaxed">
              Institutional commentary in the trailing 24 hours reflects concentrated positive sentiment around generative AI semiconductor architecture and hyperscale infrastructure spending. Macro narratives remain balanced as bond markets price persistent interest rate trajectories.
            </p>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-start gap-2 text-[11px] text-gray-500">
              <Info className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
              <span>
                Informational synthesis extracted from accredited public news wire feeds. Not financial advice or investment warranty.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

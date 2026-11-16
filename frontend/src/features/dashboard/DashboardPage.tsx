import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, RotateCw, ArrowRight, Bell, ChevronRight } from 'lucide-react';
import { SPX_CHART_DATA } from '@/data/mock/marketData';
import { useMarketData } from '@/context/MarketDataContext';
import { formatCurrency, formatPercent } from '@/utils/formatters';

// Modular Feature Components
import { MarketIndicesGrid } from './components/MarketIndicesGrid';
import { IntradayChart } from './components/IntradayChart';
import { TopMoversCard } from './components/TopMoversCard';
import { DashboardSentimentCard } from './components/DashboardSentimentCard';
import { AIMarketBriefCard } from './components/AIMarketBriefCard';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { watchlist, alerts } = useMarketData();
  const [trendTimeframe, setTrendTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>('1D');
  const [moversTab, setMoversTab] = useState<'gainers' | 'losers'>('gainers');
  const [selectedBenchmark] = useState('S&P 500 (SPX)');
  const [isSyncing, setIsSyncing] = useState(false);

  const chartData = SPX_CHART_DATA[trendTimeframe] || SPX_CHART_DATA['1D'];

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 600);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Market Dashboard</h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Market Open
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Real-time equity indices, technical momentum, and AI market intelligence
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-gray-500 shadow-xs">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>Updated 2m ago</span>
          </div>
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-xs transition-colors"
          >
            <RotateCw
              className={`w-3.5 h-3.5 ${
                isSyncing ? 'animate-spin text-indigo-600' : 'text-gray-500'
              }`}
            />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Top 4 Market Indices Cards */}
      <MarketIndicesGrid />

      {/* Main Analysis Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2/3: Intraday Action Chart & Watchlist Preview */}
        <div className="lg:col-span-2 space-y-6">
          <IntradayChart
            timeframe={trendTimeframe}
            onTimeframeChange={setTrendTimeframe}
            chartData={chartData}
            selectedBenchmark={selectedBenchmark}
          />

          {/* Mini Watchlist Preview */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Watchlist Highlights</h3>
                <p className="text-xs text-gray-400">Quick view of pinned securities</p>
              </div>
              <Link
                to="/watchlist"
                className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1"
              >
                <span>View Full Watchlist</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="divide-y divide-gray-100">
              {watchlist.slice(0, 4).map((w) => {
                const isUp = w.changePercent >= 0;
                return (
                  <div
                    key={w.symbol}
                    onClick={() => navigate(`/markets/${w.symbol}`)}
                    className="py-2.5 flex items-center justify-between hover:bg-gray-50 cursor-pointer px-2 rounded-lg transition-colors text-xs"
                  >
                    <div>
                      <span className="font-mono font-bold text-gray-900 mr-2">{w.symbol}</span>
                      <span className="text-gray-400">{w.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-gray-900 mr-3">
                        {formatCurrency(w.price)}
                      </span>
                      <span
                        className={`font-mono font-bold ${
                          isUp ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {isUp ? '+' : ''}
                        {formatPercent(w.changePercent)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 1/3: Top Movers, Sentiment & AI Brief */}
        <div className="space-y-6">
          <TopMoversCard activeTab={moversTab} onTabChange={setMoversTab} />
          <DashboardSentimentCard />
          <AIMarketBriefCard />
        </div>
      </div>
    </div>
  );
};

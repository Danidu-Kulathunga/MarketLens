import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Clock,
  RotateCw,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Sparkles,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
  MOCK_INDICES,
  MOCK_MARKET_SENTIMENT,
  SPX_CHART_DATA,
  TOP_MOVERS,
} from '@/data/mock/marketData';
import { useMarketData } from '@/context/MarketDataContext';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { watchlist, alerts } = useMarketData();
  const [trendTimeframe, setTrendTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>('1D');
  const [moversTab, setMoversTab] = useState<'gainers' | 'losers'>('gainers');
  const [selectedBenchmark, setSelectedBenchmark] = useState('S&P 500 (SPX)');
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
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Dashboard
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Market Open
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Monitor market performance, news, sentiment, and important changes in one place.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-gray-500 shadow-xs">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>Last updated 2 min ago</span>
          </div>
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 shadow-xs transition-colors"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-black' : 'text-gray-500'}`} />
            <span>Sync</span>
          </button>
        </div>
      </div>

      {/* 4 Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_INDICES.map((idx) => (
          <div
            key={idx.id}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs hover:border-gray-300 transition-colors"
          >
            <div className="flex items-center justify-between text-xs text-gray-400 font-semibold tracking-wider uppercase">
              <span>{idx.type}</span>
              <span className="text-gray-500 font-normal lowercase capitalize">{idx.category}</span>
            </div>
            <div className="mt-3">
              <p className="text-xs text-gray-500 font-medium">{idx.symbol}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold text-gray-900 tracking-tight">
                  {idx.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                <span className="inline-flex items-center text-xs font-semibold text-emerald-600">
                  <TrendingUp className="w-3.5 h-3.5 mr-0.5 inline" />
                  +{idx.changePercent}%
                </span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <span>Prev close</span>
              <span className="font-mono text-gray-600">{idx.prevClose.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        ))}

        {/* 4th Card: Market Sentiment */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs hover:border-gray-300 transition-colors">
          <div className="flex items-center justify-between text-xs font-semibold tracking-wider">
            <span className="text-gray-400 uppercase">AGGREGATE</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {MOCK_MARKET_SENTIMENT.status}
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xs text-gray-500 font-medium">Market Sentiment</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-gray-900 tracking-tight">
                {MOCK_MARKET_SENTIMENT.label}
              </span>
              <span className="text-sm font-bold text-emerald-600">
                {MOCK_MARKET_SENTIMENT.percent}%
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
            <span>Consensus source</span>
            <span className="text-gray-600 font-medium">{MOCK_MARKET_SENTIMENT.sources}</span>
          </div>
        </div>
      </div>

      {/* Main Row: Market Trend (2/3) + My Watchlist (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-gray-900">Market Trend</h3>
                  <span className="text-xs text-gray-400 font-medium">• Intraday Trajectory</span>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xs text-gray-500 font-medium">S&P 500 Index</span>
                  <span className="text-lg font-bold text-gray-900">5,087.24</span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700">
                    +1.24% today
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedBenchmark}
                  onChange={(e) => setSelectedBenchmark(e.target.value)}
                  className="text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="S&P 500 (SPX)">S&P 500 (SPX)</option>
                  <option value="NASDAQ (IXIC)">NASDAQ (IXIC)</option>
                  <option value="Dow Jones (DJI)">Dow Jones (DJI)</option>
                </select>

                <div className="flex items-center bg-gray-100 rounded-lg p-0.5 text-xs font-semibold text-gray-600">
                  {(['1D', '1W', '1M', '3M', '1Y'] as const).map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTrendTimeframe(tf)}
                      className={`px-2 py-1 rounded-md transition-colors ${
                        trendTimeframe === tf
                          ? 'bg-[#111827] text-white'
                          : 'hover:text-gray-900 text-gray-600'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recharts Line Chart */}
            <div className="h-64 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 11, fill: '#9CA3AF' }}
                    axisLine={{ stroke: '#E5E7EB' }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={['auto', 'auto']}
                    tick={{ fontSize: 11, fill: '#9CA3AF' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(val) => val.toLocaleString()}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111827',
                      borderRadius: '8px',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '12px',
                      padding: '8px 12px',
                    }}
                    itemStyle={{ color: '#10B981' }}
                    formatter={(val: number) => [`${val.toLocaleString()} (+1.24%)`, 'S&P 500']}
                    labelStyle={{ color: '#9CA3AF', marginBottom: '2px' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#111827"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 5, fill: '#10B981', stroke: '#ffffff', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* My Watchlist Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-semibold text-gray-900">My Watchlist</h3>
                <p className="text-xs text-gray-400">Key tracked equities</p>
              </div>
              <Link
                to="/watchlist"
                className="text-xs font-medium text-gray-700 hover:text-black flex items-center gap-0.5"
              >
                <span>View all</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-gray-100 mt-2">
              {watchlist.slice(0, 4).map((item) => (
                <div
                  key={item.symbol}
                  onClick={() => navigate(`/markets/${item.symbol}`)}
                  className="py-3 flex items-center justify-between hover:bg-gray-50/80 px-2 rounded-lg cursor-pointer transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">{item.symbol}</span>
                      <span className="text-xs text-gray-400">• {item.name.replace(' Inc.', '').replace(' Corp.', '')}</span>
                    </div>
                    <span className="text-[11px] text-gray-400">Vol 48.2M</span>
                  </div>

                  {/* Sparkline mini representation */}
                  <div className="hidden sm:block w-16 h-6">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 60 20">
                      <path
                        d="M0,15 Q15,5 30,12 T60,4"
                        fill="none"
                        stroke={item.changePercent >= 0 ? '#10B981' : '#EF4444'}
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900 font-mono">
                      ${item.price.toFixed(2)}
                    </p>
                    <p
                      className={`text-xs font-semibold ${
                        item.changePercent >= 0 ? 'text-emerald-600' : 'text-red-600'
                      }`}
                    >
                      {item.changePercent >= 0 ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
            <span>Real-time composite quotes</span>
            <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Stream active
            </span>
          </div>
        </div>
      </div>

      {/* Row 3: Top Movers (1/3), Market Sentiment (1/3), Active Alerts (1/3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top Movers */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-semibold text-gray-900">Top Movers</h3>
              <div className="flex items-center bg-gray-100 rounded-lg p-0.5 text-xs font-semibold">
                <button
                  onClick={() => setMoversTab('gainers')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    moversTab === 'gainers' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500'
                  }`}
                >
                  Gainers
                </button>
                <button
                  onClick={() => setMoversTab('losers')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    moversTab === 'losers' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500'
                  }`}
                >
                  Losers
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-100 mt-2">
              {TOP_MOVERS[moversTab].map((m) => (
                <div
                  key={m.symbol}
                  onClick={() => navigate(`/markets/${m.symbol}`)}
                  className="py-2.5 flex items-center justify-between hover:bg-gray-50 px-2 rounded-lg cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-900">{m.symbol}</span>
                    <span className="text-xs text-gray-400">{m.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-medium text-gray-900">
                      ${m.price.toFixed(2)}
                    </span>
                    <span
                      className={`text-xs font-semibold min-w-14 text-right ${
                        m.changePercent >= 0 ? 'text-emerald-600' : 'text-red-600'
                      }`}
                    >
                      {m.changePercent >= 0 ? `+${m.changePercent.toFixed(2)}%` : `${m.changePercent.toFixed(2)}%`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/markets"
            className="pt-3 border-t border-gray-100 text-xs font-medium text-gray-600 hover:text-black flex items-center justify-between"
          >
            <span>View all active markets</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Market Sentiment */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-semibold text-gray-900">Market Sentiment</h3>
              <span className="text-xs text-gray-400">N=1,420 articles</span>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-gray-500 font-medium">Overall sentiment:</span>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-semibold rounded-full border border-emerald-200 text-[11px]">
                  Moderately Positive
                </span>
              </div>

              {/* Stacked bar */}
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden flex my-4">
                <div style={{ width: '56%' }} className="bg-emerald-500 h-full" />
                <div style={{ width: '29%' }} className="bg-gray-400 h-full" />
                <div style={{ width: '15%' }} className="bg-red-500 h-full" />
              </div>

              <div className="space-y-2 mt-4 text-xs font-medium">
                <div className="flex items-center justify-between text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Positive</span>
                  </div>
                  <span className="font-semibold text-gray-900">56%</span>
                </div>
                <div className="flex items-center justify-between text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-400" />
                    <span>Neutral</span>
                  </div>
                  <span className="font-semibold text-gray-900">29%</span>
                </div>
                <div className="flex items-center justify-between text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>Negative</span>
                  </div>
                  <span className="font-semibold text-gray-900">15%</span>
                </div>
              </div>
            </div>
          </div>

          <Link
            to="/news"
            className="pt-3 border-t border-gray-100 text-xs font-medium text-gray-600 hover:text-black flex items-center justify-between"
          >
            <span>View news intelligence</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Active Alerts */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-semibold text-gray-900">Active Alerts</h3>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                {alerts.length} new
              </span>
            </div>

            <div className="divide-y divide-gray-100 mt-2">
              <div className="py-2.5">
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-900">
                      AAPL crossed target threshold $175.00
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">5 min ago • Info</p>
                  </div>
                </div>
              </div>

              <div className="py-2.5">
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-900">
                      NVDA volatility exceeded intraday limit
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">26 min ago • Warning</p>
                  </div>
                </div>
              </div>

              <div className="py-2.5">
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-900">
                      MSFT volume spike: moved +2% today
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">42 min ago • Info</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link
            to="/watchlist"
            className="pt-3 border-t border-gray-100 text-xs font-medium text-gray-600 hover:text-black flex items-center justify-between"
          >
            <span>Manage alert triggers</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Row 4: Latest News Intelligence (2/3) + AI Market Brief (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest News Intelligence */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Latest News Intelligence</h3>
              <p className="text-xs text-gray-400">Real time indexed financial wire</p>
            </div>
            <Link
              to="/news"
              className="text-xs font-medium text-gray-700 hover:text-black flex items-center gap-0.5"
            >
              <span>View all news</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-gray-100 mt-3 space-y-3">
            {/* Story 1 */}
            <div className="pt-3 first:pt-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded font-mono">
                  AAPL
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                  Positive
                </span>
                <span className="text-xs text-gray-400">• Reuters</span>
                <span className="text-xs text-gray-400 ml-auto">12 min ago</span>
              </div>
              <h4
                onClick={() => navigate('/markets/AAPL')}
                className="text-sm font-semibold text-gray-900 hover:text-black cursor-pointer leading-snug"
              >
                Apple reports stronger-than-expected quarterly results driven by services acceleration
              </h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
                Revenue exceeded institutional estimates with expansion across international subscriptions and strong overseas enterprise client demand.
              </p>
            </div>

            {/* Story 2 */}
            <div className="pt-3">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded font-mono">
                  MARKET
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full border border-gray-200">
                  Neutral
                </span>
                <span className="text-xs text-gray-400">• Bloomberg</span>
                <span className="text-xs text-gray-400 ml-auto">38 min ago</span>
              </div>
              <h4
                onClick={() => navigate('/news')}
                className="text-sm font-semibold text-gray-900 hover:text-black cursor-pointer leading-snug"
              >
                Federal Reserve signals cautious approach to upcoming rate cycle adjustments
              </h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
                Monetary committee officials reaffirm rigorous commitment to baseline inflation benchmarks prior to undertaking benchmark easing procedures.
              </p>
            </div>

            {/* Story 3 */}
            <div className="pt-3">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded font-mono">
                  NVDA
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                  Positive
                </span>
                <span className="text-xs text-gray-400">• Reuters</span>
                <span className="text-xs text-gray-400 ml-auto">1 hr ago</span>
              </div>
              <h4
                onClick={() => navigate('/markets/NVDA')}
                className="text-sm font-semibold text-gray-900 hover:text-black cursor-pointer leading-snug"
              >
                NVIDIA shares advance following robust semiconductor data center orders
              </h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
                Enterprise artificial intelligence server hardware deployments continue to bolster backlog orders into fiscal Q3.
              </p>
            </div>
          </div>
        </div>

        {/* AI Market Brief */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <h3 className="text-base font-semibold text-gray-900">AI Market Brief</h3>
              </div>
              <span className="text-[11px] text-gray-400">4 min ago</span>
            </div>

            <p className="text-xs text-gray-600 mt-3 leading-relaxed">
              Technology stocks are demonstrating positive momentum today, led by sustained semiconductor orders. Market breadth remains moderately positive, although dispersion has widened slightly following central bank statements.
            </p>

            <div className="mt-5">
              <p className="text-[11px] font-semibold text-gray-400 tracking-wider uppercase">
                KEY OBSERVATIONS
              </p>
              <ul className="mt-2.5 space-y-2.5 text-xs text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Large-cap tech exhibiting consistent relative strength</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>NVIDIA recording significant volume-backed advance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Institutional news tone stabilized at 56% positive consensus</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={() => navigate('/ai-analyst')}
              className="w-full bg-[#111827] text-white py-2.5 px-4 rounded-lg text-xs font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>MarketLens AI Analyst</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

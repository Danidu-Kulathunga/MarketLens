import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Star,
  Plus,
  Download,
  Share2,
  Check,
  ChevronRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { ALL_STOCKS, AAPL_STOCK_DETAILS, PEER_BENCHMARKS } from '@/data/mock/marketData';
import { useMarketData } from '@/context/MarketDataContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export const SingleStockPage: React.FC = () => {
  const { symbol = 'AAPL' } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const { watchlist, toggleWatchlist, addHolding, holdings } = useMarketData();

  const stock = ALL_STOCKS.find((s) => s.symbol.toUpperCase() === symbol.toUpperCase()) || AAPL_STOCK_DETAILS;

  const [activeTab, setActiveTab] = useState<'technicals' | 'financials' | 'news' | 'ai'>('technicals');
  const [timeRange, setTimeRange] = useState<'1D' | '5D' | '1M' | '3M' | '6M' | '1Y' | 'ALL'>('3M');
  const [isAddPortfolioOpen, setIsAddPortfolioOpen] = useState(false);
  const [sharesToAdd, setSharesToAdd] = useState('20');
  const [priceToAdd, setPriceToAdd] = useState(stock.price.toString());

  const isInWatchlist = watchlist.some((w) => w.symbol === stock.symbol);
  const isOwned = holdings.some((h) => h.symbol === stock.symbol);

  const handleAddToPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseFloat(sharesToAdd);
    const avgP = parseFloat(priceToAdd);
    if (!isNaN(qty) && !isNaN(avgP) && qty > 0) {
      addHolding({
        symbol: stock.symbol,
        companyName: stock.name,
        shares: qty,
        avgCost: avgP,
        currentPrice: stock.price,
        purchaseDate: new Date().toISOString().split('T')[0],
        sector: stock.sector,
      });
      setIsAddPortfolioOpen(false);
      navigate('/portfolio');
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
        <Link to="/markets" className="hover:text-gray-900">Markets</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span>US Equities</span>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-gray-900 font-bold">{stock.symbol}</span>
      </nav>

      {/* Stock Main Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {stock.name}
            </h1>
            <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-gray-100 text-gray-800">
              {stock.symbol}
            </span>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-600">
              {stock.exchange}
            </span>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {stock.industry}
            </span>
          </div>

          <div className="flex flex-wrap items-baseline gap-3 mt-2">
            <span className="text-4xl font-extrabold text-gray-900 tracking-tight">
              ${stock.price.toFixed(2)}
            </span>
            <span className="inline-flex items-center text-base font-bold text-emerald-600">
              <TrendingUp className="w-4 h-4 mr-1 inline" />
              +${stock.change.toFixed(2)} (+{stock.changePercent.toFixed(2)}%)
            </span>
          </div>

          <p className="text-xs text-gray-500 mt-1">
            Market Open • Real-time USD • Volume: {stock.volume}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleWatchlist(stock.symbol)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-colors shadow-xs ${
              isInWatchlist
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${isInWatchlist ? 'fill-amber-400 text-amber-500' : 'text-gray-400'}`} />
            <span>{isInWatchlist ? 'In Watchlist' : '+ Add to Watchlist'}</span>
          </button>

          <button
            onClick={() => setIsAddPortfolioOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#111827] text-white hover:bg-black transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isOwned ? 'Add More Shares' : '+ Add to Portfolio'}</span>
          </button>

          <button
            className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 shadow-xs"
            title="Download stock data"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Day Range */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            DAY RANGE
          </span>
          <div className="flex items-center justify-between text-sm font-bold text-gray-900 mt-2">
            <span>${stock.dayLow.toFixed(2)}</span>
            <span>${stock.dayHigh.toFixed(2)}</span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-gray-100 h-2 rounded-full mt-2 relative overflow-hidden">
            <div
              className="bg-black h-full rounded-full"
              style={{
                width: `${((stock.price - stock.dayLow) / (stock.dayHigh - stock.dayLow)) * 100}%`,
              }}
            />
          </div>
          <p className="text-[11px] text-gray-500 mt-2">
            Current: <span className="font-semibold text-gray-900">${stock.price.toFixed(2)}</span>
          </p>
        </div>

        {/* 2. 52-Week Range */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            52-WEEK RANGE
          </span>
          <div className="flex items-center justify-between text-sm font-bold text-gray-900 mt-2">
            <span>${stock.week52Low.toFixed(2)}</span>
            <span>${stock.week52High.toFixed(2)}</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full mt-2 relative overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full"
              style={{
                width: `${((stock.price - stock.week52Low) / (stock.week52High - stock.week52Low)) * 100}%`,
              }}
            />
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-2">
            +19.2% from low
          </p>
        </div>

        {/* 3. Market Cap */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            MARKET CAP
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-gray-900">{stock.marketCap}</span>
            <span className="text-xs text-gray-500 font-medium">Mega-Cap</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-2">
            Shares: {stock.shares} • {stock.rank}
          </p>
        </div>

        {/* 4. Volume / Avg */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              VOLUME / AVG
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Typical Pace
            </span>
          </div>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-2xl font-bold text-gray-900">{stock.volume}</span>
            <span className="text-xs text-gray-400">/ {stock.avgVolume} avg</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-2">
            Relative Vol: 0.90x
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex items-center gap-8 -mb-px text-sm font-semibold">
          <button
            onClick={() => setActiveTab('technicals')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'technicals'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Overview & Technicals
          </button>
          <button
            onClick={() => setActiveTab('financials')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'financials'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Financials & Earnings
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'news'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            News & Sentiment
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'ai'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            AI Copilot Insights
          </button>
        </div>
      </div>

      {/* Tab 1: Technicals (Default view matching Single Stock.png) */}
      {activeTab === 'technicals' && (
        <div className="space-y-6">
          {/* Main Chart Container */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
            {/* Chart Header & Legend */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-100">
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-gray-900">Price (Close)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-blue-500" />
                  <span className="text-gray-600">SMA 50 (${stock.sma50.toFixed(2)})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-amber-500" />
                  <span className="text-gray-600">SMA 200 (${stock.sma200.toFixed(2)})</span>
                </div>
              </div>

              {/* Time Range Pills */}
              <div className="flex items-center bg-gray-100 rounded-lg p-0.5 text-xs font-semibold text-gray-600">
                {(['1D', '5D', '1M', '3M', '6M', '1Y', 'ALL'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setTimeRange(r)}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      timeRange === r
                        ? 'bg-[#111827] text-white shadow-xs'
                        : 'hover:text-gray-900 text-gray-600'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Chart */}
            <div className="h-72 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={stock.priceHistory} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                  <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#9CA3AF' }} tickLine={false} axisLine={{ stroke: '#E5E7EB' }} />
                  <YAxis domain={['dataMin - 5', 'dataMax + 5']} tick={{ fontSize: 11, fill: '#9CA3AF' }} orientation="left" axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111827',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                    formatter={(val: number) => [`$${val.toFixed(2)}`, 'Price']}
                  />
                  <ReferenceLine y={180.0} label={{ value: 'Resistance', position: 'right', fill: '#9CA3AF', fontSize: 10 }} stroke="#E5E7EB" strokeDasharray="3 3" />
                  <ReferenceLine y={160.0} label={{ value: 'Support Floor', position: 'right', fill: '#9CA3AF', fontSize: 10 }} stroke="#E5E7EB" strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="price" stroke="#10B981" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="sma50" stroke="#3B82F6" strokeWidth={1.5} dot={false} strokeDasharray="4 4" />
                  <Line type="monotone" dataKey="sma200" stroke="#F59E0B" strokeWidth={1.5} dot={false} strokeDasharray="4 4" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Volume sub-chart */}
            <div className="h-20 w-full mt-2 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
                <span>Daily Volume (Shares)</span>
                <span>Avg: {stock.avgVolume}</span>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={stock.priceHistory} margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                  <Bar dataKey="volume" fill="#10B981" opacity={0.6} radius={[2, 2, 0, 0]} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Diagnostics (2/3) + AI Analyst Note (1/3) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: 3-Month Momentum & Trend Diagnostics */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold">📈</span>
                    <h3 className="text-base font-semibold text-gray-900">
                      3-Month Momentum & Trend Diagnostics
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Moderately Bullish (Score: {stock.momentumScore}/100)
                  </span>
                </div>

                {/* 3 mini cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div className="bg-gray-50/70 rounded-xl p-3.5 border border-gray-100">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                      RSI (14-DAY)
                    </span>
                    <p className="text-xl font-bold text-gray-900 mt-1">{stock.rsi14}</p>
                    <p className="text-[11px] text-emerald-600 font-medium mt-1">Neutral-Bullish momentum</p>
                  </div>

                  <div className="bg-gray-50/70 rounded-xl p-3.5 border border-gray-100">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                      MACD (12, 26, 9)
                    </span>
                    <p className="text-xl font-bold text-gray-900 mt-1">+{stock.macd}</p>
                    <p className="text-[11px] text-emerald-600 font-medium mt-1">Signal line crossover +0.42</p>
                  </div>

                  <div className="bg-gray-50/70 rounded-xl p-3.5 border border-gray-100">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                      20-DAY VOLATILITY
                    </span>
                    <p className="text-xl font-bold text-gray-900 mt-1">{stock.volatility20d}%</p>
                    <p className="text-[11px] text-gray-500 font-medium mt-1">Low-to-Moderate risk</p>
                  </div>
                </div>

                {/* Bullet Points */}
                <ul className="mt-5 space-y-2.5 text-xs text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                    <span>
                      <strong className="text-gray-900">SMA Golden Alignment:</strong> The stock trades +1.9% above its 50-day SMA (${stock.sma50.toFixed(2)}) and +4.1% above its 200-day SMA (${stock.sma200.toFixed(2)}), indicating sustained medium-term structural support.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                    <span>
                      <strong className="text-gray-900">Accumulation Trend:</strong> Volume on up-days over the last 60 sessions has outpaced down-day selling volume by 18%, suggesting consistent institutional accumulation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                    <span>
                      <strong className="text-gray-900">Key Thresholds:</strong> Overhead resistance sits at $180.50 (Feb swing high); immediate support established at $171.80.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: MarketLens AI Analyst Note */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                  <div className="w-5 h-5 rounded bg-black text-white flex items-center justify-center">
                    <Zap className="w-3 h-3 text-emerald-400" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900">
                    MarketLens AI Analyst Note
                  </h3>
                </div>

                <p className="text-xs text-gray-600 mt-3 italic leading-relaxed">
                  "Services revenue expansion (+11.8% YoY) and steady gross margins of 45.9% continue to cushion cyclical hardware replacement cadence. Supply chain checks in Greater China show stabilizing iPhone demand ahead of upcoming AI system feature deployments."
                </p>

                <div className="mt-5 space-y-2 pt-4 border-t border-gray-100 text-xs">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Forward P/E</span>
                    <span className="font-semibold text-gray-900">{stock.forwardPe}x</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span>PEG Ratio</span>
                    <span className="font-semibold text-gray-900">{stock.pegRatio}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span>FCF Yield</span>
                    <span className="font-semibold text-gray-900">{stock.fcfYield}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 mt-4">
                <p className="text-[10px] text-gray-400 leading-normal">
                  Analytical synthesis based on available market and news data. Not financial advice or investment recommendation.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Table: Mega-Cap Technology Peer Benchmarks */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-base font-semibold text-gray-900">
                Mega-Cap Technology Peer Benchmarks
              </h3>
              <span className="text-xs text-gray-400 font-medium">
                Same Sector: {stock.sector}
              </span>
            </div>

            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    <th className="py-3 px-2">ASSET</th>
                    <th className="py-3 px-4">COMPANY</th>
                    <th className="py-3 px-4">LAST PRICE</th>
                    <th className="py-3 px-4">DAY CHANGE</th>
                    <th className="py-3 px-4">MARKET CAP</th>
                    <th className="py-3 px-4">P/E (TTM)</th>
                    <th className="py-3 px-2 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {PEER_BENCHMARKS.map((peer) => (
                    <tr key={peer.asset} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-2 font-mono font-bold text-gray-900">
                        {peer.asset}
                      </td>
                      <td className="py-3 px-4 text-gray-700">{peer.company}</td>
                      <td className="py-3 px-4 font-mono font-medium text-gray-900">
                        ${peer.lastPrice.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 font-semibold text-emerald-600">
                        +{peer.dayChange.toFixed(2)}%
                      </td>
                      <td className="py-3 px-4 text-gray-600">{peer.marketCap}</td>
                      <td className="py-3 px-4 font-mono text-gray-600">{peer.peTtm}</td>
                      <td className="py-3 px-2 text-right">
                        <button
                          onClick={() => navigate(`/markets/${peer.asset}`)}
                          className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Compare
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Financials & Earnings */}
      {activeTab === 'financials' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-semibold text-gray-900">Financial Performance & Earnings</h3>
          <p className="text-sm text-gray-500">
            Historical quarterly financial metrics for {stock.name} ({stock.symbol}).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <span className="text-xs text-gray-400 uppercase font-semibold">Revenue (TTM)</span>
              <p className="text-2xl font-bold text-gray-900 mt-1">$385.7B</p>
              <p className="text-xs text-emerald-600 font-medium mt-1">+4.2% YoY</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <span className="text-xs text-gray-400 uppercase font-semibold">Net Income</span>
              <p className="text-2xl font-bold text-gray-900 mt-1">$101.4B</p>
              <p className="text-xs text-emerald-600 font-medium mt-1">+7.8% Margin expansion</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <span className="text-xs text-gray-400 uppercase font-semibold">EPS (Diluted)</span>
              <p className="text-2xl font-bold text-gray-900 mt-1">$6.58</p>
              <p className="text-xs text-emerald-600 font-medium mt-1">Beats consensus by $0.14</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: News & Sentiment */}
      {activeTab === 'news' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-base font-semibold text-gray-900">Filtered News for {stock.symbol}</h3>
            <Link to="/news" className="text-xs font-semibold text-emerald-600 hover:underline">
              Open Full News Intelligence →
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="py-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full">Bullish</span>
                <span className="text-xs text-gray-400">Reuters • 18 min ago</span>
              </div>
              <h4 className="text-sm font-semibold text-gray-900">Apple reports stronger quarterly revenue driven by services expansion</h4>
              <p className="text-xs text-gray-500 mt-1">Enterprise client orders and subscriptions growth bolstered bottom line returns.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: AI Copilot Insights */}
      {activeTab === 'ai' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <h3 className="text-base font-semibold text-gray-900">MarketLens AI Copilot Analysis</h3>
            </div>
            <Link to="/ai-analyst" className="text-xs font-semibold text-emerald-600 hover:underline">
              Query in AI Analyst Workspace →
            </Link>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            Quantitative assessment of {stock.symbol} reveals a 74/100 composite score. Key positives include consistent 50-day moving average support and robust institutional cash flow yields.
          </p>
        </div>
      )}

      {/* Modal: Add to Portfolio */}
      <Modal
        isOpen={isAddPortfolioOpen}
        onClose={() => setIsAddPortfolioOpen(false)}
        title={`Add ${stock.symbol} to Your Portfolio`}
        subtitle="Record your existing or new holding with purchase price and quantity."
        footer={
          <>
            <Button variant="outline" onClick={() => setIsAddPortfolioOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddToPortfolio}>
              Save Holding
            </Button>
          </>
        }
      >
        <form onSubmit={handleAddToPortfolio} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Stock Symbol</label>
            <input
              type="text"
              value={stock.symbol}
              disabled
              className="w-full bg-gray-100 border border-gray-200 px-3.5 py-2 rounded-lg text-sm font-mono text-gray-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Number of Shares</label>
            <input
              type="number"
              min="0.01"
              step="any"
              value={sharesToAdd}
              onChange={(e) => setSharesToAdd(e.target.value)}
              required
              className="w-full border border-gray-200 px-3.5 py-2 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Purchase / Average Price ($)</label>
            <input
              type="number"
              min="0.01"
              step="any"
              value={priceToAdd}
              onChange={(e) => setPriceToAdd(e.target.value)}
              required
              className="w-full border border-gray-200 px-3.5 py-2 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

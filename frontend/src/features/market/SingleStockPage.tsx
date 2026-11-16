import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Zap, Sparkles } from 'lucide-react';
import { ALL_STOCKS, AAPL_STOCK_DETAILS, PEER_BENCHMARKS } from '@/data/mock/marketData';
import { useMarketData } from '@/context/MarketDataContext';

// Modular Feature Components
import { StockHeader } from './components/StockHeader';
import { StockMetricsGrid } from './components/StockMetricsGrid';
import { StockPriceChart } from './components/StockPriceChart';
import { PeerComparisonTable } from './components/PeerComparisonTable';
import { AddToPortfolioModal } from './components/AddToPortfolioModal';

export const SingleStockPage: React.FC = () => {
  const { symbol = 'AAPL' } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const { watchlist, toggleWatchlist, addHolding, holdings } = useMarketData();

  const stock =
    ALL_STOCKS.find((s) => s.symbol.toUpperCase() === symbol.toUpperCase()) || AAPL_STOCK_DETAILS;

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
      {/* Stock Main Header with Live Price & Quick Actions */}
      <StockHeader
        stock={stock}
        isInWatchlist={isInWatchlist}
        isOwned={isOwned}
        onToggleWatchlist={() => toggleWatchlist(stock.symbol)}
        onOpenAddPortfolio={() => setIsAddPortfolioOpen(true)}
      />

      {/* High-Level Stock Metrics Grid */}
      <StockMetricsGrid stock={stock} />

      {/* Main Analysis Chart and Technical Momentum Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <StockPriceChart
            data={stock.priceHistory}
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
          />
          <PeerComparisonTable peers={PEER_BENCHMARKS} />
        </div>

        {/* Right Sidebar: Technical Indicators & AI Summary */}
        <div className="space-y-6">
          {/* Technical Diagnostics Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-gray-900 text-sm">Momentum Diagnostics</h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                Bullish
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-gray-50">
                <span className="text-gray-500 font-medium">Relative Strength (RSI 14)</span>
                <span className="font-mono font-bold text-gray-900">{stock.rsi14 || 58.4}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-50">
                <span className="text-gray-500 font-medium">MACD (12, 26, 9)</span>
                <span className="font-mono font-bold text-emerald-600">
                  +{stock.macd || 2.15}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-50">
                <span className="text-gray-500 font-medium">SMA 50 vs SMA 200</span>
                <span className="font-mono font-bold text-emerald-600">Golden Cross</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-500 font-medium">20-Day Historical Volatility</span>
                <span className="font-mono font-bold text-gray-900">
                  {stock.volatility20d || 18.2}%
                </span>
              </div>
            </div>
          </div>

          {/* AI Research Note Card */}
          <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 rounded-xl p-5 text-white shadow-md relative overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <h3 className="font-bold text-sm text-indigo-200">AI Quantitative Thesis</h3>
            </div>
            <p className="text-xs text-indigo-100/90 leading-relaxed">
              Consolidation above the 50-day moving average suggests strong institutional accumulation.
              RSI indicates room for expansion prior to overbought thresholds.
            </p>
            <div className="mt-4 pt-3 border-t border-indigo-800/60 flex items-center justify-between text-[11px] text-indigo-300">
              <span>Confidence: 78%</span>
              <button
                onClick={() => navigate('/ai-analyst')}
                className="hover:text-white font-semibold underline"
              >
                Open Deep Thesis →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add To Portfolio Modal */}
      <AddToPortfolioModal
        isOpen={isAddPortfolioOpen}
        onClose={() => setIsAddPortfolioOpen(false)}
        onSubmit={handleAddToPortfolio}
        symbol={stock.symbol}
        sharesToAdd={sharesToAdd}
        setSharesToAdd={setSharesToAdd}
        priceToAdd={priceToAdd}
        setPriceToAdd={setPriceToAdd}
      />
    </div>
  );
};

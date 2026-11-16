import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  Star,
  Plus,
  Check,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { StockSummary } from '@/types';
import { formatCurrency, formatPercent } from '@/utils/formatters';

interface StockHeaderProps {
  stock: StockSummary;
  isInWatchlist: boolean;
  isOwned: boolean;
  onToggleWatchlist: () => void;
  onOpenAddPortfolio: () => void;
}

export const StockHeader: React.FC<StockHeaderProps> = ({
  stock,
  isInWatchlist,
  isOwned,
  onToggleWatchlist,
  onOpenAddPortfolio,
}) => {
  const isUp = stock.change >= 0;

  return (
    <div className="space-y-4">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
        <Link to="/markets" className="hover:text-gray-900 transition-colors">
          Markets
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span>{stock.exchange || 'US Equities'}</span>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-gray-900 font-bold">{stock.symbol}</span>
      </nav>

      {/* Main Stock Banner */}
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
              {stock.industry || stock.sector}
            </span>
          </div>

          <div className="flex flex-wrap items-baseline gap-3 mt-2">
            <span className="text-4xl font-extrabold text-gray-900 tracking-tight">
              {formatCurrency(stock.price)}
            </span>
            <span
              className={`inline-flex items-center text-base font-bold ${
                isUp ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {isUp ? (
                <TrendingUp className="w-4 h-4 mr-1 inline" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1 inline" />
              )}
              {isUp ? '+' : ''}
              {formatCurrency(stock.change)} ({formatPercent(stock.changePercent)})
            </span>
            <span className="text-xs text-gray-400 font-medium">Real-Time Market Data</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant={isInWatchlist ? 'primary' : 'outline'}
            size="sm"
            onClick={onToggleWatchlist}
          >
            <Star
              className={`w-4 h-4 mr-1.5 ${isInWatchlist ? 'fill-current text-white' : ''}`}
            />
            {isInWatchlist ? 'Watchlisted' : 'Add to Watchlist'}
          </Button>

          <Button
            variant={isOwned ? 'secondary' : 'primary'}
            size="sm"
            onClick={onOpenAddPortfolio}
          >
            {isOwned ? (
              <>
                <Check className="w-4 h-4 mr-1.5 text-emerald-600" />
                Owned in Portfolio
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-1.5" />
                Add to Portfolio
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

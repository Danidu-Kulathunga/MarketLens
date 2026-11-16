import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { ALL_STOCKS } from '@/data/mock/marketData';
import { useMarketData } from '@/context/MarketDataContext';
import { MarketIndicesGrid } from '@/features/dashboard/components/MarketIndicesGrid';
import { EquitiesTable } from './components/EquitiesTable';

export const MarketsPage: React.FC = () => {
  const { watchlist, toggleWatchlist } = useMarketData();
  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('All');

  const sectors = ['All', 'Technology', 'Consumer Cyclical', 'Communication Services'];

  const filteredStocks = ALL_STOCKS.filter((s) => {
    const matchesSearch =
      s.symbol.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase());
    const matchesSector = selectedSector === 'All' || s.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Markets Overview</h1>
        <p className="text-xs text-gray-500 mt-1">
          Explore global market indices, sector performance, and deep equity analytics
        </p>
      </div>

      {/* Indices Overview Cards */}
      <MarketIndicesGrid />

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search equities by name or ticker..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-gray-50 text-gray-900 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
          />
        </div>

        {/* Sector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-gray-400 font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Sector:
          </span>
          {sectors.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedSector === sec
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Equities Table */}
      <EquitiesTable
        stocks={filteredStocks}
        watchlist={watchlist}
        onToggleWatchlist={toggleWatchlist}
      />
    </div>
  );
};

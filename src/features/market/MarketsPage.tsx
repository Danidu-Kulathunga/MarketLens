import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, TrendingDown, ArrowUpRight, Filter } from 'lucide-react';
import { ALL_STOCKS, MOCK_INDICES } from '@/data/mock/marketData';
import { useMarketData } from '@/context/MarketDataContext';

export const MarketsPage: React.FC = () => {
  const navigate = useNavigate();
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
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Markets Overview
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Explore global market indices, sector performance, and deep equity analytics.
        </p>
      </div>

      {/* Indices Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {MOCK_INDICES.map((idx) => (
          <div
            key={idx.id}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs"
          >
            <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase tracking-wider">
              <span>{idx.symbol}</span>
              <span className="text-gray-500 normal-case">{idx.category}</span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">
                {idx.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-xs font-semibold text-emerald-600">
                +{idx.changePercent}%
              </span>
            </div>
            <div className="mt-3 text-xs text-gray-400 flex items-center justify-between">
              <span>Day High: {idx.high.toLocaleString()}</span>
              <span>Day Low: {idx.low.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search equities by name or ticker..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 text-sm text-gray-900 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black focus:bg-white"
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
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedSector === sec
                  ? 'bg-[#111827] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Equities Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">Tracked Equities</h3>
          <span className="text-xs text-gray-400">{filteredStocks.length} instruments</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                <th className="py-3 px-6">TICKER</th>
                <th className="py-3 px-4">COMPANY NAME</th>
                <th className="py-3 px-4">SECTOR</th>
                <th className="py-3 px-4">PRICE</th>
                <th className="py-3 px-4">DAY CHANGE</th>
                <th className="py-3 px-4">MARKET CAP</th>
                <th className="py-3 px-4">VOLUME</th>
                <th className="py-3 px-4">MOMENTUM</th>
                <th className="py-3 px-6 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStocks.map((s) => {
                const inWatch = watchlist.some((w) => w.symbol === s.symbol);
                return (
                  <tr
                    key={s.symbol}
                    className="hover:bg-gray-50/80 transition-colors cursor-pointer"
                    onClick={() => navigate(`/markets/${s.symbol}`)}
                  >
                    <td className="py-3.5 px-6 font-mono font-bold text-gray-900">
                      {s.symbol}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-800">{s.name}</td>
                    <td className="py-3.5 px-4 text-gray-500">{s.sector}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-gray-900">
                      ${s.price.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 font-semibold">
                      <span
                        className={`inline-flex items-center ${
                          s.changePercent >= 0 ? 'text-emerald-600' : 'text-red-600'
                        }`}
                      >
                        {s.changePercent >= 0 ? (
                          <TrendingUp className="w-3.5 h-3.5 mr-0.5 inline" />
                        ) : (
                          <TrendingDown className="w-3.5 h-3.5 mr-0.5 inline" />
                        )}
                        {s.changePercent >= 0 ? `+${s.changePercent.toFixed(2)}%` : `${s.changePercent.toFixed(2)}%`}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 font-mono">{s.marketCap}</td>
                    <td className="py-3.5 px-4 text-gray-600 font-mono">{s.volume}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700">
                        {s.momentumScore}/100
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => toggleWatchlist(s.symbol)}
                          className={`p-1.5 rounded-lg border text-xs font-semibold ${
                            inWatch ? 'bg-amber-50 text-amber-600 border-amber-200' : 'hover:bg-gray-100 border-gray-200 text-gray-500'
                          }`}
                          title={inWatch ? 'Remove from Watchlist' : 'Add to Watchlist'}
                        >
                          ★
                        </button>
                        <button
                          onClick={() => navigate(`/markets/${s.symbol}`)}
                          className="px-2.5 py-1 rounded-lg bg-[#111827] text-white text-xs font-medium hover:bg-black flex items-center gap-1"
                        >
                          <span>Analyze</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Plus, Bell, Search } from 'lucide-react';
import { useMarketData } from '@/context/MarketDataContext';
import { ALL_STOCKS } from '@/data/mock/marketData';
import { Button } from '@/components/ui/Button';

// Modular Feature Components
import { TriggeredAlertsBanner } from './components/TriggeredAlertsBanner';
import { WatchlistTable } from './components/WatchlistTable';
import { ActiveAlertsList } from './components/ActiveAlertsList';
import { AddAssetModal } from './components/AddAssetModal';
import { CreateAlertModal } from './components/CreateAlertModal';

export const WatchlistPage: React.FC = () => {
  const {
    watchlist,
    toggleWatchlist,
    alerts,
    createAlert,
    toggleAlertStatus,
    deleteAlert,
    triggeredAlerts,
    dismissTriggeredAlert,
  } = useMarketData();

  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState<'change' | 'price' | 'symbol'>('change');
  const [isAddAssetOpen, setIsAddAssetOpen] = useState(false);
  const [isCreateAlertOpen, setIsCreateAlertOpen] = useState(false);

  // Add Asset form state
  const [selectedAssetToAdd, setSelectedAssetToAdd] = useState('GOOGL');

  // Create Alert form state
  const [alertSymbol, setAlertSymbol] = useState('AAPL');
  const [alertType, setAlertType] = useState<
    'Price Threshold' | 'Volatility Threshold' | 'Momentum Change'
  >('Price Threshold');
  const [alertCondition, setAlertCondition] = useState('Price above $190.00');
  const [alertTargetValue, setAlertTargetValue] = useState('$190.00');

  const filteredWatchlist = watchlist
    .filter(
      (item) =>
        item.symbol.toLowerCase().includes(search.toLowerCase()) ||
        item.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'change') return b.changePercent - a.changePercent;
      if (sortOption === 'price') return b.price - a.price;
      return a.symbol.localeCompare(b.symbol);
    });

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    toggleWatchlist(selectedAssetToAdd);
    setIsAddAssetOpen(false);
  };

  const handleCreateAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stock = ALL_STOCKS.find((s) => s.symbol === alertSymbol);
    createAlert({
      symbol: alertSymbol,
      companyName: stock ? stock.name : `${alertSymbol} Corp`,
      type: alertType,
      condition: alertCondition,
      targetValue: alertTargetValue,
      currentValue: stock ? `$${stock.price.toFixed(2)}` : '$150.00',
      status: 'Active',
      channel: 'In-App Notification',
    });
    setIsCreateAlertOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Watchlist & Alerts</h1>
          <p className="text-xs text-gray-500 mt-1">
            Real-time equity tracking, momentum indicators, and threshold alert triggers
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={() => setIsAddAssetOpen(true)} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-1.5" />
            Add Symbol
          </Button>
          <Button onClick={() => setIsCreateAlertOpen(true)} variant="primary" size="sm">
            <Bell className="w-4 h-4 mr-1.5" />
            Configure Trigger
          </Button>
        </div>
      </div>

      {/* Triggered Alert Notifications */}
      <TriggeredAlertsBanner alerts={triggeredAlerts} onDismiss={dismissTriggeredAlert} />

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-gray-200">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by symbol or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs">
          <span className="text-gray-500 font-medium">Sort by:</span>
          <select
            value={sortOption}
            onChange={(e) =>
              setSortOption(e.target.value as 'change' | 'price' | 'symbol')
            }
            className="border border-gray-200 rounded-lg px-2.5 py-1 text-xs bg-white text-gray-700 focus:outline-none"
          >
            <option value="change">Highest Daily Gain %</option>
            <option value="price">Highest Price ($)</option>
            <option value="symbol">Ticker (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Main Watchlist Table */}
      <WatchlistTable items={filteredWatchlist} onToggleWatchlist={toggleWatchlist} />

      {/* Configured Price Trigger Rules */}
      <ActiveAlertsList
        alerts={alerts}
        onToggleStatus={toggleAlertStatus}
        onDeleteAlert={deleteAlert}
      />

      {/* Dialog Modals */}
      <AddAssetModal
        isOpen={isAddAssetOpen}
        onClose={() => setIsAddAssetOpen(false)}
        onSubmit={handleAddAsset}
        selectedAsset={selectedAssetToAdd}
        setSelectedAsset={setSelectedAssetToAdd}
      />

      <CreateAlertModal
        isOpen={isCreateAlertOpen}
        onClose={() => setIsCreateAlertOpen(false)}
        onSubmit={handleCreateAlertSubmit}
        alertSymbol={alertSymbol}
        setAlertSymbol={setAlertSymbol}
        alertType={alertType}
        setAlertType={setAlertType}
        alertCondition={alertCondition}
        setAlertCondition={setAlertCondition}
        alertTargetValue={alertTargetValue}
        setAlertTargetValue={setAlertTargetValue}
      />
    </div>
  );
};

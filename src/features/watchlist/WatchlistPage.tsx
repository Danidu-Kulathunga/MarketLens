import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Plus,
  Search,
  MoreVertical,
  CheckCircle2,
  Trash2,
  Power,
  Edit2,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Activity,
} from 'lucide-react';
import { useMarketData } from '@/context/MarketDataContext';
import { ALL_STOCKS } from '@/data/mock/marketData';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export const WatchlistPage: React.FC = () => {
  const navigate = useNavigate();
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
  const [alertType, setAlertType] = useState<'Price Threshold' | 'Volatility Threshold' | 'Momentum Change'>('Price Threshold');
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Watchlist & Alerts
            </h1>
            <span className="text-xs text-gray-400 font-medium">
              • Market data updated 2 min ago
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Monitor selected assets and receive notifications when important market conditions are met.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            icon={<Bell className="w-4 h-4" />}
            onClick={() => setIsCreateAlertOpen(true)}
          >
            Create Alert
          </Button>
          <Button
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddAssetOpen(true)}
          >
            + Add Asset
          </Button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Monitored Assets */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            MONITORED ASSETS
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900">
              {watchlist.length} Assets
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-3 pt-2 border-t border-gray-100">
            {watchlist.filter((w) => w.owned).length} Owned in Portfolio
          </p>
        </div>

        {/* Active Alerts */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            ACTIVE ALERTS
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900">
              {alerts.filter((a) => a.status === 'Active').length} Active
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-3 pt-2 border-t border-gray-100">
            Price & Volatility triggers
          </p>
        </div>

        {/* Triggered Today */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            TRIGGERED TODAY
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900">
              {triggeredAlerts.length} Triggered
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-3 pt-2 border-t border-gray-100 truncate">
            {triggeredAlerts[0]?.title || 'No triggers today'}
          </p>
        </div>

        {/* Watchlist Trend */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            WATCHLIST TREND
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600">
              +1.82% ↑
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-3 pt-2 border-t border-gray-100">
            4 Positive / 1 Negative
          </p>
        </div>
      </div>

      {/* Main Card: My Watchlist */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900">My Watchlist</h3>
            <p className="text-xs text-gray-400">
              Assets you are currently monitoring in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search watchlist..."
                className="w-full pl-8 pr-3 py-1.5 bg-gray-50 text-xs text-gray-900 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black focus:bg-white"
              />
            </div>

            <select
              value={sortOption}
              onChange={(e: any) => setSortOption(e.target.value)}
              className="text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="change">Sort: Daily Change</option>
              <option value="price">Sort: Price</option>
              <option value="symbol">Sort: Symbol</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                <th className="py-3 px-6">SYMBOL</th>
                <th className="py-3 px-4">ASSET</th>
                <th className="py-3 px-4">PRICE</th>
                <th className="py-3 px-4">DAILY CHANGE</th>
                <th className="py-3 px-4">MOMENTUM</th>
                <th className="py-3 px-4">PORTFOLIO</th>
                <th className="py-3 px-4">ALERT STATUS</th>
                <th className="py-3 px-4">7-DAY TREND</th>
                <th className="py-3 px-6 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredWatchlist.map((item) => (
                <tr
                  key={item.symbol}
                  className="hover:bg-gray-50/80 transition-colors cursor-pointer"
                  onClick={() => navigate(`/markets/${item.symbol}`)}
                >
                  <td className="py-3.5 px-6 font-mono font-bold text-gray-900">
                    {item.symbol}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-gray-800">{item.name}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-900">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 font-semibold">
                    <span
                      className={`inline-flex items-center gap-1 ${
                        item.changePercent >= 0 ? 'text-emerald-600' : 'text-red-600'
                      }`}
                    >
                      {item.changePercent >= 0 ? `+${item.changePercent.toFixed(2)}% ↑` : `${item.changePercent.toFixed(2)}% ↓`}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        item.momentum === 'Positive'
                          ? 'bg-emerald-50 text-emerald-700'
                          : item.momentum === 'Negative'
                          ? 'bg-red-50 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {item.momentum}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {item.owned ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-black" />
                        Owned
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {item.alertStatus === 'Active' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Active {item.alertCondition ? `(${item.alertCondition})` : ''}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">No Alert</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="w-20 h-6">
                      <svg className="w-full h-full" viewBox="0 0 60 20">
                        <path
                          d={
                            item.changePercent >= 0
                              ? 'M0,16 Q20,12 35,6 T60,2'
                              : 'M0,4 Q20,8 35,14 T60,18'
                          }
                          fill="none"
                          stroke={item.changePercent >= 0 ? '#10B981' : '#EF4444'}
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                  </td>
                  <td className="py-3.5 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => toggleWatchlist(item.symbol)}
                      className="p-1 rounded text-gray-400 hover:text-red-600 hover:bg-gray-100"
                      title="Remove from Watchlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Row: Active Alerts (2/3) + Recently Triggered (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Alerts List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Active Alerts</h3>
              <p className="text-xs text-gray-400">
                Automated condition monitoring evaluated tick-by-tick.
              </p>
            </div>
            <span className="text-xs text-gray-400 font-medium">
              {alerts.length} Conditions Monitored
            </span>
          </div>

          <div className="space-y-4 mt-4">
            {alerts.map((alt) => (
              <div
                key={alt.id}
                className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900">{alt.symbol}</span>
                    <span className="text-xs text-gray-400">• {alt.companyName}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-700">
                      {alt.type}
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                      alt.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        alt.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-400'
                      }`}
                    />
                    {alt.status}
                  </span>
                </div>

                <div className="mt-2">
                  <p className="text-sm font-bold text-gray-900">{alt.condition}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Current: <span className="font-semibold">{alt.currentValue}</span>
                    {alt.targetDistance && ` • Target Distance: ${alt.targetDistance}`}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Bell className="w-3.5 h-3.5" />
                    <span>{alt.channel}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleAlertStatus(alt.id)}
                      className="text-gray-600 hover:text-black font-medium"
                    >
                      {alt.status === 'Active' ? 'Disable' : 'Enable'}
                    </button>
                    <button
                      onClick={() => deleteAlert(alt.id)}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Triggered Alerts */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-base font-semibold text-gray-900">Recently Triggered</h3>
              <Activity className="w-4 h-4 text-gray-400" />
            </div>

            <p className="text-xs text-gray-400 mt-1 mb-4">
              Recent alert conditions detected by MarketLens.
            </p>

            <div className="space-y-4">
              {triggeredAlerts.map((item) => (
                <div key={item.id} className="pb-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-gray-900">{item.title}</h4>
                    <span className="text-[10px] text-gray-400">
                      {item.date} • {item.time}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      onClick={() => navigate(`/markets/${item.symbol}`)}
                      className="text-[11px] font-semibold text-emerald-600 hover:underline"
                    >
                      View {item.symbol} Market
                    </button>
                    <span className="text-gray-300">•</span>
                    <button
                      onClick={() => dismissTriggeredAlert(item.id)}
                      className="text-[11px] text-gray-400 hover:text-gray-600"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Add Asset */}
      <Modal
        isOpen={isAddAssetOpen}
        onClose={() => setIsAddAssetOpen(false)}
        title="Add Asset to Watchlist"
        subtitle="Choose a security to monitor tick-level quotes and volatility."
        footer={
          <>
            <Button variant="outline" onClick={() => setIsAddAssetOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddAsset}>
              Add to Watchlist
            </Button>
          </>
        }
      >
        <form onSubmit={handleAddAsset} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Select Equity Instrument
            </label>
            <select
              value={selectedAssetToAdd}
              onChange={(e) => setSelectedAssetToAdd(e.target.value)}
              className="w-full border border-gray-200 px-3.5 py-2 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-black"
            >
              {ALL_STOCKS.map((s) => (
                <option key={s.symbol} value={s.symbol}>
                  {s.symbol} — {s.name} (${s.price.toFixed(2)})
                </option>
              ))}
            </select>
          </div>
        </form>
      </Modal>

      {/* Modal: Create Alert */}
      <Modal
        isOpen={isCreateAlertOpen}
        onClose={() => setIsCreateAlertOpen(false)}
        title="Create New Condition Alert"
        subtitle="Define triggers for price breakouts, momentum shifts, or volatility."
        footer={
          <>
            <Button variant="outline" onClick={() => setIsCreateAlertOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreateAlertSubmit}>
              Create Alert
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateAlertSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Security Ticker
            </label>
            <select
              value={alertSymbol}
              onChange={(e) => setAlertSymbol(e.target.value)}
              className="w-full border border-gray-200 px-3.5 py-2 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-black"
            >
              {ALL_STOCKS.map((s) => (
                <option key={s.symbol} value={s.symbol}>
                  {s.symbol} — {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Alert Trigger Type
            </label>
            <select
              value={alertType}
              onChange={(e: any) => {
                setAlertType(e.target.value);
                if (e.target.value === 'Price Threshold') {
                  setAlertCondition('Price above $190.00');
                  setAlertTargetValue('$190.00');
                } else if (e.target.value === 'Volatility Threshold') {
                  setAlertCondition('Volatility above 30%');
                  setAlertTargetValue('30.0%');
                } else {
                  setAlertCondition('Momentum turns Negative');
                  setAlertTargetValue('Negative');
                }
              }}
              className="w-full border border-gray-200 px-3.5 py-2 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="Price Threshold">Price Threshold</option>
              <option value="Volatility Threshold">Volatility Threshold</option>
              <option value="Momentum Change">Momentum Change</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Condition Expression
            </label>
            <input
              type="text"
              value={alertCondition}
              onChange={(e) => setAlertCondition(e.target.value)}
              required
              className="w-full border border-gray-200 px-3.5 py-2 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

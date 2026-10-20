import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Plus,
  Briefcase,
  Edit2,
  Trash2,
  ArrowUpRight,
  PieChart as PieIcon,
  DollarSign,
  Calendar,
  Layers,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useMarketData } from '@/context/MarketDataContext';
import {
  PORTFOLIO_PERFORMANCE_HISTORY,
  SECTOR_ALLOCATION,
} from '@/data/mock/portfolioData';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { ALL_STOCKS } from '@/data/mock/marketData';

export const PortfolioPage: React.FC = () => {
  const navigate = useNavigate();
  const { holdings, portfolioSummary, addHolding, editHolding, removeHolding } = useMarketData();

  const [timeframe, setTimeframe] = useState<'1M' | '3M' | '6M' | '1Y' | 'ALL'>('3M');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingHoldingId, setEditingHoldingId] = useState<string | null>(null);

  // Form states for Add Holding
  const [symbolInput, setSymbolInput] = useState('AAPL');
  const [sharesInput, setSharesInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [dateInput, setDateInput] = useState(new Date().toISOString().split('T')[0]);

  // Form states for Edit Holding
  const [editShares, setEditShares] = useState('');
  const [editCost, setEditCost] = useState('');

  const chartData = PORTFOLIO_PERFORMANCE_HISTORY[timeframe] || PORTFOLIO_PERFORMANCE_HISTORY['3M'];

  const handleOpenEdit = (id: string, currentShares: number, currentCost: number) => {
    setEditingHoldingId(id);
    setEditShares(currentShares.toString());
    setEditCost(currentCost.toString());
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHoldingId) return;
    const s = parseFloat(editShares);
    const c = parseFloat(editCost);
    if (!isNaN(s) && !isNaN(c) && s > 0 && c > 0) {
      editHolding(editingHoldingId, s, c);
      setEditingHoldingId(null);
    }
  };

  const handleCreateHolding = (e: React.FormEvent) => {
    e.preventDefault();
    const stock = ALL_STOCKS.find((s) => s.symbol.toUpperCase() === symbolInput.toUpperCase());
    const currentPrice = stock ? stock.price : parseFloat(priceInput) || 100;
    const companyName = stock ? stock.name : `${symbolInput.toUpperCase()} Corp`;
    const sector = stock ? stock.sector : 'Technology';

    const s = parseFloat(sharesInput);
    const p = parseFloat(priceInput);

    if (!isNaN(s) && !isNaN(p) && s > 0 && p > 0) {
      addHolding({
        symbol: symbolInput.toUpperCase(),
        companyName,
        shares: s,
        avgCost: p,
        currentPrice,
        purchaseDate: dateInput,
        sector,
      });
      setIsAddModalOpen(false);
      setSharesInput('');
      setPriceInput('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Owned Investment Portfolio
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {holdings.length} Active Positions
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Track your actual securities, real-time valuation, cost-basis, and sector diversification.
          </p>
        </div>

        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => {
            setSymbolInput('AAPL');
            setPriceInput('175.43');
            setSharesInput('10');
            setIsAddModalOpen(true);
          }}
        >
          Add Existing Holding
        </Button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Value */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            TOTAL PORTFOLIO VALUE
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900 tracking-tight">
              ${portfolioSummary.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
            <span>Cash Reserve</span>
            <span className="font-mono font-medium text-gray-900">
              ${portfolioSummary.cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Total P&L */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            TOTAL PROFIT / LOSS
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600 tracking-tight">
              +${portfolioSummary.totalReturn.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-sm font-bold text-emerald-600">
              (+{portfolioSummary.totalReturnPercent.toFixed(2)}%)
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
            <span>Cost Basis</span>
            <span className="font-mono font-medium text-gray-900">
              ${(portfolioSummary.totalValue - portfolioSummary.totalReturn).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Day Return */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            TODAY'S RETURN
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600 tracking-tight">
              +${portfolioSummary.dayChange.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-sm font-bold text-emerald-600">
              (+{portfolioSummary.dayChangePercent.toFixed(2)}%)
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
            <span>Market Status</span>
            <span className="text-emerald-700 font-medium">Open • Live</span>
          </div>
        </div>

        {/* Asset Diversification */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            TOP SECTOR EXPOSURE
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">Technology</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-800">
              68.1%
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
            <span>Concentration Risk</span>
            <span className="text-amber-600 font-semibold">Elevated</span>
          </div>
        </div>
      </div>

      {/* Performance Chart & Sector Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart (2/3) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Portfolio Performance</h3>
              <p className="text-xs text-gray-400">Total portfolio valuation trajectory</p>
            </div>

            {/* Timeframe Selector */}
            <div className="flex items-center bg-gray-100 rounded-lg p-0.5 text-xs font-semibold text-gray-600">
              {(['1M', '3M', '6M', '1Y', 'ALL'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    timeframe === tf
                      ? 'bg-[#111827] text-white shadow-xs'
                      : 'hover:text-gray-900 text-gray-600'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9CA3AF' }} tickLine={false} axisLine={{ stroke: '#E5E7EB' }} />
                <YAxis
                  domain={['auto', 'auto']}
                  tick={{ fontSize: 11, fill: '#9CA3AF' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(val: number) => [`$${val.toLocaleString()}`, 'Portfolio Value']}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#10B981' }}
                  activeDot={{ r: 6, fill: '#111827' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sector Allocation (1/3) */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-base font-semibold text-gray-900">Asset Allocation</h3>
              <PieIcon className="w-4 h-4 text-gray-400" />
            </div>

            <div className="space-y-4 mt-4">
              {SECTOR_ALLOCATION.map((item) => (
                <div key={item.sector} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-900">{item.sector}</span>
                    <span className="font-mono text-gray-600">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-gray-400">
                    <span>${item.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    <span>Target: 25%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 mt-4 text-xs text-gray-500">
            Tip: Technology weighting exceeds 65%. Consider rebalancing into broad-market or defensive instruments.
          </div>
        </div>
      </div>

      {/* Owned Holdings Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Your Owned Securities</h3>
            <p className="text-xs text-gray-400">
              Real holdings entered into your MarketLens account.
            </p>
          </div>
          <span className="text-xs font-mono text-gray-500">
            {holdings.length} items recorded
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                <th className="py-3 px-6">SECURITY</th>
                <th className="py-3 px-4">SHARES</th>
                <th className="py-3 px-4">AVG COST</th>
                <th className="py-3 px-4">CURRENT PRICE</th>
                <th className="py-3 px-4">MARKET VALUE</th>
                <th className="py-3 px-4">TOTAL RETURN</th>
                <th className="py-3 px-4">PURCHASE DATE</th>
                <th className="py-3 px-6 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {holdings.map((h) => (
                <tr key={h.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3.5 px-6">
                    <div
                      className="cursor-pointer"
                      onClick={() => navigate(`/markets/${h.symbol}`)}
                    >
                      <span className="font-mono font-bold text-gray-900 hover:underline">
                        {h.symbol}
                      </span>
                      <p className="text-gray-400 text-[11px]">{h.companyName}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-medium text-gray-900">
                    {h.shares}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-gray-600">
                    ${h.avgCost.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-900">
                    ${h.currentPrice.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-900">
                    ${h.marketValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-emerald-600">
                      +${h.totalGain.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-[11px] text-emerald-600">
                      +{h.totalGainPercent.toFixed(2)}%
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-500 font-mono text-[11px]">
                    {h.purchaseDate}
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => navigate(`/markets/${h.symbol}`)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-800 hover:bg-gray-100"
                        title="View stock analytics"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(h.id, h.shares, h.avgCost)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-800 hover:bg-gray-100"
                        title="Edit holding"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => removeHolding(h.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"
                        title="Remove holding"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add Existing Holding */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Existing Investment Holding"
        subtitle="Record shares you currently own to incorporate into portfolio tracking."
        footer={
          <>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreateHolding}>
              Add Position
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateHolding} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Stock Ticker Symbol
            </label>
            <select
              value={symbolInput}
              onChange={(e) => {
                setSymbolInput(e.target.value);
                const s = ALL_STOCKS.find((item) => item.symbol === e.target.value);
                if (s) setPriceInput(s.price.toString());
              }}
              className="w-full border border-gray-200 px-3.5 py-2 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-black"
            >
              {ALL_STOCKS.map((s) => (
                <option key={s.symbol} value={s.symbol}>
                  {s.symbol} — {s.name} (${s.price.toFixed(2)})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Quantity / Shares Owned
            </label>
            <input
              type="number"
              step="any"
              min="0.01"
              value={sharesInput}
              onChange={(e) => setSharesInput(e.target.value)}
              placeholder="e.g. 25"
              required
              className="w-full border border-gray-200 px-3.5 py-2 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Average Purchase Price per Share ($)
            </label>
            <input
              type="number"
              step="any"
              min="0.01"
              value={priceInput}
              onChange={(e) => setPriceInput(e.target.value)}
              placeholder="e.g. 150.00"
              required
              className="w-full border border-gray-200 px-3.5 py-2 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Purchase Date
            </label>
            <input
              type="date"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="w-full border border-gray-200 px-3.5 py-2 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
        </form>
      </Modal>

      {/* Modal: Edit Holding */}
      <Modal
        isOpen={!!editingHoldingId}
        onClose={() => setEditingHoldingId(null)}
        title="Edit Position Details"
        subtitle="Adjust shares quantity or average cost basis."
        footer={
          <>
            <Button variant="outline" onClick={() => setEditingHoldingId(null)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              Update Holding
            </Button>
          </>
        }
      >
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Total Shares
            </label>
            <input
              type="number"
              step="any"
              min="0.01"
              value={editShares}
              onChange={(e) => setEditShares(e.target.value)}
              required
              className="w-full border border-gray-200 px-3.5 py-2 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Average Cost Basis ($)
            </label>
            <input
              type="number"
              step="any"
              min="0.01"
              value={editCost}
              onChange={(e) => setEditCost(e.target.value)}
              required
              className="w-full border border-gray-200 px-3.5 py-2 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

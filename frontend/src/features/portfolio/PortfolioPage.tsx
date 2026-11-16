import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useMarketData } from '@/context/MarketDataContext';
import { PORTFOLIO_PERFORMANCE_HISTORY, SECTOR_ALLOCATION } from '@/data/mock/portfolioData';
import { ALL_STOCKS } from '@/data/mock/marketData';

// Modular Feature Components
import { PortfolioMetricsGrid } from './components/PortfolioMetricsGrid';
import { PortfolioPerformanceChart } from './components/PortfolioPerformanceChart';
import { SectorAllocationCard } from './components/SectorAllocationCard';
import { HoldingsTable } from './components/HoldingsTable';
import { AddHoldingModal } from './components/AddHoldingModal';
import { EditHoldingModal } from './components/EditHoldingModal';

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
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Portfolio Management</h1>
          <p className="text-xs text-gray-500 mt-1">
            Real-time equity positions, cost-basis analysis, and sector risk allocation
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} variant="primary" size="sm">
          <Plus className="w-4 h-4 mr-1.5" />
          Add Position
        </Button>
      </div>

      {/* KPI Metrics Summary Grid */}
      <PortfolioMetricsGrid summary={portfolioSummary} />

      {/* Trajectory Chart and Sector Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PortfolioPerformanceChart
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
            chartData={chartData}
          />
        </div>
        <div className="lg:col-span-1">
          <SectorAllocationCard sectors={SECTOR_ALLOCATION} />
        </div>
      </div>

      {/* Holdings Table */}
      <HoldingsTable
        holdings={holdings}
        onOpenEdit={handleOpenEdit}
        onRemoveHolding={removeHolding}
        onNavigateStock={(sym) => navigate(`/markets/${sym}`)}
      />

      {/* Modal Dialogs */}
      <AddHoldingModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreateHolding}
        symbolInput={symbolInput}
        setSymbolInput={setSymbolInput}
        sharesInput={sharesInput}
        setSharesInput={setSharesInput}
        priceInput={priceInput}
        setPriceInput={setPriceInput}
        dateInput={dateInput}
        setDateInput={setDateInput}
      />

      <EditHoldingModal
        isOpen={!!editingHoldingId}
        onClose={() => setEditingHoldingId(null)}
        onSubmit={handleSaveEdit}
        editShares={editShares}
        setEditShares={setEditShares}
        editCost={editCost}
        setEditCost={setEditCost}
      />
    </div>
  );
};

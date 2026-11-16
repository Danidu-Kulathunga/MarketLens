import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { ALL_STOCKS } from '@/data/mock/marketData';

interface CreateAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  alertSymbol: string;
  setAlertSymbol: (val: string) => void;
  alertType: 'Price Threshold' | 'Volatility Threshold' | 'Momentum Change';
  setAlertType: (val: 'Price Threshold' | 'Volatility Threshold' | 'Momentum Change') => void;
  alertCondition: string;
  setAlertCondition: (val: string) => void;
  alertTargetValue: string;
  setAlertTargetValue: (val: string) => void;
}

export const CreateAlertModal: React.FC<CreateAlertModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  alertSymbol,
  setAlertSymbol,
  alertType,
  setAlertType,
  alertCondition,
  setAlertCondition,
  alertTargetValue,
  setAlertTargetValue,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configure Smart Price Trigger">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Target Symbol</label>
          <select
            value={alertSymbol}
            onChange={(e) => setAlertSymbol(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            {ALL_STOCKS.map((stock) => (
              <option key={stock.symbol} value={stock.symbol}>
                {stock.symbol} — {stock.name} (${stock.price.toFixed(2)})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Alert Condition Type</label>
          <select
            value={alertType}
            onChange={(e) =>
              setAlertType(
                e.target.value as 'Price Threshold' | 'Volatility Threshold' | 'Momentum Change'
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="Price Threshold">Price Threshold ($ Level)</option>
            <option value="Volatility Threshold">Volatility Spike (%)</option>
            <option value="Momentum Change">Moving Average Cross / Momentum</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Trigger Description</label>
          <input
            type="text"
            required
            value={alertCondition}
            onChange={(e) => setAlertCondition(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="e.g. Price above $230.00"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Target Price / Value</label>
          <input
            type="text"
            required
            value={alertTargetValue}
            onChange={(e) => setAlertTargetValue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="e.g. $230.00"
          />
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm">
            Create Trigger
          </Button>
        </div>
      </form>
    </Modal>
  );
};

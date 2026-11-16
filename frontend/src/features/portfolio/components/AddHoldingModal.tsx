import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface AddHoldingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  symbolInput: string;
  setSymbolInput: (val: string) => void;
  sharesInput: string;
  setSharesInput: (val: string) => void;
  priceInput: string;
  setPriceInput: (val: string) => void;
  dateInput: string;
  setDateInput: (val: string) => void;
}

export const AddHoldingModal: React.FC<AddHoldingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  symbolInput,
  setSymbolInput,
  sharesInput,
  setSharesInput,
  priceInput,
  setPriceInput,
  dateInput,
  setDateInput,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Portfolio Asset">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Ticker Symbol</label>
          <input
            type="text"
            required
            value={symbolInput}
            onChange={(e) => setSymbolInput(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono uppercase focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="e.g. AAPL"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Number of Shares</label>
            <input
              type="number"
              step="any"
              required
              min="0.01"
              value={sharesInput}
              onChange={(e) => setSharesInput(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="e.g. 10"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Purchase Price ($)</label>
            <input
              type="number"
              step="any"
              required
              min="0.01"
              value={priceInput}
              onChange={(e) => setPriceInput(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="e.g. 150.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Acquisition Date</label>
          <input
            type="date"
            required
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm">
            Add Holding
          </Button>
        </div>
      </form>
    </Modal>
  );
};

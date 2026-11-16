import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface AddToPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  symbol: string;
  sharesToAdd: string;
  setSharesToAdd: (val: string) => void;
  priceToAdd: string;
  setPriceToAdd: (val: string) => void;
}

export const AddToPortfolioModal: React.FC<AddToPortfolioModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  symbol,
  sharesToAdd,
  setSharesToAdd,
  priceToAdd,
  setPriceToAdd,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Add ${symbol} to Portfolio`}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Shares to Buy</label>
          <input
            type="number"
            step="any"
            required
            min="0.01"
            value={sharesToAdd}
            onChange={(e) => setSharesToAdd(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="e.g. 10"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Execution Price ($)</label>
          <input
            type="number"
            step="any"
            required
            min="0.01"
            value={priceToAdd}
            onChange={(e) => setPriceToAdd(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm">
            Confirm Purchase
          </Button>
        </div>
      </form>
    </Modal>
  );
};

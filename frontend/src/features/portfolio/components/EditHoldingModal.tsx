import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface EditHoldingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  editShares: string;
  setEditShares: (val: string) => void;
  editCost: string;
  setEditCost: (val: string) => void;
}

export const EditHoldingModal: React.FC<EditHoldingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editShares,
  setEditShares,
  editCost,
  setEditCost,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Position">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Adjusted Shares</label>
          <input
            type="number"
            step="any"
            required
            value={editShares}
            onChange={(e) => setEditShares(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Adjusted Average Cost ($)</label>
          <input
            type="number"
            step="any"
            required
            value={editCost}
            onChange={(e) => setEditCost(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm">
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};

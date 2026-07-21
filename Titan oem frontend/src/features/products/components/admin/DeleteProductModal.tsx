'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import type { Product } from '../../types/product.types';

interface DeleteProductModalProps {
  product: Product;
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: (productId: string) => void;
}

export function DeleteProductModal({
  product,
  isOpen,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteProductModalProps) {
  const [confirmationInput, setConfirmationInput] = useState('');
  const isConfirmed = confirmationInput === product.sku;

  const handleClose = () => {
    setConfirmationInput('');
    onClose();
  };

  const handleConfirm = () => {
    if (isConfirmed) {
      onConfirm(product.id);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Delete Product"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="danger"
            isLoading={isDeleting}
            disabled={!isConfirmed}
            onClick={handleConfirm}
          >
            Delete Permanently
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-700">
          You are about to permanently remove{' '}
          <span className="font-semibold text-gray-900">{product.name}</span>. This action cannot
          be undone.
        </p>
        <p className="text-sm text-gray-600">
          Type the product SKU <span className="font-mono font-semibold">{product.sku}</span> to
          confirm deletion.
        </p>
        <Input
          label="Confirm SKU"
          value={confirmationInput}
          onChange={(event) => setConfirmationInput(event.target.value)}
          placeholder={product.sku}
          autoComplete="off"
        />
      </div>
    </Modal>
  );
}

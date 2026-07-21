'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { useDeleteProduct } from '../../hooks/useCreateProduct';
import type { Product } from '../../types/product.types';
import { DeleteProductModal } from './DeleteProductModal';
import { EditProductForm } from './EditProductForm';

interface InventoryTableProps {
  products: Product[];
  isLoading?: boolean;
}

export function InventoryTable({ products, isLoading }: InventoryTableProps) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const deleteProduct = useDeleteProduct();

  const handleDeleteConfirm = (productId: string) => {
    deleteProduct.mutate(productId, {
      onSuccess: () => setDeletingProduct(null),
    });
  };

  return (
    <>
      <Table
        isLoading={isLoading}
        data={products}
        emptyMessage="No products in inventory."
        columns={[
          { key: 'sku', header: 'SKU' },
          { key: 'name', header: 'Name' },
          { key: 'category', header: 'Category' },
          {
            key: 'price',
            header: 'Price',
            render: (row) => `$${row.price.toFixed(2)}`,
          },
          { key: 'stock', header: 'Stock' },
          {
            key: 'actions',
            header: 'Actions',
            render: (row) => (
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => setEditingProduct(row)}>
                  Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => setDeletingProduct(row)}>
                  Delete
                </Button>
              </div>
            ),
          },
        ]}
      />

      {editingProduct && (
        <EditProductForm product={editingProduct} onClose={() => setEditingProduct(null)} />
      )}

      {deletingProduct && (
        <DeleteProductModal
          product={deletingProduct}
          isOpen
          isDeleting={deleteProduct.isPending}
          onClose={() => setDeletingProduct(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </>
  );
}

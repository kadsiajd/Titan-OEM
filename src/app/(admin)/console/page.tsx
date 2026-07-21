'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { EditProductForm } from '@/features/products/components/admin/EditProductForm';
import { InventoryTable } from '@/features/products/components/admin/InventoryTable';
import { useGetProducts } from '@/features/products/hooks/useGetProducts';

export default function ConsolePage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { data, isLoading } = useGetProducts();

  const products = data?.products ?? [];
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const lowStockCount = products.filter((product) => product.stock < 10).length;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Inventory Dashboard</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage your OEM product catalog and stock levels.
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>Add Product</Button>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-5">
          <p className="text-sm text-gray-400">Total Products</p>
          <p className="mt-1 text-3xl font-bold text-white">{products.length}</p>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-5">
          <p className="text-sm text-gray-400">Total Stock Units</p>
          <p className="mt-1 text-3xl font-bold text-white">{totalStock}</p>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-5">
          <p className="text-sm text-gray-400">Low Stock Items</p>
          <p className="mt-1 text-3xl font-bold text-amber-400">{lowStockCount}</p>
        </div>
      </div>

      <InventoryTable products={products} isLoading={isLoading} />

      {showCreateForm && <EditProductForm onClose={() => setShowCreateForm(false)} />}
    </div>
  );
}

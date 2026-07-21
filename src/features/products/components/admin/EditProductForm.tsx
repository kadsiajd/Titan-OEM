'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { useCreateProduct, useUpdateProduct } from '../../hooks/useCreateProduct';
import type { Product } from '../../types/product.types';

const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  sku: z.string().min(2, 'SKU is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.coerce.number().positive('Price must be positive'),
  stock: z.coerce.number().int().min(0, 'Stock cannot be negative'),
  category: z.string().min(2, 'Category is required'),
  imageUrl: z.union([z.string().url('Must be a valid URL'), z.literal('')]).optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface EditProductFormProps {
  product?: Product;
  onClose: () => void;
}

export function EditProductForm({ product, onClose }: EditProductFormProps) {
  const isEditing = Boolean(product);
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name ?? '',
      sku: product?.sku ?? '',
      description: product?.description ?? '',
      price: product?.price ?? 0,
      stock: product?.stock ?? 0,
      category: product?.category ?? '',
      imageUrl: product?.imageUrl ?? '',
    },
  });

  const onSubmit = (values: ProductFormValues) => {
    const payload = {
      ...values,
      imageUrl: values.imageUrl || undefined,
    };

    if (isEditing && product) {
      updateProduct.mutate({ id: product.id, ...payload }, { onSuccess: () => onClose() });
    } else {
      createProduct.mutate(payload, { onSuccess: () => onClose() });
    }
  };

  const isPending = createProduct.isPending || updateProduct.isPending;

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={isEditing ? 'Edit Product' : 'Add Product'}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button isLoading={isPending} onClick={handleSubmit(onSubmit)}>
            {isEditing ? 'Save Changes' : 'Create Product'}
          </Button>
        </>
      }
    >
      <form className="space-y-4">
        <Input label="Name" error={errors.name?.message} {...register('name')} />
        <Input label="SKU" error={errors.sku?.message} {...register('sku')} />
        <Input
          label="Description"
          error={errors.description?.message}
          {...register('description')}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Price"
            type="number"
            step="0.01"
            error={errors.price?.message}
            {...register('price')}
          />
          <Input
            label="Stock"
            type="number"
            error={errors.stock?.message}
            {...register('stock')}
          />
        </div>
        <Input label="Category" error={errors.category?.message} {...register('category')} />
        <Input
          label="Image URL"
          type="url"
          error={errors.imageUrl?.message}
          {...register('imageUrl')}
        />
      </form>
    </Modal>
  );
}

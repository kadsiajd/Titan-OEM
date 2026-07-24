import { describe, expect, it } from 'vitest';

import { mapApiProductToProduct } from '@/features/products/mappers/product.mapper';
import type { ApiProduct } from '@/features/products/types/product-api.types';

const productFromApi: ApiProduct = {
  id: 'product-1',
  name: '602A',
  categoryId: 'category-1',
  category: {
    id: 'category-1',
    name: 'Micromotor',
    description: 'Compact micromotor movements for precise hand control.',
  },
  specifications: {
    no_of_jewels: '2',
    angular_rotation_per_pulse: 'Minute hand: 2°',
    thickness: '2.600 mm',
    empty_value: '',
    unavailable: null,
  },
};

describe('mapApiProductToProduct', () => {
  it('maps the category description and specifications for product cards', () => {
    expect(mapApiProductToProduct(productFromApi)).toMatchObject({
      id: 'product-1',
      name: '602A',
      category: 'Micromotor',
      description: 'Compact micromotor movements for precise hand control.',
      overview: [
        { label: 'No Of Jewels', value: '2' },
        { label: 'Angular Rotation Per Pulse', value: 'Minute hand: 2°' },
        { label: 'Thickness', value: '2.600 mm' },
      ],
    });
  });

  it('uses product fields when the API provides them', () => {
    const product = mapApiProductToProduct({
      ...productFromApi,
      description: 'A product-specific description.',
      imageUrl: '/products/602a.png',
      specificationSheetUrl: '/documents/602a-specification.pdf',
      technicalDrawingUrl: '/documents/602a-drawing.pdf',
    });

    expect(product).toMatchObject({
      description: 'A product-specific description.',
      imageUrl: '/products/602a.png',
      specificationSheetUrl: '/documents/602a-specification.pdf',
      technicalDrawingUrl: '/documents/602a-drawing.pdf',
    });
  });
});

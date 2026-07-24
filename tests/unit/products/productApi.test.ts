import { beforeEach, describe, expect, it, vi } from 'vitest';

import { publicClient } from '@/utils/api-client';
import { productApi } from '@/features/products/services/productApi';

vi.mock('@/utils/api-client', () => ({
  publicClient: {
    get: vi.fn(),
  },
}));

const mockedGet = vi.mocked(publicClient.get);

describe('productApi.getAllByCategory', () => {
  beforeEach(() => {
    mockedGet.mockReset();
  });

  it('uses the response envelope and maps products for the UI', async () => {
    mockedGet.mockResolvedValue({
      data: {
        success: true,
        data: [
          {
            id: 'product-1',
            name: '6120',
            categoryId: 'category-1',
            category: { id: 'category-1', name: 'Quartz' },
            specifications: { battery_life: '36 M' },
          },
        ],
      },
    });

    await expect(productApi.getAllByCategory('Quartz Movements')).resolves.toEqual([
      expect.objectContaining({
        name: '6120',
        category: 'Quartz',
        overview: [{ label: 'Battery Life', value: '36 M' }],
      }),
    ]);
    expect(mockedGet).toHaveBeenCalledWith('/products', {
      params: {
        categoryId: 'Quartz Movements',
      },
    });
  });

  it('rejects an unsuccessful API response', async () => {
    mockedGet.mockResolvedValue({ data: { success: false, data: [] } });

    await expect(productApi.getAllByCategory('Quartz')).rejects.toThrow(
      'The products API returned an invalid response.'
    );
  });
});

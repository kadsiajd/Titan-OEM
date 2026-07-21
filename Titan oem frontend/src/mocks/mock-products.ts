import type {
  CreateProductRequest,
  Product,
  ProductsResponse,
  UpdateProductRequest,
} from '@/features/products/types/product.types';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Industrial Servo Motor X200',
    sku: 'OEM-SRV-X200',
    description:
      'High-torque servo motor designed for precision automation and OEM assembly lines.',
    price: 1299.99,
    stock: 42,
    category: 'Motors',
    imageUrl: 'https://placehold.co/600x400/png?text=Servo+Motor',
    createdAt: '2026-01-10T08:00:00.000Z',
    updatedAt: '2026-01-10T08:00:00.000Z',
  },
  {
    id: 'prod-2',
    name: 'Hydraulic Pump Assembly HPA-45',
    sku: 'OEM-HYD-HPA45',
    description:
      'Compact hydraulic pump assembly with integrated pressure regulation for heavy-duty equipment.',
    price: 849.5,
    stock: 18,
    category: 'Hydraulics',
    imageUrl: 'https://placehold.co/600x400/png?text=Hydraulic+Pump',
    createdAt: '2026-01-12T10:30:00.000Z',
    updatedAt: '2026-01-12T10:30:00.000Z',
  },
  {
    id: 'prod-3',
    name: 'PLC Control Module CM-900',
    sku: 'OEM-PLC-CM900',
    description:
      'Programmable logic controller module with multi-protocol I/O for factory automation systems.',
    price: 2199.0,
    stock: 7,
    category: 'Controls',
    createdAt: '2026-01-15T14:15:00.000Z',
    updatedAt: '2026-01-15T14:15:00.000Z',
  },
  {
    id: 'prod-4',
    name: 'Stainless Steel Bearing Unit SB-120',
    sku: 'OEM-BRG-SB120',
    description:
      'Corrosion-resistant bearing unit rated for continuous operation in harsh industrial environments.',
    price: 189.99,
    stock: 120,
    category: 'Bearings',
    imageUrl: 'https://placehold.co/600x400/png?text=Bearing+Unit',
    createdAt: '2026-01-18T09:45:00.000Z',
    updatedAt: '2026-01-18T09:45:00.000Z',
  },
];

let products = [...INITIAL_PRODUCTS];

const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockProductApi = {
  getAll: async (): Promise<ProductsResponse> => {
    await delay();
    return { products: [...products], total: products.length };
  },

  getById: async (id: string): Promise<Product> => {
    await delay();
    const product = products.find((item) => item.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return { ...product };
  },

  create: async (payload: CreateProductRequest): Promise<Product> => {
    await delay();
    const now = new Date().toISOString();
    const product: Product = {
      id: `prod-${Date.now()}`,
      ...payload,
      createdAt: now,
      updatedAt: now,
    };
    products = [product, ...products];
    return product;
  },

  update: async ({ id, ...payload }: UpdateProductRequest): Promise<Product> => {
    await delay();
    const index = products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    const updated: Product = {
      ...products[index],
      ...payload,
      id,
      updatedAt: new Date().toISOString(),
    };
    products = [...products.slice(0, index), updated, ...products.slice(index + 1)];
    return updated;
  },

  delete: async (id: string): Promise<void> => {
    await delay();
    const exists = products.some((item) => item.id === id);
    if (!exists) {
      throw new Error('Product not found');
    }
    products = products.filter((item) => item.id !== id);
  },
};

export const mockProducts = INITIAL_PRODUCTS;

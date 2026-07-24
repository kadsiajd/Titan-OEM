import type { Product } from '@/features/products/types/product.types';

export interface CreateProductRequest {
  name: string;
  sku?: string;
  description: string;
  price?: number;
  stock?: number;
  category: string;
  imageUrl?: string;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Industrial Servo Motor X200',
    description: 'High-torque servo motor designed for precision automation and OEM assembly lines.',
    categoryId: 'motors',
    category: 'Motors',
    imageUrl: '/micromotor/image.png',
    overview: [],
    productDetails: [],
    specificationSheetUrl: '',
    technicalDrawingUrl: '',
  },
  {
    id: 'prod-2',
    name: 'Hydraulic Pump Assembly HPA-45',
    description: 'Compact hydraulic pump assembly with integrated pressure regulation for heavy-duty equipment.',
    categoryId: 'hydraulics',
    category: 'Hydraulics',
    imageUrl: '/micromotor/image.png',
    overview: [],
    productDetails: [],
    specificationSheetUrl: '',
    technicalDrawingUrl: '',
  },
  {
    id: 'prod-3',
    name: 'PLC Control Module CM-900',
    description: 'Programmable logic controller module with multi-protocol I/O for factory automation systems.',
    categoryId: 'controls',
    category: 'Controls',
    imageUrl: '/micromotor/image.png',
    overview: [],
    productDetails: [],
    specificationSheetUrl: '',
    technicalDrawingUrl: '',
  },
  {
    id: 'prod-4',
    name: 'Stainless Steel Bearing Unit SB-120',
    description: 'Corrosion-resistant bearing unit rated for continuous operation in harsh industrial environments.',
    categoryId: 'bearings',
    category: 'Bearings',
    imageUrl: '/micromotor/image.png',
    overview: [],
    productDetails: [],
    specificationSheetUrl: '',
    technicalDrawingUrl: '',
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
    const product: Product = {
      id: `prod-${Date.now()}`,
      name: payload.name,
      description: payload.description,
      categoryId: payload.category.toLowerCase(),
      category: payload.category,
      imageUrl: payload.imageUrl || '/micromotor/image.png',
      overview: [],
      productDetails: [],
      specificationSheetUrl: '',
      technicalDrawingUrl: '',
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

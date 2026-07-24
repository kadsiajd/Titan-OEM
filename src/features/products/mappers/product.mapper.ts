import type { Product, ProductField } from '../types/product.types';
import type {
  ApiProduct,
  ApiProductCategory,
  ProductSpecifications,
} from '../types/product-api.types';

const isApiProductCategory = (category: ApiProduct['category']): category is ApiProductCategory =>
  typeof category === 'object' && category !== null;

const toDisplayLabel = (key: string): string =>
  key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());

const toOverview = (specifications?: ProductSpecifications): ProductField[] => {
  if (!specifications) {
    return [];
  }

  return Object.entries(specifications).flatMap(([key, value]) => {
    if (value === null || value === undefined || value === '') {
      return [];
    }

    if (typeof value === 'object') {
      return [];
    }

    return [{ label: toDisplayLabel(key), value: String(value) }];
  });
};

export const mapApiProductToProduct = (apiProduct: ApiProduct): Product => {
  const category = apiProduct.category;
  const categoryName = isApiProductCategory(category) ? category.name : (category ?? '');
  const categoryDescription = isApiProductCategory(category) ? (category.description ?? '') : '';

  return {
    id: apiProduct.id,
    name: apiProduct.name,
    description: apiProduct.description ?? categoryDescription,
    categoryId: apiProduct.categoryId,
    category: categoryName,
    imageUrl: apiProduct.imageUrl ?? '',
    specificationSheetUrl: apiProduct.specificationSheetUrl ?? '',
    technicalDrawingUrl: apiProduct.technicalDrawingUrl ?? '',
    overview: toOverview(apiProduct.specifications),
    productDetails: [],
  };
};

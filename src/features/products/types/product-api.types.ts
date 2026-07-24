export type ProductSpecifications = Record<string, unknown>;

export interface ApiProductCategory {
  id: string;
  name: string;
  description?: string;
}

export interface ApiProduct {
  id: string;
  name: string;
  description?: string;
  categoryId: string;
  category?: ApiProductCategory | string;
  specifications?: ProductSpecifications;
  imageUrl?: string;
  specificationSheetUrl?: string;
  technicalDrawingUrl?: string;
}



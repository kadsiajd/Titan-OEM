import ProductDetails from '@/features/products/components/productDetails';

interface ProductDetailsPageProps {
  params: Promise<{ categoryId: string; productId: string }>;
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { categoryId, productId } = await params;

  return <ProductDetails categoryId={categoryId} productId={productId} />;
}

import { HeroBanner } from '@/features/home/components/HeroBanner';
import { ProductCatalog } from '@/features/products/components/ProductCatalog';

export default function HomePage() {
  return (
    <div>
      <HeroBanner />
      <div className="container-page py-10">
        <ProductCatalog />
      </div>
    </div>
  );
}

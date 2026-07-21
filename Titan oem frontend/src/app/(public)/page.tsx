import { ProductCatalog } from '@/features/products/components/ProductCatalog';

export default function HomePage() {
  return (
    <div className="container-page py-10">
      <section className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          OEM Product Catalog
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Explore our complete range of original equipment manufacturer products.
        </p>
      </section>
      <ProductCatalog />
    </div>
  );
}

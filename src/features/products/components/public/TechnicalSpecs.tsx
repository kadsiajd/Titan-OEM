import type { Product } from '../../types/product.types';

interface TechnicalSpecRow {
  label: string;
  value: string;
}

interface TechnicalSpecsProps {
  product: Product;
}

function buildSpecRows(product: Product): TechnicalSpecRow[] {
  return [
    { label: 'SKU', value: product.sku },
    { label: 'Category', value: product.category },
    { label: 'Unit Price', value: `$${product.price.toFixed(2)}` },
    {
      label: 'Availability',
      value: product.stock > 0 ? `${product.stock} units in stock` : 'Out of stock',
    },
    { label: 'Last Updated', value: new Date(product.updatedAt).toLocaleDateString() },
  ];
}

export function TechnicalSpecs({ product }: TechnicalSpecsProps) {
  const specRows = buildSpecRows(product);

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-gray-900">Technical Specifications</h2>
      <p className="mt-1 text-sm text-gray-600">
        Detailed product data sheet for OEM procurement and engineering review.
      </p>
      <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="divide-y divide-gray-200 bg-white">
            {specRows.map((row) => (
              <tr key={row.label}>
                <th
                  scope="row"
                  className="w-1/3 bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-700"
                >
                  {row.label}
                </th>
                <td className="px-4 py-3 text-sm text-gray-900">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

import CategoryProductsPage from "@/features/products/components/products";

interface ProductCategoryPageProps {
    params: Promise<{
        categoryId: string;
    }>;
}

export default async function ProductCategoryPage({
    params,
}: ProductCategoryPageProps) {
    const { categoryId } = await params;

    return <CategoryProductsPage categoryId={categoryId} />;
}

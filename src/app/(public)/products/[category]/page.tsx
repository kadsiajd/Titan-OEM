import CategoryProductsPage from "@/features/products/components/public/commonProducts/commonProducts";
import ProductListing from "@/features/products/components/public/microMotor/MicroMotor";

interface ProductCategoryPageProps {
    params: Promise<{
        category: string;
    }>;
}

export default async function ProductCategoryPage({
    params,
}: ProductCategoryPageProps) {
    const { category } = await params;

    // Special UI only for Micro Motors
    if (category === 'micromotor') {
        return <ProductListing categorySlug={"Micromotor"} />;
    }
    // All other categories use the same UI
    return (
        <CategoryProductsPage
            categorySlug={category}
        />
    );
}
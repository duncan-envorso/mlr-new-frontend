import { Product } from '@/lib/shopify/types';
import { ProductCard } from './ProductCard';


interface ShopProductsGridProps {
  products: Product[];
}

const ShopProductsGrid = ({ products }: ShopProductsGridProps) => {
  return (
    <div className="w-full mx-auto md:my-10  px-4 sm:px-6 lg:px-20">
          <h2 className="text-3xl font-industry-ultra uppercase text-navy">View All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopProductsGrid;
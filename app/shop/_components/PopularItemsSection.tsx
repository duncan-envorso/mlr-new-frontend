import { ShopifyProduct } from '@/lib/shopify/types';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';



interface PopularItemsSectionProps {
  collectionHandle: string[];
  collectionTitle: string[];
  products: ShopifyProduct[];
}

export default function PopularItems({ collectionHandle, collectionTitle, products }: PopularItemsSectionProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="grid gap-1">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{collectionTitle}</h2>
            <p className="text-gray-500 dark:text-gray-400">Check out our most sought-after items</p>
          </div>
          <Link
            className="inline-flex items-center rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-gray-50 hover:bg-gray-900/90 mt-4 md:mt-0"
            href={`/search/${collectionHandle}`}
          >
            View all
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.handle}`} className="group relative block overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-300 hover:shadow-md">
              <Image
                src={product.featuredImage?.url || '/placeholder.svg'}
                alt={product.featuredImage?.altText || product.title}
                width={300}
                height={400}
                className="object-cover w-full h-[200px] sm:h-[300px] transition-transform duration-300 group-hover:scale-105"
              />
              {parseFloat(product.priceRange.minVariantPrice.amount) < parseFloat(product.priceRange.maxVariantPrice.amount) && (
                <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                  SALE
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{product.title}</h3>
                <div className="mt-2 flex items-center justify-between">
                  {parseFloat(product.priceRange.minVariantPrice.amount) < parseFloat(product.priceRange.maxVariantPrice.amount) ? (
                    <>
                      <span className="text-lg font-bold text-green-600">
                        ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${parseFloat(product.priceRange.maxVariantPrice.amount).toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-gray-900">
                      ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
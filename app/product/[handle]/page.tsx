import Price from "@/components/price";
import { Gallery } from "@/components/product/gallery";
import { ProductProvider } from "@/components/product/product-context";
import ProductDescription from "@/components/product/product-description";
import { getProduct, getProductRecommendations } from "@/lib/shopify";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);
  if (!product) return notFound();

  return (
    <ProductProvider>
      <div className="bg-navy/5 min-h-screen mt-32">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <Suspense fallback={<div className="aspect-square bg-navy/10 rounded-2xl" />}>
                  <Gallery
                    images={product.images.slice(0, 5).map((image) => ({
                      src: image.url,
                      altText: image.altText
                    }))}
                  />
                </Suspense>
              </div>
              <div className="md:w-1/2">
                <Suspense>
                  <ProductDescription product={product} />
                </Suspense>
              </div>
            </div>
          </div>
          <RelatedProducts id={product.id} />
        </div>
      </div>
    </ProductProvider>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);
  if (!relatedProducts.length) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-industry-ultra uppercase text-navy mb-6">
        You may like more
      </h2>
      <div className="flex overflow-x-auto gap-4 pb-4">
        {relatedProducts.map((product) => (
          <Link
            key={product.handle}
            href={`/product/${product.handle}`}
            className="flex-none w-64"
          >
            <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
              <div className="aspect-square relative overflow-hidden rounded-xl mb-4">
                <Image
                  src={product.featuredImage?.url || '/placeholder.svg'}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <h3 className="font-industry-ultra uppercase text-sm line-clamp-2 mb-2 text-navy">
                  {product.title}
                </h3>
                <p className="text-xs font-industry-demi text-navy/60 mt-auto">
                  <Price
                    amount={product.priceRange.maxVariantPrice.amount}
                    currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                  />
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
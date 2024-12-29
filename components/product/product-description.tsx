import { Product } from "@/lib/shopify/types";
import { Check } from "lucide-react";
import { AddToCart } from "../cart/add-to-cart";
import Price from "../price";
import Prose from "../prose";
import { VariantSelector } from "./variant-selector";

interface ProductDescriptionProps {
  product: Product;
}

export function ProductDescription({ product }: ProductDescriptionProps) {
  if (!product) {
    return (
      <div className="font-industry-book text-navy/60">
        Product information is not available.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full space-y-6">
      <header>
        <h1 className="text-3xl font-industry-ultra uppercase text-navy">
          {product.title}
        </h1>
      </header>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-2">
          {product.priceRange?.maxVariantPrice && (
            <Price
              amount={product.priceRange.maxVariantPrice.amount}
              currencyCode={product.priceRange.maxVariantPrice.currencyCode}
              className="text-2xl font-industry-ultra text-navy"
            />
          )}
          <span className="text-sm font-industry-book text-navy/60">
            {product.priceRange?.maxVariantPrice?.currencyCode}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-3 py-1 text-sm font-industry-demi text-navy bg-green/20 rounded-full">
            <Check className="w-4 h-4 mr-1 stroke-2 text-green" />
            In stock
          </span>
          <span className="text-sm font-industry-book text-navy/60">
            Ships in 1-2 days
          </span>
        </div>
      </div>

      {product.descriptionHtml && (
        <Prose
          className="text-md font-industry-book text-navy/80 leading-5"
          html={product.descriptionHtml}
        />
      )}

      {product.options && product.variants && (
        <VariantSelector options={product.options} variants={product.variants} />
      )}

      <AddToCart product={product} />

      <div className="border-t border-navy/10 pt-6">
        <h2 className="text-lg font-industry-ultra uppercase text-navy mb-4">
          Highlights
        </h2>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm font-industry-book text-navy/80">
          {[
            'Hand cut and sewn locally',
            'Dyed with our proprietary colors',
            'Pre-washed & pre-shrunk',
            'Ultra-soft 100% cotton'
          ].map((highlight, index) => (
            <li key={index} className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green" fill="currentColor" viewBox="0 0 20 20">
                <path 
                  fillRule="evenodd" 
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductDescription;
'use client'

import { ProductCard } from '@/app/shop/_components/ProductCard'
import { Product } from '@/lib/shopify/types'
import Grid from '../grid'


export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <ProductCard product={product} />
        </Grid.Item>
      ))}
    </>
  )
}
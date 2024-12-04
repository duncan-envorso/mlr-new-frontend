'use client'

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collection } from "@/lib/shopify/types"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { ProductCard } from "./ProductCard"

interface FeaturedCollectionsProps {
  collections: Collection[]
  products: any[] // Replace with your product type
}

export default function FeaturedCollections({ collections, products }: FeaturedCollectionsProps) {
  const featuredCollections = collections.filter(c => 
    ['mens', 'womens', 'new-items-for-2023', 'most-popular-items'].includes(c.handle)
  )

  return (
    <div className="container mx-auto px-4 py-12">
      <Tabs defaultValue={featuredCollections[0]?.handle} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          {featuredCollections.map((collection) => (
            <TabsTrigger key={collection.handle} value={collection.handle}>
              {collection.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {featuredCollections.map((collection) => (
          <TabsContent key={collection.handle} value={collection.handle}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products
                .filter(product => product.collections?.includes(collection.handle))
                .slice(0, 4)
                .map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <div className="mt-8 text-center">
              <Link href={collection.path}>
                <Button variant="outline" size="lg">
                  View All {collection.title}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}


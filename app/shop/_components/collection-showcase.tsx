'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface CollectionProduct {
  id: string
  title: string
  image: string
  price: number
  originalPrice?: number
  path: string
}

interface CollectionSection {
  title: string
  subtitle?: string
  handle: string
  bannerImage: string
  products: CollectionProduct[]
}

interface CollectionShowcaseProps {
  sections: CollectionSection[]
}

export default function CollectionShowcase({ sections }: CollectionShowcaseProps) {
  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <div key={section.handle} className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-[400px,1fr] gap-6">
            {/* Banner Section */}
            <div className="relative h-[400px] lg:h-full">
              <Link href={`/search/${section.handle}`}>
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={section.bannerImage}
                    alt={section.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold text-white">{section.title}</h2>
                      {section.subtitle && (
                        <p className="text-white/90">{section.subtitle}</p>
                      )}
                      <Button variant="secondary" className="mt-4">
                        VIEW ALL
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {section.products.slice(0, 4).map((product) => (
                <Link key={product.id} href={product.path}>
                  <Card className="group h-full overflow-hidden">
                    <div className="relative aspect-square">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-sm font-medium rounded">
                          SALE
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-sm line-clamp-2">{product.title}</h3>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="font-bold">${product.price.toFixed(2)}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


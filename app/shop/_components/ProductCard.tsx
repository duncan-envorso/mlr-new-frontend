"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Product } from "@/lib/shopify/types"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { availableForSale } = product
  const price = parseFloat(product.priceRange?.minVariantPrice?.amount || "0").toFixed(2)

  return (
    <div className="h-full">
      <Card 
        className="relative h-full overflow-hidden bg-background transition-all duration-300 hover:shadow-lg group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0">
          <Link href={`/product/${product.handle}`} className="block">
            <div className="relative aspect-square overflow-hidden bg-muted">
              {/* Product Image */}
              <Image
                src={product.featuredImage?.url || "/placeholder.svg?height=400&width=400"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                alt={product.title}
              />
              
              {/* Gradient Overlay - Always visible but darker on hover */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300"
                style={{
                  opacity: isHovered ? 0.95 : 0.8
                }}
              />

              {/* Product Tags */}
              {product.tags && product.tags[0] && (
                <Badge variant="secondary" className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  {product.tags[0]}
                </Badge>
              )}

              {/* Product Information Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h2 className="text-lg font-semibold mb-2 line-clamp-1">
                  {product.title}
                </h2>
                <p className="text-sm text-white/80 line-clamp-2 mb-3 transition-opacity duration-300"
                   style={{ opacity: isHovered ? 1 : 0.7 }}>
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">${price}</span>
                  {availableForSale ? (
                    <div className="flex gap-2">
                      {/* <Button 
                        variant="outline" 
                        size="sm"
                        className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Quick View
                      </Button> */}
                      <Button 
                      className="bg-accent"
                        variant="default" 
                        size="sm"
                      >
                        Buy Now
                      </Button>
                    </div>
                  ) : (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                </div>
              </div>

              {/* Hover State Enhancements */}
              <div 
                className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 100%)'
                }}
              />
            </div>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
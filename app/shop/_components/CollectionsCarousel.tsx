'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Product } from "@/lib/shopify/types"
import { ArrowRight, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ProductCard } from "./ProductCard"

interface CollectionWithProducts {
    handle: string;
    products: Product[];
}

interface ProductCollectionsCarouselProps {
    collections?: CollectionWithProducts[];
}

export default function ProductCollectionsCarousel({ collections = [] }: ProductCollectionsCarouselProps) {
    if (!collections || collections.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-100 rounded-lg">
                <p className="text-lg text-gray-600">No collections available</p>
            </div>
        );
    }

    return (
        <div className="space-y-16">
            {collections.map((collection) => (
                <CollectionCarousel
                    key={collection.handle}
                    collection={collection}
                />
            ))}
        </div>
    )
}

function CollectionCarousel({
    collection,
}: {
    collection: CollectionWithProducts
}) {
    if (!collection.products || collection.products.length === 0) {
        return (
            <div className="text-center py-8 bg-gray-100 rounded-lg">
                <p className="text-lg text-gray-600">No products available for {collection.handle.replace(/-/g, ' ')}</p>
            </div>
        );
    }

    const firstProduct = collection.products[0];

    return (
        <section className="relative bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8 rounded-xl">
            <div className=" mx-auto">
                {/* Collection Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
                    <div>
                        <h2 className="text-3xl font-bold capitalize bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                            {collection.handle.replace(/-/g, ' ')}
                        </h2>
                        <p className="text-muted-foreground mt-1">Discover our latest additions</p>
                    </div>
                    <Link 
                        href={`/search/${collection.handle}`} 
                        className="group flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                        Browse Collection
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Featured and Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-7 gap-4  h-[90%]">
                    {/* Featured Product */}
                    <div className="col-span-2 md:col-span-3">
                        <Card className="group h-full overflow-hidden transition-all duration-500 hover:shadow-xl bg-gradient-to-br from-primary/5 to-transparent">
                            <CardContent className="p-0 h-full">
                                <Link href={`/product/${firstProduct?.handle}`} className="block h-full">
                                    <div className="relative h-full min-h-[400px]">
                                        {firstProduct?.featuredImage && (
                                            <Image
                                                src={firstProduct.featuredImage.url}
                                                alt={firstProduct.featuredImage.altText || firstProduct.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        )}
                                        {/* Gradient & Content Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90" />
                                        
                                        {/* Featured Badge */}
                                        <div className="absolute top-4 left-4 flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
                                            <Sparkles className="h-4 w-4 text-yellow-400" />
                                            <span className="text-white text-sm font-medium">Featured</span>
                                        </div>

                                        {/* Content */}
                                        <div className="absolute inset-x-0 bottom-0 p-6">
                                            <div className="space-y-4">
                                                <h3 className="text-2xl font-bold text-white">
                                                    {firstProduct?.title}
                                                </h3>
                                                <p className="text-white/80 line-clamp-2">
                                                    {firstProduct?.description}
                                                </p>
                                                {firstProduct?.priceRange?.minVariantPrice?.amount && (
                                                    <p className="text-2xl font-bold text-white">
                                                        ${parseFloat(firstProduct.priceRange.minVariantPrice.amount).toFixed(2)}
                                                    </p>
                                                )}
                                                <Button 
                                                    className="w-full bg-white text-primary hover:bg-white/90 transition-colors"
                                                >
                                                    View Details
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Product Grid */}
                    <div className="col-span-2 md:col-span-4">
                        <div className="grid grid-cols-2 gap-4">
                            {collection.products.slice(1, 5).map((product) => (
                                <div key={product.id}>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
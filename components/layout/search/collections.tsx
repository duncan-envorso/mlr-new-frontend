// components/layout/search/collections/collections-list.tsx
'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Collection } from '@/lib/shopify/types'
import { cn } from '@/lib/utils'
import { Tag } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface CollectionsListProps {
  collections: Collection[]
}

export function CollectionsList({ collections }: CollectionsListProps) {
  const pathname = usePathname()
  
  return (
    <ScrollArea className="h-[calc(100vh-120px)] pr-6">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4" />
          <h2 className="font-semibold text-sm">Collections</h2>
        </div>
        
        <div className="space-y-1">
          <Link 
            href="/search" 
            className={cn(
              "block w-full rounded-md px-2.5 py-2 text-sm transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              pathname === "/search" ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground"
            )}
          >
            All Products
          </Link>
          {collections.slice(0, 5).map((collection) => ( // Slice the array to only include the first 5 collections
            <Link
              key={collection.handle}
              href={`/search/${collection.handle}`}
              className={cn(
                "block w-full rounded-md px-2.5 py-2 text-sm transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                pathname === `/search/${collection.handle}` 
                  ? "bg-accent text-accent-foreground font-medium" 
                  : "text-muted-foreground"
              )}
            >
              {collection.title}
            </Link>
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}

export function CollectionsLoading() {
  return (
    <div className="h-[calc(100vh-120px)] pr-6 space-y-6">
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
      </div>
      
      <div className="space-y-1">
        <div className="h-8 w-full animate-pulse rounded bg-muted" />
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="h-8 w-full animate-pulse rounded bg-muted"
            style={{
              opacity: 1 - (i * 0.1)
            }}
          />
        ))}
      </div>
    </div>
  )
}
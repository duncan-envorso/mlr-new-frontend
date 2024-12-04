// app/components/CategoryButtons.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Package2, Shirt, Tag } from 'lucide-react'

interface CategoryButtonsProps {
  categories: string[]
  categoryFilter: string
  setCategoryFilter: (value: string) => void
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'shirt':
    case 'hoodie':
      return <Shirt className="h-6 w-6" />
    case 'accessories':
      return <Tag className="h-6 w-6" />
    default:
      return <Package2 className="h-6 w-6" />
  }
}

export function CategoryButtons({ categories, categoryFilter, setCategoryFilter }: CategoryButtonsProps) {
  return (
    <div className="flex justify-center mb-8 overflow-y-scroll no-scrollbar">
      <div className="flex gap-4 px-4">
        {categories.map(category => (
          <Button
            key={category}
            variant={categoryFilter === category ? "default" : "outline"}
            className="flex flex-col items-center p-2 shrink-0 bg-white"
            onClick={() => setCategoryFilter(category)}
          >
            {getCategoryIcon(category)}
            <span className="mt-1 text-xs">{category}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
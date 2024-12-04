'use client'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"
import { ChevronDown } from 'lucide-react'

export interface FilterBarProps {
  categories: string[]
  categoryFilter: string
  setCategoryFilter: (value: string) => void
  priceRange: [number, number]
  setPriceRange: (value: [number, number]) => void
}

export function FilterBar({
  categories,
  categoryFilter,
  setCategoryFilter,
  priceRange,
  setPriceRange,
}: FilterBarProps) {
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0] ?? 0, value[1] ?? 1000])
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full sm:w-[200px] justify-between">
            <span>{categoryFilter || "All Categories"}</span>
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px] max-h-[300px] overflow-y-auto">
          {categories.map((category) => (
            <DropdownMenuItem
              key={category}
              className={`cursor-pointer ${categoryFilter === category ? "bg-accent" : ""}`}
              onClick={() => setCategoryFilter(category)}
            >
              {category}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="w-full sm:w-[200px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Price: ${priceRange[0]} - ${priceRange[1]}</span>
        </div>
        <Slider
          defaultValue={[0, 1000]}
          max={500}
          step={10}
          
          value={priceRange}
          onValueChange={handlePriceChange}
          className="w-full bg-white"
        />
      </div>

      <Button
        variant="outline"
        className="w-full sm:w-auto bg-white"
        onClick={() => {
          setCategoryFilter("All")
          setPriceRange([0, 1000])
        }}
      >
        Reset Filters
      </Button>
    </div>
  )
}


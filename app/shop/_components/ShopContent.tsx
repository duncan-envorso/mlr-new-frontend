'use client'

import { currentTeamConfig } from "@/config/teamConfig";
import { Menu, Product } from "@/lib/shopify/types";
import Image from "next/image";
import { Suspense, useState } from "react";
import ProductCollectionsCarousel from "./CollectionsCarousel";
import NavigationMenuDemo from "./DropMenu";
import { SearchBar } from "./SearchBar";

interface CollectionWithProducts {
  handle: string;
  products: Product[];
}

interface ShopContentProps {
  collections: CollectionWithProducts[];
  menus?: Menu[];
}

export default function ShopContent({ collections = [], menus = [] }: ShopContentProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation Menu */}
      <div className="mb-8">
        <NavigationMenuDemo menus={menus} />
      </div>

      {/* Shop Banner */}
      {currentTeamConfig?.shopBanner && (
        <div className="relative w-full h-auto md:h-64 mb-8 rounded-lg overflow-hidden">
          <Image
            src={currentTeamConfig.shopBanner}
            alt={`${currentTeamConfig.name} Shop Banner`}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      
      <Suspense fallback={<p>Loading shop content...</p>}>
          <ProductCollectionsCarousel collections={collections} />
        </Suspense>
    </div>
  );
}
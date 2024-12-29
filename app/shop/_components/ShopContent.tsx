'use client'
import { currentTeamConfig } from "@/config/teamConfig";
import { Menu, Product } from "@/lib/shopify/types";
import Image from "next/image";
import { Suspense, useState } from "react";
import ProductCollectionsCarousel from "./CollectionsCarousel";
import NavigationMenuDemo from "./DropMenu";

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
      <div className="mb-8">
        <NavigationMenuDemo menus={menus} />
      </div>

      {currentTeamConfig?.shopBanner && (
        <div className="relative w-full aspect-[16/9] md:h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={currentTeamConfig.shopBanner}
            alt={`${currentTeamConfig.name} Shop Banner`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-start pl-20 text-white"> {/* Added overlay */}
            <h2 className="text-3xl font-bold">Welcome to the Seawolves Shop!</h2> {/* Welcome message */}
          </div>
        </div>
      )}

      {/* <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div> */}

      <Suspense fallback={<p>Loading shop content...</p>}>
        <ProductCollectionsCarousel collections={collections} />
      </Suspense>
    </div>
  );
}
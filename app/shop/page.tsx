// app/shop/page.tsx
import { getCollectionProducts, getCollections, getMenu } from '@/lib/shopify';
import { Product } from '@/lib/shopify/types';
import { Suspense } from 'react';
import ShopContent from './_components/ShopContent';

export default async function ShopPage() {
  // First get collections and menu
  const [initialCollections, menu] = await Promise.all([
    getCollections(),
    getMenu('main-menu')
  ]);

  const collectionHandles = [
    'most-popular-items', 
    'seawolves-pride-collection',
    'seawolves-rugby-collection',
    'new-accessories-for-2025',
  ];

  // Then fetch products for each collection, skipping the "All" collection
  const collectionsWithProducts = await Promise.all(
    collectionHandles.map(async (handle) => {
      // Skip empty handles
      if (!handle) {
        return null;
      }

      const products = await getCollectionProducts({
        collection: handle,
        sortKey: 'TITLE',
        reverse: false
      });

      // Return collection with its products
      return {
        handle,
        products
      };
    })
  );

  // Filter out null values and explicitly type the result
  const filteredCollections = collectionsWithProducts.filter((collection): collection is { handle: string; products: Product[] } => 
    collection !== null
  );

  return (
    <>
      <Suspense fallback={<div>Loading navigation...</div>}>
      </Suspense>
      <Suspense fallback={<p>Loading shop content...</p>}>
       <ShopContent menus={menu} collections={filteredCollections} />
      </Suspense>
    </>
  );
}
// components/layout/search/collections/index.tsx
import { getCollections } from '@/lib/shopify'
import { Suspense } from 'react'
import { CollectionsList, CollectionsLoading } from './collections'

export default async function Collections() {
  const collections = await getCollections()

  return (
    <Suspense fallback={<CollectionsLoading />}>
      <CollectionsList collections={collections} />
    </Suspense>
  )
}
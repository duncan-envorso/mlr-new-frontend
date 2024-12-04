// File: app/(pages)/news/page.tsx
import { getNewsPosts } from '@/actions';
import { Suspense } from 'react';
import NewsPageComponent from './_components/news-component';

export default async function NewsPage() {
  const posts = await getNewsPosts();

  return (
    <div className="container mx-auto p-4">
      
      <Suspense fallback={<div>Loading news...</div>}>
      <NewsPageComponent posts={posts}  />
      </Suspense>
    </div>
  );
}

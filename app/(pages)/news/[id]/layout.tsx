import { getRelatedArticles } from '@/actions'
import BlogSideBar from '../_components/sidebar'

export default async function NewsLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const relatedArticles = await getRelatedArticles((params.id))

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">{children}</div>
        <aside className="lg:w-1/3">
        <BlogSideBar relatedArticles={relatedArticles.map((article) => ({ ...article, id: parseInt(article.id), date_formatted: new Date(article.date_posted).toLocaleDateString() }))} />
        </aside>
      </div>
    </div>
  )
}
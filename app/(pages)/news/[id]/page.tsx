
import { getNewsPostById } from '@/actions'
import { notFound } from 'next/navigation'
import NewsArticle from '../_components/newsarticle'

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await getNewsPostById(params.id)

  if (!article) {
    notFound()
  }

  return <NewsArticle article={article} />
}
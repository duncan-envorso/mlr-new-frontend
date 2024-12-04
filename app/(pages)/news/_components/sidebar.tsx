import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { NewsPostList } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'

async function BlogSideBar({ relatedArticles }: { relatedArticles: NewsPostList[] }) {
  return (
    <Card className='bg-white shadow'>
    <CardHeader>
      <CardTitle>Related Articles</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-6">
        {relatedArticles.map((article) => (
          <Link href={`/news/${article.id}`} key={article.id} className="block group">
            <div className="flex items-center space-x-4">
              <div className="relative w-20 h-20 rounded-md overflow-hidden">
                <Image
                  src={article.image as string} 
                  alt={article.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold group-hover:text-primary transition-colors">{article.title}</h3>
                <p className="text-sm text-muted-foreground">{article.date_formatted}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </CardContent>
  </Card>
  )
}

export default BlogSideBar

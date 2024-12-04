'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { NewsPost } from '@/lib/types'
import { CalendarIcon } from 'lucide-react'
import Image from 'next/image'

export default function NewsArticle({ article }: { article: NewsPost }) {
  return (
    <Card className="overflow-hidden shadow bg-white">
      <div className="relative h-[400px] md:h-[500px]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
        />
   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-background via-background/95 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Badge variant="secondary" className="mb-2 bg-accent">{article.type}</Badge>
          <CardTitle className="text-3xl md:text-4xl font-bold text-white mb-2">{article.title}</CardTitle>
          <div className="flex items-center text-sm text-white/80 space-x-4">
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {/* {{ edit_1 }} */}
              {article.date_posted}
            </div>
            <div className="flex items-center">
              {/* <UserIcon className="mr-2 h-4 w-4" /> */}
              {/* {article.author || 'Unknown Author'} */}
            </div>
          </div>
        </div>
      </div>
      <CardContent className="p-6 md:p-8">
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.text }}
        />
      </CardContent>
    </Card>
  )
}
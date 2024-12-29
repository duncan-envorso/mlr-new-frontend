'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { NewsPostList } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { ChevronRight, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const NewsItem = ({ post }: { post: NewsPostList }) => (
    <Link href={`/news/${post.id}`} className="group block">
      <Card className="overflow-hidden transition-all bg-primary/10 shadow mt-4 duration-300 hover:bg-accent">
        <CardContent className="p-4">
          <div className="flex gap-4">
            {/* Image */}
            <div className="relative w-24 h-24 flex-shrink-0">
              <Image
                src={post.image || '/images/seawolves-logo.png?height=80&width=80'}
                alt={post.title}
                fill
                className="object-cover rounded-md"
                sizes="200px"
              />
            </div>
  
            {/* Content */}
            <div className="flex-grow min-w-0"> {/* min-w-0 helps with text truncation */}
              <h4 className="text-sm font-medium line-clamp-2 group-hover:text-green transition-colors mb-2">
                {post.title}
              </h4>
              
              <div className="flex flex-wrap items-center gap-2">
                <Badge 
                  variant="outline" 
                  className="text-[10px] bg-green text-primary-foreground uppercase flex-shrink-0"
                >
                  {post.type}
                </Badge>
                
                {post.date_formatted && (
                  <span className="flex items-center text-xs text-grey whitespace-nowrap">
                    <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                    {formatDistanceToNow(new Date(post.date_formatted), { addSuffix: true })}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );

export default function NewsSidebar({ posts }: { posts: NewsPostList[] }) {
  return (
    <Card className="p-4 mt-2 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-md text-navy uppercase">Latest News</h2>
        <Link 
          href="/news" 
          className="text-green hover:text-navy inline-flex items-center gap-1 text-sm transition-colors"
        >
          View All
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      
      <div className="space-y-3">
        {posts.slice(0, 5).map((post) => (
          <NewsItem key={post.id} post={post} />
        ))}
      </div>
    </Card>
  );
}


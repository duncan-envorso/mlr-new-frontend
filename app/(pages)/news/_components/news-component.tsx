'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { NewsPostList } from '@/lib/types';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useState } from 'react';

export default function NewsPageComponent({ posts }: { posts: NewsPostList[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;
  const totalPages = Math.ceil(posts.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = posts.slice(indexOfFirstArticle, indexOfLastArticle);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto mt-6 border-none p-4"
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8 text-4xl font-bold text-foreground tracking-tight"
      >
        Team News
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, staggerChildren: 0.1 }}
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="wait">
          {currentArticles.map((article: NewsPostList) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/news/${article.id}`}>
                <Card className="group relative flex flex-col overflow-hidden bg-card transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Suspense fallback={<div className="h-full w-full bg-muted animate-pulse"></div>}>
                      <Image
                        src={article.image || '/images/seawolves-logo.png'}
                        alt={article.title || 'Rugby news'}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-500 group-hover:scale-110"
                      />
                    </Suspense>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="absolute left-4 top-4"
                    >
                      <Badge variant="secondary" className="bg-primary text-primary-foreground shadow-md">
                        {article.type}
                      </Badge>
                    </motion.div>
                  </div>
                  <CardContent className="flex flex-col space-y-3 p-6">
                    <div className="text-sm text-muted-foreground">
                      {article.date_formatted}
                    </div>
                    <h2 className="text-xl font-semibold leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                      {article.title}
                    </h2>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="mt-auto flex items-center text-sm text-primary font-medium"
                    >
                      Read more
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </motion.div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 flex items-center justify-center space-x-4"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="hover:bg-muted"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
        </motion.div>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="hover:bg-muted"
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
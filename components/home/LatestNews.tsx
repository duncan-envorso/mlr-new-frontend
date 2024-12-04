'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { NewsPostList } from '@/lib/types';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface NewsSectionProps {
  news: NewsPostList[];
}

// Updated responsive configuration with more breakpoints
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1536 },
    items: 4,
    slidesToSlide: 1
  },
  desktop: {
    breakpoint: { max: 1536, min: 1024 },
    items: 3,
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
    slidesToSlide: 1
  },
  smallTablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 2,
    slidesToSlide: 1
  }
};

export default function NewsCarousel({ news }: NewsSectionProps) {
  const [hoveredArticle, setHoveredArticle] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const CustomButtonGroup = ({ next, previous }: any) => {
    return (
      <div className="custom-button-group absolute left-2 right-2 sm:left-4 sm:right-4 top-1/2 flex -translate-y-1/2 transform justify-between">
        <Button
          onClick={previous}
          className="z-10 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary p-1.5 sm:p-2 text-primary-foreground shadow-lg transition-all hover:bg-primary/80 hover:shadow-xl"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
        </Button>
        <Button
          onClick={next}
          className="z-10 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary p-1.5 sm:p-2 text-primary-foreground shadow-lg transition-all hover:bg-primary/80 hover:shadow-xl"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
        </Button>
      </div>
    );
  };

  return (
    <section ref={ref} className="relative overflow-hidden py-12 sm:py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black"></div>
      <div 
        className="absolute inset-0 z-[-2] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]" 
        aria-hidden="true" 
      />

      <div className="container relative z-10 mx-auto px-2 sm:px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="space-y-6 sm:space-y-8 md:space-y-12"
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-primary-foreground mb-2 sm:mb-4 text-center"
            variants={itemVariants}
          >
            Latest Rugby News
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-primary-foreground text-center mb-6 sm:mb-8 md:mb-12"
            variants={itemVariants}
          >
            Stay updated with the latest happenings in the rugby world
          </motion.p>

          <motion.div className="relative -mx-2 sm:mx-0" variants={containerVariants}>
            <Carousel
              responsive={responsive}
              infinite={true}
              customButtonGroup={<CustomButtonGroup />}
              renderButtonGroupOutside={true}
              arrows={false}
              itemClass="px-2 sm:px-4"
              containerClass="pb-8 sm:pb-12"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              deviceType="desktop"
            >
              {news.map((article) => (
                <motion.div
                  key={article.id}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredArticle(String(article.id))}
                  onMouseLeave={() => setHoveredArticle(null)}
                >
                  <Link href={`/news/${article.id}`}>
                    <Card className="group h-[300px] sm:h-[350px] md:h-[420px] w-full cursor-pointer overflow-hidden rounded-lg border-none bg-black/50 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-2xl">
                      <div className="relative h-full">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          priority
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          style={{
                            objectFit: 'cover',
                          }}
                          className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                          <Badge
                            variant="secondary"
                            className="mb-2 sm:mb-3 bg-primary text-xs sm:text-sm font-semibold text-primary-foreground"
                          >
                            {article.type}
                          </Badge>
                          <CardTitle className="mb-2 text-lg sm:text-xl md:text-2xl font-bold transition-transform duration-300 group-hover:translate-y-[-4px] line-clamp-2">
                            {article.title}
                          </CardTitle>
                          <p className="text-xs sm:text-sm text-gray-300 mb-2 sm:mb-4">
                            <time dateTime={article.date_formatted}>{article.date_formatted}</time>
                          </p>
                          <div className="flex items-center text-xs sm:text-sm font-medium text-accent opacity-0 transition-all duration-300 group-hover:opacity-100">
                            Read More
                            <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </Carousel>
          </motion.div>

          <motion.div className="mt-8 sm:mt-12 text-center" variants={itemVariants}>
            <Link href="/news">
              <Button className="bg-primary px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/80 hover:shadow-xl">
                View All News
                <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
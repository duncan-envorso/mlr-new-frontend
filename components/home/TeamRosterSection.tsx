'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { RosterData, RosterMember } from '@/lib/types/roster';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface RosterSectionProps {
  rosterData: RosterData;
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};

export default function RosterSection({ rosterData }: RosterSectionProps) {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

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
      <div className="custom-button-group absolute left-4 right-4 top-1/2 flex -translate-y-1/2 transform justify-between">
        <Button
          onClick={previous}
          className="z-10 rounded-full bg-green p-2 text-navy shadow-lg transition-all hover:bg-green/90 hover:shadow-xl"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          onClick={next}
          className="z-10 rounded-full bg-green p-2 text-navy shadow-lg transition-all hover:bg-green/90 hover:shadow-xl"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    );
  };

  return (
    <section ref={ref} className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/90 to-navy"></div>
      <Image
        src="/images/starfire-stadium.jpg"
        alt="Stadium Background"
        fill
        quality={100}
        className="opacity-30"
        priority
        style={{ objectFit: 'cover' }}
      />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.h2
            className="text-4xl font-industry-ultra uppercase text-white mb-6 text-center"
            variants={itemVariants}
          >
            Meet the Team
          </motion.h2>

          <motion.div className="relative" variants={containerVariants}>
            <Carousel
              responsive={responsive}
              infinite={true}
              customButtonGroup={<CustomButtonGroup />}
              renderButtonGroupOutside={true}
              arrows={false}
              itemClass="px-4"
              containerClass="pb-12"
            >
              {rosterData.map((member: RosterMember) => (
                <motion.div
                  key={member.team_id}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredMember(member.team_id)}
                  onMouseLeave={() => setHoveredMember(null)}
                  className="px-2"
                >
                  <Link href={`/roster/${member.team_id}`}>
                    <Card className="group h-[420px] w-full cursor-pointer overflow-hidden rounded-lg border-none bg-navy/50 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-2xl">
                      <div className="relative h-full">
                        <Image
                          src={member.portrait || '/placeholder-image.jpg'}
                          alt={`Portrait of ${member.name}`}
                          layout="fill"
                          objectFit="cover"
                          objectPosition="top center"
                          className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <CardTitle className="mb-2 text-2xl font-industry-ultra uppercase transition-transform duration-300 group-hover:translate-y-[-4px]">
                            {member.name}
                          </CardTitle>
                          <Badge
                            variant="secondary"
                            className="mb-3 bg-green text-sm font-industry-demi uppercase text-navy"
                          >
                            {member.position}
                          </Badge>
                          <p className="text-sm font-industry-book text-gray-300 opacity-0 transition-all duration-300 group-hover:opacity-100">
                            {member.height} cm | {member.weight} kg
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </Carousel>
          </motion.div>

          <motion.div className="mt-12 text-center" variants={itemVariants}>
            <Link href="/roster">
              <Button className="font-industry-ultra uppercase bg-green px-8 py-6 text-lg text-navy shadow-lg transition-all hover:bg-green/90 hover:shadow-xl">
                View Full Roster
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
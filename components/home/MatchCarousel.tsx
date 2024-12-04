'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Match } from '@/lib/types';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState } from 'react';
import TeamSection from "./TeamSection";

const MatchCarousel = ({ matches }: { matches: Match[] | undefined | null }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  
  const validMatches = useMemo(() => {
    return Array.isArray(matches) ? matches : [];
  }, [matches]);

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const pageVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  if (validMatches.length === 0) {
    return (
      <motion.div 
        ref={containerRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="w-full h-[500px] flex items-center justify-center bg-gradient-to-b from-primary/20 to-transparent"
      >
        <motion.p
          variants={cardVariants}
          className="text-lg text-white/70"
        >
          No matches available
        </motion.p>
      </motion.div>
    );
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % validMatches.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + validMatches.length) % validMatches.length);
  };

  const getCardStyle = (index: number) => {
    const diff = (index - currentIndex + validMatches.length) % validMatches.length;
    const normalizedDiff = diff > validMatches.length / 2 ? diff - validMatches.length : diff;

    let translateX = '0%';
    let scale = 1;
    let opacity = 1;
    let zIndex = 0;
    let translateY = '0px';

    if (normalizedDiff === 0) {
      scale = isHovered ? 1.02 : 1;
      zIndex = 3;
    } else if (normalizedDiff === 1 || normalizedDiff === -1) {
      scale = 0.85;
      translateX = normalizedDiff > 0 ? '95%' : '-95%';
      opacity = 0.7;
      zIndex = 2;
      translateY = '20px';
    } else {
      scale = 0.7;
      translateX = normalizedDiff > 0 ? '190%' : '-190%';
      opacity = 0.5;
      zIndex = 1;
      translateY = '40px';
      if (Math.abs(normalizedDiff) > 2) {
        opacity = 0;
      }
    }

    return {
      transform: `translateX(${translateX}) translateY(${translateY}) scale(${scale})`,
      opacity,
      zIndex,
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      pointerEvents: normalizedDiff === 0 ? 'auto' : 'none'
    };
  };

  return (
    <motion.div 
      ref={containerRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative w-full min-h-[700px] p-8 overflow-hidden bg-gradient-to-br from-gray-900/90 via-primary/20 to-gray-900/90 border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.3)]"
    >
      <div className="relative z-10">
        <div className="mb-2">
          <motion.h2
            variants={pageVariants}
            className="text-4xl font-bold font-heading text-primary-foreground text-center mb-4"
          >
            2024 Season Matchups
          </motion.h2>
          <motion.p
            variants={pageVariants}
            className="text-xl text-primary-foreground text-center"
          >
          All Games at a Glance
          </motion.p>
        </div>

        <div className="relative h-[500px]">
          <AnimatePresence>
            {validMatches.length > 1 && (
              <>
                <motion.div
                  variants={buttonVariants}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevSlide}
                    className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white 
                             transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </Button>
                </motion.div>

                <motion.div
                  variants={buttonVariants}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextSlide}
                    className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white 
                             transition-all duration-300 hover:scale-110"
                  >
                    <ChevronRight className="h-8 w-8" />
                  </Button>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <motion.div 
            variants={pageVariants}
            className="relative h-full flex items-center justify-center"
          >
            {validMatches.map((match, index) => (
              <div
                key={match.match_id}
                className="absolute w-full max-w-xl"
                style={{ ...getCardStyle(index), pointerEvents: getCardStyle(index).zIndex === 3 ? 'auto' : 'none' }}
                onMouseEnter={() => index === currentIndex && setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Card className="overflow-hidden bg-primary/90 backdrop-blur-xl text-white 
                               transition-shadow duration-300 hover:shadow-2xl">
                  <CardContent className="p-0">
                    <motion.div
                      initial={false}
                      animate={{ backgroundColor: isHovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.1)' }}
                      className="flex items-center justify-between px-4 py-3"
                    >
                      <Badge variant="secondary" className="bg-primary text-sm">
                        Round {match.round}
                      </Badge>
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>{new Date(match.start_time).toLocaleDateString()}</span>
                      </div>
                    </motion.div>

                    <div className="p-6">
                      <div className="mb-6 flex items-center justify-between">
                        <TeamSection
                          team={match.homeTeam}
                          score={match.home_score}
                          opponentScore={match.away_score}
                        />

                        <div className="mx-4 text-2xl font-bold">VS</div>

                        <TeamSection
                          team={match.awayTeam}
                          score={match.away_score}
                          opponentScore={match.home_score}
                        />
                      </div>

                      <div className="space-y-4">
                        <motion.div
                          className="flex items-center justify-center rounded-lg bg-white/10 px-4 py-2"
                          whileHover={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                        >
                          <MapPin className="mr-2 h-4 w-4" />
                          <span className="text-sm">{match.venue}</span>
                        </motion.div>

                        <Link href={`/schedule/${match.match_id}`} className="block">
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <Button
                              className="w-full bg-white/10 hover:bg-white/20 text-white"
                              variant="ghost"
                            >
                              Match Details
                            </Button>
                          </motion.div>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MatchCarousel;
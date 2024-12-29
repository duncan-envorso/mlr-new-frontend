'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";
import { useMemo, useRef, useState } from 'react';

interface MatchData {
  venue: string;
  start_time: string;
  round: number;
  name: string;
  match_id: string;
  match_type: string;
  home_score: number | null;
  away_score: number | null;
  homeTeam: Team;
  awayTeam: Team;
}

interface Team {
  name: string;
  shortName: string;
  wins: number | null;
  losses: number | null;
  draws: number | null;
  image_path: string;
}

const MatchCarousel = ({ upcomingMatches, pastMatches }: { upcomingMatches: MatchData[], pastMatches: MatchData[] }) => {
  const containerRef = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  
  const allMatches = useMemo(() => {
    return [...pastMatches.slice(-5).reverse(), ...upcomingMatches.slice(0, 5)];
  }, [upcomingMatches, pastMatches]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    
    return {
      date: new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Los_Angeles',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }).format(date),
      
      time: new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).format(date) + ' PT'
    };
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const scrollTo = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
    setCurrentIndex(index);
  };

  return (
    <motion.div 
      ref={containerRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative w-full p-8 overflow-hidden bg-gradient-to-br from-navy via-navy/80 to-navy border border-ice-blue/20 rounded-xl shadow-[0_0_15px_rgba(198,218,231,0.1)]"
    >
      <motion.h2
        variants={cardVariants}
        className="text-4xl font-industry-ultra uppercase text-ice-blue text-center mb-8"
      >
        Seawolves Matches
      </motion.h2>

      <div 
        ref={carouselRef}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {allMatches.map((match, index) => {
          const { date, time } = formatDateTime(match.start_time);
          return (
            <motion.div
              key={match.match_id}
              variants={cardVariants}
              className="flex-shrink-0 w-full snap-center"
            >
              <Card className="mx-auto max-w-xl overflow-hidden bg-navy/90 backdrop-blur-xl text-ice-blue border border-ice-blue/20 transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(198,218,231,0.2)]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="bg-green text-navy text-sm font-industry-demi">
                      Round {match.round}
                    </Badge>
                    <div className="flex flex-col items-end text-sm">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>{date}</span>
                      </div>
                      <span className="text-green mt-1">{time}</span>
                    </div>
                  </div>

                  <div className="mb-6 flex items-center justify-between">
                    <TeamSection team={match.homeTeam} score={match.home_score} />
                    <div className="mx-4 text-2xl font-industry-ultra">VS</div>
                    <TeamSection team={match.awayTeam} score={match.away_score} />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-center rounded-lg bg-ice-blue/10 px-4 py-2">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span className="text-sm">{match.venue}</span>
                    </div>

                    <Link href={`/schedule/${match.match_id}`} className="block">
                      <Button
                        className="w-full bg-green hover:bg-green/90 text-navy font-industry-demi"
                      >
                        Match Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {allMatches.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-green' : 'bg-ice-blue/30'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

const TeamSection = ({ team, score }: { team: Team, score: number | null }) => (
  <div className="flex flex-col items-center">
    <div className="relative w-16 h-16 mb-2">
      <Image
        src={team.image_path}
        alt={team.name}
        fill
        className="object-contain"
      />
    </div>
    <span className="text-sm font-industry-demi text-center">{team.shortName}</span>
    {score !== null && <span className="text-xl font-industry-ultra">{score}</span>}
  </div>
);

export default MatchCarousel;
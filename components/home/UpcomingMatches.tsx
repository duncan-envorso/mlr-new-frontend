"use client"

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Match } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, MapPinIcon } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";
import { Badge } from "../ui/badge";

interface UpcomingMatchesCarouselProps {
  matches: {
    upcomingMatchesData: Match[];
    pastMatchesData: Match[];
  }
}

export function UpcomingMatchesCarousel({ matches }: UpcomingMatchesCarouselProps) {
  const getStadiumImage = (venue: string) => {
    // Remove special characters and spaces, convert to lowercase
    const normalizedVenue = venue
      .replace(/[^a-zA-Z\s]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase();

    const stadiumMap: { [key: string]: string } = {
      'anthem': '/images/stadiums/Anthem.webp',
      'maryland-soccerplex': '/images/stadiums/Maryland SoccerPlex.png',
      'mecklenburg-county-sportsplex': '/images/stadiums/Mecklenburg County Sportsplex.png',
      'sabercats-stadium': '/images/stadiums/SaberCats Stadium.png',
      'snapdragon-stadium': '/images/stadiums/Snapdragon Stadium, San Diego.webp',
      'starfire-stadium': '/images/stadiums/Starfire.webp',
      'the-gold-mine-at-the-shrine-on-airline': '/images/stadiums/The Gold Mine at the Shrine on Airline.png',
      'torero-stadium': '/images/stadiums/Torero Stadium.png',
      'veterans-memorial-stadium': '/images/stadiums/Veterans Memorial Stadium.png',
      'wallis-annenberg-stadium-ucla': '/images/stadiums/Wallis Annenberg Stadium (UCLA).png',
      'zions-bank-stadium': '/images/stadiums/Zions Bank Stadium.png'
    };

    return Object.entries(stadiumMap).find(([key]) =>
      normalizedVenue.includes(key)
    )?.[1] || '/images/stadiums/Starfire.webp';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date) + ' PT';
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
      scale: 0.95
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };


  return (
    <div className="relative w-full py-16 px-4 md:px-10 bg-navy">
      {/* Header Section remains the same */}
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto mb-12 text-center"
      >
        <span className="text-green font-industry-demi text-sm tracking-wider mb-2 block">
          MAJOR LEAGUE RUGBY
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-industry-ultra uppercase text-white mb-4">
          2025 Season Matchups
        </h2>
        <p className="text-ice-blue/80 font-industry-book max-w-2xl mx-auto">
          Join us for an exciting season of professional rugby as the Seattle Seawolves compete in Major League Rugby
        </p>
      </motion.div>

      {/* Carousel Section */}
      <div className="relative max-w-[1400px] mx-auto">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {matches.upcomingMatchesData.map((match, index) => (
              <CarouselItem key={match.match_id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative h-[600px] group overflow-hidden rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl"
                >
                  {/* Background */}
                  <Image
                    src={getStadiumImage(match.venue)}
                    alt={match.venue}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/50 to-transparent" />

                  {/* Round Badge - New */}
                  <div className="absolute top-4 right-4 bg-green text-navy px-3 py-1 rounded-full">
                    <span className="text-sm font-industry-demi">Round {match.round}</span>
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-between p-8 text-white">
                    <div className="space-y-6">
                      {/* League Badge */}
                      <div className="inline-block p-2 bg-navy/30 backdrop-blur-sm rounded-lg">
                        <Image
                          src="/images/mlr-logo.png"
                          alt="Major League Rugby Logo"
                          width={50}
                          height={50}
                          className="w-12 h-12"
                        />
                      </div>

                      {/* Match Info - Restructured */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 text-white text-lg">
                          <CalendarIcon className="w-5 h-5 text-green" />
                          <span className="font-industry-demi">{formatDate(match.start_time)}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-ice-blue/90 text-lg">
                          <ClockIcon className="w-5 h-5" />
                          <span>{formatTime(match.start_time)}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-ice-blue/80">
                          <MapPinIcon className="w-5 h-5" />
                          <span className="text-sm leading-tight">{match.venue}</span>
                        </div>
                      </div>
                    </div>

                    {/* Teams Section */}
                    <div className="space-y-8">
                      {/* Teams Container */}
                      <div className="space-y-4">
                        {/* Home Team */}
                        <div className="relative flex items-center space-x-4 p-4 rounded-lg bg-white/5 backdrop-blur-sm transition-colors duration-300 hover:bg-white/10">
                          <Image
                            src={match.homeTeam.image_path}
                            alt={match.homeTeam.name}
                            width={70}
                            height={70}
                            className="w-14 h-14 object-contain"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="font-industry-demi">
                                Home
                              </Badge>
                              <h2 className="text-xl font-industry-ultra uppercase">
                                {match.homeTeam.shortName}
                              </h2>
                            </div>
                            {match.homeTeam.wins !== 0 && (
                              <p className="text-sm text-ice-blue/70 mt-1">
                                {match.homeTeam.wins}W - {match.homeTeam.losses}L
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Away Team */}
                        <div className="relative flex items-center space-x-4 p-4 rounded-lg bg-white/5 backdrop-blur-sm transition-colors duration-300 hover:bg-white/10">
                          <Image
                            src={match.awayTeam.image_path}
                            alt={match.awayTeam.name}
                            width={70}
                            height={70}
                            className="w-14 h-14 object-contain"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-industry-demi text-ice-blue"><Badge>Away</Badge></span>
                              <h2 className="text-xl font-industry-ultra uppercase">
                                {match.awayTeam.shortName}
                              </h2>
                            </div>
                            {match.awayTeam.wins !== 0 && (
                              <p className="text-sm text-ice-blue/70 mt-1">
                                {match.awayTeam.wins}W - {match.awayTeam.losses}L
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <Button
                          className={cn(
                            "w-full text-navy font-industry-ultra uppercase py-5 text-lg transition-all duration-300",
                            new Date(match.start_time) > new Date()
                              ? "bg-green hover:bg-green/90"
                              : "bg-gray-500 cursor-not-allowed"
                          )}
                          asChild
                          disabled={new Date(match.start_time) <= new Date()}
                        >
                          {match.tickets_url ? (
                            <Link href={match.tickets_url as string} target="_blank" rel="noopener noreferrer">
                              {new Date(match.start_time) > new Date() ? "BUY TICKETS" : "MATCH ENDED"}
                            </Link>
                          ) : (
                            <span>{new Date(match.start_time) > new Date() ? "BUY TICKETS" : "MATCH ENDED"}</span>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-2 border-white bg-transparent text-white hover:bg-white/10 font-industry-ultra uppercase py-5 text-lg transition-all duration-300"
                        >
                          {new Date(match.start_time) > new Date() ? "MATCH DETAILS" : "NOTIFY ME"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Controls */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center space-x-4">
            <CarouselPrevious className="relative left-0 right-0 top-0 h-12 w-12 rounded-full border-2 border-green bg-navy/50 backdrop-blur-sm text-green hover:bg-green hover:text-navy transition-all duration-300">
              <ChevronLeftIcon className="h-6 w-6" />
            </CarouselPrevious>
            <CarouselNext className="relative left-0 right-0 top-0 h-12 w-12 rounded-full border-2 border-green bg-navy/50 backdrop-blur-sm text-green hover:bg-green hover:text-navy transition-all duration-300">
              <ChevronRightIcon className="h-6 w-6" />
            </CarouselNext>
          </div>
        </Carousel>
      </div>
    </div>
  );
}
"use client"

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";
import Image from 'next/image';

interface Match {
  match_id: number
  date: string
  time: string
  week: number
  home_team: string
  away_team: string
  location: string
  ticket_url: string
  background_image: string
}

interface UpcomingMatchesCarouselProps {
  matches: Match[]
}

export function UpcomingMatchesCarousel({ matches }: UpcomingMatchesCarouselProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }

  const formatTime = (timeStr: string) => {
    const timeParts = timeStr.match(/(\d+):(\d+)(?:\s*([ap]m)?)?/i);
  
    if (!timeParts) {
      console.error("Invalid time format:", timeStr);
      return timeStr; 
    }
  
    let hours = parseInt(timeParts[1] || '0');
    const minutes = parseInt(timeParts[2] || '0');
    const ampm = timeParts[3]?.toLowerCase() || ""; // Handle undefined case
  
    if (ampm === 'pm' && hours !== 12) {
      hours += 12;
    } else if (ampm === 'am' && hours === 12) {
      hours = 0; 
    }
  
    const date = new Date(2000, 0, 1, hours, minutes);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) + ' ET';
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

  return (
    <div className="w-full relative p-10">
      <motion.h2
        variants={pageVariants}
        className="text-4xl font-bold font-heading text-primary text-center mb-4"
      >
        2025 Season Matchups
      </motion.h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {matches.map((match) => (
         <CarouselItem key={match.match_id} className="md:basis-1/2 lg:basis-1/3 p-2 md:p-4">
         <motion.div 
           className="relative h-[550px] overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl"
          
           initial="hidden"
         
         >
           {/* Background Image with Gradient Overlay */}
           <div 
             className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-105"
             style={{
               backgroundImage: `url(${match.background_image || "/placeholder.svg?height=550&width=400"})`,
             }}
           >
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
             <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black/80 to-transparent" />
           </div>

           {/* Content */}
           <div className="relative h-full flex flex-col justify-between p-6 text-white">
             {/* League Type & Date */}
             <div>
               <div className="mb-2">
                 <Image 
                   src="/images/mlr-logo.png" 
                   alt="Major League Rugby Logo" 
                   width={50}
                   height={50}
                   className="w-12 h-12"
                 />
               </div>
               <div className="text-sm font-medium uppercase tracking-wider mb-2">
                 MAJOR LEAGUE RUGBY
               </div>
               <div className="flex flex-col space-y-1 text-sm font-medium">
                 <div className="flex items-center space-x-2">
                   <CalendarIcon className="w-4 h-4" />
                   <span>{formatDate(match.date)}</span>
                 </div>
                 <div className="flex items-center space-x-2">
                   <ClockIcon className="w-4 h-4" />
                   <span>{formatTime(match.time)}</span>
                 </div>
                 <div className="flex items-center space-x-2">
                   <MapPinIcon className="w-4 h-4" />
                   <span>{match.location}</span>
                 </div>
               </div>
             </div>

             {/* Teams */}
             <div className="space-y-6">
               <div className="flex items-center space-x-4">
                 <Image
                   src={`/images/teams/${match.home_team}.png`}
                   alt={`${match.home_team} logo`}
                   width={70}
                   height={70}
                   className="w-16 h-16 object-contain"
                 />
                 <h2 className="text-2xl font-bold uppercase">
                   {match.home_team}
                 </h2>
               </div>
               <div className="flex items-center space-x-4">
                 <Image
                   src={`/images/teams/${match.away_team}.png`}
                   alt={`${match.away_team} logo`}
                   width={70}
                   height={70}
                   className="w-16 h-16 object-contain"
                 />
                 <h2 className="text-2xl font-bold uppercase">
                   {match.away_team}
                 </h2>
               </div>

               {/* Buttons */}
               <div className="space-y-3 pt-4">
                 <Button 
                   className={cn(
                     "w-full text-white font-semibold py-3 text-lg transition-all duration-300 ease-in-out",
                     new Date(match.date) > new Date() 
                       ? "bg-accent hover:bg-accent-dark" 
                       : "bg-gray-500 cursor-not-allowed"
                   )}
                   asChild
                   disabled={new Date(match.date) <= new Date()}
                 >
                   <a href={match.ticket_url} target="_blank" rel="noopener noreferrer">
                     {new Date(match.date) > new Date() ? "BUY TICKETS" : "COMING SOON"}
                   </a>
                 </Button>
                 <Button 
                   variant="outline" 
                   className="w-full border-primary text-primary-foreground hover:bg-primary hover:text-white font-semibold py-3 text-lg transition-all duration-300 ease-in-out"
                 >
                   {new Date(match.date) > new Date() ? "DISCOVER MORE" : "NOTIFY ME"}
                 </Button>
               </div>
             </div>
           </div>
         </motion.div>
       </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 bottom-4 top-auto bg-transparent border-white text-white hover:bg-white hover:text-black" />
        <CarouselNext className="absolute left-16 bottom-4 top-auto bg-transparent border-white text-white hover:bg-white hover:text-black" />
      </Carousel>
    </div>
  )
}


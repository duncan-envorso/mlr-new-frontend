'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Match } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Calendar, Clock, MapPin, Trophy } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

export type Team = {
  name: string;
  shortName: string;
  wins: number | null;
  losses: number | null;
  draws: number | null;
  image_path: string;
};



export type MatchesData = {
  upcomingMatchesData: Match[];
  pastMatchesData: Match[];
};

const TeamRecord: React.FC<{ team: Team }> = ({ team }) => {
  if (team.wins === null || team.losses === null || team.draws === null) {
    return null;
  }

  return (
    <div className="text-xs text-white/70 mt-1">
      <span className="font-industry-medium">{team.wins}W</span>
      <span className="mx-1">-</span>
      <span className="font-industry-medium">{team.losses}L</span>
      <span className="mx-1">-</span>
      <span className="font-industry-medium">{team.draws}D</span>
    </div>
  );
};

const TeamInfo: React.FC<{
  team: Team;
  score: number | null;
  opponentScore: number | null;
  isHome: boolean;
}> = ({ team, score, opponentScore, isHome }) => (
  <div className={`flex flex-col items-center ${isHome ? 'text-right' : 'text-left'} flex-1`}>
    <div className="relative mb-2">
      <div className="absolute inset-0 rounded-full bg-white opacity-20"></div>
      <Image
        src={team.image_path}
        width={48}
        height={48}
        alt={team.name}
        className="relative z-10 h-12 w-12 object-contain"
      />
    </div>
    <div className="flex flex-col items-center">
      <h3 className="text-sm font-industry-ultra uppercase truncate max-w-[120px]">
        {team.shortName}
      </h3>
      <TeamRecord team={team} />
    </div>
    <div className="flex items-center mt-2">
      {score !== null && opponentScore !== null && score > opponentScore && (
        <Trophy className="mr-1 h-4 w-4 text-green" />
      )}
      <span className="text-2xl font-industry-ultra">
        {score !== null ? score : '-'}
      </span>
    </div>
  </div>
);

const formatToSeattleTime = (utcDateString: string) => {
  const date = new Date(utcDateString);
  
  // Format options for Seattle time
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/Los_Angeles',
    hour12: true
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'America/Los_Angeles'
  };

  const seattleTime = date.toLocaleTimeString('en-US', timeOptions);
  const seattleDate = date.toLocaleDateString('en-US', dateOptions);

  return {
    time: seattleTime,
    date: seattleDate
  };
};

// Update the MatchCard component's time handling
const MatchCard: React.FC<{ match: Match }> = ({ match }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isPastMatch = new Date(match.start_time) < new Date();
  const { time: timeString, date: dateString } = formatToSeattleTime(match.start_time);

  return (
    <Card className="overflow-hidden bg-navy/90 backdrop-blur-xl text-white shadow-lg transition-all duration-300 hover:shadow-xl border-none">
      <CardContent className="p-0">
        <div className="flex items-center justify-between bg-white/10 px-3 py-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="bg-green text-navy px-2 py-1 rounded-l-md font-industry-ultra uppercase">
                Round
              </span>
              <span className="bg-green/80 text-navy px-2 py-1 rounded-r-md font-industry-demi">
                {match.round}
              </span>
            </div>
          </div>
          <Badge 
            variant="secondary" 
            className={cn(
              "text-xs font-industry-demi uppercase",
              isPastMatch ? "bg-red-500/20" : "bg-blue-500/20"
            )}
          >
            {isPastMatch ? "Completed" : "Upcoming"}
          </Badge>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <TeamInfo 
              team={match.homeTeam} 
              score={match.home_score} 
              opponentScore={match.away_score} 
              isHome={true} 
            />
            <div className="mx-4 text-xl font-industry-ultra text-white/80">VS</div>
            <TeamInfo 
              team={match.awayTeam} 
              score={match.away_score} 
              opponentScore={match.home_score} 
              isHome={false} 
            />
          </div>

          <div className="bg-white/5 rounded-lg p-3 flex justify-between items-center mb-4">
            <div className="flex flex-col items-center">
              <Calendar className="h-6 w-6 text-green mb-1" />
              <span className="text-xs font-industry-demi text-white/90">{dateString}</span>
            </div>
            <div className="h-10 w-px bg-white/20"></div>
            <div className="flex flex-col items-center">
              <Clock className="h-6 w-6 text-green mb-1" />
              <span className="text-xs font-industry-demi text-white/90">{timeString} PT</span>
            </div>
            <div className="h-10 w-px bg-white/20"></div>
            <div className="flex flex-col items-center">
              <MapPin className="h-6 w-6 text-green mb-1" />
              <span className="text-xs font-industry-demi text-white/90 truncate max-w-[100px]">{match.venue}</span>
            </div>
          </div>

          {isPastMatch ? (
            match.home_score !== null && match.away_score !== null && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="text-center">
                  <span className="text-xl font-industry-ultra text-white">
                    {match.home_score} - {match.away_score}
                  </span>
                  {match.home_score !== match.away_score && (
                    <div className="text-sm font-industry-demi text-white/70 mt-1">
                      Winner: {match.home_score > match.away_score ? match.homeTeam.name : match.awayTeam.name}
                    </div>
                  )}
                </div>
              </div>
            )
          ) : (
            match.tickets_url && (
              <Button 
                className="w-full bg-green hover:bg-green/90 text-navy font-industry-ultra"
                asChild
              >
                <a href={match.tickets_url} target="_blank" rel="noopener noreferrer">
                  BUY TICKETS
                </a>
              </Button>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface RugbyMatchesDashboardProps {
  matchData: MatchesData;
}

const RugbyMatchesDashboard: React.FC<RugbyMatchesDashboardProps> = ({ matchData }) => {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div className="">
      <Card className="w-full mx-auto border-none shadow-none bg-navy/5">
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full bg-navy/10 grid-cols-2 gap-2 text-lg mb-4 p-1">
              <TabsTrigger
                value="upcoming"
                className="font-industry-ultra uppercase data-[state=active]:bg-green data-[state=active]:text-navy data-[state=inactive]:text-navy/60"
              >
                Upcoming ({matchData.upcomingMatchesData.length})
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="font-industry-ultra uppercase data-[state=active]:bg-green data-[state=active]:text-navy data-[state=inactive]:text-navy/60"
              >
                Past ({matchData.pastMatchesData.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <ScrollArea className="h-[calc(100vh-200px)] pr-2 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matchData.upcomingMatchesData.length === 0 ? (
                    <p className="text-center text-sm font-industry-book text-navy/60">
                      No upcoming matches scheduled.
                    </p>
                  ) : (
                    matchData.upcomingMatchesData.map((match) => (
                      <MatchCard key={match.match_id} match={match} />
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="past">
              <ScrollArea className="h-[calc(100vh-200px)] pr-2 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matchData.pastMatchesData.map((match) => (
                    <MatchCard key={match.match_id} match={match} />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RugbyMatchesDashboard;


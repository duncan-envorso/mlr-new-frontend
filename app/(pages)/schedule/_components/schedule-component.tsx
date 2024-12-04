'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Calendar, MapPin, Trophy } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

export type Team = {
  name: string;
  shortName: string;
  wins: number;
  losses: number;
  draws: number;
  image_path: string;
};

export type Match = {
  venue: string;
  start_time: string;
  round: number;
  name: string;
  match_id: string;
  match_type: string;
  home_score: number;
  away_score: number;
  homeTeam: Team;
  awayTeam: Team;
};

export type MatchesData = {
  upcomingMatchesData: Match[];
  pastMatchesData: Match[];
};
const MatchCard: React.FC<{ match: Match }> = ({ match }) => (
  <Card className="overflow-hidden bg-primary/90 backdrop-blur-xl text-white shadow-md transition-shadow duration-300 hover:shadow-lg">
    <CardContent className="p-0">
      <div className="flex items-center justify-between bg-white/10 px-3 py-2 text-xs">
        <Badge variant="secondary" className="bg-primary text-xs font-semibold">
          Round {match.round}
        </Badge>
        <div className="flex items-center">
          <Calendar className="mr-1 h-3 w-3" />
          <span>{new Date(match.start_time).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="p-3">
        <div className="mb-3 flex items-center justify-between">
          <TeamInfo 
            team={match.homeTeam} 
            score={match.home_score} 
            opponentScore={match.away_score} 
            isHome={true} 
          />
          <div className="mx-2 text-lg font-bold">VS</div>
          <TeamInfo 
            team={match.awayTeam} 
            score={match.away_score} 
            opponentScore={match.home_score} 
            isHome={false} 
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-center rounded-full bg-accent/50 px-2 py-1 text-xs">
            <MapPin className="mr-1 h-3 w-3" />
            <span className="truncate">{match.venue}</span>
          </div>
          <Link 
            href={`/schedule/${match.match_id}`}
            className="block"
          >
            <button className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 
                             transition-colors duration-200 rounded-lg text-sm font-medium
                             flex items-center justify-center space-x-2"
            >
              <span>Match Details</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </CardContent>
  </Card>
);


const TeamInfo: React.FC<{
  team: Team;
  score: number;
  opponentScore: number;
  isHome: boolean;
}> = ({ team, score, opponentScore, isHome }) => (
  <div className={`flex flex-col items-center ${isHome ? 'text-right' : 'text-left'}`}>
    <div className="relative mb-1">
      <div className="absolute inset-0 rounded-full bg-white opacity-20"></div>
      <Image
        src={team.image_path}
        width={40}
        height={40}
        alt={team.name}
        className="relative z-10 h-10 w-10 object-contain"
      />
    </div>
    <h3 className="mb-1 text-sm font-bold truncate max-w-[80px]">{team.name}</h3>
    <div className="flex items-center">
      {score > opponentScore && <Trophy className="mr-1 h-3 w-3 text-yellow-400" />}
      <span className="text-lg font-extrabold">{score}</span>
    </div>
  </div>
);

interface RugbyMatchesDashboardProps {
  matchData: MatchesData;
}

const RugbyMatchesDashboard: React.FC<RugbyMatchesDashboardProps> = ({
  matchData
}) => {
  const [activeTab, setActiveTab] = useState('past');

  return (
    <div className="mx-auto">
      <Card className="w-full mx-auto border-none shadow-none bg-slate-200">
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full bg-secondary/20 grid-cols-2 gap-2 text-lg mb-4">
              <TabsTrigger
                value="upcoming"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground  data-[state=inactive]:text-secondary-foreground"
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-primary/0 data-[state=inactive]:text-secondary-foreground"
              >
                Past
              </TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <ScrollArea className="h-[calc(100vh-200px)] pr-2 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matchData.upcomingMatchesData.length === 0 ? (
                    <p className="text-center text-sm text-muted-foreground">
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
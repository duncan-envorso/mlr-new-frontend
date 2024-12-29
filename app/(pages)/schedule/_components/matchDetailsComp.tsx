'use client'

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Player, Team } from '@/lib/types';
import { ArrowLeft, Calendar, MapPin, Trophy, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PlayerCard } from './player-card';

export type MatchDetail = {
    homeTeam: Team & { lineUp: Player[] };
    awayTeam: Team & { lineUp: Player[] };
    referees: { name: string; type: string; }[];
    venue: string;
    start_time: string;
    round: number;
    name: string;
    matchType: string;
    lastMatchData: {
        home_score: number;
        away_score: number;
        statistics: {
            homeTeam: { [key: string]: any }[];
            awayTeam: { [key: string]: any }[];
        };
    };
};

const StatComparison = ({
    label,
    homeStat,
    awayStat
}: {
    label: string;
    homeStat: number;
    awayStat: number;
}) => {
    const total = homeStat + awayStat;
    const homePercent = (homeStat / total) * 100;

    return (
        <div className="space-y-1">
            <div className="flex justify-between text-xs font-industry-demi text-navy">
                <span>{homeStat}</span>
                <span className="font-industry-ultra uppercase">{label}</span>
                <span>{awayStat}</span>
            </div>
            <div className="h-2 rounded-full bg-navy/10 overflow-hidden">
                <div
                    className="h-full bg-green transition-all"
                    style={{ width: `${homePercent}%` }}
                />
            </div>
        </div>
    );
};

export default function MatchDetail({ matchData }: { matchData: MatchDetail }) {
    const [activeTab, setActiveTab] = useState('lineups');
    const matchDate = new Date(matchData.start_time);

    const homeStats = matchData.lastMatchData.statistics.homeTeam[0];
    const awayStats = matchData.lastMatchData.statistics.awayTeam[0];

    return (
        <div className="min-h-screen space-y-6">
            {/* Match Header */}
            <div className="flex items-center">
                <Link href="/schedule">
                    <Button 
                        variant="ghost" 
                        className="group hover:bg-navy/10 text-navy font-industry-demi"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Schedule
                    </Button>
                </Link>
            </div>
            <div className="rounded-xl bg-navy/90 backdrop-blur-sm p-6 border border-navy/10">
                <div className="mb-4 flex items-center justify-between">
                    <Badge
                        variant="outline"
                        className="bg-green text-navy border-navy/20 font-industry-demi uppercase"
                    >
                        Round {matchData.round}
                    </Badge>
                    <div className="flex items-center space-x-4 text-sm text-white font-industry-book">
                        <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>
                                {matchDate.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4" />
                            <span>{matchData.venue}</span>
                        </div>
                    </div>
                </div>

                {/* Teams Score */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center space-y-3">
                        <div className="relative p-4 rounded-full bg-white/10">
                            <Image
                                src={matchData.homeTeam.image_path}
                                width={80}
                                height={80}
                                alt={matchData.homeTeam.name}
                                className="h-20 w-20 object-contain"
                            />
                        </div>
                        <h2 className="text-xl font-industry-ultra uppercase text-white">
                            {matchData.homeTeam.name}
                        </h2>
                        <span className="text-4xl font-industry-ultra text-white">
                            {matchData.lastMatchData.home_score}
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-industry-ultra text-white/50">VS</span>
                        <Badge className="mt-2 bg-green/80 text-navy font-industry-demi uppercase">
                            {matchData.matchType}
                        </Badge>
                    </div>
                    <div className="flex flex-col items-center space-y-3">
                        <div className="relative p-4 rounded-full bg-white/10">
                            <Image
                                src={matchData.awayTeam.image_path}
                                width={80}
                                height={80}
                                alt={matchData.awayTeam.name}
                                className="h-20 w-20 object-contain"
                            />
                        </div>
                        <h2 className="text-xl font-industry-ultra uppercase text-white">
                            {matchData.awayTeam.name}
                        </h2>
                        <span className="text-4xl font-industry-ultra text-white">
                            {matchData.lastMatchData.away_score}
                        </span>
                    </div>
                </div>
            </div>

            {/* Match Details Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full bg-navy/10 grid-cols-2 gap-2 text-lg p-1">
                    <TabsTrigger
                        value="lineups"
                        className="font-industry-ultra uppercase data-[state=active]:bg-green data-[state=active]:text-navy data-[state=inactive]:text-navy/60"
                    >
                        <Users className="mr-2 h-4 w-4" />
                        Lineups
                    </TabsTrigger>
                    <TabsTrigger
                        value="stats"
                        className="font-industry-ultra uppercase data-[state=active]:bg-green data-[state=active]:text-navy data-[state=inactive]:text-navy/60"
                    >
                        <Trophy className="mr-2 h-4 w-4" />
                        Match Stats
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="lineups" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Home Team */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-industry-ultra uppercase text-navy">
                                {matchData.homeTeam.name}
                            </h3>
                            <div className="space-y-2">
                                {matchData.homeTeam.lineUp.map((player) => (
                                    <PlayerCard key={player.player_number} player={player} />
                                ))}
                            </div>
                        </div>

                        {/* Away Team */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-industry-ultra uppercase text-navy">
                                {matchData.awayTeam.name}
                            </h3>
                            <div className="space-y-2">
                                {matchData.awayTeam.lineUp.map((player) => (
                                    <PlayerCard key={player.player_number} player={player} />
                                ))}
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="stats" className="space-y-6">
                    <div className="rounded-xl bg-navy/5 backdrop-blur-sm p-6 space-y-4 border border-navy/10">
                        <StatComparison
                            label="Tries"
                            homeStat={homeStats?.tries}
                            awayStat={awayStats?.tries}
                        />
                        <StatComparison
                            label="Passes"
                            homeStat={homeStats?.passes}
                            awayStat={awayStats?.passes}
                        />
                        <StatComparison
                            label="Tackles"
                            homeStat={homeStats?.tackles}
                            awayStat={awayStats?.tackles}
                        />
                        <StatComparison
                            label="Ball Carries"
                            homeStat={homeStats?.ball_carries}
                            awayStat={awayStats?.ball_carries}
                        />
                        <StatComparison
                            label="Lineouts"
                            homeStat={homeStats?.lineouts}
                            awayStat={awayStats?.lineouts}
                        />
                        <StatComparison
                            label="Scrums"
                            homeStat={homeStats?.scrums}
                            awayStat={awayStats?.scrums}
                        />
                    </div>

                    {/* Officials */}
                    <div className="rounded-xl bg-navy/5 backdrop-blur-sm p-6 border border-navy/10">
                        <h3 className="mb-4 text-lg font-industry-ultra uppercase text-navy">
                            Match Officials
                        </h3>
                        <div className="space-y-2">
                            {matchData.referees.map((ref) => (
                                <div
                                    key={ref.name}
                                    className="flex justify-between text-sm"
                                >
                                    <span className="font-industry-demi text-navy">{ref.name}</span>
                                    <span className="font-industry-book text-navy/60">{ref.type}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
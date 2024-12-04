'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Calendar, Shield, Star, Target, Trophy } from 'lucide-react';
import Image from 'next/image';

export type StandingsData = {
  name: string;
  image_path: string;
  position: number;
  matches_played: number;
  points: number;
  wins: number;
  losses: number;
  draws: number;
  score_for: number;
  score_against: number;
  tries_for: number;
  tries_against: number;
};

const TeamSection = ({ data }: { data: StandingsData }) => (
  <div className="flex flex-col items-center space-y-2">
    <div className="relative group">
      <div className="h-20 w-20 rounded-full bg-black/20 p-2 ring-1 ring-white/10">
        <Image
          src={data.image_path}
          width={80}
          height={80}
          alt={data.name}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
    <div className="text-center">
      <h3 className="text-xl font-bold text-white">{data.name}</h3>
      <Badge 
        className={`
          ${data.position <= 3 
            ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-yellow-950' 
            : 'bg-black/20'
          } px-3 py-1 mt-2
        `}
      >
        {data.position === 1 ? '🏆 1st' : 
         data.position === 2 ? '🥈 2nd' : 
         data.position === 3 ? '🥉 3rd' : 
         `#${data.position}`}
      </Badge>
    </div>
  </div>
);

const StatBox = ({ 
  icon: Icon, 
  value, 
  label
}: { 
  icon: any; 
  value: string | number;
  label: string;
}) => (
  <div className="bg-black/20 rounded-lg p-4 flex items-center space-x-3">
    <div className="rounded-full bg-black/20 p-2">
      <Icon className="h-5 w-5 text-accent" />
    </div>
    <div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-white/70">{label}</div>
    </div>
  </div>
);

export default function StandingsCard({ data }: { data: StandingsData }) {
  if (!data) return null;

  return (
    <Card className="w-full overflow-hidden bg-primary/90 backdrop-blur-lg text-white shadow-md transition-shadow duration-300 hover:shadow-lg">
    <div className="flex items-center justify-between bg-white/10 px-6 py-3">
      <Badge variant="secondary" className="bg-primary text-sm font-semibold">
       Quick Overview
      </Badge>
      <div className="flex items-center space-x-2">
        <Calendar className="h-4 w-4" />
        <span className="text-sm">Week {data.matches_played}</span>
      </div>
    </div>

    <div className="p-6">
      {/* Team Identity */}
      <div className="mb-6">
        <TeamSection data={data} />
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatBox
          icon={Trophy}
          value={`${data.wins}-${data.losses}`}
          label="Season Record"
        />
        <StatBox
          icon={Star}
          value={data.points}
          label="Total Points"
        />
        <StatBox
          icon={Target}
          value={data.tries_for}
          label="Tries Scored"
        />
        <StatBox
          icon={Shield}
          value={data.score_for - data.score_against}
          label="Point Differential"
        />
      </div>

      {/* Performance Metrics */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-white/70">Win Rate</span>
            <span className="text-sm font-bold text-white">
              {((data.wins / data.matches_played) * 100).toFixed(0)}%
            </span>
          </div>
          <div className="h-2 bg-black/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent rounded-full transition-all"
              style={{ width: `${(data.wins / data.matches_played) * 100}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-white/70">Points Per Game</span>
            <span className="text-sm font-bold text-white">
              {(data.points / data.matches_played).toFixed(1)}
            </span>
          </div>
          <div className="h-2 bg-black/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent rounded-full transition-all"
              style={{ width: `${(data.points / (data.matches_played * 5)) * 100}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-white/70">Season Progress</span>
            <span className="text-sm font-bold text-white">
              {data.matches_played} of {data.matches_played + 5} Matches
            </span>
          </div>
          <div className="h-2 bg-black/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent rounded-full transition-all"
              style={{ width: `${(data.matches_played / (data.matches_played + 5)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Location Stats */}
      <div className="mt-6 flex items-center justify-between bg-black/20 rounded-lg px-4 py-3">
        <div className="space-x-3">
          <span className="text-sm text-white/70">Home Record:</span>
          <span className="text-sm font-bold text-white">
            {Math.floor(data.wins * 0.6)}-{Math.floor(data.losses * 0.6)}
          </span>
        </div>
        <div className="h-4 w-px bg-white/20" />
        <div className="space-x-3">
          <span className="text-sm text-white/70">Away Record:</span>
          <span className="text-sm font-bold text-white">
            {Math.ceil(data.wins * 0.4)}-{Math.ceil(data.losses * 0.4)}
          </span>
        </div>
      </div>
    </div>
  </Card>
  );
}
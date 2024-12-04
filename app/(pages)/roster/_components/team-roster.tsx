'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Coach, Player, TeamData } from '@/lib/types';
import { Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const positionGroups = {
  all: 'All Members',
  coaching: 'Coaching Staff',
  'rugby-ops': 'Rugby Operations',
  medical: 'Medical Staff',
  'front-office': 'Front Office',
  players: 'Players',
};

type TeamMember = Player | Coach;

// Helper to convert cm to ft/inches and kg to lbs
const convertToImperial = (heightCm: number, weightKg: number) => {
  const heightInInches = heightCm / 2.54;
  const heightFeet = Math.floor(heightInInches / 12);
  const remainingInches = Math.round(heightInInches % 12);
  const weightInLbs = Math.round(weightKg * 2.20462);
  return { heightFeet, remainingInches, weightInLbs };
};

export default function TeamRosterView({ apiFormattedData }: { apiFormattedData: TeamData }) {
  const [activeTab, setActiveTab] = useState('all');

  const categorizeMembers = (coaches: Coach[]) => {
    const categorized: Record<string, Coach[]> = {
      coaching: [],
      'rugby-ops': [],
      medical: [],
      'front-office': [],
    };

    coaches.forEach((coach) => {
      const jobTitle = coach.job_title.toLowerCase();
      if (jobTitle.includes('coach') || jobTitle.includes('director of rugby')) {
        categorized.coaching = categorized.coaching || [];
        categorized.coaching.push(coach);
      } else if (
        jobTitle.includes('manager') ||
        jobTitle.includes('operations') ||
        jobTitle.includes('trainer') ||
        jobTitle.includes('performance') ||
        jobTitle.includes('strength')
      ) {
        categorized['rugby-ops'] = categorized['rugby-ops'] || [];
        categorized['rugby-ops'].push(coach);
      } else if (
        jobTitle.includes('doctor') ||
        jobTitle.includes('md') ||
        jobTitle.includes('physician') ||
        jobTitle.includes('nutritionist') ||
        jobTitle.includes('physio')
      ) {
        categorized.medical = categorized.medical || [];
        categorized.medical.push(coach);
      } else if (
        jobTitle.includes('ceo') ||
        jobTitle.includes('president') ||
        jobTitle.includes('marketing') ||
        jobTitle.includes('sales') ||
        jobTitle.includes('business')
      ) {
        categorized['front-office'] = categorized['front-office'] || [];
        categorized['front-office'].push(coach);
      }
    });

    return categorized;
  };

  const filteredMembers = useMemo(() => {
    const { players, coaches } = apiFormattedData;
    const categorizedCoaches = categorizeMembers(coaches);

    switch (activeTab) {
      case 'all':
        return [...players, ...coaches];
      case 'players':
        return players;
      case 'coaching':
        return categorizedCoaches.coaching;
      case 'rugby-ops':
        return categorizedCoaches['rugby-ops'];
      case 'medical':
        return categorizedCoaches.medical;
      case 'front-office':
        return categorizedCoaches['front-office'];
      default:
        return [];
    }
  }, [apiFormattedData, activeTab]);

  const renderMemberCard = (member: TeamMember) => (
    <Card
      key={member.id}
      className="overflow-hidden bg-card shadow-lg transition-shadow duration-300 hover:shadow-xl flex flex-col"
    >
      <div className="relative aspect-[3/4]">
        <Image
          src={member.portrait || '/placeholder-image.jpg'}
          alt={`Portrait of ${member.name}`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <CardTitle className="mb-1 text-xl font-bold">
            {member.name}
          </CardTitle>
          <Badge variant="secondary" className="mb-2 text-xs">
            {'position' in member ? member.position : member.job_title}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4 flex-grow flex flex-col justify-between">
        {'height' in member && 'weight' in member && member.height > 0 && member.weight > 0 && (
          <div className="text-sm mb-4">
            <p className="text-gray-500">Height / Weight</p>
            <p className="font-semibold">
              {convertToImperial(member.height, member.weight).heightFeet}ft{' '}
              {convertToImperial(member.height, member.weight).remainingInches}in /{' '}
              {convertToImperial(member.height, member.weight).weightInLbs}lbs
            </p>
          </div>
        )}
        <Link href={`/roster/${member.id}`} className="mt-auto">
          <Button className="w-full bg-primary text-primary-foreground">
            <Eye className="mr-2 h-4 w-4" /> View Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold text-foreground">Team Roster</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 flex flex-wrap">
          {Object.entries(positionGroups).map(([id, name]) => (
            <TabsTrigger
              key={id}
              value={id}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {name}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={activeTab}>
          <ScrollArea className="h-[calc(100vh-200px)] pr-4">
            <div className="grid grid-cols-1 gap-6 pb-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {filteredMembers?.map(renderMemberCard)}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}

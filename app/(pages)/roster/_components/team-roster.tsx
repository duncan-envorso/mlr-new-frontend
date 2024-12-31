'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { RosterMember } from '@/lib/types/roster';
import { Camera, Eye, Filter, Search, SortAsc, UserRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

// Helper to convert measurements
const convertMeasurements = (heightCm: number, weightKg: number, useMetric: boolean) => {
  if (useMetric) {
    return {
      height: `${heightCm} cm`,
      weight: `${weightKg} kg`
    };
  }
  const heightInInches = heightCm / 2.54;
  const heightFeet = Math.floor(heightInInches / 12);
  const remainingInches = Math.round(heightInInches % 12);
  const weightInLbs = Math.round(weightKg * 2.20462);
  return {
    height: `${heightFeet}'${remainingInches}"`,
    weight: `${weightInLbs} lbs`
  };
};

// Position groups for filtering
const positionGroups = {
  'Forwards': ['Prop', 'Hooker', 'Lock', 'Flanker', 'Number 8'],
  'Backs': ['Scrum-half', 'Fly-half', 'Centre', 'Wing', 'Fullback'],
} as const;

function MemberCard({ member, useMetric }: { member: RosterMember; useMetric: boolean }) {
  const { height, weight } = convertMeasurements(member.height, member.weight, useMetric);
  const birthDate = new Date(member.date_of_birth).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className="group relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative aspect-[4/3]">
        {member.portrait ? (
          <Image
            src={member.portrait}
            alt={`Portrait of ${member.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <UserRound className="h-20 w-20 text-muted-foreground" aria-hidden="true" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="mb-1 text-xl font-semibold tracking-tight text-white">
            {member.name}
          </h3>
          <Badge 
            variant="secondary" 
            className="bg-secondary text-primary hover:bg-primary/20"
          >
            {member.position}
          </Badge>
        </div>
      </div>
      <CardContent className="relative space-y-4 p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Height / Weight</p>
            <p className="font-medium tabular-nums">{height} / {weight}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Hometown</p>
            <p className="font-medium">{member.hometown || 'N/A'}</p>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">Date of Birth</p>
          <p className="font-medium">{birthDate}</p>
        </div>
        {member.bio && (
          <div className="pt-2">
            <div 
              className="line-clamp-2 text-sm text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: member.bio }}
            />
          </div>
        )}
        <Link 
          href={`/roster/${member.id}`} 
          className="mt-2 block"
          aria-label={`View ${member.name}'s full profile`}
        >
          <Button 
            className="w-full bg-primary/90 text-white hover:bg-primary/20" 
            variant="ghost"
          >
            <Eye className="mr-2 h-4 w-4" aria-hidden="true" /> View Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

function RosterSkeleton() {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="relative aspect-[4/3]">
            <Skeleton className="absolute inset-0" />
          </div>
          <CardContent className="p-4 space-y-3">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-9 w-full mt-4" />
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default function TeamRosterView({ roster }: { roster: RosterMember[] }) {
  const [useMetric, setUseMetric] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [positionFilter, setPositionFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'position' | 'hometown'>('name');

  const filteredAndSortedRoster = useMemo(() => {
    return roster
      .filter(member => {
        const matchesSearch = (member.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                            (member.hometown?.toLowerCase() || '').includes(searchQuery.toLowerCase());
        const matchesPosition = positionFilter === 'all' || member.position === positionFilter;
        return matchesSearch && matchesPosition;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return (a.name || '').localeCompare(b.name || '');
          case 'position':
            return (a.position || '').localeCompare(b.position || '');
          case 'hometown':
            return (a.hometown || '').localeCompare(b.hometown || '');
          default:
            return 0;
        }
      });
  }, [roster, searchQuery, positionFilter, sortBy]);

  if (!roster?.length) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <Camera className="mx-auto h-12 w-12 text-muted-foreground" aria-hidden="true" />
          <h2 className="mt-2 text-xl font-semibold">No roster members found</h2>
          <p className="text-muted-foreground">The team roster is currently empty.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6 p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Team Roster</h1>
        <div className="flex items-center gap-2">
          <Label htmlFor="unit-toggle" className="text-sm font-medium">
            {useMetric ? "Imperial" : "Metric"}
          </Label>
          <Switch
            id="unit-toggle"
            checked={useMetric}
            onCheckedChange={setUseMetric}
            aria-label="Toggle measurement units"
          />
        </div>
      </div>

      <Card className="p-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or hometown..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by position" />
              </SelectTrigger>
              <SelectContent className='bg-white'>
                <SelectItem value="all">All Positions</SelectItem>
                {Object.entries(positionGroups).map(([group, positions]) => (
                  <div key={group}>
                    <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                      {group}
                    </div>
                    {positions.map((position) => (
                      <SelectItem key={position} value={position}>
                        {position}
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <SortAsc className="h-4 w-4 text-muted-foreground bg-white" />
            <Select value={sortBy} onValueChange={(value: 'name' | 'position' | 'hometown') => setSortBy(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent className='bg-white'>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="position">Position</SelectItem>
                <SelectItem value="hometown">Hometown</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <ScrollArea className="h-[calc(100vh-300px)] rounded-lg border bg-muted/5 p-6">
        <div className="grid grid-cols-1 gap-6 pb-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading ? (
            <RosterSkeleton />
          ) : filteredAndSortedRoster.length > 0 ? (
            filteredAndSortedRoster.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                useMetric={useMetric}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">No players match your search criteria</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}


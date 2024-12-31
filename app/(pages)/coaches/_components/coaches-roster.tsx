'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { UserRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

// Staff member interface
export interface StaffMember {
  id: string;
  team_id: string;
  name: string;
  job_title: string;
  bio: string;
  portrait: string;
  is_coach: boolean;
}

function StaffMemberCard({ member }: { member: StaffMember }) {
  return (
    <Card className="group relative overflow-hidden ">
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
            {member.job_title}
          </Badge>
        </div>
      </div>
      <CardContent className="relative space-y-4 p-4">
        {/* {member.is_coach && (
          <div>
            <p className="text-xs font-medium text-muted-foreground">Role</p>
            <p className="font-medium">{member.job_title}</p>
          </div>
        )} */}

        {member.bio && (
          <div className="pt-2">
            <div 
              className="line-clamp-3 text-sm text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: member.bio }}
            />
          </div>
        )}
        <Link 
          href={`/coaches/${member.id}`} 
          className="mt-2 block"
          aria-label={`View ${member.name}'s full profile`}
        >
          <Button 
            className="w-full bg-primary/90 text-white hover:bg-primary/20" 
            variant="ghost"
          >
            View Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

function StaffSkeleton() {
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

export default function StaffRosterView({ staff }: { staff: StaffMember[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobTitleFilter, setJobTitleFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'job_title'>('name');

  const filteredAndSortedStaff = useMemo(() => {
    return staff
      .filter(member => {
        const matchesSearch = (member.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                            (member.job_title?.toLowerCase() || '').includes(searchQuery.toLowerCase());
        const matchesJobTitle = jobTitleFilter === 'all' || member.job_title === jobTitleFilter;
        return matchesSearch && matchesJobTitle;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return (a.name || '').localeCompare(b.name || '');
          case 'job_title':
            return (a.job_title || '').localeCompare(b.job_title || '');
          default:
            return 0;
        }
      });
  }, [staff, searchQuery, jobTitleFilter, sortBy]);

  if (!staff?.length) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <UserRound className="mx-auto h-12 w-12 text-muted-foreground" aria-hidden="true" />
          <h2 className="mt-2 text-xl font-semibold">No staff members found</h2>
          <p className="text-muted-foreground">The staff roster is currently empty.</p>
        </div>
      </div>
    );
  }

  // Get unique job titles for filtering
  const jobTitles = Array.from(new Set(staff.map(member => member.job_title)));

  return (
    <div className="container mx-auto space-y-6 p-4  ">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ">
        <h1 className="text-3xl font-bold tracking-tight">Coaches Roster</h1>
      </div>

      <Card className="p-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="relative">
            <Input
              placeholder="Search by name or job title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex items-center gap-2">
            <Select value={jobTitleFilter} onValueChange={setJobTitleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by job title" />
              </SelectTrigger>
              <SelectContent className='bg-white'>
                <SelectItem value="all">All Job Titles</SelectItem>
                {jobTitles.map((title) => (
                  <SelectItem key={title} value={title}>
                    {title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={(value: 'name' | 'job_title') => setSortBy(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent className='bg-white'>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="job_title">Job Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <ScrollArea className="h-[calc(100vh-300px)] rounded-lg border bg-muted/5 p-6">
        <div className="grid grid-cols-1 gap-6 pb-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAndSortedStaff.length > 0 ? (
            filteredAndSortedStaff.map((member) => (
              <StaffMemberCard
                key={member.id}
                member={member}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">No staff members match your search criteria</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { StaffMember } from '@/lib/types/roster';
import { Filter, Search, SortAsc, UserRound } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';

const departmentGroups = {
  'Medical': ['Doctor', 'Physician', 'Surgeon', 'Medical'],
  'Training': ['Trainer', 'Athletic', 'Strength', 'Conditioning'],
  'Therapy': ['Physio', 'Rehabilitation', 'Chiropractor', 'Nutritionist']
} as const;

function StaffCard({ member }: { member: StaffMember }) {
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
            {member.job_title}
          </Badge>
        </div>
      </div>
      <CardContent className="relative space-y-4 p-4">
        {member.bio && (
          <div className="pt-2">
            <div 
              className="line-clamp-2 text-sm text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: member.bio }}
            />
          </div>
        )}
      
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

export default function OperationsView({ staff }: { staff: StaffMember[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'job_title'>('name');
  const [isLoading, setIsLoading] = useState(false);

  const filteredAndSortedStaff = useMemo(() => {
    return staff
      .filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            member.job_title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDepartment = departmentFilter === 'all' || 
                                 Object.entries(departmentGroups).some(([dept, keywords]) =>
                                   departmentFilter === dept && 
                                   keywords.some(keyword => 
                                     member.job_title.toLowerCase().includes(keyword.toLowerCase()) ||
                                     member.name.toLowerCase().startsWith('dr.')
                                   )
                                 );
        return matchesSearch && matchesDepartment;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'job_title':
            return a.job_title.localeCompare(b.job_title);
          default:
            return 0;
        }
      });
  }, [staff, searchQuery, departmentFilter, sortBy]);

  return (
    <div className="container mx-auto space-y-6 p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Operations Staff</h1>
      </div>

      <Card className="p-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent className='bg-white'>
                <SelectItem value="all">All Departments</SelectItem>
                {Object.keys(departmentGroups).map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <SortAsc className="h-4 w-4 text-muted-foreground" />
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
          {isLoading ? (
            <StaffSkeleton />
          ) : filteredAndSortedStaff.length > 0 ? (
            filteredAndSortedStaff.map((member) => (
              <StaffCard
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
// app/schedule/page.tsx
import { currentTeamConfig } from '@/config/teamConfig';
import { Suspense } from 'react';
import ScheduleComponent from './_components/schedule-component';
import ScheduleSkeleton from './_components/schedule-skeleton';
import StandingsCard from './_components/standings';
import StandingsSkeleton from './_components/standings-skeleton';
const teamId = currentTeamConfig?.teamId || '034db172-942f-48b8-bc91-a0b3eb3a025f'


export default async function SchedulePage() {
  const data = await fetch('https://api.seawolves.envorso.com/v1/matches', {
    next: { revalidate: 60 }
   })
  
  const standings = await fetch(
    `https://api.seawolves.envorso.com/v1/standings?teamId=${teamId}`,
    { next: { revalidate: 60 } }
   )

  const matchData = await data.json();
  const standingsData = await standings.json();

  return (
    <div className=" mx-auto ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 top-4">
        <Suspense fallback={<StandingsSkeleton />}>
              <StandingsCard data={standingsData} />
            </Suspense>
         
        </div>
        
        <div className="lg:col-span-2">
          <div className="sticky">
          <Suspense fallback={<ScheduleSkeleton />}>
            <ScheduleComponent matchData={matchData} />
          </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
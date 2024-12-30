// app/schedule/page.tsx
import { fetchStandings, getMatches } from '@/actions';
import { Suspense } from 'react';
import ScheduleComponent from './_components/schedule-component';
import ScheduleSkeleton from './_components/schedule-skeleton';
import StandingsCard from './_components/standings';
import StandingsSkeleton from './_components/standings-skeleton';

const SEASON_ID = '2164c817-2d1a-4156-b1fc-9a41eda02f06';

export const revalidate = 3600;

export default async function SchedulePage() {
  try {
    const matchData = await getMatches(SEASON_ID);
    let standingsData = null;
    
    try {
      standingsData = await fetchStandings(SEASON_ID);
    } catch (error) {
      console.error('Error fetching standings:', error);
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Suspense fallback={<StandingsSkeleton />}>
                {standingsData ? (
                  <StandingsCard data={standingsData} />
                ) : (
                  <div className="p-4 text-center">
                    Standings data unavailable
                  </div>
                )}
              </Suspense>
            </div>
          </div>
          <div className="lg:col-span-2">
            <Suspense fallback={<ScheduleSkeleton />}>
              <ScheduleComponent matchData={matchData} />
            </Suspense>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading page:', error);
    return <div>Error loading schedule. Please try again later.</div>;
  }
}
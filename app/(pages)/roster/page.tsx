'use server';

import { fetchRosterData } from '@/actions';
import { RosterData } from '@/lib/types/roster';
import TeamRosterView from './_components/team-roster';

async function TeamRosterPage() {
  const rosterData: RosterData = await fetchRosterData();
  return <TeamRosterView roster={rosterData} />;
}

export default TeamRosterPage;


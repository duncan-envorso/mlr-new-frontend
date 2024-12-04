'use server';

import { fetchTeamData } from '@/actions';
import TeamRosterView from './_components/team-roster';

async function TeamRosterPage() {
  const apiFormattedData = await fetchTeamData()
  return <TeamRosterView apiFormattedData={apiFormattedData} />;
}

export default TeamRosterPage;

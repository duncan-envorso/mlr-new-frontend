'use server';

import { fetchStaffData } from '@/actions';
import { StaffData } from '@/lib/types/roster';
import StaffRosterView from './_components/coaches-roster';

async function TeamRosterPage() {
  const rosterData: StaffData = await fetchStaffData();
  return <StaffRosterView staff={rosterData} />;
}

export default TeamRosterPage;


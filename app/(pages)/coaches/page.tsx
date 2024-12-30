'use server';

import { fetchStaffData } from '@/actions';
import { StaffData } from '@/lib/types/roster';
import StaffRosterView from './_components/coaches-roster';

async function TeamRosterPage() {
  const rosterData: StaffData = await fetchStaffData();
  console.log("rosterData",rosterData)
  return <StaffRosterView staff={rosterData} />;
}

export default TeamRosterPage;


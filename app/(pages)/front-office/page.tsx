'use server';

import { fetchFrontOfficeData } from '@/actions';
import { StaffData } from '@/lib/types/roster';
import FrontOfficeView from './_components/front-office';

async function TeamRosterPage() {
  const staff: StaffData = await fetchFrontOfficeData();
  return <FrontOfficeView staff={staff} />;
}

export default TeamRosterPage;


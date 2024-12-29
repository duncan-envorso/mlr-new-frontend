'use server';

import { fetchOperationsData } from '@/actions';
import { StaffData } from '@/lib/types/roster';
import OperationsView from './_components/operations';

async function TeamRosterPage() {
  const staff: StaffData = await fetchOperationsData();
  return <OperationsView staff={staff} />;
}

export default TeamRosterPage;




import { fetchStaff } from "@/actions";
import CoachesStats from "../_components/coach-stats";

export default async function PlayerPage({ params }: { params: { id: string } }) {
  const response = await fetchStaff(params.id);
  const playerData = await response.json();
  console.log("playerData", playerData)
  
  
  return (
    <div className="flex justify-center items-center  p-4">
      <CoachesStats coach={playerData} />
    </div>
  );
 }
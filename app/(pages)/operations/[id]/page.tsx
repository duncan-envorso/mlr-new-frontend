

import { fetchPlayer } from "@/actions";
import PlayerStatsCard from "../_components/player-stats";

export default async function PlayerPage({ params }: { params: { id: string } }) {
  const response = await fetchPlayer(params.id);
  const playerData = await response.json();
  console.log("playerData", playerData)
  
  
  return (
    <div className="flex justify-center items-center  p-4">
      <PlayerStatsCard player={playerData} />
    </div>
  );
 }
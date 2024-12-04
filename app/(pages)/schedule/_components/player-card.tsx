import { Badge } from "@/components/ui/badge";
import { Player } from "@/lib/types";

export const PlayerCard = ({ player }: { player: Player }) => (
    <div className="flex items-center space-x-3 rounded-lg bg-primary/30 backdrop-blur-sm p-3 hover:bg-primary/40 transition-colors">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
            <span className="text-lg font-bold text-primary">{player.player_number}</span>
        </div>
        <div className="flex-1">
            <div className="flex items-center">
                <h3 className="text-sm font-bold text-primary">
                    {player.name}
                    {player.is_captain && (
                        <Badge className="ml-2 bg-accent text-accent-foreground">C</Badge>
                    )}
                </h3>
            </div>
            <p className="text-xs text-secondary-foreground">{player.position}</p>
        </div>
        {player.hometown && (
            <span className="text-xs text-secondary-foreground">{player.hometown}</span>
        )}
    </div>
);
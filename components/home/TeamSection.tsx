
import { Team } from '@/lib/types';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import Image from 'next/image';


interface TeamSectionProps {
    team: Team;
    score: number | null;
    opponentScore: number | null;
  }
  
  // TeamSection sub-component
  const TeamSection = ({ team, score, opponentScore }: TeamSectionProps) => (
    <motion.div
      className="flex flex-col items-center text-center"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative mb-2">
        <div className="absolute inset-0 rounded-full bg-white opacity-20"></div>
        <Image
          src={team.image_path}
          width={64}
          height={64}
          alt={team.name}
          className="relative z-10 h-16 w-16 object-contain"
        />
      </div>
      <h3 className="mb-2 text-lg font-bold">{team.name}</h3>
      <div className="flex items-center">
        {score && opponentScore && score > opponentScore && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            <Trophy className="mr-1 h-4 w-4 text-yellow-400" />
          </motion.div>
        )}
        <span className="text-3xl font-extrabold">{score ?? 'N/A'}</span>
      </div>
    </motion.div>
  );
  
  export default TeamSection;
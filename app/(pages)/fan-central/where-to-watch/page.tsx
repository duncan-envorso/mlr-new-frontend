import { currentTeamConfig } from '@/config/teamConfig';
import { Metadata } from 'next';
import WhereToWatchView from '../_components/where-to-watch';

export const metadata: Metadata = {
  title: 'Where to Watch | ' + currentTeamConfig?.name,
  description: 'Find the best places to watch Seattle Seawolves matches',
};

export default async function WhereToWatchPage() {
    if(!currentTeamConfig){
        return null
    }
  return <WhereToWatchView teamConfig={currentTeamConfig} />;
}
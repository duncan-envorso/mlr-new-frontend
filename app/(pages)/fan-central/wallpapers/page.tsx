import { currentTeamConfig } from '@/config/teamConfig';
import { Metadata } from 'next';
import WallpapersView from '../_components/wallpaper-view';

export const metadata: Metadata = {
  title: 'Wallpapers | ' + currentTeamConfig?.name,
  description: 'Download official Seattle Seawolves wallpapers for your devices',
};

export default async function WallpapersPage() {
    if(!currentTeamConfig){
        return null
    }
    console.log(currentTeamConfig)
  return <WallpapersView teamConfig={currentTeamConfig} />;
}
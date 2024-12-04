import { currentTeamConfig } from '@/config/teamConfig';
import FanCentralView from './_components/fan-central';



export default async function FanCentralPage() {
  // Check if currentTeamConfig is defined before passing it to the component
  if (currentTeamConfig) {
    return <FanCentralView teamConfig={currentTeamConfig} />;
  } else {
    // Handle the case where currentTeamConfig is undefined
    // You might want to display an error message or a loading indicator
    return <div>Team configuration not found.</div>;
  }
}
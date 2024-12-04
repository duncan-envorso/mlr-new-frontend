import { currentTeamConfig } from '@/config/teamConfig';
import Rugby101View from '../_components/rugby101';


function WhereToStay() {
const teamConfig = currentTeamConfig;

if(!teamConfig){
    return null
}
    return (
      <div>
        {/* ... existing code ... */}
      <Rugby101View teamConfig={teamConfig} />
        {/* ... existing code ... */}
      </div>
    );
  }
  
  export default WhereToStay;
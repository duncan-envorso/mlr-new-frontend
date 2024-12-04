import { currentTeamConfig } from '@/config/teamConfig';
import WhereToStayView from "../_components/where-to-stay";


function WhereToStay() {
const teamConfig = currentTeamConfig;

if(!teamConfig){
    return null
}
    return (
      <div>
        {/* ... existing code ... */}
      <WhereToStayView teamConfig={teamConfig} />
        {/* ... existing code ... */}
      </div>
    );
  }
  
  export default WhereToStay;
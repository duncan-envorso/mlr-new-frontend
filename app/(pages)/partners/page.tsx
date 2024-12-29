import { getNewsPosts } from '@/actions';
import { PartnersContent } from './_components/PartnersContent';



 async function PartnersPage () {
  const newsData = await getNewsPosts();

 

 


  return (
    <div className="min-h-screen">
      <PartnersContent />
    </div>
  );
}

export default PartnersPage;
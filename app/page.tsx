import { fetchTeamData, getHeroData, getNewsPosts } from '@/actions'
import { authOptions } from '@/auth'
import HeroSectionTwo from '@/components/home/herosection2'
import NewsSection from '@/components/home/LatestNews'
import { PartnerSection } from '@/components/home/Partners'
import TeamRosterSection from '@/components/home/TeamRosterSection'
import { UpcomingMatchesCarousel } from '@/components/home/UpcomingMatches'
import { upcomingMatchesData } from '@/mockdata'
import { sponsorsData } from '@/partners'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'



export default async function Home() {
  const newsPosts = await getNewsPosts()
  const heroData = await getHeroData()
  const apiFormattedData = await fetchTeamData()
  const session = await getServerSession(authOptions)
  console.log('sessions',session?.user)




  return (
    <div className="bg-slate-200">
     
      <HeroSectionTwo  />
      <NewsSection news={newsPosts} />
      

        <UpcomingMatchesCarousel matches={upcomingMatchesData} />

      <Suspense>
        <TeamRosterSection apiFormattedData={apiFormattedData} />
      </Suspense>
      <PartnerSection sponsorsData={sponsorsData} />
      {/* <MatchCarousel matches={matches.pastMatchesData} /> */}
    
      </div>
  )
}
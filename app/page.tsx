import { fetchTeamData, getMatchData, getNewsPosts } from '@/actions'
import HeroSectionTwo from '@/components/home/herosection2'
import NewsSection from '@/components/home/LatestNews'
import { PartnerSection } from '@/components/home/Partners'
import TeamRosterSection from '@/components/home/TeamRosterSection'
import { UpcomingMatchesCarousel } from '@/components/home/UpcomingMatches'
import { upcomingMatchesData } from '@/mockdata'
import { sponsorsData } from '@/partners'
import { Suspense } from 'react'

async function getHeroData() {
  // In a real application, you would fetch this data from your database
  return {
    title: "DOMINATE THE FIELD",
    subtitle: "Experience the raw power and strategic brilliance of American Rugby",
    ctaPrimary: "Get Tickets",
    ctaSecondary: "Watch Highlights",
    homePageVideoUrl: "https://cdn.prod.website-files.com/65417651935f4a88a94aebb0/65d640d585ad7fb7ff91bd4d_highlight%20reel-transcode.webm"
  }
}

export default async function Home() {
  const newsPosts = await getNewsPosts()
  const heroData = await getHeroData()
  const apiFormattedData = await fetchTeamData()
  const matches = await getMatchData()





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
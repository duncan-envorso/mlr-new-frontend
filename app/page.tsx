import { fetchRosterData, fetchTeamData, getHeroData, getNewsPosts } from '@/actions'
import { authOptions } from '@/auth'
import HeroSectionTwo from '@/components/home/herosection2'
import NewsSection from '@/components/home/LatestNews'
import { PartnerSection } from '@/components/home/Partners'
import RosterSection from '@/components/home/TeamRosterSection'
import { UpcomingMatchesCarousel } from '@/components/home/UpcomingMatches'
import { sponsorsData } from '@/partners'
import { getServerSession } from 'next-auth'



export default async function Home() {
  const newsPosts = await getNewsPosts()
  const heroData = await getHeroData()
  const apiFormattedData = await fetchTeamData()
  const session = await getServerSession(authOptions)
  console.log('sessions', session?.user)
  const roster = await fetchRosterData()
  console.log("roster", roster)
  const data = await fetch('https://api.seawolves.envorso.com/v1/matches', {
    next: { revalidate: 60 }
  })
  const matches = await data.json();





  return (
    <div className="bg-slate-200">

      <HeroSectionTwo
        initialHeroData={heroData}
      />
      <NewsSection news={newsPosts} />


      <UpcomingMatchesCarousel matches={matches} />

      <RosterSection rosterData={roster} />


      <PartnerSection sponsorsData={sponsorsData} />
      {/* <MatchCarousel matches={matches.pastMatchesData} /> */}

    </div>
  )
}
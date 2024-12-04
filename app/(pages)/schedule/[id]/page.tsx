
import { getMatchById } from '@/actions'
import { notFound } from 'next/navigation'
import MatchDetailComponent from '../_components/matchDetailsComp'

export default async function MatchDetailsPage({ params }: { params: { id: string } }) {
  const matchData = await getMatchById(params.id)



  if (!matchData) {
    notFound()
  }

  return <MatchDetailComponent matchData={matchData} />
}
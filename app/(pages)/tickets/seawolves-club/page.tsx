import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Mail, Phone, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const BenefitItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3 font-industry-book text-navy/80">
    <Star className="w-5 h-5 text-green flex-shrink-0 mt-1" />
    <span>{children}</span>
  </li>
)

const CtaButton = ({ children }: { children: React.ReactNode }) => (
  <Button 
    size="lg" 
    className="bg-green hover:bg-green/90 text-navy font-industry-ultra uppercase px-8 py-6"
    asChild
  >
    <Link
      href="https://tix.axs.com/F2fSKQAAAAAvSil5AAAAAAB3%2fv%2f%2f%2fwD%2f%2f%2f%2f%2fA1NTVwD%2f%2f%2f%2f%2f%2f%2f%2f%2f%2fw%3d%3d"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  </Button>
)

export default function SeawolvesClubMembership() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Card className="p-8 bg-white border-none shadow-lg">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-industry-ultra uppercase text-center text-navy">
            Join the Exclusive Seawolves Club – Elevate Your Matchday Experience!
          </h1>

          <div className="relative w-full aspect-video rounded-xl overflow-hidden">
            <Image
              src="/tickets/Seawolves-CLub.jpg"
              alt="Seawolves Club Experience"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-6">
            <p className="text-lg font-industry-book text-navy/80">
              Become a member of the Seawolves Club for just <span className="font-industry-ultra text-navy">$70 per match</span> and unlock premium access and perks that will make every matchday unforgettable!
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-industry-ultra uppercase text-navy">
                As a Seawolves Club member, you'll enjoy:
              </h2>
              <ul className="space-y-4">
                <BenefitItem>
                  <span className="font-industry-demi text-navy">Members Only Space:</span> Access an exclusive lounge area starting 60-75 minutes before kickoff and stay comfortable during halftime and even while the match is ongoing.
                </BenefitItem>
                <BenefitItem>
                  <span className="font-industry-demi text-navy">Gourmet Game Day Snacks:</span> Indulge in fresh, delicious game day snacks, plus sweet treats at halftime.
                </BenefitItem>
                <BenefitItem>
                  <span className="font-industry-demi text-navy">Pregame Wine:</span> Enjoy a wine tasting experience to start your matchday off right.
                </BenefitItem>
                <BenefitItem>
                  <span className="font-industry-demi text-navy">Post-Game Wine & Beer Tastings:</span> After the match, relax with premium wine and beer tastings in a private no-host bar.
                </BenefitItem>
              </ul>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-lg font-industry-ultra uppercase text-navy">
              Limited memberships available – secure yours today!
            </p>
            <CtaButton>GET SEAWOLVES CLUB MEMBERSHIP!</CtaButton>
          </div>

          <div className="relative w-full aspect-video rounded-xl overflow-hidden">
            <Image
              src="/images/stadiumLayout.png"
              alt="2025 Season Ticket Map Starfire Stadium"
              fill
              className="object-contain bg-white"
            />
          </div>

          <div className="text-center space-y-4 pt-6 border-t border-navy/10">
            <p className="font-industry-ultra uppercase text-xl text-navy">Questions?</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                href="tel:206-219-1504" 
                className="flex items-center justify-center gap-2 font-industry-demi text-green hover:text-green/90 transition-colors"
              >
                <Phone className="w-5 h-5" />
                206-219-1504
              </Link>
              <Link 
                href="mailto:info@seawolves.rugby" 
                className="flex items-center justify-center gap-2 font-industry-demi text-green hover:text-green/90 transition-colors"
              >
                <Mail className="w-5 h-5" />
                info@seawolves.rugby
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
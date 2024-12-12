import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Mail, Phone, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const BenefitItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3 text-muted-foreground">
    <Star className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
    <span>{children}</span>
  </li>
)

const CtaButton = ({ children }: { children: React.ReactNode }) => (
  <Button 
    size="lg" 
    className="bg-primary hover:bg-primary/90"
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
      <Card className="p-8 bg-background">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center text-primary">
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
            <p className="text-lg text-muted-foreground">
              Become a member of the Seawolves Club for just <span className="font-bold text-primary">$70 per match</span> and unlock premium access and perks that will make every matchday unforgettable!
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">As a Seawolves Club member, you'll enjoy:</h2>
              <ul className="space-y-4">
                <BenefitItem>
                  <span className="font-semibold text-foreground">Members Only Space:</span> Access an exclusive lounge area starting 60-75 minutes before kickoff and stay comfortable during halftime and even while the match is ongoing.
                </BenefitItem>
                <BenefitItem>
                  <span className="font-semibold text-foreground">Gourmet Game Day Snacks:</span> Indulge in fresh, delicious game day snacks, plus sweet treats at halftime.
                </BenefitItem>
                <BenefitItem>
                  <span className="font-semibold text-foreground">Pregame Wine:</span> Enjoy a wine tasting experience to start your matchday off right.
                </BenefitItem>
                <BenefitItem>
                  <span className="font-semibold text-foreground">Post-Game Wine & Beer Tastings:</span> After the match, relax with premium wine and beer tastings in a private no-host bar.
                </BenefitItem>
              </ul>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-lg font-semibold">
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

          <div className="text-center space-y-4 pt-6 border-t border-accent/20">
            <p className="font-bold text-xl text-primary">Questions?</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 text-muted-foreground">
              <Link 
                href="tel:206-219-1504" 
                className="flex items-center justify-center gap-2 hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5" />
                206-219-1504
              </Link>
              <Link 
                href="mailto:info@seawolves.rugby" 
                className="flex items-center justify-center gap-2 hover:text-primary transition-colors"
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
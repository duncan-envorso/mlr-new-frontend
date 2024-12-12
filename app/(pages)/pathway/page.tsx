'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const PathwaySection = ({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) => (
  <div className={`relative overflow-hidden rounded-xl bg-white shadow-sm p-8 ${className}`}>
    <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
    <h3 className="text-xl font-semibold mb-6 pl-4">{title}</h3>
    {children}
  </div>
)

const PartnerCard = ({ logo, alt, link, children }: { logo: string; alt: string; link?: string; children: React.ReactNode }) => (
  <Card className="overflow-hidden bg-gradient-to-br from-gray-50 to-white">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6">
      <div className="md:col-span-4 flex items-center justify-center">
        <div className="relative w-full aspect-video">
          <Image src={logo} alt={alt} fill className="object-contain"/>
        </div>
      </div>
      <div className="md:col-span-8 space-y-4">
        <div className="prose">{children}</div>
        {link && (
          <Button variant="outline" asChild>
            <Link href={link} className="inline-flex items-center gap-2">
              Learn More <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  </Card>
)

export default function PathwayPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="relative h-[70vh] mb-8">
        <Image
          src="/images/pathway/PathWayMain.jpeg"
          alt="Rugby Pathway Overview"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <PathwaySection title="Overview" className="bg-gradient-to-br from-primary/90 to-primary text-white">
            <p className="text-lg text-white/90">
              The Seawolves Rugby Pathway will act as both the development and high-performance pathway for current and future rugby players in the Pacific Northwest. The mission is to strengthen the current rugby community, increase regional participation, and support the game in a professional manner at all levels.
            </p>
          </PathwaySection>

          <div className="grid md:grid-cols-2 gap-8">
            <PathwaySection title="Train to Win">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold">USA Eagles (Men's & Women's 18+)</h4>
                  <p className="text-gray-600">Our vision is to develop National team players and provide support to USA Rugby as they strive to become a tier one nation at World Rugby.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold">Seattle Seawolves (Men's 18+)</h4>
                  <p className="text-gray-600">The pinnacle of our pathway is the honor to wear the Seattle Seawolves jersey and compete within Major League Rugby.</p>
                </div>
              </div>
            </PathwaySection>

            <PathwaySection title="Train to Compete">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold">Seawolves Developmental XV</h4>
                  <p className="text-gray-600">Our goal with the Developmental XV is to advance more players and provide opportunities to train and compete at the highest level.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold">Local & Regional Competition</h4>
                  <p className="text-gray-600">Supporting clubs and collegiate programs as the foundation for future Seawolves.</p>
                </div>
              </div>
            </PathwaySection>
          </div>

          <PathwaySection title="Train to Train">
            <PartnerCard 
              logo="/images/pathway/Loggers-USRF-1.png"
              alt="Loggers Rugby Logo"
              link="http://www.loggersrugby.org"
            >
              <p>Identifying and developing the next generation of Seawolves through USA Rugby's Pacific Northwest National Development Pathway (NDP) program.</p>
            </PartnerCard>
          </PathwaySection>

          <PathwaySection title="Community">
            <div className="grid md:grid-cols-3 gap-6">
              <PartnerCard logo="/images/pathway/BoysGirls.png" alt="Boys & Girls Club Logo">
                <p>Introducing youth across Washington State to rugby through the Boys & Girls Club partnership.</p>
              </PartnerCard>
              <PartnerCard logo="/images/pathway/TheYMCA.png" alt="YMCA Logo">
                <p>Partnering with YMCA to engage kids with rugby through community events and programs.</p>
              </PartnerCard>
              <PartnerCard logo="/images/pathway/RunWithThePack.png" alt="Run With The Pack">
                <p>Join the Seawolves for rugby activities before home matches at Starfire Stadium.</p>
              </PartnerCard>
            </div>
          </PathwaySection>
        </div>
      </div>
    </div>
  )
}
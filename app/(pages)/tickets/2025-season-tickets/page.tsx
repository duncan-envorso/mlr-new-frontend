'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Mail, Phone, Ticket } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const BenefitCard = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
    <p className="text-gray-700">{children}</p>
  </div>
)

const TicketButton = () => (
  <Button size="lg" asChild className="bg-primary hover:bg-blue-700">
    <Link 
      href="https://tix.axs.com/F2fSKQAAAAAcXC54AAAAAAD1%2fv%2f%2f%2fwD%2f%2f%2f%2f%2fA1NTVwD%2f%2f%2f%2f%2f%2f%2f%2f%2f%2fw%3d%3d"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2"
    >
      <Ticket className="w-5 h-5" />
      GET TICKETS
    </Link>
  </Button>
)

export default function SeawolvesTickets() {
  const benefits = [
    "Best Available Savings of the Season",
    "Same Great Seat Every Match",
    "15% Off Merch Discount",
    "Discounts on Single Match Tickets + Playoffs",
    "Exclusive Season Member Gift",
    "Access to Exclusive Events",
    "Relocation Priority",
    "Dedicated Account Manager",
    "Refer a Friend, Get $50 Team Store Gift Card"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <div className="relative h-[60vh] w-full">
        <Image
          src="https://seawolves.rugby/wp-content/uploads/sites/14/2024/07/2025-SEASON-MEMBERSHIP-Banner.jpg"
          alt="2025 Season Membership Banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100/90" />
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-32 relative z-10">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">2025 Season Tickets</h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Join the Seawolves family and experience every thrilling moment of the 2025 season from your dedicated seat.
          </p>
          <TicketButton />
        </div>

        <Card className="p-8 mb-16 bg-white/80 backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-6">Season Ticket Benefits</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index}>{benefit}</BenefitCard>
            ))}
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Becoming a Seattle Seawolves season ticket member means you're not just attending matches—you're becoming a bigger part of our family. With new teams entering the league and more match themes than ever before, a Season Ticket is your gateway to unforgettable rugby experiences.
            </p>
            <TicketButton />
          </div>
          <div className="relative aspect-[819/1024] w-full">
            <Image
              src="https://seawolves.rugby/wp-content/uploads/sites/14/2024/11/2025-Seawolves-Season-Ticket-Member-Benefits-Updated-w-old-phone-number-11.20.24-819x1024.png"
              alt="2025 Seawolves Season Ticket Member Benefits"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="text-center space-y-4 py-8 border-t border-gray-200">
          <h3 className="text-xl font-semibold">Questions?</h3>
          <div className="flex justify-center gap-8">
            <Link href="tel:2062191504" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <Phone className="w-5 h-5" />
              (206) 219-1504
            </Link>
            <Link href="mailto:info@seawolves.rugby" className="flex items-center gap-2 text-primary hover:text-blue-700">
              <Mail className="w-5 h-5" />
              info@seawolves.rugby
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, Mail, Phone, Ticket } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const TicketButton = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <Button 
    size="lg" 
    className={`w-full max-w-md bg-green hover:bg-green/90 text-navy font-industry-ultra uppercase px-8 py-6 transition-all ${className}`}
    asChild
  >
    <Link
      href="https://tix.axs.com/F2fSKQAAAAAmskB6AAAAAAAX%2fv%2f%2f%2fwD%2f%2f%2f%2f%2fA1NTVwD%2f%2f%2f%2f%2f%2f%2f%2f%2f%2fw%3d%3d/shop/flex/selection"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2"
    >
      <Ticket className="w-5 h-5" />
      {children}
    </Link>
  </Button>
)

const BenefitCard = ({ title, description }: { title: string; description: string }) => (
  <div className="bg-navy/5 p-6 rounded-lg hover:bg-navy/10 transition-colors">
    <h5 className="font-industry-ultra uppercase text-lg mb-2 text-navy">{title}</h5>
    <p className="font-industry-book text-navy/80">{description}</p>
  </div>
)

export default function LeftSidebar() {
  const benefits = [
    {
      title: "Flexible Attendance",
      description: "Enjoy the thrill of live rugby with the freedom to attend half of the season's matches, perfect for busy schedules or new fans."
    },
    {
      title: "Priority Seating",
      description: "Your deposit gives you priority access to choose the best seats before the general public."
    },
    {
      title: "Exclusive Savings",
      description: "Save on match day prices and avoid the hassle of single-game ticket availability."
    }
  ]

  return (
    <Card className="p-8 bg-white border-none shadow-lg">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h3 className="text-3xl font-industry-ultra uppercase mb-4 text-navy">
            Seattle Seawolves 2025 Half-Season Tickets!
          </h3>
          <p className="font-industry-book text-navy/80 text-lg">
            Be part of the action with the Seattle Seawolves and experience the thrill of live rugby like never before.
          </p>
        </div>

        <div className="flex justify-center">
          <TicketButton>GET HALF SEASON TICKETS!</TicketButton>
        </div>

        <div className="space-y-6 text-center">
          <h4 className="text-2xl font-industry-ultra uppercase text-navy">
            Why Choose Half-Season Tickets?
          </h4>
          <div className="grid gap-6">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </div>
        </div>

        <div className="w-full max-w-xl mx-auto">
          <Image
            src="/tickets/Half-Season-Member-Benefits.png"
            alt="Half-Season Member Benefits"
            width={800}
            height={832}
            className="w-full h-auto"
            priority
          />
        </div>

        <div className="flex flex-col items-center space-y-4">
          <Image
            src="/placeholder.svg?height=100&width=100"
            alt="Ticket Graphic"
            width={100}
            height={100}
            className="mb-2"
          />
          <TicketButton className="group">
            SECURE YOUR HALF-SEASON TICKETS!
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </TicketButton>
        </div>

        <div className="text-center space-y-4 border-t border-navy/10 pt-6">
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
  )
}
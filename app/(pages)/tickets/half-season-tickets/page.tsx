import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Mail, Phone, Ticket } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const TicketButton = ({ children }: { children: React.ReactNode }) => (
  <Button 
    size="lg" 
    className="w-full max-w-md bg-primary hover:bg-primary/90 transition-colors"
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
  <div className="bg-accent/10 p-6 rounded-lg">
    <h5 className="font-bold text-lg mb-2 text-primary">{title}</h5>
    <p className="text-muted-foreground">{description}</p>
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
    <Card className="p-8 bg-background">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4 text-primary">Seattle Seawolves 2025 Half-Season Tickets!</h3>
          <p className="text-muted-foreground text-lg">
            Be part of the action with the Seattle Seawolves and experience the thrill of live rugby like never before.
          </p>
        </div>

        <TicketButton>GET HALF SEASON TICKETS!</TicketButton>

        <div className="space-y-6">
          <h4 className="text-2xl font-bold text-primary">Why Choose Half-Season Tickets?</h4>
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

        <TicketButton>SECURE YOUR HALF-SEASON TICKETS!</TicketButton>

        <div className="text-center space-y-4 border-t border-accent/20 pt-6">
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
  )
}
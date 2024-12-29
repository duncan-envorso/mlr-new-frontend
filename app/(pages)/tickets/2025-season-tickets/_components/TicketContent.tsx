// components/tickets/TicketContent.tsx
import { Card } from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BenefitCard } from './BenefitCard';
import { TicketButton } from './TicketButton';
import { benefits } from './data';

export function TicketContent() {
  return (
    <>
      <div className="text-center space-y-6 mb-16">
        <h1 className="text-4xl md:text-5xl font-industry-ultra uppercase text-navy">2025 Season Tickets</h1>
        <p className="text-lg md:text-xl font-industry-book text-navy/80 max-w-3xl mx-auto">
          Join the Seawolves family and experience every thrilling moment of the 2025 season from your dedicated seat.
        </p>
        <TicketButton />
      </div>

      <Card className="p-8 mb-16 bg-white/80 backdrop-blur-sm border-none shadow-lg">
        <h2 className="text-2xl font-industry-ultra uppercase mb-6 text-center text-navy">Season Ticket Benefits</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="space-y-6">
          <p className="text-lg font-industry-book text-navy/80">
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

      <div className="text-center space-y-4 py-8 border-t border-navy/10">
        <h3 className="text-xl font-industry-ultra uppercase text-navy">Questions?</h3>
        <div className="flex justify-center gap-8">
          <Link href="tel:2062191504" className="flex items-center gap-2 text-green hover:text-green/90 font-industry-demi transition-colors">
            <Phone className="w-5 h-5" />
            (206) 219-1504
          </Link>
          <Link href="mailto:info@seawolves.rugby" className="flex items-center gap-2 text-green hover:text-green/90 font-industry-demi transition-colors">
            <Mail className="w-5 h-5" />
            info@seawolves.rugby
          </Link>
        </div>
      </div>
    </>
  );
}
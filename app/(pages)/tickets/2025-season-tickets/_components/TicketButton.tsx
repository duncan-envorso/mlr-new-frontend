// components/tickets/TicketButton.tsx
import { Button } from '@/components/ui/button';
import { Ticket } from 'lucide-react';
import Link from 'next/link';

export function TicketButton() {
  return (
    <Button size="lg" asChild className="bg-green text-navy font-industry-ultra uppercase px-8 py-6">
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
  );
}
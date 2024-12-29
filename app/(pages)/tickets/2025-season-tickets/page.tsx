// app/tickets/page.tsx
import Image from 'next/image';
import { TicketContent } from './_components/TicketContent';

export default async function TicketsPage() {
  return (
    <>
      {/* Hero Image */}
      <div className="relative h-[60vh] w-full">
        <Image
          src="https://seawolves.rugby/wp-content/uploads/sites/14/2024/07/2025-SEASON-MEMBERSHIP-Banner.jpg"
          alt="2025 Season Membership Banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
      </div>

      {/* Main Content */}
      <div className="-mt-32 relative z-10">
        <TicketContent />
      </div>
    </>
  );
}
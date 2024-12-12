import Image from "next/image";
import Link from "next/link";

const ticketOptions = [
  {
    href: "https://seawolves.rugby/2025-season-tickets/",
    src: "/tickets/2025-Ticket-Page-Buttons.png",
    alt: "2025 Season Tickets",
    width: 1080,
    height: 1080,
    external: false
  },
  {
    href: "https://seawolves.rugby/half-season-ticket-deposit/",
    src: "/tickets/2025-Ticket-Page-Buttons-1.png",
    alt: "Half Season Tickets",
    width: 1080,
    height: 1080,
    external: false
  },
  {
    href: "/group-tickets",
    src: "/tickets/group.jpg",
    alt: "Group Experience",
    width: 800,
    height: 800,
    external: false
  },
  {
    href: "https://www.axs.com/series/25516/seattle-seawolves-tickets?skin=seawolves",
    src: "/tickets/Ticket-Page-Buttons.png",
    alt: "Single Match Tickets",
    width: 800,
    height: 800,
    external: true
  },
  {
    href: "/seawolves.rugby/seawolves-club/",
    src: "/tickets/Ticket-Page-Buttons-1.png",
    alt: "Seawolves Club",
    width: 800,
    height: 800,
    external: true
  },
  {
    href: "https://fanaccount.axs.com/?skin=seawolves",
    src: "/tickets/fan-account.jpg",
    alt: "Seawolves Fan Account",
    width: 800,
    height: 800,
    external: true
  }
];

export default function TicketsSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {ticketOptions.map((option) => (
          <Link
            key={option.alt}
            href={option.href}
            className="aspect-square relative block overflow-hidden rounded-lg"
            {...(option.external && {
              target: "_blank",
              rel: "noopener noreferrer"
            })}
          >
            <Image
              src={option.src}
              alt={option.alt}
              width={option.width}
              height={option.height}
              className="object-cover hover:scale-105 transition-transform duration-300"
              priority={option.alt === "2025 Season Tickets"}
            />
          </Link>
        ))}
      </div>

      <div className="text-center space-y-4">
        <p className="text-gray-700">
          Need help? Contact us via{" "}
          <Link href="mailto:info@seawolves.rugby" className="text-blue-600 hover:underline">
            email
          </Link>{" "}
          or call us at{" "}
          <Link href="tel:206-219-1504" className="text-blue-600 hover:underline">
            206-219-1504
          </Link>
        </p>
        <Link
          href="/axs-mobile-id-faq"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          AXS Mobile ID FAQ
        </Link>
      </div>
    </div>
  );
}
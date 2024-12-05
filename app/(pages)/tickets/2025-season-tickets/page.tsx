import Image from 'next/image'
import Link from 'next/link'

export default function SeawolvesTickets() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Image
          src="https://seawolves.rugby/wp-content/uploads/sites/14/2024/07/2025-SEASON-MEMBERSHIP-Banner.jpg"
          alt="2025 Season Membership Banner"
          width={1920}
          height={1080}
          priority
          className="w-full h-auto"
        />
      </div>

      <h1 className="text-4xl font-bold text-center mb-8">2025 Season Tickets!</h1>

      <div className="text-center mb-8">
        <Link 
          href="https://tix.axs.com/F2fSKQAAAAAcXC54AAAAAAD1%2fv%2f%2f%2fwD%2f%2f%2f%2f%2fA1NTVwD%2f%2f%2f%2f%2f%2f%2f%2f%2f%2fw%3d%3d"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          GET TICKETS
        </Link>
      </div>

      <p className="mb-6">
        Becoming a Seattle Seawolves season ticket member means you're not just attending matches—you're becoming a bigger part of our family. Don't miss a minute of action this 2025 Season, with new teams entering the league, more match themes than ever before and halftime shows that are sure to impress, a Season Ticket is the only ticket to purchase.
      </p>

      <p className="font-bold mb-6">
        Secure your spot as a season ticket member by purchasing through this link below or call the front office 206-219-1504
      </p>

      <div className="text-center mb-8">
        <Link 
          href="https://tix.axs.com/F2fSKQAAAAAcXC54AAAAAAD1%2fv%2f%2f%2fwD%2f%2f%2f%2f%2fA1NTVwD%2f%2f%2f%2f%2f%2f%2f%2f%2f%2fw%3d%3d"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          GET TICKETS
        </Link>
      </div>

      <h2 className="text-3xl font-bold mb-4">2025 Season Ticket Benefits</h2>

      <p className="mb-4">
        As a Seattle Seawolves season ticket member, you'll enjoy numerous benefits designed to enhance your game-day experience and show our appreciation for your loyalty:
      </p>

      <ul className="list-disc pl-6 mb-6">
        <li className="italic">Best Available Savings of the Season</li>
        <li className="italic">Same Great Seat Every Match</li>
        <li className="italic">15% Off Merch Discount</li>
        <li className="italic">Discounts on Single Match Tickets + Playoffs</li>
        <li className="italic">Exclusive Season Member Gift</li>
        <li className="italic">Access to Exclusive Events</li>
        <li className="italic">Relocation Priority</li>
        <li className="italic">Dedicated Account Manager</li>
        <li className="italic">Refer a Friend, Get $50 Team Store Gift Card</li>
      </ul>

      <div className="mb-6">
        <Image
          src="https://seawolves.rugby/wp-content/uploads/sites/14/2024/11/2025-Seawolves-Season-Ticket-Member-Benefits-Updated-w-old-phone-number-11.20.24-819x1024.png"
          alt="2025 Seawolves Season Ticket Member Benefits"
          width={819}
          height={1024}
          className="mx-auto"
        />
      </div>

      <p className="mb-4">
        Enjoy the thrill of every game from the same great seat, save on tickets, and gain access to exclusive events. <span className="font-bold">Join the Seawolves Family Today!</span>
      </p>

      <p className="mb-6">
        We look forward to welcoming you as a 2025 Seattle Seawolves season ticket member. Go Seawolves!
      </p>

      <div className="text-center mb-6">
        <p>Questions?</p>
        <p>
          Call: <a href="tel:2062191504" className="text-blue-600 hover:underline">(206) 219-1504</a> or email <a href="mailto:info@seawolves.rugby" className="text-blue-600 hover:underline">info@seawolves.rugby</a>
        </p>
      </div>

      <div className="text-center">
        <Link 
          href="https://tix.axs.com/F2fSKQAAAAAcXC54AAAAAAD1%2fv%2f%2f%2fwD%2f%2f%2f%2f%2fA1NTVwD%2f%2f%2f%2f%2f%2f%2f%2f%2f%2fw%3d%3d"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          GET TICKETS
        </Link>
      </div>
    </div>
  )
}


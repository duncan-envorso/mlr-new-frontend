import Image from 'next/image'
import Link from 'next/link'

export default function SeawolvesClubMembership() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="common-section bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Join the Exclusive Seawolves Club – Elevate Your Matchday Experience!
        </h1>

        <div className="mb-8">
          <Image
            src="https://seawolves.rugby/wp-content/uploads/sites/14/2024/11/637A2738-scaled.jpg"
            alt="Seawolves Club Experience"
            width={1920}
            height={1080}
            layout="responsive"
            className="rounded-lg"
          />
        </div>

        <p className="text-lg mb-6">
          Become a member of the Seawolves Club for just <strong>$70 per match</strong> and unlock premium access and perks that will make every matchday unforgettable!
        </p>

        <p className="text-xl font-bold mb-4">As a Seawolves Club member, you'll enjoy:</p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Members Only Space</strong>: Access an exclusive lounge area starting 60-75 minutes before kickoff and stay comfortable during halftime and even while the match is ongoing.</li>
          <li><strong>Gourmet Game Day Snacks</strong>: Indulge in fresh, delicious game day snacks, plus sweet treats at halftime.</li>
          <li><strong>Pregame Wine</strong>: Enjoy a wine tasting experience to start your matchday off right.</li>
          <li><strong>Post-Game Wine & Beer Tastings</strong>: After the match, relax with premium wine and beer tastings in a private no-host bar.</li>
        </ul>

        <p className="mb-6">
          This is your chance to enhance your Seawolves experience with all the perks and comforts of our exclusive membership. <strong>Limited memberships available</strong> – secure yours today and make every matchday special!
        </p>

        <p className="text-xl font-bold mb-6 text-center">
          Get your Seawolves Club membership now!
        </p>

        <div className="text-center mb-8">
          <Link
            href="https://tix.axs.com/F2fSKQAAAAAvSil5AAAAAAB3%2fv%2f%2f%2fwD%2f%2f%2f%2f%2fA1NTVwD%2f%2f%2f%2f%2f%2f%2f%2f%2f%2fw%3d%3d"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300"
          >
            GET SEAWOLVES CLUB MEMBERSHIP!
          </Link>
        </div>

        <div className="mb-8">
          <Image
            src="https://seawolves.rugby/wp-content/uploads/sites/14/2024/10/2025-Season-Ticket-Map-Starfire-Stadium.png"
            alt="2025 Season Ticket Map Starfire Stadium"
            width={1920}
            height={1080}
            layout="responsive"
            className="rounded-lg"
          />
        </div>

        <div className="text-center mb-6">
          <p className="mb-2">Questions?</p>
          <p>
            Call: <a href="tel:2062191504" className="text-blue-600 hover:underline">(206) 219-1504</a> or email <a href="mailto:info@seawolves.rugby" className="text-blue-600 hover:underline">info@seawolves.rugby</a>
          </p>
        </div>

        <div className="text-center">
          <Link
            href="https://tix.axs.com/F2fSKQAAAAAvSil5AAAAAAB3%2fv%2f%2f%2fwD%2f%2f%2f%2f%2fA1NTVwD%2f%2f%2f%2f%2f%2f%2f%2f%2f%2fw%3d%3d"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300"
          >
            GET SEAWOLVES CLUB MEMBERSHIP!
          </Link>
        </div>
      </div>
    </div>
  )
}


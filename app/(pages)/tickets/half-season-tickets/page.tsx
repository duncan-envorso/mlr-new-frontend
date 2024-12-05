import Image from 'next/image'
import Link from 'next/link'

export default function LeftSidebar() {
  return (
    <div className="left-sidebar">
      <div className="common-section bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-4">Seattle Seawolves 2025 Half-Season Tickets!</h3>
        <p className="mb-6">
          Be part of the action with the Seattle Seawolves and experience the thrill of live rugby like never before. Don't miss the chance to be there for key games, intense rivalries, and unforgettable moments!
        </p>
        <div className="common-btn text-center max-w-[400px] mx-auto mb-6">
          <Link
            href="https://tix.axs.com/F2fSKQAAAAAmskB6AAAAAAAX%2fv%2f%2f%2fwD%2f%2f%2f%2f%2fA1NTVwD%2f%2f%2f%2f%2f%2f%2f%2f%2f%2fw%3d%3d/shop/flex/selection"
            target="_blank"
            rel="noopener noreferrer"
            className="common-btn-inn block bg-blue-600 text-white font-bold py-3 px-6 rounded hover:bg-blue-700 transition duration-300"
          >
            GET HALF SEASON TICKETS!
          </Link>
        </div>
        <h4 className="text-xl font-bold mb-4">Why Choose Half-Season Tickets?</h4>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Flexible Attendance:</strong> Enjoy the thrill of live rugby with the freedom to attend half of the season's matches, perfect for busy schedules or new fans.
          </li>
          <li>
            <strong>Priority Seating:</strong> Your deposit gives you priority access to choose the best seats before the general public.
          </li>
          <li>
            <strong>Exclusive Savings:</strong> Save on match day prices and avoid the hassle of single-game ticket availability.
          </li>
        </ul>
        <div className="mb-6">
          <Image
            src="https://seawolves.rugby/wp-content/uploads/sites/14/2024/09/Half-Season-Member-Benefits.png"
            alt="Half-Season Member Benefits"
            width={459}
            height={476}
            className="mx-auto"
            priority
          />
        </div>
        <div className="common-btn text-center max-w-[400px] mx-auto mb-6">
          <Link
            href="https://tix.axs.com/F2fSKQAAAAAmskB6AAAAAAAX%2fv%2f%2f%2fwD%2f%2f%2f%2f%2fA1NTVwD%2f%2f%2f%2f%2f%2f%2f%2f%2f%2fw%3d%3d/shop/flex/selection"
            target="_blank"
            rel="noopener noreferrer"
            className="common-btn-inn block bg-blue-600 text-white font-bold py-3 px-6 rounded hover:bg-blue-700 transition duration-300"
          >
            SECURE YOUR HALF-SEASON TICKETS!
          </Link>
        </div>
        <p className="font-bold">
          <strong>Questions?</strong> Contact our ticket office at 206-219-1504 or email us at info@seawolves.rugby
        </p>
      </div>
    </div>
  )
}


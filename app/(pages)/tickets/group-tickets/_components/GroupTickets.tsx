import Image from 'next/image'
import GroupTicketForm from './GroupTicketForm'

export default function GroupTickets() {
  const experiences = [
    {
      title: "High Five Squad",
      description: "Your group will create a High Five line that will greet both the Seawolves and opposing teams' players when they return to the field after halftime. All participants will receive a Seawolves mini ball. 30+ group required.",
      image: "/wp-content/uploads/sites/14/2021/09/image10.jpg"
    },
    {
      title: "Benchwarmers",
      description: "Prior to the game, your group will have the opportunity to watch warm-ups from the Seawolves' bench. 20-30 group required. Includes autographed jersey by player.",
      image: "/wp-content/uploads/sites/14/2021/09/image1.jpg"
    },
    {
      title: "Birthday Party Pack",
      description: "Enjoy your birthday party with the Seawolves! Receive a birthday item for the guest of honor, your name on the videoboard and a picture with Rucky the Seawolf. 10+ group required.",
      image: "/wp-content/uploads/sites/14/2021/09/image3.jpg"
    },
    {
      title: "Rugby 101",
      description: "Your group will receive a pre-game rugby tutorial from at least one of our non-rostered players. 20+ group required",
      image: "https://seawolves.rugby/wp-content/uploads/sites/14/2024/01/image.png"
    }
  ]

  return (
    <div className="left-sidebar">
      <div className="common-section bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6">Group Tickets</h2>
        <h5 className="text-xl font-semibold mb-8">
          Bring your friends and family to a Seattle Seawolves match and experience action-packed rugby like you've never seen before! Whether you're celebrating a birthday, organizing a corporate outing, or just gathering your squad, group tickets offer a fantastic way to enjoy the game together.
        </h5>
        
        <h3 className="text-2xl font-bold mb-4">Seawolves Group Benefits:</h3>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li>Block seating to keep your group together</li>
          <li>Savings for groups of 10 or more</li>
          <li>Exclusive access to amazing fan experiences</li>
          <li>Customized flyer and FEVO weblink for easy group booking</li>
          <li>Dedicated group manager to assist in planning and executing your outing</li>
          <li>Fundraising opportunities</li>
        </ul>

        <GroupTicketForm />

        <div className="my-16"></div>

        <h2 className="text-3xl font-bold mb-8">2024 Group Experiences and Performance Group Packages</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <Image 
                src={exp.image} 
                alt={exp.title} 
                width={500} 
                height={300} 
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <p className="font-bold">
            Questions? Call 206-219-1504 or email <a href="mailto:info@seawolves.rugby" className="text-blue-600 hover:underline">info@seawolves.rugby</a>
          </p>
        </div>
      </div>
    </div>
  )
}


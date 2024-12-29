'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Mail, Phone, Users } from 'lucide-react'
import Image from 'next/image'
import { FormEvent, useState } from 'react'

const ExperienceCard = ({ title, description, image }: { 
  title: string
  description: string
  image: string
}) => (
<Card className="group relative overflow-hidden border-none shadow-lg">
    <div className="relative aspect-[4/3]">
      <Image 
        src={image} 
        alt={title} 
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-navy/20" />
      <Image
        src="/images/seawolves-logo.png"
        alt="Seawolves Rugby"
        width={60}
        height={60}
        className="absolute right-4 top-4 z-10"
      />
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
      <h3 className="mb-2 text-xl font-industry-ultra uppercase">{title}</h3>
      <p className="font-industry-book text-sm">{description}</p>
    </div>
  </Card>
)

const GroupTicketForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredCommunication: ''
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="font-industry-demi text-navy">
            First Name<span className="text-red-500">*</span>
          </Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
            required
            className="border-navy/20 focus:border-green"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="font-industry-demi text-navy">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
            className="border-navy/20 focus:border-green"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="font-industry-demi text-navy">
            Email<span className="text-red-500">*</span>
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
            className="border-navy/20 focus:border-green"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="font-industry-demi text-navy">Phone</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="border-navy/20 focus:border-green"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="preferredCommunication" className="font-industry-demi text-navy">
          Preferred Communication Method<span className="text-red-500">*</span>
        </Label>
        <Select 
          onValueChange={(value) => setFormData(prev => ({ ...prev, preferredCommunication: value }))}
          value={formData.preferredCommunication}
          required
        >
          <SelectTrigger className="border-navy/20 focus:border-green">
            <SelectValue placeholder="Select preferred communication method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Email">Email</SelectItem>
            <SelectItem value="Phone">Phone</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button 
        type="submit" 
        className="w-full md:w-auto font-industry-ultra uppercase bg-green text-navy hover:bg-green/90 px-8 py-6"
      >
        Submit
      </Button>
    </form>
  )
}

export default function GroupTickets() {
  const experiences = [
    {
      title: "High Five Squad",
      description: "Your group will create a High Five line that will greet both the Seawolves and opposing teams' players when they return to the field after halftime. All participants will receive a Seawolves mini ball. 30+ group required.",
      image: "/tickets/group-tickets/High5Squad.jpg"
    },
    {
      title: "Benchwarmers",
      description: "Prior to the game, your group will have the opportunity to watch warm-ups from the Seawolves' bench. 20-30 group required. Includes autographed jersey by player.",
      image: "/tickets/group-tickets/BenchWarmers.jpg"
    },
    {
      title: "Birthday Party Pack",
      description: "Enjoy your birthday party with the Seawolves! Receive a birthday item for the guest of honor, your name on the videoboard and a picture with Rucky the Seawolf. 10+ group required.",
      image: "/tickets/group-tickets/BirthdayPack.jpg"
    },
    {
      title: "Rugby 101",
      description: "Your group will receive a pre-game rugby tutorial from at least one of our non-rostered players. 20+ group required",
      image: "/tickets/group-tickets/Rugby101.png"
    }
  ]

  return (
    <Card className="p-8 bg-white border-none">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="space-y-6">
          <h1 className="text-4xl font-industry-ultra uppercase text-navy">Group Tickets</h1>
          <p className="text-xl font-industry-book text-navy/80">
            Bring your friends and family to a Seattle Seawolves match and experience action-packed rugby like you've never seen before!
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-industry-ultra uppercase text-navy">Seawolves Group Benefits</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Block seating to keep your group together",
              "Savings for groups of 10 or more",
              "Exclusive access to amazing fan experiences",
              "Customized flyer and FEVO weblink for easy group booking",
              "Dedicated group manager to assist in planning",
              "Fundraising opportunities"
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <Users className="w-5 h-5 text-green flex-shrink-0 mt-1" />
                <span className="font-industry-book text-navy/80">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <GroupTicketForm />

        <div className="space-y-6">
          <h2 className="text-2xl font-industry-ultra uppercase text-navy">2024 Group Experiences</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} {...exp} />
            ))}
          </div>
        </div>

        <div className="text-center space-y-4 pt-6 border-t border-navy/10">
          <p className="font-industry-ultra uppercase text-xl text-navy">Questions?</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="tel:206-219-1504" className="flex items-center justify-center gap-2 font-industry-demi text-green hover:text-green/90 transition-colors">
              <Phone className="w-5 h-5" />
              206-219-1504
            </a>
            <a href="mailto:info@seawolves.rugby" className="flex items-center justify-center gap-2 font-industry-demi text-green hover:text-green/90 transition-colors">
              <Mail className="w-5 h-5" />
              info@seawolves.rugby
            </a>
          </div>
        </div>
      </div>
    </Card>
  )
}
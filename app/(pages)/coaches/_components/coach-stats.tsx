"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Calendar, Camera, MapPin, UserRound } from 'lucide-react'
import type { StaticImageData } from "next/image"
import Image from "next/image"

type Coach = {
  id: string
  team_id: string
  name: string
  job_title: string
  hometown: string
  date_of_birth: string
  bio: string
  portrait: string | StaticImageData | null
  is_active: boolean
  coaching_experience: string[]
  notable_achievements: string[]
}

function CoachInfo({ coach }: { coach: Coach }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow">
          <UserRound className="w-6 h-6 text-primary mb-2" />
          <span className="text-sm font-medium text-gray-500">Role</span>
          <span className="text-lg font-bold text-gray-800">{coach.job_title}</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow">
          <MapPin className="w-6 h-6 text-primary mb-2" />
          <span className="text-sm font-medium text-gray-500">Hometown</span>
          <span className="text-lg font-bold text-gray-800">{coach.hometown}</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow">
          <Calendar className="w-6 h-6 text-primary mb-2" />
          <span className="text-sm font-medium text-gray-500">Date of Birth</span>
          <span className="text-lg font-bold text-gray-800">{formatDate(coach.date_of_birth)}</span>
        </div>
      </div>
      {/* {coach && coach.coaching_experience.length > 0 && (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-3 text-gray-800">Coaching Experience</h3>
      <ul className="space-y-2 bg-white p-4 rounded-lg shadow">
        {coach.coaching_experience.map((experience, index) => (
          <li key={index} className="flex items-center text-gray-600">
            <Trophy className="w-4 h-4 mr-2 text-primary" />
            {experience}
          </li>
        ))}
      </ul>
    </div>
  )} */}

      {/* {coach.notable_achievements.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Notable Achievements</h3>
          <ul className="space-y-2 bg-white p-4 rounded-lg shadow">
            {coach.notable_achievements.map((achievement, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <Trophy className="w-4 h-4 mr-2 text-primary" />
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  )
}

function CoachCard({ coach }: { coach?: Coach }) {
  if (!coach) {
    return <div className="text-center p-4">No coach data available</div>
  }

  return (
    <Card className="w-full max-w-6xl bg-white shadow-xl overflow-hidden">
      <CardHeader className="relative p-0">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-6 bg-primary rounded-lg shadow-lg text-primary-foreground">
          {coach.portrait ? (
            <div className="relative w-36 h-36 flex-shrink-0">
              <Image
                src={coach.portrait}
                alt={coach.name}
                fill
                sizes="(max-width: 144px) 100vw, 144px"
                className="rounded-full object-cover border-4 border-white shadow-md"
                priority
              />
            </div>
          ) : (
            <div className="w-36 h-36 flex-shrink-0 rounded-full bg-gray-100 flex items-center justify-center border-4 border-primary shadow-md">
              <Camera className="w-12 h-12 text-gray-400" aria-hidden="true" />
              <span className="sr-only">No coach portrait available</span>
            </div>
          )}
          <div className="flex-1 text-center md:text-left space-y-4">
            <h1 className="text-4xl font-bold text-primary-foreground">{coach.name}</h1>
            {coach.is_active && (
              <span className="inline-block px-3 py-1 bg-green-500 text-white rounded-full text-sm">
                Active
              </span>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 bg-gray-50 space-y-6">
        <CoachInfo coach={coach} />

        <div>
          <h2 className="text-2xl font-semibold mb-2">Coach Bio</h2>
          <div
            className="text-sm text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: coach.bio || 'No bio available' }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default function CoachesStats({ coach }: { coach?: Coach }) {
  return <CoachCard coach={coach} />
}

export type { Coach }

"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Calendar, Camera, MapPin, Scale, User } from 'lucide-react'
import type { StaticImageData } from "next/image"
import Image from "next/image"
import { useState } from "react"

type Player = {
  id: string
  team_id: string
  name: string
  position: string
  height: number
  weight: number
  hometown: string
  date_of_birth: string
  bio: string
  portrait: string | StaticImageData | null
  is_active: boolean
}

function PlayerInfo({ player, useMetric }: { player: Player; useMetric: boolean }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const formatHeight = (cm: number) => {
    if (useMetric) return `${cm} cm`
    const inches = cm / 2.54
    const feet = Math.floor(inches / 12)
    const remainingInches = Math.round(inches % 12)
    return `${feet}'${remainingInches}"`
  }

  const formatWeight = (kg: number) => {
    if (useMetric) return `${kg} kg`
    const lbs = Math.round(kg * 2.20462)
    return `${lbs} lbs`
  }

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow">
          <User className="w-6 h-6 text-primary mb-2" />
          <span className="text-sm font-medium text-gray-500">Position</span>
          <span className="text-lg font-bold text-gray-800">{player.position}</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow">
          <Scale className="w-6 h-6 text-primary mb-2" />
          <span className="text-sm font-medium text-gray-500">Height / Weight</span>
          <span className="text-lg font-bold text-gray-800">
            {formatHeight(player.height)} / {formatWeight(player.weight)}
          </span>
        </div>
        <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow">
          <MapPin className="w-6 h-6 text-primary mb-2" />
          <span className="text-sm font-medium text-gray-500">Hometown</span>
          <span className="text-lg font-bold text-gray-800">{player.hometown}</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow">
          <Calendar className="w-6 h-6 text-primary mb-2" />
          <span className="text-sm font-medium text-gray-500">Date of Birth</span>
          <span className="text-lg font-bold text-gray-800">{formatDate(player.date_of_birth)}</span>
        </div>
      </div>
    </div>
  )
}

function PlayerCard({ player }: { player?: Player }) {
  const [useMetric, setUseMetric] = useState(false)

  if (!player) {
    return <div className="text-center p-4">No player data available</div>
  }

  return (
    <Card className="w-full max-w-6xl bg-white shadow-xl overflow-hidden">
      <CardHeader className="relative p-0">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-6 bg-primary rounded-lg shadow-lg text-primary-foreground">
          {player.portrait ? (
            <div className="relative w-36 h-36 flex-shrink-0">
              <Image
                src={player.portrait}
                alt={player.name}
                fill
                sizes="(max-width: 144px) 100vw, 144px"
                className="rounded-full object-cover border-4 border-white shadow-md"
                priority
              />
            </div>
          ) : (
            <div className="w-36 h-36 flex-shrink-0 rounded-full bg-gray-100 flex items-center justify-center border-4 border-primary shadow-md">
              <Camera className="w-12 h-12 text-gray-400" aria-hidden="true" />
              <span className="sr-only">No player portrait available</span>
            </div>
          )}
          <div className="flex-1 text-center md:text-left space-y-4">
            <h1 className="text-4xl font-bold text-primary-foreground">{player.name}</h1>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 bg-gray-50 space-y-6">
        <div className="flex justify-end items-center space-x-2">
          <Label htmlFor="unit-toggle" className="text-sm font-medium text-gray-700">
            {useMetric ? "Metric" : "Imperial"}
          </Label>
          <Switch
            id="unit-toggle"
            checked={useMetric}
            onCheckedChange={setUseMetric}
            className="bg-slate-600"
          />
        </div>

        <PlayerInfo player={player} useMetric={useMetric} />

        <div>
          <h2 className="text-2xl font-semibold mb-2">Player Bio</h2>
          <div
            className="text-sm text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: player.bio || 'No bio available' }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default function PlayerStatsCard({ player }: { player?: Player }) {
  return <PlayerCard player={player} />
}


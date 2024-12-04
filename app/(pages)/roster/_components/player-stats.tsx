"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Calendar, Camera, MapPin, Scale, Shield, Trophy, User } from 'lucide-react'
import type { StaticImageData } from "next/image"
import Image from "next/image"
import { useState } from "react"

type Metric = {
  name: string
  value: string
  league_rank: number
  league_average: number | null
}

type Player = {
  id: string
  name: string
  position: string
  position_group_id: number
  height: number
  weight: number
  hometown: string
  date_of_birth: string
  bio: string | null
  portrait: string | StaticImageData | null
  metrics: Metric[]
}

type StatBoxProps = {
  label: string
  value: string | null
  rank?: number
  average?: number | null
}

const statsCategories = {
  attack: ["Ball Carries", "Line Breaks", "Offloads", "Clean Breaks", "Defenders Beaten", "Distance Gained", "Average Gain"],
  defense: ["Total Tackles Attempted", "Successful Tackles %", "Dominant Tackles", "Missed Tackles", "Breakdown Turnovers Won"],
  general: ["Matches Count", "Match Time(Minutes)", "Points Scored", "Total Tries", "Distance Run"]
} as const

function StatBox({ label, value, rank, average }: StatBoxProps) {
  const formatStat = (val: string | null | undefined): string => {
    if (val === null || val === undefined) return "N/A"
    return Number(val).toLocaleString(undefined, { maximumFractionDigits: 2 })
  }

  const getPerformanceColor = (val: number, avg: number): string => {
    const ratio = val / avg
    if (ratio >= 1.2) return "bg-primary"
    if (ratio >= 1) return "bg-accent"
    if (ratio >= 0.8) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="p-4 bg-white rounded-lg transition-all duration-300 hover:shadow-md hover:scale-105 border border-gray-200">
      <div className="text-2xl font-bold text-primary">{formatStat(value)}</div>
      <div className="text-sm text-gray-600 font-medium">{label}</div>
      {rank && average && (
        <div className="mt-2">
          <Progress
            value={(Number(value) / average) * 100}
            className={`h-2 ${getPerformanceColor(Number(value), average)}`}
          />
          <div className="text-xs text-gray-500 mt-1 flex justify-between">
            <span>Rank: {rank}</span>
            <span>Avg: {formatStat(average.toString())}</span>
          </div>
        </div>
      )}
    </div>
  )
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
  const [activeTab, setActiveTab] = useState<keyof typeof statsCategories>("attack")
  const [useMetric, setUseMetric] = useState(true)

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

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as keyof typeof statsCategories)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            {(Object.keys(statsCategories) as Array<keyof typeof statsCategories>).map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="flex items-center gap-2 text-secondary data-[state=active]:text-primary data-[state=active]:bg-white"
              >
                {category === "attack" && <Trophy className="w-4 h-4" aria-hidden="true" />}
                {category === "defense" && <Shield className="w-4 h-4" aria-hidden="true" />}
                {category === "general" && <Activity className="w-4 h-4" aria-hidden="true" />}
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          {(Object.entries(statsCategories) as unknown as [keyof typeof statsCategories, string[]][]).map(([category, stats]) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.map((stat) => {
                  const metric = player.metrics.find((m) => m.name === stat)
                  return (
                    metric && (
                      <StatBox
                        key={stat}
                        label={stat}
                        value={metric.value}
                        rank={metric.league_rank}
                        average={metric.league_average}
                      />
                    )
                  )
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default function PlayerStatsCard({ player }: { player?: Player }) {
  return <PlayerCard player={player} />
}


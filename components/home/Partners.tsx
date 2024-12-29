'use client'

import { currentTeamConfig } from '@/config/teamConfig'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface Partner {
  name: string
  description: string
  logoUrl: string
  websiteUrl: string
  category: 'primary' | 'media' | 'community' | 'league'
}

interface SponsorBoxProps {
  sponsor: Partner
}

function SponsorBox({ sponsor }: SponsorBoxProps) {
  const [imageError, setImageError] = useState(false)

  const content = (
    <div className="relative w-full h-full">
      {!imageError ? (
        <Image
          src={sponsor.logoUrl}
          alt={sponsor.name}
          fill
          className={cn(
            "object-contain",
            "transition-all duration-300",
            "group-hover:brightness-110"
          )}
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          priority={sponsor.category === 'primary'}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-center text-sm">
          {sponsor.name}
        </div>
      )}
    </div>
  )

  const commonClasses = cn(
    "group relative w-full aspect-[3/2] p-4",
    "bg-white/5 hover:bg-white/10",
    "rounded-lg transition-all duration-300",
    "flex items-center justify-center",
    "overflow-hidden"
  )

  if (!sponsor.websiteUrl) {
    return (
      <div
        className={commonClasses}
        title={`${sponsor.name} - ${sponsor.description}`}
      >
        {content}
      </div>
    )
  }

  return (
    <Link
      href={sponsor.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={commonClasses}
      title={`${sponsor.name} - ${sponsor.description}`}
    >
      {content}
    </Link>
  )
}

export function PartnerSection({ sponsorsData }: { sponsorsData: Partner[] }) {
  if (!sponsorsData?.length) return null

  return (
    <section className="py-12 w-full mx-auto px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Our Partners
          </h2>
          <p className="text-sm text-gray-600">
            Proud partners of {currentTeamConfig?.name}
          </p>
        </div>
        
        <div 
          className={cn(
            "grid gap-6 justify-items-center items-stretch",
            "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          )}
        >
          {sponsorsData.map((sponsor, index) => (
            <SponsorBox 
              key={`${sponsor.name}-${index}`} 
              sponsor={sponsor}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
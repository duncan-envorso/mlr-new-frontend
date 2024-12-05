'use client'

import { currentTeamConfig } from '@/config/teamConfig'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useMemo, useState } from 'react'

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

const categories = [
  { id: 'all', label: 'All Partners' },
  { id: 'primary', label: 'Primary Partners' },
  { id: 'media', label: 'Media Partners' },
  { id: 'community', label: 'Community Partners' }
] as const

export function PartnerSection({ sponsorsData }: { sponsorsData: Partner[] }) {
  const [showAll, setShowAll] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]['id']>('all')

  const visibleSponsors = useMemo(() => {
    const filteredSponsors = showAll 
      ? sponsorsData
      : sponsorsData.filter(s => s.category === 'primary')

    return selectedCategory === 'all' 
      ? filteredSponsors 
      : filteredSponsors.filter(s => s.category === selectedCategory)
  }, [showAll, selectedCategory, sponsorsData])

  const handleCategoryChange = useCallback((category: typeof categories[number]['id']) => {
    setSelectedCategory(category)
    if (category !== 'all' && !showAll) {
      setShowAll(true)
    }
  }, [showAll])

  if (!sponsorsData?.length) return null

  return (
    <section className="py-12 w-full mx-auto px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Our Partners
          </h2>
          <p className="text-sm text-gray-600">
            Proud partners of {currentTeamConfig?.name}
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-8 flex-wrap" role="tablist">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={cn(
                "px-4 py-2 text-sm rounded-full transition-colors duration-300",
                selectedCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              )}
              role="tab"
              aria-selected={selectedCategory === category.id}
              aria-controls={`${category.id}-partners`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        <div 
          className={cn(
            "grid gap-6 justify-items-center items-stretch",
            "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          )}
          role="tabpanel"
          id={`${selectedCategory}-partners`}
        >
          {visibleSponsors.map((sponsor, index) => (
            <SponsorBox 
              key={`${sponsor.name}-${index}`} 
              sponsor={sponsor}
            />
          ))}
        </div>

        {sponsorsData.length > visibleSponsors.length && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(true)}
              className={cn(
                "px-6 py-2 text-sm",
                "rounded-full",
                "bg-blue-600 hover:bg-blue-700 text-white",
                "transition-colors duration-300"
              )}
              aria-expanded={showAll}
            >
              View All Partners
            </button>
          </div>
        )}
      </div>
    </section>
  )
}


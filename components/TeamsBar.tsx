'use client'

import { teams } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"

export default function MLRTeamsBar() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="relative h-14 pt-6">
          <div className="absolute bottom-0 w-full">
            <div className="flex items-end justify-end overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-2">
              <div className="flex items-center space-x-6 shrink-0">
                {teams.map((team) => (
                  <Link
                    key={team.name}
                    href={team.url}
                    className="flex items-center py-1 hover:opacity-80 transition-opacity shrink-0"
                  >
                    <Image
                      src={team.logo}
                      alt={`${team.name} logo`}
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain"
                    />
                  </Link>
                ))}
              </div>
              <div className="flex items-center shrink-0 ml-6">
                <div className="h-6 w-px bg-gray-300 ml-4" />
                <Link  href={'https://www.majorleague.rugby/'}>
                <Image
                  src="https://media.licdn.com/dms/image/C5612AQEctSPCsX6VCQ/article-cover_image-shrink_720_1280/0/1520086681323?e=2147483647&v=beta&t=Xp-va923Kr3_XvsgouEOE7Bi-mss3R1weIJpcnJ5uBc"
                  alt="MLR Logo"
                  width={120}
                  height={120}
                  className="ml-8"
                />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
// Header.tsx
'use client'

import { Button } from "@/components/ui/button"
import { currentTeamConfig } from "@/config/teamConfig"
import { fanCentralMenu, menuItems, socialIcons } from "@/lib/data"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import MLRTeamsBar from "../TeamsBar"
import MobileMenu from "./MobileMenu"
import { TeamDropdown } from "./TeamDropDown"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isFanCentralOpen, setIsFanCentralOpen] = useState(false)
  const [activeMenuItem, setActiveMenuItem] = useState(0)
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false)
  const [activeTeamMenuItem, setActiveTeamMenuItem] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const fanCentralDropdown = document.getElementById('fan-central-dropdown')
      const teamDropdown = document.getElementById('team-dropdown')

      if (fanCentralDropdown && !fanCentralDropdown.contains(event.target as Node)) {
        setIsFanCentralOpen(false)
      }
      if (teamDropdown && !teamDropdown.contains(event.target as Node)) {
        setIsTeamDropdownOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleNavigate = () => {
    setIsFanCentralOpen(false)
    setIsTeamDropdownOpen(false)
  }

  const FanCentralDropdown = () => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-full right-1/2 mt-4 w-[800px] bg-white rounded-lg shadow-lg overflow-hidden z-50"
      style={{ marginRight: '-400px' }}
    >
      <div className="grid grid-cols-12 gap-0 h-[400px]">
        <div className="col-span-5 p-6 border-r border-gray-100">
          <div className="space-y-1">
            {fanCentralMenu.map((menuItem, index) => {
              const Icon = menuItem.icon;
              return (
                <Link
                  key={menuItem.name}
                  href={menuItem.url}
                  className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors group relative"
                  onMouseEnter={() => setActiveMenuItem(index)}
                >
                  <div className="flex gap-3">
                    {Icon && <Icon className="h-5 w-5 text-primary mt-1" />}
                    <div>
                      <h3 className="font-bold text-primary group-hover:text-accent transition-colors">
                        {menuItem.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {menuItem.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMenuItem}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative h-full"
            >
              <Image
                src={fanCentralMenu[activeMenuItem]?.image || '/placeholder.jpg'}
                alt={fanCentralMenu[activeMenuItem]?.name || ""}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-2xl font-bold mb-2">
                    {fanCentralMenu[activeMenuItem]?.name}
                  </h3>
                  <p className="text-white/90">
                    {fanCentralMenu[activeMenuItem]?.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      <motion.header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-primary/95 backdrop-blur-sm' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="relative bg-primary overflow-visible">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="relative min-w-[100px] md:min-w-[150px] h-14">
              <Link
                href="/"
                className="block absolute -top-4 transform translate-y-4 z-20"
              >
                <div className="p-2">
                  <Image
                    src={currentTeamConfig?.logo as string}
                    alt={`${currentTeamConfig?.name} Logo`}
                    width={90}
                    height={90}
                    className="relative"
                    priority
                  />
                </div>
              </Link>
            </div>

            <nav className="hidden md:flex items-center z-10 flex-1 justify-center ml-16">
              <div className="flex space-x-1">
                {menuItems.map((item) => (
                  <div
                    key={item.name}
                    className="relative"
                    id={
                      item.name === "FAN CENTRAL" 
                        ? "fan-central-dropdown" 
                        : item.name === "TEAM" 
                        ? "team-dropdown" 
                        : undefined
                    }
                  >
                    {item.hasDropdown ? (
                      <Button
                        variant="ghost"
                        className="text-sm font-bold text-white hover:bg-white/10 hover:text-white transition-colors duration-300 flex items-center gap-1"
                        onClick={() => {
                          if (item.name === "FAN CENTRAL") {
                            setIsFanCentralOpen(!isFanCentralOpen)
                            setIsTeamDropdownOpen(false)
                          } else if (item.name === "TEAM") {
                            setIsTeamDropdownOpen(!isTeamDropdownOpen)
                            setIsFanCentralOpen(false)
                          }
                        }}
                      >
                        {item.name}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${
                            (item.name === "FAN CENTRAL" && isFanCentralOpen) ||
                            (item.name === "TEAM" && isTeamDropdownOpen)
                              ? 'rotate-180'
                              : ''
                          }`}
                        />
                      </Button>
                    ) : (
                      <Link href={item.url}>
                        <Button
                          variant="ghost"
                          className="text-sm font-bold text-white hover:bg-white/10 hover:text-white transition-colors duration-300"
                        >
                          {item.name}
                        </Button>
                      </Link>
                    )}

                    <AnimatePresence>
                      {item.name === "FAN CENTRAL" && item.hasDropdown && isFanCentralOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2">
                          <FanCentralDropdown />
                        </div>
                      )}
                      {item.name === "TEAM" && item.hasDropdown && isTeamDropdownOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2">
                          <TeamDropdown 
                            handleNavigate={handleNavigate} 
                            setActiveTeamMenuItem={setActiveTeamMenuItem} 
                          />
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </nav>

            <div className="hidden md:flex items-center justify-end space-x-4 z-10 ml-24">
              {socialIcons.map(({ Icon, url, label }) => (
                <Link href={url as string} key={label} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10 transition-colors duration-300"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" />
                  </Button>
                </Link>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/10 hover:text-white transition-colors duration-300 z-10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          <div
            className="absolute top-0 right-0 bottom-0 w-2/4 bg-accent transform skew-x-[-15deg] origin-top-right"
            style={{ right: '-25%' }}
          />
        </div>

        <MobileMenu isMenuOpen={isMenuOpen} />
        <MLRTeamsBar />
      </motion.header>
      
      {/* Add spacing to account for fixed header */}
  
      
      {/* New MLR Teams Bar */}
     
    </>
  )
}
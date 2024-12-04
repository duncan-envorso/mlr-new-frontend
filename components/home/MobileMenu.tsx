import { Button } from "@/components/ui/button";
import { fanCentralMenu, menuIcons, menuItems, socialIcons, teams } from '@/lib/data';
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function MobileMenu({ isMenuOpen }: { isMenuOpen: boolean }) {
  const [expandedMobileMenus, setExpandedMobileMenus] = useState<string[]>([])

  const toggleMobileSubmenu = (menuName: string) => {
    setExpandedMobileMenus(prev =>
      prev.includes(menuName)
        ? prev.filter(item => item !== menuName)
        : [...prev, menuName]
    )
  }

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#1C2841] md:hidden overflow-y-auto max-h-[calc(100vh-4rem)]"
        >
          <nav className="container mx-auto flex flex-col px-4 py-2">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.hasDropdown ? (
                  <div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-white hover:bg-white/10 hover:text-white transition-colors duration-300 flex items-center gap-1"
                      onClick={() => toggleMobileSubmenu(item.name)}
                    >
                      {item.name}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${expandedMobileMenus.includes(item.name) ? 'rotate-180' : ''}`}
                      />
                    </Button>
                    <AnimatePresence>
                      {expandedMobileMenus.includes(item.name) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 space-y-2 mt-2"
                        >
                          {fanCentralMenu.map((menuItem) => {
                            const Icon = menuIcons[menuItem.name as keyof typeof menuIcons];
                            return (
                              <Link key={menuItem.name} href={menuItem.url}>
                                <Button
                                  variant="ghost"
                                  className="w-full justify-start text-white hover:bg-white/10 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2"
                                >
                                  {Icon && <Icon className="h-4 w-4" />}
                                  {menuItem.name}
                                </Button>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link href={item.url}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-white hover:bg-white/10 hover:text-white transition-colors duration-300"
                    >
                      {item.name}
                    </Button>
                  </Link>
                )}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (menuItems.length + 1) * 0.1 }}
              className="flex justify-center space-x-4 mt-4"
            >
              {socialIcons.map(({ Icon, url, label }) => (
                <Link
                  href={url as string}
                  key={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors"
                >
                  <Icon className="h-5 w-5" aria-label={label} />
                </Link>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (menuItems.length + 2) * 0.1 }}
              className="mt-4 pt-4 border-t border-white/10"
            >
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-white/10 hover:text-white transition-colors duration-300 flex items-center gap-1"
                onClick={() => toggleMobileSubmenu('MLR Teams')}
              >
                MLR Teams
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${expandedMobileMenus.includes('MLR Teams') ? 'rotate-180' : ''}`}
                />
              </Button>
              <AnimatePresence>
                {expandedMobileMenus.includes('MLR Teams') && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-1 mt-2"
                  >
                    {teams.map((team) => (
                      <a
                        key={team.name}
                        href={team.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                      >
                        <Image
                          src={team.logo}
                          alt={`${team.name} logo`}
                          width={24}
                          height={24}
                          className="mr-3"
                        />
                        <span className="text-sm">{team.name}</span>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
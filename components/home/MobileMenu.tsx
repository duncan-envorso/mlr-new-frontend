import { Button } from "@/components/ui/button";
import { fanCentralMenu, menuItems, socialIcons, teamMenu, ticketsMenu } from '@/lib/data';
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from 'next/link';
import { useState } from 'react';
import { SocialIcon } from "react-social-icons";

export default function MobileMenu({
  isMenuOpen,
  setIsMenuOpen
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}) {
  const [expandedMobileMenus, setExpandedMobileMenus] = useState<string[]>([]);
  const [activeMenuItem, setActiveMenuItem] = useState(0);

  const toggleMobileSubmenu = (menuName: string) => {
    setExpandedMobileMenus(prev =>
      prev.includes(menuName)
        ? prev.filter(item => item !== menuName)
        : [...prev, menuName]
    );
  };

  const handleNavigate = () => {
    setIsMenuOpen(false);
    setExpandedMobileMenus([]);
  };

  const renderSubmenuContent = (itemName: string) => {
    switch (itemName) {
      case 'BUY TICKETS':
        return (
          <div className="space-y-1">
            {ticketsMenu.map((menuItem) => (
              <Link
                key={menuItem.name}
                href={menuItem.url}
                className="block p-3 hover:bg-white/10 rounded-lg transition-colors"
                onClick={handleNavigate}
              >
                <div>
                  <h3 className="font-bold text-white">
                    {menuItem.name}
                  </h3>
                  <p className="text-sm text-white/70 mt-1">
                    {menuItem.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        );
      case 'FAN CENTRAL':
        return (
          <div className="space-y-1">
            {fanCentralMenu.map((menuItem) => {
              const Icon = menuItem.icon;
              return (
                <Link
                  key={menuItem.name}
                  href={menuItem.url}
                  className="block p-3 hover:bg-white/10 rounded-lg transition-colors"
                  onClick={handleNavigate}
                >
                  <div className="flex items-center gap-3">
                    {Icon && <Icon className="h-4 w-4 text-white" />}
                    <div>
                      <h3 className="font-bold text-white">
                        {menuItem.name}
                      </h3>
                      <p className="text-sm text-white/70 mt-1">
                        {menuItem.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        );
      case 'TEAM':
        return (
          <div className="space-y-1">
            {teamMenu.map((menuItem) => {
              const Icon = menuItem.icon;
              return (
                <Link
                  key={menuItem.name}
                  href={menuItem.url}
                  className="block p-3 hover:bg-white/10 rounded-lg transition-colors"
                  onClick={handleNavigate}
                >
                  <div className="flex items-center gap-3">
                    {Icon && <Icon className="h-4 w-4 text-white" />}
                    <div>
                      <h3 className="font-bold text-white">
                        {menuItem.name}
                      </h3>
                      <p className="text-sm text-white/70 mt-1">
                        {menuItem.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        );
      default:
        return null;
    }
  };

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
          <nav className="container mx-auto flex flex-col px-4 py-4 space-y-2">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.hasDropdown ? (
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-white hover:bg-white/10 hover:text-white transition-colors duration-300 flex items-center"
                      onClick={() => toggleMobileSubmenu(item.name)}
                    >
                      {item.name}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${expandedMobileMenus.includes(item.name) ? 'rotate-180' : ''
                          }`}
                      />
                    </Button>
                    <AnimatePresence>
                      {expandedMobileMenus.includes(item.name) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-4"
                        >
                          {renderSubmenuContent(item.name)}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link href={item.url} onClick={handleNavigate}>
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
              transition={{ delay: menuItems.length * 0.1 }}
              className="flex justify-center space-x-4 py-4 border-t border-white/10"
            >
              {socialIcons.map((social) => (
                <SocialIcon
                  key={social.label}
                  url={social.url || "#"}
                  network={social.network}
                  style={{ height: 35, width: 35 }}
                  className="hover:scale-110 transition-transform"
                  target="_blank"
                  rel="noopener noreferrer"
                  bgColor="transparent"
                  fgColor="white"
                />
              ))}
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
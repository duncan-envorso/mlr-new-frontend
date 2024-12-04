'use client'

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from '@/lib/shopify/types'
import { cn } from "@/lib/utils"
import { ChevronRight, Menu as MenuIcon } from "lucide-react"
import Link from 'next/link'
import { useState } from "react"

interface NavigationMenuDemoProps {
  menus: Menu[]
}

export default function NavigationMenuDemo({ menus = [] }: NavigationMenuDemoProps) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  // Desktop Navigation
  const DesktopNav = () => (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        {menus.map((menu) => (
          <NavigationMenuItem key={menu.path}>
            {menu.items && menu.items.length > 0 ? (
              <>
                <NavigationMenuTrigger className="h-9 px-4 hover:bg-accent">
                  {menu.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white">
                  <div className="grid w-[500px] gap-3 p-6 md:w-[600px] md:grid-cols-2">
                    {menu.items.map((item) => (
                      <div key={item.path} className="space-y-3">
                        {item.items && item.items.length > 0 ? (
                          <>
                            <h4 className="font-medium leading-none">{item.title}</h4>
                            <ul className="space-y-2">
                              {item.items.map((subItem) => (
                                <li key={subItem.path}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={subItem.path}
                                      className={cn(
                                        "block select-none rounded-md px-3 py-2 text-sm leading-none no-underline outline-none transition-colors",
                                        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                      )}
                                    >
                                      {subItem.title}
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : (
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.path}
                              className={cn(
                                "block select-none rounded-md px-3 py-2 text-sm font-medium leading-none no-underline outline-none transition-colors",
                                "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              )}
                            >
                              {item.title}
                            </Link>
                          </NavigationMenuLink>
                        )}
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </>
            ) : (
              <Link href={menu.path} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {menu.title}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )

  // Mobile Navigation
  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <MenuIcon className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] bg-white sm:w-[400px] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="space-y-4">
          {menus.map((menu) => (
            <div key={menu.path}>
              {menu.items && menu.items.length > 0 ? (
                <div className="space-y-3">
                  <Button
                    variant="ghost"
                    className="w-full justify-between"
                    onClick={() => setOpenSubmenu(openSubmenu === menu.path ? null : menu.path)}
                  >
                    {menu.title}
                    <ChevronRight 
                      className={cn(
                        "h-4 w-4 transition-transform",
                        openSubmenu === menu.path && "rotate-90"
                      )} 
                    />
                  </Button>
                  {openSubmenu === menu.path && (
                    <div className="ml-4 space-y-4">
                      {menu.items.map((item) => (
                        <div key={item.path} className="space-y-3">
                          {item.items && item.items.length > 0 ? (
                            <>
                              <h4 className="font-medium text-sm px-4">{item.title}</h4>
                              <div className="space-y-2">
                                {item.items.map((subItem) => (
                                  <Link
                                    key={subItem.path}
                                    href={subItem.path}
                                    className="block px-4 py-2 text-sm text-muted-foreground hover:bg-accent rounded-md"
                                  >
                                    {subItem.title}
                                  </Link>
                                ))}
                              </div>
                            </>
                          ) : (
                            <Link
                              href={item.path}
                              className="block px-4 py-2 text-sm hover:bg-accent rounded-md"
                            >
                              {item.title}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={menu.path}
                  className="block px-4 py-2 text-sm hover:bg-accent rounded-md"
                >
                  {menu.title}
                </Link>
              )}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )

  return (
    <div className="flex items-center justify-between">
      <MobileNav />
      <DesktopNav />
    </div>
  )
}
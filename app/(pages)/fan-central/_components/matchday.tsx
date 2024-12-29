'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Ban, Bus, Car, Coffee, Info, Key, MapPin } from 'lucide-react'
import Image from 'next/image'

export default function MatchDayComponent() {
  const tabTriggerStyles = "flex items-center justify-center p-3 w-full data-[state=active]:bg-secondary data-[state=active]:text-primary-foreground"

  const IconWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-full bg-muted p-2 mb-3">
      {children}
    </div>
  )

  return (
    <div className="min-h-screen ">
      <div className="">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Starfire Sports Stadium</h1>
          <p className="text-lg text-muted-foreground">Home of Seattle Seawolves Rugby</p>
        </div>

        {/* Stadium Map Section */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MapPin className="h-6 w-6" />
              Stadium Seat Map
            </h2>
          </CardHeader>
          <CardContent>
            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
              <Image 
                src="/images/stadiumLayout.png"
                alt="Starfire Stadium Seating Layout"
                fill
                className="object-contain"
                priority
              />
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
            <TabsTrigger value="general" className={tabTriggerStyles}>
              <Info className="h-4 w-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="transportation" className={tabTriggerStyles}>
              <Car className="h-4 w-4 mr-2" />
              Transport
            </TabsTrigger>
            <TabsTrigger value="facilities" className={tabTriggerStyles}>
              <Coffee className="h-4 w-4 mr-2" />
              Facilities
            </TabsTrigger>
            <TabsTrigger value="policies" className={tabTriggerStyles}>
              <Key className="h-4 w-4 mr-2" />
              Policies
            </TabsTrigger>
          </TabsList>

          <div className="space-y-4">
            <TabsContent value="general">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <IconWrapper>
                        <Info className="h-6 w-6 text-primary" />
                      </IconWrapper>
                      <h3 className="text-xl font-semibold">Location</h3>
                      <p className="text-muted-foreground">14800 Starfire Way, Tukwila, WA 98188</p>
                      <a href="https://www.google.com/maps" className="inline-flex items-center text-primary hover:underline">
                        View on Map →
                      </a>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Contact</h3>
                        <div className="space-y-2">
                          <p className="text-muted-foreground">Phone: (206) 431 3232</p>
                          <p className="text-muted-foreground">Email: info@starfiresports.com</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Gate Information</h3>
                        <p className="text-muted-foreground">Gates open 90 minutes before kickoff</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transportation">
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-4">
                      <IconWrapper>
                        <Car className="h-6 w-6 text-primary" />
                      </IconWrapper>
                      <h3 className="text-xl font-semibold">Parking</h3>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="font-medium">Daily Pass: $6 (Card only)</p>
                        <p className="text-muted-foreground mt-2">Tailgating is not allowed</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <IconWrapper>
                        <Bus className="h-6 w-6 text-primary" />
                      </IconWrapper>
                      <h3 className="text-xl font-semibold">Public Transportation</h3>
                      <p className="text-muted-foreground">Metro Route 150 stops at Fort Dent Way and Interurban Ave. S</p>
                      <a href="#" className="inline-flex items-center text-primary hover:underline">
                        Plan your trip →
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="facilities">
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-4">
                      <IconWrapper>
                        <Coffee className="h-6 w-6 text-primary" />
                      </IconWrapper>
                      <h3 className="text-xl font-semibold">Seating</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          Chair-back seating in sections 103, 104, 105
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          North side covered (except sections 101 and 107)
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          South stands uncovered
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Restrooms</h3>
                      <p className="text-muted-foreground">Located at:</p>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          Northwest side (next to section 101)
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          Southwest side (next to section 207)
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="policies">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <IconWrapper>
                        <Ban className="h-6 w-6 text-destructive" />
                      </IconWrapper>
                      <h3 className="text-xl font-semibold">Prohibited Items</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          'Animals (Service animals ok)',
                          'Glass Bottles & Cans',
                          'Weapons',
                          'Drugs/Illegal Substances',
                          'Fireworks/Flares',
                          'Laser Pointers'
                        ].map((item) => (
                          <div key={item} className="flex items-center gap-2 text-muted-foreground">
                            <Ban className="h-4 w-4 text-destructive flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Alcohol Policy</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        {[
                          'Beer sales terminate at 55th game clock minute',
                          'Valid ID required for all alcohol purchases',
                          'No outside alcohol permitted'
                        ].map((policy) => (
                          <li key={policy} className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {policy}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        {/* FAQ Section */}
        <Card className="mt-8">
          <CardHeader>
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Do kids need tickets?</h3>
                <p className="text-muted-foreground">Children 2 and under do not need tickets. Ages 3 and older require tickets.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is there storage for bags?</h3>
                <p className="text-muted-foreground">No storage facilities are available in the stadium or complex.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
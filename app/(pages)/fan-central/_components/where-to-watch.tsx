'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TeamConfig } from '@/lib/types';
import { Calendar, Clock, ExternalLink, MapPin, Tv } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';


interface ViewingPartner {
    name: string;
    logo: string;
    description: string;
    address?: string;
    website: string;
    viewingDates: Array<{
        match: string;
        time: string;
        date: string;
    }>;
}

interface BroadcastMatch {
    date: string;
    opponent: string;
    time: string;
    channels: string[];
    isHome: boolean;
}

interface ViewingPartner {
    name: string;
    logo: string;
    description: string;
    address?: string;
    website: string;
    viewingDates: Array<{
        match: string;
        time: string;
        date: string;
    }>;
}

const PartnerCard = ({ partner }: { partner: ViewingPartner }) => (
    <Card className="overflow-hidden h-full flex flex-col">
        <CardHeader className="p-6">
            <div className="w-full h-40 relative mb-4">
                <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                />
            </div>
            <CardTitle className="flex items-center justify-between">
                <span>{partner.name}</span>
                {partner.website && (
                    <Link
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:text-primary/80"
                    >
                        <ExternalLink className="h-4 w-4" />
                    </Link>
                )}
            </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0 flex-grow flex flex-col">
            <p className="text-gray-600 mb-4 line-clamp-4">{partner.description}</p>
            {partner.address && (
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span>{partner.address}</span>
                </div>
            )}
            <div className="mt-auto pt-4 border-t">
                <h4 className="font-semibold mb-2">Viewing Party Dates:</h4>
                {partner.viewingDates.map((date, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Calendar className="h-4 w-4 flex-shrink-0" />
                        <span>{date.date} - {date.match} at {date.time}</span>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);

const BroadcastScheduleCard = ({ match }: { match: BroadcastMatch }) => (
    <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="font-medium">{match.date}</span>
                </div>
                <Badge variant={match.isHome ? "default" : "secondary"}>
                    {match.isHome ? 'Home' : 'Away'}
                </Badge>
            </div>
            <div className="mt-3">
                <h4 className="font-semibold">{match.opponent}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <Clock className="h-4 w-4" />
                    <span>{match.time}</span>
                </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
                {match.channels.map((channel, index) => (
                    <Badge key={index} variant="outline" className="whitespace-nowrap">
                        {channel}
                    </Badge>
                ))}
            </div>
        </CardContent>
    </Card>
);

export default function WhereToWatchView({ teamConfig }: { teamConfig: TeamConfig }) {
    const { colors } = teamConfig;
    const broadcasts = [
        {
            date: "3/2",
            opponent: "vs. San Diego Legion",
            time: "7 PM PT",
            channels: ["FOX 13+", "The Rugby Network"],
            isHome: true
        },
        {
            date: "3/9",
            opponent: "vs. Miami Sharks",
            time: "7 PM PT",
            channels: ["The Rugby Network"],
            isHome: true
        },
        {
            date: "3/16",
            opponent: "@ Utah Warriors",
            time: "6 PM PT",
            channels: ["FOX 13+", "The Rugby Network"],
            isHome: false
        },
        {
            date: "3/22",
            opponent: "vs. Houston SaberCats",
            time: "7:30 PM PT",
            channels: ["FS2"],
            isHome: true
        },
        {
            date: "3/30",
            opponent: "@ Chicago Hounds",
            time: "3 PM PT",
            channels: ["ROOT SPORTS", "ROOT SPORTS Plus", "The Rugby Network"],
            isHome: false
        },
        {
            date: "4/5",
            opponent: "vs. Dallas Jackals",
            time: "7:30 PM PT",
            channels: ["FS2"],
            isHome: true
        },
        {
            date: "4/14",
            opponent: "@ Rugby Football Club Los Angeles",
            time: "3 PM PT",
            channels: ["FS2"],
            isHome: false
        },
        {
            date: "4/20",
            opponent: "@ New England Free Jacks",
            time: "11 AM PT",
            channels: ["FOX 13+", "The Rugby Network"],
            isHome: false
        },
        {
            date: "5/3",
            opponent: "vs. Anthem Rugby Carolina",
            time: "7:30 PM PT",
            channels: ["FOX 13+", "The Rugby Network"],
            isHome: true
        },
        {
            date: "5/11",
            opponent: "@ NOLA Gold",
            time: "Noon PT",
            channels: ["ROOT SPORTS", "ROOT SPORTS Plus", "The Rugby Network"],
            isHome: false
        },
        {
            date: "5/19",
            opponent: "@ Dallas Jackals",
            time: "4 PM PT",
            channels: ["ROOT SPORTS", "ROOT SPORTS Plus", "The Rugby Network"],
            isHome: false
        },
        {
            date: "5/24",
            opponent: "vs. Old Glory DC",
            time: "7:30 PM PT",
            channels: ["FOX 13+", "The Rugby Network"],
            isHome: true
        },
        {
            date: "6/9",
            opponent: "vs. Utah Warriors",
            time: "7 PM PT",
            channels: ["FOX 13+", "The Rugby Network"],
            isHome: true
        },
        {
            date: "6/15",
            opponent: "@ Houston SaberCats",
            time: "5 PM PT",
            channels: ["ROOT SPORTS", "ROOT SPORTS Plus", "The Rugby Network"],
            isHome: false
        },
        {
            date: "6/22",
            opponent: "vs. Rugby Football Club Los Angeles",
            time: "7 PM PT",
            channels: ["FOX 13+", "The Rugby Network"],
            isHome: true
        },
        {
            date: "6/29",
            opponent: "@ San Diego Legion",
            time: "7 PM PT",
            channels: ["FS2"],
            isHome: false
        }
    ];

    const partners: ViewingPartner[] = [
        {
            name: "Wing Dome Kirkland",
            logo: "/wp-content/uploads/sites/14/2021/12/WingDome_Tagline_PMS7620C.png",
            description: "Seattle's Fire Since 1994 – Wings are our passion. Heat is our specialty. And it has been since 1994. That was the year we fired up our fryers for the first time, sparking a love affair with hot wings that endures to this day. You may know us by our iconic sign that's been lit since the Kingdome ruled SoDo. Or maybe it's our infamous 7-Alarm Challenge. But we're so much more than a place to test your heat tolerance. We serve our neighborhoods with an enthusiasm for local flavor — the food, the teams and the people. Wing Dome is proud to support the Seattle Seawolves, feeding the players after every home game!",
            address: "13500 Interurban Ave S, Tukwila, WA 98168",
            website: "https://thewingdome.com/events-promotions/",
            viewingDates: [
                { match: "vs Dallas Jackals", time: "3:30pm PT", date: "5/19" },
                { match: "vs Houston SaberCats", time: "4:30pm PT", date: "6/15" }
            ]
        },
        {
            name: "Billy Baroo's Smokehouse",
            logo: "/wp-content/uploads/sites/14/2022/02/Seawolves_Opponent-Partners-MLR_Logos_BillySmokehouse-Combined.png",
            description: "Billy Baroo's Smokehouse is a locally owned small business operating since 2009. Located just 1 mile north of Starfire Sports at Foster Golf Links Tukwila. We offer a Full-service restaurant, bar, and private banquet facilities. Specializing in BBQ and in-house smoked meats. Ample free parking and easy access from I-5 and I-405. We serve breakfast on the weekends and Happy Hour Tuesday through Sunday (4pm-Close). Great location and golf course views. Large patio dining during the summer. 8 large T.V. screens for watching your favorite team and sports channels. We are proud to be a local sponsor for the Seattle Seawolves.",
            website: "https://billybaroos.com/",
            viewingDates: [
                { match: "vs RFC Los Angeles", time: "2:30pm PT", date: "4/14" },
                { match: "vs San Diego Legion", time: "6:30pm PT", date: "6/29" }
            ]
        },
        {
            name: "Great State Burger",
            logo: "https://seawolves.rugby/wp-content/uploads/sites/14/2024/04/MAFkhqWRz20-1685571301476.png",
            description: "It's all good. No, wait, it's all GREAT! For conscientious meat-eaters, Great State Burger is the only fun fast-casual burger joint that combines the highest quality ingredients with a classic menu because we're dedicated to sourcing from the best in-state providers, putting few but fantastic items on the menu while providing an inviting light-hearted atmosphere. NO GIMMICKS, JUST GREAT BURGERS.",
            website: "https://www.greatstateburger.com/", // Add website here
            viewingDates: [
                { match: "vs NOLA GOLD", time: "11:30am PT", date: "5/11" }
            ]
        },
        {
            name: "Trenchers Kitchen and Tap",
            logo: "https://seawolves.rugby/wp-content/uploads/sites/14/2024/04/278180406_376185387851325_5437784544670841680_n.jpg",
            description: "Trenchers Kitchen and Tap is a local, owned and operated bar and eatery, featuring 50 cold beers on rotating taps plus a wide selection of bottles and cans, and the best pub food in town. We use the finest quality ingredients including grass-fed beef, non-GMO and no additives, sustainable seafood, Macrina Bakery brioche and breads delivered fresh daily, and housemade gluten free flatbread, burgers, pickled vegetables, sauces and dressings. We also offer field roast, gluten-free, vegan and vegetarian options.",
            website: "https://www.trencherskitchenandtap.com/", // Add website here
            viewingDates: [
                { match: "vs New England Free Jacks", time: "10:30am PT", date: "4/20" }
            ]
        }
        // Add other partners similarly
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-slate-200">
            {/* Hero Section */}
            <div
                className="relative h-[40vh] min-h-[400px] bg-cover bg-center"
                style={{ backgroundImage: "url('/api/placeholder/1920/1080')" }}
            >
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 container mx-auto h-full flex flex-col justify-center px-4">
                    <Badge variant="secondary" className="w-fit mb-4">Watch</Badge>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Where to Watch
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl">
                        Find the best places to catch all the Seawolves action
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <Tabs defaultValue="partners" className="space-y-8">
                    <TabsList className="w-full justify-start">
                        <TabsTrigger value="partners" className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Viewing Locations
                        </TabsTrigger>
                        <TabsTrigger value="broadcast" className="flex items-center gap-2">
                            <Tv className="h-4 w-4" />
                            Broadcast Schedule
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="partners">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {partners.map((partner, index) => (
                                <PartnerCard key={index} partner={partner} />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="broadcast">
                        <Card className="p-6">
                            <CardTitle className="mb-6">2024 Broadcast Schedule</CardTitle>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {broadcasts.map((match, index) => (
                                    <BroadcastScheduleCard key={index} match={match} />
                                ))}
                            </div>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Contact Section */}
                <Card className="mt-8 p-6">
                    <div className="text-center">
                        <h3 className="text-xl font-bold mb-2">Want to become a viewing partner?</h3>
                        <p className="text-gray-600 mb-4">
                            If your business would like to be added to this page, please email us.
                        </p>
                        <Link
                            href="mailto:info@seawolves.rugby"
                            className="text-primary hover:text-primary/80 flex items-center justify-center gap-2"
                        >
                            info@seawolves.rugby
                            <ExternalLink className="h-4 w-4" />
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
}
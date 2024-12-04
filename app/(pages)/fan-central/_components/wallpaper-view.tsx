'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeamConfig } from "@/lib/types";
import { Download, Monitor, Phone, Smartphone, Tablet, Watch } from "lucide-react";
import Image from "next/image";

interface WallpaperProps {
  src: string;
  alt: string;
  downloadUrl: string;
}

const WallpaperCard = ({ src, alt, downloadUrl }: WallpaperProps) => (
  <Card className="overflow-hidden group">
    <div className="relative aspect-[9/16] md:aspect-square">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <a href={downloadUrl} download>
          <Button variant="secondary" size="lg" className="gap-2">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </a>
      </div>
    </div>
  </Card>
);

const wallpapers = {
    iphone: [
      {
        src: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_iPhone-Logo-Blue.jpg",
        alt: "Blue Logo iPhone Wallpaper",
        downloadUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_iPhone-Logo-Blue.jpg",
        title: "Logo Blue"
      },
      {
        src: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_iPhone-Logo-White.jpg",
        alt: "White Logo iPhone Wallpaper",
        downloadUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_iPhone-Logo-White.jpg",
        title: "Logo White"
      },
      {
        src: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_iPhone-Player.jpg",
        alt: "Player iPhone Wallpaper",
        downloadUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_iPhone-Player.jpg",
        title: "Player"
      },
      {
        src: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_iPhone-Seawolves.jpg",
        alt: "Seawolves iPhone Wallpaper",
        downloadUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_iPhone-Seawolves.jpg",
        title: "Seawolves"
      },
      {
        src: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_iPhone-TogetherWeHunt.jpg",
        alt: "Together We Hunt iPhone Wallpaper",
        downloadUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_iPhone-TogetherWeHunt.jpg",
        title: "Together We Hunt"
      }
    ],
    android: [
      {
        src: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Android-Logo-Blue.jpg",
        alt: "Blue Logo Android Wallpaper",
        downloadUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Android-Logo-Blue.jpg",
        title: "Logo Blue"
      },
      {
        src: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Android-Logo-White.jpg",
        alt: "White Logo Android Wallpaper",
        downloadUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Android-Logo-White.jpg",
        title: "Logo White"
      },
      {
        src: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Android-Player.jpg",
        alt: "Player Android Wallpaper",
        downloadUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Android-Player.jpg",
        title: "Player"
      },
      {
        src: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Android-Seawolves.jpg",
        alt: "Seawolves Android Wallpaper",
        downloadUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Android-Seawolves.jpg",
        title: "Seawolves"
      },
      {
        src: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Android-TogetherWeHunt.jpg",
        alt: "Together We Hunt Android Wallpaper",
        downloadUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Android-TogetherWeHunt.jpg",
        title: "Together We Hunt"
      }
    ],
    watch: [
      {
        src: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Watch-Logo-Blue1.jpg",
        alt: "Blue Logo Watch Wallpaper 1",
        downloadUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Watch-Logo-Blue1.jpg",
        title: "Logo Blue 1"
      },
      {
        src: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Watch-Logo-Blue2.jpg",
        alt: "Blue Logo Watch Wallpaper 2",
        downloadUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Watch-Logo-Blue2.jpg",
        title: "Logo Blue 2"
      },
      {
        src: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Watch-Logo-White1.jpg",
        alt: "White Logo Watch Wallpaper 1",
        downloadUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Watch-Logo-White1.jpg",
        title: "Logo White 1"
      },
      {
        src: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Watch-Logo-White2.jpg",
        alt: "White Logo Watch Wallpaper 2",
        downloadUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Watch-Logo-White2.jpg",
        title: "Logo White 2"
      },
      {
        src: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Watch-Seawolves.jpg",
        alt: "Seawolves Watch Wallpaper",
        downloadUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Watch-Seawolves.jpg",
        title: "Seawolves"
      }
    ],
    tablet: [
      {
        src: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Tablet-Logo-Blue.jpg",
        alt: "Blue Logo Tablet Wallpaper",
        downloadUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Tablet-Logo-Blue.jpg",
        title: "Logo Blue"
      },
      {
        src: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Tablet-Logo-White.jpg",
        alt: "White Logo Tablet Wallpaper",
        downloadUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Tablet-Logo-White.jpg",
        title: "Logo White"
      },
      {
        src: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Tablet-Player.jpg",
        alt: "Player Tablet Wallpaper",
        downloadUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Tablet-Player.jpg",
        title: "Player"
      },
      {
        src: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Tablet-Seawolves.jpg",
        alt: "Seawolves Tablet Wallpaper",
        downloadUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Tablet-Seawolves.jpg",
        title: "Seawolves"
      },
      {
        src: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Tablet-TogetherWeHunt.jpg",
        alt: "Together We Hunt Tablet Wallpaper",
        downloadUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Tablet-TogetherWeHunt.jpg",
        title: "Together We Hunt"
      }
    ],
    computer: [
      {
        src: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Computer-Logo-Blue.jpg",
        alt: "Blue Logo Computer Wallpaper",
        downloadUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Computer-Logo-Blue.jpg",
        title: "Logo Blue"
      },
      {
        src: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Computer-Logo-White.jpg",
        alt: "White Logo Computer Wallpaper",
        downloadUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Computer-Logo-White.jpg",
        title: "Logo White"
      },
      {
        src: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Computer-Player.jpg",
        alt: "Player Computer Wallpaper",
        downloadUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Computer-Player.jpg",
        title: "Player"
      },
      {
        src: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Computer-Seawolves.jpg",
        alt: "Seawolves Computer Wallpaper",
        downloadUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Computer-Seawolves.jpg",
        title: "Seawolves"
      },
      {
        src: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Computer-TogetherWeHunt.jpg",
        alt: "Together We Hunt Computer Wallpaper",
        downloadUrl: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/12/Seawolves_Wallpapers_Computer-TogetherWeHunt.jpg",
        title: "Together We Hunt"
      }
    ]
  }

  export default function WallpapersView({ teamConfig }: { teamConfig: TeamConfig }) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted">
        {/* Hero Section */}
        <div className="relative h-[40vh] min-h-[400px] bg-cover bg-center bg-[url('/images/banners/seawolves-background.jpg')]">
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 container mx-auto h-full flex flex-col justify-center px-4">
            <Badge variant="secondary" className="w-fit mb-4">Downloads</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
              Wallpapers
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl">
              Show your Seawolves pride with official wallpapers for all your devices
            </p>
          </div>
        </div>
  
        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="iphone" className="space-y-8">
            <TabsList className=" justify-start bg-white p-2 rounded-lg">
              <TabsTrigger 
                value="iphone" 
                className="gap-2 data-[state=active]:bg-primary/80 data-[state=active]:text-primary-foreground"
              >
                <Phone className="h-4 w-4" />
                iPhone
              </TabsTrigger>
              <TabsTrigger 
                value="android" 
                className="gap-2 data-[state=active]:bg-primary/80 data-[state=active]:text-primary-foreground"
              >
                <Smartphone className="h-4 w-4" />
                Android
              </TabsTrigger>
              <TabsTrigger 
                value="watch" 
                className="gap-2 data-[state=active]:bg-primary/80 data-[state=active]:text-primary-foreground"
              >
                <Watch className="h-4 w-4" />
                Smart Watch
              </TabsTrigger>
              <TabsTrigger 
                value="tablet" 
                className="gap-2 data-[state=active]:bg-primary/80 data-[state=active]:text-primary-foreground"
              >
                <Tablet className="h-4 w-4" />
                Tablet
              </TabsTrigger>
              <TabsTrigger 
                value="computer" 
                className="gap-2 data-[state=active]:bg-primary/80 data-[state=active]:text-primary-foreground"
              >
                <Monitor className="h-4 w-4" />
                Computer
              </TabsTrigger>
            </TabsList>
  
            {Object.entries(wallpapers).map(([device, items]) => (
              <TabsContent key={device} value={device}>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {items.map((wallpaper, index) => (
                    <WallpaperCard
                      key={index}
                      {...wallpaper}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    )
  }
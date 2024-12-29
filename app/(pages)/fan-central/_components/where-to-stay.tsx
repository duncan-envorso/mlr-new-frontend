'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TeamConfig } from '@/lib/types';
import { Building2, Hotel, MapPin, Plane } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface WhereToStayViewProps {
  teamConfig: TeamConfig;
}

const FeatureCard = ({ icon: Icon, title, description }: { 
  icon: any; 
  title: string; 
  description: string;
}) => (
  <Card className="bg-white/50 backdrop-blur-sm">
    <CardContent className="p-6">
      <Icon className="h-8 w-8 mb-4 text-primary" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

export default function WhereToStayView({ teamConfig }: WhereToStayViewProps) {
  const { colors } = teamConfig;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-slate-200">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[400px] rounded-b-[2rem] overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('https://seawolves.rugby/wp-content/uploads/sites/14/2023/11/explore-seattle-southside.png')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto h-full flex flex-col justify-center px-4">
          <Badge variant="secondary" className="w-fit mb-4">Accommodations</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Where to Stay
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Find the perfect place to stay for your Seawolves rugby weekend
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Featured Hotel Package */}
        <Card className="mb-12 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 p-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Hotel Packages for Rugby Fans
              </h2>
              <p className="text-gray-600 mb-6">
                Stay where the Seattle Seawolves play! Seattle Southside is proud to offer discounted hotel options located as close as it gets to the game and a wide range of fun things to do before and after the big win! Focus on the game and not the hassle by staying and playing where the Seawolves do. Our hotels even offer free shuttles to the Seattle Airport!
              </p>
              <Link 
                href="https://www.seattlesouthside.com/things-to-do/sports/seawolves/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  className="font-semibold"
                  style={{ backgroundColor: colors.secondary }}
                >
                  VIEW HOTEL DEALS
                </Button>
              </Link>
            </div>
            <div className="relative">
              <Image 
                src="https://seawolves.rugby/wp-content/uploads/sites/14/2023/11/explore-seattle-southside.png"
                alt="Seattle Southside Hotels"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <FeatureCard 
            icon={Hotel}
            title="Partner Hotels"
            description="Exclusive rates at our partner hotels near Starfire Stadium"
          />
          <FeatureCard 
            icon={MapPin}
            title="Prime Location"
            description="Stay minutes away from the stadium and local attractions"
          />
          <FeatureCard 
            icon={Plane}
            title="Airport Shuttle"
            description="Complimentary airport transfers from select hotels"
          />
          <FeatureCard 
            icon={Building2}
            title="Local Attractions"
            description="Easy access to Seattle's best entertainment and dining"
          />
        </div>

        {/* Map Section */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Explore the Area</h2>
          <div className="aspect-video rounded-lg overflow-hidden ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2696.0447436365088!2d-122.25155367361191!3d47.47006137917613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549042d17e6ca0c5%3A0x90a8bbbdb2e676a!2sStarfire%20Sports!5e0!3m2!1sen!2sus!4v1699144444086!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}


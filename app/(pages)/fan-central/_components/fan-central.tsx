'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TeamConfig } from '@/lib/types';
import { Calendar, ImageIcon, Info, MapPin, Share2, Ticket, Tv2 } from 'lucide-react';
import Link from 'next/link';

// Icon mapping object
const IconMap = {
  Calendar,
  ImageIcon,
  Info,
  MapPin,
  Share2,
  Ticket,
  Tv2,
} as const;

type IconType = keyof typeof IconMap;

// Helper function to check if a string is a valid icon name
function isValidIcon(icon: string): icon is IconType {
  return icon in IconMap;
}

interface FanResourceCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  bgImage: string;
}

const FanResourceCard: React.FC<FanResourceCardProps> = ({
  title, 
  description,
  icon,
  href,
  bgImage
}) => {
  // Default to Info icon if invalid icon name is provided
  const IconComponent = isValidIcon(icon) ? IconMap[icon] : IconMap.Info;
  
  return (
    <Link href={href}>
      <Card className="relative overflow-hidden group transition-all duration-300 hover:shadow-lg border-none h-64">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
        </div>
        
        <CardContent className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
          <div className="mb-4">
            <IconComponent className="h-8 w-8 mb-2" />
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-sm text-white/80">{description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

interface FanCentralViewProps {
  teamConfig: TeamConfig;
}

export default function FanCentralView({ teamConfig }: FanCentralViewProps) {
  const { fanCentral, socialMedia, colors } = teamConfig;
  const { hero, mainResources, quickLinks } = fanCentral;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-slate-200">
      {/* Hero Section */}
      <div 
        className="relative h-[40vh] min-h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url(${hero.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto h-full flex flex-col justify-center px-4">
          <Badge variant="secondary" className="w-fit mb-4">{hero.badge}</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {hero.title}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            {hero.description}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainResources.map((resource, index) => (
            <FanResourceCard
              key={index}
              {...resource}
            />
          ))}
          
          {/* Social Media Card */}
          <Card 
            className="bg-primary/90 text-white p-6 flex flex-col justify-between h-64"
            style={{ backgroundColor: `${colors.primary}E6` }}
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
              <p className="mb-6">Follow us on social media for the latest updates, behind-the-scenes content, and more.</p>
            </div>
            <div className="flex gap-4">
              <Link href={socialMedia.facebook} className="hover:text-white/80">
                <Share2 className="h-6 w-6" />
              </Link>
              <Link href={socialMedia.instagram} className="hover:text-white/80">
                <Share2 className="h-6 w-6" />
              </Link>
              <Link href={socialMedia.twitter} className="hover:text-white/80">
                <Share2 className="h-6 w-6" />
              </Link>
            </div>
          </Card>
        </div>

        {/* Quick Links Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">{quickLinks.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.links.map((link, index) => {
              const LinkIcon = isValidIcon(link.icon) ? IconMap[link.icon] : IconMap.Info;
              return (
                <Link key={index} href={link.href}>
                  <Card 
                    className={`${link.bgColor} hover:${link.hoverColor} transition-colors`}
                    style={{ 
                      backgroundColor: `${colors.primary}0D`,
                      ['--hover-bg' as any]: `${colors.primary}1A`
                    }}
                  >
                    <CardContent className="flex items-center gap-4 p-6">
                      <LinkIcon className="h-6 w-6" style={{ color: colors.primary }} />
                      <span className="font-semibold">{link.title}</span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Handshake, Mail, MapPin, Trophy, Users } from 'lucide-react';
import Link from 'next/link';

const AboutSection = ({ title, icon: Icon, children }: { 
  title: string;
  icon: any;
  children: React.ReactNode;
}) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <Icon className="h-6 w-6 text-primary" />
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
    </div>
    <div className="text-lg text-muted-foreground leading-relaxed">
      {children}
    </div>
  </div>
);

const AchievementCard = ({ year, title }: { year: string; title: string }) => (
  <Card className="bg-primary/5 border-none">
    <CardContent className="p-6 flex items-start gap-4">
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
        <Trophy className="h-6 w-6 text-primary" />
      </div>
      <div>
        <p className="font-semibold text-lg">{year}</p>
        <p className="text-muted-foreground">{title}</p>
      </div>
    </CardContent>
  </Card>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-slate-200">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Seattle Seawolves
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A founding member of Major League Rugby, making history with back-to-back championships
          </p>
          <div className="flex justify-center gap-2">
            <Badge variant="secondary" className="px-4 py-1">Est. 2018</Badge>
            <Badge variant="secondary" className="px-4 py-1">MLR Founding Member</Badge>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-16 max-w-4xl mx-auto">
          {/* About Section */}
          <AboutSection title="Our Story" icon={Users}>
            <p className="mb-4">
              The Seattle Seawolves organization strives to develop, cultivate, and expand the sport of rugby in the US while empowering family, tradition, respect, and a spirit of inclusion both on and off the pitch. The Seattle Seawolves aim to foster a winning culture by enabling its players, staff, and fans to meet their true potential while pursuing excellence in the Major League Rugby competition.
            </p>
            <p>
              Community outreach is a key pillar of the Seawolves philosophy, and the organization strives to continually help to enrich and give back to the greater Seattle and Pacific Northwest areas.
            </p>
          </AboutSection>

          {/* Achievements Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-8">
              <Trophy className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">Championship History</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <AchievementCard 
                year="2018"
                title="First-Ever MLR Championship vs Glendale Raptors"
              />
              <AchievementCard 
                year="2019"
                title="Back-to-Back MLR Championship vs San Diego Legion"
              />
              <AchievementCard 
                year="2022"
                title="MLR Western Conference Championship"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid gap-8 sm:grid-cols-2">
            <Link href="/staff" className="group">
              <Card className="bg-primary/5 border-none transition-colors hover:bg-primary/10">
                <CardContent className="p-6 flex items-center gap-4">
                  <Building2 className="h-6 w-6 text-primary" />
                  <span className="font-semibold">Coaching Staff & Front Office</span>
                </CardContent>
              </Card>
            </Link>
            <Link href="/partners" className="group">
              <Card className="bg-primary/5 border-none transition-colors hover:bg-primary/10">
                <CardContent className="p-6 flex items-center gap-4">
                  <Handshake className="h-6 w-6 text-primary" />
                  <span className="font-semibold">Our Partners</span>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Contact Section */}
          <div className="space-y-6 border-t pt-8">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Visit Us</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <p className="font-semibold">Official Team Store</p>
                  <p className="text-muted-foreground">
                    14900 Interurban Ave S, Ste 268<br />
                    Seattle, WA 98168
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <p className="font-semibold">Follow Us</p>
                  <p className="text-muted-foreground">
                    @Seawolvesrugby
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
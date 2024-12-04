'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, GraduationCap, Heart, Star, Target, Trophy, Users } from 'lucide-react';
import Link from 'next/link';

const PathwayCard = ({ 
  title, 
  level, 
  icon: Icon, 
  children,
  color = "primary"
}: { 
  title: string;
  level: string;
  icon: any;
  children: React.ReactNode;
  color?: string;
}) => (
  <Card className="relative overflow-hidden border-none bg-white/80 backdrop-blur-sm">
    <div className={`absolute top-0 left-0 w-1 h-full bg-${color}`} />
    <CardHeader>
      <Badge variant="secondary" className="w-fit mb-2">{level}</Badge>
      <CardTitle className="flex items-center gap-2">
        <Icon className={`h-5 w-5 text-${color}`} />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="text-muted-foreground">
      {children}
    </CardContent>
  </Card>
);

const PartnerCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Card className="bg-primary/5 border-none">
    <CardContent className="p-6">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground">{children}</p>
    </CardContent>
  </Card>
);

export default function PathwayPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-slate-200">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Seawolves Rugby Pathway
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Strengthening the rugby community, increasing regional participation, and supporting the game professionally at all levels.
          </p>
        </div>

        {/* Pathway Grid */}
        <div className="max-w-5xl mx-auto space-y-12">
          {/* High Performance Section */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              High Performance
            </h2>
            <div className="grid gap-6">
              <PathwayCard title="USA Eagles & Seattle Seawolves" level="Train to Win" icon={Star}>
                <div className="space-y-4">
                  <p>Our vision is to develop National team players and provide support to USA Rugby as they strive to become a tier one nation at World Rugby.</p>
                  <p>The pinnacle of our pathway is the honor to wear the Seattle Seawolves jersey and compete within Major League Rugby.</p>
                </div>
              </PathwayCard>
              
              <PathwayCard title="Developmental XV & Regional Competition" level="Train to Compete" icon={Target} color="emerald">
                <p>Advancing players through intensive training programs and competitive matches. Supporting Pacific Northwest Rugby Football Union (PNRFU) clubs and regional collegiate programs.</p>
              </PathwayCard>
            </div>
          </section>

          {/* Development Section */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              Development
            </h2>
            <div className="grid gap-6">
              <PathwayCard title="U16 & U18 Academy" level="Train to Train" icon={Users} color="blue">
                <p>The Seawolves U16 & U18 Representative Academy sides provide opportunities to establish professional principles and best practices for young athletes eager to progress and grow.</p>
                <Link href="/academy" className="inline-flex items-center text-primary hover:underline mt-4">
                  Learn More <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
              </PathwayCard>
            </div>
          </section>

          {/* Community Section */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              Community
            </h2>
            <div className="grid gap-6">
              <PathwayCard title="Youth & High School Rugby" level="Learn to Play & Practice" icon={Users} color="orange">
                <p>Partnership with Rugby Washington (Rugby WA) to help youth and high school athletes develop their athletic skills, as well as their personal and interpersonal skills.</p>
              </PathwayCard>
              
              <PathwayCard title="Introduction to Rugby" level="Fundamentals" icon={Users} color="yellow">
                <p>Partnerships with Boys & Girls Club and YMCA to introduce youth across Washington State to rugby through fun, skill development, and teamwork in a positive environment.</p>
              </PathwayCard>
            </div>
          </section>

          {/* Partners Section */}
          <section className="space-y-6 mt-12">
            <h2 className="text-3xl font-bold mb-6">Our Partners</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <PartnerCard title="Rugby Washington">
                Overseeing Youth and High School rugby in western Washington with 11 clubs and growing.
              </PartnerCard>
              <PartnerCard title="Pacific Northwest Rugby Football Union">
                Regional governing body for adult amateur rugby union in Washington, Oregon, and Idaho.
              </PartnerCard>
              <PartnerCard title="Boys & Girls Club">
                Introducing youth across Washington State to rugby through shared values of respect, teamwork, and integrity.
              </PartnerCard>
              <PartnerCard title="YMCA of Inland Northwest">
                Collaborating across community events to engage kids with rugby while emphasizing fun and skill development.
              </PartnerCard>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
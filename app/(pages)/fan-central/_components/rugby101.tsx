'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TeamConfig } from "@/lib/types";
import { Download } from "lucide-react";

interface PositionProps {
  number: string;
  title: string;
  description: string;
}

const Position = ({ number, title, description }: PositionProps) => (
  <div className="mb-6">
    <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
      <span className="text-primary">{number}</span>
      {title}
    </h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TermCard = ({ title, description }: { title: string; description: string }) => (
  <Card>
    <CardContent className="p-6">
      <h3 className="text-xl font-bold mb-2 text-primary">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

export default function Rugby101View({ teamConfig }: { teamConfig: TeamConfig }) {
  const { colors } = teamConfig;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative rounded h-[40vh] min-h-[400px] bg-cover bg-center bg-[url('/images/banners/Seawolves-Kids-01.png')]" role="img" aria-label="Rugby players on the field">

        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto h-full flex flex-col justify-center px-4">
          <Badge variant="secondary" className="w-fit mb-4">Learn</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Rugby 101
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Your guide to understanding the game of rugby
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">The Origins</h2>
          <p className="text-gray-600 text-lg mb-8">
            The game of rugby was founded in 1823 by William Webb Ellis at the School of Rugby in England. During a game of soccer, Ellis proceeded to pick up the ball and run with it. And thus rugby was born. The sport made its way to the shores of America, where over the course of time rule and regulation changes led to what we know as American Football today.
          </p>
        </div>

        {/* Video Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/qZp4KvIhBJk"
              title="Rugby 101"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Basic Rules */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6">Basic Rules</h2>
          <div className="space-y-4 text-gray-600">
            <p>A flow sport just like soccer, the game only stops when a penalty is committed or the ball/player in possession of the ball goes out of bounds. You can only pass the ball sideways or backward but can kick the ball forward at any point in open play.</p>
            <p>The object of the game is to carry the ball over the opponent's tryline and ground the ball to score. Once this happens, the original touchdown, five points are awarded to the team who scored a <strong>TRY</strong>. Wherever the ball was dotted down determines the line in which any player on the field can attempt to kick a <strong>CONVERSION</strong> through the uprights for two more points.</p>
            <p>The only other times where points can be earned are with a <strong>PENALTY KICK</strong> or a <strong>DROP GOAL</strong>. If a penalty kick or drop goal is converted, their team will rack up an additional three points.</p>
          </div>
        </div>

        {/* Key Terms */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <TermCard 
            title="The Field"
            description="Referred to as 'the pitch', rugby has one of the largest fields in the sporting world: 100 meters long by 70 meters wide."
          />
          <TermCard 
            title="The Team"
            description="There are 15 players on the field, and 23 rostered for game day. Positions are specific to the number on the jersey. There are two types of position: forwards (1-8) and backs (9-15)."
          />
        </div>

        {/* Positions */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Forward Pack</h2>
            <Position 
              number="#1/3"
              title="Props"
              description="There are two kinds of props: tighthead and loosehead. Their primary job is to anchor the scrum as part of the front row. Driving mauls, winning rucks, and lifting players in line outs also fall into their duties."
            />
            <Position 
              number="#2"
              title="Hooker"
              description="The hooker has two specific roles beyond being physical in open play, and that's to win possession in scrums by hooking the ball with their foot back towards their team and throwing in the ball during line outs."
            />
            <Position 
              number="#4/5"
              title="Locks"
              description="Typically the tallest players on the field, Locks use their size and strength to win restarts, steal the ball in line outs, and provide stability in the scrums."
            />
            <Position 
              number="#6/7"
              title="Flankers"
              description="The flankers' main role is to force turnovers in the tackle and at the breakdown, and maintain possession when ball is in hand. Their speed in decision making and contact is crucial."
            />
            <Position 
              number="#8"
              title="Number 8"
              description="The Number 8 looks to secure possession at the back of the scrum, carry the ball in open play, and is a strong defender. Look for this player to 'pick and go' from the back of the scrum."
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Backline</h2>
            <Position 
              number="#9"
              title="Scrumhalf"
              description="The scrumhalf acts as the link between the forwards and the backs in both set pieces and open play. Scrumhalves have a consistent pass paired with good decision making and communication skills."
            />
            <Position 
              number="#10"
              title="Flyhalf"
              description="The flyhalf works with the scrumhalf to make play calls and decisions on attack. A solid boot and game knowledge helps the flyhalf make strategic decisions for the team in phase play."
            />
            <Position 
              number="#11/14"
              title="Wings"
              description="The wings tend to be your fastest players, set to break the gainline and score tries when they receive the ball in space. Their defensive role is a tough one: requiring them to make open field, try-saving tackles."
            />
            <Position 
              number="#12/13"
              title="Centers"
              description="There are two types of centers: inside (12) and outside (13). Centers bring power, speed and flair on attack, looking to cut up the defense with strike lines. Defensively, they shut down the opposing backs."
            />
            <Position 
              number="#15"
              title="Fullback"
              description="Considered the last line of defense, the fullback works with the wings as the 'back three' to prevent tries with their textbook tackling, shepharding, communication skills and delivery of clearing kicks."
            />
          </div>
        </div>

        {/* Download Button */}
        <div className="text-center">
          <a 
            href="/wp-content/uploads/sites/14/2021/12/Rugby101-Seattle-Seawolves_V4.pdf" 
            download
            className="inline-flex"
          >
            <Button 
              className="gap-2"
              style={{ backgroundColor: colors.primary }}
            >
              <Download className="h-4 w-4" />
              Download Rugby 101 Guide
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
import { currentTeamConfig } from "@/config/teamConfig";
import { Briefcase, Building2, Calendar, Handshake, Home, Info, MapPin, Trophy, Tv2, Users, Wallpaper } from "lucide-react";


export const teams = [
  {
    name: "Houston Sabercats",
    logo: "https://seawolves.rugby/wp-content/uploads/2022/01/CatBlackStroke.png",
    url: "https://www.houstonsabercats.com/"
  },
  {
    name: "NOLA Gold",
    logo: "https://seawolves.rugby/wp-content/uploads/2018/11/nolagold-logo.svg",
    url: "https://www.nolagoldrugby.com/"
  },
  {
    name: "San Diego Legion",
    logo: "https://seawolves.rugby/wp-content/uploads/2018/11/logo-sandiegolegion-1.svg",
    url: "https://www.sdlegion.com/"
  },
  {
    name: "Seattle Seawolves",
    logo: "https://seawolves.rugby/wp-content/uploads/2018/11/SeattleSeawolves_OddDog-01.png",
    url: "https://seawolves.rugby/"
  },
  {
    name: "Utah Warriors",
    logo: "https://seawolves.rugby/wp-content/uploads/2018/11/icon-utahwarriors.svg",
    url: "https://www.warriorsrugby.com"
  },
  {
    name: "New England Free Jacks",
    logo: "https://seawolves.rugby/wp-content/uploads/2018/11/FJLantern_Blue_Red.png",
    url: "https://www.freejacks.com/"
  },
  {
    name: "Old Glory DC",
    logo: "https://seawolves.rugby/wp-content/uploads/2019/01/Old_Glory_DC_logo.png",
    url: "https://oldglorydc.com/"
  },
  {
    name: "Chicago Hounds",
    logo: "https://seawolves.rugby/wp-content/uploads/2022/11/Hounds-Logo.png",
    url: "https://www.chicagohounds.com/"
  },
  {
    name: "Miami Sharks",
    logo: "https://seawolves.rugby/wp-content/uploads/2023/05/MiamiSharks2.png",
    url: "https://www.miamisharks.com/"
  },
  {
    name: "Rugby FC LA",
    logo: "https://seawolves.rugby/wp-content/uploads/2023/12/RFC-LA-logo-1.png",
    url: "https://rugbyfcla.com/"
  },
  {
    name: "Anthem RC",
    logo: "https://seawolves.rugby/wp-content/uploads/2024/01/LETTERMARK-BLUE-2.png",
    url: "https://anthemrc.com/"
  }
];

export const fanCentralMenu = [
  {
    name: "MATCHDAY",
    url: "/fan-central/matchday",
    description: "Everything you need to know about gameday",
    image: currentTeamConfig?.fanCentral.mainResources[0]?.bgImage,
    icon: Calendar

  },
  {
    name: "WHERE TO STAY",
    url: "/fan-central/where-to-stay",
    description: "Find accommodations near the stadium",
    image: currentTeamConfig?.fanCentral.mainResources[1]?.bgImage,
    icon: Home
  },
  {
    name: "WHERE TO WATCH",
    url: "/fan-central/where-to-watch",
    description: "Watch parties and broadcast information",
    image: currentTeamConfig?.fanCentral.mainResources[2]?.bgImage,
    icon: Tv2

  },
  {
    name: "RUGBY 101",
    url: "/fan-central/rugby-101",
    description: "Learn the basics of rugby",
    image: currentTeamConfig?.fanCentral.mainResources[3]?.bgImage,
    icon: Info
  },
  {
    name: "WALLPAPERS",
    url: "/fan-central/wallpapers",
    description: "Download official team wallpapers",
    image: currentTeamConfig?.fanCentral.mainResources[4]?.bgImage,
    icon: Wallpaper
  }
];

export const teamMenu = [
  {
    name: "ROSTER",
    url: "/roster",
    description: "Meet our current squad of players",
    icon: Users
  },
  {
    name: "COACHING STAFF",
    url: "/roster",
    description: "Learn about our coaching team",
    icon: Trophy
  },
  {
    name: "RUGBY OPERATIONS",
    url: "/roster",
    description: "Behind the scenes of rugby operations",
    icon: Briefcase
  },
  {
    name: "FRONT OFFICE",
    url: "/roster",
    description: "Meet our administrative team",
    icon: Building2
  },
  {
    name: "OUR PARTNERS",
    url: "/partners",
    description: "View our valued team partners",
    icon: Handshake
  }
];

export const ticketsMenu = [
  {
    name: "2025 SEASON TICKETS",
    url: "/tickets/2025-season-tickets",
    description: "Full season ticket packages"
  },
  {
    name: "2025 HALF SEASON TICKETS",
    url: "/tickets/half-season-tickets",
    description: "Half season ticket packages"
  },
  {
    name: "GROUP TICKETS",
    url: "/tickets/group-tickets",
    description: "Group ticket options"
  },
  {
    name: "2025 SINGLE MATCH TICKETS",
    url: "https://www.axs.com/series/25516/seattle-seawolves-tickets?skin=seawolves",
    description: "Individual match tickets"
  },
  {
    name: "SEAWOLVES CLUB",
    url: "/tickets/seawolves-club/",
    description: "Premium seating and experiences"
  }
];


export const menuItems = [
  { 
    name: "BUY TICKETS", 
    url: "/tickets", 
    hasDropdown: true,
    dropdownItems: ticketsMenu
  },
  { name: "TEAM SHOP", url: "/shop" },
  { name: "SCHEDULE", url: "/schedule" },
  { name: "FAN CENTRAL", url: "/fan-central", hasDropdown: true },
  { name: "PATHWAY", url: "/pathway" },
  { name: "NEWS", url: "/news" },
  { name: "TEAM", url: "/roster", hasDropdown: true },
];



export const socialIcons = [
  {
    url: currentTeamConfig?.socialMedia.facebook,
    label: "Facebook",
    network: "facebook"
  },
  {
    url: currentTeamConfig?.socialMedia.instagram,
    label: "Instagram",
    network: "instagram"
  },
  {
    url: currentTeamConfig?.socialMedia.twitter,
    label: "Twitter",
    network: "x"
  },
  {
    url: currentTeamConfig?.socialMedia.youtube,
    label: "YouTube",
    network: "youtube"
  },
  {
    url: currentTeamConfig?.socialMedia.tiktok,
    label: "TikTok",
    network: "tiktok"
  }
];

export const menuIcons = {
  MATCHDAY: Calendar,
  'WHERE TO STAY': MapPin,
  'WHERE TO WATCH': Tv2,
  'RUGBY 101': Info,
  'WALLPAPERS': Wallpaper,
} as const;
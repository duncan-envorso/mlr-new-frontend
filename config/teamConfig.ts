// lib/team-config.ts
import { TeamConfig } from "@/lib/types";

export const teamConfigs: Record<string, TeamConfig> = {
  'seattle-seawolves': {
    name: 'Seattle Seawolves',
    socialMedia: {
      facebook: 'https://www.facebook.com/SeawolvesRugby/',
      instagram: 'https://www.instagram.com/seawolvesrugby/',
      twitter: 'https://twitter.com/SeawolvesRugby',
      youtube: 'https://www.instagram.com/seawolvesrugby/'
    
    },
    appStoreLinks: {
      ios: 'https://apps.apple.com/us/app/seattle-seawolves/id6448854375',
      android: 'https://play.google.com/store/apps/details?id=com.fnoex.fan.sonomaseawolves&hl=en_ZA'
    },
    colors: {
      primary: 'rgb(1, 43, 93)', // updated color
      secondary: 'hsl(0, 0%, 0%)',
      accent: 'hsl(108, 49%, 48%)',
      'primary-foreground': 'hsl(0, 0%, 100%)',
      'secondary-foreground': 'hsl(0, 0%, 100%)',
      'accent-foreground': 'hsl(0, 0%, 0%)',
    },
    fonts: {
      h1: ['IndustryTest-Black', 'sans-serif'],
      h2: ['IndustryTest-Bold', 'sans-serif'],
      h3: ['IndustryTest-Medium', 'sans-serif'],
      h4: ['IndustryTest-Book', 'sans-serif'],
      h5: ['IndustryTest-Demi', 'sans-serif'],
      h6: ['IndustryTest-Light', 'sans-serif'],
      body: ['IndustryTest-Thin', 'sans-serif'],
    },
    logo: '/images/seawolves-logo.png',
    shopBanner: '/images/seawolves-shop-banner.jpg',
    teamId: "034db172-942f-48b8-bc91-a0b3eb3a025f",
    footerBackgroundImage: 'https://seawolves.rugby/wp-content/uploads/sites/14/2021/09/Seawolves_WebsiteBackgrounds-01.jpeg',
   
    fanCentral: {
      hero: {
        backgroundImage: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/09/Matchday-Page-1024x576.jpeg",
        badge: "Fan Central",
        title: "Join The Pack",
        description: "Your one-stop destination for everything Seawolves - from matchday experiences to fan essentials."
      },
      mainResources: [
        {
          title: "Matchday Experience",
          description: "Everything you need to know for gameday at Starfire Stadium",
          icon: "Calendar",
          href: "fan-central/matchday",
          bgImage: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/10/Seawolves_2022_Website_SquareGraphics_MatchDay.jpg"
        },
        {
          title: "Where to Stay",
          description: "Find the perfect accommodations for your Seawolves rugby weekend",
          icon: "MapPin",
          href: "https://www.seattlesouthside.com/things-to-do/sports/seawolves/",
          bgImage: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/10/Seawolves_2022_Website_SquareGraphics_WhereToStay.jpg"
        },
        {
          title: "Where to Watch",
          description: "Find local venues showing Seawolves matches or watch online",
          icon: "Tv2",
          href: "/where-to-watch",
          bgImage: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/10/Seawolves_2022_Website_SquareGraphics_WhereToWatch.jpg"
        },
        {
          title: "Rugby 101",
          description: "New to rugby? Learn the basics of the game",
          icon: "Info",
          href: "/rugby-101",
          bgImage: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/10/Seawolves_2022_Website_SquareGraphics_Rugby101.jpg"
        },
        {
          title: "Wallpapers",
          description: "Download Seawolves wallpapers for your devices",
          icon: "ImageIcon",
          href: "/wallpapers",
          bgImage: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/11/Seawolves_2022_Website_SquareGraphics_Wallpapers.jpeg"
        }
      ],
      quickLinks: {
        title: "Quick Links",
        links: [
          {
            title: "Buy Tickets",
            href: "/tickets",
            icon: "Ticket",
            bgColor: "bg-primary/5",
            hoverColor: "bg-primary/10"
          },
          {
            title: "Match Schedule",
            href: "/schedule",
            icon: "Calendar",
            bgColor: "bg-primary/5",
            hoverColor: "bg-primary/10"
          },
          {
            title: "Team Store",
            href: "/shop",
            icon: "Share2",
            bgColor: "bg-primary/5",
            hoverColor: "bg-primary/10"
          }
        ]
      }

    },
 

  },
  'san-diego-legion': {
    name: 'San Diego Legion',
    socialMedia: {
      facebook: 'https://www.facebook.com/sandiegolegion',
      instagram: 'https://www.instagram.com/sandiegolegion',
      twitter: 'https://www.twitter.com/sandiegolegion',
    },
    appStoreLinks: {
      ios: 'https://apps.apple.com/us/app/chicago-hounds/id123456789',
      android: 'https://play.google.com/store/apps/details?id=com.chicagohounds.app'
    },
    colors: {
      primary: 'hsl(0, 100%, 25%)',
      secondary: 'hsl(0, 0%, 20%)',
      accent: 'hsl(45, 100%, 50%)',
      'primary-foreground': 'hsl(0, 0%, 90%)',
      'secondary-foreground': 'hsl(0, 0%, 95%)',
      'accent-foreground': 'hsl(0, 0%, 10%)',
    },
    fonts: {
      h1: ['IndustryTest-Black', 'sans-serif'],
      h2: ['IndustryTest-Bold', 'sans-serif'],
      h3: ['IndustryTest-Medium', 'sans-serif'],
      h4: ['IndustryTest-Book', 'sans-serif'],
      h5: ['IndustryTest-Demi', 'sans-serif'],
      h6: ['IndustryTest-Light', 'sans-serif'],
      body: ['IndustryTest-Thin', 'sans-serif'],

    },
    logo: '/images/san-diego-legion-logo.png',
    shopBanner: '/images/san-diego-legion-shop-banner.jpg',
    teamId: "034db172-942f-48b8-bc91-a0b3eb3a025f",
    footerBackgroundImage: '/images/seawolves-footer-background.jpg',fanCentral: {
      hero: {
        backgroundImage: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/09/Matchday-Page-1024x576.jpeg",
        badge: "Fan Central",
        title: "Join The Pack",
        description: "Your one-stop destination for everything Seawolves - from matchday experiences to fan essentials."
      },
      mainResources: [
        {
          title: "Matchday Experience",
          description: "Everything you need to know for gameday at Starfire Stadium",
          icon: "Calendar",
          href: "/matchday",
          bgImage: "/wp-content/uploads/sites/14/2021/10/Seawolves_2022_Website_SquareGraphics_MatchDay.jpg"
        },
        {
          title: "Where to Stay",
          description: "Find the perfect accommodations for your Seawolves rugby weekend",
          icon: "MapPin",
          href: "https://www.seattlesouthside.com/things-to-do/sports/seawolves/",
          bgImage: "/wp-content/uploads/sites/14/2021/10/Seawolves_2022_Website_SquareGraphics_WhereToStay.jpg"
        },
        {
          title: "Where to Watch",
          description: "Find local venues showing Seawolves matches or watch online",
          icon: "Tv2",
          href: "/where-to-watch",
          bgImage: "/wp-content/uploads/sites/14/2021/10/Seawolves_2022_Website_SquareGraphics_WhereToWatch.jpg"
        },
        {
          title: "Rugby 101",
          description: "New to rugby? Learn the basics of the game",
          icon: "Info",
          href: "/rugby-101",
          bgImage: "/wp-content/uploads/sites/14/2021/10/Seawolves_2022_Website_SquareGraphics_Rugby101.jpg"
        },
        {
          title: "Wallpapers",
          description: "Download Seawolves wallpapers for your devices",
          icon: "ImageIcon",
          href: "/wallpapers",
          bgImage: "/wp-content/uploads/sites/14/2021/11/Seawolves_2022_Website_SquareGraphics_Wallpapers.jpeg"
        }
      ],
      quickLinks: {
        title: "Quick Links",
        links: [
          {
            title: "Buy Tickets",
            href: "/tickets",
            icon: "Ticket",
            bgColor: "bg-primary/5",
            hoverColor: "bg-primary/10"
          },
          {
            title: "Match Schedule",
            href: "/schedule",
            icon: "Calendar",
            bgColor: "bg-primary/5",
            hoverColor: "bg-primary/10"
          },
          {
            title: "Team Store",
            href: "/shop",
            icon: "Share2",
            bgColor: "bg-primary/5",
            hoverColor: "bg-primary/10"
          }
        ]
      }
    }
  },
  'chicago-hounds': {
    name: 'Chicago Hounds',
    socialMedia: {
      facebook: 'https://www.facebook.com/chicagohounds',
      instagram: 'https://www.instagram.com/chicagohounds',
      twitter: 'https://www.twitter.com/chicagohounds',
    },
    appStoreLinks: {
      ios: 'https://apps.apple.com/us/app/chicago-hounds/id123456789',
      android: 'https://play.google.com/store/apps/details?id=com.chicagohounds.app'
    },
    colors: {
      primary: 'hsl(157, 98%, 19%)',      // #016242 dark green
      secondary: 'hsl(0, 0%, 20%)',       // #333333 dark grey
      accent: 'hsl(203, 71%, 63%)',       // #5CB1E3 light blue
      'primary-foreground': 'hsl(0, 0%, 100%)',
      'secondary-foreground': 'hsl(0, 0%, 100%)',
      'accent-foreground': 'hsl(0, 0%, 0%)',
     },
    fonts: {
      h1: ['IndustryTest-Black', 'sans-serif'],
      h2: ['IndustryTest-Bold', 'sans-serif'],
      h3: ['IndustryTest-Medium', 'sans-serif'],
      h4: ['IndustryTest-Book', 'sans-serif'],
      h5: ['IndustryTest-Demi', 'sans-serif'],
      h6: ['IndustryTest-Light', 'sans-serif'],
      body: ['IndustryTest-Thin', 'sans-serif'],
    },
    logo: 'https://www.chicagohounds.com/wp-content/uploads/sites/18/2024/01/WebLogo.png',
    shopBanner: '/images/chicago-hounds-shop-banner.png',
    teamId: "17a788b5-2ac6-41d6-a320-f4d75cdd08b9",
    footerBackgroundImage: '/images/seawolves-footer-background.jpg',
  
    fanCentral: {
      hero: {
        backgroundImage: "https://seawolves.rugby/wp-content/uploads/sites/14/2021/09/Matchday-Page-1024x576.jpeg",
        badge: "Fan Central",
        title: "Join The Pack",
        description: "Your one-stop destination for everything Seawolves - from matchday experiences to fan essentials."
      },
      mainResources: [
        {
          title: "Matchday Experience",
          description: "Everything you need to know for gameday at Starfire Stadium",
          icon: "Calendar",
          href: "/matchday",
          bgImage: "/wp-content/uploads/sites/14/2021/10/Seawolves_2022_Website_SquareGraphics_MatchDay.jpg"
        },
        {
          title: "Where to Stay",
          description: "Find the perfect accommodations for your Seawolves rugby weekend",
          icon: "MapPin",
          href: "https://www.seattlesouthside.com/things-to-do/sports/seawolves/",
          bgImage: "/wp-content/uploads/sites/14/2021/10/Seawolves_2022_Website_SquareGraphics_WhereToStay.jpg"
        },
        {
          title: "Where to Watch",
          description: "Find local venues showing Seawolves matches or watch online",
          icon: "Tv2",
          href: "/where-to-watch",
          bgImage: "/wp-content/uploads/sites/14/2021/10/Seawolves_2022_Website_SquareGraphics_WhereToWatch.jpg"
        },
        {
          title: "Rugby 101",
          description: "New to rugby? Learn the basics of the game",
          icon: "Info",
          href: "/rugby-101",
          bgImage: "/wp-content/uploads/sites/14/2021/10/Seawolves_2022_Website_SquareGraphics_Rugby101.jpg"
        },
        {
          title: "Wallpapers",
          description: "Download Seawolves wallpapers for your devices",
          icon: "ImageIcon",
          href: "/wallpapers",
          bgImage: "/wp-content/uploads/sites/14/2021/11/Seawolves_2022_Website_SquareGraphics_Wallpapers.jpeg"
        }
      ],
      quickLinks: {
        title: "Quick Links",
        links: [
          {
            title: "Buy Tickets",
            href: "/tickets",
            icon: "Ticket",
            bgColor: "bg-primary/5",
            hoverColor: "bg-primary/10"
          },
          {
            title: "Match Schedule",
            href: "/schedule",
            icon: "Calendar",
            bgColor: "bg-primary/5",
            hoverColor: "bg-primary/10"
          },
          {
            title: "Team Store",
            href: "/shop",
            icon: "Share2",
            bgColor: "bg-primary/5",
            hoverColor: "bg-primary/10"
          }
        ]
      }
    }
    
  },
  // Add more team configurations here
};

export const currentTeam = process.env.NEXT_PUBLIC_TEAM_ID || 'seattle-seawolves';
export const currentTeamConfig = teamConfigs[currentTeam as keyof typeof teamConfigs];
export const allTeams = Object.keys(teamConfigs);
export const getSponsorSize = (priority: number) => {
  switch (priority) {
    case 1:
      return 'col-span-2 md:col-span-1' // Larger for primary sponsors
    case 2:
      return 'col-span-1' // Standard size for secondary
    default:
      return 'col-span-1' // Standard size for others
  }
}

export const getSponsorOrder = (priority: number) => {
  return `order-${priority}`
}
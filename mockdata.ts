// mockHeroData.ts
import { HeroData, Matches } from '@/lib/types';

export const mockHeroData: HeroData = {
  title: 'Welcome to Our Platform',
  subtitle: 'Your gateway to success!',
  ctaPrimary: 'Get Started',
  ctaSecondary: 'Learn More',
  homePageVideoUrl: 'https://www.youtube.com/watch?v=l6OJbTsnuaI',
  sponsors: [
    {
      name: 'RootSports',
      hierarchy: 1,
      logoUrl: '/images/sponsors/Root-Sports.png',
      sponsorUrl: 'https://www.rootsports.com',
    },
    {
      name: 'BillyBaroos',
      hierarchy: 2,
      logoUrl: '/images/sponsors/BillBaroos.png',
      sponsorUrl: 'https://www.billybaroos.com',
    },
    {
      name: 'FoxSeattle',
      hierarchy: 3,
      logoUrl: '/images/sponsors/WaFd.png',
      sponsorUrl: 'https://www.foxseattle.com',
    },
  ],
};


export const upcomingMatchesData: Matches = [
  {
    "match_id": 1, // Added match_id
    "date": "February 16, 2025",
    "time": "5:00 PM EST",
    "week": 1,
    "home_team": "Legion",
    "away_team": "Seawolves",
    "location": "TBD",
    "ticket_url": "Buy Tickets", "background_image": "/images/stadiums/snapdragon.webp"

  },
  {
    "match_id": 2, // Added match_id
    "date": "March 8, 2025",
    "time": "10:00 PM EST",
    "week": 4,
    "home_team": "Seawolves",
    "away_team": "Free Jacks",
    "location": "Starfire Stadium",
    "ticket_url": "https://www.axs.com/events/757976/preseason-seattle-seawolves-vs-rfc-los-angeles-tickets", "background_image": "/images/stadiums/Starfire.webp"
  },
  {
    "match_id": 3, // Added match_id
    "date": "March 22, 2025",
    "time": "10:00 PM EST",
    "week": 6,
    "home_team": "Seawolves",
    "away_team": "Warriors",
    "location": "Starfire Stadium",
    "ticket_url": "https://www.axs.com/events/757985/seattle-seawolves-vs-utah-warriors-tickets", "background_image": "/images/stadiums/Starfire.webp"
  },
  {
    "match_id": 4, // Added match_id
    "date": "March 29, 2025",
    "time": "9:00 PM EST",
    "week": 7,
    "home_team": "Seawolves",
    "away_team": "Anthem",
    "location": "Starfire Stadium",
    "ticket_url": "https://www.axs.com/events/757987/seattle-seawolves-vs-anthem-rugby-carolina-tickets", "background_image": "/images/stadiums/Anthem.webp"
  },
  {
    "match_id": 5, // Added match_id
    "date": "April 5, 2025",
    "time": "10:00 PM EST",
    "week": 8,
    "home_team": "Old Glory",
    "away_team": "Seawolves",
    "location": "Maryland SoccerPlex",
    "ticket_url": "Buy Tickets", "background_image": "/images/stadiums/snapdragon.webp"
  },
  {
    "match_id": 6, // Added match_id
    "date": "April 19, 2025",
    "time": "10:30 PM EST",
    "week": 10,
    "home_team": "Seawolves",
    "away_team": "Chicago Hounds",
    "location": "Starfire Stadium",
    "ticket_url": "https://www.axs.com/events/757993/seattle-seawolves-vs-chicago-hounds-tickets", "background_image": "/images/stadiums/snapdragon.webp"
  },
  {
    "match_id": 7, // Added match_id
    "date": "April 27, 2025",
    "time": "7:30 PM EST",
    "week": 11,
    "home_team": "Seawolves",
    "away_team": "Rugby LA",
    "location": "Starfire Stadium",
    "ticket_url": "Buy Tickets", "background_image": "/images/stadiums/snapdragon.webp"
  },
  {
    "match_id": 8, // Added match_id
    "date": "May 2, 2025",
    "time": "10:30 PM EST",
    "week": 12,
    "home_team": "Seawolves",
    "away_team": "Rugby LA",
    "location": "Starfire Stadium",
    "ticket_url": "Buy Tickets", "background_image": "/images/stadiums/snapdragon.webp"
  },
  {
    "match_id": 9, // Added match_id
    "date": "May 9, 2025",
    "time": "10:30 PM EST",
    "week": 13,
    "home_team": "Seawolves",
    "away_team": "Houston SaberCats",
    "location": "Starfire Stadium",
    "ticket_url": "Buy Tickets", "background_image": "/images/stadiums/snapdragon.webp"
  },
  {
    "match_id": 10, // Added match_id
    "date": "May 17, 2025",
    "time": "9:00 PM EST",
    "week": 14,
    "home_team": "Seawolves",
    "away_team": "Legion",
    "location": "Starfire Stadium",
    "ticket_url": "Buy Tickets", "background_image": "/images/stadiums/snapdragon.webp"
  },
  {
    "match_id": 11, // Added match_id
    "date": "June 8, 2025",
    "time": "9:00 PM EST",
    "week": 17,
    "home_team": "Seawolves",
    "away_team": "Miami Sharks",
    "location": "Starfire Stadium",
    "ticket_url": "Buy Tickets", "background_image": "/images/stadiums/snapdragon.webp"
  }
]

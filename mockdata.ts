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
      logoUrl: '/images/sponsors/Fox13.png',
      sponsorUrl: 'https://www.fox13seattle.com/',
    },
    {
      name: 'Filson',
      hierarchy: 2,
      logoUrl: '/images/sponsors/Filson.png',
      sponsorUrl: 'https://www.filson.com/ ',
    },
    {
      name: 'WAFD Bank',
      hierarchy: 3,
      logoUrl: '/images/sponsors/WaFd.png',
      sponsorUrl: 'https://www.wafdbank.com/',
    },
  ],
};

export const upcomingMatchesData: Matches = [
  {
    "match_id": 1,
    "date": "February 1, 2025", // Updated to match AXS listing
    "time": "6:00 PM PST",
    "week": 1,
    "home_team": "Seawolves",
    "away_team": "RFC LA",
    "location": "Starfire Sports Complex",
    "ticket_url": "https://www.axs.com/events/757976/preseason-seattle-seawolves-vs-rfc-los-angeles-tickets",
    "background_image": "/images/teams/RFCLA.png"
  },
  {
    "match_id": 2,
    "date": "February 7, 2025", // Updated to match AXS listing
    "time": "7:30 PM PST",
    "week": 2,
    "home_team": "Seawolves",
    "away_team": "Canada Selects",
    "location": "Starfire Sports Complex",
    "ticket_url": "https://www.axs.com/events/757982/preseason-seattle-seawolves-vs-canada-selects-tickets",
    "background_image": "/images/stadiums/Starfire.webp"
  },
  {
    "match_id": 3,
    "date": "March 8, 2025",
    "time": "7:00 PM PST",
    "week": 4,
    "home_team": "Seawolves",
    "away_team": "Free Jacks",
    "location": "Starfire Sports Complex",
    "ticket_url": "https://www.axs.com/events/757984/seattle-seawolves-vs-new-england-freejacks-tickets",
    "background_image": "/images/stadiums/Starfire.webp"
  },
  {
    "match_id": 4,
    "date": "March 22, 2025",
    "time": "7:00 PM PST",
    "week": 6,
    "home_team": "Seawolves",
    "away_team": "Warriors",
    "location": "Starfire Sports Complex",
    "ticket_url": "https://www.axs.com/events/757985/seattle-seawolves-vs-utah-warriors-tickets",
    "background_image": "/images/stadiums/Starfire.webp"
  },
  {
    "match_id": 5,
    "date": "March 29, 2025",
    "time": "6:00 PM PST",
    "week": 7,
    "home_team": "Seawolves",
    "away_team": "Anthem",
    "location": "Starfire Sports Complex",
    "ticket_url": "https://www.axs.com/events/757987/seattle-seawolves-vs-anthem-rugby-carolina-tickets",
    "background_image": "/images/stadiums/Starfire.webp"
  },
  {
    "match_id": 6,
    "date": "April 18, 2025",
    "time": "7:30 PM PST",
    "week": 10,
    "home_team": "Seawolves",
    "away_team": "Hounds",
    "location": "Starfire Sports Complex",
    "ticket_url": "https://www.axs.com/events/757993/seattle-seawolves-vs-chicago-hounds-tickets",
    "background_image": "/images/stadiums/Starfire.webp"
  },
  {
    "match_id": 7,
    "date": "May 2, 2025",
    "time": "7:30 PM PST",
    "week": 12,
    "home_team": "Seawolves",
    "away_team": "RFC Los Angeles",
    "location": "Starfire Sports Complex",
    "ticket_url": "https://www.axs.com/events/757996/seattle-seawolves-vs-rfc-los-angeles-tickets",
    "background_image": "/images/stadiums/Starfire.webp"
  },
  {
    "match_id": 8,
    "date": "May 17, 2025",
    "time": "6:00 PM PST",
    "week": 14,
    "home_team": "Seawolves",
    "away_team": "San Diego Legion",
    "location": "Starfire Sports Complex",
    "ticket_url": "https://www.axs.com/events/757997/seattle-seawolves-vs-san-diego-legion-tickets",
    "background_image": "/images/stadiums/Starfire.webp"
  },
  {
    "match_id": 9,
    "date": "May 23, 2025",
    "time": "7:30 PM PST",
    "week": 15,
    "home_team": "Seawolves",
    "away_team": "Houston Sabercats",
    "location": "Starfire Sports Complex",
    "ticket_url": "https://www.axs.com/events/757998/seattle-seawolves-vs-houston-sabercats-tickets",
    "background_image": "/images/stadiums/Starfire.webp"
  },
  {
    "match_id": 10,
    "date": "June 8, 2025",
    "time": "6:00 PM PST",
    "week": 17,
    "home_team": "Seawolves",
    "away_team": "Miami Sharks",
    "location": "Starfire Sports Complex",
    "ticket_url": "https://www.axs.com/events/758005/seattle-seawolves-vs-miami-sharks-tickets",
    "background_image": "/images/stadiums/Starfire.webp"
  }
]
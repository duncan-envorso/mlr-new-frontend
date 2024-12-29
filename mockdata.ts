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


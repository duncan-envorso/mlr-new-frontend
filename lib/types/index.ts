import { z } from "zod";


// Team related types
export type Player = {
  id: string;
  name: string;
  position: string;
  height: number;
  weight: number;
  hometown: string;
  date_of_birth: string | null;
  bio: string | null;
  portrait: string | null;
  thumbnail: string | null;
  player_number: number;
  is_captain: boolean;
  position_group_id: number | null; //Ensure this matches the imported type

};

export interface Coach {
  id: number;
  name: string;
  job_title: string;
  portrait: string;
}

export interface TeamData {
  players: Player[];
  coaches: Coach[];
  staff: any[]; // Define a more specific type if staff data structure becomes available
}

// Existing types with some modifications
export interface Team {
  id: string;
  name: string;
  shortName: string;
  city: string;
  state: string;
  founded: number;
  stadium: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logo: string;
  image_path: string;
  website: string;
  socialMedia: {
    twitter: string;
    instagram: string;
    facebook: string;
  };
  conference: string;
}

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  logo: string;
}

export interface ThemeContextType {
  currentTheme: Theme | null;
  setThemeForTeam: (teamId: string) => void;
}

export interface NewsPostList {
  id: number;
  title: string;
  type: string;
  image: string;
  date_formatted: string;
}


export interface Team {
  name: string;
  shortName: string;
  wins: number | null;
  losses: number | null;
  draws: number | null;
  image_path: string;
}

export interface Match {
  venue: string;
  start_time: string;
  round: number;
  name: string;
  match_id: string;
  match_type: string;
  home_score: number | null;
  away_score: number | null;
  homeTeam: Team;
  awayTeam: Team;
  tickets_url?: string;
}


export interface TeamConfig {
  name: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube?: string;
    tiktok?: string;
  };
  appStoreLinks: {
    ios: string;
    android: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    'primary-foreground': string;
    'secondary-foreground': string;
    'accent-foreground': string;
  };
  fonts: {
    h1: string[];
    h2: string[];
    h3: string[];
    h4: string[];
    h5: string[];
    h6: string[];
    body: string[];
  };
  logo: string;
  shopBanner: string;
  footerBackgroundImage: string;
  teamId: string;
  fanCentral: FanCentralConfig;
}

export interface FanCentralResource {
  title: string;
  description: string;
  icon: string;
  href: string;
  bgImage: string;
}

export interface QuickLink {
  title: string;
  href: string;
  icon: string;
  bgColor: string;
  hoverColor: string;
}

export interface FanCentralConfig {
  hero: {
    backgroundImage: string;
    badge: string;
    title: string;
    description: string;
  };
  mainResources: FanCentralResource[];
  quickLinks: {
    title: string;
    links: QuickLink[];
  };
}


export interface Sponsor {
  name: string
  hierarchy: number
  logoUrl: string
  sponsorUrl: string
}

export interface HeroData {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  homePageVideoUrl: string;
  sponsors: Sponsor[]; // Array of Sponsor objects
}



export interface NewsPost {
  id: string;
  title: string;
  text: string;
  type: string;
  image: string;
  date_posted: string;


  // Add other properties based on your API response
}

export interface StandingsData {
  team_id: string
  season_id: string
  wins: number
  losses: number
  draws: number
  matches_played: number
  score_for: number
  score_against: number
  tries_for: number
  tries_against: number
  points: number
  position: number
  team_id_season_id: string
  name: string
  image_path: string
}
export const matchIdSchema = z.string().uuid();


export type MatchResponse = {
  homeTeam: Team & {
    wins: number;
    losses: number;
    draws: number;
    points: number;
    matches_played: number;
    lineUp: Player[];
  };
  awayTeam: Team & {
    wins: number;
    losses: number;
    draws: number;
    points: number;
    matches_played: number;
    lineUp: Player[];
  };
  referees: Array<{
    name: string;
    type: string;
  }>;
  venue: string;
  start_time: string;
  round: number;
  name: string;
  matchType: string;
  lastMatchData: {
    home_score: number;
    away_score: number;
    statistics: {
      homeTeam: Array<{
        tries: number;
        penalty_tries: number;
        successful_conversions: number;
        successful_penalty_goal_kicks: number;
        passes: number;
        yellow_cards: number;
        red_cards: number;
        penalties_conceded: number;
        ball_carries: number;
        tackles: number;
        breakdowns: number;
        lineouts: number;
        scrums: number;
      }>;
      awayTeam: Array<{
        tries: number;
        penalty_tries: number;
        successful_conversions: number;
        successful_penalty_goal_kicks: number;
        passes: number;
        yellow_cards: number;
        red_cards: number;
        penalties_conceded: number;
        ball_carries: number;
        tackles: number;
        breakdowns: number;
        lineouts: number;
        scrums: number;
      }>;
    };
  };
};

export type UpcomingMatchData = {
  match_id: number; // Added match_id
  date: string;         // Match date in a readable string format, e.g., "February 16, 2025"
  time: string;         // Match time, e.g., "5:00 PM EST"
  week: number;         // Week number of the match, e.g., 1
  home_team: string;    // Name of the home team, e.g., "San Diego Legion"
  away_team: string;    // Name of the away team, e.g., "Seattle Seawolves"
  location: string;     // Match location, e.g., "Starfire Stadium" or "TBD"
  ticket_url: string;   // URL or label for ticket purchase, e.g., "Buy Tickets"
  background_image:string
};

// Array type for all matches
export type Matches = UpcomingMatchData[];

// types/index.ts
export interface UserPreferences {
  firstName?: string;
  lastName?: string;
  email?: string;
  birthday?: string;
  gender?: string;
  neverShow?: boolean;
}
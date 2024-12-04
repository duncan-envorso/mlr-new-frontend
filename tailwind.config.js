// tailwind.config.js
let teamConfig;
import { currentTeamConfig } from './config/teamConfig';

try {
  const { currentTeamConfig } = require('./config/teamConfig.ts');
  teamConfig = currentTeamConfig;
} catch (error) {
  console.warn("Unable to load team config. Using fallback values.", error);
  teamConfig = {
    colors: {
      primary: 'hsl(152, 100%, 20%)',
      secondary: 'hsl(0, 0%, 13%)',
      accent: 'hsl(201, 76%, 63%)',
      background: 'var(--background)',
      border: 'var(--border)',

      'primary-foreground': 'hsl(0, 0%, 85%)',
      'secondary-foreground': 'hsl(0, 0%, 90%)',
      'accent-foreground': 'hsl(220, 17%, 20%)',
    },
    fonts: {
      heading: ['Montserrat', 'sans-serif'],
      body: ['Roboto', 'sans-serif'],
    },
    logo: '/images/default-logo.png',
  };
}

/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
];

export const theme = {
  extend: {
    colors: {
      primary: teamConfig.colors.primary,
      secondary: teamConfig.colors.secondary,
      accent: teamConfig.colors.accent,
      'primary-foreground': teamConfig.colors['primary-foreground'],
      'secondary-foreground': teamConfig.colors['secondary-foreground'],
      'accent-foreground': teamConfig.colors['accent-foreground'],
      card: 'white', // This will create a bg-card class
    },
    fontFamily: {
      'h1': teamConfig.fonts.h1,
      'h2': teamConfig.fonts.h2,
      'h3': teamConfig.fonts.h3,
      'h4': teamConfig.fonts.h4,
      'h5': teamConfig.fonts.h5,
      'h6': teamConfig.fonts.h6,
      'body': teamConfig.fonts.body,
    },
    backgroundImage: {
      'hero-pattern': "url('/images/rugby-field.jpg')",
      'team-logo': `url('${teamConfig.logo}')`,
    },
    borderRadius: {
      'rugby-ball': '50% / 20%',
    },
  },
};

export const plugins = [
  // require('@tailwindcss/forms'),
  require('@tailwindcss/typography'),
];
// scripts/generateTeamGlobalCss.ts
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Team {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  // Add other properties as needed
}

interface Config {
  teams: Team[];
}

function hexToHSL(hex: string): string {
  // Remove the hash if it exists
  hex = hex.replace(/^#/, '');
  // Parse the hex values
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  // Find greatest and smallest channel values
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0;
  // Calculate hue
  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  // Calculate lightness
  l = (cmax + cmin) / 2;
  // Calculate saturation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  // Convert to percentages
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  return `${h} ${s}% ${l}%`;
}

function generateGlobalCss(team: Team): string {
  return `
  
    :root {
      --primary: ${hexToHSL(team.primaryColor)};
      --primary-foreground: 0 0% 100%;
      --secondary: ${hexToHSL(team.secondaryColor)};
      --secondary-foreground: 0 0% 100%;
      --accent: ${hexToHSL(team.accentColor)};
      --accent-foreground: 0 0% 100%;
      
      --background: 0 0% 100%;
      --foreground: 222.2 84% 4.9%;
      --card: 0 0% 100%;
      --card-foreground: 222.2 84% 4.9%;
      --popover: 0 0% 100%;
      --popover-foreground: 222.2 84% 4.9%;
      --muted: 210 40% 96.1%;
      --muted-foreground: 215.4 16.3% 46.9%;
      --border: 214.3 31.8% 91.4%;
      --input: 214.3 31.8% 91.4%;
      --ring: hsl(var(--primary));
      
      --radius: 0.5rem;
    }
    body {
      background-color: hsl(var(--background));
      color: hsl(var(--foreground));
    }
    .primary-bg { background-color: hsl(var(--primary)); color: hsl(var(--primary-foreground)); }
    .secondary-bg { background-color: hsl(var(--secondary)); color: hsl(var(--secondary-foreground)); }
    .accent-bg { background-color: hsl(var(--accent)); color: hsl(var(--accent-foreground)); }
    .primary-text { color: hsl(var(--primary)); }
    .secondary-text { color: hsl(var(--secondary)); }
    .accent-text { color: hsl(var(--accent)); }
    /* Add more global styles here */
  `;
}

async function generateGlobalCssForTeam(teamName: string): Promise<void> {
  const configPath = path.resolve(__dirname, '..', 'teamsConfig.json');
  // Read the config file
  const configFile = await fs.readFile(configPath, 'utf-8');
  const config: Config = JSON.parse(configFile);
  
  // Find the team by name
  const team = config.teams.find(t => t.name.toLowerCase() === teamName.toLowerCase());
  
  if (team) {
    const cssContent = generateGlobalCss(team);
    const filePath = path.resolve(__dirname, '..', 'app', 'globals.css');
    
    // Ensure the directory exists
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    
    // Write the glopbal CSS file
    await fs.writeFile(filePath, cssContent);
    console.log(`Generated global CSS for ${team.name} at ${filePath}`);
  } else {
    console.error(`Team "${teamName}" not found in the configuration.`);
  }
}

// Check if a team name was provided as a command-line argument
const teamName = process.argv[2];
if (teamName) {
  generateGlobalCssForTeam(teamName).catch(console.error);
} else {
  console.error('Please provide a team name as an argument.');
  console.log('Usage: node --experimental-specifier-resolution=node --loader ts-node/esm generateTeamGlobalCss.ts "Team Name"');
}
// src/utils/teamLogos.js

// Simple utility to get team logos
export const getTeamLogo = (teamName) => {
  const logoMap = {
    'Arsenal FC': '⚪🔴', // Arsenal colors
    'Chelsea FC': '🔵',   // Chelsea blue
    'Liverpool FC': '🔴', // Liverpool red
    'Manchester City FC': '☁️💙', // City sky blue
    'Manchester United FC': '👹🔴', // United red devils
    'Tottenham Hotspur FC': '⚪🐓', // Spurs cockerel
    'Newcastle United FC': '⚫⚪', // Newcastle stripes
    'Brighton & Hove Albion FC': '🔵⚪', // Brighton blue/white
    'Aston Villa FC': '🟣🦁', // Villa claret
    'West Ham United FC': '⚒️', // West Ham hammers
    'Crystal Palace FC': '🦅', // Palace eagle
    'Fulham FC': '⚪⚫', // Fulham
    'Brentford FC': '🐝', // Brentford bees
    'Wolverhampton Wanderers FC': '🐺', // Wolves
    'Everton FC': '🔵🍬', // Everton toffees
    'Nottingham Forest FC': '🌳🔴', // Forest tree
    'AFC Bournemouth': '🍒', // Bournemouth cherries
    'Luton Town FC': '🎩', // Luton hatters
    'Burnley FC': '🟤', // Burnley clarets
    'Sheffield United FC': '⚔️' // Sheffield blades
  };
  
  return logoMap[teamName] || '⚽';
};

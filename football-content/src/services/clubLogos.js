// src/services/clubLogos.js

const clubLogos = {
  // Premier League clubs with their logo URLs
  'Arsenal FC': 'https://logos-world.net/wp-content/uploads/2020/06/Arsenal-Logo.png',
  'Chelsea FC': 'https://logos-world.net/wp-content/uploads/2020/06/Chelsea-Logo.png',
  'Liverpool FC': 'https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.png',
  'Manchester City FC': 'https://logos-world.net/wp-content/uploads/2020/06/Manchester-City-Logo.png',
  'Manchester United FC': 'https://logos-world.net/wp-content/uploads/2020/06/Manchester-United-Logo.png',
  'Tottenham Hotspur FC': 'https://logos-world.net/wp-content/uploads/2020/06/Tottenham-Logo.png',
  'Newcastle United FC': 'https://logos-world.net/wp-content/uploads/2020/06/Newcastle-United-Logo.png',
  'Brighton & Hove Albion FC': 'https://logos-world.net/wp-content/uploads/2020/06/Brighton-Hove-Albion-Logo.png',
  'Aston Villa FC': 'https://logos-world.net/wp-content/uploads/2020/06/Aston-Villa-Logo.png',
  'West Ham United FC': 'https://logos-world.net/wp-content/uploads/2020/06/West-Ham-United-Logo.png',
  'Crystal Palace FC': 'https://logos-world.net/wp-content/uploads/2020/06/Crystal-Palace-Logo.png',
  'Fulham FC': 'https://logos-world.net/wp-content/uploads/2020/06/Fulham-Logo.png',
  'Brentford FC': 'https://logos-world.net/wp-content/uploads/2020/06/Brentford-Logo.png',
  'Wolverhampton Wanderers FC': 'https://logos-world.net/wp-content/uploads/2020/06/Wolverhampton-Wanderers-Logo.png',
  'Everton FC': 'https://logos-world.net/wp-content/uploads/2020/06/Everton-Logo.png',
  'Nottingham Forest FC': 'https://logos-world.net/wp-content/uploads/2020/06/Nottingham-Forest-Logo.png',
  'AFC Bournemouth': 'https://logos-world.net/wp-content/uploads/2020/06/AFC-Bournemouth-Logo.png',
  'Luton Town FC': 'https://logos-world.net/wp-content/uploads/2020/06/Luton-Town-Logo.png',
  'Burnley FC': 'https://logos-world.net/wp-content/uploads/2020/06/Burnley-Logo.png',
  'Sheffield United FC': 'https://logos-world.net/wp-content/uploads/2020/06/Sheffield-United-Logo.png'
};

export const getClubLogo = (clubName) => {
  return clubLogos[clubName] || null;
};

export const getClubLogoWithFallback = (clubName, apiCrest) => {
  // First try API crest, then our mapping, then fallback
  return apiCrest || clubLogos[clubName] || null;
};

export default clubLogos;

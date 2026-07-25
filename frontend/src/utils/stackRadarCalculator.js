export const calculateStackScores = (frontend = '', backend = '', database = '', auth = '') => {
  let devSpeed = 75;
  let scalability = 75;
  let security = 80;
  let maintenance = 75;

  if (frontend.includes('React 19')) { devSpeed += 12; maintenance += 8; }
  else if (frontend.includes('Next.js 15')) { devSpeed += 14; scalability += 10; maintenance += 10; }
  else if (frontend.includes('Vue.js 3') || frontend.includes('Svelte')) { devSpeed += 10; maintenance += 6; }
  else if (frontend.includes('Angular')) { devSpeed -= 5; scalability += 8; maintenance += 12; }
  else if (frontend.includes('Vanilla')) { devSpeed += 15; scalability -= 10; maintenance -= 15; }

  if (backend.includes('Express')) { devSpeed += 10; scalability += 5; }
  else if (backend.includes('FastAPI')) { devSpeed += 8; scalability += 14; security += 6; }
  else if (backend.includes('.NET 9')) { devSpeed -= 8; scalability += 18; security += 12; maintenance += 15; }
  else if (backend.includes('Laravel')) { devSpeed += 10; security += 8; maintenance += 6; }
  else if (backend.includes('NestJS')) { devSpeed += 4; scalability += 12; security += 8; maintenance += 14; }
  else if (backend.includes('Go')) { devSpeed += 2; scalability += 20; security += 8; maintenance += 10; }

  if (database.includes('MongoDB')) { devSpeed += 8; scalability += 6; }
  else if (database.includes('PostgreSQL')) { scalability += 12; security += 8; maintenance += 10; }
  else if (database.includes('Supabase')) { devSpeed += 12; scalability += 8; security += 8; }
  else if (database.includes('Firebase')) { devSpeed += 14; scalability += 4; security += 6; }
  else if (database.includes('SQLite')) { devSpeed += 10; scalability -= 15; }

  if (auth.includes('OAuth2')) { security += 10; }
  else if (auth.includes('Supabase Auth') || auth.includes('Firebase Auth')) { devSpeed += 6; security += 8; }
  else if (auth.includes('NextAuth')) { devSpeed += 8; security += 6; }

  return {
    devSpeed: Math.min(Math.max(devSpeed, 55), 98),
    scalability: Math.min(Math.max(scalability, 50), 99),
    security: Math.min(Math.max(security, 60), 98),
    maintenance: Math.min(Math.max(maintenance, 50), 96)
  };
};

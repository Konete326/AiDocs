export const getOptionsForProject = (project) => {
  const tech = (project?.wizardAnswers?.techPreferences || '').toLowerCase();
  const type = (project?.projectType || '').toLowerCase();

  const isMobile = type === 'mobile' || tech.includes('flutter') || tech.includes('react-native') || tech.includes('react native') || tech.includes('ios') || tech.includes('android') || tech.includes('swift') || tech.includes('kotlin');
  const isEcommerce = type === 'ecommerce' || type === 'marketplace';
  const isAi = type === 'ai' || tech.includes('python') || tech.includes('fastapi');

  if (isMobile) {
    return {
      frontends: [
        'Flutter 3.24+ (Dart)',
        'React Native (Expo SDK 52)',
        'Swift 6 (SwiftUI Native iOS)',
        'Kotlin (Jetpack Compose Android)',
        'Capacitor (React 19 Mobile)'
      ],
      backends: [
        'Python (FastAPI Async API)',
        'Node.js (Express.js REST API)',
        'Node.js (NestJS Modular API)',
        'Go (Fiber REST API)',
        'Firebase Cloud Functions'
      ],
      databases: [
        'Hive / SQLite (Local Mobile Cache)',
        'PostgreSQL (Supabase / Prisma)',
        'MongoDB (Atlas Mongoose)',
        'Firebase Firestore',
        'Room DB (SQLite Native)'
      ],
      auths: [
        'Biometrics & Secure Token Storage',
        'JWT Bearer Tokens + Refresh',
        'OAuth2 (Apple & Google Sign-In)',
        'Supabase Mobile Auth',
        'Firebase Auth'
      ]
    };
  }

  if (isEcommerce) {
    return {
      frontends: [
        'Next.js 15 Commerce (App Router)',
        'React 19 SPA (Vite 6 Storefront)',
        'Flutter 3.24+ Mobile Store App',
        'React Native (Expo Store App)'
      ],
      backends: [
        'Next.js 15 Server Actions & API',
        'Node.js (Express.js + Stripe)',
        'Python (FastAPI Async API)',
        'PHP (Laravel 11 API)'
      ],
      databases: [
        'PostgreSQL (Prisma ORM)',
        'MongoDB (Mongoose)',
        'MySQL (ACID Relational)',
        'Supabase (Postgres)'
      ],
      auths: [
        'NextAuth.js / Auth.js',
        'JWT Bearer Tokens + Refresh',
        'OAuth2 (Google / GitHub / Apple)',
        'Stripe Customer Portal Auth'
      ]
    };
  }

  if (isAi) {
    return {
      frontends: [
        'Next.js 15 (AI App Router)',
        'React 19 SPA (Vite 6 Dashboard)',
        'Flutter 3.24+ (Mobile AI Assistant)',
        'React 19 + Tailwind v4'
      ],
      backends: [
        'Python (FastAPI + LangChain + OpenAI)',
        'Python (Django Async API)',
        'Node.js (Express AI Orchestrator)',
        'Go (Fiber AI Microservice)'
      ],
      databases: [
        'pgvector (PostgreSQL Vector DB)',
        'MongoDB (Atlas Vector Search)',
        'Pinecone / Qdrant Vector Store',
        'Redis (Cache & AI Context)'
      ],
      auths: [
        'JWT Bearer Tokens (API Keys)',
        'OAuth2 (Google / GitHub)',
        'NextAuth.js / Auth.js',
        'Supabase Auth'
      ]
    };
  }

  return {
    frontends: [
      'Next.js 15 (App Router)',
      'React 19 (Vite 6 SPA)',
      'Vue.js 3 (Vite 6)',
      'Svelte 5',
      'Vanilla HTML/JS'
    ],
    backends: [
      'Node.js (Express.js)',
      'Python (FastAPI)',
      'Node.js (NestJS)',
      'C# (.NET 9 ASP.NET)',
      'PHP (Laravel 11)',
      'Go (Fiber)'
    ],
    databases: [
      'PostgreSQL (Prisma)',
      'MongoDB (Mongoose)',
      'MySQL',
      'Supabase (Postgres)',
      'SQLite'
    ],
    auths: [
      'JWT Bearer Tokens',
      'NextAuth.js / Auth.js',
      'OAuth2 (Google/GitHub)',
      'Supabase Auth',
      'Firebase Auth'
    ]
  };
};

export const parseCustomString = (str) => {
  if (!str || typeof str !== 'string' || !str.startsWith('Custom Stack:')) return {};
  const cleaned = str.replace('Custom Stack:', '').trim();
  const parts = cleaned.split(' + ');
  const res = {};
  for (const part of parts) {
    if (part.includes(' Frontend')) res.frontend = part.replace(' Frontend', '').trim();
    if (part.includes(' Backend')) res.backend = part.replace(' Backend', '').trim();
    if (part.includes(' Database')) res.database = part.replace(' Database', '').trim();
  }
  const last = parts[parts.length - 1];
  if (last && !last.includes(' Frontend') && !last.includes(' Backend') && !last.includes(' Database')) {
    res.auth = last.trim();
  }
  return res;
};

export const checkIncompatibility = (cat, val, f = '', b = '', d = '', a = '') => {
  if (cat === 'auth' || val === 'NextAuth.js / Auth.js') {
    if (a === 'NextAuth.js / Auth.js' && !f.includes('Next.js')) {
      return 'NextAuth.js requires Next.js App/Pages Router runtime. Incompatible with pure SPAs or Flutter.';
    }
  }
  if (cat === 'auth' || val === 'Supabase Auth' || val === 'Supabase Mobile Auth') {
    if ((a.includes('Supabase')) && !d.includes('Supabase') && !d.includes('Postgres')) {
      return 'Supabase Auth requires Supabase / PostgreSQL database.';
    }
  }
  if (cat === 'auth' || val === 'Firebase Auth') {
    if (a.includes('Firebase') && !d.includes('Firebase')) {
      return 'Firebase Auth works natively with Firebase Firestore.';
    }
  }
  if (cat === 'database' || (b.includes('.NET') || b.includes('Laravel'))) {
    if (d.includes('MongoDB') && (b.includes('.NET') || b.includes('Laravel'))) {
      return `${b} native ORMs (EF Core/Eloquent) are incompatible with MongoDB.`;
    }
  }
  return null;
};

export const FRONTENDS = ['React 19 (Vite 6)', 'Next.js 15 (App Router)', 'Vue.js 3', 'Angular 18', 'Svelte 5', 'Vanilla HTML/JS'];
export const BACKENDS = ['Node.js (Express.js)', 'Python (FastAPI)', 'C# (.NET 9 ASP.NET)', 'PHP (Laravel 11)', 'Node.js (NestJS)', 'Go (Fiber)'];
export const DATABASES = ['MongoDB (Mongoose)', 'PostgreSQL (Prisma)', 'MySQL', 'SQLite', 'Supabase (Postgres)', 'Firebase Firestore'];
export const AUTHS = ['JWT Bearer Tokens', 'NextAuth.js / Auth.js', 'OAuth2 (Google/GitHub)', 'Supabase Auth', 'Firebase Auth'];

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

export const checkIncompatibility = (cat, val, f, b, d, a) => {
  if (cat === 'auth' || val === 'NextAuth.js / Auth.js') {
    if (a === 'NextAuth.js / Auth.js' && !f.includes('Next.js')) {
      return 'NextAuth.js requires Next.js App/Pages Router runtime. Incompatible with React Vite or pure SPAs.';
    }
  }
  if (cat === 'auth' || val === 'Supabase Auth') {
    if (a === 'Supabase Auth' && !d.includes('Supabase')) {
      return 'Supabase Auth requires Supabase (Postgres) database.';
    }
  }
  if (cat === 'auth' || val === 'Firebase Auth') {
    if (a === 'Firebase Auth' && !d.includes('Firebase')) {
      return 'Firebase Auth requires Firebase Firestore database.';
    }
  }
  if (cat === 'database' || val === 'MongoDB (Mongoose)' || b.includes('.NET') || b.includes('Laravel')) {
    if (d === 'MongoDB (Mongoose)' && (b.includes('.NET') || b.includes('Laravel'))) {
      return `${b} native ORMs (EF Core/Eloquent) are incompatible with MongoDB Mongoose.`;
    }
  }
  return null;
};

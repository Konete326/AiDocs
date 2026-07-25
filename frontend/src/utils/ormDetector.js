export const detectAutomatedOrm = (backend = '', database = '') => {
  const b = backend.toLowerCase();
  const d = database.toLowerCase();

  if (b.includes('c#') || b.includes('.net')) {
    return 'Entity Framework Core 9 (EF Core)';
  }
  if (b.includes('laravel') || b.includes('php')) {
    return 'Eloquent ORM (Native Laravel)';
  }
  if (b.includes('python')) {
    if (d.includes('mongo')) return 'Motor + Beanie ODM';
    return 'SQLAlchemy 2.0 + Alembic';
  }
  if (b.includes('go')) {
    return 'GORM v2 + SQLc';
  }
  if (d.includes('mongo')) {
    return 'Mongoose ODM (v8)';
  }
  if (d.includes('supabase')) {
    return 'Supabase JS Client + Postgres RLS';
  }
  if (d.includes('firebase')) {
    return 'Firebase Admin SDK + Firestore Driver';
  }
  if (d.includes('postgres') || d.includes('mysql') || d.includes('sqlite')) {
    return 'Prisma ORM (v5)';
  }

  return 'Native Driver & Query Builder';
};

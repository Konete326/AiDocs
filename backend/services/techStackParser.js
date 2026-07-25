const { getBlueprint } = require('./stackBlueprints');

const STACK_RULES = {
  nextjs_fullstack: [
    "Use Server Components by default; add 'use client' only when hooks (useState, useEffect) or interactivity are needed.",
    "Follow App Router directory conventions (app/page.jsx, app/layout.jsx, app/api/route.js).",
    "Use Server Actions ('use server') for form submissions and data mutations with Zod schema validation.",
    "Instantiate database client (Prisma/Mongoose) as a global singleton to prevent connection pooling leaks in serverless."
  ],
  nextjs_decoupled: [
    "Use Next.js App Router for frontend UI and consume backend REST API via centralized Axios/fetch service layer.",
    "Mark interactive UI components with 'use client'. Keep page data fetching on the server where possible."
  ],
  python_fastapi_django: [
    "Write async route handlers (async def) and use Pydantic v2 schemas (BaseModel, Field) for payload validation.",
    "Use SQLAlchemy/Tortoise ORM with async sessions and inject dependencies using Depends(get_db).",
    "Separate API routes into modular APIRouter instances under app/api/v1/endpoints/."
  ],
  dotnet_csharp: [
    "Follow Clean Architecture: Controllers (Presentation) -> Services (Application) -> Interfaces/Entities (Domain).",
    "Use C# 12 primary constructors, record types, and async/await tasks throughout.",
    "Inject dependencies using built-in IServiceCollection (AddScoped, AddTransient) and use EF Core with AsNoTracking() for reads."
  ],
  php_laravel: [
    "Use Laravel 11 Form Requests for request validation instead of inline controller validation.",
    "Use Eloquent ORM models & API Resources (JsonResource) to format JSON responses.",
    "Define RESTful API endpoints cleanly in routes/api.php and keep controllers thin."
  ],
  react_spa: [
    "Build modular React 18+ components with functional hooks and Zustand for lightweight global state.",
    "Centralize API HTTP requests in a dedicated services layer with Axios request/response interceptors."
  ],
  mern_stack: [
    "Keep Express controllers thin, validate inputs with Joi/Zod, and use Mongoose models for DB queries.",
    "Protect endpoints using JWT Bearer token verification middleware and handle errors in global error middleware."
  ]
};

const parseTechStack = (wizardAnswers = {}) => {
  const text = [
    wizardAnswers.techPreferences || '',
    wizardAnswers.additionalContext || '',
    wizardAnswers.problemStatement || '',
    wizardAnswers.projectType || ''
  ].join(' ').toLowerCase();

  let profile = 'mern_stack';
  let displayName = 'MERN Stack (Node.js + Express + React)';
  let frontendFramework = 'React + Vite';
  let backendFramework = 'Node.js (Express)';
  let language = 'JavaScript / Node.js';

  if (text.includes('next.js') || text.includes('nextjs') || text.includes('next')) {
    if (text.includes('express') || text.includes('fastapi') || text.includes('django') || text.includes('laravel')) {
      profile = 'nextjs_decoupled';
      displayName = 'Decoupled Next.js + Backend API';
      frontendFramework = 'Next.js';
      backendFramework = 'External API Server';
    } else {
      profile = 'nextjs_fullstack';
      displayName = 'Next.js Fullstack (App Router + Server Actions)';
      frontendFramework = 'Next.js (App Router)';
      backendFramework = 'Next.js API Routes / Server Actions';
    }
    language = 'TypeScript / JavaScript';
  } else if (text.includes('python') || text.includes('fastapi') || text.includes('django') || text.includes('flask')) {
    profile = 'python_fastapi_django';
    displayName = text.includes('django') ? 'Python (Django REST Framework)' : 'Python (FastAPI)';
    frontendFramework = text.includes('react') ? 'React' : 'API / Jinja Templates';
    backendFramework = text.includes('django') ? 'Django' : 'FastAPI';
    language = 'Python 3.11+';
  } else if (text.includes('.net') || text.includes('c#') || text.includes('csharp') || text.includes('asp.net')) {
    profile = 'dotnet_csharp';
    displayName = '.NET 8/9 ASP.NET Core Web API';
    frontendFramework = text.includes('react') ? 'React' : text.includes('blazor') ? 'Blazor' : 'Angular/Vue';
    backendFramework = 'ASP.NET Core Web API';
    language = 'C# 12';
  } else if (text.includes('laravel') || text.includes('php')) {
    profile = 'php_laravel';
    displayName = 'PHP (Laravel Framework)';
    frontendFramework = text.includes('inertia') ? 'Inertia.js + React/Vue' : 'Blade / Vue';
    backendFramework = 'Laravel 11 API';
    language = 'PHP 8.3';
  } else if (text.includes('react') && (text.includes('only') || text.includes('vite') || text.includes('spa') || text.includes('frontend'))) {
    profile = 'react_spa';
    displayName = 'React SPA (Vite + Frontend Services)';
    frontendFramework = 'React + Vite';
    backendFramework = 'Client-side API Layer';
    language = 'JavaScript / TypeScript';
  }

  return {
    profile,
    displayName,
    frontendFramework,
    backendFramework,
    language,
    rules: STACK_RULES[profile] || STACK_RULES.mern_stack,
    blueprint: getBlueprint(profile)
  };
};

module.exports = { parseTechStack };

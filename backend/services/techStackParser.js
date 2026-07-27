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
  svelte_sveltekit: [
    "Use SvelteKit + Svelte 5 runes ($state, $derived, $effect) for fine-grained reactivity.",
    "Place page components in src/routes/+page.svelte and server endpoints in src/routes/+page.server.js.",
    "Keep Svelte components modular under 80 lines and strictly typed."
  ],
  vue_nuxt: [
    "Use Vue 3 Composition API with <script setup> syntax and Pinia for global state.",
    "Follow Nuxt 3 directory conventions (pages/, components/, server/api/).",
    "Use TypeScript for reactive ref and reactive state objects."
  ],
  golang_backend: [
    "Follow idiomatic Go project layout (cmd/, pkg/, internal/handler, internal/service, internal/repository).",
    "Use Gin or Fiber HTTP framework with structured JSON logger (slog/zap).",
    "Use GORM or sqlx with PostgreSQL/MySQL and context cancellation propagation."
  ],
  java_springboot: [
    "Follow Layered Architecture: @RestController -> @Service -> @Repository (Spring Data JPA).",
    "Use Java 21 records, pattern matching, and Lombok for clean DTOs.",
    "Use Spring Security 6 with JWT Bearer token authentication."
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
  } else if (text.includes('svelte') || text.includes('sveltekit')) {
    profile = 'svelte_sveltekit';
    displayName = 'SvelteKit Fullstack (Svelte 5)';
    frontendFramework = 'SvelteKit / Svelte 5';
    backendFramework = 'SvelteKit Server Routes';
    language = 'TypeScript / JavaScript';
  } else if (text.includes('vue') || text.includes('nuxt')) {
    profile = 'vue_nuxt';
    displayName = 'Nuxt 3 / Vue 3 Fullstack';
    frontendFramework = 'Vue 3 + Nuxt 3';
    backendFramework = 'Nitro Engine / API Routes';
    language = 'TypeScript / JavaScript';
  } else if (text.includes('golang') || text.includes('go ') || text.includes('gin') || text.includes('fiber')) {
    profile = 'golang_backend';
    displayName = 'Go / Golang Web Server (Gin/Fiber)';
    frontendFramework = text.includes('react') ? 'React + Vite' : 'HTML / HTMX Templates';
    backendFramework = 'Go (Gin / Fiber Framework)';
    language = 'Go 1.22+';
  } else if (text.includes('spring') || text.includes('springboot') || text.includes('java') || text.includes('kotlin')) {
    profile = 'java_springboot';
    displayName = 'Java Spring Boot REST API';
    frontendFramework = text.includes('react') ? 'React' : text.includes('angular') ? 'Angular' : 'API Service';
    backendFramework = 'Spring Boot 3 (Spring Data JPA)';
    language = text.includes('kotlin') ? 'Kotlin 1.9+' : 'Java 21';
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

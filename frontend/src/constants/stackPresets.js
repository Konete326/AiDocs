export const DEFAULT_MERN_VALUE = 'Node.js v20 Express REST API with MongoDB Mongoose and React 19';

export const STACK_CARDS = [
  {
    id: 'mern_stack',
    name: 'MERN Stack (Default)',
    subtitle: 'Node.js v20+ Express + React 19',
    value: DEFAULT_MERN_VALUE,
    category: 'fullstack',
    badge: 'Default Choice',
    color: 'from-amber-500/20 to-yellow-500/20 border-amber-500/40 text-amber-600',
    tags: ['Node.js v20', 'Express 4', 'MongoDB', 'Mongoose', 'React 19'],
    iconType: 'react',
    description: 'Standard JavaScript fullstack architecture with Express middleware, Mongoose models, and React 19 components.'
  },
  {
    id: 'nextjs_fullstack',
    name: 'Next.js 15 Fullstack',
    subtitle: 'App Router + Server Actions',
    value: 'Next.js 15 App Router with Server Actions, React 19, and Tailwind CSS v4',
    category: 'fullstack',
    badge: 'Recommended',
    color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/40 text-blue-600',
    tags: ['Next.js 15', 'App Router', 'Server Actions', 'React 19', 'Tailwind v4'],
    iconType: 'nextjs',
    description: 'Fullstack unified architecture with file-based routing, serverless API endpoints, and built-in SSR/SSG.'
  },
  {
    id: 'nextjs_decoupled',
    name: 'Next.js 15 Decoupled',
    subtitle: 'Next.js Frontend + External API',
    value: 'Next.js 15 App Router Frontend with Decoupled REST API',
    category: 'decoupled',
    badge: 'Microservices',
    color: 'from-sky-500/20 to-blue-500/20 border-sky-500/40 text-sky-600',
    tags: ['Next.js 15', 'Decoupled API', 'TypeScript', 'REST Services'],
    iconType: 'nextjs',
    description: 'Decoupled Next.js client communicating with a separate standalone API server or microservice.'
  },
  {
    id: 'python_fastapi',
    name: 'Python 3.12+ (FastAPI / Django)',
    subtitle: 'Async Python Backend',
    value: 'Python 3.12 FastAPI Async API with Pydantic v2 and SQLAlchemy 2.0',
    category: 'ai_async',
    badge: 'AI & Data Native',
    color: 'from-blue-500/20 to-indigo-500/20 border-blue-500/40 text-blue-600',
    tags: ['Python 3.12', 'FastAPI', 'Pydantic v2', 'SQLAlchemy 2.0', 'AsyncIO'],
    iconType: 'python',
    description: 'High-performance async Python API with automatic OpenAPI documentation and type validation.'
  },
  {
    id: 'dotnet_csharp',
    name: '.NET 9 (ASP.NET Core API)',
    subtitle: 'Clean Architecture C#',
    value: 'C# .NET 9 ASP.NET Core Web API with Clean Architecture & EF Core 9',
    category: 'enterprise',
    badge: 'Enterprise Grade',
    color: 'from-blue-600/20 to-blue-800/20 border-blue-600/40 text-blue-700',
    tags: ['.NET 9', 'C# 12', 'Clean Architecture', 'EF Core 9', 'Web API'],
    iconType: 'dotnet',
    description: 'Enterprise-grade C# backend architecture with dependency injection and Entity Framework Core migrations.'
  },
  {
    id: 'php_laravel',
    name: 'PHP 8.3 / Laravel 11+',
    subtitle: 'Expressive PHP Web API',
    value: 'PHP 8.3 Laravel 11 API with Eloquent ORM and Form Requests',
    category: 'fullstack',
    badge: 'Rapid Build',
    color: 'from-rose-500/20 to-red-500/20 border-rose-500/40 text-rose-600',
    tags: ['PHP 8.3', 'Laravel 11', 'Eloquent ORM', 'Form Requests', 'Artisan'],
    iconType: 'laravel',
    description: 'Robust PHP REST API featuring Eloquent ORM relationships, Form Request validation, and Artisan CLI.'
  },
  {
    id: 'react_spa',
    name: 'React 19 SPA (Vite 6)',
    subtitle: 'Pure Client Application',
    value: 'React 19 Vite 6 Single Page App with Zustand and Axios',
    category: 'decoupled',
    badge: 'Lightweight SPA',
    color: 'from-sky-500/20 to-blue-500/20 border-sky-500/40 text-sky-600',
    tags: ['React 19', 'Vite 6', 'Zustand', 'Axios', 'Tailwind CSS'],
    iconType: 'vite',
    description: 'Ultra-fast single page client app with Vite 6 bundling, Zustand state, and Axios API services.'
  }
];

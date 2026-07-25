const BLUEPRINTS = {
  nextjs_fullstack: `
├── app/                  # Next.js App Router root
│   ├── (auth)/          # Authentication routes group
│   │   ├── login/page.jsx
│   │   └── register/page.jsx
│   ├── api/             # Next.js API route handlers
│   │   └── v1/route.js
│   ├── dashboard/page.jsx
│   ├── layout.jsx       # Root layout & providers
│   ├── page.jsx         # Landing page
│   └── globals.css      # Tailwind & global styles
├── components/          # React components
│   ├── ui/              # Reusable UI primitives (shadcn/tailored)
│   └── shared/          # App header, footer, navigation
├── lib/                 # Core utilities & database client
│   ├── db.js            # Prisma/Mongoose connection
│   └── utils.js         # Helper functions
├── public/              # Static assets & favicon
├── next.config.js       # Next.js configuration
├── tailwind.config.js
├── package.json
└── README.md
`,
  nextjs_decoupled: `
├── frontend/            # Next.js App Router client
│   ├── app/             # Client pages & layouts
│   ├── components/      # UI components
│   ├── lib/api.js       # Axios client for backend API
│   └── package.json
├── backend/             # Node/Express or Python API server
│   ├── src/             # Controller & route handlers
│   └── package.json
└── README.md
`,
  python_fastapi_django: `
├── app/                 # Core Python application package
│   ├── main.py          # FastAPI application entrypoint & middleware
│   ├── config.py        # Settings & environment validation
│   ├── api/             # Endpoint router handlers
│   │   └── v1/endpoints/
│   ├── core/            # Security, JWT & LLM services
│   ├── models/          # SQLAlchemy database models
│   └── schemas/         # Pydantic request/response schemas
├── tests/               # Pytest suite
├── requirements.txt     # Python dependencies
├── .env.example
└── README.md
`,
  dotnet_csharp: `
├── src/                 # Clean Architecture solution
│   ├── Api/             # Presentation layer
│   │   ├── Controllers/ # REST API controllers
│   │   ├── Program.cs   # Dependency injection & pipeline
│   │   └── appsettings.json
│   ├── Core/            # Domain & Application layer
│   │   ├── Entities/    # Domain entities
│   │   └── Interfaces/  # Repository contracts
│   └── Infrastructure/  # Data persistence layer
│       └── Data/        # Entity Framework DbContext
├── tests/
├── Project.sln
└── README.md
`,
  php_laravel: `
├── app/                 # Laravel core application
│   ├── Http/
│   │   ├── Controllers/ # API controllers
│   │   └── Middleware/  # Auth middleware
│   ├── Models/          # Eloquent ORM models
│   └── Services/        # Business logic services
├── config/              # App & DB configuration
├── database/migrations/ # DB migration blueprints
├── routes/              # Route definitions
│   ├── api.php
│   └── web.php
├── composer.json        # PHP dependencies
└── README.md
`,
  react_spa: `
├── src/                 # React SPA source
│   ├── components/      # UI component library
│   ├── pages/           # Route views
│   ├── services/api.js  # REST API integration
│   ├── App.jsx          # Root component
│   └── main.jsx         # Vite entrypoint
├── public/
├── index.html
├── vite.config.js
├── package.json
└── README.md
`,
  mern_stack: `
├── backend/             # Express.js REST API
│   ├── src/
│   │   ├── controllers/ # Route logic
│   │   ├── models/      # Mongoose schemas
│   │   ├── routes/      # Express routes
│   │   └── server.js    # Express listener
│   └── package.json
├── frontend/            # React + Vite client
│   ├── src/
│   └── package.json
└── README.md
`
};

const getBlueprint = (profile) => BLUEPRINTS[profile] || BLUEPRINTS.mern_stack;

module.exports = { BLUEPRINTS, getBlueprint };

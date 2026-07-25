# 🤖 CLAUDE.md — AI Agent Master Guide | AiDocs
## For Every Agent Working on This Project

**Version:** 1.0  
**Project:** AiDocs — AI-Powered Documentation SaaS  
**Last Updated:** March 2026  
**Linked Docs:** PRD v2.1 | TRD v1.0 | SRD v1.0

---

> ⚠️ **CRITICAL — READ THIS FIRST BEFORE WRITING A SINGLE LINE**
>
> You are an AI coding agent working on a **live, production SaaS platform**.  
> Every decision you make affects real users and real data.  
> Do NOT guess. Do NOT skip steps. Do NOT assume context you haven't read.  
> Follow this document exactly — top to bottom — before starting any task.

---

## ⚡ Quick Reference Card
> Scan this first. Full details in the sections below.

### Stack
| Layer | Technology |
|---|---|
| Backend | Node.js + Express (REST API) — `/backend` |
| Frontend | React + Tailwind + Zustand + Framer Motion — `/frontend` |
| Database | MongoDB + Mongoose |
| Auth | JWT + httpOnly refresh token rotation |
| AI | NVIDIA NIM (primary) → OpenRouter fallback cascade |
| Payments | Stripe (Checkout + Webhooks) |

### Key Folder Paths
| Path | What Lives Here |
|---|---|
| `/backend/src/models/` | Mongoose schemas (users, projects, documents, subscriptions, notifications) |
| `/backend/src/routes/` | API route definitions |
| `/backend/src/controllers/` | HTTP handlers — NO business logic here |
| `/backend/src/services/` | All business logic + AI fallback service |
| `/backend/src/middleware/` | auth, validation, rate limiting, error handler |
| `/backend/src/prompts/` | AI prompt builders — one file per doc type |
| `/frontend/src/store/` | Zustand state management |
| `/frontend/src/api/` | All API call functions — never call axios in components |
| `/frontend/src/components/` | Reusable UI (ui/, layout/, wizard/, workspace/, auth/) |

### 6 Non-Negotiable Rules
| # | Rule |
|---|---|
| 1 | **ALWAYS** use `httpOnly`, `Secure`, `SameSite=Strict` cookies for refresh tokens |
| 2 | AI calls must use the **4-level fallback** cascade — never call providers directly from controllers |
| 3 | Use **Framer Motion** for ALL animations — never CSS transitions |
| 4 | **Zustand** for state — NO Redux, NO Context API for global state |
| 5 | All API responses must use the **structured JSON envelope** `{ success, data, message }` |
| 6 | Use **compound indexes** on MongoDB for every multi-field query pattern |

---

## Table of Contents
1. [Who You Are & What This Project Is](#1-who-you-are--what-this-project-is)
2. [Your Golden Rules](#2-your-golden-rules)
3. [How to Start Every Task](#3-how-to-start-every-task)
4. [Skills System — Read Before You Build](#4-skills-system--read-before-you-build)
5. [Project Structure Map](#5-project-structure-map)
6. [Backend Rules & Patterns](#6-backend-rules--patterns)
7. [Frontend Rules & Patterns](#7-frontend-rules--patterns)
8. [Database Rules](#8-database-rules)
9. [AI Service Rules](#9-ai-service-rules)
10. [Auth Rules](#10-auth-rules)
11. [Error Handling Rules](#11-error-handling-rules)
12. [What You Must NEVER Do](#12-what-you-must-never-do)
13. [Task-Type Playbooks](#13-task-type-playbooks)
14. [How to Ask for Help](#14-how-to-ask-for-help)

---

## 1. Who You Are & What This Project Is

You are an AI coding agent assigned to work on **AiDocs** — a SaaS platform that helps non-technical founders generate professional software documentation using AI.

### What AiDocs Does (In One Paragraph)
A user signs up, fills out a 7-step wizard describing their startup idea, and AiDocs uses a cascading AI service (NVIDIA NIM → OpenRouter fallbacks) to generate a full 9-document suite including PRD, SRD, Tech Stack, DB Schema, User Flows, MVP Plan, Folder Structure, CLAUDE.md, and Agent System Prompts. Users then manage their project in a workspace with a Kanban board, milestones, and an AI Co-founder chat.

### Your Tech Stack (Memorize This)

| Layer | Technology |
|---|---|
| Backend Runtime | Node.js v20 LTS |
| Backend Framework | Express.js v4 |
| Database | MongoDB via Mongoose v8 |
| Frontend Framework | React v18 with Vite v5 |
| Styling | Tailwind CSS v3 |
| State Management | Zustand v4 |
| Animations | Framer Motion v11 |
| AI Providers | NVIDIA NIM + OpenRouter |
| Payments | Stripe |
| Auth | JWT + httpOnly cookies + Google OAuth 2.0 |
| Process Manager | PM2 (cluster mode) |

---

## 2. Your Golden Rules

These rules apply to EVERY task, EVERY file, EVERY line you write.

### Rule 1 — Read Before You Write
Never write code for a feature before reading the relevant documentation. The order is always: **Read Docs → Read Skills → Read Existing Code → Write New Code.**

### Rule 2 — One Responsibility Per File
Every file has exactly one job. A controller only handles HTTP logic. A service only handles business logic. A model only defines the schema. Never mix these.

### Rule 3 — Never Break Existing Behavior
If you are adding a new feature, existing endpoints and components must continue to work exactly as before. Run a mental test: "Does my change break anything that already exists?"

### Rule 4 — Match the Existing Style
Look at the existing code files before writing anything new. Match the naming conventions, file structure, import style, and formatting. Consistency is more important than your personal preference.

### Rule 5 — Environment Variables Only for Secrets
API keys, database URIs, and secrets must ALWAYS come from environment variables. Never hardcode them. Not even temporarily.

### Rule 6 — Validate Everything Coming In
Every piece of data coming from outside (API requests, user input, webhook payloads) must be validated before it touches the database or business logic.

### Rule 7 — Log, Don't Silent-Fail
If something goes wrong, log it. Use `console.error()` at minimum. Silent failures are dangerous in production.

### Rule 8 — Ask Before Deleting
If a task requires deleting or significantly restructuring existing files, stop and confirm with the developer before proceeding.

---

## 3. How to Start Every Task

Follow this checklist for **every single task** you are given, no exceptions.

```
STEP 1 — Understand the Task
  □ Read the task description fully
  □ Identify: is this Backend, Frontend, Database, AI Service, or a mix?
  □ Identify which Module(s) from the SRD are affected (M1–M8)
  □ Write out in plain English what you plan to do BEFORE writing code

STEP 2 — Read the Relevant Documentation
  □ If touching Auth         → Re-read Section 4 (Auth Flow) of TRD
  □ If touching DB           → Re-read Section 3 (DB Schema) of TRD
  □ If touching API          → Re-read Section 5 (API Contracts) of TRD
  □ If touching AI Service   → Re-read Section 6 (AI Architecture) of TRD
  □ If touching Frontend     → Re-read Section 7 (Frontend Architecture) of TRD
  □ Check SRD for the relevant module's Functional Requirements

STEP 3 — Read the Relevant Skills
  □ Open the /skills/ directory
  □ Read the SKILL.md for every skill that applies to your task
  □ Follow the skill instructions exactly — they override your defaults

STEP 4 — Read Existing Code
  □ Open the existing file(s) you will be modifying or extending
  □ Read the full file — not just the relevant section
  □ Identify patterns and conventions used

STEP 5 — Plan Your Changes
  □ List every file you will create or modify
  □ Confirm no existing behavior will break
  □ Confirm all new inputs will be validated
  □ Confirm all new errors are handled

STEP 6 — Write the Code
  □ Write one logical section at a time
  □ Follow all rules in this document
  □ Add comments for non-obvious logic only

STEP 7 — Self-Review
  □ Read your own code once before submitting
  □ Check: Did I hardcode any secret? → Fix it
  □ Check: Did I skip any validation? → Fix it
  □ Check: Did I handle all error cases? → Fix it
  □ Check: Did I match the existing code style? → Fix it
```

---

## 4. Skills System — Read Before You Build

This project uses a **Skills System** — a set of pre-written guides that teach you the correct, proven way to accomplish specific types of tasks. Skills are stored in the `/skills/` directory at the project root.

### 4.1 What Is a Skill?

A skill is a markdown file (SKILL.md) that contains:
- Exact steps to follow for a specific type of task
- Common mistakes to avoid
- Patterns that have already been tested and approved for this project
- Examples of correct output

Think of skills as senior developer instructions written specifically for this codebase.

### 4.2 How to Use Skills

**Rule: Before starting any task, check if a relevant skill exists. If it does, read it completely before writing a single line.**

```
Task Assignment Received
        │
        ▼
Open /skills/ directory
        │
        ▼
Does a relevant SKILL.md exist for this task type?
   │                          │
  YES                         NO
   │                          │
   ▼                          ▼
Read SKILL.md            Proceed with
completely               this CLAUDE.md
   │                     as your guide
   ▼
Follow skill instructions
(Skills override your defaults)
```

### 4.3 Skill Directory Map

| Skill Folder | When to Use It |
|---|---|
| `/skills/api-endpoint/` | Any time you are creating or modifying a backend API route |
| `/skills/mongoose-schema/` | Any time you are creating or modifying a MongoDB schema |
| `/skills/auth-middleware/` | Any time you are touching authentication or authorization logic |
| `/skills/react-component/` | Any time you are building a new React component |
| `/skills/zustand-store/` | Any time you are modifying or adding to a Zustand store |
| `/skills/ai-prompt/` | Any time you are writing or editing an AI generation prompt |
| `/skills/stripe-integration/` | Any time you are touching Stripe payment or webhook logic |
| `/skills/error-handling/` | Any time you are adding error handling to a new module |
| `/skills/validation/` | Any time you are writing request body validation schemas |
| `/skills/frontend-design/` | Any time you are building UI — for design tokens, colors, component style |

### 4.4 If a Skill Contradicts This Document

**The Skill wins.** Skills are task-specific and have been updated more recently than this general guide. Follow the skill exactly, then note the contradiction so the developer can update this document.

### 4.5 If No Skill Exists for Your Task

Proceed using this CLAUDE.md as your guide. After completing the task, suggest to the developer that a new skill should be created for it to help future agents.

---

## 5. Project Structure Map

```
aidocs/
├── backend/
│   ├── src/
│   │   ├── controllers/       ← HTTP request handlers only (no business logic here)
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── projectController.js
│   │   │   ├── documentController.js
│   │   │   └── subscriptionController.js
│   │   ├── services/          ← All business logic lives here
│   │   │   ├── AIService.js         (fallback cascade, provider management)
│   │   │   ├── authService.js       (token generation, password logic)
│   │   │   ├── projectService.js    (project CRUD, limit checks)
│   │   │   ├── documentService.js   (generation pipeline, saving)
│   │   │   └── stripeService.js     (checkout, webhook handling)
│   │   ├── models/            ← Mongoose schema definitions only
│   │   │   ├── User.js
│   │   │   ├── Project.js
│   │   │   ├── Document.js
│   │   │   ├── Subscription.js
│   │   │   └── Notification.js
│   │   ├── routes/            ← Route definitions and middleware attachment
│   │   │   ├── authRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── projectRoutes.js
│   │   │   ├── documentRoutes.js
│   │   │   └── subscriptionRoutes.js
│   │   ├── middleware/        ← Reusable middleware functions
│   │   │   ├── authenticate.js      (JWT verification)
│   │   │   ├── authorizeAdmin.js    (role check)
│   │   │   ├── validateRequest.js   (Joi/Zod schema validation)
│   │   │   ├── rateLimiter.js       (all rate limiters defined here)
│   │   │   └── errorHandler.js      (global error handler)
│   │   ├── prompts/           ← AI prompt builders, one file per doc type
│   │   │   ├── prdPrompt.js
│   │   │   ├── srdPrompt.js
│   │   │   ├── techStackPrompt.js
│   │   │   └── ... (one per doc type)
│   │   ├── utils/             ← Shared helper functions
│   │   │   ├── AppError.js          (custom error class)
│   │   │   ├── asyncWrapper.js      (wraps async route handlers)
│   │   │   └── tokenUtils.js        (JWT sign/verify helpers)
│   │   ├── config/
│   │   │   ├── db.js                (MongoDB connection)
│   │   │   └── passport.js          (Google OAuth strategy)
│   │   └── server.js          ← Express app setup and startup
│   ├── .env                   ← Never commit this
│   ├── .env.example           ← Commit this (no real secrets)
│   └── ecosystem.config.js    ← PM2 configuration
│
├── frontend/
│   ├── src/
│   │   ├── api/               ← All API call functions (no fetch/axios in components)
│   │   │   ├── axiosInstance.js     (configured client + interceptors)
│   │   │   ├── authApi.js
│   │   │   ├── projectApi.js
│   │   │   └── documentApi.js
│   │   ├── components/        ← Reusable UI building blocks
│   │   │   ├── ui/                  (Button, Input, Modal, Badge, Tooltip, etc.)
│   │   │   ├── layout/              (Navbar, Sidebar, PageWrapper)
│   │   │   ├── wizard/              (Step0 through Step7 components)
│   │   │   ├── workspace/           (Kanban, Milestone, DocViewer, ChatPanel)
│   │   │   └── auth/                (LoginForm, RegisterForm, GoogleOAuthButton)
│   │   ├── pages/             ← One file per route/page
│   │   │   ├── Landing.jsx
│   │   │   ├── Auth.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Wizard.jsx
│   │   │   ├── Workspace.jsx
│   │   │   └── Settings.jsx
│   │   ├── store/             ← Zustand global state
│   │   │   ├── authStore.js
│   │   │   ├── projectStore.js
│   │   │   └── uiStore.js
│   │   ├── hooks/             ← Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useProject.js
│   │   │   └── useTokenRefresh.js
│   │   └── utils/             ← Frontend helpers
│   │       ├── validators.js
│   │       ├── formatters.js
│   │       └── constants.js
│   ├── .env                   ← Never commit this
│   └── .env.example
│
├── docs/                      ← All project documentation
│   ├── PRD.md                 (Product Requirements Document)
│   ├── TRD.md                 (Technical Requirements Document)
│   └── SRD.md                 (Software Requirements Document)
│
└── skills/                    ← READ BEFORE BUILDING ANYTHING
    ├── api-endpoint/SKILL.md
    ├── mongoose-schema/SKILL.md
    ├── react-component/SKILL.md
    ├── zustand-store/SKILL.md
    ├── ai-prompt/SKILL.md
    ├── auth-middleware/SKILL.md
    ├── stripe-integration/SKILL.md
    ├── error-handling/SKILL.md
    ├── validation/SKILL.md
    └── frontend-design/SKILL.md
```

---

## 6. Backend Rules & Patterns

### 6.1 The Layer Rule — Know Your Place

Every backend file has exactly one job. If you are unsure where to put logic, use this table:

| Type of Logic | Where It Goes | Example |
|---|---|---|
| Receive HTTP request, send response | `controllers/` | Parse req.body, call service, return res.json() |
| Business rules and decisions | `services/` | Check if user has reached project limit |
| Database queries | `services/` (calling models) | Project.findOne({ userId }) |
| Schema definition | `models/` | Define fields, types, validators, indexes |
| Route definition | `routes/` | app.post('/api/projects', authenticate, controller) |
| JWT verification | `middleware/authenticate.js` | Verify token, attach req.user |
| Input validation | `middleware/validateRequest.js` | Run Joi/Zod schema against req.body |
| Rate limiting | `middleware/rateLimiter.js` | Apply limits per route group |
| Error creation | `utils/AppError.js` | throw new AppError('Not found', 404, 'NOT_FOUND') |

### 6.2 Async Wrapper Rule

Every async route handler must be wrapped in the `asyncWrapper` utility. This prevents unhandled promise rejections from crashing the server.

```
Every route: asyncWrapper(async (req, res, next) => { ... })
Never use:   try/catch inside the controller itself
Let:         The global errorHandler catch all errors
```

### 6.3 Route Naming Convention

All routes follow REST conventions:

| Action | Method | URL Pattern |
|---|---|---|
| List items | GET | `/api/resource` |
| Get single | GET | `/api/resource/:id` |
| Create | POST | `/api/resource` |
| Update | PATCH | `/api/resource/:id` |
| Delete | DELETE | `/api/resource/:id` |
| Trigger action | POST | `/api/resource/:id/action-name` |

### 6.4 Middleware Order on Routes

Every protected route must have middleware in this exact order:

```
Route Definition Order:
1. rateLimiter (if applicable)
2. authenticate (JWT check)
3. authorizeAdmin (if admin-only)
4. validateRequest (body validation)
5. controller function
```

### 6.5 Response Format — Always Use This Envelope

```
Success: { success: true,  data: { ... }, message: "..." }
Error:   { success: false, error: "...", code: "...", details: [...] }
```

Never return raw objects. Always use the envelope format.

---

## 7. Frontend Rules & Patterns

### 7.1 Component Rules

| Rule | Correct | Wrong |
|---|---|---|
| API calls | Only in `api/` files or custom hooks | Directly in a component |
| Global state | Only in `store/` via Zustand | useState for shared data |
| Page-level logic | In `pages/` files | In UI components |
| Reusable UI | In `components/ui/` | Inline everywhere |
| Direct DOM manipulation | Never | Never |

### 7.2 Zustand Store Rules

- Each store has one clear domain: auth, projects, or UI
- Actions (functions that update state) live inside the store — not in components
- Components only call store actions — they never mutate state directly
- Always use `useAuthStore.getState()` for reading store values outside of React components (e.g., in Axios interceptors)

### 7.3 Axios Rules

- Never import `axios` directly in a component or page — always use `axiosInstance`
- The `axiosInstance` handles: attaching the auth token, silent token refresh on 401, and global error routing
- All API functions must live in the `api/` folder, organized by resource
- API functions return the `data` field from the response — not the raw Axios response object

### 7.4 Styling Rules

- Use Tailwind CSS utility classes only — no inline styles, no custom CSS files unless the design skill explicitly requires it
- Before building any UI component, read `/skills/frontend-design/SKILL.md` for the project's design tokens, color palette, and component style guide
- Use Framer Motion for all transitions and interactive feedback — not CSS transitions
- The design system uses Glassmorphism + premium dark mode — all new components must match this aesthetic

### 7.5 Routing Rules

- All routes are defined in `App.jsx`
- Protected routes must check `isAuthenticated` from `authStore` — redirect to `/auth` if false
- Use React Router `<Navigate>` for redirects — not `window.location.href` (except after logout)

---

## 8. Database Rules

### 8.1 Query Safety Rules

| Rule | Why |
|---|---|
| Always filter by `userId` in every query | Users must never see each other's data |
| Always validate ObjectId format before querying | Prevents MongoDB CastError crashes |
| Never use `.find()` without a filter | Full collection scans will kill performance |
| Always use `.lean()` for read-only queries | Returns plain JS objects, faster than Mongoose documents |
| Always use `upsert` for document saves during generation | Prevents duplicate documents if generation retries |

### 8.2 Index Rules

- Never add a new query pattern without also adding the appropriate index to the schema
- Compound indexes must match the exact field order used in the query
- All foreign key fields (userId, projectId) must be indexed

### 8.3 Schema Change Rules

- Never remove a field from an existing schema without confirming the impact on existing data
- Always add new optional fields with a `default` value
- Never rename an existing field — add a new one and migrate data in a separate step

---

## 9. AI Service Rules

### 9.1 Never Call AI Providers Directly from a Controller

All AI calls must go through `services/AIService.js`. This is the only file that knows about providers, API keys, and the fallback cascade.

### 9.2 Prompt Rules

- Every document type has its own prompt file in `/prompts/`
- Each prompt file exports a single function that takes `wizardAnswers` and returns `{ system, user }`
- System prompts must instruct the model to return ONLY the document content — no preamble, no explanation
- Never concatenate user input directly into a prompt without sanitization

### 9.3 Fallback Rules

- The fallback order is fixed: NVIDIA 405B → OpenRouter 405B → OpenRouter 70B → NVIDIA Nemotron 70B
- Do NOT change the fallback order without explicit developer approval
- Auth failures (401, 403) from a provider must be skipped immediately — no retry on the same provider
- A 1.5-second delay must be maintained between provider attempts

### 9.4 Generation Pipeline Rules

- Documents must be generated and saved one at a time — not all in memory first
- The generation order is fixed (see SRD Section 2.5.2) — later docs depend on earlier ones
- If any single document fails after all fallbacks, continue generating the remaining documents — do not abort the entire pipeline
- Update `project.docsGenerated[]` after each successful document save

---

## 10. Auth Rules

### 10.1 Token Rules — Critical

| Token | Storage Location | Lifetime | Who Manages It |
|---|---|---|---|
| Access Token | JavaScript memory only (Zustand store) | 15 minutes | Frontend axiosInstance |
| Refresh Token | httpOnly cookie only | 7 days | Backend sets/clears |

**NEVER:**
- Store the access token in `localStorage` or `sessionStorage`
- Return the refresh token in the JSON response body
- Store the raw refresh token in the database (only the bcrypt hash)
- Set the cookie without `httpOnly: true`, `secure: true`, and `sameSite: 'strict'`

### 10.2 Middleware Rule

Every protected API route must have the `authenticate` middleware applied. The middleware extracts `userId` and `role` and attaches them to `req.user`. Controllers must use `req.user.userId` — never trust a userId from `req.body` or `req.params` for ownership checks.

### 10.3 Ownership Enforcement Rule

Every database query for a user-owned resource must include both the resource ID AND the userId:

```
Correct: Project.findOne({ _id: projectId, userId: req.user.userId })
Wrong:   Project.findOne({ _id: projectId })
```

The wrong pattern allows any authenticated user to access any project if they know its ID.

---

## 11. Error Handling Rules

### 11.1 Backend Error Rules

- Always throw `AppError` instances — never throw raw strings or generic `Error` objects
- `AppError` takes three arguments: message (user-facing), HTTP status code, machine-readable code
- The global `errorHandler` in `middleware/errorHandler.js` catches all errors — you do not need try/catch in controllers
- In production (`NODE_ENV=production`), never expose stack traces in the response

### 11.2 Error Code Reference

Always use the exact error codes defined in TRD Section 9.2. Do not invent new codes without adding them to the TRD.

| When | Use This Code |
|---|---|
| Validation fails | `VALIDATION_ERROR` |
| Token expired | `TOKEN_EXPIRED` |
| Token invalid | `TOKEN_INVALID` |
| Free plan limit hit | `PLAN_LIMIT_REACHED` |
| Resource not found | `NOT_FOUND` |
| Email already used | `EMAIL_TAKEN` |
| Generation already running | `ALREADY_GENERATING` |
| All AI providers failed | `GENERATION_FAILED` |

### 11.3 Frontend Error Rules

- Handle errors in the Axios response interceptor in `axiosInstance.js` — not in individual components
- Use the error `code` field from the response to route to the correct UI action (show modal, toast, redirect)
- Never show raw error messages or stack traces to the user

---

## 12. What You Must NEVER Do

Read this list before submitting any work.

| ❌ Never Do This | ✅ Do This Instead |
|---|---|
| Hardcode an API key, secret, or URI anywhere | Use `process.env.VARIABLE_NAME` |
| Store the access token in localStorage | Keep it in Zustand memory only |
| Make an API call directly from a React component | Use a function from the `api/` folder |
| Put business logic in a controller | Move it to the `services/` layer |
| Query MongoDB without filtering by userId | Always add `userId: req.user.userId` |
| Create a new Mongoose schema without indexes | Add compound indexes for all query patterns |
| Call an AI provider directly from a controller | Use `AIService.generate()` only |
| Change the fallback cascade order | Never — this requires developer approval |
| Skip input validation on a new endpoint | Always apply `validateRequest` middleware |
| Use `console.log` for errors | Use `console.error` for errors |
| Delete a field from an existing Mongoose schema | Add a new field — never remove |
| Use inline styles in React | Use Tailwind utility classes only |
| Throw a generic `new Error()` in backend | Throw `new AppError(message, status, code)` |
| Return data without the response envelope | Always use `{ success, data, message }` |
| Commit the `.env` file | Only commit `.env.example` |
| Skip reading the relevant Skill before building | Always read the Skill first |
| Use `window.location.href` for navigation | Use React Router's `useNavigate` |
| Store Stripe card data anywhere | Stripe handles all card data — never touch it |

---

## 13. Task-Type Playbooks

Use the correct playbook based on what type of task you have been assigned.

---

### Playbook A — Adding a New API Endpoint

```
1. Read /skills/api-endpoint/SKILL.md
2. Read /skills/validation/SKILL.md
3. Identify the module (M1–M8) this endpoint belongs to
4. Add the validation schema to middleware/validateRequest.js
5. Add the route to the correct routes/ file with all required middleware
6. Add the controller function to the correct controllers/ file
7. Add the business logic to the correct services/ file
8. Test the happy path: correct input → correct response
9. Test the error paths: missing field, unauthorized, resource not found
10. Update API Contracts in TRD if the endpoint is new
```

---

### Playbook B — Adding a New Mongoose Schema or Field

```
1. Read /skills/mongoose-schema/SKILL.md
2. Define the schema fields with correct types, required flags, and defaults
3. Add validation rules directly in the schema (min, max, enum, match)
4. Add all necessary indexes (single and compound)
5. If adding to an existing schema, add the new field as optional with a default
6. If the new schema has a relation to another collection, add a ref field
7. Export the model and import it only in service files — never directly in controllers
```

---

### Playbook C — Building a New React Component

```
1. Read /skills/react-component/SKILL.md
2. Read /skills/frontend-design/SKILL.md (for design tokens and style)
3. Determine: Is this a UI primitive (→ components/ui/) or a feature component (→ components/feature/)?
4. Build the component with no direct API calls — accept data via props or read from Zustand
5. Use Tailwind classes only for styling
6. Use Framer Motion for any animation or transition
7. Export as a named export
8. Test: Does it render correctly? Does it handle empty/loading/error states?
```

---

### Playbook D — Adding or Modifying a Zustand Store

```
1. Read /skills/zustand-store/SKILL.md
2. Identify which store this belongs to: auth, project, or ui
3. Add state fields with correct default values
4. Add action functions inside the store definition
5. Never put async API calls directly in the store — call API functions from the component/hook, then update the store
6. If adding a new store, register it and import it in the relevant components
```

---

### Playbook E — Writing or Editing an AI Prompt

```
1. Read /skills/ai-prompt/SKILL.md
2. Identify which document type this prompt generates
3. Create or edit the file in /prompts/ folder
4. System prompt must: define the AI's role, specify the output format (Markdown), list required sections, say "Output ONLY the document"
5. User prompt must: inject all relevant wizardAnswers fields cleanly
6. Test the prompt with a sample wizardAnswers object — check that the output matches the expected document structure
7. Never mix prompt logic with the AIService fallback logic
```

---

### Playbook F — Touching Stripe / Subscription Logic

```
1. Read /skills/stripe-integration/SKILL.md
2. NEVER modify how webhook signature verification works
3. NEVER process a webhook event without first verifying the signature
4. For checkout: always create a Stripe Customer first, then a Checkout Session
5. For webhooks: handle only the 4 defined event types — log and ignore anything else
6. Always update the subscription record in MongoDB after a successful Stripe event
7. Test with Stripe CLI in local dev — never use live keys for testing
```

---

### Playbook G — Adding Authentication or Authorization

```
1. Read /skills/auth-middleware/SKILL.md
2. New protected routes must always include the authenticate middleware
3. Admin-only routes must include both authenticate AND authorizeAdmin
4. Never create a custom auth check inside a controller — use the middleware
5. If adding a new role, add it to the User schema enum AND update the permissions matrix in CLAUDE.md and SRD
```

---

## 14. How to Ask for Help

If you are blocked, uncertain, or the task is ambiguous, do the following in order:

### Step 1 — Check the Docs
Re-read the relevant section of:
- This CLAUDE.md file
- The TRD (Technical Requirements Document)
- The SRD (Software Requirements Document)
- The relevant Skill file

### Step 2 — State Your Uncertainty Clearly
Do not guess and proceed. Instead, stop and output a clear message in this format:

```
BLOCKED: [Short description of what you're trying to do]

What I've tried:
- [Thing 1]
- [Thing 2]

What I'm uncertain about:
- [Specific question 1]
- [Specific question 2]

My best guess (if I had to proceed):
- [Your proposed approach]

Do you want me to proceed with my guess, or can you clarify?
```

### Step 3 — Never Proceed with a Destructive Action Under Uncertainty

If the task involves: deleting data, dropping a collection, changing auth logic, modifying the Stripe webhook, or changing the AI fallback cascade — **stop completely and wait for human confirmation.**

---

*This document is the master operating guide for every AI agent working on AiDocs.*  
*Every agent must read it fully before starting their first task.*  
*Last Updated: March 2026*  
*If anything in this document conflicts with a Skill file, the Skill file wins.*

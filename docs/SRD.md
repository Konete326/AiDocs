# 📗 Software Requirements Document (SRD) — AiDocs
## Version 1.0 | Technical Master Guide (No Code)

**Title:** AiDocs — Software Requirements Document  
**Tone:** Technical, No Code  
**Audience:** Developers, Freelancers, AI Coding Agents, Product Managers  
**Status:** Active Development  
**Date:** March 2026  
**Linked PRD:** AiDocs PRD v2.1  
**Linked TRD:** AiDocs TRD v1.0

---

## Table of Contents
1. [System Modules Overview](#1-system-modules-overview)
2. [Module-wise Functional Requirements](#2-module-wise-functional-requirements)
3. [Non-Functional Requirements](#3-non-functional-requirements)
4. [API Behavior — Plain English](#4-api-behavior--plain-english)
5. [User Roles & Permissions Matrix](#5-user-roles--permissions-matrix)
6. [Integration Requirements](#6-integration-requirements)
7. [Constraints & Assumptions](#7-constraints--assumptions)
8. [Glossary of Terms](#8-glossary-of-terms)

---

## 1. System Modules Overview

AiDocs is divided into **8 core system modules**. Each module has a clearly defined responsibility. No module overlaps with another's job.

| # | Module Name | Responsibility | Depends On |
|---|---|---|---|
| M1 | **Auth Module** | User registration, login, token management, Google OAuth | Database |
| M2 | **User Module** | Profile management, account settings | Auth Module |
| M3 | **Subscription Module** | Plan management, limits enforcement, Stripe billing | Auth Module, Stripe |
| M4 | **Project Module** | Project creation, wizard answers storage, project lifecycle | Auth Module, Subscription Module |
| M5 | **Document Generation Module** | AI document creation, fallback cascade, doc storage | Project Module, AI Service |
| M6 | **Workspace Module** | Kanban board, milestone tracker, AI Co-founder chat | Project Module, Document Module |
| M7 | **Notification Module** | In-app alerts for doc readiness, errors, plan changes | All Modules |
| M8 | **AI Service Layer** | LLM provider management, fallback logic, prompt execution | External AI Providers |

---

### 1.1 How Modules Connect (Flow Summary)

```
User visits AiDocs
      │
      ▼
[M1 Auth] → User logs in / registers
      │
      ▼
[M2 User] → Profile is loaded
      │
      ▼
[M3 Subscription] → Plan type is checked (Free / Pro / Team)
      │
      ▼
[M4 Project] → User creates a project via 7-step wizard
      │
      ▼
[M5 Doc Generation] → AI generates 9 documents using [M8 AI Service]
      │
      ▼
[M6 Workspace] → User accesses Kanban, Milestones, Chat
      │
      ▼
[M7 Notifications] → User is alerted at every key event
```

---

## 2. Module-wise Functional Requirements

---

### M1 — Auth Module

**Purpose:** Controls who can access the system and verifies their identity at every step.

#### 2.1.1 Registration Requirements

| Requirement ID | Requirement | Priority |
|---|---|---|
| AUTH-01 | System must accept email, password, and display name during registration | Must Have |
| AUTH-02 | System must reject duplicate email addresses with a clear error | Must Have |
| AUTH-03 | Password must meet complexity rules (min 8 chars, 1 uppercase, 1 number, 1 special character) | Must Have |
| AUTH-04 | System must hash the password before saving — plain text passwords must never be stored | Must Have |
| AUTH-05 | System must create a default Free subscription record for every new user | Must Have |
| AUTH-06 | System should send a verification email after registration (Phase 2) | Should Have |

---

#### 2.1.2 Login Requirements

| Requirement ID | Requirement | Priority |
|---|---|---|
| AUTH-07 | System must verify email and password combination | Must Have |
| AUTH-08 | System must return a short-lived Access Token (15 minutes) on successful login | Must Have |
| AUTH-09 | System must issue a long-lived Refresh Token (7 days) stored in a secure, httpOnly cookie | Must Have |
| AUTH-10 | Access Token must never be stored in browser localStorage or sessionStorage | Must Have |
| AUTH-11 | System must lock out an IP after 10 failed login attempts within 15 minutes | Must Have |
| AUTH-12 | System must return a specific error code (not a generic message) for wrong password vs. user not found | Should Have |

---

#### 2.1.3 Token Refresh Requirements

| Requirement ID | Requirement | Priority |
|---|---|---|
| AUTH-13 | When Access Token expires, system must automatically issue a new one using the Refresh Token cookie | Must Have |
| AUTH-14 | Refresh Token must be validated against a stored hash — the raw token is never stored in the database | Must Have |
| AUTH-15 | System must invalidate the Refresh Token upon logout | Must Have |
| AUTH-16 | System should rotate the Refresh Token on each refresh (issue new token, invalidate old) | Should Have |

---

#### 2.1.4 Google OAuth Requirements

| Requirement ID | Requirement | Priority |
|---|---|---|
| AUTH-17 | System must support "Sign in with Google" via OAuth 2.0 | Must Have |
| AUTH-18 | If a Google account email already exists in the system, the system must link the accounts — not create a duplicate | Must Have |
| AUTH-19 | Google OAuth users must not be required to set a password | Must Have |
| AUTH-20 | After Google login, the same token flow (Access + Refresh) must apply as email login | Must Have |

---

### M2 — User Module

**Purpose:** Allows users to view and update their personal information.

| Requirement ID | Requirement | Priority |
|---|---|---|
| USER-01 | User must be able to view their profile (name, email, avatar, plan, join date) | Must Have |
| USER-02 | User must be able to update their display name | Must Have |
| USER-03 | User must be able to update their avatar URL | Should Have |
| USER-04 | User must NOT be able to change their email address (security constraint) | Must Have |
| USER-05 | System must return the user's current subscription plan alongside their profile data | Must Have |

---

### M3 — Subscription Module

**Purpose:** Controls what features each user can access based on their payment plan.

#### 2.3.1 Plan Definitions

| Feature | Free Plan | Pro Plan | Team Plan |
|---|---|---|---|
| Projects allowed | 3 | Unlimited | Unlimited |
| Documents per project | All 9 | All 9 | All 9 |
| ZIP download | ❌ | ✅ | ✅ |
| Edit documents | ❌ | ✅ | ✅ |
| AI Co-founder Chat | Limited (5 msgs/day) | Unlimited | Unlimited |
| Team members | 1 (solo) | 1 (solo) | Up to 10 |
| Priority AI generation | ❌ | ✅ | ✅ |

---

#### 2.3.2 Subscription Functional Requirements

| Requirement ID | Requirement | Priority |
|---|---|---|
| SUB-01 | System must enforce project limits based on the user's active plan before project creation | Must Have |
| SUB-02 | System must block document editing for Free plan users with a plan upgrade prompt | Must Have |
| SUB-03 | System must process payments via Stripe Checkout — no custom payment forms | Must Have |
| SUB-04 | System must listen to Stripe webhook events to update subscription status in real-time | Must Have |
| SUB-05 | If a subscription is canceled or payment fails, system must downgrade user to Free plan automatically | Must Have |
| SUB-06 | System must never hard-delete a user's projects when they downgrade — only restrict new creation | Must Have |
| SUB-07 | System must display the user's current plan and renewal date in the Settings page | Should Have |

---

### M4 — Project Module

**Purpose:** Manages the full lifecycle of a user's project — from creation through the wizard to archival.

#### 2.4.1 Project Creation Requirements

| Requirement ID | Requirement | Priority |
|---|---|---|
| PROJ-01 | User must complete a 7-step wizard to create a project | Must Have |
| PROJ-02 | Wizard Step 0 must offer project type selection (SaaS, Mobile, AI, E-commerce, Marketplace, Other) | Must Have |
| PROJ-03 | Problem Statement field is required — minimum 20 characters | Must Have |
| PROJ-04 | Target Audience field is required — minimum 10 characters | Must Have |
| PROJ-05 | Core Features must have at least 1 entry and no more than 10 | Must Have |
| PROJ-06 | Timeline, Tech Preference, and Additional Context are optional fields | Must Have |
| PROJ-07 | System must save wizard answers to the database before triggering generation | Must Have |
| PROJ-08 | System must check subscription project limit before allowing project creation | Must Have |

---

#### 2.4.2 Project Lifecycle Requirements

| Requirement ID | Requirement | Priority |
|---|---|---|
| PROJ-09 | Project must move through statuses: Draft → Generating → Complete (or Error) | Must Have |
| PROJ-10 | User must be able to view all their projects in a dashboard list with pagination | Must Have |
| PROJ-11 | User must be able to archive a project (soft delete — data is kept) | Must Have |
| PROJ-12 | User must be able to permanently delete a project and all its documents | Must Have |
| PROJ-13 | System must prevent a second generation from starting if one is already in progress | Must Have |
| PROJ-14 | User must be able to update the project title after creation | Should Have |

---

### M5 — Document Generation Module

**Purpose:** Orchestrates the AI-powered generation of all 9 document types for a project.

#### 2.5.1 Generation Requirements

| Requirement ID | Requirement | Priority |
|---|---|---|
| DOC-01 | System must generate all 9 document types in a dependency-aware order | Must Have |
| DOC-02 | Each document must be saved to the database as it is generated — not all at once at the end | Must Have |
| DOC-03 | System must record which AI model was used to generate each document | Must Have |
| DOC-04 | System must record how long each document took to generate (in milliseconds) | Should Have |
| DOC-05 | User must be able to request regeneration of a specific document type individually | Should Have |
| DOC-06 | Pro plan users must be able to manually edit document content in the workspace | Should Have |
| DOC-07 | System must version documents — each edit or regeneration creates a new version | Should Have |
| DOC-08 | Free plan users must be able to view all documents but not download as ZIP | Must Have |

---

#### 2.5.2 Document Generation Order

Documents are generated in a specific order because later documents depend on earlier ones:

| Order | Document Type | Why This Position |
|---|---|---|
| 1st | PRD | Foundation — all other docs reference this |
| 2nd | SRD | Defines system requirements from PRD features |
| 3rd | Tech Stack | Chosen based on SRD requirements |
| 4th | DB Schema | Designed based on features and tech stack |
| 5th | User Flows | Step-by-step logic derived from PRD features |
| 6th | Folder Structure | Depends on the chosen tech stack |
| 7th | MVP Plan | Synthesizes all above into a phased plan |
| 8th | Claude Context (CLAUDE.md) | Summary of all docs for AI agents |
| 9th | Agent System Prompts | Instructions for AI coding agents |

---

### M6 — Workspace Module

**Purpose:** Provides the interactive project workspace after documents are generated.

#### 2.6.1 Kanban Board Requirements

| Requirement ID | Requirement | Priority |
|---|---|---|
| WORK-01 | Workspace must display a Kanban board with default columns: To Do, In Progress, Done | Must Have |
| WORK-02 | User must be able to drag and drop feature cards between columns | Must Have |
| WORK-03 | Kanban state must persist in the database — refreshing the page must not reset it | Must Have |
| WORK-04 | User must be able to add, rename, and delete custom columns | Should Have |

---

#### 2.6.2 Milestone Tracker Requirements

| Requirement ID | Requirement | Priority |
|---|---|---|
| WORK-05 | User must be able to add milestones with a title and due date | Must Have |
| WORK-06 | User must be able to mark milestones as complete | Must Have |
| WORK-07 | System should highlight overdue milestones visually (past due date, not complete) | Should Have |

---

#### 2.6.3 AI Co-founder Chat Requirements

| Requirement ID | Requirement | Priority |
|---|---|---|
| WORK-08 | AI Chat must have full context of the project's generated documents | Must Have |
| WORK-09 | Free plan users are limited to 5 messages per day in the AI Chat | Must Have |
| WORK-10 | Pro and Team users must have unlimited AI Chat messages | Must Have |
| WORK-11 | Conversation history must be maintained within a session | Must Have |
| WORK-12 | System must use the same AI fallback cascade as document generation for chat | Must Have |

---

### M7 — Notification Module

**Purpose:** Keeps the user informed of important system events in real time.

| Notification Type | Trigger Event | Delivery |
|---|---|---|
| `doc_ready` | A document finishes generating | In-app alert |
| `generation_failed` | All AI providers failed for a document | In-app alert + error state |
| `plan_upgraded` | Stripe confirms successful payment | In-app alert |
| `milestone_due` | Milestone due date is today or past | In-app alert |
| `system` | Admin broadcasts a platform message | In-app alert |

| Requirement ID | Requirement | Priority |
|---|---|---|
| NOTIF-01 | System must create a notification record in the database for each trigger event | Must Have |
| NOTIF-02 | User must be able to mark notifications as read | Must Have |
| NOTIF-03 | Unread notification count must be visible in the navigation bar | Must Have |
| NOTIF-04 | System should support real-time delivery via WebSockets or polling (Phase 2) | Should Have |

---

### M8 — AI Service Layer

**Purpose:** Manages all communication with external AI providers and ensures 100% uptime via a fallback cascade.

| Requirement ID | Requirement | Priority |
|---|---|---|
| AI-01 | System must attempt document generation with the Primary provider first (NVIDIA NIM — Llama 405B) | Must Have |
| AI-02 | If the Primary fails, system must automatically try Backup 1 (OpenRouter — Llama 405B) | Must Have |
| AI-03 | If Backup 1 fails, system must try Backup 2 (OpenRouter — Llama 70B) | Must Have |
| AI-04 | If Backup 2 fails, system must try Deep Backup (NVIDIA — Nemotron 70B) | Must Have |
| AI-05 | If ALL providers fail, system must set the project status to "error" and notify the user | Must Have |
| AI-06 | System must NOT retry a provider that returns an authentication error (401/403) — skip immediately | Must Have |
| AI-07 | System must wait 1.5 seconds between provider attempts to avoid cascading failures | Must Have |
| AI-08 | Each document type must use a dedicated, purpose-built prompt — not a generic one | Must Have |
| AI-09 | System must log which provider was used for each successful generation | Must Have |

---

## 3. Non-Functional Requirements

### 3.1 Performance Requirements

| Requirement ID | Requirement | Target Metric |
|---|---|---|
| PERF-01 | Time to generate a full PRD (first document) | < 30 seconds |
| PERF-02 | Time to generate the complete 9-document suite | < 90 seconds |
| PERF-03 | API response time for non-AI routes (profile, projects list, etc.) | < 300 milliseconds |
| PERF-04 | Dashboard project list must load with pagination — no full table scans | Max 10 items per page |
| PERF-05 | System must handle at least 100 concurrent API requests without degradation | 100 req/15 min per IP |

---

### 3.2 Scalability Requirements

| Requirement ID | Requirement | Approach |
|---|---|---|
| SCALE-01 | Backend must run in cluster mode to use all available CPU cores | PM2 Cluster Mode |
| SCALE-02 | Database must use compound indexes on all high-frequency query fields | MongoDB Compound Indexes |
| SCALE-03 | AI generation must be designed to run asynchronously — it must not block the API response | Async Job Pattern |
| SCALE-04 | System architecture must support horizontal scaling (adding more servers) in the future | Stateless API Design |

---

### 3.3 Reliability Requirements

| Requirement ID | Requirement | Target |
|---|---|---|
| REL-01 | AI document generation uptime (with fallback cascade) | 99.9% |
| REL-02 | Core API (auth, projects, profile) uptime | 99.9% |
| REL-03 | System must recover from a crashed PM2 instance automatically | PM2 auto-restart |
| REL-04 | Database must be hosted on MongoDB Atlas with automatic backups | Atlas Cloud |

---

### 3.4 Usability Requirements

| Requirement ID | Requirement | Priority |
|---|---|---|
| USE-01 | User must be able to generate their first PRD within 60 seconds of completing the wizard | Must Have |
| USE-02 | All error messages shown to the user must be human-readable (not raw error codes) | Must Have |
| USE-03 | The wizard must show a clear progress indicator (Step X of 7) | Must Have |
| USE-04 | Generated documents must be displayed in a clean, readable markdown viewer | Must Have |
| USE-05 | The system must work on mobile browsers (responsive design) | Should Have |

---

### 3.5 Security Requirements

| Requirement ID | Requirement | Priority |
|---|---|---|
| SEC-01 | All API endpoints (except auth and webhooks) must require a valid Access Token | Must Have |
| SEC-02 | Access Token must be stored in JavaScript memory only — never in browser storage | Must Have |
| SEC-03 | Refresh Token must be stored in an httpOnly, Secure, SameSite=Strict cookie | Must Have |
| SEC-04 | All incoming request data must be validated before processing | Must Have |
| SEC-05 | All database queries must filter by the authenticated user's ID (data isolation) | Must Have |
| SEC-06 | All API traffic must use HTTPS only — HTTP must be redirected | Must Have |
| SEC-07 | Stripe webhooks must be verified using the Stripe signature header | Must Have |
| SEC-08 | Passwords must be hashed using bcrypt with a minimum salt round of 12 | Must Have |

---

## 4. API Behavior — Plain English

This section describes what each group of API endpoints does, without any code. Think of it as a plain-English contract between the frontend and backend.

---

### 4.1 Auth API Behavior

| Endpoint | What It Does | What It Returns | What Can Go Wrong |
|---|---|---|---|
| Register | Creates a new user account and a free subscription. Hashes the password before saving. | Confirmation message and the new user's ID | Email already taken, password too weak, missing fields |
| Login | Verifies the user's email and password. Issues an Access Token and sets a Refresh Token cookie. | Access Token + basic user info | Wrong password, user not found, too many attempts |
| Refresh | Reads the Refresh Token from the cookie and issues a new Access Token silently. | New Access Token | Cookie missing, token expired, token tampered |
| Logout | Clears the Refresh Token cookie and invalidates the stored token hash in the database. | Success message | None (always succeeds) |
| Google Login | Redirects to Google, receives profile data, finds or creates a user, then follows the same flow as regular login. | Access Token + user info via redirect | Google auth failure, email conflict |

---

### 4.2 User API Behavior

| Endpoint | What It Does | What It Returns | What Can Go Wrong |
|---|---|---|---|
| Get My Profile | Fetches the current user's profile along with their subscription plan details. | User object with plan info | Invalid or expired token |
| Update My Profile | Allows the user to update their display name or avatar URL. Email cannot be changed. | Updated user object | Invalid token, validation failure |

---

### 4.3 Project API Behavior

| Endpoint | What It Does | What It Returns | What Can Go Wrong |
|---|---|---|---|
| List Projects | Returns all of the current user's projects, paginated. Supports filtering by status and archived state. | Paginated list of projects | Invalid token |
| Create Project | Validates the wizard answers, checks the user's project limit, and saves a new project to the database. | New project ID and status | Plan limit reached, validation error |
| Generate Documents | Triggers async AI document generation for the specified project. Sets status to "generating". | Confirmation + estimated time | Project not found, already generating, unauthorized |
| Get Project | Returns full details of a single project including milestones and Kanban columns. | Full project object | Project not found, not owned by user |
| Update Project | Allows updating the project title, Kanban columns, milestones, or archived state. | Updated project object | Validation error, not found |
| Delete Project | Permanently deletes the project and all its linked documents and notifications. | Success message | Project not found, not owned by user |

---

### 4.4 Document API Behavior

| Endpoint | What It Does | What It Returns | What Can Go Wrong |
|---|---|---|---|
| List Documents | Returns a summary list of all generated documents for a project (no content, just metadata). | List of document summaries | Project not found, invalid token |
| Get Document | Returns the full content of a specific document type for a project. | Full document with markdown content | Document not yet generated, project not found |
| Update Document | Allows Pro/Team users to manually edit a document's content. Saves as a new version. | Updated document | Free plan restriction, validation error |

---

### 4.5 Subscription API Behavior

| Endpoint | What It Does | What It Returns | What Can Go Wrong |
|---|---|---|---|
| Get My Subscription | Returns the user's current plan, status, and billing period dates. | Subscription object | Invalid token |
| Create Checkout | Creates a Stripe Checkout session for upgrading to Pro or Team. | Stripe Checkout URL | Stripe API error, already on target plan |
| Stripe Webhook | Receives Stripe events to update subscription status in the database. Verified by signature. | Simple acknowledgment | Invalid signature, unsupported event type |

---

### 4.6 AI Chat API Behavior

| Endpoint | What It Does | What It Returns | What Can Go Wrong |
|---|---|---|---|
| Send Chat Message | Sends the user's message along with full project document context to the AI. Returns AI response. Enforces daily message limit for Free plan users. | AI reply text + model used | Daily limit reached (Free), AI providers all failed, project not found |

---

## 5. User Roles & Permissions Matrix

AiDocs has three user roles. Each role inherits the permissions of the role below it.

### 5.1 Role Definitions

| Role | Who Has It | Description |
|---|---|---|
| **User** | All registered accounts | Standard platform access |
| **Admin** | Internal team accounts only | Full platform management access |

> Note: Plan type (Free / Pro / Team) controls feature access. Role controls system-level access. These are two separate concepts.

---

### 5.2 Feature Permissions by Plan

| Feature | Free | Pro | Team |
|---|---|---|---|
| Create projects | ✅ (max 3) | ✅ (unlimited) | ✅ (unlimited) |
| Generate all 9 documents | ✅ | ✅ | ✅ |
| View all documents | ✅ | ✅ | ✅ |
| Edit documents | ❌ | ✅ | ✅ |
| Download documents as ZIP | ❌ | ✅ | ✅ |
| AI Co-founder Chat | ✅ (5 msg/day) | ✅ (unlimited) | ✅ (unlimited) |
| Kanban Board | ✅ | ✅ | ✅ |
| Milestone Tracker | ✅ | ✅ | ✅ |
| Invite team members | ❌ | ❌ | ✅ (up to 10) |
| Priority AI generation | ❌ | ✅ | ✅ |
| Export to GitHub (Phase 3) | ❌ | ✅ | ✅ |

---

### 5.3 System-Level Permissions by Role

| Action | User | Admin |
|---|---|---|
| Access own profile | ✅ | ✅ |
| Manage own projects | ✅ | ✅ |
| View other users' projects | ❌ | ✅ |
| View platform-wide analytics | ❌ | ✅ |
| Broadcast system notifications | ❌ | ✅ |
| Access admin dashboard | ❌ | ✅ |
| Manually change user plan | ❌ | ✅ |
| Delete any project/user | ❌ | ✅ |

---

## 6. Integration Requirements

### 6.1 Google OAuth 2.0

| Requirement ID | Requirement |
|---|---|
| INT-G-01 | System must register AiDocs as an OAuth 2.0 application in Google Cloud Console |
| INT-G-02 | System must request only the necessary OAuth scopes: `email` and `profile` |
| INT-G-03 | System must handle both new user creation and existing account linking via Google login |
| INT-G-04 | Google OAuth callback URL must be registered in Google Console and match the backend route exactly |
| INT-G-05 | System must never store the Google OAuth access token — only the Google User ID for account linking |

---

### 6.2 Stripe (Payment Processing)

| Requirement ID | Requirement |
|---|---|
| INT-S-01 | All payment processing must go through Stripe Checkout — no custom card form is allowed |
| INT-S-02 | System must create a Stripe Customer record for each user when they first initiate checkout |
| INT-S-03 | System must store the Stripe Customer ID and Subscription ID in the user's subscription record |
| INT-S-04 | System must listen to and handle the following Stripe webhook events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed` |
| INT-S-05 | `checkout.session.completed` → Upgrade user plan to Pro or Team |
| INT-S-06 | `customer.subscription.deleted` → Downgrade user plan to Free |
| INT-S-07 | `invoice.payment_failed` → Set subscription status to `past_due` and notify user |
| INT-S-08 | Webhook endpoint must use raw body parsing and verify the Stripe signature before processing any event |

---

### 6.3 NVIDIA NIM (Primary AI Provider)

| Requirement ID | Requirement |
|---|---|
| INT-N-01 | System must authenticate with NVIDIA NIM using an API key stored as an environment variable |
| INT-N-02 | System must use the `meta/llama-3.1-405b-instruct` model for primary generation |
| INT-N-03 | System must set a request timeout of 60 seconds for NVIDIA NIM calls |
| INT-N-04 | System must treat any 5xx or timeout response from NVIDIA as a failure and trigger the fallback |

---

### 6.4 OpenRouter (Backup AI Provider)

| Requirement ID | Requirement |
|---|---|
| INT-OR-01 | System must authenticate with OpenRouter using an API key stored as an environment variable |
| INT-OR-02 | Backup 1 must use `meta-llama/llama-3.1-405b-instruct` |
| INT-OR-03 | Backup 2 must use `meta-llama/llama-3.1-70b-instruct` (lower capability, used as last 70B resort) |
| INT-OR-04 | System must set a request timeout of 60 seconds for OpenRouter calls |

---

### 6.5 Future Integrations (Phase 3)

| Integration | Purpose | Status |
|---|---|---|
| GitHub / GitLab API | Direct export of folder structure and CLAUDE.md to a repo | Planned |
| Mermaid.js | Auto-generate flowcharts from user flows | Planned |
| Slack / Discord Bot | Receive project status updates in team channels | Under Consideration |

---

## 7. Constraints & Assumptions

### 7.1 Technical Constraints

| # | Constraint | Impact |
|---|---|---|
| C-01 | AI generation is dependent on third-party providers — if all 4 providers fail, generation is impossible | Handled by error state + user notification |
| C-02 | MongoDB does not support multi-document ACID transactions natively at the application level | Each document save is atomic at the document level only |
| C-03 | The Access Token lifetime is fixed at 15 minutes — this is a security constraint that cannot be extended | Frontend must handle silent refresh transparently |
| C-04 | Stripe Checkout is a redirect-based flow — it requires a success and cancel URL from the frontend | Both URLs must be configured correctly in both environments |
| C-05 | Google OAuth requires the callback URL to be whitelisted in Google Console for each environment | Staging and Production must be registered separately |

---

### 7.2 Business Constraints

| # | Constraint | Impact |
|---|---|---|
| B-01 | Free plan users are limited to 3 projects — this is enforced at the server level, not just the UI | Attempting to create a 4th project returns a 403 error with plan upgrade prompt |
| B-02 | Free plan users cannot edit generated documents | Edit endpoint returns 403 for Free plan users |
| B-03 | Free plan users cannot download the full ZIP archive | ZIP generation endpoint returns 403 for Free plan users |
| B-04 | Free plan AI Chat is limited to 5 messages per day | Message count is tracked per user per day in the database |

---

### 7.3 Assumptions

| # | Assumption |
|---|---|
| A-01 | Users have a stable internet connection — the system does not need to support full offline mode |
| A-02 | All AI-generated content is in English — multi-language support is out of scope for v2.x |
| A-03 | The average generated document will be between 1,500 and 5,000 words — prompts are designed with this in mind |
| A-04 | Users are expected to review generated documents and make minor adjustments — 100% perfect output is not guaranteed |
| A-05 | Stripe handles all payment compliance (PCI DSS) — AiDocs does not process or store raw card data at any point |
| A-06 | NVIDIA NIM and OpenRouter APIs will maintain their current model availability and pricing for the foreseeable future |

---

## 8. Glossary of Terms

| Term | Definition |
|---|---|
| **Access Token** | A short-lived security token (15 min) sent with every API request to prove the user's identity |
| **Refresh Token** | A long-lived token (7 days) stored in a secure cookie, used to get a new Access Token without re-logging in |
| **httpOnly Cookie** | A browser cookie that cannot be read by JavaScript — used to store the Refresh Token securely |
| **JWT (JSON Web Token)** | A compact, self-contained token format used for both the Access Token and Refresh Token |
| **OAuth 2.0** | An industry-standard protocol for delegated authorization — used for "Sign in with Google" |
| **Wizard** | The 7-step form users fill out to describe their project before document generation begins |
| **Document Suite** | The full set of 9 AI-generated documents for a given project |
| **PRD** | Product Requirements Document — defines what the product is and what it should do |
| **SRD** | Software Requirements Document — defines how the system is built technically (this document) |
| **Fallback Cascade** | The automatic process of trying backup AI providers if the primary one fails |
| **Compound Index** | A database index on multiple fields together — improves query performance |
| **Async Generation** | Document generation that runs in the background — the user is not made to wait on the API response |
| **Kanban Board** | A visual board with columns (To Do, In Progress, Done) for tracking feature development |
| **Milestone** | A key project deadline or goal tracked within the workspace |
| **Webhook** | An automatic HTTP notification sent by a third party (e.g., Stripe) when an event occurs |
| **Stripe Checkout** | Stripe's hosted payment page — handles card collection and payment processing securely |
| **SameSite=Strict** | A cookie security attribute that prevents the cookie from being sent with cross-site requests |
| **Data Isolation** | Every database query filters by the logged-in user's ID — users can never access each other's data |
| **PM2 Cluster** | A Node.js process manager that runs multiple server instances across CPU cores for better performance |
| **Plan Limit** | A restriction on how many projects or features a user can access based on their subscription |
| **Soft Delete** | Marking a record as archived/inactive rather than removing it from the database permanently |
| **Version** | Each edit or regeneration of a document creates a numbered version (v1, v2, etc.) |
| **CLAUDE.md** | A special document in the 9-doc suite written specifically for AI coding agents like Claude/Cursor |
| **Agent System Prompt** | Instructions that tell an AI coding agent how to build the project correctly |

---

*This SRD is the single source of software requirements truth for AiDocs v2.1.*  
*Keep in sync with PRD v2.1 and TRD v1.0 at all times.*  
*Last Updated: March 2026*

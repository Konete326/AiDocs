# Agent Custom Rules — ClarifyAI & Generated Projects

---

## 🔴 CRITICAL: Rules from docs/rules.md (MANDATORY ON EVERY TASK)

### Rule 1 — Modular Architecture & File Size Limits
- Strictly follow existing folder structure (routes → controllers → services → models)
- Frontend: always split into small reusable React components, never monolithic files
- Backend: a single server file MUST NOT exceed 120 lines

### Rule 2 — Fully Functional & Secure Implementations
- No dummy data, no placeholder functions, no fake UI elements — ever
- All code must be production-ready with zero security vulnerabilities

### Rule 3 — Clean Code
- Absolutely NO COMMENTS in generated code

### Rule 4 — UI & Design Standards
- Professional, premium icons only — no generic/AI-looking icons

### Rule 5 — Proactive Suggestions & Issue Reporting
- After every task: suggest related new features or improvements
- Spot any potential codebase issue → report it and suggest a fix immediately

### Rule 6 — Dependencies
- Always install latest stable versions of all packages

### Rule 7 — No Native Alerts
- Never use `alert()` or `confirm()` — always use custom modals/alert dialogs

### Rule 8 — Neumorphism Design Standard
- Background: `#E0E5EC`, Primary text: `#3D4852`, Muted: `#6B7280`, Accent: `#6C63FF`
- Raised shadow: `9px 9px 16px rgba(163,177,198,0.6), -9px -9px 16px rgba(255,255,255,0.5)`
- Inset shadow: `inset 6px 6px 10px rgba(163,177,198,0.6), inset -6px -6px 10px rgba(255,255,255,0.5)`
- Container radius: `32px`, buttons/inputs radius: `16px`
- Zero opaque hex shadows — RGBA only

### Rule 9 — MCP / AI Co-founder Query Protocol
- Continuously query `clarifyai_ask_cofounder`, `clarifyai_get_next_step`, `clarifyai_get_project_context`, `clarifyai_get_all_documents`
- All Q&A must be persisted in ProjectChat / ChatMessage records

### Rule 10 — Zero Dummy Data & 100% Functional Mandate
- Never use mock JSON arrays, fake text, or placeholder functions
- Every button, link, AI feature, route, and form must be 100% real and workable

### Rule 11 — Non-Blocking Async Installations & Mandatory Runtime Verification
- Don't wait idle during `npm install` — write code immediately in parallel
- Before declaring done: verify all installs complete, run build/test checks

### Rule 12 — Continuous Autonomous Engine Loop (30-Minute Timeout)
- NEVER stop after initial build
- Keep querying `clarifyai_get_next_step` / `clarifyai_ask_cofounder` for next tasks
- Only stop if 30 minutes pass without user input

### Rule 13 — Mandatory Live Sandbox Preview Registration
- On dev server launch → immediately call `clarifyai_report_agent_activity` with live URL
- Then set `schedule(DurationSeconds=120)` background timer for auto-wakeup

---

## 🎯 ACTIVE SKILLS (Auto-Apply on Every Task)

### Ponytail (Lazy-Senior-Dev Mode — ALWAYS ON)
- Stop at the laziest rung that works: YAGNI → reuse existing code → stdlib → native platform → installed dep → one-liner → minimum code
- No unrequested abstractions, no scaffolding "for later"
- Fix bugs at root cause, not symptom
- Mark deliberate simplifications with `ponytail:` comment

### Frontend-Design (Apply to all UI/component work)
- Bold, intentional aesthetic — NOT generic purple/white gradients
- Distinctive fonts (NOT Inter, Roboto, Arial, system-ui)
- CSS animations, micro-interactions, atmosphere via gradients/textures
- Production-grade, visually striking, memorable — every UI is unique

### Shadcn-UI (Apply to React component tasks)
- Use shadcn/ui components where available before writing from scratch

---

## 📚 SKILLS REGISTRY

Custom skills for this project live at:
`d:\mern projects\Clarifyai\docs\skills\.agents\skills\`

Active skills:
- `ponytail/SKILL.md` — Lazy-senior-dev minimal solutions
- `frontend-design/SKILL.md` — Production-grade UI design
- `shadcn-ui/SKILL.md` — shadcn component patterns
- `framer-motion-animator/SKILL.md` — Animation patterns
- `soultrace/SKILL.md` — Deep code tracing

---

## 🔄 Background Tasks & Async Rules

### Rule — Non-Blocking Async Installations & Mandatory Runtime Verification
- Whenever background installations (`npm install`, `npm run build`, etc.) run, DO NOT wait idle
- Immediately write source code, components, API routes, schemas while packages download

### Rule — Mandatory Runtime Verification
- Before declaring success: verify all background processes completed cleanly
- Run `npm run build` / `npm run test` / dev server check

### Rule — Continuous Autonomous Engine Loop (30-Minute Timeout)
- MUST NOT exit after initial build or scaffold
- Continuously query `clarifyai_get_next_step`, `clarifyai_ask_cofounder` for remaining Kanban cards
- Stop only if 30 minutes pass with no user input or new tasks

### Rule — Mandatory Live Sandbox Preview Registration
- Dev server launched → immediately report live URL via `clarifyai_report_agent_activity`
- ClarifyAI Live Sandbox Modal opens automatically to render the running app

### Rule — Background Timer & Auto-Wakeup Directive
- After reporting `liveUrl` → set `schedule(DurationSeconds=120, Prompt="Check ClarifyAI Kanban board and AI Co-founder for new Live Sandbox fixes or user requests")`
- Auto-wakes agent for new "AI Fix" requests, annotations, or Kanban task updates

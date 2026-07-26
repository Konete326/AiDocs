# Agent Custom Rules — ClarifyAI & Generated Projects

## Rule — Non-Blocking Async Installations & Mandatory Runtime Verification

1. **Non-Blocking Development Work During Background Installations**:
   - Whenever long-running commands or package dependency installations (such as `npm install`, `npx create-next-app`, `npx create-vite-app`, `npm run build`, etc.) are launched in the background, the Agent MUST NOT pause, poll, or wait idle.
   - Immediately proceed to write source code files, React components, backend API routes, database schemas, utility functions, and system configurations while `node_modules` are downloading asynchronously in the background.

## Rule 2 — Mandatory Runtime Verification

1. **Runtime Build & Test Check**:
   - Before finishing any task or declaring success to the user, the Agent MUST verify that all background processes/installations have finished cleanly and execute empirical test or build commands (`npm run build` / `npm run test` / dev server check) to confirm zero runtime or build errors exist.

## Rule 3 — Continuous Autonomous Engine Loop (30-Minute Timeout)

1. **Do Not Stop After Initial Build**:
   - The Agent MUST NOT exit or stop execution after creating the scaffold or completing `npm run build`.
   - Continuously query ClarifyAI AI Co-founder (`clarifyai_get_next_step`, `clarifyai_ask_cofounder`) to autonomously process remaining Kanban cards, add features, and polish the codebase.
   - Only stop or pause if 30 minutes pass without any user input or new tasks.

## Rule 4 — Mandatory Live Sandbox Preview Registration

1. **Auto-Register Live Sandbox Link**:
   - As soon as dev server (`npm run dev` or `npm start` at `http://localhost:5173` or `http://localhost:3000`) is launched in the background, IMMEDIATELY report the live URL via `clarifyai_report_agent_activity` so ClarifyAI's Live Sandbox Modal opens automatically to render the live web app.

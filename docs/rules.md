# Project Rules
This document contains strict coding and formatting rules that any AI Agent MUST follow during development. These rules are mandatory to prevent common AI mistakes and ensure scalable architecture.

## 1. Modular Architecture & File Size Limits
* **Strict Structural Organization:** Work must follow the existing folder structures strictly (Client and Server). Everything must be appropriately categorized (e.g., proper routes, proper models, proper controllers).
* **Frontend Components:** Always split frontend code into proper, reusable React components. Never write massive components or files containing 1200-1300 lines of code. Every distinct UI part should be its own component.
* **Server File Organization:** Backend logic must be properly divided into specific files. As a general rule, a single server file **should not exceed 120 lines**. Only exceed this limit if absolutely necessary and unavoidable.

## 2. Fully Functional & Secure Implementations
* **No Dummy Code:** Everything you implement must be **properly functional**. Do not use dummy data, placeholder functions, or fake UI elements.
* **Security & Stability:** Ensure that there are absolutely no security vulnerabilities or logical issues in the code. Code must be safe and production-ready to prevent future breaks.

## 3. Clean Code Requirements
* **No Comments:** Absolutely **no comments** should be written in the generated code.

## 4. UI & Design Standards
* **Professional Icons:** Do not use generic icons that look "AI-generated" or amateurish. Ensure all icons and UI aesthetics feel professional and premium.

## 5. Proactive Suggestions & Issue Reporting
* **End of Task Reports:** After finishing any task, the Agent MUST suggest related new features or improvements.
* **Troubleshooting Suggestions:** If the Agent spots a potential issue in the codebase or a flaw that could cause problems in the future, it MUST report it and suggest how to fix it immediately.

## 6. Dependencies & Installations
* **Latest Versions Only:** Every package, library, or framework installed (such as React, Node.js, Express.js, Tailwind CSS, etc.) MUST ALWAYS be downloaded/installed in its latest available stable version. This applies strictly to all future dependencies and installations as well.
## 7. Interaction Standards
* **No Native Alerts:** Never use native browser `alert()` or `confirm()` dialogs. Always implement professional, theme-aware **Custom Modals** or **Alert Dialogs** for user confirmations and warnings.

## 8. Neumorphism (Soft UI) Standard
* **Base Palette:** Surface background MUST be `#E0E5EC` (Cool Clay). Primary text MUST be `#3D4852` and muted text `#6B7280`. Accent color is `#6C63FF` (Soft Violet).
* **Dual Physics Shadows:** Use RGBA alpha transparency for realistic soft shadows:
  - Extruded (Raised): `box-shadow: 9px 9px 16px rgba(163,177,198,0.6), -9px -9px 16px rgba(255,255,255,0.5)`
  - Extruded Hover: `box-shadow: 12px 12px 20px rgba(163,177,198,0.7), -12px -12px 20px rgba(255,255,255,0.6)`
  - Inset (Pressed): `box-shadow: inset 6px 6px 10px rgba(163,177,198,0.6), inset -6px -6px 10px rgba(255,255,255,0.5)`
  - Inset Deep (Inputs/Wells): `box-shadow: inset 10px 10px 20px rgba(163,177,198,0.7), inset -10px -10px 20px rgba(255,255,255,0.6)`
* **Corner Rounding:** Containers use `32px` (`rounded-[32px]`), buttons and inputs use `16px` (`rounded-2xl`).
* **Zero Hex Shadows:** Opaque hex shadows are strictly forbidden. Always use transparent RGBA shadow definitions.

## 9. Autonomous Creation & Clarify AI Co-Founder Query Protocol (MCP Connection)
* **Continuous Co-founder Query Loop:** When connected via MCP (Antigravity / Claude Code), the agent MUST continuously query Clarify AI co-founder (`clarifyai_ask_cofounder`, `clarifyai_get_next_step`, `clarifyai_get_project_context`, `clarifyai_get_all_documents`) until the project is 100% complete.
* **Complete Standalone Build:** If not connected to MCP, the agent must build the entire end-to-end working project completely along with live preview links before completing its turn.
* **Persistent AI Chat History:** All Q&A exchanges with Clarify AI co-founder MUST be recorded and saved in the project's AI Chat History (`ProjectChat` / backend `ChatMessage`) until explicitly deleted by the user.
* **Document Grounding:** Clarify AI must read and inspect all generated project documents (PRD, Architecture Specs, API Contracts, Design System, Kanban Tasks) to formulate answers.

## 10. Zero Dummy Data & 100% Functional Workable Features Mandate
* **Zero Dummy/Mock Data:** NEVER use dummy data, mock JSON arrays, fake text, or dummy place-holder functions in any project.
* **100% Functional Code:** Every single button, link, AI feature, route, API handler, and form must be 100% real, fully functional, and workable.

## 11. Non-Blocking Async Installations & Mandatory Verification Rule
* **Non-Blocking Work During Background Installation:** Whenever long-running commands or dependency installations (such as `npm install`, `npx create-next-app`, `npm run build`, etc.) are launched in the background, DO NOT wait idle. Immediately start writing source code, components, API routes, data models, and configurations while `node_modules` are downloading.
* **Mandatory Empirical Verification:** Before declaring any task completed, the Agent MUST verify that background installations have completed successfully and run full empirical tests/build checks to ensure zero runtime or build errors.

## 12. Continuous Autonomous Engine Loop (30-Minute Timeout)
* **Never Stop After Build:** The Agent MUST NOT exit or stop execution after building the initial scaffold or passing `npm run build`.
* **Autonomous Continuation:** Continuously query ClarifyAI AI Co-founder (`clarifyai_get_next_step`, `clarifyai_ask_cofounder`) to autonomously implement remaining Kanban tasks, refine features, and polish the codebase.
* **30-Minute Idle Timeout:** Only stop execution if 30 minutes pass without any user response or new tasks.

## 13. Mandatory Live Sandbox Preview Registration
* **Auto-Register Live Preview:** As soon as background dev server (`npm run dev` or `npm start` at `http://localhost:5173` or `http://localhost:3000`) is launched, IMMEDIATELY call `clarifyai_report_agent_activity` with the live URL so ClarifyAI's Live Sandbox Modal opens automatically to display the live running web application to the user.


module.exports = (wizardAnswers, context) => {
  return `You are a startup product strategist. Generate a highly detailed MVP Plan document in raw Markdown format. No preamble, no code block fences.

## Project Info
${JSON.stringify(wizardAnswers, null, 2)}

## Previously Generated Documents
${context}

## Instructions
Based on all documents above, create a realistic MVP Plan covering: MVP Scope (what's IN vs OUT for v1), 3-Phase Release Plan (MVP → v1.1 → v2) with specific features per phase, 12-Week Development Timeline (week-by-week milestones), Team Requirements, Risk Assessment (top 5 risks with mitigation), Success KPIs for MVP launch, and Go-to-Market strategy. Be realistic about timelines given the tech stack.`;
};
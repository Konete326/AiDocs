# Find Skills

This skill helps you discover and use available skills.

## Available Skills in This Project
Check the skills/ folder for all available SKILL.md files.
Each subfolder contains a skill with specific instructions.

## How to Use a Skill
Tell Claude: "Read skills/{skill-name}/SKILL.md before proceeding"

## Adding External Skills
npx skills add https://github.com/anthropics/skills --skill {name}
npx skills add https://github.com/vercel-labs/skills --skill {name}

## Skill Discovery Pattern
1. List all folders in skills/
2. Read the first 10 lines of each SKILL.md to understand purpose
3. Load only the skills relevant to your current task
4. Reference them explicitly in your system prompt

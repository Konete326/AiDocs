# Mobile Skill (Flutter)

Teaches agent Flutter best practices for this mobile project.

## Project Setup
```bash
flutter create project_name
cd project_name
flutter pub get
flutter run
```

## Folder Structure
```
lib/
  main.dart          ← app entry point + routing
  screens/           ← full page widgets
  widgets/           ← reusable UI components
  services/          ← API calls, Firebase, local storage
  models/            ← data classes
  utils/             ← constants, helpers, extensions
```

## Key Principles
- Use `GoRouter` for navigation
- Use `Provider` or `Riverpod` for state management
- Keep widgets small — extract sub-widgets aggressively
- Use `const` constructors wherever possible for performance

## Placeholder
This is a placeholder skill. Replace with project-specific Flutter patterns from FolderStructure.md.

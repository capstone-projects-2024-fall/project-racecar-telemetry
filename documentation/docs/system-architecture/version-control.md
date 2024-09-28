---
sidebar_position: 5
---

# Version Control

### Version Control System (VCS) Choice
For this project, we are using **Git** as our version control system. 

### Repository Hosting
Our Git repository is hosted on **GitHub**, with all team members having Admin privileges.

### Branching Strategy
We are following the **Git Flow** branching model, which involves using the following branches:
- `main` (pprotected): The stable branch that contains production-ready code.
- `develop`: The primary branch for ongoing development.
- `feature/feature-name`: Branches for individual features, created from `develop` and merged back into `develop` upon completion.
- `release/release-name`: Branches for preparing new releases, merged into `main` and `develop` upon completion.
- `hotfix/hotfix-name`: Branches for urgent fixes, created from `main` and merged back into both `main` and `develop`.

### Commit Practices
We adhere to the following commit message guidelines:
- Use the imperative mood (e.g., "Add telemetry data processing").
- Keep messages concise but descriptive.
- Reference relevant issue numbers (e.g., `Fixes #12`).


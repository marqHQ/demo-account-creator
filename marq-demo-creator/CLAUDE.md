# Marq Demo Account Creation Tool

## Quick Start

```bash
npm install
npm run dev
```

The application will be available at http://localhost:5173/

## Scripts

### Development
- `npm run dev` - Start development server (http://localhost:5173)
- `./dev-start.sh` - Clean start with type checking and linting
- `npm run preview` - Preview production build

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run typecheck` - Run TypeScript type checking

### Testing
- `npm run test` - Run tests in watch mode
- `npm run test:ci` - Run tests with coverage
- `npm run test:ui` - Run tests with UI

### Build & Deploy
- `npm run build` - Build for production
- `npm run clean` - Clean build artifacts
- `npm run security:audit` - Run security audit

### VS Code Keyboard Shortcuts
- `Cmd+Shift+D` - 🚀 Start Dev (Clean)
- `Cmd+Shift+T` - 🧪 Test with Coverage
- `Cmd+Shift+L` - 🔍 Lint & Fix
- `Cmd+Shift+B` - 🏗️ Build Production
- `Cmd+Shift+G` - 📊 Git Status
- `Cmd+Shift+F` - 🌿 Create Feature Branch
- `Cmd+Shift+C` - 💾 Quick Commit
- `Cmd+Shift+U` - 🚀 Push Current Branch

## Project Structure

```
src/
├── components/          # React components
│   ├── common/         # Reusable components
│   ├── forms/          # Form components
│   ├── layout/         # Layout components
│   ├── packages/       # Package-related components
│   ├── progress/       # Progress tracking components
│   └── templates/      # Template-related components
├── hooks/              # Custom React hooks
├── pages/              # Page components (routes)
├── services/           # API services and external integrations
├── stores/             # Zustand state management
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **API Management**: React Query
- **Forms**: React Hook Form
- **Routing**: React Router
- **Icons**: Lucide React
- **Build Tool**: Vite

## Features Implementation Status

### ✅ Completed Setup
- [x] Basic project setup and structure
- [x] React Router with multi-step navigation
- [x] Tailwind CSS with custom theme (#1a1a1a sidebar, #0066cc primary)
- [x] Zustand store for state management
- [x] TypeScript interfaces for all data structures
- [x] Basic layout with Figma-inspired sidebar
- [x] Complete VS Code development environment setup
- [x] ESLint + Prettier configuration
- [x] Vitest testing framework
- [x] Production build configuration
- [x] Development scripts and automation

### 🚀 Ready for Development
- [ ] Demo package selection cards
- [ ] Account configuration form
- [ ] Template library with search and filtering
- [ ] Brand kit upload and management
- [ ] Real-time progress tracking
- [ ] API integration with Marq services

## VS Code Extensions
The project is configured to recommend these essential extensions:
- Prettier (Code formatting)
- ESLint (Code linting)
- Tailwind CSS IntelliSense
- React/ES7+ snippets
- GitLens (Git integration)
- Thunder Client (API testing)
- Error Lens (Inline error display)
- Auto Rename Tag
- Code Spell Checker
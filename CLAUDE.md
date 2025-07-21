# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **udgibil-front**, the frontend for Udgibil RSS reader - a Vue 3 application for reading and managing RSS feeds. The app supports user authentication, feed management, article reading, bookmarking, article publishing, and multi-language support.

## Development Commands

### Core Development
- `npm run dev` - Start development server (runs on port 8080 with host 0.0.0.0)
- `npm run build` - Build for production 
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint with auto-fix

### Environment
- Uses Vite as the build tool
- API URL configured via `VITE_API_URL` environment variable
- Development server runs with increased memory allocation (4GB)

## Architecture & Key Technologies

### Frontend Stack
- **Vue 3** with Composition API
- **Pinia** for state management with persistence
- **Vue Router** for routing with authentication guards
- **Tailwind CSS** for styling with dark mode support
- **Editor.js** for rich text editing in publishing features
- **Axios** for HTTP requests with Bearer token authentication
- **Vue i18n** for internationalization (9 languages supported)

### State Management Structure
The app uses Pinia stores for different domains:
- `session.js` - Authentication, theme, language, onboarding state
- `user.js` - User profile and preferences
- `feeds.js` - RSS feeds management
- `articles.js` - Article data and interactions
- `bookmarks.js` - Bookmarked articles
- `collections.js` - User-created feed collections
- `myfeeds.js` - User's published feeds
- `tickets.js` - Support ticket system

### Routing Architecture
Complex nested routing structure with layout components:
- **Main Layout** (`SkeletonPage`) - Three-column layout (left sidebar, center content, right sidebar)
- **Bookmark Layout** (`SkeletonBookmarkPage`) - Similar three-column for bookmarks
- **Publishing Layout** (`PubSkeletonPage`) - Layout for user publishing features
- **Settings** - Full-page layout for settings

Authentication guards redirect unauthenticated users appropriately and handle onboarding flow.

### Component Organization
- `/components/feeds/` - Feed browsing and management
- `/components/articles/` - Article display and interaction
- `/components/bookmarks/` - Bookmark functionality
- `/components/pub/` - Publishing features (user-generated content)
- `/components/search/` - Search for feeds and articles
- `/components/support/` - Help desk system
- `/components/shared/` - Reusable UI components
- `/components/icons/` - SVG icon components
- `/pages/` - Top-level page components

### API Integration
HTTP client in `/composables/networks.js` provides:
- `useGet()` and `usePost()` composables with automatic Bearer token injection
- Environment-based API URL configuration
- Centralized error handling

### Publishing System
The app includes a full publishing platform where users can:
- Create and manage their own RSS feeds
- Write articles using Editor.js rich text editor
- Publish content with preview functionality

## Development Notes

### Authentication Flow
1. User authentication via `/auth` or `/auth/google`
2. Token stored in Pinia with persistence
3. Onboarding flow for new users (`/onboard`)
4. Route guards protect authenticated areas

### Theme System
- Supports light/dark/system themes
- Theme state managed in session store
- Tailwind CSS classes toggled on document root

### Internationalization
Full i18n support with JSON language files in `/src/languages/` for:
English, Russian, Ukrainian, Spanish, German, French, Italian, Portuguese, Chinese

### Development Patterns
- Composition API with `<script setup>`
- Reactive state management with Pinia
- Component props and emits for parent-child communication
- Vue Router navigation guards for route protection
- Tailwind utility classes for styling
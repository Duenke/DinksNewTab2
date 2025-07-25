# Dinks New Tab

A beautiful Chromium extension that displays all your bookmark folders on the new tab screen, making your bookmarks easily accessible and visually organized.

## Purpose

This extension replaces your browser's new tab page with a clean, card-based interface showing all your bookmark folders. Instead of navigating through bookmark menus, you can see everything at a glance and quickly access your saved links.

## Why Rewrite in 2025?

This project was rewritten in 2025 as a fun exploration of modern web technologies:

- **Svelte 5**: Experimenting with the new Svelte 5 API and its improved reactivity system
- **Tailwind CSS**: Testing the utility-first CSS framework for rapid UI development  
- **VS Code Copilot Agent**: Trying out AI-assisted development workflows

## Technologies Used

- **Svelte 5** with SvelteKit
- **TypeScript** for type safety
- **Tailwind CSS 4.0** for styling
- **Vite** for building and development
- **Chrome Extension Manifest V3**

## Setup and Development

### Prerequisites

- Node.js (latest LTS version recommended)
- pnpm package manager (can use npm in a pinch)
- Chrome, Edge, or other Chromium-based browser

### Clone and Install

```bash
git clone https://github.com/Duenke/DinksNewTab2.git
cd DinksNewTab2
pnpm install
```

### Development

To run the extension locally during development:

```bash
pnpm dev
```

This starts the Vite development server. The extension files will be built to the `build/` directory.

### Building for Production

To create a production build:

```bash
pnpm build
```

### Loading as Unpacked Extension

1. Build the extension using `pnpm build`
2. Open Chrome/Edge and navigate to `chrome://extensions/` (or `edge://extensions/`)
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the `build/` directory
5. The extension should now be loaded and will override your new tab page

## Learning Insights

### Svelte 5 API Experience

Working with Svelte 5 has been great! The new reactivity system feels incredibly intuitive:

- **Context Pattern**: Creating a context from a JavaScript class (see `src/lib/contexts/context.svelte.ts`) is surprisingly elegant
- **Automatic Reactivity**: The Svelte 5 compiler handles all the boilerplate getters/setters automatically with `$state`
- **Clean Syntax**: The `$effect` and `$state` runes make state management feel natural

The compiler takes care of so much boilerplate that you can focus on the actual logic rather than reactive plumbing. For more details on Svelte 5 patterns and best practices, see the included `llms-small.txt` file.

### VS Code Copilot Agent

VS Code Copilot Agent proved to be a valuable assistant in this project:

**Where it excelled:**

- CSS/Tailwind styling suggestions and boilerplate
- TypeScript interface definitions
- Repetitive component structure
- Documentation and README writing

**Where it struggled:**

- Complex business logic, especially the custom context pattern used
- Understanding the specific Chrome bookmarks API integration
- Architectural decisions and state management patterns

The AI was fantastic for the "grunt work" but still required human insight for the core application logic and design patterns.

## Svelte 5 Reference

This project includes `llms-small.txt` - a curated reference of Svelte 5 syntax and patterns that was accurate as of July 25, 2025. This file served as a context boost for VS Code Copilot Agent. Find the latest up-to-date version on the [official docs](https://svelte.dev/docs/llms).

## Project Structure

```text
src/
├── lib/
│   ├── components/    # Reusable Svelte components
│   │   ├── main/      # Main page components
│   │   └── settings/  # Settings panel components
│   ├── contexts/      # Svelte 5 context management
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
├── routes/            # SvelteKit routes
└── app.html           # HTML template

static/                # Static assets
├── manifest.json      # Chrome extension manifest
└── favicon.svg        # Extension icon
```

## Features

- 📚 Display all bookmark folders as interactive cards
- 🎨 Light/dark/system theme support
- 🔄 Custom folder ordering with drag-and-drop
- ⚡ Fast, responsive interface built with Svelte 5
- 🎯 Clean, minimal design focused on usability

## Contributing

This is primarily a learning project, but contributions are welcome! Please feel free to open issues or submit pull requests.

## License

[Add your license here]
